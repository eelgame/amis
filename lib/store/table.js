"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableStore = exports.Row = exports.Column = void 0;
var tslib_1 = require("tslib");
var mobx_state_tree_1 = require("mobx-state-tree");
var iRenderer_1 = require("./iRenderer");
var tpl_builtin_1 = require("../utils/tpl-builtin");
var isEqual_1 = tslib_1.__importDefault(require("lodash/isEqual"));
var find_1 = tslib_1.__importDefault(require("lodash/find"));
var helper_1 = require("../utils/helper");
var helper_2 = require("../utils/helper");
var manager_1 = require("./manager");
exports.Column = mobx_state_tree_1.types
    .model('Column', {
    label: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.frozen(), undefined),
    type: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.string, 'plain'),
    name: mobx_state_tree_1.types.maybe(mobx_state_tree_1.types.string),
    value: mobx_state_tree_1.types.frozen(),
    groupName: '',
    toggled: false,
    toggable: true,
    expandable: false,
    checkdisable: false,
    isPrimary: false,
    searchable: mobx_state_tree_1.types.maybe(mobx_state_tree_1.types.frozen()),
    sortable: false,
    filterable: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.frozen(), undefined),
    fixed: '',
    index: 0,
    rawIndex: 0,
    breakpoint: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.frozen(), undefined),
    pristine: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.frozen(), undefined),
    remark: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.frozen(), undefined),
    className: ''
})
    .actions(function (self) { return ({
    toggleToggle: function () {
        self.toggled = !self.toggled;
        var table = mobx_state_tree_1.getParent(self, 2);
        if (!table.activeToggaleColumns.length) {
            self.toggled = true;
        }
        table.persistSaveToggledColumns();
    },
    setToggled: function (value) {
        self.toggled = value;
    }
}); });
exports.Row = mobx_state_tree_1.types
    .model('Row', {
    id: mobx_state_tree_1.types.identifier,
    parentId: '',
    key: mobx_state_tree_1.types.string,
    pristine: mobx_state_tree_1.types.frozen({}),
    data: mobx_state_tree_1.types.frozen({}),
    rowSpans: mobx_state_tree_1.types.frozen({}),
    index: mobx_state_tree_1.types.number,
    newIndex: mobx_state_tree_1.types.number,
    expandable: false,
    checkdisable: false,
    isHover: false,
    children: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.array(mobx_state_tree_1.types.late(function () { return exports.Row; })), []),
    depth: mobx_state_tree_1.types.number // 当前children位于第几层，便于使用getParent获取最顶层TableStore
})
    .views(function (self) { return ({
    get checked() {
        return mobx_state_tree_1.getParent(self, self.depth * 2).isSelected(self);
    },
    get modified() {
        if (!self.data) {
            return false;
        }
        return Object.keys(self.data).some(function (key) { return !isEqual_1.default(self.data[key], self.pristine[key]); });
    },
    getDataWithModifiedChilden: function () {
        var data = tslib_1.__assign({}, self.data);
        if (data.children && self.children) {
            data.children = self.children.map(function (item) {
                return item.getDataWithModifiedChilden();
            });
        }
        return data;
    },
    get collapsed() {
        var table = mobx_state_tree_1.getParent(self, self.depth * 2);
        if (table.dragging) {
            return true;
        }
        var from = self;
        while (from && from !== table) {
            if (!table.isExpanded(from)) {
                return true;
            }
            from = mobx_state_tree_1.getParent(from, 2);
        }
        return false;
    },
    get expanded() {
        return !this.collapsed;
    },
    get moved() {
        return self.index !== self.newIndex;
    },
    get locals() {
        return helper_1.createObject(helper_1.extendObject(mobx_state_tree_1.getParent(self, self.depth * 2).data, {
            index: self.index
        }), self.data);
    },
    get checkable() {
        var table = mobx_state_tree_1.getParent(self, self.depth * 2);
        return table && table.itemCheckableOn
            ? helper_2.evalExpression(table.itemCheckableOn, self.locals)
            : true;
    },
    get draggable() {
        var table = mobx_state_tree_1.getParent(self, self.depth * 2);
        return table && table.itemDraggableOn
            ? helper_2.evalExpression(table.itemDraggableOn, self.locals)
            : true;
    }
}); })
    .actions(function (self) { return ({
    toggle: function () {
        mobx_state_tree_1.getParent(self, self.depth * 2).toggle(self);
    },
    toggleExpanded: function () {
        mobx_state_tree_1.getParent(self, self.depth * 2).toggleExpanded(self);
    },
    change: function (values, savePristine) {
        self.data = helper_1.immutableExtends(self.data, values);
        savePristine && (self.pristine = self.data);
    },
    reset: function () {
        self.newIndex = self.index;
        self.data = self.pristine;
    },
    setCheckdisable: function (bool) {
        self.checkdisable = bool;
    },
    setIsHover: function (value) {
        self.isHover = value;
    },
    replaceWith: function (data) {
        Object.keys(data).forEach(function (key) {
            if (key !== 'id') {
                self[key] = data[key];
            }
        });
        if (Array.isArray(data.children)) {
            var arr = data.children;
            var pool = arr.concat();
            // 把多的删了先
            if (self.children.length > arr.length) {
                self.children.splice(arr.length, self.children.length - arr.length);
            }
            var index = 0;
            var len = self.children.length;
            while (pool.length) {
                var item = pool.shift();
                if (index < len) {
                    self.children[index].replaceWith(item);
                }
                else {
                    var row = exports.Row.create(item);
                    self.children.push(row);
                }
                index++;
            }
        }
    }
}); });
exports.TableStore = iRenderer_1.iRendererStore
    .named('TableStore')
    .props({
    columns: mobx_state_tree_1.types.array(exports.Column),
    rows: mobx_state_tree_1.types.array(exports.Row),
    selectedRows: mobx_state_tree_1.types.array(mobx_state_tree_1.types.reference(exports.Row)),
    expandedRows: mobx_state_tree_1.types.array(mobx_state_tree_1.types.reference(exports.Row)),
    primaryField: 'id',
    orderBy: '',
    orderDir: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.union(mobx_state_tree_1.types.literal('asc'), mobx_state_tree_1.types.literal('desc')), 'asc'),
    draggable: false,
    dragging: false,
    selectable: false,
    multiple: true,
    footable: mobx_state_tree_1.types.frozen(),
    expandConfig: mobx_state_tree_1.types.frozen(),
    isNested: false,
    columnsTogglable: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.union(mobx_state_tree_1.types.boolean, mobx_state_tree_1.types.literal('auto')), 'auto'),
    itemCheckableOn: '',
    itemDraggableOn: '',
    hideCheckToggler: false,
    combineNum: 0,
    formsRef: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.array(mobx_state_tree_1.types.frozen()), []),
    maxKeepItemSelectionLength: 0,
    keepItemSelectionOnPageChange: false
})
    .views(function (self) {
    function getForms() {
        return self.formsRef.map(function (item) { return ({
            store: manager_1.getStoreById(item.id),
            rowIndex: item.rowIndex
        }); });
    }
    function getFilteredColumns() {
        return self.columns.filter(function (item) {
            return item &&
                helper_1.isVisible(item.pristine, helper_1.hasVisibleExpression(item.pristine) ? self.data : {}) &&
                (item.type === '__checkme'
                    ? self.selectable &&
                        !self.dragging &&
                        !self.hideCheckToggler &&
                        self.rows.length
                    : item.type === '__dragme'
                        ? self.dragging
                        : item.type === '__expandme'
                            ? (getFootableColumns().length || self.isNested) && !self.dragging
                            : (item.toggled || !item.toggable) &&
                                (!self.footable ||
                                    !item.breakpoint ||
                                    !helper_1.isBreakpoint(item.breakpoint)));
        });
    }
    function getFootableColumns() {
        return self.columns.filter(function (item) {
            return item.type === '__checkme' ||
                item.type === '__dragme' ||
                item.type === '__expandme'
                ? false
                : (item.toggled || !item.toggable) &&
                    self.footable &&
                    item.breakpoint &&
                    helper_1.isBreakpoint(item.breakpoint);
        });
    }
    function getLeftFixedColumns() {
        if (self.dragging) {
            return [];
        }
        var columns = getFilteredColumns().filter(function (item) { return item.fixed === 'left'; });
        // 有才带过去，没有就不带了
        if (columns.length) {
            columns = getFilteredColumns().filter(function (item) { return item.fixed === 'left' || /^__/.test(item.type); });
        }
        return columns;
    }
    function getRightFixedColumns() {
        if (self.dragging) {
            return [];
        }
        return getFilteredColumns().filter(function (item) { return item.fixed === 'right'; });
    }
    function isSelected(row) {
        return !!~self.selectedRows.indexOf(row);
    }
    function isExpanded(row) {
        return !!~self.expandedRows.indexOf(row);
    }
    function getTogglable() {
        if (self.columnsTogglable === 'auto') {
            return self.columns.filter(function (item) { return !/^__/.test(item.type); }).length > 5;
        }
        return self.columnsTogglable;
    }
    function getToggableColumns() {
        return self.columns.filter(function (item) { return helper_1.isVisible(item.pristine, self.data) && item.toggable !== false; });
    }
    function getActiveToggableColumns() {
        return getToggableColumns().filter(function (item) { return item.toggled; });
    }
    function getModifiedRows(rows, modifiedRows) {
        if (rows === void 0) { rows = []; }
        if (modifiedRows === void 0) { modifiedRows = []; }
        rows = rows && rows.length ? rows : self.rows;
        rows.forEach(function (item) {
            if (item.children && item.children.length) {
                getModifiedRows(item.children, modifiedRows);
            }
            var diff = helper_1.difference(item.data, item.pristine);
            var hasDifference = Object.keys(diff).length;
            if (hasDifference) {
                modifiedRows.push(item);
            }
        });
        return modifiedRows;
    }
    function getModified() {
        return getModifiedRows().length;
    }
    function getMovedRows() {
        return helper_1.flattenTree(self.rows).filter(function (item) { return item.moved; });
    }
    function getMoved() {
        return getMovedRows().length;
    }
    function getHoverIndex() {
        return self.rows.findIndex(function (item) { return item.isHover; });
    }
    function getUnSelectedRows() {
        return self.rows.filter(function (item) { return !item.checked; });
    }
    function getData(superData) {
        return helper_1.createObject(superData, {
            items: self.rows.map(function (item) { return item.data; }),
            selectedItems: self.selectedRows.map(function (item) { return item.data; }),
            unSelectedItems: getUnSelectedRows().map(function (item) { return item.data; })
        });
    }
    function getColumnGroup() {
        var columsn = getFilteredColumns();
        var len = columsn.length;
        if (!len) {
            return [];
        }
        var result = [
            {
                label: columsn[0].groupName,
                colSpan: 1,
                index: columsn[0].index,
                has: [columsn[0]]
            }
        ];
        //  如果是勾选栏，让它和下一列合并。
        if (columsn[0].type === '__checkme' && columsn[1]) {
            result[0].label = columsn[1].groupName;
        }
        for (var i = 1; i < len; i++) {
            var prev = result[result.length - 1];
            var current = columsn[i];
            if (current.groupName === prev.label) {
                prev.colSpan++;
                prev.has.push(current);
            }
            else {
                result.push({
                    label: current.groupName,
                    colSpan: 1,
                    index: current.index,
                    has: [current]
                });
            }
        }
        if (result.length === 1 && !result[0].label) {
            result.pop();
        }
        return result;
    }
    return {
        get forms() {
            return getForms();
        },
        get filteredColumns() {
            return getFilteredColumns();
        },
        get footableColumns() {
            return getFootableColumns();
        },
        get leftFixedColumns() {
            return getLeftFixedColumns();
        },
        get rightFixedColumns() {
            return getRightFixedColumns();
        },
        get toggableColumns() {
            return getToggableColumns();
        },
        get activeToggaleColumns() {
            return getActiveToggableColumns();
        },
        get someChecked() {
            return !!self.selectedRows.length;
        },
        get allChecked() {
            return !!(self.selectedRows.length ===
                self.checkableRows.length &&
                self.checkableRows.length);
        },
        isSelected: isSelected,
        get allExpanded() {
            return !!(self.expandedRows.length === self.rows.length && self.rows.length);
        },
        isExpanded: isExpanded,
        get toggable() {
            return getTogglable();
        },
        get modified() {
            return getModified();
        },
        get modifiedRows() {
            return getModifiedRows();
        },
        get unSelectedRows() {
            return getUnSelectedRows();
        },
        get checkableRows() {
            return self.rows.filter(function (item) { return item.checkable; });
        },
        get moved() {
            return getMoved();
        },
        get movedRows() {
            return getMovedRows();
        },
        get hoverIndex() {
            return getHoverIndex();
        },
        get disabledHeadCheckbox() {
            var _a;
            var selectedLength = (_a = self.data) === null || _a === void 0 ? void 0 : _a.selectedItems.length;
            var maxLength = self.maxKeepItemSelectionLength;
            if (!self.data || !self.keepItemSelectionOnPageChange || !maxLength) {
                return false;
            }
            return maxLength === selectedLength;
        },
        getData: getData,
        get columnGroup() {
            return getColumnGroup();
        },
        getRowById: function (id) {
            return helper_1.findTree(self.rows, function (item) { return item.id === id; });
        },
        getItemsByName: function (name) {
            return this.forms
                .filter(function (form) { return form.rowIndex === parseInt(name, 10); })
                .map(function (item) { return item.store; });
        }
    };
})
    .actions(function (self) {
    function update(config) {
        config.primaryField !== void 0 &&
            (self.primaryField = config.primaryField);
        config.selectable !== void 0 && (self.selectable = config.selectable);
        config.columnsTogglable !== void 0 &&
            (self.columnsTogglable = config.columnsTogglable);
        config.draggable !== void 0 && (self.draggable = config.draggable);
        if (typeof config.orderBy === 'string') {
            setOrderByInfo(config.orderBy, config.orderDir === 'desc' ? 'desc' : 'asc');
        }
        config.multiple !== void 0 && (self.multiple = config.multiple);
        config.footable !== void 0 && (self.footable = config.footable);
        config.expandConfig !== void 0 &&
            (self.expandConfig = config.expandConfig);
        config.itemCheckableOn !== void 0 &&
            (self.itemCheckableOn = config.itemCheckableOn);
        config.itemDraggableOn !== void 0 &&
            (self.itemDraggableOn = config.itemDraggableOn);
        config.hideCheckToggler !== void 0 &&
            (self.hideCheckToggler = !!config.hideCheckToggler);
        config.combineNum !== void 0 &&
            (self.combineNum = parseInt(config.combineNum, 10) || 0);
        config.maxKeepItemSelectionLength !== void 0 &&
            (self.maxKeepItemSelectionLength = config.maxKeepItemSelectionLength);
        config.keepItemSelectionOnPageChange !== void 0 &&
            (self.keepItemSelectionOnPageChange = config.keepItemSelectionOnPageChange);
        if (config.columns && Array.isArray(config.columns)) {
            var columns = config.columns
                .filter(function (column) { return column; })
                .concat();
            if (!columns.length) {
                columns.push({
                    type: 'text',
                    label: '空'
                });
            }
            columns.unshift({
                type: '__expandme',
                toggable: false,
                className: 'Table-expandCell'
            });
            columns.unshift({
                type: '__checkme',
                fixed: 'left',
                toggable: false,
                className: 'Table-checkCell'
            });
            columns.unshift({
                type: '__dragme',
                toggable: false,
                className: 'Table-dragCell'
            });
            columns = columns.map(function (item, index) { return (tslib_1.__assign(tslib_1.__assign({}, item), { index: index, rawIndex: index - 3, type: item.type || 'plain', pristine: item, toggled: item.toggled !== false, breakpoint: item.breakpoint, isPrimary: index === 3 })); });
            self.columns.replace(columns);
        }
    }
    function combineCell(arr, keys) {
        if (!keys.length || !arr.length) {
            return arr;
        }
        var key = keys.shift();
        var rowIndex = 0;
        var row = arr[rowIndex];
        row.rowSpans[key] = 1;
        var value = tpl_builtin_1.resolveVariable(key, row.data);
        for (var i = 1, len = arr.length; i < len; i++) {
            var current = arr[i];
            if (isEqual_1.default(tpl_builtin_1.resolveVariable(key, current.data), value)) {
                row.rowSpans[key] += 1;
                current.rowSpans[key] = 0;
            }
            else {
                if (row.rowSpans[key] > 1) {
                    combineCell(arr.slice(rowIndex, i), keys.concat());
                }
                rowIndex = i;
                row = current;
                row.rowSpans[key] = 1;
                value = tpl_builtin_1.resolveVariable(key, row.data);
            }
        }
        if (row.rowSpans[key] > 1 && keys.length) {
            combineCell(arr.slice(rowIndex, arr.length), keys.concat());
        }
        return arr;
    }
    function autoCombineCell(arr, columns, maxCount) {
        if (!columns.length || !maxCount || !arr.length) {
            return arr;
        }
        var keys = [];
        for (var i = 0; i < maxCount; i++) {
            var column = columns[i];
            // maxCount 可能比实际配置的 columns 还有多。
            if (!column) {
                break;
            }
            if ('__' === column.type.substring(0, 2)) {
                maxCount++;
                continue;
            }
            var key = column.name;
            if (!key) {
                break;
            }
            keys.push(key);
        }
        return combineCell(arr, keys);
    }
    function initChildren(children, depth, pindex, parentId) {
        depth += 1;
        return children.map(function (item, key) {
            item = helper_1.isObject(item)
                ? item
                : {
                    item: item
                };
            var id = helper_1.guid();
            return {
                // id: String(item && (item as any)[self.primaryField] || `${pindex}-${depth}-${key}`),
                id: id,
                parentId: parentId,
                key: String(pindex + "-" + depth + "-" + key),
                depth: depth,
                index: key,
                newIndex: key,
                pristine: item,
                data: item,
                rowSpans: {},
                children: item && Array.isArray(item.children)
                    ? initChildren(item.children, depth, key, id)
                    : [],
                expandable: !!((item && Array.isArray(item.children) && item.children.length) ||
                    (self.footable && self.footableColumns.length))
            };
        });
    }
    function initRows(rows, getEntryId) {
        self.selectedRows.clear();
        self.expandedRows.clear();
        var arr = rows.map(function (item, key) {
            var id = getEntryId ? getEntryId(item, key) : helper_1.guid();
            return {
                // id: getEntryId ? getEntryId(item, key) : String(item && (item as any)[self.primaryField] || `${key}-1-${key}`),
                id: id,
                key: String(key + "-1-" + key),
                depth: 1,
                index: key,
                newIndex: key,
                pristine: item,
                data: item,
                rowSpans: {},
                children: item && Array.isArray(item.children)
                    ? initChildren(item.children, 1, key, id)
                    : [],
                expandable: !!((item && Array.isArray(item.children) && item.children.length) ||
                    (self.footable && self.footableColumns.length))
            };
        });
        if (self.combineNum) {
            arr = autoCombineCell(arr, self.columns, self.combineNum);
        }
        replaceRow(arr);
        self.isNested = self.rows.some(function (item) { return item.children.length; });
        var expand = self.footable && self.footable.expand;
        if (expand === 'first' ||
            (self.expandConfig && self.expandConfig.expand === 'first')) {
            self.rows.length && self.expandedRows.push(self.rows[0]);
        }
        else if ((expand === 'all' && !self.footable.accordion) ||
            (self.expandConfig &&
                self.expandConfig.expand === 'all' &&
                !self.expandConfig.accordion)) {
            self.expandedRows.replace(self.rows);
        }
        self.dragging = false;
    }
    // 尽可能的复用 row
    function replaceRow(arr) {
        var pool = arr.concat();
        // 把多的删了先
        if (self.rows.length > arr.length) {
            self.rows.splice(arr.length, self.rows.length - arr.length);
        }
        var index = 0;
        var len = self.rows.length;
        while (pool.length) {
            var item = pool.shift();
            if (index < len) {
                self.rows[index].replaceWith(item);
            }
            else {
                var row = exports.Row.create(item);
                self.rows.push(row);
            }
            index++;
        }
    }
    function updateSelected(selected, valueField) {
        self.selectedRows.clear();
        self.rows.forEach(function (item) {
            if (~selected.indexOf(item.pristine)) {
                self.selectedRows.push(item);
            }
            else if (find_1.default(selected, function (a) {
                return a[valueField || 'value'] &&
                    a[valueField || 'value'] == item.pristine[valueField || 'value'];
            })) {
                self.selectedRows.push(item);
            }
        });
        updateCheckDisable();
    }
    function toggleAll() {
        var _a;
        var maxLength = self.maxKeepItemSelectionLength;
        var keep = self.keepItemSelectionOnPageChange;
        if (self.allChecked) {
            self.selectedRows.clear();
        }
        else {
            var selectedItems_1 = (_a = self.data) === null || _a === void 0 ? void 0 : _a.selectedItems;
            if (keep && maxLength && selectedItems_1 && maxLength >= selectedItems_1.length) {
                var restCheckableRows = self.checkableRows.filter(function (item) { return !item.checked; });
                var checkableRows = restCheckableRows.filter(function (item, i) { return i < maxLength - selectedItems_1.length; });
                self.selectedRows.replace(tslib_1.__spreadArrays(self.selectedRows, checkableRows));
            }
            else {
                self.selectedRows.replace(self.checkableRows);
            }
        }
    }
    function toggle(row) {
        if (!row.checkable) {
            return;
        }
        var idx = self.selectedRows.indexOf(row);
        if (self.multiple) {
            ~idx ? self.selectedRows.splice(idx, 1) : self.selectedRows.push(row);
        }
        else {
            ~idx
                ? self.selectedRows.splice(idx, 1)
                : self.selectedRows.replace([row]);
        }
    }
    function updateCheckDisable() {
        if (!self.data) {
            return;
        }
        var maxLength = self.maxKeepItemSelectionLength;
        var selectedItems = self.data.selectedItems;
        self.selectedRows.map(function (item) { return item.setCheckdisable(false); });
        if (maxLength && maxLength <= selectedItems.length) {
            self.unSelectedRows.map(function (item) { return !item.checked && item.setCheckdisable(true); });
        }
        else {
            self.unSelectedRows.map(function (item) { return item.checkdisable && item.setCheckdisable(false); });
        }
    }
    function clear() {
        self.selectedRows.clear();
    }
    function toggleExpandAll() {
        if (self.allExpanded) {
            self.expandedRows.clear();
        }
        else {
            self.expandedRows.replace(self.rows);
        }
    }
    function toggleExpanded(row) {
        var idx = self.expandedRows.indexOf(row);
        if (~idx) {
            self.expandedRows.splice(idx, 1);
        }
        else if (self.footable && self.footable.accordion) {
            self.expandedRows.replace([row]);
        }
        else if (self.expandConfig && self.expandConfig.accordion) {
            var rows = self.expandedRows.filter(function (item) { return item.depth !== row.depth; });
            rows.push(row);
            self.expandedRows.replace(rows);
        }
        else {
            self.expandedRows.push(row);
        }
    }
    function collapseAllAtDepth(depth) {
        var rows = self.expandedRows.filter(function (item) { return item.depth !== depth; });
        self.expandedRows.replace(rows);
    }
    function setOrderByInfo(key, direction) {
        self.orderBy = key;
        self.orderDir = direction;
    }
    function reset() {
        self.rows.forEach(function (item) { return item.reset(); });
        var rows = self.rows.concat();
        helper_1.eachTree(rows, function (item) {
            if (item.children) {
                var rows_1 = item.children.concat().sort(function (a, b) { return a.index - b.index; });
                rows_1.forEach(function (item) { return item.reset(); });
                item.children.replace(rows_1);
            }
        });
        rows.forEach(function (item) { return item.reset(); });
        rows = rows.sort(function (a, b) { return a.index - b.index; });
        self.rows.replace(rows);
        self.dragging = false;
    }
    function toggleDragging() {
        self.dragging = !self.dragging;
    }
    function stopDragging() {
        self.dragging = false;
    }
    function exchange(fromIndex, toIndex, item) {
        item = item || self.rows[fromIndex];
        if (item.parentId) {
            var parent = self.getRowById(item.parentId);
            var offset = parent.children.indexOf(item) - fromIndex;
            toIndex += offset;
            fromIndex += offset;
            var newRows_1 = parent.children.concat();
            newRows_1.splice(fromIndex, 1);
            newRows_1.splice(toIndex, 0, item);
            newRows_1.forEach(function (item, index) { return (item.newIndex = index); });
            parent.children.replace(newRows_1);
            return;
        }
        var newRows = self.rows.concat();
        newRows.splice(fromIndex, 1);
        newRows.splice(toIndex, 0, item);
        newRows.forEach(function (item, index) { return (item.newIndex = index); });
        self.rows.replace(newRows);
    }
    function persistSaveToggledColumns() {
        var key = location.pathname +
            self.path +
            self.toggableColumns.map(function (item) { return item.name || item.index; }).join('-');
        localStorage.setItem(key, JSON.stringify(self.activeToggaleColumns.map(function (item) { return item.index; })));
    }
    function addForm(form, rowIndex) {
        self.formsRef.push({
            id: form.id,
            rowIndex: rowIndex
        });
    }
    return {
        update: update,
        initRows: initRows,
        updateSelected: updateSelected,
        toggleAll: toggleAll,
        toggle: toggle,
        toggleExpandAll: toggleExpandAll,
        toggleExpanded: toggleExpanded,
        collapseAllAtDepth: collapseAllAtDepth,
        clear: clear,
        setOrderByInfo: setOrderByInfo,
        reset: reset,
        toggleDragging: toggleDragging,
        stopDragging: stopDragging,
        exchange: exchange,
        addForm: addForm,
        persistSaveToggledColumns: persistSaveToggledColumns,
        // events
        afterCreate: function () {
            setTimeout(function () {
                if (!mobx_state_tree_1.isAlive(self)) {
                    return;
                }
                var key = location.pathname +
                    self.path +
                    self.toggableColumns.map(function (item) { return item.name || item.index; }).join('-');
                var data = localStorage.getItem(key);
                if (data) {
                    var selectedColumns_1 = JSON.parse(data);
                    self.toggableColumns.forEach(function (item) {
                        return item.setToggled(!!~selectedColumns_1.indexOf(item.index));
                    });
                }
            }, 200);
        }
    };
});
//# sourceMappingURL=./store/table.js.map
