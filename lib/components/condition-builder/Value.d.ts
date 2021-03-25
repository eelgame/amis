/// <reference types="hoist-non-react-statics" />
import React from 'react';
import { FieldSimple, OperatorType } from './types';
import { ThemeProps } from '../../theme';
import { LocaleProps } from '../../locale';
export interface ValueProps extends ThemeProps, LocaleProps {
    value: any;
    data?: any;
    onChange: (value: any) => void;
    field: FieldSimple;
    op?: OperatorType;
}
export declare class Value extends React.Component<ValueProps> {
    render(): JSX.Element;
}
declare const _default: {
    new (props: (Pick<Pick<ValueProps, "classPrefix" | "data" | "className" | "classnames" | "theme" | "value" | "onChange" | "field" | "op"> & {
        locale?: string | undefined;
        translate?: ((str: string, ...args: any[]) => string) | undefined;
    }, "data" | "value" | "locale" | "translate" | "onChange" | "field" | "op"> & import("../../theme").ThemeOutterProps) | Readonly<Pick<Pick<ValueProps, "classPrefix" | "data" | "className" | "classnames" | "theme" | "value" | "onChange" | "field" | "op"> & {
        locale?: string | undefined;
        translate?: ((str: string, ...args: any[]) => string) | undefined;
    }, "data" | "value" | "locale" | "translate" | "onChange" | "field" | "op"> & import("../../theme").ThemeOutterProps>): {
        render(): JSX.Element;
        context: any;
        setState<K extends never>(state: {} | ((prevState: Readonly<{}>, props: Readonly<Pick<Pick<ValueProps, "classPrefix" | "data" | "className" | "classnames" | "theme" | "value" | "onChange" | "field" | "op"> & {
            locale?: string | undefined;
            translate?: ((str: string, ...args: any[]) => string) | undefined;
        }, "data" | "value" | "locale" | "translate" | "onChange" | "field" | "op"> & import("../../theme").ThemeOutterProps>) => {} | Pick<{}, K> | null) | Pick<{}, K> | null, callback?: (() => void) | undefined): void;
        forceUpdate(callback?: (() => void) | undefined): void;
        readonly props: Readonly<Pick<Pick<ValueProps, "classPrefix" | "data" | "className" | "classnames" | "theme" | "value" | "onChange" | "field" | "op"> & {
            locale?: string | undefined;
            translate?: ((str: string, ...args: any[]) => string) | undefined;
        }, "data" | "value" | "locale" | "translate" | "onChange" | "field" | "op"> & import("../../theme").ThemeOutterProps> & Readonly<{
            children?: React.ReactNode;
        }>;
        state: Readonly<{}>;
        refs: {
            [key: string]: React.ReactInstance;
        };
        componentDidMount?(): void;
        shouldComponentUpdate?(nextProps: Readonly<Pick<Pick<ValueProps, "classPrefix" | "data" | "className" | "classnames" | "theme" | "value" | "onChange" | "field" | "op"> & {
            locale?: string | undefined;
            translate?: ((str: string, ...args: any[]) => string) | undefined;
        }, "data" | "value" | "locale" | "translate" | "onChange" | "field" | "op"> & import("../../theme").ThemeOutterProps>, nextState: Readonly<{}>, nextContext: any): boolean;
        componentWillUnmount?(): void;
        componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<Pick<Pick<ValueProps, "classPrefix" | "data" | "className" | "classnames" | "theme" | "value" | "onChange" | "field" | "op"> & {
            locale?: string | undefined;
            translate?: ((str: string, ...args: any[]) => string) | undefined;
        }, "data" | "value" | "locale" | "translate" | "onChange" | "field" | "op"> & import("../../theme").ThemeOutterProps>, prevState: Readonly<{}>): any;
        componentDidUpdate?(prevProps: Readonly<Pick<Pick<ValueProps, "classPrefix" | "data" | "className" | "classnames" | "theme" | "value" | "onChange" | "field" | "op"> & {
            locale?: string | undefined;
            translate?: ((str: string, ...args: any[]) => string) | undefined;
        }, "data" | "value" | "locale" | "translate" | "onChange" | "field" | "op"> & import("../../theme").ThemeOutterProps>, prevState: Readonly<{}>, snapshot?: any): void;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<Pick<Pick<ValueProps, "classPrefix" | "data" | "className" | "classnames" | "theme" | "value" | "onChange" | "field" | "op"> & {
            locale?: string | undefined;
            translate?: ((str: string, ...args: any[]) => string) | undefined;
        }, "data" | "value" | "locale" | "translate" | "onChange" | "field" | "op"> & import("../../theme").ThemeOutterProps>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<Pick<Pick<ValueProps, "classPrefix" | "data" | "className" | "classnames" | "theme" | "value" | "onChange" | "field" | "op"> & {
            locale?: string | undefined;
            translate?: ((str: string, ...args: any[]) => string) | undefined;
        }, "data" | "value" | "locale" | "translate" | "onChange" | "field" | "op"> & import("../../theme").ThemeOutterProps>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<Pick<Pick<ValueProps, "classPrefix" | "data" | "className" | "classnames" | "theme" | "value" | "onChange" | "field" | "op"> & {
            locale?: string | undefined;
            translate?: ((str: string, ...args: any[]) => string) | undefined;
        }, "data" | "value" | "locale" | "translate" | "onChange" | "field" | "op"> & import("../../theme").ThemeOutterProps>, nextState: Readonly<{}>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<Pick<Pick<ValueProps, "classPrefix" | "data" | "className" | "classnames" | "theme" | "value" | "onChange" | "field" | "op"> & {
            locale?: string | undefined;
            translate?: ((str: string, ...args: any[]) => string) | undefined;
        }, "data" | "value" | "locale" | "translate" | "onChange" | "field" | "op"> & import("../../theme").ThemeOutterProps>, nextState: Readonly<{}>, nextContext: any): void;
    };
    new (props: Pick<Pick<ValueProps, "classPrefix" | "data" | "className" | "classnames" | "theme" | "value" | "onChange" | "field" | "op"> & {
        locale?: string | undefined;
        translate?: ((str: string, ...args: any[]) => string) | undefined;
    }, "data" | "value" | "locale" | "translate" | "onChange" | "field" | "op"> & import("../../theme").ThemeOutterProps, context: any): {
        render(): JSX.Element;
        context: any;
        setState<K extends never>(state: {} | ((prevState: Readonly<{}>, props: Readonly<Pick<Pick<ValueProps, "classPrefix" | "data" | "className" | "classnames" | "theme" | "value" | "onChange" | "field" | "op"> & {
            locale?: string | undefined;
            translate?: ((str: string, ...args: any[]) => string) | undefined;
        }, "data" | "value" | "locale" | "translate" | "onChange" | "field" | "op"> & import("../../theme").ThemeOutterProps>) => {} | Pick<{}, K> | null) | Pick<{}, K> | null, callback?: (() => void) | undefined): void;
        forceUpdate(callback?: (() => void) | undefined): void;
        readonly props: Readonly<Pick<Pick<ValueProps, "classPrefix" | "data" | "className" | "classnames" | "theme" | "value" | "onChange" | "field" | "op"> & {
            locale?: string | undefined;
            translate?: ((str: string, ...args: any[]) => string) | undefined;
        }, "data" | "value" | "locale" | "translate" | "onChange" | "field" | "op"> & import("../../theme").ThemeOutterProps> & Readonly<{
            children?: React.ReactNode;
        }>;
        state: Readonly<{}>;
        refs: {
            [key: string]: React.ReactInstance;
        };
        componentDidMount?(): void;
        shouldComponentUpdate?(nextProps: Readonly<Pick<Pick<ValueProps, "classPrefix" | "data" | "className" | "classnames" | "theme" | "value" | "onChange" | "field" | "op"> & {
            locale?: string | undefined;
            translate?: ((str: string, ...args: any[]) => string) | undefined;
        }, "data" | "value" | "locale" | "translate" | "onChange" | "field" | "op"> & import("../../theme").ThemeOutterProps>, nextState: Readonly<{}>, nextContext: any): boolean;
        componentWillUnmount?(): void;
        componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<Pick<Pick<ValueProps, "classPrefix" | "data" | "className" | "classnames" | "theme" | "value" | "onChange" | "field" | "op"> & {
            locale?: string | undefined;
            translate?: ((str: string, ...args: any[]) => string) | undefined;
        }, "data" | "value" | "locale" | "translate" | "onChange" | "field" | "op"> & import("../../theme").ThemeOutterProps>, prevState: Readonly<{}>): any;
        componentDidUpdate?(prevProps: Readonly<Pick<Pick<ValueProps, "classPrefix" | "data" | "className" | "classnames" | "theme" | "value" | "onChange" | "field" | "op"> & {
            locale?: string | undefined;
            translate?: ((str: string, ...args: any[]) => string) | undefined;
        }, "data" | "value" | "locale" | "translate" | "onChange" | "field" | "op"> & import("../../theme").ThemeOutterProps>, prevState: Readonly<{}>, snapshot?: any): void;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<Pick<Pick<ValueProps, "classPrefix" | "data" | "className" | "classnames" | "theme" | "value" | "onChange" | "field" | "op"> & {
            locale?: string | undefined;
            translate?: ((str: string, ...args: any[]) => string) | undefined;
        }, "data" | "value" | "locale" | "translate" | "onChange" | "field" | "op"> & import("../../theme").ThemeOutterProps>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<Pick<Pick<ValueProps, "classPrefix" | "data" | "className" | "classnames" | "theme" | "value" | "onChange" | "field" | "op"> & {
            locale?: string | undefined;
            translate?: ((str: string, ...args: any[]) => string) | undefined;
        }, "data" | "value" | "locale" | "translate" | "onChange" | "field" | "op"> & import("../../theme").ThemeOutterProps>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<Pick<Pick<ValueProps, "classPrefix" | "data" | "className" | "classnames" | "theme" | "value" | "onChange" | "field" | "op"> & {
            locale?: string | undefined;
            translate?: ((str: string, ...args: any[]) => string) | undefined;
        }, "data" | "value" | "locale" | "translate" | "onChange" | "field" | "op"> & import("../../theme").ThemeOutterProps>, nextState: Readonly<{}>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<Pick<Pick<ValueProps, "classPrefix" | "data" | "className" | "classnames" | "theme" | "value" | "onChange" | "field" | "op"> & {
            locale?: string | undefined;
            translate?: ((str: string, ...args: any[]) => string) | undefined;
        }, "data" | "value" | "locale" | "translate" | "onChange" | "field" | "op"> & import("../../theme").ThemeOutterProps>, nextState: Readonly<{}>, nextContext: any): void;
    };
    displayName: string;
    contextType: React.Context<string>;
    ComposedComponent: {
        new (props: (Pick<ValueProps, "classPrefix" | "data" | "className" | "classnames" | "theme" | "value" | "onChange" | "field" | "op"> & {
            locale?: string | undefined;
            translate?: ((str: string, ...args: any[]) => string) | undefined;
        }) | Readonly<Pick<ValueProps, "classPrefix" | "data" | "className" | "classnames" | "theme" | "value" | "onChange" | "field" | "op"> & {
            locale?: string | undefined;
            translate?: ((str: string, ...args: any[]) => string) | undefined;
        }>): {
            render(): JSX.Element;
            context: any;
            setState<K_1 extends never>(state: {} | ((prevState: Readonly<{}>, props: Readonly<Pick<ValueProps, "classPrefix" | "data" | "className" | "classnames" | "theme" | "value" | "onChange" | "field" | "op"> & {
                locale?: string | undefined;
                translate?: ((str: string, ...args: any[]) => string) | undefined;
            }>) => {} | Pick<{}, K_1> | null) | Pick<{}, K_1> | null, callback?: (() => void) | undefined): void;
            forceUpdate(callback?: (() => void) | undefined): void;
            readonly props: Readonly<Pick<ValueProps, "classPrefix" | "data" | "className" | "classnames" | "theme" | "value" | "onChange" | "field" | "op"> & {
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
            shouldComponentUpdate?(nextProps: Readonly<Pick<ValueProps, "classPrefix" | "data" | "className" | "classnames" | "theme" | "value" | "onChange" | "field" | "op"> & {
                locale?: string | undefined;
                translate?: ((str: string, ...args: any[]) => string) | undefined;
            }>, nextState: Readonly<{}>, nextContext: any): boolean;
            componentWillUnmount?(): void;
            componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
            getSnapshotBeforeUpdate?(prevProps: Readonly<Pick<ValueProps, "classPrefix" | "data" | "className" | "classnames" | "theme" | "value" | "onChange" | "field" | "op"> & {
                locale?: string | undefined;
                translate?: ((str: string, ...args: any[]) => string) | undefined;
            }>, prevState: Readonly<{}>): any;
            componentDidUpdate?(prevProps: Readonly<Pick<ValueProps, "classPrefix" | "data" | "className" | "classnames" | "theme" | "value" | "onChange" | "field" | "op"> & {
                locale?: string | undefined;
                translate?: ((str: string, ...args: any[]) => string) | undefined;
            }>, prevState: Readonly<{}>, snapshot?: any): void;
            componentWillMount?(): void;
            UNSAFE_componentWillMount?(): void;
            componentWillReceiveProps?(nextProps: Readonly<Pick<ValueProps, "classPrefix" | "data" | "className" | "classnames" | "theme" | "value" | "onChange" | "field" | "op"> & {
                locale?: string | undefined;
                translate?: ((str: string, ...args: any[]) => string) | undefined;
            }>, nextContext: any): void;
            UNSAFE_componentWillReceiveProps?(nextProps: Readonly<Pick<ValueProps, "classPrefix" | "data" | "className" | "classnames" | "theme" | "value" | "onChange" | "field" | "op"> & {
                locale?: string | undefined;
                translate?: ((str: string, ...args: any[]) => string) | undefined;
            }>, nextContext: any): void;
            componentWillUpdate?(nextProps: Readonly<Pick<ValueProps, "classPrefix" | "data" | "className" | "classnames" | "theme" | "value" | "onChange" | "field" | "op"> & {
                locale?: string | undefined;
                translate?: ((str: string, ...args: any[]) => string) | undefined;
            }>, nextState: Readonly<{}>, nextContext: any): void;
            UNSAFE_componentWillUpdate?(nextProps: Readonly<Pick<ValueProps, "classPrefix" | "data" | "className" | "classnames" | "theme" | "value" | "onChange" | "field" | "op"> & {
                locale?: string | undefined;
                translate?: ((str: string, ...args: any[]) => string) | undefined;
            }>, nextState: Readonly<{}>, nextContext: any): void;
        };
        new (props: Pick<ValueProps, "classPrefix" | "data" | "className" | "classnames" | "theme" | "value" | "onChange" | "field" | "op"> & {
            locale?: string | undefined;
            translate?: ((str: string, ...args: any[]) => string) | undefined;
        }, context: any): {
            render(): JSX.Element;
            context: any;
            setState<K_1 extends never>(state: {} | ((prevState: Readonly<{}>, props: Readonly<Pick<ValueProps, "classPrefix" | "data" | "className" | "classnames" | "theme" | "value" | "onChange" | "field" | "op"> & {
                locale?: string | undefined;
                translate?: ((str: string, ...args: any[]) => string) | undefined;
            }>) => {} | Pick<{}, K_1> | null) | Pick<{}, K_1> | null, callback?: (() => void) | undefined): void;
            forceUpdate(callback?: (() => void) | undefined): void;
            readonly props: Readonly<Pick<ValueProps, "classPrefix" | "data" | "className" | "classnames" | "theme" | "value" | "onChange" | "field" | "op"> & {
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
            shouldComponentUpdate?(nextProps: Readonly<Pick<ValueProps, "classPrefix" | "data" | "className" | "classnames" | "theme" | "value" | "onChange" | "field" | "op"> & {
                locale?: string | undefined;
                translate?: ((str: string, ...args: any[]) => string) | undefined;
            }>, nextState: Readonly<{}>, nextContext: any): boolean;
            componentWillUnmount?(): void;
            componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
            getSnapshotBeforeUpdate?(prevProps: Readonly<Pick<ValueProps, "classPrefix" | "data" | "className" | "classnames" | "theme" | "value" | "onChange" | "field" | "op"> & {
                locale?: string | undefined;
                translate?: ((str: string, ...args: any[]) => string) | undefined;
            }>, prevState: Readonly<{}>): any;
            componentDidUpdate?(prevProps: Readonly<Pick<ValueProps, "classPrefix" | "data" | "className" | "classnames" | "theme" | "value" | "onChange" | "field" | "op"> & {
                locale?: string | undefined;
                translate?: ((str: string, ...args: any[]) => string) | undefined;
            }>, prevState: Readonly<{}>, snapshot?: any): void;
            componentWillMount?(): void;
            UNSAFE_componentWillMount?(): void;
            componentWillReceiveProps?(nextProps: Readonly<Pick<ValueProps, "classPrefix" | "data" | "className" | "classnames" | "theme" | "value" | "onChange" | "field" | "op"> & {
                locale?: string | undefined;
                translate?: ((str: string, ...args: any[]) => string) | undefined;
            }>, nextContext: any): void;
            UNSAFE_componentWillReceiveProps?(nextProps: Readonly<Pick<ValueProps, "classPrefix" | "data" | "className" | "classnames" | "theme" | "value" | "onChange" | "field" | "op"> & {
                locale?: string | undefined;
                translate?: ((str: string, ...args: any[]) => string) | undefined;
            }>, nextContext: any): void;
            componentWillUpdate?(nextProps: Readonly<Pick<ValueProps, "classPrefix" | "data" | "className" | "classnames" | "theme" | "value" | "onChange" | "field" | "op"> & {
                locale?: string | undefined;
                translate?: ((str: string, ...args: any[]) => string) | undefined;
            }>, nextState: Readonly<{}>, nextContext: any): void;
            UNSAFE_componentWillUpdate?(nextProps: Readonly<Pick<ValueProps, "classPrefix" | "data" | "className" | "classnames" | "theme" | "value" | "onChange" | "field" | "op"> & {
                locale?: string | undefined;
                translate?: ((str: string, ...args: any[]) => string) | undefined;
            }>, nextState: Readonly<{}>, nextContext: any): void;
        };
        displayName: string;
        contextType: React.Context<string>;
        ComposedComponent: typeof Value;
    } & import("hoist-non-react-statics").NonReactStatics<typeof Value, {}> & {
        ComposedComponent: typeof Value;
    };
} & import("hoist-non-react-statics").NonReactStatics<{
    new (props: (Pick<ValueProps, "classPrefix" | "data" | "className" | "classnames" | "theme" | "value" | "onChange" | "field" | "op"> & {
        locale?: string | undefined;
        translate?: ((str: string, ...args: any[]) => string) | undefined;
    }) | Readonly<Pick<ValueProps, "classPrefix" | "data" | "className" | "classnames" | "theme" | "value" | "onChange" | "field" | "op"> & {
        locale?: string | undefined;
        translate?: ((str: string, ...args: any[]) => string) | undefined;
    }>): {
        render(): JSX.Element;
        context: any;
        setState<K_1 extends never>(state: {} | ((prevState: Readonly<{}>, props: Readonly<Pick<ValueProps, "classPrefix" | "data" | "className" | "classnames" | "theme" | "value" | "onChange" | "field" | "op"> & {
            locale?: string | undefined;
            translate?: ((str: string, ...args: any[]) => string) | undefined;
        }>) => {} | Pick<{}, K_1> | null) | Pick<{}, K_1> | null, callback?: (() => void) | undefined): void;
        forceUpdate(callback?: (() => void) | undefined): void;
        readonly props: Readonly<Pick<ValueProps, "classPrefix" | "data" | "className" | "classnames" | "theme" | "value" | "onChange" | "field" | "op"> & {
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
        shouldComponentUpdate?(nextProps: Readonly<Pick<ValueProps, "classPrefix" | "data" | "className" | "classnames" | "theme" | "value" | "onChange" | "field" | "op"> & {
            locale?: string | undefined;
            translate?: ((str: string, ...args: any[]) => string) | undefined;
        }>, nextState: Readonly<{}>, nextContext: any): boolean;
        componentWillUnmount?(): void;
        componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<Pick<ValueProps, "classPrefix" | "data" | "className" | "classnames" | "theme" | "value" | "onChange" | "field" | "op"> & {
            locale?: string | undefined;
            translate?: ((str: string, ...args: any[]) => string) | undefined;
        }>, prevState: Readonly<{}>): any;
        componentDidUpdate?(prevProps: Readonly<Pick<ValueProps, "classPrefix" | "data" | "className" | "classnames" | "theme" | "value" | "onChange" | "field" | "op"> & {
            locale?: string | undefined;
            translate?: ((str: string, ...args: any[]) => string) | undefined;
        }>, prevState: Readonly<{}>, snapshot?: any): void;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<Pick<ValueProps, "classPrefix" | "data" | "className" | "classnames" | "theme" | "value" | "onChange" | "field" | "op"> & {
            locale?: string | undefined;
            translate?: ((str: string, ...args: any[]) => string) | undefined;
        }>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<Pick<ValueProps, "classPrefix" | "data" | "className" | "classnames" | "theme" | "value" | "onChange" | "field" | "op"> & {
            locale?: string | undefined;
            translate?: ((str: string, ...args: any[]) => string) | undefined;
        }>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<Pick<ValueProps, "classPrefix" | "data" | "className" | "classnames" | "theme" | "value" | "onChange" | "field" | "op"> & {
            locale?: string | undefined;
            translate?: ((str: string, ...args: any[]) => string) | undefined;
        }>, nextState: Readonly<{}>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<Pick<ValueProps, "classPrefix" | "data" | "className" | "classnames" | "theme" | "value" | "onChange" | "field" | "op"> & {
            locale?: string | undefined;
            translate?: ((str: string, ...args: any[]) => string) | undefined;
        }>, nextState: Readonly<{}>, nextContext: any): void;
    };
    new (props: Pick<ValueProps, "classPrefix" | "data" | "className" | "classnames" | "theme" | "value" | "onChange" | "field" | "op"> & {
        locale?: string | undefined;
        translate?: ((str: string, ...args: any[]) => string) | undefined;
    }, context: any): {
        render(): JSX.Element;
        context: any;
        setState<K_1 extends never>(state: {} | ((prevState: Readonly<{}>, props: Readonly<Pick<ValueProps, "classPrefix" | "data" | "className" | "classnames" | "theme" | "value" | "onChange" | "field" | "op"> & {
            locale?: string | undefined;
            translate?: ((str: string, ...args: any[]) => string) | undefined;
        }>) => {} | Pick<{}, K_1> | null) | Pick<{}, K_1> | null, callback?: (() => void) | undefined): void;
        forceUpdate(callback?: (() => void) | undefined): void;
        readonly props: Readonly<Pick<ValueProps, "classPrefix" | "data" | "className" | "classnames" | "theme" | "value" | "onChange" | "field" | "op"> & {
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
        shouldComponentUpdate?(nextProps: Readonly<Pick<ValueProps, "classPrefix" | "data" | "className" | "classnames" | "theme" | "value" | "onChange" | "field" | "op"> & {
            locale?: string | undefined;
            translate?: ((str: string, ...args: any[]) => string) | undefined;
        }>, nextState: Readonly<{}>, nextContext: any): boolean;
        componentWillUnmount?(): void;
        componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<Pick<ValueProps, "classPrefix" | "data" | "className" | "classnames" | "theme" | "value" | "onChange" | "field" | "op"> & {
            locale?: string | undefined;
            translate?: ((str: string, ...args: any[]) => string) | undefined;
        }>, prevState: Readonly<{}>): any;
        componentDidUpdate?(prevProps: Readonly<Pick<ValueProps, "classPrefix" | "data" | "className" | "classnames" | "theme" | "value" | "onChange" | "field" | "op"> & {
            locale?: string | undefined;
            translate?: ((str: string, ...args: any[]) => string) | undefined;
        }>, prevState: Readonly<{}>, snapshot?: any): void;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<Pick<ValueProps, "classPrefix" | "data" | "className" | "classnames" | "theme" | "value" | "onChange" | "field" | "op"> & {
            locale?: string | undefined;
            translate?: ((str: string, ...args: any[]) => string) | undefined;
        }>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<Pick<ValueProps, "classPrefix" | "data" | "className" | "classnames" | "theme" | "value" | "onChange" | "field" | "op"> & {
            locale?: string | undefined;
            translate?: ((str: string, ...args: any[]) => string) | undefined;
        }>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<Pick<ValueProps, "classPrefix" | "data" | "className" | "classnames" | "theme" | "value" | "onChange" | "field" | "op"> & {
            locale?: string | undefined;
            translate?: ((str: string, ...args: any[]) => string) | undefined;
        }>, nextState: Readonly<{}>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<Pick<ValueProps, "classPrefix" | "data" | "className" | "classnames" | "theme" | "value" | "onChange" | "field" | "op"> & {
            locale?: string | undefined;
            translate?: ((str: string, ...args: any[]) => string) | undefined;
        }>, nextState: Readonly<{}>, nextContext: any): void;
    };
    displayName: string;
    contextType: React.Context<string>;
    ComposedComponent: typeof Value;
} & import("hoist-non-react-statics").NonReactStatics<typeof Value, {}> & {
    ComposedComponent: typeof Value;
}, {}> & {
    ComposedComponent: {
        new (props: (Pick<ValueProps, "classPrefix" | "data" | "className" | "classnames" | "theme" | "value" | "onChange" | "field" | "op"> & {
            locale?: string | undefined;
            translate?: ((str: string, ...args: any[]) => string) | undefined;
        }) | Readonly<Pick<ValueProps, "classPrefix" | "data" | "className" | "classnames" | "theme" | "value" | "onChange" | "field" | "op"> & {
            locale?: string | undefined;
            translate?: ((str: string, ...args: any[]) => string) | undefined;
        }>): {
            render(): JSX.Element;
            context: any;
            setState<K_1 extends never>(state: {} | ((prevState: Readonly<{}>, props: Readonly<Pick<ValueProps, "classPrefix" | "data" | "className" | "classnames" | "theme" | "value" | "onChange" | "field" | "op"> & {
                locale?: string | undefined;
                translate?: ((str: string, ...args: any[]) => string) | undefined;
            }>) => {} | Pick<{}, K_1> | null) | Pick<{}, K_1> | null, callback?: (() => void) | undefined): void;
            forceUpdate(callback?: (() => void) | undefined): void;
            readonly props: Readonly<Pick<ValueProps, "classPrefix" | "data" | "className" | "classnames" | "theme" | "value" | "onChange" | "field" | "op"> & {
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
            shouldComponentUpdate?(nextProps: Readonly<Pick<ValueProps, "classPrefix" | "data" | "className" | "classnames" | "theme" | "value" | "onChange" | "field" | "op"> & {
                locale?: string | undefined;
                translate?: ((str: string, ...args: any[]) => string) | undefined;
            }>, nextState: Readonly<{}>, nextContext: any): boolean;
            componentWillUnmount?(): void;
            componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
            getSnapshotBeforeUpdate?(prevProps: Readonly<Pick<ValueProps, "classPrefix" | "data" | "className" | "classnames" | "theme" | "value" | "onChange" | "field" | "op"> & {
                locale?: string | undefined;
                translate?: ((str: string, ...args: any[]) => string) | undefined;
            }>, prevState: Readonly<{}>): any;
            componentDidUpdate?(prevProps: Readonly<Pick<ValueProps, "classPrefix" | "data" | "className" | "classnames" | "theme" | "value" | "onChange" | "field" | "op"> & {
                locale?: string | undefined;
                translate?: ((str: string, ...args: any[]) => string) | undefined;
            }>, prevState: Readonly<{}>, snapshot?: any): void;
            componentWillMount?(): void;
            UNSAFE_componentWillMount?(): void;
            componentWillReceiveProps?(nextProps: Readonly<Pick<ValueProps, "classPrefix" | "data" | "className" | "classnames" | "theme" | "value" | "onChange" | "field" | "op"> & {
                locale?: string | undefined;
                translate?: ((str: string, ...args: any[]) => string) | undefined;
            }>, nextContext: any): void;
            UNSAFE_componentWillReceiveProps?(nextProps: Readonly<Pick<ValueProps, "classPrefix" | "data" | "className" | "classnames" | "theme" | "value" | "onChange" | "field" | "op"> & {
                locale?: string | undefined;
                translate?: ((str: string, ...args: any[]) => string) | undefined;
            }>, nextContext: any): void;
            componentWillUpdate?(nextProps: Readonly<Pick<ValueProps, "classPrefix" | "data" | "className" | "classnames" | "theme" | "value" | "onChange" | "field" | "op"> & {
                locale?: string | undefined;
                translate?: ((str: string, ...args: any[]) => string) | undefined;
            }>, nextState: Readonly<{}>, nextContext: any): void;
            UNSAFE_componentWillUpdate?(nextProps: Readonly<Pick<ValueProps, "classPrefix" | "data" | "className" | "classnames" | "theme" | "value" | "onChange" | "field" | "op"> & {
                locale?: string | undefined;
                translate?: ((str: string, ...args: any[]) => string) | undefined;
            }>, nextState: Readonly<{}>, nextContext: any): void;
        };
        new (props: Pick<ValueProps, "classPrefix" | "data" | "className" | "classnames" | "theme" | "value" | "onChange" | "field" | "op"> & {
            locale?: string | undefined;
            translate?: ((str: string, ...args: any[]) => string) | undefined;
        }, context: any): {
            render(): JSX.Element;
            context: any;
            setState<K_1 extends never>(state: {} | ((prevState: Readonly<{}>, props: Readonly<Pick<ValueProps, "classPrefix" | "data" | "className" | "classnames" | "theme" | "value" | "onChange" | "field" | "op"> & {
                locale?: string | undefined;
                translate?: ((str: string, ...args: any[]) => string) | undefined;
            }>) => {} | Pick<{}, K_1> | null) | Pick<{}, K_1> | null, callback?: (() => void) | undefined): void;
            forceUpdate(callback?: (() => void) | undefined): void;
            readonly props: Readonly<Pick<ValueProps, "classPrefix" | "data" | "className" | "classnames" | "theme" | "value" | "onChange" | "field" | "op"> & {
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
            shouldComponentUpdate?(nextProps: Readonly<Pick<ValueProps, "classPrefix" | "data" | "className" | "classnames" | "theme" | "value" | "onChange" | "field" | "op"> & {
                locale?: string | undefined;
                translate?: ((str: string, ...args: any[]) => string) | undefined;
            }>, nextState: Readonly<{}>, nextContext: any): boolean;
            componentWillUnmount?(): void;
            componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
            getSnapshotBeforeUpdate?(prevProps: Readonly<Pick<ValueProps, "classPrefix" | "data" | "className" | "classnames" | "theme" | "value" | "onChange" | "field" | "op"> & {
                locale?: string | undefined;
                translate?: ((str: string, ...args: any[]) => string) | undefined;
            }>, prevState: Readonly<{}>): any;
            componentDidUpdate?(prevProps: Readonly<Pick<ValueProps, "classPrefix" | "data" | "className" | "classnames" | "theme" | "value" | "onChange" | "field" | "op"> & {
                locale?: string | undefined;
                translate?: ((str: string, ...args: any[]) => string) | undefined;
            }>, prevState: Readonly<{}>, snapshot?: any): void;
            componentWillMount?(): void;
            UNSAFE_componentWillMount?(): void;
            componentWillReceiveProps?(nextProps: Readonly<Pick<ValueProps, "classPrefix" | "data" | "className" | "classnames" | "theme" | "value" | "onChange" | "field" | "op"> & {
                locale?: string | undefined;
                translate?: ((str: string, ...args: any[]) => string) | undefined;
            }>, nextContext: any): void;
            UNSAFE_componentWillReceiveProps?(nextProps: Readonly<Pick<ValueProps, "classPrefix" | "data" | "className" | "classnames" | "theme" | "value" | "onChange" | "field" | "op"> & {
                locale?: string | undefined;
                translate?: ((str: string, ...args: any[]) => string) | undefined;
            }>, nextContext: any): void;
            componentWillUpdate?(nextProps: Readonly<Pick<ValueProps, "classPrefix" | "data" | "className" | "classnames" | "theme" | "value" | "onChange" | "field" | "op"> & {
                locale?: string | undefined;
                translate?: ((str: string, ...args: any[]) => string) | undefined;
            }>, nextState: Readonly<{}>, nextContext: any): void;
            UNSAFE_componentWillUpdate?(nextProps: Readonly<Pick<ValueProps, "classPrefix" | "data" | "className" | "classnames" | "theme" | "value" | "onChange" | "field" | "op"> & {
                locale?: string | undefined;
                translate?: ((str: string, ...args: any[]) => string) | undefined;
            }>, nextState: Readonly<{}>, nextContext: any): void;
        };
        displayName: string;
        contextType: React.Context<string>;
        ComposedComponent: typeof Value;
    } & import("hoist-non-react-statics").NonReactStatics<typeof Value, {}> & {
        ComposedComponent: typeof Value;
    };
};
export default _default;
