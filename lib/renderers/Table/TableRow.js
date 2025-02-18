"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableRow = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var mobx_1 = require("mobx");
var TableRow = /** @class */ (function (_super) {
    tslib_1.__extends(TableRow, _super);
    function TableRow(props) {
        var _this = _super.call(this, props) || this;
        _this.handleAction = _this.handleAction.bind(_this);
        _this.handleQuickChange = _this.handleQuickChange.bind(_this);
        _this.handleClick = _this.handleClick.bind(_this);
        var item = props.item;
        var parent = props.parent;
        var columns = props.columns;
        _this.reaction = mobx_1.reaction(function () {
            return "" + item.isHover + item.checked + item.checkdisable + JSON.stringify(item.data) + item.moved + item.modified + item.expanded + (parent === null || parent === void 0 ? void 0 : parent.expanded) + columns.length;
        }, function () { return _this.forceUpdate(); }, {
            onError: function () { return _this.reaction(); }
        });
        return _this;
    }
    TableRow.prototype.shouldComponentUpdate = function (nextProps) {
        var props = this.props;
        if (props.columns !== nextProps.columns) {
            return true;
        }
        // 不需要更新，因为子节点已经 observer 了
        return false;
    };
    TableRow.prototype.componentWillUnmount = function () {
        var _a;
        (_a = this.reaction) === null || _a === void 0 ? void 0 : _a.call(this);
    };
    TableRow.prototype.handleClick = function (e) {
        var target = e.target;
        var ns = this.props.classPrefix;
        var formItem;
        if (!e.currentTarget.contains(target) ||
            ~['INPUT', 'TEXTAREA'].indexOf(target.tagName) ||
            ((formItem = target.closest("button, a, [data-role=\"form-item\"]")) &&
                e.currentTarget.contains(formItem))) {
            return;
        }
        this.props.onCheck(this.props.item);
    };
    TableRow.prototype.handleAction = function (e, action, ctx) {
        var _a = this.props, onAction = _a.onAction, item = _a.item;
        onAction && onAction(e, action, ctx || item.data);
    };
    TableRow.prototype.handleQuickChange = function (values, saveImmediately, savePristine, resetOnFailed) {
        var _a = this.props, onQuickChange = _a.onQuickChange, item = _a.item;
        onQuickChange &&
            onQuickChange(item, values, saveImmediately, savePristine, resetOnFailed);
    };
    TableRow.prototype.render = function () {
        var _a, _b;
        var _this = this;
        var _c = this.props, itemClassName = _c.itemClassName, itemIndex = _c.itemIndex, item = _c.item, columns = _c.columns, renderCell = _c.renderCell, children = _c.children, footableMode = _c.footableMode, ignoreFootableContent = _c.ignoreFootableContent, footableColSpan = _c.footableColSpan, regionPrefix = _c.regionPrefix, checkOnItemClick = _c.checkOnItemClick, ns = _c.classPrefix, render = _c.render, cx = _c.classnames, parent = _c.parent, rest = tslib_1.__rest(_c, ["itemClassName", "itemIndex", "item", "columns", "renderCell", "children", "footableMode", "ignoreFootableContent", "footableColSpan", "regionPrefix", "checkOnItemClick", "classPrefix", "render", "classnames", "parent"]);
        // console.log('TableRow');
        if (footableMode) {
            if (!item.expanded) {
                return null;
            }
            return (react_1.default.createElement("tr", { "data-id": item.id, "data-index": item.newIndex, onClick: checkOnItemClick ? this.handleClick : undefined, className: cx(itemClassName, (_a = {
                        'is-hovered': item.isHover,
                        'is-checked': item.checked,
                        'is-modified': item.modified,
                        'is-moved': item.moved
                    },
                    _a["Table-tr--odd"] = itemIndex % 2 === 0,
                    _a["Table-tr--even"] = itemIndex % 2 === 1,
                    _a)) },
                react_1.default.createElement("td", { className: cx("Table-foot"), colSpan: footableColSpan },
                    react_1.default.createElement("table", { className: cx("Table-footTable") },
                        react_1.default.createElement("tbody", null, ignoreFootableContent
                            ? columns.map(function (column) { return (react_1.default.createElement("tr", { key: column.index },
                                column.label !== false ? react_1.default.createElement("th", null) : null,
                                react_1.default.createElement("td", null))); })
                            : columns.map(function (column) { return (react_1.default.createElement("tr", { key: column.index },
                                column.label !== false ? (react_1.default.createElement("th", null, render("" + regionPrefix + itemIndex + "/" + column.index + "/tpl", column.label))) : null,
                                renderCell("" + regionPrefix + itemIndex + "/" + column.index, column, item, tslib_1.__assign(tslib_1.__assign({}, rest), { width: null, rowIndex: itemIndex, colIndex: column.index, key: column.index, onAction: _this.handleAction, onQuickChange: _this.handleQuickChange })))); }))))));
        }
        if (parent && !parent.expanded) {
            return null;
        }
        return (react_1.default.createElement("tr", { onClick: checkOnItemClick ? this.handleClick : undefined, "data-index": item.depth === 1 ? item.newIndex : undefined, "data-id": item.id, className: cx(itemClassName, (_b = {
                    'is-hovered': item.isHover,
                    'is-checked': item.checked,
                    'is-modified': item.modified,
                    'is-moved': item.moved,
                    'is-expanded': item.expanded,
                    'is-expandable': item.expandable
                },
                _b["Table-tr--odd"] = itemIndex % 2 === 0,
                _b["Table-tr--even"] = itemIndex % 2 === 1,
                _b), "Table-tr--" + item.depth + "th") }, columns.map(function (column) {
            return renderCell(itemIndex + "/" + column.index, column, item, tslib_1.__assign(tslib_1.__assign({}, rest), { rowIndex: itemIndex, colIndex: column.index, key: column.index, onAction: _this.handleAction, onQuickChange: _this.handleQuickChange }));
        })));
    };
    return TableRow;
}(react_1.default.Component));
exports.TableRow = TableRow;
//# sourceMappingURL=./renderers/Table/TableRow.js.map
