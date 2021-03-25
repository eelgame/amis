"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterStore = exports.IIRendererStore = exports.iRendererStore = exports.RendererStore = void 0;
var tslib_1 = require("tslib");
var mobx_state_tree_1 = require("mobx-state-tree");
require("setimmediate");
var iRenderer_1 = require("./iRenderer");
Object.defineProperty(exports, "iRendererStore", { enumerable: true, get: function () { return iRenderer_1.iRendererStore; } });
Object.defineProperty(exports, "IIRendererStore", { enumerable: true, get: function () { return iRenderer_1.IIRendererStore; } });
var service_1 = require("./service");
var combo_1 = require("./combo");
var form_1 = require("./form");
var crud_1 = require("./crud");
var table_1 = require("./table");
var list_1 = require("./list");
var modal_1 = require("./modal");
var find_1 = tslib_1.__importDefault(require("lodash/find"));
var formItem_1 = require("./formItem");
var manager_1 = require("./manager");
var pagination_1 = require("./pagination");
var app_1 = require("./app");
var root_1 = require("./root");
mobx_state_tree_1.setLivelynessChecking(process.env.NODE_ENV === 'production' ? 'ignore' : 'error');
var allowedStoreList = [
    service_1.ServiceStore,
    form_1.FormStore,
    combo_1.ComboStore,
    crud_1.CRUDStore,
    table_1.TableStore,
    list_1.ListStore,
    modal_1.ModalStore,
    formItem_1.FormItemStore,
    pagination_1.PaginationStore,
    app_1.AppStore
];
exports.RendererStore = mobx_state_tree_1.types
    .model('RendererStore', {
    storeType: 'RendererStore'
})
    .views(function (self) { return ({
    get fetcher() {
        return mobx_state_tree_1.getEnv(self).fetcher;
    },
    get notify() {
        return mobx_state_tree_1.getEnv(self).notify;
    },
    get isCancel() {
        return mobx_state_tree_1.getEnv(self).isCancel;
    },
    get __() {
        return mobx_state_tree_1.getEnv(self).translate;
    },
    getStoreById: function (id) {
        return manager_1.getStoreById(id);
    },
    get stores() {
        return manager_1.getStores();
    }
}); })
    .actions(function (self) { return ({
    addStore: function (store) {
        if (store.storeType === root_1.RootStore.name) {
            return manager_1.addStore(root_1.RootStore.create(store, mobx_state_tree_1.getEnv(self)));
        }
        var factory = find_1.default(allowedStoreList, function (item) { return item.name === store.storeType; });
        return manager_1.addStore(factory.create(store, mobx_state_tree_1.getEnv(self)));
    },
    removeStore: function (store) {
        // store.dispose();
        manager_1.removeStore(store);
    }
}); });
exports.RegisterStore = function (store) {
    allowedStoreList.push(store);
};
//# sourceMappingURL=./store/index.js.map
