"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageControlRenderer = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var Item_1 = require("./Item");
require("cropperjs/dist/cropper.css");
var react_cropper_1 = tslib_1.__importDefault(require("react-cropper"));
var react_dropzone_1 = tslib_1.__importDefault(require("react-dropzone"));
require("blueimp-canvastoblob");
var find_1 = tslib_1.__importDefault(require("lodash/find"));
var qs_1 = tslib_1.__importDefault(require("qs"));
var api_1 = require("../../utils/api");
var helper_1 = require("../../utils/helper");
var icons_1 = require("../../components/icons");
var Button_1 = tslib_1.__importDefault(require("../../components/Button"));
var attr_accept_1 = tslib_1.__importDefault(require("attr-accept"));
var File_1 = require("./File");
var Image_1 = tslib_1.__importDefault(require("../Image"));
var tpl_builtin_1 = require("../../utils/tpl-builtin");
var tpl_1 = require("../../utils/tpl");
var preventEvent = function (e) { return e.stopPropagation(); };
var ImageControl = /** @class */ (function (_super) {
    tslib_1.__extends(ImageControl, _super);
    function ImageControl(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            uploading: false,
            locked: false,
            files: []
        };
        _this.files = [];
        _this.cropper = react_1.default.createRef();
        _this.dropzone = react_1.default.createRef();
        _this.current = null;
        _this.unmounted = false;
        var value = props.value;
        var multiple = props.multiple;
        var joinValues = props.joinValues;
        var delimiter = props.delimiter;
        var files = [];
        if (value) {
            // files = (multiple && Array.isArray(value) ? value : joinValues ? (value as string).split(delimiter) : [value])
            files = (Array.isArray(value)
                ? value
                : joinValues && typeof value === 'string' && multiple
                    ? value.split(delimiter)
                    : [value])
                .map(function (item) { return ImageControl.valueToFile(item); })
                .filter(function (item) { return item; });
        }
        _this.state = tslib_1.__assign(tslib_1.__assign({}, _this.state), { files: (_this.files = files), crop: _this.buildCrop(props) });
        _this.sendFile = _this.sendFile.bind(_this);
        _this.removeFile = _this.removeFile.bind(_this);
        _this.handleDrop = _this.handleDrop.bind(_this);
        _this.handleClick = _this.handleClick.bind(_this);
        _this.handleClick = _this.handleClick.bind(_this);
        _this.handleCrop = _this.handleCrop.bind(_this);
        _this.handleDropRejected = _this.handleDropRejected.bind(_this);
        _this.cancelCrop = _this.cancelCrop.bind(_this);
        _this.handleImageLoaded = _this.handleImageLoaded.bind(_this);
        _this.startUpload = _this.startUpload.bind(_this);
        _this.stopUpload = _this.stopUpload.bind(_this);
        _this.toggleUpload = _this.toggleUpload.bind(_this);
        _this.tick = _this.tick.bind(_this);
        _this.onChange = _this.onChange.bind(_this);
        _this.addFiles = _this.addFiles.bind(_this);
        _this.handleSelect = _this.handleSelect.bind(_this);
        _this.handlePaste = _this.handlePaste.bind(_this);
        return _this;
    }
    ImageControl.formatFileSize = function (size, units) {
        if (units === void 0) { units = [' B', ' KB', ' M', ' G']; }
        size = parseInt(size, 10) || 0;
        while (size > 1024 && units.length > 1) {
            size /= 1024;
            units.shift();
        }
        return size.toFixed(2) + units[0];
    };
    ImageControl.valueToFile = function (value, props) {
        return value
            ? tslib_1.__assign(tslib_1.__assign({}, (typeof value === 'string'
                ? {
                    value: value,
                    url: value,
                    id: helper_1.guid()
                }
                : value)), { state: 'init' }) : undefined;
    };
    ImageControl.sizeInfo = function (width, height, __) {
        if (!width) {
            return __('Image.height', { height: height });
        }
        else if (!height) {
            return __('Image.width', { width: width });
        }
        return __('Image.size', { width: width, height: height });
    };
    ImageControl.prototype.componentWillReceiveProps = function (nextProps) {
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
                    var obj = ImageControl.valueToFile(item, nextProps);
                    var org;
                    if (obj &&
                        (org = find_1.default(_this.files, function (item) { return item.value === obj.value; }))) {
                        obj = tslib_1.__assign(tslib_1.__assign(tslib_1.__assign({}, org), obj), { id: org.id || obj.id });
                    }
                    return obj;
                })
                    .filter(function (item) { return item; });
            }
            this.setState({
                files: (this.files = files)
            });
        }
        if (props.crop !== nextProps.crop) {
            this.setState({
                crop: this.buildCrop(nextProps)
            });
        }
    };
    ImageControl.prototype.componentWillUnmount = function () {
        this.unmounted = true;
    };
    ImageControl.prototype.buildCrop = function (props) {
        var crop = props.crop;
        var __ = this.props.translate;
        if (crop && props.multiple) {
            props.env && props.env.alert && props.env.alert(__('Image.configError'));
            return null;
        }
        if (crop === true) {
            crop = {};
        }
        if (crop) {
            crop = tslib_1.__assign({ aspectRatio: undefined, guides: true, dragMode: 'move', viewMode: 1, rotatable: false, scalable: false }, crop);
        }
        return crop;
    };
    ImageControl.prototype.handleDropRejected = function (rejectedFiles, evt) {
        if (evt.type !== 'change' && evt.type !== 'drop') {
            return;
        }
        var _a = this.props, multiple = _a.multiple, env = _a.env, accept = _a.accept, __ = _a.translate;
        var files = rejectedFiles.map(function (fileRejection) { return (tslib_1.__assign(tslib_1.__assign({}, fileRejection.file), { state: 'invalid', id: helper_1.guid(), name: fileRejection.file.name })); });
        // this.setState({
        //   files: this.files = multiple
        //     ? this.files.concat(files)
        //     : this.files.length
        //     ? this.files
        //     : files.slice(0, 1)
        // });
        env.alert(__('File.invalidType', {
            files: files.map(function (file) { return "\u300C" + file.name + "\u300D"; }).join(' '),
            accept: accept
        }));
    };
    ImageControl.prototype.startUpload = function (retry) {
        if (retry === void 0) { retry = false; }
        if (this.state.uploading) {
            return;
        }
        this.setState({
            uploading: true,
            locked: true,
            files: (this.files = this.files.map(function (file) {
                if (retry && file.state === 'error') {
                    file.state = 'pending';
                    file.progress = 0;
                }
                return file;
            }))
        }, this.tick);
    };
    ImageControl.prototype.toggleUpload = function () {
        return this.state.uploading ? this.stopUpload() : this.startUpload();
    };
    ImageControl.prototype.stopUpload = function () {
        if (!this.state.uploading) {
            return;
        }
        this.setState({
            uploading: false
        });
    };
    ImageControl.prototype.tick = function () {
        var _this = this;
        var _a = this.props, multiple = _a.multiple, autoFill = _a.autoFill, onBulkChange = _a.onBulkChange;
        if (this.current || !this.state.uploading) {
            return;
        }
        var env = this.props.env;
        var __ = this.props.translate;
        var file = find_1.default(this.files, function (item) { return item.state === 'pending'; });
        if (file) {
            this.current = file;
            file.state = 'uploading';
            this.setState({
                files: (this.files = this.files.concat())
            }, function () {
                return _this.sendFile(file, function (error, file, obj) {
                    var files = _this.files.concat();
                    var idx = files.indexOf(file);
                    if (!~idx) {
                        return;
                    }
                    var newFile = file;
                    if (error) {
                        newFile.state =
                            file.state !== 'uploading' ? file.state : 'error';
                        newFile.error = error;
                        if (!_this.props.multiple && newFile.state === 'invalid') {
                            files.splice(idx, 1);
                            _this.current = null;
                            return _this.setState({
                                files: (_this.files = files),
                                error: error
                            }, _this.tick);
                        }
                        env.notify('error', error || __('File.errorRetry'));
                    }
                    else {
                        newFile = tslib_1.__assign(tslib_1.__assign({ name: file.name }, obj), { preview: file.preview });
                    }
                    files.splice(idx, 1, newFile);
                    _this.current = null;
                    _this.setState({
                        files: (_this.files = files)
                    }, function () {
                        // todo 这个逻辑应该移到 onChange 里面去，因为这个时候并不一定修改了表单项的值。
                        var sendTo = !multiple &&
                            autoFill &&
                            !helper_1.isEmpty(autoFill) &&
                            tpl_builtin_1.dataMapping(autoFill, newFile || {});
                        sendTo && onBulkChange(sendTo);
                        _this.tick();
                    });
                }, function (progress) {
                    var files = _this.files.concat();
                    var idx = files.indexOf(file);
                    if (!~idx) {
                        return;
                    }
                    // file 是个非 File 对象，先不copy了直接改。
                    file.progress = progress;
                    _this.setState({
                        files: (_this.files = files)
                    });
                });
            });
        }
        else {
            this.setState({
                uploading: false,
                locked: false
            }, function () {
                _this.onChange(!!_this.resolve);
                if (_this.resolve) {
                    _this.resolve(_this.files.some(function (file) { return file.state === 'error'; })
                        ? __('File.errorRetry')
                        : null);
                    _this.resolve = undefined;
                }
            });
        }
    };
    ImageControl.prototype.removeFile = function (file, index) {
        var files = this.files.concat();
        files.splice(index, 1);
        this.setState({
            files: (this.files = files)
        }, this.onChange);
    };
    ImageControl.prototype.previewImage = function (file, index, e) {
        var onImageEnlarge = this.props.onImageEnlarge;
        if (onImageEnlarge) {
            var files = this.files;
            e.preventDefault();
            onImageEnlarge({
                src: (file.preview || file.url),
                originalSrc: (file.preview || file.url),
                index: index,
                list: files.map(function (file) { return ({
                    src: (file.preview || file.url),
                    originalSrc: (file.preview || file.url),
                    title: file.name || File_1.getNameFromUrl(file.value || file.url)
                }); })
            });
        }
    };
    ImageControl.prototype.editImage = function (index) {
        var files = this.files;
        this.setState({
            cropFile: {
                preview: files[index].preview || files[index].url,
                state: 'init'
            }
        });
    };
    ImageControl.prototype.onChange = function (changeImmediately) {
        var _a = this.props, multiple = _a.multiple, onChange = _a.onChange, joinValues = _a.joinValues, extractValue = _a.extractValue, delimiter = _a.delimiter, valueField = _a.valueField;
        var files = this.files.filter(function (file) { return file.state == 'uploaded' || file.state == 'init'; });
        var newValue = files.length
            ? joinValues
                ? files[0].value
                : files[0]
            : '';
        if (multiple) {
            newValue = joinValues
                ? files.map(function (item) { return item.value; }).join(delimiter)
                : extractValue
                    ? files.map(function (item) { return item.value; })
                    : files;
        }
        else {
            newValue = joinValues
                ? newValue.value || newValue
                : extractValue
                    ? newValue[valueField || 'value']
                    : newValue;
        }
        onChange((this.emitValue = newValue || ''), undefined, changeImmediately);
    };
    ImageControl.prototype.handleSelect = function () {
        this.dropzone.current && this.dropzone.current.open();
    };
    ImageControl.prototype.handleRetry = function (index) {
        var files = this.files.concat();
        var file = files[index];
        if (file.state !== 'invalid' && file.state !== 'error') {
            return;
        }
        file.state = 'pending';
        file.progress = 0;
        this.setState({
            files: files
        }, this.startUpload);
    };
    ImageControl.prototype.handleDrop = function (files) {
        var _a = this.props, multiple = _a.multiple, crop = _a.crop;
        if (crop && !multiple) {
            var file = files[0];
            if (!file.preview || !file.url) {
                file.preview = window.URL.createObjectURL(file);
            }
            return this.setState({
                cropFile: file
            });
        }
        this.addFiles(files);
    };
    ImageControl.prototype.handlePaste = function (e) {
        var event = e.nativeEvent;
        var files = [];
        var items = event.clipboardData.items;
        var accept = this.props.accept || '*';
        [].slice.call(items).forEach(function (item) {
            var blob;
            if (item.kind !== 'file' ||
                !(blob = item.getAsFile()) ||
                !attr_accept_1.default(blob, accept)) {
                return;
            }
            blob.id = helper_1.guid();
            files.push(blob);
        });
        this.handleDrop(files);
    };
    ImageControl.prototype.handleCrop = function () {
        var _this = this;
        this.cropper.current.getCroppedCanvas().toBlob(function (file) {
            _this.addFiles([file]);
            _this.setState({
                cropFile: undefined,
                locked: false,
                lockedReason: ''
            });
        });
    };
    ImageControl.prototype.cancelCrop = function () {
        this.setState({
            cropFile: undefined,
            locked: false,
            lockedReason: ''
        }, this.onChange);
    };
    ImageControl.prototype.addFiles = function (files) {
        var _this = this;
        if (!files.length) {
            return;
        }
        var _a = this.props, multiple = _a.multiple, maxLength = _a.maxLength, maxSize = _a.maxSize, accept = _a.accept, __ = _a.translate;
        var currentFiles = this.files;
        if (!multiple && currentFiles.length) {
            currentFiles = [];
        }
        var allowed = (multiple
            ? maxLength
                ? maxLength
                : files.length + currentFiles.length
            : 1) - currentFiles.length;
        var inputFiles = [];
        [].slice.call(files, 0, allowed).forEach(function (file) {
            if (maxSize && file.size > maxSize) {
                _this.props.env.alert(__('File.maxSize', {
                    filename: file.name,
                    actualSize: ImageControl.formatFileSize(file.size),
                    maxSize: ImageControl.formatFileSize(maxSize)
                }));
                return;
            }
            file.state = 'pending';
            file.id = helper_1.guid();
            if (!file.preview || !file.url) {
                file.preview = URL.createObjectURL(file);
            }
            inputFiles.push(file);
        });
        if (!inputFiles.length) {
            return;
        }
        this.setState({
            error: undefined,
            files: (this.files = currentFiles.concat(inputFiles)),
            locked: true
        }, function () {
            var autoUpload = _this.props.autoUpload;
            if (autoUpload) {
                _this.startUpload();
            }
        });
    };
    ImageControl.prototype.sendFile = function (file, cb, onProgress) {
        var _this = this;
        var _a = this.props, limit = _a.limit, __ = _a.translate;
        if (!limit) {
            return this._upload(file, cb, onProgress);
        }
        var image = new Image();
        image.onload = function () {
            var width = image.width;
            var height = image.height;
            var error = '';
            if ((limit.width && limit.width != width) ||
                (limit.height && limit.height != height)) {
                error = __('Image.sizeNotEqual', {
                    info: ImageControl.sizeInfo(limit.width, limit.height, __)
                });
            }
            else if ((limit.maxWidth && limit.maxWidth < width) ||
                (limit.maxHeight && limit.maxHeight < height)) {
                error = __('Image.limitMax', {
                    info: ImageControl.sizeInfo(limit.maxWidth, limit.maxHeight, __)
                });
            }
            else if ((limit.minWidth && limit.minWidth > width) ||
                (limit.minHeight && limit.minHeight > height)) {
                error = __('Image.limitMin', {
                    info: ImageControl.sizeInfo(limit.minWidth, limit.minHeight, __)
                });
            }
            else if (limit.aspectRatio &&
                Math.abs(width / height - limit.aspectRatio) > 0.01) {
                error = __(limit.aspectRatioLabel || 'Image.limitRatio', {
                    ratio: limit.aspectRatio.toFixed(2)
                });
            }
            if (error) {
                file.state = 'invalid';
                cb(error, file);
            }
            else {
                _this._upload(file, cb, onProgress);
            }
        };
        image.src = (file.preview || file.url);
    };
    ImageControl.prototype._upload = function (file, cb, onProgress) {
        var __ = this.props.translate;
        this._send(file, this.props.receiver, {}, onProgress)
            .then(function (ret) {
            if (ret.status) {
                throw new Error(ret.msg || __('File.errorRetry'));
            }
            var obj = tslib_1.__assign(tslib_1.__assign({}, ret.data), { state: 'uploaded' });
            obj.value = obj.value || obj.url;
            cb(null, file, obj);
        })
            .catch(function (error) { return cb(error.message || __('File.errorRetry'), file); });
    };
    ImageControl.prototype._send = function (file, receiver, params, onProgress) {
        var fd = new FormData();
        var data = this.props.data;
        var api = api_1.buildApi(receiver, helper_1.createObject(data, params), {
            method: 'post'
        });
        var fileField = this.props.fileField || 'file';
        var idx = api.url.indexOf('?');
        if (~idx && params) {
            params = tslib_1.__assign(tslib_1.__assign({}, qs_1.default.parse(api.url.substring(idx + 1))), params);
            api.url = api.url.substring(0, idx) + '?' + helper_1.qsstringify(params);
        }
        else if (params) {
            api.url += '?' + helper_1.qsstringify(params);
        }
        if (api.data) {
            helper_1.qsstringify(api.data)
                .split('&')
                .forEach(function (item) {
                var parts = item.split('=');
                fd.append(parts[0], decodeURIComponent(parts[1]));
            });
        }
        // Note: File类型字段放在后面，可以支持第三方云存储鉴权
        fd.append(fileField, file, file.name);
        var env = this.props.env;
        if (!env || !env.fetcher) {
            throw new Error('fetcher is required');
        }
        return env.fetcher(api, fd, {
            method: 'post',
            onUploadProgress: function (event) {
                return onProgress(event.loaded / event.total);
            }
        });
    };
    ImageControl.prototype.handleClick = function () {
        this.refs.dropzone.open();
    };
    ImageControl.prototype.handleImageLoaded = function (index, e) {
        var _this = this;
        var imgDom = e.currentTarget;
        var img = new Image();
        img.onload = function () {
            delete img.onload;
            var files = _this.files.concat();
            var file = files[index];
            if (!file) {
                return;
            }
            file.info = tslib_1.__assign(tslib_1.__assign({}, file.info), { width: img.width, height: img.height });
            files.splice(index, 1, file);
            var needUploading = !!(_this.current || find_1.default(files, function (file) { return file.state === 'pending'; }));
            _this.unmounted ||
                _this.setState({
                    files: (_this.files = files)
                }, !needUploading ? _this.onChange : undefined);
        };
        img.src = imgDom.src;
    };
    ImageControl.prototype.validate = function () {
        var _this = this;
        var __ = this.props.translate;
        if (this.state.locked && this.state.lockedReason) {
            return this.state.lockedReason;
        }
        else if (this.state.cropFile) {
            return new Promise(function (resolve) {
                _this.resolve = resolve;
                _this.handleCrop();
            });
        }
        else if (this.state.uploading ||
            this.files.some(function (item) { return item.state === 'pending'; })) {
            return new Promise(function (resolve) {
                _this.resolve = resolve;
                _this.startUpload();
            });
        }
        else if (this.files.some(function (item) { return item.state === 'error'; })) {
            return __('File.errorRetry');
        }
    };
    ImageControl.prototype.render = function () {
        var _this = this;
        var _a = this.props, className = _a.className, cx = _a.classnames, placeholder = _a.placeholder, disabled = _a.disabled, multiple = _a.multiple, accept = _a.accept, maxLength = _a.maxLength, autoUpload = _a.autoUpload, hideUploadButton = _a.hideUploadButton, thumbMode = _a.thumbMode, thumbRatio = _a.thumbRatio, reCropable = _a.reCropable, defaultImage = _a.defaultImage, fixedSize = _a.fixedSize, fixedSizeClassName = _a.fixedSizeClassName, __ = _a.translate;
        var _b = this.state, files = _b.files, error = _b.error, crop = _b.crop, uploading = _b.uploading, cropFile = _b.cropFile;
        var hasPending = files.some(function (file) { return file.state == 'pending'; });
        return (react_1.default.createElement("div", { className: cx("ImageControl", className) }, cropFile ? (react_1.default.createElement("div", { className: cx('ImageControl-cropperWrapper') },
            react_1.default.createElement(react_cropper_1.default, tslib_1.__assign({}, crop, { ref: this.cropper, src: cropFile.preview })),
            react_1.default.createElement("div", { className: cx('ImageControl-croperToolbar') },
                react_1.default.createElement("a", { className: cx('ImageControl-cropCancel'), onClick: this.cancelCrop, "data-tooltip": __('cancle'), "data-position": "left" },
                    react_1.default.createElement(icons_1.Icon, { icon: "close", className: "icon" })),
                react_1.default.createElement("a", { className: cx('ImageControl-cropConfirm'), onClick: this.handleCrop, "data-tooltip": __('confirm'), "data-position": "left" },
                    react_1.default.createElement(icons_1.Icon, { icon: "check", className: "icon" }))))) : (react_1.default.createElement(react_dropzone_1.default, { key: "drop-zone", ref: this.dropzone, onDrop: this.handleDrop, onDropRejected: this.handleDropRejected, accept: accept, multiple: multiple }, function (_a) {
            var getRootProps = _a.getRootProps, getInputProps = _a.getInputProps, isDragActive = _a.isDragActive, isDragAccept = _a.isDragAccept, isDragReject = _a.isDragReject, isFocused = _a.isFocused;
            return (react_1.default.createElement("div", tslib_1.__assign({}, getRootProps({
                onClick: preventEvent,
                onPaste: _this.handlePaste,
                className: cx('ImageControl-dropzone', {
                    disabled: disabled,
                    'is-empty': !files.length,
                    'is-active': isDragActive
                })
            })),
                react_1.default.createElement("input", tslib_1.__assign({}, getInputProps())),
                isDragActive || isDragAccept || isDragReject ? (react_1.default.createElement("div", { className: cx('ImageControl-acceptTip', {
                        'is-accept': isDragAccept,
                        'is-reject': isDragReject
                    }) }, __('Image.dragDrop'))) : (react_1.default.createElement(react_1.default.Fragment, null,
                    files && files.length
                        ? files.map(function (file, key) { return (react_1.default.createElement("div", { key: file.id || key, className: cx('ImageControl-item', {
                                'is-uploaded': file.state !== 'uploading',
                                'is-invalid': file.state === 'error' ||
                                    file.state === 'invalid'
                            }, fixedSize ? 'ImageControl-fixed-size' : '', fixedSize ? fixedSizeClassName : '') }, file.state === 'invalid' ||
                            file.state === 'error' ? (react_1.default.createElement(react_1.default.Fragment, null,
                            react_1.default.createElement("a", { className: cx('ImageControl-itemClear'), "data-tooltip": __('Select.clear'), "data-position": "bottom", onClick: _this.removeFile.bind(_this, file, key) },
                                react_1.default.createElement(icons_1.Icon, { icon: "close", className: "icon" })),
                            react_1.default.createElement("a", { className: cx('ImageControl-retryBtn', {
                                    'is-disabled': disabled
                                }, fixedSize ? 'ImageControl-fixed-size' : '', fixedSize ? fixedSizeClassName : ''), onClick: _this.handleRetry.bind(_this, key) },
                                react_1.default.createElement(icons_1.Icon, { icon: "retry", className: "icon" }),
                                react_1.default.createElement("p", { className: "ImageControl-itemInfoError" }, __('File.repick'))))) : file.state === 'uploading' ? (react_1.default.createElement(react_1.default.Fragment, null,
                            react_1.default.createElement("a", { onClick: _this.removeFile.bind(_this, file, key), key: "clear", className: cx('ImageControl-itemClear'), "data-tooltip": __('Select.clear') },
                                react_1.default.createElement(icons_1.Icon, { icon: "close", className: "icon" })),
                            react_1.default.createElement("div", { key: "info", className: cx('ImageControl-itemInfo', fixedSize ? 'ImageControl-fixed-size' : '', fixedSize ? fixedSizeClassName : '') },
                                react_1.default.createElement("p", null, __('File.uploading')),
                                react_1.default.createElement("div", { className: cx('ImageControl-progress') },
                                    react_1.default.createElement("span", { style: {
                                            width: Math.round(file.progress * 100) + "%"
                                        }, className: cx('ImageControl-progressValue') }))))) : (react_1.default.createElement(react_1.default.Fragment, null,
                            react_1.default.createElement(Image_1.default, { key: "image", className: cx('ImageControl-image', fixedSize ? 'Image-thumb--fixed-size' : ''), onLoad: _this.handleImageLoaded.bind(_this, key), src: file.preview || file.url, alt: file.name, thumbMode: thumbMode, thumbRatio: thumbRatio }),
                            react_1.default.createElement("div", { key: "overlay", className: cx('ImageControl-itemOverlay') },
                                file.info ? ([
                                    react_1.default.createElement("div", { key: "info" },
                                        file.info.width,
                                        " x ",
                                        file.info.height),
                                    file.info.len ? (react_1.default.createElement("div", { key: "size" }, ImageControl.formatFileSize(file.info.len))) : null
                                ]) : (react_1.default.createElement("div", null, "...")),
                                react_1.default.createElement("a", { "data-tooltip": __('Image.zoomIn'), "data-position": "bottom", target: "_blank", rel: "noopener", href: file.url || file.preview, onClick: _this.previewImage.bind(_this, file, key) },
                                    react_1.default.createElement(icons_1.Icon, { icon: "view", className: "icon" })),
                                !!crop &&
                                    reCropable !== false &&
                                    !disabled ? (react_1.default.createElement("a", { "data-tooltip": __('Image.crop'), "data-position": "bottom", onClick: _this.editImage.bind(_this, key) },
                                    react_1.default.createElement(icons_1.Icon, { icon: "pencil", className: "icon" }))) : null,
                                !disabled ? (react_1.default.createElement("a", { "data-tooltip": __('Select.clear'), "data-position": "bottom", onClick: _this.removeFile.bind(_this, file, key) },
                                    react_1.default.createElement(icons_1.Icon, { icon: "remove", className: "icon" }))) : null,
                                react_1.default.createElement("a", { "data-tooltip": file.name ||
                                        File_1.getNameFromUrl(file.value || file.url), "data-position": "bottom", target: "_blank" },
                                    react_1.default.createElement(icons_1.Icon, { icon: "info", className: "icon" }))))))); })
                        : null,
                    (multiple && (!maxLength || files.length < maxLength)) ||
                        (!multiple && !files.length) ? (react_1.default.createElement("label", { className: cx('ImageControl-addBtn', {
                            'is-disabled': disabled
                        }, fixedSize ? 'ImageControl-fixed-size' : '', fixedSize ? fixedSizeClassName : ''), onClick: _this.handleSelect, "data-tooltip": __(placeholder), "data-position": "right" },
                        defaultImage ? (react_1.default.createElement(Image_1.default, { key: "upload-default-image", src: tpl_1.filter(defaultImage, _this.props.data, '| raw'), className: cx(fixedSize ? 'Image-thumb--fixed-size' : '') })) : (react_1.default.createElement(icons_1.Icon, { icon: "plus", className: "icon" })),
                        isFocused ? (react_1.default.createElement("span", { className: cx('ImageControl-pasteTip') }, __('Image.pasteTip'))) : null)) : null,
                    !autoUpload && !hideUploadButton && files.length ? (react_1.default.createElement(Button_1.default, { level: "default", className: cx('ImageControl-uploadBtn'), disabled: !hasPending, onClick: _this.toggleUpload }, __(uploading ? 'File.pause' : 'File.start'))) : null,
                    error ? (react_1.default.createElement("div", { className: cx('ImageControl-errorMsg') }, error)) : null))));
        }))));
    };
    ImageControl.defaultProps = {
        limit: undefined,
        accept: 'image/jpeg, image/jpg, image/png, image/gif',
        receiver: '/api/upload',
        hideUploadButton: false,
        placeholder: 'Image.placeholder',
        joinValues: true,
        extractValue: false,
        delimiter: ',',
        autoUpload: true,
        multiple: false
    };
    return ImageControl;
}(react_1.default.Component));
exports.default = ImageControl;
var ImageControlRenderer = /** @class */ (function (_super) {
    tslib_1.__extends(ImageControlRenderer, _super);
    function ImageControlRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ImageControlRenderer = tslib_1.__decorate([
        Item_1.FormItem({
            type: 'image',
            sizeMutable: false
        })
    ], ImageControlRenderer);
    return ImageControlRenderer;
}(ImageControl));
exports.ImageControlRenderer = ImageControlRenderer;
//# sourceMappingURL=./renderers/Form/Image.js.map
