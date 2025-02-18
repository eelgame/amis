"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileControlRenderer = exports.getNameFromUrl = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var Item_1 = require("./Item");
var find_1 = tslib_1.__importDefault(require("lodash/find"));
var isPlainObject_1 = tslib_1.__importDefault(require("lodash/isPlainObject"));
// @ts-ignore
var mapLimit_1 = tslib_1.__importDefault(require("async/mapLimit"));
var Image_1 = tslib_1.__importDefault(require("./Image"));
var helper_1 = require("../../utils/helper");
var api_1 = require("../../utils/api");
var Button_1 = tslib_1.__importDefault(require("../../components/Button"));
var icons_1 = require("../../components/icons");
var react_dropzone_1 = tslib_1.__importDefault(require("react-dropzone"));
var tpl_builtin_1 = require("../../utils/tpl-builtin");
var preventEvent = function (e) { return e.stopPropagation(); };
function getNameFromUrl(url) {
    if (/(?:\/|^)([^\/]+?)$/.test(url)) {
        return decodeURIComponent(RegExp.$1);
    }
    return url;
}
exports.getNameFromUrl = getNameFromUrl;
var FileControl = /** @class */ (function (_super) {
    tslib_1.__extends(FileControl, _super);
    function FileControl(props) {
        var _this = _super.call(this, props) || this;
        _this.dropzone = react_1.default.createRef();
        var value = props.value;
        var multiple = props.multiple;
        var joinValues = props.joinValues;
        var delimiter = props.delimiter;
        var files = [];
        if (value && value instanceof Blob) {
            files = [value];
        }
        else if (value) {
            files = (Array.isArray(value)
                ? value
                : joinValues
                    ? ("" + (value.value || value)).split(delimiter)
                    : [(value.value || value)])
                .map(function (item) { return FileControl.valueToFile(item, props); })
                .filter(function (item) { return item; });
        }
        _this.state = {
            files: files,
            uploading: false
        };
        _this.sendFile = _this.sendFile.bind(_this);
        _this.removeFile = _this.removeFile.bind(_this);
        _this.clearError = _this.clearError.bind(_this);
        _this.handleDrop = _this.handleDrop.bind(_this);
        _this.handleDropRejected = _this.handleDropRejected.bind(_this);
        _this.startUpload = _this.startUpload.bind(_this);
        _this.stopUpload = _this.stopUpload.bind(_this);
        _this.retry = _this.retry.bind(_this);
        _this.toggleUpload = _this.toggleUpload.bind(_this);
        _this.tick = _this.tick.bind(_this);
        _this.onChange = _this.onChange.bind(_this);
        _this.uploadFile = _this.uploadFile.bind(_this);
        _this.uploadBigFile = _this.uploadBigFile.bind(_this);
        _this.handleSelect = _this.handleSelect.bind(_this);
        return _this;
    }
    FileControl.valueToFile = function (value, props, files) {
        var file = files && typeof value === 'string'
            ? find_1.default(files, function (item) { return item.value === value; })
            : undefined;
        return value
            ? value instanceof File
                ? {
                    state: 'ready',
                    value: value,
                    name: value.name,
                    url: '',
                    id: helper_1.guid()
                }
                : tslib_1.__assign({}, (typeof value === 'string'
                    ? {
                        state: file && file.state ? file.state : 'init',
                        value: value,
                        name: (file && file.name) ||
                            (/^data:/.test(value)
                                ? 'base64数据'
                                : getNameFromUrl(value)),
                        id: helper_1.guid(),
                        url: typeof props.downloadUrl === 'string' &&
                            value &&
                            !/^data:/.test(value)
                            ? "" + props.downloadUrl + value
                            : undefined
                    }
                    : value))
            : undefined;
    };
    FileControl.prototype.componentWillReceiveProps = function (nextProps) {
        var _this = this;
        var props = this.props;
        if (props.value !== nextProps.value && this.emitValue !== nextProps.value) {
            var value = nextProps.value;
            var multiple = nextProps.multiple;
            var joinValues = nextProps.joinValues;
            var delimiter = nextProps.delimiter;
            var files = [];
            if (value) {
                files = (Array.isArray(value)
                    ? value
                    : joinValues && typeof value === 'string'
                        ? value.split(delimiter)
                        : [value])
                    .map(function (item) {
                    var obj = FileControl.valueToFile(item, nextProps, _this.state.files);
                    var org;
                    if (obj &&
                        (org = find_1.default(_this.state.files, function (item) { return item.value === obj.value; }))) {
                        obj = tslib_1.__assign(tslib_1.__assign(tslib_1.__assign({}, org), obj), { id: obj.id || org.id });
                    }
                    return obj;
                })
                    .filter(function (item) { return item; });
            }
            this.setState({
                files: files
            });
        }
    };
    FileControl.prototype.handleDrop = function (files) {
        var _this = this;
        if (!files.length) {
            return;
        }
        var _a = this.props, maxSize = _a.maxSize, multiple = _a.multiple, maxLength = _a.maxLength, __ = _a.translate;
        var allowed = multiple && maxLength
            ? maxLength - this.state.files.length
            : files.length;
        var inputFiles = [];
        [].slice.call(files, 0, allowed).forEach(function (file) {
            if (maxSize && file.size > maxSize) {
                _this.props.env.alert(__('File.maxSize', {
                    filename: file.name,
                    actualSize: Image_1.default.formatFileSize(file.size),
                    maxSize: Image_1.default.formatFileSize(maxSize)
                }));
                file.state = 'invalid';
            }
            else {
                file.state = 'pending';
            }
            file.id = helper_1.guid();
            inputFiles.push(file);
        });
        if (!inputFiles.length) {
            return;
        }
        this.setState({
            error: null,
            files: multiple ? this.state.files.concat(inputFiles) : inputFiles
        }, function () {
            var autoUpload = _this.props.autoUpload;
            if (autoUpload) {
                _this.startUpload();
            }
        });
    };
    FileControl.prototype.handleDropRejected = function (rejectedFiles, evt) {
        if (evt.type !== 'change' && evt.type !== 'drop') {
            return;
        }
        var _a = this.props, multiple = _a.multiple, env = _a.env, accept = _a.accept, __ = _a.translate;
        var files = rejectedFiles.map(function (fileRejection) { return (tslib_1.__assign(tslib_1.__assign({}, fileRejection.file), { state: 'invalid', id: helper_1.guid(), name: fileRejection.file.name })); });
        // this.setState({
        //   files: multiple
        //     ? this.state.files.concat(files)
        //     : this.state.files.length
        //     ? this.state.files
        //     : files.slice(0, 1)
        // });
        env.alert(__('File.invalidType', {
            files: files.map(function (item) { return "\u300C" + item.name + "\u300D"; }).join(' '),
            accept: accept
        }));
    };
    FileControl.prototype.handleSelect = function () {
        this.dropzone.current && this.dropzone.current.open();
    };
    FileControl.prototype.startUpload = function (retry) {
        if (retry === void 0) { retry = false; }
        if (this.state.uploading) {
            return;
        }
        this.setState({
            uploading: true,
            files: this.state.files.map(function (file) {
                if (retry && file.state === 'error') {
                    file.state = 'pending';
                    file.progress = 0;
                }
                return file;
            })
        }, this.tick);
    };
    FileControl.prototype.toggleUpload = function (e) {
        e.preventDefault();
        return this.state.uploading ? this.stopUpload() : this.startUpload();
    };
    FileControl.prototype.stopUpload = function () {
        if (!this.state.uploading) {
            return;
        }
        this.setState({
            uploading: false
        });
    };
    FileControl.prototype.retry = function () {
        this.startUpload(true);
    };
    FileControl.prototype.tick = function () {
        var _this = this;
        if (this.current || !this.state.uploading) {
            return;
        }
        var _a = this.props, __ = _a.translate, multiple = _a.multiple, autoFill = _a.autoFill, onBulkChange = _a.onBulkChange;
        var file = find_1.default(this.state.files, function (item) { return item.state === 'pending'; });
        if (file) {
            this.current = file;
            file.state = 'uploading';
            this.setState({
                files: this.state.files.concat()
            }, function () {
                return _this.sendFile(file, function (error, file, obj) {
                    var files = _this.state.files.concat();
                    var idx = files.indexOf(file);
                    if (!~idx) {
                        return;
                    }
                    var newFile = file;
                    if (error) {
                        newFile.state = 'error';
                        newFile.error = error;
                    }
                    else {
                        newFile = obj;
                        newFile.name = newFile.name || file.name;
                    }
                    files.splice(idx, 1, newFile);
                    _this.current = null;
                    _this.setState({
                        error: error ? error : null,
                        files: files
                    }, function () {
                        // todo 这个逻辑应该移到 onChange 里面去，因为这个时候并不一定修改了表单项的值。
                        var sendTo = !multiple &&
                            autoFill &&
                            !helper_1.isEmpty(autoFill) &&
                            tpl_builtin_1.dataMapping(autoFill, obj || {});
                        sendTo && onBulkChange(sendTo);
                        _this.tick();
                    });
                }, function (progress) {
                    var files = _this.state.files.concat();
                    var idx = files.indexOf(file);
                    if (!~idx) {
                        return;
                    }
                    // file 是个非 File 对象，先不copy了直接改。
                    file.progress = progress;
                    _this.setState({
                        files: files
                    });
                });
            });
        }
        else {
            this.setState({
                uploading: false
            }, function () {
                _this.onChange(!!_this.resolve);
                if (_this.resolve) {
                    _this.resolve(_this.state.files.some(function (file) { return file.state === 'error'; })
                        ? __('File.errorRetry')
                        : null);
                    _this.resolve = undefined;
                }
            });
        }
    };
    FileControl.prototype.sendFile = function (file, cb, onProgress) {
        var _a = this.props, receiver = _a.receiver, fileField = _a.fileField, downloadUrl = _a.downloadUrl, useChunk = _a.useChunk, chunkSize = _a.chunkSize, startChunkApi = _a.startChunkApi, chunkApi = _a.chunkApi, finishChunkApi = _a.finishChunkApi, asBase64 = _a.asBase64, asBlob = _a.asBlob, data = _a.data, __ = _a.translate;
        if (asBase64) {
            var reader_1 = new FileReader();
            reader_1.readAsDataURL(file);
            reader_1.onload = function () {
                file.state = 'ready';
                cb(null, file, {
                    value: reader_1.result,
                    name: file.name,
                    url: '',
                    state: 'ready',
                    id: file.id
                });
            };
            reader_1.onerror = function (error) { return cb(error.message); };
            return;
        }
        else if (asBlob) {
            file.state = 'ready';
            setTimeout(function () {
                return cb(null, file, {
                    name: file.name,
                    value: file,
                    url: '',
                    state: 'ready',
                    id: file.id
                });
            }, 4);
            return;
        }
        var fn = (useChunk === 'auto' && chunkSize && file.size > chunkSize) ||
            useChunk === true
            ? this.uploadBigFile
            : this.uploadFile;
        fn(file, receiver, {}, {
            fieldName: fileField,
            chunkSize: chunkSize,
            startChunkApi: startChunkApi,
            chunkApi: chunkApi,
            finishChunkApi: finishChunkApi,
            data: data
        }, onProgress)
            .then(function (ret) {
            if (ret.status || !ret.data) {
                throw new Error(ret.msg || __('File.errorRetry'));
            }
            onProgress(1);
            var value = ret.data.value || ret.data.url || ret.data;
            cb(null, file, tslib_1.__assign(tslib_1.__assign({}, (isPlainObject_1.default(ret.data) ? ret.data : null)), { value: value, url: typeof downloadUrl === 'string' && value
                    ? "" + downloadUrl + value
                    : ret.data
                        ? ret.data.url
                        : null, state: 'uploaded', id: file.id }));
        })
            .catch(function (error) {
            cb(error.message || __('File.errorRetry'), file);
        });
    };
    FileControl.prototype.removeFile = function (file, index) {
        var files = this.state.files.concat();
        files.splice(index, 1);
        this.setState({
            files: files
        }, this.onChange);
    };
    FileControl.prototype.clearError = function () {
        this.setState({
            error: null
        });
    };
    FileControl.prototype.onChange = function (changeImmediately) {
        var _a = this.props, multiple = _a.multiple, onChange = _a.onChange, joinValues = _a.joinValues, extractValue = _a.extractValue, valueField = _a.valueField, delimiter = _a.delimiter, resetValue = _a.resetValue, asBlob = _a.asBlob;
        var files = this.state.files.filter(function (file) { return ~['uploaded', 'init', 'ready'].indexOf(file.state); });
        var value = multiple ? files : files[0];
        if (value) {
            if (extractValue || asBlob) {
                value = Array.isArray(value)
                    ? value.map(function (item) { return item[valueField || 'value']; })
                    : value[valueField || 'value'];
            }
            else if (joinValues) {
                value = Array.isArray(value)
                    ? value
                        .map(function (item) { return item[valueField || 'value']; })
                        .join(delimiter || ',')
                    : value[valueField || 'value'];
            }
        }
        else {
            value = typeof resetValue === 'undefined' ? '' : resetValue;
        }
        onChange((this.emitValue = value), undefined, changeImmediately);
    };
    FileControl.prototype.uploadFile = function (file, receiver, params, config, onProgress) {
        if (config === void 0) { config = {}; }
        var fd = new FormData();
        var api = api_1.buildApi(receiver, helper_1.createObject(config.data, params), {
            method: 'post'
        });
        helper_1.qsstringify(tslib_1.__assign(tslib_1.__assign({}, api.data), params))
            .split('&')
            .forEach(function (item) {
            var parts = item.split('=');
            fd.append(parts[0], decodeURIComponent(parts[1]));
        });
        // Note: File类型字段放在后面，可以支持第三方云存储鉴权
        fd.append(config.fieldName || 'file', file);
        return this._send(api, fd, {}, onProgress);
    };
    FileControl.prototype.uploadBigFile = function (file, receiver, params, config, onProgress) {
        if (config === void 0) { config = {}; }
        var chunkSize = config.chunkSize || 5 * 1024 * 1024;
        var self = this;
        var startProgress = 0.2;
        var endProgress = 0.9;
        var progressArr;
        var __ = this.props.translate;
        return new Promise(function (resolve, reject) {
            var state;
            var startApi = api_1.buildApi(config.startChunkApi, helper_1.createObject(config.data, tslib_1.__assign(tslib_1.__assign({}, params), { filename: file.name })), {
                method: 'post',
                autoAppend: true
            });
            self._send(startApi).then(startChunk).catch(reject);
            function startChunk(ret) {
                onProgress(startProgress);
                var tasks = getTasks(file);
                progressArr = tasks.map(function () { return 0; });
                if (!ret.data) {
                    throw new Error(__('File.uploadFailed'));
                }
                state = {
                    key: ret.data.key,
                    uploadId: ret.data.uploadId,
                    loaded: 0,
                    total: tasks.length
                };
                mapLimit_1.default(tasks, 3, uploadPartFile(state, config), function (err, results) {
                    if (err) {
                        reject(err);
                    }
                    else {
                        finishChunk(results, state);
                    }
                });
            }
            function updateProgress(partNumber, progress) {
                progressArr[partNumber - 1] = progress;
                onProgress(startProgress +
                    (endProgress - startProgress) *
                        (progressArr.reduce(function (count, progress) { return count + progress; }, 0) /
                            progressArr.length));
            }
            function finishChunk(partList, state) {
                onProgress(endProgress);
                var endApi = api_1.buildApi(config.finishChunkApi, helper_1.createObject(config.data, tslib_1.__assign(tslib_1.__assign({}, params), { uploadId: state.uploadId, key: state.key, filename: file.name, partList: partList })), {
                    method: 'post',
                    autoAppend: true
                });
                self._send(endApi).then(resolve).catch(reject);
            }
            function uploadPartFile(state, conf) {
                return function (task, callback) {
                    var api = api_1.buildApi(conf.chunkApi, helper_1.createObject(config.data, params), {
                        method: 'post'
                    });
                    var fd = new FormData();
                    var blob = task.file.slice(task.start, task.stop + 1);
                    helper_1.qsstringify(tslib_1.__assign(tslib_1.__assign({}, api.data), params))
                        .split('&')
                        .forEach(function (item) {
                        var parts = item.split('=');
                        fd.append(parts[0], decodeURIComponent(parts[1]));
                    });
                    fd.append('key', state.key);
                    fd.append('uploadId', state.uploadId);
                    fd.append('partNumber', task.partNumber.toString());
                    fd.append('partSize', task.partSize.toString());
                    // Note: File类型字段放在后面，可以支持第三方云存储鉴权
                    fd.append(config.fieldName || 'file', blob, file.name);
                    return self
                        ._send(api, fd, {}, function (progress) {
                        return updateProgress(task.partNumber, progress);
                    })
                        .then(function (ret) {
                        state.loaded++;
                        callback(null, {
                            partNumber: task.partNumber,
                            eTag: ret.data.eTag
                        });
                    })
                        .catch(callback);
                };
            }
            function getTasks(file) {
                var leftSize = file.size;
                var offset = 0;
                var partNumber = 1;
                var tasks = [];
                while (leftSize > 0) {
                    var partSize = Math.min(leftSize, chunkSize);
                    tasks.push({
                        file: file,
                        partNumber: partNumber,
                        partSize: partSize,
                        start: offset,
                        stop: offset + partSize - 1
                    });
                    leftSize -= partSize;
                    offset += partSize;
                    partNumber += 1;
                }
                return tasks;
            }
        });
    };
    FileControl.prototype._send = function (api, data, options, onProgress) {
        var env = this.props.env;
        if (!env || !env.fetcher) {
            throw new Error('fetcher is required');
        }
        return env.fetcher(api, data, tslib_1.__assign(tslib_1.__assign({ method: 'post' }, options), { withCredentials: true, onUploadProgress: onProgress
                ? function (event) {
                    return onProgress(event.loaded / event.total);
                }
                : undefined }));
    };
    FileControl.prototype.validate = function () {
        var _this = this;
        var __ = this.props.translate;
        if (this.state.uploading ||
            this.state.files.some(function (item) { return item.state === 'pending'; })) {
            return new Promise(function (resolve) {
                _this.resolve = resolve;
                _this.startUpload();
            });
        }
        else if (this.state.files.some(function (item) { return item.state === 'error'; })) {
            return __('File.errorRetry');
        }
    };
    FileControl.prototype.render = function () {
        var _this = this;
        var _a = this.props, btnLabel = _a.btnLabel, accept = _a.accept, disabled = _a.disabled, maxLength = _a.maxLength, multiple = _a.multiple, autoUpload = _a.autoUpload, description = _a.description, hideUploadButton = _a.hideUploadButton, className = _a.className, cx = _a.classnames, __ = _a.translate, render = _a.render;
        var _b = this.state, files = _b.files, uploading = _b.uploading, error = _b.error;
        var hasPending = files.some(function (file) { return file.state == 'pending'; });
        var uploaded = 0;
        var failed = 0;
        this.state.uploading ||
            this.state.files.forEach(function (item) {
                if (item.state === 'error') {
                    failed++;
                }
                else if (item.state === 'uploaded') {
                    uploaded++;
                }
            });
        return (react_1.default.createElement("div", { className: cx('FileControl', className) },
            react_1.default.createElement(react_dropzone_1.default, { key: "drop-zone", ref: this.dropzone, onDrop: this.handleDrop, onDropRejected: this.handleDropRejected, accept: accept === '*' ? '' : accept, multiple: multiple }, function (_a) {
                var getRootProps = _a.getRootProps, getInputProps = _a.getInputProps, isDragActive = _a.isDragActive;
                return (react_1.default.createElement("div", tslib_1.__assign({}, getRootProps({
                    onClick: preventEvent
                }), { className: cx('FileControl-dropzone', {
                        disabled: disabled,
                        'is-empty': !files.length,
                        'is-active': isDragActive
                    }) }),
                    react_1.default.createElement("input", tslib_1.__assign({}, getInputProps())),
                    isDragActive ? (react_1.default.createElement("div", { className: cx('FileControl-acceptTip') }, __('File.dragDrop'))) : (react_1.default.createElement(react_1.default.Fragment, null,
                        (multiple && (!maxLength || files.length < maxLength)) ||
                            !multiple ? (react_1.default.createElement(Button_1.default, { level: "default", disabled: disabled, className: cx('FileControl-selectBtn'), onClick: _this.handleSelect },
                            react_1.default.createElement(icons_1.Icon, { icon: "upload", className: "icon" }),
                            !multiple && files.length
                                ? __('File.repick')
                                : multiple && files.length
                                    ? __('File.continueAdd')
                                    : btnLabel
                                        ? btnLabel
                                        : __('File.upload'))) : null,
                        description
                            ? render('desc', description, {
                                className: cx('FileControl-description')
                            })
                            : null,
                        Array.isArray(files) ? (react_1.default.createElement("ul", { className: cx('FileControl-list') }, files.map(function (file, index) { return (react_1.default.createElement("li", { key: file.id },
                            react_1.default.createElement("div", { className: cx('FileControl-itemInfo', {
                                    'is-invalid': file.state === 'invalid' ||
                                        file.state === 'error'
                                }) },
                                react_1.default.createElement(icons_1.Icon, { icon: "file", className: "icon" }),
                                file.url ? (react_1.default.createElement("a", { className: cx('FileControl-itemInfoText'), target: "_blank", rel: "noopener", href: file.url }, file.name || file.filename)) : (react_1.default.createElement("span", { className: cx('FileControl-itemInfoText') }, file.name || file.filename)),
                                file.state === 'invalid' ||
                                    file.state === 'error' ? (react_1.default.createElement(icons_1.Icon, { icon: "fail", className: "icon" })) : null,
                                file.state !== 'uploading' && !disabled ? (react_1.default.createElement("a", { "data-tooltip": __('Select.clear'), className: cx('FileControl-clear'), onClick: function () { return _this.removeFile(file, index); } },
                                    react_1.default.createElement(icons_1.Icon, { icon: "close", className: "icon" }))) : null),
                            file.state === 'uploading' ||
                                file.state === 'uploaded' ? (react_1.default.createElement("div", { className: cx('FileControl-progressInfo') },
                                react_1.default.createElement("div", { className: cx('FileControl-progress') },
                                    react_1.default.createElement("span", { style: {
                                            width: (file.state === 'uploaded'
                                                ? 100
                                                : (file.progress || 0) * 100) + "%"
                                        } })),
                                file.state === 'uploaded' ? (react_1.default.createElement(icons_1.Icon, { icon: "success", className: "icon" })) : (react_1.default.createElement("span", null,
                                    Math.round((file.progress || 0) * 100),
                                    "%")))) : null)); }))) : null))));
            }),
            failed ? (react_1.default.createElement("div", { className: cx('FileControl-sum') },
                __('File.result', {
                    uploaded: uploaded,
                    failed: failed
                }),
                react_1.default.createElement("a", { onClick: this.retry }, __('File.retry')),
                __('File.failed'))) : null,
            !autoUpload && !hideUploadButton && files.length ? (react_1.default.createElement(Button_1.default, { level: "default", disabled: !hasPending, className: cx('FileControl-uploadBtn'), onClick: this.toggleUpload }, __(uploading ? 'File.pause' : 'File.start'))) : null));
    };
    FileControl.defaultProps = {
        maxSize: 0,
        maxLength: 0,
        placeholder: '',
        receiver: '/api/upload/file',
        fileField: 'file',
        joinValues: true,
        extractValue: false,
        delimiter: ',',
        downloadUrl: '',
        useChunk: 'auto',
        chunkSize: 5 * 1024 * 1024,
        startChunkApi: '/api/upload/startChunk',
        chunkApi: '/api/upload/chunk',
        finishChunkApi: '/api/upload/finishChunk',
        accept: '',
        multiple: false,
        autoUpload: true,
        hideUploadButton: false,
        stateTextMap: {
            init: '',
            pending: '等待上传',
            uploading: '上传中',
            error: '上传出错',
            uploaded: '已上传',
            ready: ''
        },
        asBase64: false
    };
    return FileControl;
}(react_1.default.Component));
exports.default = FileControl;
var FileControlRenderer = /** @class */ (function (_super) {
    tslib_1.__extends(FileControlRenderer, _super);
    function FileControlRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FileControlRenderer = tslib_1.__decorate([
        Item_1.FormItem({
            type: 'file',
            sizeMutable: false,
            renderDescription: false
        })
    ], FileControlRenderer);
    return FileControlRenderer;
}(FileControl));
exports.FileControlRenderer = FileControlRenderer;
//# sourceMappingURL=./renderers/Form/File.js.map
