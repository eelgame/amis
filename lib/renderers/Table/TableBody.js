"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableBody = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var TableRow_1 = require("./TableRow");
var tpl_1 = require("../../utils/tpl");
var mobx_1 = require("mobx");
var helper_1 = require("../../utils/helper");
var TableBody = /** @class */ (function (_super) {
    tslib_1.__extends(TableBody, _super);
    function TableBody(props) {
        var _this = _super.call(this, props) || this;
        var rows = props.rows;
        _this.reaction = mobx_1.reaction(function () {
            return "" + helper_1.flattenTree(rows)
                .map(function (item) { return "" + item.id; })
                .join(',') + rows
                .filter(function (item) { return item.checked; })
                .map(function (item) { return item.id; })
                .join(',');
        }, function () { return _this.forceUpdate(); }, {
            onError: function () { return _this.reaction(); }
        });
        return _this;
    }
    TableBody.prototype.shouldComponentUpdate = function (nextProps) {
        var props = this.props;
        if (props.columns !== nextProps.columns ||
            props.buildItemProps !== nextProps.buildItemProps ||
            props.prefixRow ||
            props.affixRow) {
            return true;
        }
        return false;
    };
    TableBody.prototype.componentWillUnmount = function () {
        var _a;
        (_a = this.reaction) === null || _a === void 0 ? void 0 : _a.call(this);
    };
    TableBody.prototype.renderRows = function (rows, columns, rowProps) {
        var _this = this;
        if (columns === void 0) { columns = this.props.columns; }
        if (rowProps === void 0) { rowProps = {}; }
        var _a = this.props, rowClassName = _a.rowClassName, rowClassNameExpr = _a.rowClassNameExpr, onAction = _a.onAction, buildItemProps = _a.buildItemProps, checkOnItemClick = _a.checkOnItemClick, cx = _a.classnames, render = _a.render, renderCell = _a.renderCell, onCheck = _a.onCheck, onQuickChange = _a.onQuickChange, footable = _a.footable, ignoreFootableContent = _a.ignoreFootableContent, footableColumns = _a.footableColumns;
        return rows.map(function (item, rowIndex) {
            var itemProps = buildItemProps ? buildItemProps(item, rowIndex) : null;
            var doms = [
                react_1.default.createElement(TableRow_1.TableRow, tslib_1.__assign({}, itemProps, { classnames: cx, checkOnItemClick: checkOnItemClick, key: item.id, itemIndex: rowIndex, item: item, itemClassName: cx(rowClassNameExpr
                        ? tpl_1.filter(rowClassNameExpr, item.data)
                        : rowClassName, {
                        'is-last': item.depth > 1 && rowIndex === rows.length - 1
                    }), columns: columns, renderCell: renderCell, render: render, onAction: onAction, onCheck: onCheck, 
                    // todo 先注释 quickEditEnabled={item.depth === 1}
                    onQuickChange: onQuickChange }, rowProps))
            ];
            if (footable && footableColumns.length) {
                if (item.depth === 1) {
                    doms.push(react_1.default.createElement(TableRow_1.TableRow, tslib_1.__assign({}, itemProps, { classnames: cx, checkOnItemClick: checkOnItemClick, key: "foot-" + item.id, itemIndex: rowIndex, item: item, itemClassName: cx(rowClassNameExpr
                            ? tpl_1.filter(rowClassNameExpr, item.data)
                            : rowClassName), columns: footableColumns, renderCell: renderCell, render: render, onAction: onAction, onCheck: onCheck, footableMode: true, footableColSpan: columns.length, onQuickChange: onQuickChange, ignoreFootableContent: ignoreFootableContent }, rowProps)));
                }
            }
            else if (item.children.length) {
                // 嵌套表格
                doms.push.apply(doms, _this.renderRows(item.children, columns, tslib_1.__assign(tslib_1.__assign({}, rowProps), { parent: item })));
            }
            return doms;
        });
    };
    TableBody.prototype.renderSummaryRow = function (items) {
        var _a = this.props, columns = _a.columns, render = _a.render, data = _a.data, cx = _a.classnames, rows = _a.rows;
        if (!(Array.isArray(items) && items.length)) {
            return null;
        }
        var filterColumns = columns.filter(function (item) { return item.toggable; });
        var result = [];
        for (var index = 0; index < filterColumns.length; index++) {
            var item = items[filterColumns[index].rawIndex];
            item && result.push(item);
        }
        //  如果是勾选栏，让它和下一列合并。
        if (columns[0].type === '__checkme' && result[0]) {
            result[0].colSpan = (result[0].colSpan || 1) + 1;
        }
        //  如果是展开栏，让它和下一列合并。
        if (columns[0].type === '__expandme' && result[0]) {
            result[0].colSpan = (result[0].colSpan || 1) + 1;
        }
        // 缺少的单元格补齐
        var appendLen = columns.length - result.reduce(function (p, c) { return p + (c.colSpan || 1); }, 0);
        if (appendLen) {
            var item = result.pop();
            result.push(tslib_1.__assign(tslib_1.__assign({}, item), { colSpan: (item.colSpan || 1) + appendLen }));
        }
        var ctx = helper_1.createObject(data, {
            items: rows.map(function (row) { return row.locals; })
        });
        return (react_1.default.createElement("tr", { className: cx('Table-tr', 'is-summary') }, result.map(function (item, index) {
            var Com = item.isHead ? 'th' : 'td';
            return (react_1.default.createElement(Com, { key: index, colSpan: item.colSpan, className: item.cellClassName }, render("summary-row/" + index, item, {
                data: ctx
            })));
        })));
    };
    TableBody.prototype.renderSummary = function (items) {
        var _this = this;
        return Array.isArray(items)
            ? items.some(function (i) { return Array.isArray(i); })
                ? items.map(function (i) { return _this.renderSummaryRow(Array.isArray(i) ? i : [i]); })
                : this.renderSummaryRow(items)
            : null;
    };
    TableBody.prototype.render = function () {
        var _a = this.props, cx = _a.classnames, className = _a.className, render = _a.render, rows = _a.rows, columns = _a.columns, rowsProps = _a.rowsProps, prefixRow = _a.prefixRow, affixRow = _a.affixRow, __ = _a.translate;
        return (react_1.default.createElement("tbody", { className: className }, rows.length ? (react_1.default.createElement(react_1.default.Fragment, null,
            this.renderSummary(prefixRow),
            this.renderRows(rows, columns, rowsProps),
            this.renderSummary(affixRow))) : null));
    };
    return TableBody;
}(react_1.default.Component));
exports.TableBody = TableBody;
//# sourceMappingURL=./renderers/Table/TableBody.js.map
