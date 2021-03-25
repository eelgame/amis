"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableContent = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var TableBody_1 = require("./TableBody");
var TableContent = /** @class */ (function (_super) {
    tslib_1.__extends(TableContent, _super);
    function TableContent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TableContent.prototype.render = function () {
        var _a = this.props, placeholder = _a.placeholder, cx = _a.classnames, render = _a.render, className = _a.className, columns = _a.columns, columnsGroup = _a.columnsGroup, onMouseMove = _a.onMouseMove, onScroll = _a.onScroll, tableRef = _a.tableRef, rows = _a.rows, renderHeadCell = _a.renderHeadCell, renderCell = _a.renderCell, onCheck = _a.onCheck, rowClassName = _a.rowClassName, onQuickChange = _a.onQuickChange, footable = _a.footable, footableColumns = _a.footableColumns, checkOnItemClick = _a.checkOnItemClick, buildItemProps = _a.buildItemProps, onAction = _a.onAction, rowClassNameExpr = _a.rowClassNameExpr, data = _a.data, prefixRow = _a.prefixRow, locale = _a.locale, translate = _a.translate, affixRow = _a.affixRow;
        var tableClassName = cx('Table-table', this.props.tableClassName);
        var hideHeader = columns.every(function (column) { return !column.label; });
        return (react_1.default.createElement("div", { onMouseMove: onMouseMove, className: cx('Table-content', className), onScroll: onScroll },
            react_1.default.createElement("table", { ref: tableRef, className: tableClassName },
                react_1.default.createElement("thead", null,
                    columnsGroup.length ? (react_1.default.createElement("tr", null, columnsGroup.map(function (item, index) { return (react_1.default.createElement("th", { key: index, "data-index": item.index, colSpan: item.colSpan }, item.label ? render('tpl', item.label) : null)); }))) : null,
                    react_1.default.createElement("tr", { className: hideHeader ? 'fake-hide' : '' }, columns.map(function (column) {
                        return renderHeadCell(column, {
                            'data-index': column.index,
                            'key': column.index
                        });
                    }))),
                !rows.length ? (react_1.default.createElement("tbody", null,
                    react_1.default.createElement("tr", { className: cx('Table-placeholder') },
                        react_1.default.createElement("td", { colSpan: columns.length }, render('placeholder', translate(placeholder || 'placeholder.noData')))))) : (react_1.default.createElement(TableBody_1.TableBody, { classnames: cx, render: render, renderCell: renderCell, onCheck: onCheck, onQuickChange: onQuickChange, footable: footable, footableColumns: footableColumns, checkOnItemClick: checkOnItemClick, buildItemProps: buildItemProps, onAction: onAction, rowClassNameExpr: rowClassNameExpr, rowClassName: rowClassName, rows: rows, columns: columns, locale: locale, translate: translate, prefixRow: prefixRow, affixRow: affixRow, data: data })))));
    };
    return TableContent;
}(react_1.default.Component));
exports.TableContent = TableContent;
//# sourceMappingURL=./renderers/Table/TableContent.js.map
