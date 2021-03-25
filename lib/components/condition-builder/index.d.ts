/// <reference types="hoist-non-react-statics" />
import React from 'react';
import { ThemeProps } from '../../theme';
import { LocaleProps } from '../../locale';
import { Fields, ConditionGroupValue, Funcs } from './types';
import { Config } from './config';
export interface ConditionBuilderProps extends ThemeProps, LocaleProps {
    fields: Fields;
    funcs?: Funcs;
    showNot?: boolean;
    value?: ConditionGroupValue;
    data?: any;
    onChange: (value: ConditionGroupValue) => void;
    config?: Config;
}
export declare class QueryBuilder extends React.Component<ConditionBuilderProps> {
    config: {
        valueTypes?: ("value" | "formula" | "func" | "field")[] | undefined;
        fields?: Fields | undefined;
        funcs?: Funcs | undefined;
        maxLevel?: number | undefined;
        types: {
            [propName: string]: import("./types").Type;
        };
    };
    dragTarget?: HTMLElement;
    ghost?: HTMLElement;
    host: HTMLElement;
    lastX: number;
    lastY: number;
    lastMoveAt: number;
    handleDragStart(e: React.DragEvent): void;
    handleDragOver(e: DragEvent): void;
    handleDragDrop(): void;
    handleDragEnd(e: Event): void;
    render(): JSX.Element;
}
declare const _default: {
    new (props: (Pick<Pick<ConditionBuilderProps, "classPrefix" | "data" | "className" | "classnames" | "theme" | "value" | "onChange" | "config" | "fields" | "funcs" | "showNot"> & {
        locale?: string | undefined;
        translate?: ((str: string, ...args: any[]) => string) | undefined;
    }, "data" | "value" | "locale" | "translate" | "onChange" | "config" | "fields" | "funcs" | "showNot"> & import("../../theme").ThemeOutterProps) | Readonly<Pick<Pick<ConditionBuilderProps, "classPrefix" | "data" | "className" | "classnames" | "theme" | "value" | "onChange" | "config" | "fields" | "funcs" | "showNot"> & {
        locale?: string | undefined;
        translate?: ((str: string, ...args: any[]) => string) | undefined;
    }, "data" | "value" | "locale" | "translate" | "onChange" | "config" | "fields" | "funcs" | "showNot"> & import("../../theme").ThemeOutterProps>): {
        render(): JSX.Element;
        context: any;
        setState<K extends never>(state: {} | ((prevState: Readonly<{}>, props: Readonly<Pick<Pick<ConditionBuilderProps, "classPrefix" | "data" | "className" | "classnames" | "theme" | "value" | "onChange" | "config" | "fields" | "funcs" | "showNot"> & {
            locale?: string | undefined;
            translate?: ((str: string, ...args: any[]) => string) | undefined;
        }, "data" | "value" | "locale" | "translate" | "onChange" | "config" | "fields" | "funcs" | "showNot"> & import("../../theme").ThemeOutterProps>) => {} | Pick<{}, K> | null) | Pick<{}, K> | null, callback?: (() => void) | undefined): void;
        forceUpdate(callback?: (() => void) | undefined): void;
        readonly props: Readonly<Pick<Pick<ConditionBuilderProps, "classPrefix" | "data" | "className" | "classnames" | "theme" | "value" | "onChange" | "config" | "fields" | "funcs" | "showNot"> & {
            locale?: string | undefined;
            translate?: ((str: string, ...args: any[]) => string) | undefined;
        }, "data" | "value" | "locale" | "translate" | "onChange" | "config" | "fields" | "funcs" | "showNot"> & import("../../theme").ThemeOutterProps> & Readonly<{
            children?: React.ReactNode;
        }>;
        state: Readonly<{}>;
        refs: {
            [key: string]: React.ReactInstance;
        };
        componentDidMount?(): void;
        shouldComponentUpdate?(nextProps: Readonly<Pick<Pick<ConditionBuilderProps, "classPrefix" | "data" | "className" | "classnames" | "theme" | "value" | "onChange" | "config" | "fields" | "funcs" | "showNot"> & {
            locale?: string | undefined;
            translate?: ((str: string, ...args: any[]) => string) | undefined;
        }, "data" | "value" | "locale" | "translate" | "onChange" | "config" | "fields" | "funcs" | "showNot"> & import("../../theme").ThemeOutterProps>, nextState: Readonly<{}>, nextContext: any): boolean;
        componentWillUnmount?(): void;
        componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<Pick<Pick<ConditionBuilderProps, "classPrefix" | "data" | "className" | "classnames" | "theme" | "value" | "onChange" | "config" | "fields" | "funcs" | "showNot"> & {
            locale?: string | undefined;
            translate?: ((str: string, ...args: any[]) => string) | undefined;
        }, "data" | "value" | "locale" | "translate" | "onChange" | "config" | "fields" | "funcs" | "showNot"> & import("../../theme").ThemeOutterProps>, prevState: Readonly<{}>): any;
        componentDidUpdate?(prevProps: Readonly<Pick<Pick<ConditionBuilderProps, "classPrefix" | "data" | "className" | "classnames" | "theme" | "value" | "onChange" | "config" | "fields" | "funcs" | "showNot"> & {
            locale?: string | undefined;
            translate?: ((str: string, ...args: any[]) => string) | undefined;
        }, "data" | "value" | "locale" | "translate" | "onChange" | "config" | "fields" | "funcs" | "showNot"> & import("../../theme").ThemeOutterProps>, prevState: Readonly<{}>, snapshot?: any): void;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<Pick<Pick<ConditionBuilderProps, "classPrefix" | "data" | "className" | "classnames" | "theme" | "value" | "onChange" | "config" | "fields" | "funcs" | "showNot"> & {
            locale?: string | undefined;
            translate?: ((str: string, ...args: any[]) => string) | undefined;
        }, "data" | "value" | "locale" | "translate" | "onChange" | "config" | "fields" | "funcs" | "showNot"> & import("../../theme").ThemeOutterProps>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<Pick<Pick<ConditionBuilderProps, "classPrefix" | "data" | "className" | "classnames" | "theme" | "value" | "onChange" | "config" | "fields" | "funcs" | "showNot"> & {
            locale?: string | undefined;
            translate?: ((str: string, ...args: any[]) => string) | undefined;
        }, "data" | "value" | "locale" | "translate" | "onChange" | "config" | "fields" | "funcs" | "showNot"> & import("../../theme").ThemeOutterProps>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<Pick<Pick<ConditionBuilderProps, "classPrefix" | "data" | "className" | "classnames" | "theme" | "value" | "onChange" | "config" | "fields" | "funcs" | "showNot"> & {
            locale?: string | undefined;
            translate?: ((str: string, ...args: any[]) => string) | undefined;
        }, "data" | "value" | "locale" | "translate" | "onChange" | "config" | "fields" | "funcs" | "showNot"> & import("../../theme").ThemeOutterProps>, nextState: Readonly<{}>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<Pick<Pick<ConditionBuilderProps, "classPrefix" | "data" | "className" | "classnames" | "theme" | "value" | "onChange" | "config" | "fields" | "funcs" | "showNot"> & {
            locale?: string | undefined;
            translate?: ((str: string, ...args: any[]) => string) | undefined;
        }, "data" | "value" | "locale" | "translate" | "onChange" | "config" | "fields" | "funcs" | "showNot"> & import("../../theme").ThemeOutterProps>, nextState: Readonly<{}>, nextContext: any): void;
    };
    new (props: Pick<Pick<ConditionBuilderProps, "classPrefix" | "data" | "className" | "classnames" | "theme" | "value" | "onChange" | "config" | "fields" | "funcs" | "showNot"> & {
        locale?: string | undefined;
        translate?: ((str: string, ...args: any[]) => string) | undefined;
    }, "data" | "value" | "locale" | "translate" | "onChange" | "config" | "fields" | "funcs" | "showNot"> & import("../../theme").ThemeOutterProps, context: any): {
        render(): JSX.Element;
        context: any;
        setState<K extends never>(state: {} | ((prevState: Readonly<{}>, props: Readonly<Pick<Pick<ConditionBuilderProps, "classPrefix" | "data" | "className" | "classnames" | "theme" | "value" | "onChange" | "config" | "fields" | "funcs" | "showNot"> & {
            locale?: string | undefined;
            translate?: ((str: string, ...args: any[]) => string) | undefined;
        }, "data" | "value" | "locale" | "translate" | "onChange" | "config" | "fields" | "funcs" | "showNot"> & import("../../theme").ThemeOutterProps>) => {} | Pick<{}, K> | null) | Pick<{}, K> | null, callback?: (() => void) | undefined): void;
        forceUpdate(callback?: (() => void) | undefined): void;
        readonly props: Readonly<Pick<Pick<ConditionBuilderProps, "classPrefix" | "data" | "className" | "classnames" | "theme" | "value" | "onChange" | "config" | "fields" | "funcs" | "showNot"> & {
            locale?: string | undefined;
            translate?: ((str: string, ...args: any[]) => string) | undefined;
        }, "data" | "value" | "locale" | "translate" | "onChange" | "config" | "fields" | "funcs" | "showNot"> & import("../../theme").ThemeOutterProps> & Readonly<{
            children?: React.ReactNode;
        }>;
        state: Readonly<{}>;
        refs: {
            [key: string]: React.ReactInstance;
        };
        componentDidMount?(): void;
        shouldComponentUpdate?(nextProps: Readonly<Pick<Pick<ConditionBuilderProps, "classPrefix" | "data" | "className" | "classnames" | "theme" | "value" | "onChange" | "config" | "fields" | "funcs" | "showNot"> & {
            locale?: string | undefined;
            translate?: ((str: string, ...args: any[]) => string) | undefined;
        }, "data" | "value" | "locale" | "translate" | "onChange" | "config" | "fields" | "funcs" | "showNot"> & import("../../theme").ThemeOutterProps>, nextState: Readonly<{}>, nextContext: any): boolean;
        componentWillUnmount?(): void;
        componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<Pick<Pick<ConditionBuilderProps, "classPrefix" | "data" | "className" | "classnames" | "theme" | "value" | "onChange" | "config" | "fields" | "funcs" | "showNot"> & {
            locale?: string | undefined;
            translate?: ((str: string, ...args: any[]) => string) | undefined;
        }, "data" | "value" | "locale" | "translate" | "onChange" | "config" | "fields" | "funcs" | "showNot"> & import("../../theme").ThemeOutterProps>, prevState: Readonly<{}>): any;
        componentDidUpdate?(prevProps: Readonly<Pick<Pick<ConditionBuilderProps, "classPrefix" | "data" | "className" | "classnames" | "theme" | "value" | "onChange" | "config" | "fields" | "funcs" | "showNot"> & {
            locale?: string | undefined;
            translate?: ((str: string, ...args: any[]) => string) | undefined;
        }, "data" | "value" | "locale" | "translate" | "onChange" | "config" | "fields" | "funcs" | "showNot"> & import("../../theme").ThemeOutterProps>, prevState: Readonly<{}>, snapshot?: any): void;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<Pick<Pick<ConditionBuilderProps, "classPrefix" | "data" | "className" | "classnames" | "theme" | "value" | "onChange" | "config" | "fields" | "funcs" | "showNot"> & {
            locale?: string | undefined;
            translate?: ((str: string, ...args: any[]) => string) | undefined;
        }, "data" | "value" | "locale" | "translate" | "onChange" | "config" | "fields" | "funcs" | "showNot"> & import("../../theme").ThemeOutterProps>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<Pick<Pick<ConditionBuilderProps, "classPrefix" | "data" | "className" | "classnames" | "theme" | "value" | "onChange" | "config" | "fields" | "funcs" | "showNot"> & {
            locale?: string | undefined;
            translate?: ((str: string, ...args: any[]) => string) | undefined;
        }, "data" | "value" | "locale" | "translate" | "onChange" | "config" | "fields" | "funcs" | "showNot"> & import("../../theme").ThemeOutterProps>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<Pick<Pick<ConditionBuilderProps, "classPrefix" | "data" | "className" | "classnames" | "theme" | "value" | "onChange" | "config" | "fields" | "funcs" | "showNot"> & {
            locale?: string | undefined;
            translate?: ((str: string, ...args: any[]) => string) | undefined;
        }, "data" | "value" | "locale" | "translate" | "onChange" | "config" | "fields" | "funcs" | "showNot"> & import("../../theme").ThemeOutterProps>, nextState: Readonly<{}>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<Pick<Pick<ConditionBuilderProps, "classPrefix" | "data" | "className" | "classnames" | "theme" | "value" | "onChange" | "config" | "fields" | "funcs" | "showNot"> & {
            locale?: string | undefined;
            translate?: ((str: string, ...args: any[]) => string) | undefined;
        }, "data" | "value" | "locale" | "translate" | "onChange" | "config" | "fields" | "funcs" | "showNot"> & import("../../theme").ThemeOutterProps>, nextState: Readonly<{}>, nextContext: any): void;
    };
    displayName: string;
    contextType: React.Context<string>;
    ComposedComponent: {
        new (props: (Pick<ConditionBuilderProps, "classPrefix" | "data" | "className" | "classnames" | "theme" | "value" | "onChange" | "config" | "fields" | "funcs" | "showNot"> & {
            locale?: string | undefined;
            translate?: ((str: string, ...args: any[]) => string) | undefined;
        }) | Readonly<Pick<ConditionBuilderProps, "classPrefix" | "data" | "className" | "classnames" | "theme" | "value" | "onChange" | "config" | "fields" | "funcs" | "showNot"> & {
            locale?: string | undefined;
            translate?: ((str: string, ...args: any[]) => string) | undefined;
        }>): {
            render(): JSX.Element;
            context: any;
            setState<K_1 extends never>(state: {} | ((prevState: Readonly<{}>, props: Readonly<Pick<ConditionBuilderProps, "classPrefix" | "data" | "className" | "classnames" | "theme" | "value" | "onChange" | "config" | "fields" | "funcs" | "showNot"> & {
                locale?: string | undefined;
                translate?: ((str: string, ...args: any[]) => string) | undefined;
            }>) => {} | Pick<{}, K_1> | null) | Pick<{}, K_1> | null, callback?: (() => void) | undefined): void;
            forceUpdate(callback?: (() => void) | undefined): void;
            readonly props: Readonly<Pick<ConditionBuilderProps, "classPrefix" | "data" | "className" | "classnames" | "theme" | "value" | "onChange" | "config" | "fields" | "funcs" | "showNot"> & {
                locale?: string | undefined;
                translate?: ((str: string, ...args: any[]) => string) | undefined;
            }> & Readonly<{
                children?: React.ReactNode;
            }>;
            state: Readonly<{}>;
            refs: {
                [key: string]: React.ReactInstance;
            };
            componentDidMount?(): void;
            shouldComponentUpdate?(nextProps: Readonly<Pick<ConditionBuilderProps, "classPrefix" | "data" | "className" | "classnames" | "theme" | "value" | "onChange" | "config" | "fields" | "funcs" | "showNot"> & {
                locale?: string | undefined;
                translate?: ((str: string, ...args: any[]) => string) | undefined;
            }>, nextState: Readonly<{}>, nextContext: any): boolean;
            componentWillUnmount?(): void;
            componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
            getSnapshotBeforeUpdate?(prevProps: Readonly<Pick<ConditionBuilderProps, "classPrefix" | "data" | "className" | "classnames" | "theme" | "value" | "onChange" | "config" | "fields" | "funcs" | "showNot"> & {
                locale?: string | undefined;
                translate?: ((str: string, ...args: any[]) => string) | undefined;
            }>, prevState: Readonly<{}>): any;
            componentDidUpdate?(prevProps: Readonly<Pick<ConditionBuilderProps, "classPrefix" | "data" | "className" | "classnames" | "theme" | "value" | "onChange" | "config" | "fields" | "funcs" | "showNot"> & {
                locale?: string | undefined;
                translate?: ((str: string, ...args: any[]) => string) | undefined;
            }>, prevState: Readonly<{}>, snapshot?: any): void;
            componentWillMount?(): void;
            UNSAFE_componentWillMount?(): void;
            componentWillReceiveProps?(nextProps: Readonly<Pick<ConditionBuilderProps, "classPrefix" | "data" | "className" | "classnames" | "theme" | "value" | "onChange" | "config" | "fields" | "funcs" | "showNot"> & {
                locale?: string | undefined;
                translate?: ((str: string, ...args: any[]) => string) | undefined;
            }>, nextContext: any): void;
            UNSAFE_componentWillReceiveProps?(nextProps: Readonly<Pick<ConditionBuilderProps, "classPrefix" | "data" | "className" | "classnames" | "theme" | "value" | "onChange" | "config" | "fields" | "funcs" | "showNot"> & {
                locale?: string | undefined;
                translate?: ((str: string, ...args: any[]) => string) | undefined;
            }>, nextContext: any): void;
            componentWillUpdate?(nextProps: Readonly<Pick<ConditionBuilderProps, "classPrefix" | "data" | "className" | "classnames" | "theme" | "value" | "onChange" | "config" | "fields" | "funcs" | "showNot"> & {
                locale?: string | undefined;
                translate?: ((str: string, ...args: any[]) => string) | undefined;
            }>, nextState: Readonly<{}>, nextContext: any): void;
            UNSAFE_componentWillUpdate?(nextProps: Readonly<Pick<ConditionBuilderProps, "classPrefix" | "data" | "className" | "classnames" | "theme" | "value" | "onChange" | "config" | "fields" | "funcs" | "showNot"> & {
                locale?: string | undefined;
                translate?: ((str: string, ...args: any[]) => string) | undefined;
            }>, nextState: Readonly<{}>, nextContext: any): void;
        };
        new (props: Pick<ConditionBuilderProps, "classPrefix" | "data" | "className" | "classnames" | "theme" | "value" | "onChange" | "config" | "fields" | "funcs" | "showNot"> & {
            locale?: string | undefined;
            translate?: ((str: string, ...args: any[]) => string) | undefined;
        }, context: any): {
            render(): JSX.Element;
            context: any;
            setState<K_1 extends never>(state: {} | ((prevState: Readonly<{}>, props: Readonly<Pick<ConditionBuilderProps, "classPrefix" | "data" | "className" | "classnames" | "theme" | "value" | "onChange" | "config" | "fields" | "funcs" | "showNot"> & {
                locale?: string | undefined;
                translate?: ((str: string, ...args: any[]) => string) | undefined;
            }>) => {} | Pick<{}, K_1> | null) | Pick<{}, K_1> | null, callback?: (() => void) | undefined): void;
            forceUpdate(callback?: (() => void) | undefined): void;
            readonly props: Readonly<Pick<ConditionBuilderProps, "classPrefix" | "data" | "className" | "classnames" | "theme" | "value" | "onChange" | "config" | "fields" | "funcs" | "showNot"> & {
                locale?: string | undefined;
                translate?: ((str: string, ...args: any[]) => string) | undefined;
            }> & Readonly<{
                children?: React.ReactNode;
            }>;
            state: Readonly<{}>;
            refs: {
                [key: string]: React.ReactInstance;
            };
            componentDidMount?(): void;
            shouldComponentUpdate?(nextProps: Readonly<Pick<ConditionBuilderProps, "classPrefix" | "data" | "className" | "classnames" | "theme" | "value" | "onChange" | "config" | "fields" | "funcs" | "showNot"> & {
                locale?: string | undefined;
                translate?: ((str: string, ...args: any[]) => string) | undefined;
            }>, nextState: Readonly<{}>, nextContext: any): boolean;
            componentWillUnmount?(): void;
            componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
            getSnapshotBeforeUpdate?(prevProps: Readonly<Pick<ConditionBuilderProps, "classPrefix" | "data" | "className" | "classnames" | "theme" | "value" | "onChange" | "config" | "fields" | "funcs" | "showNot"> & {
                locale?: string | undefined;
                translate?: ((str: string, ...args: any[]) => string) | undefined;
            }>, prevState: Readonly<{}>): any;
            componentDidUpdate?(prevProps: Readonly<Pick<ConditionBuilderProps, "classPrefix" | "data" | "className" | "classnames" | "theme" | "value" | "onChange" | "config" | "fields" | "funcs" | "showNot"> & {
                locale?: string | undefined;
                translate?: ((str: string, ...args: any[]) => string) | undefined;
            }>, prevState: Readonly<{}>, snapshot?: any): void;
            componentWillMount?(): void;
            UNSAFE_componentWillMount?(): void;
            componentWillReceiveProps?(nextProps: Readonly<Pick<ConditionBuilderProps, "classPrefix" | "data" | "className" | "classnames" | "theme" | "value" | "onChange" | "config" | "fields" | "funcs" | "showNot"> & {
                locale?: string | undefined;
                translate?: ((str: string, ...args: any[]) => string) | undefined;
            }>, nextContext: any): void;
            UNSAFE_componentWillReceiveProps?(nextProps: Readonly<Pick<ConditionBuilderProps, "classPrefix" | "data" | "className" | "classnames" | "theme" | "value" | "onChange" | "config" | "fields" | "funcs" | "showNot"> & {
                locale?: string | undefined;
                translate?: ((str: string, ...args: any[]) => string) | undefined;
            }>, nextContext: any): void;
            componentWillUpdate?(nextProps: Readonly<Pick<ConditionBuilderProps, "classPrefix" | "data" | "className" | "classnames" | "theme" | "value" | "onChange" | "config" | "fields" | "funcs" | "showNot"> & {
                locale?: string | undefined;
                translate?: ((str: string, ...args: any[]) => string) | undefined;
            }>, nextState: Readonly<{}>, nextContext: any): void;
            UNSAFE_componentWillUpdate?(nextProps: Readonly<Pick<ConditionBuilderProps, "classPrefix" | "data" | "className" | "classnames" | "theme" | "value" | "onChange" | "config" | "fields" | "funcs" | "showNot"> & {
                locale?: string | undefined;
                translate?: ((str: string, ...args: any[]) => string) | undefined;
            }>, nextState: Readonly<{}>, nextContext: any): void;
        };
        displayName: string;
        contextType: React.Context<string>;
        ComposedComponent: typeof QueryBuilder;
    } & import("hoist-non-react-statics").NonReactStatics<typeof QueryBuilder, {}> & {
        ComposedComponent: typeof QueryBuilder;
    };
} & import("hoist-non-react-statics").NonReactStatics<{
    new (props: (Pick<ConditionBuilderProps, "classPrefix" | "data" | "className" | "classnames" | "theme" | "value" | "onChange" | "config" | "fields" | "funcs" | "showNot"> & {
        locale?: string | undefined;
        translate?: ((str: string, ...args: any[]) => string) | undefined;
    }) | Readonly<Pick<ConditionBuilderProps, "classPrefix" | "data" | "className" | "classnames" | "theme" | "value" | "onChange" | "config" | "fields" | "funcs" | "showNot"> & {
        locale?: string | undefined;
        translate?: ((str: string, ...args: any[]) => string) | undefined;
    }>): {
        render(): JSX.Element;
        context: any;
        setState<K_1 extends never>(state: {} | ((prevState: Readonly<{}>, props: Readonly<Pick<ConditionBuilderProps, "classPrefix" | "data" | "className" | "classnames" | "theme" | "value" | "onChange" | "config" | "fields" | "funcs" | "showNot"> & {
            locale?: string | undefined;
            translate?: ((str: string, ...args: any[]) => string) | undefined;
        }>) => {} | Pick<{}, K_1> | null) | Pick<{}, K_1> | null, callback?: (() => void) | undefined): void;
        forceUpdate(callback?: (() => void) | undefined): void;
        readonly props: Readonly<Pick<ConditionBuilderProps, "classPrefix" | "data" | "className" | "classnames" | "theme" | "value" | "onChange" | "config" | "fields" | "funcs" | "showNot"> & {
            locale?: string | undefined;
            translate?: ((str: string, ...args: any[]) => string) | undefined;
        }> & Readonly<{
            children?: React.ReactNode;
        }>;
        state: Readonly<{}>;
        refs: {
            [key: string]: React.ReactInstance;
        };
        componentDidMount?(): void;
        shouldComponentUpdate?(nextProps: Readonly<Pick<ConditionBuilderProps, "classPrefix" | "data" | "className" | "classnames" | "theme" | "value" | "onChange" | "config" | "fields" | "funcs" | "showNot"> & {
            locale?: string | undefined;
            translate?: ((str: string, ...args: any[]) => string) | undefined;
        }>, nextState: Readonly<{}>, nextContext: any): boolean;
        componentWillUnmount?(): void;
        componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<Pick<ConditionBuilderProps, "classPrefix" | "data" | "className" | "classnames" | "theme" | "value" | "onChange" | "config" | "fields" | "funcs" | "showNot"> & {
            locale?: string | undefined;
            translate?: ((str: string, ...args: any[]) => string) | undefined;
        }>, prevState: Readonly<{}>): any;
        componentDidUpdate?(prevProps: Readonly<Pick<ConditionBuilderProps, "classPrefix" | "data" | "className" | "classnames" | "theme" | "value" | "onChange" | "config" | "fields" | "funcs" | "showNot"> & {
            locale?: string | undefined;
            translate?: ((str: string, ...args: any[]) => string) | undefined;
        }>, prevState: Readonly<{}>, snapshot?: any): void;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<Pick<ConditionBuilderProps, "classPrefix" | "data" | "className" | "classnames" | "theme" | "value" | "onChange" | "config" | "fields" | "funcs" | "showNot"> & {
            locale?: string | undefined;
            translate?: ((str: string, ...args: any[]) => string) | undefined;
        }>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<Pick<ConditionBuilderProps, "classPrefix" | "data" | "className" | "classnames" | "theme" | "value" | "onChange" | "config" | "fields" | "funcs" | "showNot"> & {
            locale?: string | undefined;
            translate?: ((str: string, ...args: any[]) => string) | undefined;
        }>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<Pick<ConditionBuilderProps, "classPrefix" | "data" | "className" | "classnames" | "theme" | "value" | "onChange" | "config" | "fields" | "funcs" | "showNot"> & {
            locale?: string | undefined;
            translate?: ((str: string, ...args: any[]) => string) | undefined;
        }>, nextState: Readonly<{}>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<Pick<ConditionBuilderProps, "classPrefix" | "data" | "className" | "classnames" | "theme" | "value" | "onChange" | "config" | "fields" | "funcs" | "showNot"> & {
            locale?: string | undefined;
            translate?: ((str: string, ...args: any[]) => string) | undefined;
        }>, nextState: Readonly<{}>, nextContext: any): void;
    };
    new (props: Pick<ConditionBuilderProps, "classPrefix" | "data" | "className" | "classnames" | "theme" | "value" | "onChange" | "config" | "fields" | "funcs" | "showNot"> & {
        locale?: string | undefined;
        translate?: ((str: string, ...args: any[]) => string) | undefined;
    }, context: any): {
        render(): JSX.Element;
        context: any;
        setState<K_1 extends never>(state: {} | ((prevState: Readonly<{}>, props: Readonly<Pick<ConditionBuilderProps, "classPrefix" | "data" | "className" | "classnames" | "theme" | "value" | "onChange" | "config" | "fields" | "funcs" | "showNot"> & {
            locale?: string | undefined;
            translate?: ((str: string, ...args: any[]) => string) | undefined;
        }>) => {} | Pick<{}, K_1> | null) | Pick<{}, K_1> | null, callback?: (() => void) | undefined): void;
        forceUpdate(callback?: (() => void) | undefined): void;
        readonly props: Readonly<Pick<ConditionBuilderProps, "classPrefix" | "data" | "className" | "classnames" | "theme" | "value" | "onChange" | "config" | "fields" | "funcs" | "showNot"> & {
            locale?: string | undefined;
            translate?: ((str: string, ...args: any[]) => string) | undefined;
        }> & Readonly<{
            children?: React.ReactNode;
        }>;
        state: Readonly<{}>;
        refs: {
            [key: string]: React.ReactInstance;
        };
        componentDidMount?(): void;
        shouldComponentUpdate?(nextProps: Readonly<Pick<ConditionBuilderProps, "classPrefix" | "data" | "className" | "classnames" | "theme" | "value" | "onChange" | "config" | "fields" | "funcs" | "showNot"> & {
            locale?: string | undefined;
            translate?: ((str: string, ...args: any[]) => string) | undefined;
        }>, nextState: Readonly<{}>, nextContext: any): boolean;
        componentWillUnmount?(): void;
        componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<Pick<ConditionBuilderProps, "classPrefix" | "data" | "className" | "classnames" | "theme" | "value" | "onChange" | "config" | "fields" | "funcs" | "showNot"> & {
            locale?: string | undefined;
            translate?: ((str: string, ...args: any[]) => string) | undefined;
        }>, prevState: Readonly<{}>): any;
        componentDidUpdate?(prevProps: Readonly<Pick<ConditionBuilderProps, "classPrefix" | "data" | "className" | "classnames" | "theme" | "value" | "onChange" | "config" | "fields" | "funcs" | "showNot"> & {
            locale?: string | undefined;
            translate?: ((str: string, ...args: any[]) => string) | undefined;
        }>, prevState: Readonly<{}>, snapshot?: any): void;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<Pick<ConditionBuilderProps, "classPrefix" | "data" | "className" | "classnames" | "theme" | "value" | "onChange" | "config" | "fields" | "funcs" | "showNot"> & {
            locale?: string | undefined;
            translate?: ((str: string, ...args: any[]) => string) | undefined;
        }>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<Pick<ConditionBuilderProps, "classPrefix" | "data" | "className" | "classnames" | "theme" | "value" | "onChange" | "config" | "fields" | "funcs" | "showNot"> & {
            locale?: string | undefined;
            translate?: ((str: string, ...args: any[]) => string) | undefined;
        }>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<Pick<ConditionBuilderProps, "classPrefix" | "data" | "className" | "classnames" | "theme" | "value" | "onChange" | "config" | "fields" | "funcs" | "showNot"> & {
            locale?: string | undefined;
            translate?: ((str: string, ...args: any[]) => string) | undefined;
        }>, nextState: Readonly<{}>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<Pick<ConditionBuilderProps, "classPrefix" | "data" | "className" | "classnames" | "theme" | "value" | "onChange" | "config" | "fields" | "funcs" | "showNot"> & {
            locale?: string | undefined;
            translate?: ((str: string, ...args: any[]) => string) | undefined;
        }>, nextState: Readonly<{}>, nextContext: any): void;
    };
    displayName: string;
    contextType: React.Context<string>;
    ComposedComponent: typeof QueryBuilder;
} & import("hoist-non-react-statics").NonReactStatics<typeof QueryBuilder, {}> & {
    ComposedComponent: typeof QueryBuilder;
}, {}> & {
    ComposedComponent: {
        new (props: (Pick<ConditionBuilderProps, "classPrefix" | "data" | "className" | "classnames" | "theme" | "value" | "onChange" | "config" | "fields" | "funcs" | "showNot"> & {
            locale?: string | undefined;
            translate?: ((str: string, ...args: any[]) => string) | undefined;
        }) | Readonly<Pick<ConditionBuilderProps, "classPrefix" | "data" | "className" | "classnames" | "theme" | "value" | "onChange" | "config" | "fields" | "funcs" | "showNot"> & {
            locale?: string | undefined;
            translate?: ((str: string, ...args: any[]) => string) | undefined;
        }>): {
            render(): JSX.Element;
            context: any;
            setState<K_1 extends never>(state: {} | ((prevState: Readonly<{}>, props: Readonly<Pick<ConditionBuilderProps, "classPrefix" | "data" | "className" | "classnames" | "theme" | "value" | "onChange" | "config" | "fields" | "funcs" | "showNot"> & {
                locale?: string | undefined;
                translate?: ((str: string, ...args: any[]) => string) | undefined;
            }>) => {} | Pick<{}, K_1> | null) | Pick<{}, K_1> | null, callback?: (() => void) | undefined): void;
            forceUpdate(callback?: (() => void) | undefined): void;
            readonly props: Readonly<Pick<ConditionBuilderProps, "classPrefix" | "data" | "className" | "classnames" | "theme" | "value" | "onChange" | "config" | "fields" | "funcs" | "showNot"> & {
                locale?: string | undefined;
                translate?: ((str: string, ...args: any[]) => string) | undefined;
            }> & Readonly<{
                children?: React.ReactNode;
            }>;
            state: Readonly<{}>;
            refs: {
                [key: string]: React.ReactInstance;
            };
            componentDidMount?(): void;
            shouldComponentUpdate?(nextProps: Readonly<Pick<ConditionBuilderProps, "classPrefix" | "data" | "className" | "classnames" | "theme" | "value" | "onChange" | "config" | "fields" | "funcs" | "showNot"> & {
                locale?: string | undefined;
                translate?: ((str: string, ...args: any[]) => string) | undefined;
            }>, nextState: Readonly<{}>, nextContext: any): boolean;
            componentWillUnmount?(): void;
            componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
            getSnapshotBeforeUpdate?(prevProps: Readonly<Pick<ConditionBuilderProps, "classPrefix" | "data" | "className" | "classnames" | "theme" | "value" | "onChange" | "config" | "fields" | "funcs" | "showNot"> & {
                locale?: string | undefined;
                translate?: ((str: string, ...args: any[]) => string) | undefined;
            }>, prevState: Readonly<{}>): any;
            componentDidUpdate?(prevProps: Readonly<Pick<ConditionBuilderProps, "classPrefix" | "data" | "className" | "classnames" | "theme" | "value" | "onChange" | "config" | "fields" | "funcs" | "showNot"> & {
                locale?: string | undefined;
                translate?: ((str: string, ...args: any[]) => string) | undefined;
            }>, prevState: Readonly<{}>, snapshot?: any): void;
            componentWillMount?(): void;
            UNSAFE_componentWillMount?(): void;
            componentWillReceiveProps?(nextProps: Readonly<Pick<ConditionBuilderProps, "classPrefix" | "data" | "className" | "classnames" | "theme" | "value" | "onChange" | "config" | "fields" | "funcs" | "showNot"> & {
                locale?: string | undefined;
                translate?: ((str: string, ...args: any[]) => string) | undefined;
            }>, nextContext: any): void;
            UNSAFE_componentWillReceiveProps?(nextProps: Readonly<Pick<ConditionBuilderProps, "classPrefix" | "data" | "className" | "classnames" | "theme" | "value" | "onChange" | "config" | "fields" | "funcs" | "showNot"> & {
                locale?: string | undefined;
                translate?: ((str: string, ...args: any[]) => string) | undefined;
            }>, nextContext: any): void;
            componentWillUpdate?(nextProps: Readonly<Pick<ConditionBuilderProps, "classPrefix" | "data" | "className" | "classnames" | "theme" | "value" | "onChange" | "config" | "fields" | "funcs" | "showNot"> & {
                locale?: string | undefined;
                translate?: ((str: string, ...args: any[]) => string) | undefined;
            }>, nextState: Readonly<{}>, nextContext: any): void;
            UNSAFE_componentWillUpdate?(nextProps: Readonly<Pick<ConditionBuilderProps, "classPrefix" | "data" | "className" | "classnames" | "theme" | "value" | "onChange" | "config" | "fields" | "funcs" | "showNot"> & {
                locale?: string | undefined;
                translate?: ((str: string, ...args: any[]) => string) | undefined;
            }>, nextState: Readonly<{}>, nextContext: any): void;
        };
        new (props: Pick<ConditionBuilderProps, "classPrefix" | "data" | "className" | "classnames" | "theme" | "value" | "onChange" | "config" | "fields" | "funcs" | "showNot"> & {
            locale?: string | undefined;
            translate?: ((str: string, ...args: any[]) => string) | undefined;
        }, context: any): {
            render(): JSX.Element;
            context: any;
            setState<K_1 extends never>(state: {} | ((prevState: Readonly<{}>, props: Readonly<Pick<ConditionBuilderProps, "classPrefix" | "data" | "className" | "classnames" | "theme" | "value" | "onChange" | "config" | "fields" | "funcs" | "showNot"> & {
                locale?: string | undefined;
                translate?: ((str: string, ...args: any[]) => string) | undefined;
            }>) => {} | Pick<{}, K_1> | null) | Pick<{}, K_1> | null, callback?: (() => void) | undefined): void;
            forceUpdate(callback?: (() => void) | undefined): void;
            readonly props: Readonly<Pick<ConditionBuilderProps, "classPrefix" | "data" | "className" | "classnames" | "theme" | "value" | "onChange" | "config" | "fields" | "funcs" | "showNot"> & {
                locale?: string | undefined;
                translate?: ((str: string, ...args: any[]) => string) | undefined;
            }> & Readonly<{
                children?: React.ReactNode;
            }>;
            state: Readonly<{}>;
            refs: {
                [key: string]: React.ReactInstance;
            };
            componentDidMount?(): void;
            shouldComponentUpdate?(nextProps: Readonly<Pick<ConditionBuilderProps, "classPrefix" | "data" | "className" | "classnames" | "theme" | "value" | "onChange" | "config" | "fields" | "funcs" | "showNot"> & {
                locale?: string | undefined;
                translate?: ((str: string, ...args: any[]) => string) | undefined;
            }>, nextState: Readonly<{}>, nextContext: any): boolean;
            componentWillUnmount?(): void;
            componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
            getSnapshotBeforeUpdate?(prevProps: Readonly<Pick<ConditionBuilderProps, "classPrefix" | "data" | "className" | "classnames" | "theme" | "value" | "onChange" | "config" | "fields" | "funcs" | "showNot"> & {
                locale?: string | undefined;
                translate?: ((str: string, ...args: any[]) => string) | undefined;
            }>, prevState: Readonly<{}>): any;
            componentDidUpdate?(prevProps: Readonly<Pick<ConditionBuilderProps, "classPrefix" | "data" | "className" | "classnames" | "theme" | "value" | "onChange" | "config" | "fields" | "funcs" | "showNot"> & {
                locale?: string | undefined;
                translate?: ((str: string, ...args: any[]) => string) | undefined;
            }>, prevState: Readonly<{}>, snapshot?: any): void;
            componentWillMount?(): void;
            UNSAFE_componentWillMount?(): void;
            componentWillReceiveProps?(nextProps: Readonly<Pick<ConditionBuilderProps, "classPrefix" | "data" | "className" | "classnames" | "theme" | "value" | "onChange" | "config" | "fields" | "funcs" | "showNot"> & {
                locale?: string | undefined;
                translate?: ((str: string, ...args: any[]) => string) | undefined;
            }>, nextContext: any): void;
            UNSAFE_componentWillReceiveProps?(nextProps: Readonly<Pick<ConditionBuilderProps, "classPrefix" | "data" | "className" | "classnames" | "theme" | "value" | "onChange" | "config" | "fields" | "funcs" | "showNot"> & {
                locale?: string | undefined;
                translate?: ((str: string, ...args: any[]) => string) | undefined;
            }>, nextContext: any): void;
            componentWillUpdate?(nextProps: Readonly<Pick<ConditionBuilderProps, "classPrefix" | "data" | "className" | "classnames" | "theme" | "value" | "onChange" | "config" | "fields" | "funcs" | "showNot"> & {
                locale?: string | undefined;
                translate?: ((str: string, ...args: any[]) => string) | undefined;
            }>, nextState: Readonly<{}>, nextContext: any): void;
            UNSAFE_componentWillUpdate?(nextProps: Readonly<Pick<ConditionBuilderProps, "classPrefix" | "data" | "className" | "classnames" | "theme" | "value" | "onChange" | "config" | "fields" | "funcs" | "showNot"> & {
                locale?: string | undefined;
                translate?: ((str: string, ...args: any[]) => string) | undefined;
            }>, nextState: Readonly<{}>, nextContext: any): void;
        };
        displayName: string;
        contextType: React.Context<string>;
        ComposedComponent: typeof QueryBuilder;
    } & import("hoist-non-react-statics").NonReactStatics<typeof QueryBuilder, {}> & {
        ComposedComponent: typeof QueryBuilder;
    };
};
export default _default;
