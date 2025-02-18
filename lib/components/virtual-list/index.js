"use strict";
/**
 * 基于 https://github.com/clauderic/react-tiny-virtual-list 改造，主要是加了宽度自适应
 */
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = tslib_1.__importStar(require("react"));
var PropTypes = tslib_1.__importStar(require("prop-types"));
var SizeAndPositionManager_1 = tslib_1.__importDefault(require("./SizeAndPositionManager"));
var constants_1 = require("./constants");
var constants_2 = require("./constants");
Object.defineProperty(exports, "ScrollDirection", { enumerable: true, get: function () { return constants_2.DIRECTION; } });
var STYLE_WRAPPER = {
    overflow: 'auto',
    willChange: 'transform',
    WebkitOverflowScrolling: 'touch'
};
var STYLE_INNER = {
    position: 'relative',
    width: 'auto',
    whiteSpace: 'nowrap',
    minHeight: '100%'
};
var STYLE_ITEM = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%'
};
var STYLE_STICKY_ITEM = tslib_1.__assign(tslib_1.__assign({}, STYLE_ITEM), { position: 'sticky' });
var VirtualList = /** @class */ (function (_super) {
    tslib_1.__extends(VirtualList, _super);
    function VirtualList() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.itemSizeGetter = function (itemSize) {
            return function (index) { return _this.getSize(index, itemSize); };
        };
        _this.sizeAndPositionManager = new SizeAndPositionManager_1.default({
            itemCount: _this.props.itemCount,
            itemSizeGetter: _this.itemSizeGetter(_this.props.itemSize),
            estimatedItemSize: _this.getEstimatedItemSize()
        });
        _this.state = {
            offset: _this.props.scrollOffset ||
                (_this.props.scrollToIndex != null &&
                    _this.getOffsetForIndex(_this.props.scrollToIndex)) ||
                0,
            scrollChangeReason: constants_1.SCROLL_CHANGE_REASON.REQUESTED
        };
        _this.styleCache = {};
        _this.getRef = function (node) {
            _this.rootNode = node;
        };
        _this.handleScroll = function (event) {
            var onScroll = _this.props.onScroll;
            var offset = _this.getNodeOffset();
            if (offset < 0 ||
                _this.state.offset === offset ||
                event.target !== _this.rootNode) {
                return;
            }
            _this.setState({
                offset: offset,
                scrollChangeReason: constants_1.SCROLL_CHANGE_REASON.OBSERVED
            });
            if (typeof onScroll === 'function') {
                onScroll(offset, event);
            }
        };
        return _this;
    }
    VirtualList.prototype.componentDidMount = function () {
        var _a = this.props, scrollOffset = _a.scrollOffset, scrollToIndex = _a.scrollToIndex;
        this.rootNode.addEventListener('scroll', this.handleScroll, {
            passive: true
        });
        this.updateRootWidth();
        if (scrollOffset != null) {
            this.scrollTo(scrollOffset);
        }
        else if (scrollToIndex != null) {
            this.scrollTo(this.getOffsetForIndex(scrollToIndex));
        }
    };
    // 自适应宽度
    VirtualList.prototype.updateRootWidth = function () {
        var itemsDom = this.rootNode.children[0].children;
        var scrollbarWidth = window.innerWidth - document.documentElement.clientWidth || 15;
        var containerWidth = this.rootNode.parentElement.getBoundingClientRect()
            .width;
        var maxItemWidth = 0;
        for (var i = 0; i < itemsDom.length; i++) {
            var itemWidth = itemsDom[i].getBoundingClientRect().width;
            if (itemWidth > maxItemWidth) {
                maxItemWidth = itemWidth;
            }
        }
        if (maxItemWidth > containerWidth) {
            this.rootNode.style.width = maxItemWidth + scrollbarWidth + 'px';
        }
    };
    VirtualList.prototype.componentWillReceiveProps = function (nextProps) {
        var _a = this.props, estimatedItemSize = _a.estimatedItemSize, itemCount = _a.itemCount, itemSize = _a.itemSize, scrollOffset = _a.scrollOffset, scrollToAlignment = _a.scrollToAlignment, scrollToIndex = _a.scrollToIndex;
        var scrollPropsHaveChanged = nextProps.scrollToIndex !== scrollToIndex ||
            nextProps.scrollToAlignment !== scrollToAlignment;
        var itemPropsHaveChanged = nextProps.itemCount !== itemCount ||
            nextProps.itemSize !== itemSize ||
            nextProps.estimatedItemSize !== estimatedItemSize;
        if (nextProps.itemSize !== itemSize) {
            this.sizeAndPositionManager.updateConfig({
                itemSizeGetter: this.itemSizeGetter(nextProps.itemSize)
            });
        }
        if (nextProps.itemCount !== itemCount ||
            nextProps.estimatedItemSize !== estimatedItemSize) {
            this.sizeAndPositionManager.updateConfig({
                itemCount: nextProps.itemCount,
                estimatedItemSize: this.getEstimatedItemSize(nextProps)
            });
        }
        if (itemPropsHaveChanged) {
            this.recomputeSizes();
        }
        if (nextProps.scrollOffset !== scrollOffset) {
            this.setState({
                offset: nextProps.scrollOffset || 0,
                scrollChangeReason: constants_1.SCROLL_CHANGE_REASON.REQUESTED
            });
        }
        else if (typeof nextProps.scrollToIndex === 'number' &&
            (scrollPropsHaveChanged || itemPropsHaveChanged)) {
            this.setState({
                offset: this.getOffsetForIndex(nextProps.scrollToIndex, nextProps.scrollToAlignment, nextProps.itemCount),
                scrollChangeReason: constants_1.SCROLL_CHANGE_REASON.REQUESTED
            });
        }
    };
    VirtualList.prototype.componentDidUpdate = function (_, prevState) {
        var _a = this.state, offset = _a.offset, scrollChangeReason = _a.scrollChangeReason;
        if (prevState.offset !== offset &&
            scrollChangeReason === constants_1.SCROLL_CHANGE_REASON.REQUESTED) {
            this.scrollTo(offset);
        }
    };
    VirtualList.prototype.componentWillUnmount = function () {
        this.rootNode.removeEventListener('scroll', this.handleScroll);
    };
    VirtualList.prototype.scrollTo = function (value) {
        var _a = this.props.scrollDirection, scrollDirection = _a === void 0 ? constants_1.DIRECTION.VERTICAL : _a;
        this.rootNode[constants_1.scrollProp[scrollDirection]] = value;
    };
    VirtualList.prototype.getOffsetForIndex = function (index, scrollToAlignment, itemCount) {
        if (scrollToAlignment === void 0) { scrollToAlignment = this.props.scrollToAlignment; }
        if (itemCount === void 0) { itemCount = this.props.itemCount; }
        var _a = this.props.scrollDirection, scrollDirection = _a === void 0 ? constants_1.DIRECTION.VERTICAL : _a;
        if (index < 0 || index >= itemCount) {
            index = 0;
        }
        return this.sizeAndPositionManager.getUpdatedOffsetForIndex({
            align: scrollToAlignment,
            containerSize: this.props[constants_1.sizeProp[scrollDirection]],
            currentOffset: (this.state && this.state.offset) || 0,
            targetIndex: index
        });
    };
    VirtualList.prototype.recomputeSizes = function (startIndex) {
        if (startIndex === void 0) { startIndex = 0; }
        this.styleCache = {};
        this.sizeAndPositionManager.resetItem(startIndex);
    };
    VirtualList.prototype.render = function () {
        var _a;
        var _this = this;
        var _b = this.props, estimatedItemSize = _b.estimatedItemSize, height = _b.height, _c = _b.overscanCount, overscanCount = _c === void 0 ? 3 : _c, renderItem = _b.renderItem, itemCount = _b.itemCount, itemSize = _b.itemSize, onItemsRendered = _b.onItemsRendered, onScroll = _b.onScroll, _d = _b.scrollDirection, scrollDirection = _d === void 0 ? constants_1.DIRECTION.VERTICAL : _d, scrollOffset = _b.scrollOffset, scrollToIndex = _b.scrollToIndex, scrollToAlignment = _b.scrollToAlignment, stickyIndices = _b.stickyIndices, style = _b.style, width = _b.width, props = tslib_1.__rest(_b, ["estimatedItemSize", "height", "overscanCount", "renderItem", "itemCount", "itemSize", "onItemsRendered", "onScroll", "scrollDirection", "scrollOffset", "scrollToIndex", "scrollToAlignment", "stickyIndices", "style", "width"]);
        var offset = this.state.offset;
        var _e = this.sizeAndPositionManager.getVisibleRange({
            containerSize: this.props[constants_1.sizeProp[scrollDirection]] || 0,
            offset: offset,
            overscanCount: overscanCount
        }), start = _e.start, stop = _e.stop;
        var items = [];
        var wrapperStyle = tslib_1.__assign(tslib_1.__assign(tslib_1.__assign({}, STYLE_WRAPPER), style), { height: height, width: width });
        var innerStyle = tslib_1.__assign(tslib_1.__assign({}, STYLE_INNER), (_a = {}, _a[constants_1.sizeProp[scrollDirection]] = this.sizeAndPositionManager.getTotalSize(), _a));
        if (stickyIndices != null && stickyIndices.length !== 0) {
            stickyIndices.forEach(function (index) {
                return items.push(renderItem({
                    index: index,
                    style: _this.getStyle(index, true)
                }));
            });
            if (scrollDirection === constants_1.DIRECTION.HORIZONTAL) {
                innerStyle.display = 'flex';
            }
        }
        if (typeof start !== 'undefined' && typeof stop !== 'undefined') {
            for (var index = start; index <= stop; index++) {
                if (stickyIndices != null && ~stickyIndices.indexOf(index)) {
                    continue;
                }
                items.push(renderItem({
                    index: index,
                    style: this.getStyle(index, false)
                }));
            }
            if (typeof onItemsRendered === 'function') {
                onItemsRendered({
                    startIndex: start,
                    stopIndex: stop
                });
            }
        }
        return (React.createElement("div", tslib_1.__assign({ ref: this.getRef }, props, { style: wrapperStyle }),
            React.createElement("div", { style: innerStyle }, items)));
    };
    VirtualList.prototype.getNodeOffset = function () {
        var _a = this.props.scrollDirection, scrollDirection = _a === void 0 ? constants_1.DIRECTION.VERTICAL : _a;
        return this.rootNode[constants_1.scrollProp[scrollDirection]];
    };
    VirtualList.prototype.getEstimatedItemSize = function (props) {
        if (props === void 0) { props = this.props; }
        return (props.estimatedItemSize ||
            (typeof props.itemSize === 'number' && props.itemSize) ||
            50);
    };
    VirtualList.prototype.getSize = function (index, itemSize) {
        if (typeof itemSize === 'function') {
            return itemSize(index);
        }
        return Array.isArray(itemSize) ? itemSize[index] : itemSize;
    };
    VirtualList.prototype.getStyle = function (index, sticky) {
        var _a, _b;
        var style = this.styleCache[index];
        if (style) {
            return style;
        }
        var _c = this.props.scrollDirection, scrollDirection = _c === void 0 ? constants_1.DIRECTION.VERTICAL : _c;
        var _d = this.sizeAndPositionManager.getSizeAndPositionForIndex(index), size = _d.size, offset = _d.offset;
        return (this.styleCache[index] = sticky
            ? tslib_1.__assign(tslib_1.__assign({}, STYLE_STICKY_ITEM), (_a = {}, _a[constants_1.sizeProp[scrollDirection]] = size, _a[constants_1.marginProp[scrollDirection]] = offset, _a[constants_1.oppositeMarginProp[scrollDirection]] = -(offset + size), _a.zIndex = 1, _a)) : tslib_1.__assign(tslib_1.__assign({}, STYLE_ITEM), (_b = {}, _b[constants_1.sizeProp[scrollDirection]] = size, _b[constants_1.positionProp[scrollDirection]] = offset, _b)));
    };
    VirtualList.defaultProps = {
        overscanCount: 3,
        scrollDirection: constants_1.DIRECTION.VERTICAL,
        width: '100%'
    };
    VirtualList.propTypes = {
        estimatedItemSize: PropTypes.number,
        height: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
            .isRequired,
        itemCount: PropTypes.number.isRequired,
        itemSize: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.array,
            PropTypes.func
        ]).isRequired,
        onScroll: PropTypes.func,
        onItemsRendered: PropTypes.func,
        overscanCount: PropTypes.number,
        renderItem: PropTypes.func.isRequired,
        scrollOffset: PropTypes.number,
        scrollToIndex: PropTypes.number,
        scrollToAlignment: PropTypes.oneOf([
            constants_1.ALIGNMENT.AUTO,
            constants_1.ALIGNMENT.START,
            constants_1.ALIGNMENT.CENTER,
            constants_1.ALIGNMENT.END
        ]),
        scrollDirection: PropTypes.oneOf([
            constants_1.DIRECTION.HORIZONTAL,
            constants_1.DIRECTION.VERTICAL
        ]),
        stickyIndices: PropTypes.arrayOf(PropTypes.number),
        style: PropTypes.object,
        width: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    };
    return VirtualList;
}(React.PureComponent));
exports.default = VirtualList;
//# sourceMappingURL=./components/virtual-list/index.js.map
