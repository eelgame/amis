/**
 * 让选项类的组件支持远程加载选项。
 *
 * 目前这个逻辑其实在 renderer/form/options 中有
 * 但是那个里面耦合较多，没办法简单的在组件之间相互调用，
 * 所以先单独弄个 hoc 出来，后续再想个更加合理的方案。
 */
import React from 'react';
import hoistNonReactStatic from 'hoist-non-react-statics';
import { Api } from '../types';
import { Option, SchemaApi, SchemaTokenizeableString } from '../Schema';
import { RendererEnv } from '../env';
import { Instance } from 'mobx-state-tree';
export declare const Store: import("mobx-state-tree").IModelType<{
    fetching: import("mobx-state-tree").IType<boolean | undefined, boolean, boolean>;
    errorMsg: import("mobx-state-tree").IType<string | undefined, string, string>;
    options: import("mobx-state-tree").IType<Option[] | null | undefined, Option[], Option[]>;
    data: import("mobx-state-tree").IType<{} | null | undefined, {}, {}>;
}, {
    load: (env: RendererEnv, api: Api, data: any) => Promise<any>;
    setData(data: any): void;
    setOptions(options: any): void;
}, import("mobx-state-tree")._NotCustomized, import("mobx-state-tree")._NotCustomized>;
export declare type IStore = Instance<typeof Store>;
export interface RemoteOptionsProps {
    options: Array<Option>;
    loading?: boolean;
}
export interface OutterProps {
    env?: RendererEnv;
    data: any;
    source?: SchemaApi | SchemaTokenizeableString;
    options?: Array<Option>;
}
export declare function withRemoteOptions<T extends React.ComponentType<React.ComponentProps<T> & RemoteOptionsProps>>(ComposedComponent: T): {
    new (props: Pick<JSX.LibraryManagedAttributes<T, Pick<React.ComponentProps<T>, Exclude<keyof React.ComponentProps<T>, "loading" | "options">>> & OutterProps & {
        store: IStore;
    }, "data" | "source" | "options" | "env" | Exclude<keyof JSX.LibraryManagedAttributes<T, Pick<React.ComponentProps<T>, Exclude<keyof React.ComponentProps<T>, "loading" | "options">>>, "store">> | Readonly<Pick<JSX.LibraryManagedAttributes<T, Pick<React.ComponentProps<T>, Exclude<keyof React.ComponentProps<T>, "loading" | "options">>> & OutterProps & {
        store: IStore;
    }, "data" | "source" | "options" | "env" | Exclude<keyof JSX.LibraryManagedAttributes<T, Pick<React.ComponentProps<T>, Exclude<keyof React.ComponentProps<T>, "loading" | "options">>>, "store">>>): {
        ref: any;
        store?: ({
            fetching: boolean;
            errorMsg: string;
            options: Option[] & import("mobx-state-tree").IStateTreeNode<import("mobx-state-tree").IType<Option[] | null | undefined, Option[], Option[]>>;
            data: import("mobx-state-tree").IStateTreeNode<import("mobx-state-tree").IType<{} | null | undefined, {}, {}>>;
        } & import("mobx-state-tree/dist/internal").NonEmptyObject & {
            load: (env: RendererEnv, api: Api, data: any) => Promise<any>;
            setData(data: any): void;
            setOptions(options: any): void;
        } & import("mobx-state-tree").IStateTreeNode<import("mobx-state-tree").IModelType<{
            fetching: import("mobx-state-tree").IType<boolean | undefined, boolean, boolean>;
            errorMsg: import("mobx-state-tree").IType<string | undefined, string, string>;
            options: import("mobx-state-tree").IType<Option[] | null | undefined, Option[], Option[]>;
            data: import("mobx-state-tree").IType<{} | null | undefined, {}, {}>;
        }, {
            load: (env: RendererEnv, api: Api, data: any) => Promise<any>;
            setData(data: any): void;
            setOptions(options: any): void;
        }, import("mobx-state-tree")._NotCustomized, import("mobx-state-tree")._NotCustomized>>) | undefined;
        refFn: (ref: any) => void;
        componentWillUnmount(): void;
        getWrappedInstance(): any;
        render(): JSX.Element;
        context: any;
        setState<K extends never>(state: {} | ((prevState: Readonly<{}>, props: Readonly<Pick<JSX.LibraryManagedAttributes<T, Pick<React.ComponentProps<T>, Exclude<keyof React.ComponentProps<T>, "loading" | "options">>> & OutterProps & {
            store: IStore;
        }, "data" | "source" | "options" | "env" | Exclude<keyof JSX.LibraryManagedAttributes<T, Pick<React.ComponentProps<T>, Exclude<keyof React.ComponentProps<T>, "loading" | "options">>>, "store">>>) => {} | Pick<{}, K> | null) | Pick<{}, K> | null, callback?: (() => void) | undefined): void;
        forceUpdate(callback?: (() => void) | undefined): void;
        readonly props: Readonly<Pick<JSX.LibraryManagedAttributes<T, Pick<React.ComponentProps<T>, Exclude<keyof React.ComponentProps<T>, "loading" | "options">>> & OutterProps & {
            store: IStore;
        }, "data" | "source" | "options" | "env" | Exclude<keyof JSX.LibraryManagedAttributes<T, Pick<React.ComponentProps<T>, Exclude<keyof React.ComponentProps<T>, "loading" | "options">>>, "store">>> & Readonly<{
            children?: React.ReactNode;
        }>;
        state: Readonly<{}>;
        refs: {
            [key: string]: React.ReactInstance;
        };
        componentDidMount?(): void;
        shouldComponentUpdate?(nextProps: Readonly<Pick<JSX.LibraryManagedAttributes<T, Pick<React.ComponentProps<T>, Exclude<keyof React.ComponentProps<T>, "loading" | "options">>> & OutterProps & {
            store: IStore;
        }, "data" | "source" | "options" | "env" | Exclude<keyof JSX.LibraryManagedAttributes<T, Pick<React.ComponentProps<T>, Exclude<keyof React.ComponentProps<T>, "loading" | "options">>>, "store">>>, nextState: Readonly<{}>, nextContext: any): boolean;
        componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<Pick<JSX.LibraryManagedAttributes<T, Pick<React.ComponentProps<T>, Exclude<keyof React.ComponentProps<T>, "loading" | "options">>> & OutterProps & {
            store: IStore;
        }, "data" | "source" | "options" | "env" | Exclude<keyof JSX.LibraryManagedAttributes<T, Pick<React.ComponentProps<T>, Exclude<keyof React.ComponentProps<T>, "loading" | "options">>>, "store">>>, prevState: Readonly<{}>): any;
        componentDidUpdate?(prevProps: Readonly<Pick<JSX.LibraryManagedAttributes<T, Pick<React.ComponentProps<T>, Exclude<keyof React.ComponentProps<T>, "loading" | "options">>> & OutterProps & {
            store: IStore;
        }, "data" | "source" | "options" | "env" | Exclude<keyof JSX.LibraryManagedAttributes<T, Pick<React.ComponentProps<T>, Exclude<keyof React.ComponentProps<T>, "loading" | "options">>>, "store">>>, prevState: Readonly<{}>, snapshot?: any): void;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<Pick<JSX.LibraryManagedAttributes<T, Pick<React.ComponentProps<T>, Exclude<keyof React.ComponentProps<T>, "loading" | "options">>> & OutterProps & {
            store: IStore;
        }, "data" | "source" | "options" | "env" | Exclude<keyof JSX.LibraryManagedAttributes<T, Pick<React.ComponentProps<T>, Exclude<keyof React.ComponentProps<T>, "loading" | "options">>>, "store">>>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<Pick<JSX.LibraryManagedAttributes<T, Pick<React.ComponentProps<T>, Exclude<keyof React.ComponentProps<T>, "loading" | "options">>> & OutterProps & {
            store: IStore;
        }, "data" | "source" | "options" | "env" | Exclude<keyof JSX.LibraryManagedAttributes<T, Pick<React.ComponentProps<T>, Exclude<keyof React.ComponentProps<T>, "loading" | "options">>>, "store">>>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<Pick<JSX.LibraryManagedAttributes<T, Pick<React.ComponentProps<T>, Exclude<keyof React.ComponentProps<T>, "loading" | "options">>> & OutterProps & {
            store: IStore;
        }, "data" | "source" | "options" | "env" | Exclude<keyof JSX.LibraryManagedAttributes<T, Pick<React.ComponentProps<T>, Exclude<keyof React.ComponentProps<T>, "loading" | "options">>>, "store">>>, nextState: Readonly<{}>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<Pick<JSX.LibraryManagedAttributes<T, Pick<React.ComponentProps<T>, Exclude<keyof React.ComponentProps<T>, "loading" | "options">>> & OutterProps & {
            store: IStore;
        }, "data" | "source" | "options" | "env" | Exclude<keyof JSX.LibraryManagedAttributes<T, Pick<React.ComponentProps<T>, Exclude<keyof React.ComponentProps<T>, "loading" | "options">>>, "store">>>, nextState: Readonly<{}>, nextContext: any): void;
    };
    new (props: Pick<JSX.LibraryManagedAttributes<T, Pick<React.ComponentProps<T>, Exclude<keyof React.ComponentProps<T>, "loading" | "options">>> & OutterProps & {
        store: IStore;
    }, "data" | "source" | "options" | "env" | Exclude<keyof JSX.LibraryManagedAttributes<T, Pick<React.ComponentProps<T>, Exclude<keyof React.ComponentProps<T>, "loading" | "options">>>, "store">>, context: any): {
        ref: any;
        store?: ({
            fetching: boolean;
            errorMsg: string;
            options: Option[] & import("mobx-state-tree").IStateTreeNode<import("mobx-state-tree").IType<Option[] | null | undefined, Option[], Option[]>>;
            data: import("mobx-state-tree").IStateTreeNode<import("mobx-state-tree").IType<{} | null | undefined, {}, {}>>;
        } & import("mobx-state-tree/dist/internal").NonEmptyObject & {
            load: (env: RendererEnv, api: Api, data: any) => Promise<any>;
            setData(data: any): void;
            setOptions(options: any): void;
        } & import("mobx-state-tree").IStateTreeNode<import("mobx-state-tree").IModelType<{
            fetching: import("mobx-state-tree").IType<boolean | undefined, boolean, boolean>;
            errorMsg: import("mobx-state-tree").IType<string | undefined, string, string>;
            options: import("mobx-state-tree").IType<Option[] | null | undefined, Option[], Option[]>;
            data: import("mobx-state-tree").IType<{} | null | undefined, {}, {}>;
        }, {
            load: (env: RendererEnv, api: Api, data: any) => Promise<any>;
            setData(data: any): void;
            setOptions(options: any): void;
        }, import("mobx-state-tree")._NotCustomized, import("mobx-state-tree")._NotCustomized>>) | undefined;
        refFn: (ref: any) => void;
        componentWillUnmount(): void;
        getWrappedInstance(): any;
        render(): JSX.Element;
        context: any;
        setState<K extends never>(state: {} | ((prevState: Readonly<{}>, props: Readonly<Pick<JSX.LibraryManagedAttributes<T, Pick<React.ComponentProps<T>, Exclude<keyof React.ComponentProps<T>, "loading" | "options">>> & OutterProps & {
            store: IStore;
        }, "data" | "source" | "options" | "env" | Exclude<keyof JSX.LibraryManagedAttributes<T, Pick<React.ComponentProps<T>, Exclude<keyof React.ComponentProps<T>, "loading" | "options">>>, "store">>>) => {} | Pick<{}, K> | null) | Pick<{}, K> | null, callback?: (() => void) | undefined): void;
        forceUpdate(callback?: (() => void) | undefined): void;
        readonly props: Readonly<Pick<JSX.LibraryManagedAttributes<T, Pick<React.ComponentProps<T>, Exclude<keyof React.ComponentProps<T>, "loading" | "options">>> & OutterProps & {
            store: IStore;
        }, "data" | "source" | "options" | "env" | Exclude<keyof JSX.LibraryManagedAttributes<T, Pick<React.ComponentProps<T>, Exclude<keyof React.ComponentProps<T>, "loading" | "options">>>, "store">>> & Readonly<{
            children?: React.ReactNode;
        }>;
        state: Readonly<{}>;
        refs: {
            [key: string]: React.ReactInstance;
        };
        componentDidMount?(): void;
        shouldComponentUpdate?(nextProps: Readonly<Pick<JSX.LibraryManagedAttributes<T, Pick<React.ComponentProps<T>, Exclude<keyof React.ComponentProps<T>, "loading" | "options">>> & OutterProps & {
            store: IStore;
        }, "data" | "source" | "options" | "env" | Exclude<keyof JSX.LibraryManagedAttributes<T, Pick<React.ComponentProps<T>, Exclude<keyof React.ComponentProps<T>, "loading" | "options">>>, "store">>>, nextState: Readonly<{}>, nextContext: any): boolean;
        componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<Pick<JSX.LibraryManagedAttributes<T, Pick<React.ComponentProps<T>, Exclude<keyof React.ComponentProps<T>, "loading" | "options">>> & OutterProps & {
            store: IStore;
        }, "data" | "source" | "options" | "env" | Exclude<keyof JSX.LibraryManagedAttributes<T, Pick<React.ComponentProps<T>, Exclude<keyof React.ComponentProps<T>, "loading" | "options">>>, "store">>>, prevState: Readonly<{}>): any;
        componentDidUpdate?(prevProps: Readonly<Pick<JSX.LibraryManagedAttributes<T, Pick<React.ComponentProps<T>, Exclude<keyof React.ComponentProps<T>, "loading" | "options">>> & OutterProps & {
            store: IStore;
        }, "data" | "source" | "options" | "env" | Exclude<keyof JSX.LibraryManagedAttributes<T, Pick<React.ComponentProps<T>, Exclude<keyof React.ComponentProps<T>, "loading" | "options">>>, "store">>>, prevState: Readonly<{}>, snapshot?: any): void;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<Pick<JSX.LibraryManagedAttributes<T, Pick<React.ComponentProps<T>, Exclude<keyof React.ComponentProps<T>, "loading" | "options">>> & OutterProps & {
            store: IStore;
        }, "data" | "source" | "options" | "env" | Exclude<keyof JSX.LibraryManagedAttributes<T, Pick<React.ComponentProps<T>, Exclude<keyof React.ComponentProps<T>, "loading" | "options">>>, "store">>>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<Pick<JSX.LibraryManagedAttributes<T, Pick<React.ComponentProps<T>, Exclude<keyof React.ComponentProps<T>, "loading" | "options">>> & OutterProps & {
            store: IStore;
        }, "data" | "source" | "options" | "env" | Exclude<keyof JSX.LibraryManagedAttributes<T, Pick<React.ComponentProps<T>, Exclude<keyof React.ComponentProps<T>, "loading" | "options">>>, "store">>>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<Pick<JSX.LibraryManagedAttributes<T, Pick<React.ComponentProps<T>, Exclude<keyof React.ComponentProps<T>, "loading" | "options">>> & OutterProps & {
            store: IStore;
        }, "data" | "source" | "options" | "env" | Exclude<keyof JSX.LibraryManagedAttributes<T, Pick<React.ComponentProps<T>, Exclude<keyof React.ComponentProps<T>, "loading" | "options">>>, "store">>>, nextState: Readonly<{}>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<Pick<JSX.LibraryManagedAttributes<T, Pick<React.ComponentProps<T>, Exclude<keyof React.ComponentProps<T>, "loading" | "options">>> & OutterProps & {
            store: IStore;
        }, "data" | "source" | "options" | "env" | Exclude<keyof JSX.LibraryManagedAttributes<T, Pick<React.ComponentProps<T>, Exclude<keyof React.ComponentProps<T>, "loading" | "options">>>, "store">>>, nextState: Readonly<{}>, nextContext: any): void;
    };
    displayName: string;
    ComposedComponent: {
        new (props: (JSX.LibraryManagedAttributes<T, Pick<React.ComponentProps<T>, Exclude<keyof React.ComponentProps<T>, "loading" | "options">>> & OutterProps & {
            store: IStore;
        }) | Readonly<JSX.LibraryManagedAttributes<T, Pick<React.ComponentProps<T>, Exclude<keyof React.ComponentProps<T>, "loading" | "options">>> & OutterProps & {
            store: IStore;
        }>): {
            toDispose: Array<() => void>;
            componentDidMount(): void;
            componentDidUpdate(prevProps: any): void;
            componentWillUnmount(): void;
            loadOptions(): void;
            syncOptions(): void;
            render(): JSX.Element;
            context: any;
            setState<K_1 extends never>(state: {} | ((prevState: Readonly<{}>, props: Readonly<JSX.LibraryManagedAttributes<T, Pick<React.ComponentProps<T>, Exclude<keyof React.ComponentProps<T>, "loading" | "options">>> & OutterProps & {
                store: IStore;
            }>) => {} | Pick<{}, K_1> | null) | Pick<{}, K_1> | null, callback?: (() => void) | undefined): void;
            forceUpdate(callback?: (() => void) | undefined): void;
            readonly props: Readonly<JSX.LibraryManagedAttributes<T, Pick<React.ComponentProps<T>, Exclude<keyof React.ComponentProps<T>, "loading" | "options">>> & OutterProps & {
                store: IStore;
            }> & Readonly<{
                children?: React.ReactNode;
            }>;
            state: Readonly<{}>;
            refs: {
                [key: string]: React.ReactInstance;
            };
            shouldComponentUpdate?(nextProps: Readonly<JSX.LibraryManagedAttributes<T, Pick<React.ComponentProps<T>, Exclude<keyof React.ComponentProps<T>, "loading" | "options">>> & OutterProps & {
                store: IStore;
            }>, nextState: Readonly<{}>, nextContext: any): boolean;
            componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
            getSnapshotBeforeUpdate?(prevProps: Readonly<JSX.LibraryManagedAttributes<T, Pick<React.ComponentProps<T>, Exclude<keyof React.ComponentProps<T>, "loading" | "options">>> & OutterProps & {
                store: IStore;
            }>, prevState: Readonly<{}>): any;
            componentWillMount?(): void;
            UNSAFE_componentWillMount?(): void;
            componentWillReceiveProps?(nextProps: Readonly<JSX.LibraryManagedAttributes<T, Pick<React.ComponentProps<T>, Exclude<keyof React.ComponentProps<T>, "loading" | "options">>> & OutterProps & {
                store: IStore;
            }>, nextContext: any): void;
            UNSAFE_componentWillReceiveProps?(nextProps: Readonly<JSX.LibraryManagedAttributes<T, Pick<React.ComponentProps<T>, Exclude<keyof React.ComponentProps<T>, "loading" | "options">>> & OutterProps & {
                store: IStore;
            }>, nextContext: any): void;
            componentWillUpdate?(nextProps: Readonly<JSX.LibraryManagedAttributes<T, Pick<React.ComponentProps<T>, Exclude<keyof React.ComponentProps<T>, "loading" | "options">>> & OutterProps & {
                store: IStore;
            }>, nextState: Readonly<{}>, nextContext: any): void;
            UNSAFE_componentWillUpdate?(nextProps: Readonly<JSX.LibraryManagedAttributes<T, Pick<React.ComponentProps<T>, Exclude<keyof React.ComponentProps<T>, "loading" | "options">>> & OutterProps & {
                store: IStore;
            }>, nextState: Readonly<{}>, nextContext: any): void;
        };
        new (props: JSX.LibraryManagedAttributes<T, Pick<React.ComponentProps<T>, Exclude<keyof React.ComponentProps<T>, "loading" | "options">>> & OutterProps & {
            store: IStore;
        }, context: any): {
            toDispose: Array<() => void>;
            componentDidMount(): void;
            componentDidUpdate(prevProps: any): void;
            componentWillUnmount(): void;
            loadOptions(): void;
            syncOptions(): void;
            render(): JSX.Element;
            context: any;
            setState<K_1 extends never>(state: {} | ((prevState: Readonly<{}>, props: Readonly<JSX.LibraryManagedAttributes<T, Pick<React.ComponentProps<T>, Exclude<keyof React.ComponentProps<T>, "loading" | "options">>> & OutterProps & {
                store: IStore;
            }>) => {} | Pick<{}, K_1> | null) | Pick<{}, K_1> | null, callback?: (() => void) | undefined): void;
            forceUpdate(callback?: (() => void) | undefined): void;
            readonly props: Readonly<JSX.LibraryManagedAttributes<T, Pick<React.ComponentProps<T>, Exclude<keyof React.ComponentProps<T>, "loading" | "options">>> & OutterProps & {
                store: IStore;
            }> & Readonly<{
                children?: React.ReactNode;
            }>;
            state: Readonly<{}>;
            refs: {
                [key: string]: React.ReactInstance;
            };
            shouldComponentUpdate?(nextProps: Readonly<JSX.LibraryManagedAttributes<T, Pick<React.ComponentProps<T>, Exclude<keyof React.ComponentProps<T>, "loading" | "options">>> & OutterProps & {
                store: IStore;
            }>, nextState: Readonly<{}>, nextContext: any): boolean;
            componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
            getSnapshotBeforeUpdate?(prevProps: Readonly<JSX.LibraryManagedAttributes<T, Pick<React.ComponentProps<T>, Exclude<keyof React.ComponentProps<T>, "loading" | "options">>> & OutterProps & {
                store: IStore;
            }>, prevState: Readonly<{}>): any;
            componentWillMount?(): void;
            UNSAFE_componentWillMount?(): void;
            componentWillReceiveProps?(nextProps: Readonly<JSX.LibraryManagedAttributes<T, Pick<React.ComponentProps<T>, Exclude<keyof React.ComponentProps<T>, "loading" | "options">>> & OutterProps & {
                store: IStore;
            }>, nextContext: any): void;
            UNSAFE_componentWillReceiveProps?(nextProps: Readonly<JSX.LibraryManagedAttributes<T, Pick<React.ComponentProps<T>, Exclude<keyof React.ComponentProps<T>, "loading" | "options">>> & OutterProps & {
                store: IStore;
            }>, nextContext: any): void;
            componentWillUpdate?(nextProps: Readonly<JSX.LibraryManagedAttributes<T, Pick<React.ComponentProps<T>, Exclude<keyof React.ComponentProps<T>, "loading" | "options">>> & OutterProps & {
                store: IStore;
            }>, nextState: Readonly<{}>, nextContext: any): void;
            UNSAFE_componentWillUpdate?(nextProps: Readonly<JSX.LibraryManagedAttributes<T, Pick<React.ComponentProps<T>, Exclude<keyof React.ComponentProps<T>, "loading" | "options">>> & OutterProps & {
                store: IStore;
            }>, nextState: Readonly<{}>, nextContext: any): void;
        };
        displayName: string;
        ComposedComponent: T;
        contextType: React.Context<void | RendererEnv>;
    };
    contextType?: React.Context<any> | undefined;
} & hoistNonReactStatic.NonReactStatics<{
    new (props: (JSX.LibraryManagedAttributes<T, Pick<React.ComponentProps<T>, Exclude<keyof React.ComponentProps<T>, "loading" | "options">>> & OutterProps & {
        store: IStore;
    }) | Readonly<JSX.LibraryManagedAttributes<T, Pick<React.ComponentProps<T>, Exclude<keyof React.ComponentProps<T>, "loading" | "options">>> & OutterProps & {
        store: IStore;
    }>): {
        toDispose: Array<() => void>;
        componentDidMount(): void;
        componentDidUpdate(prevProps: any): void;
        componentWillUnmount(): void;
        loadOptions(): void;
        syncOptions(): void;
        render(): JSX.Element;
        context: any;
        setState<K_1 extends never>(state: {} | ((prevState: Readonly<{}>, props: Readonly<JSX.LibraryManagedAttributes<T, Pick<React.ComponentProps<T>, Exclude<keyof React.ComponentProps<T>, "loading" | "options">>> & OutterProps & {
            store: IStore;
        }>) => {} | Pick<{}, K_1> | null) | Pick<{}, K_1> | null, callback?: (() => void) | undefined): void;
        forceUpdate(callback?: (() => void) | undefined): void;
        readonly props: Readonly<JSX.LibraryManagedAttributes<T, Pick<React.ComponentProps<T>, Exclude<keyof React.ComponentProps<T>, "loading" | "options">>> & OutterProps & {
            store: IStore;
        }> & Readonly<{
            children?: React.ReactNode;
        }>;
        state: Readonly<{}>;
        refs: {
            [key: string]: React.ReactInstance;
        };
        shouldComponentUpdate?(nextProps: Readonly<JSX.LibraryManagedAttributes<T, Pick<React.ComponentProps<T>, Exclude<keyof React.ComponentProps<T>, "loading" | "options">>> & OutterProps & {
            store: IStore;
        }>, nextState: Readonly<{}>, nextContext: any): boolean;
        componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<JSX.LibraryManagedAttributes<T, Pick<React.ComponentProps<T>, Exclude<keyof React.ComponentProps<T>, "loading" | "options">>> & OutterProps & {
            store: IStore;
        }>, prevState: Readonly<{}>): any;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<JSX.LibraryManagedAttributes<T, Pick<React.ComponentProps<T>, Exclude<keyof React.ComponentProps<T>, "loading" | "options">>> & OutterProps & {
            store: IStore;
        }>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<JSX.LibraryManagedAttributes<T, Pick<React.ComponentProps<T>, Exclude<keyof React.ComponentProps<T>, "loading" | "options">>> & OutterProps & {
            store: IStore;
        }>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<JSX.LibraryManagedAttributes<T, Pick<React.ComponentProps<T>, Exclude<keyof React.ComponentProps<T>, "loading" | "options">>> & OutterProps & {
            store: IStore;
        }>, nextState: Readonly<{}>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<JSX.LibraryManagedAttributes<T, Pick<React.ComponentProps<T>, Exclude<keyof React.ComponentProps<T>, "loading" | "options">>> & OutterProps & {
            store: IStore;
        }>, nextState: Readonly<{}>, nextContext: any): void;
    };
    new (props: JSX.LibraryManagedAttributes<T, Pick<React.ComponentProps<T>, Exclude<keyof React.ComponentProps<T>, "loading" | "options">>> & OutterProps & {
        store: IStore;
    }, context: any): {
        toDispose: Array<() => void>;
        componentDidMount(): void;
        componentDidUpdate(prevProps: any): void;
        componentWillUnmount(): void;
        loadOptions(): void;
        syncOptions(): void;
        render(): JSX.Element;
        context: any;
        setState<K_1 extends never>(state: {} | ((prevState: Readonly<{}>, props: Readonly<JSX.LibraryManagedAttributes<T, Pick<React.ComponentProps<T>, Exclude<keyof React.ComponentProps<T>, "loading" | "options">>> & OutterProps & {
            store: IStore;
        }>) => {} | Pick<{}, K_1> | null) | Pick<{}, K_1> | null, callback?: (() => void) | undefined): void;
        forceUpdate(callback?: (() => void) | undefined): void;
        readonly props: Readonly<JSX.LibraryManagedAttributes<T, Pick<React.ComponentProps<T>, Exclude<keyof React.ComponentProps<T>, "loading" | "options">>> & OutterProps & {
            store: IStore;
        }> & Readonly<{
            children?: React.ReactNode;
        }>;
        state: Readonly<{}>;
        refs: {
            [key: string]: React.ReactInstance;
        };
        shouldComponentUpdate?(nextProps: Readonly<JSX.LibraryManagedAttributes<T, Pick<React.ComponentProps<T>, Exclude<keyof React.ComponentProps<T>, "loading" | "options">>> & OutterProps & {
            store: IStore;
        }>, nextState: Readonly<{}>, nextContext: any): boolean;
        componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<JSX.LibraryManagedAttributes<T, Pick<React.ComponentProps<T>, Exclude<keyof React.ComponentProps<T>, "loading" | "options">>> & OutterProps & {
            store: IStore;
        }>, prevState: Readonly<{}>): any;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<JSX.LibraryManagedAttributes<T, Pick<React.ComponentProps<T>, Exclude<keyof React.ComponentProps<T>, "loading" | "options">>> & OutterProps & {
            store: IStore;
        }>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<JSX.LibraryManagedAttributes<T, Pick<React.ComponentProps<T>, Exclude<keyof React.ComponentProps<T>, "loading" | "options">>> & OutterProps & {
            store: IStore;
        }>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<JSX.LibraryManagedAttributes<T, Pick<React.ComponentProps<T>, Exclude<keyof React.ComponentProps<T>, "loading" | "options">>> & OutterProps & {
            store: IStore;
        }>, nextState: Readonly<{}>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<JSX.LibraryManagedAttributes<T, Pick<React.ComponentProps<T>, Exclude<keyof React.ComponentProps<T>, "loading" | "options">>> & OutterProps & {
            store: IStore;
        }>, nextState: Readonly<{}>, nextContext: any): void;
    };
    displayName: string;
    ComposedComponent: T;
    contextType: React.Context<void | RendererEnv>;
}, {}> & {
    ComposedComponent: {
        new (props: (JSX.LibraryManagedAttributes<T, Pick<React.ComponentProps<T>, Exclude<keyof React.ComponentProps<T>, "loading" | "options">>> & OutterProps & {
            store: IStore;
        }) | Readonly<JSX.LibraryManagedAttributes<T, Pick<React.ComponentProps<T>, Exclude<keyof React.ComponentProps<T>, "loading" | "options">>> & OutterProps & {
            store: IStore;
        }>): {
            toDispose: Array<() => void>;
            componentDidMount(): void;
            componentDidUpdate(prevProps: any): void;
            componentWillUnmount(): void;
            loadOptions(): void;
            syncOptions(): void;
            render(): JSX.Element;
            context: any;
            setState<K_1 extends never>(state: {} | ((prevState: Readonly<{}>, props: Readonly<JSX.LibraryManagedAttributes<T, Pick<React.ComponentProps<T>, Exclude<keyof React.ComponentProps<T>, "loading" | "options">>> & OutterProps & {
                store: IStore;
            }>) => {} | Pick<{}, K_1> | null) | Pick<{}, K_1> | null, callback?: (() => void) | undefined): void;
            forceUpdate(callback?: (() => void) | undefined): void;
            readonly props: Readonly<JSX.LibraryManagedAttributes<T, Pick<React.ComponentProps<T>, Exclude<keyof React.ComponentProps<T>, "loading" | "options">>> & OutterProps & {
                store: IStore;
            }> & Readonly<{
                children?: React.ReactNode;
            }>;
            state: Readonly<{}>;
            refs: {
                [key: string]: React.ReactInstance;
            };
            shouldComponentUpdate?(nextProps: Readonly<JSX.LibraryManagedAttributes<T, Pick<React.ComponentProps<T>, Exclude<keyof React.ComponentProps<T>, "loading" | "options">>> & OutterProps & {
                store: IStore;
            }>, nextState: Readonly<{}>, nextContext: any): boolean;
            componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
            getSnapshotBeforeUpdate?(prevProps: Readonly<JSX.LibraryManagedAttributes<T, Pick<React.ComponentProps<T>, Exclude<keyof React.ComponentProps<T>, "loading" | "options">>> & OutterProps & {
                store: IStore;
            }>, prevState: Readonly<{}>): any;
            componentWillMount?(): void;
            UNSAFE_componentWillMount?(): void;
            componentWillReceiveProps?(nextProps: Readonly<JSX.LibraryManagedAttributes<T, Pick<React.ComponentProps<T>, Exclude<keyof React.ComponentProps<T>, "loading" | "options">>> & OutterProps & {
                store: IStore;
            }>, nextContext: any): void;
            UNSAFE_componentWillReceiveProps?(nextProps: Readonly<JSX.LibraryManagedAttributes<T, Pick<React.ComponentProps<T>, Exclude<keyof React.ComponentProps<T>, "loading" | "options">>> & OutterProps & {
                store: IStore;
            }>, nextContext: any): void;
            componentWillUpdate?(nextProps: Readonly<JSX.LibraryManagedAttributes<T, Pick<React.ComponentProps<T>, Exclude<keyof React.ComponentProps<T>, "loading" | "options">>> & OutterProps & {
                store: IStore;
            }>, nextState: Readonly<{}>, nextContext: any): void;
            UNSAFE_componentWillUpdate?(nextProps: Readonly<JSX.LibraryManagedAttributes<T, Pick<React.ComponentProps<T>, Exclude<keyof React.ComponentProps<T>, "loading" | "options">>> & OutterProps & {
                store: IStore;
            }>, nextState: Readonly<{}>, nextContext: any): void;
        };
        new (props: JSX.LibraryManagedAttributes<T, Pick<React.ComponentProps<T>, Exclude<keyof React.ComponentProps<T>, "loading" | "options">>> & OutterProps & {
            store: IStore;
        }, context: any): {
            toDispose: Array<() => void>;
            componentDidMount(): void;
            componentDidUpdate(prevProps: any): void;
            componentWillUnmount(): void;
            loadOptions(): void;
            syncOptions(): void;
            render(): JSX.Element;
            context: any;
            setState<K_1 extends never>(state: {} | ((prevState: Readonly<{}>, props: Readonly<JSX.LibraryManagedAttributes<T, Pick<React.ComponentProps<T>, Exclude<keyof React.ComponentProps<T>, "loading" | "options">>> & OutterProps & {
                store: IStore;
            }>) => {} | Pick<{}, K_1> | null) | Pick<{}, K_1> | null, callback?: (() => void) | undefined): void;
            forceUpdate(callback?: (() => void) | undefined): void;
            readonly props: Readonly<JSX.LibraryManagedAttributes<T, Pick<React.ComponentProps<T>, Exclude<keyof React.ComponentProps<T>, "loading" | "options">>> & OutterProps & {
                store: IStore;
            }> & Readonly<{
                children?: React.ReactNode;
            }>;
            state: Readonly<{}>;
            refs: {
                [key: string]: React.ReactInstance;
            };
            shouldComponentUpdate?(nextProps: Readonly<JSX.LibraryManagedAttributes<T, Pick<React.ComponentProps<T>, Exclude<keyof React.ComponentProps<T>, "loading" | "options">>> & OutterProps & {
                store: IStore;
            }>, nextState: Readonly<{}>, nextContext: any): boolean;
            componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
            getSnapshotBeforeUpdate?(prevProps: Readonly<JSX.LibraryManagedAttributes<T, Pick<React.ComponentProps<T>, Exclude<keyof React.ComponentProps<T>, "loading" | "options">>> & OutterProps & {
                store: IStore;
            }>, prevState: Readonly<{}>): any;
            componentWillMount?(): void;
            UNSAFE_componentWillMount?(): void;
            componentWillReceiveProps?(nextProps: Readonly<JSX.LibraryManagedAttributes<T, Pick<React.ComponentProps<T>, Exclude<keyof React.ComponentProps<T>, "loading" | "options">>> & OutterProps & {
                store: IStore;
            }>, nextContext: any): void;
            UNSAFE_componentWillReceiveProps?(nextProps: Readonly<JSX.LibraryManagedAttributes<T, Pick<React.ComponentProps<T>, Exclude<keyof React.ComponentProps<T>, "loading" | "options">>> & OutterProps & {
                store: IStore;
            }>, nextContext: any): void;
            componentWillUpdate?(nextProps: Readonly<JSX.LibraryManagedAttributes<T, Pick<React.ComponentProps<T>, Exclude<keyof React.ComponentProps<T>, "loading" | "options">>> & OutterProps & {
                store: IStore;
            }>, nextState: Readonly<{}>, nextContext: any): void;
            UNSAFE_componentWillUpdate?(nextProps: Readonly<JSX.LibraryManagedAttributes<T, Pick<React.ComponentProps<T>, Exclude<keyof React.ComponentProps<T>, "loading" | "options">>> & OutterProps & {
                store: IStore;
            }>, nextState: Readonly<{}>, nextContext: any): void;
        };
        displayName: string;
        ComposedComponent: T;
        contextType: React.Context<void | RendererEnv>;
    };
} & hoistNonReactStatic.NonReactStatics<T, {}> & {
    ComposedComponent: T;
};
