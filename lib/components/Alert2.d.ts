/**
 * @file Alert2
 * @author fex
 */
/// <reference types="hoist-non-react-statics" />
import React from 'react';
import { ClassNamesFn } from '../theme';
export interface AlertProps {
    level: 'danger' | 'info' | 'success' | 'warning';
    className: string;
    showCloseButton: boolean;
    onClose?: () => void;
    classnames: ClassNamesFn;
    classPrefix: string;
}
export interface AlertState {
    show: boolean;
}
export declare class Alert extends React.Component<AlertProps, AlertState> {
    static defaultProps: Pick<AlertProps, 'level' | 'className' | 'showCloseButton'>;
    static propsList: Array<string>;
    constructor(props: AlertProps);
    handleClick(): void;
    render(): JSX.Element | null;
}
declare const _default: {
    new (props: (Pick<Pick<AlertProps, "level" | "showCloseButton" | "onClose">, "onClose"> & Partial<Pick<Pick<AlertProps, "level" | "showCloseButton" | "onClose">, "level" | "showCloseButton">> & Partial<Pick<Pick<AlertProps, "className" | "level" | "showCloseButton">, "className">> & import("../theme").ThemeOutterProps) | Readonly<Pick<Pick<AlertProps, "level" | "showCloseButton" | "onClose">, "onClose"> & Partial<Pick<Pick<AlertProps, "level" | "showCloseButton" | "onClose">, "level" | "showCloseButton">> & Partial<Pick<Pick<AlertProps, "className" | "level" | "showCloseButton">, "className">> & import("../theme").ThemeOutterProps>): {
        render(): JSX.Element;
        context: any;
        setState<K extends never>(state: {} | ((prevState: Readonly<{}>, props: Readonly<Pick<Pick<AlertProps, "level" | "showCloseButton" | "onClose">, "onClose"> & Partial<Pick<Pick<AlertProps, "level" | "showCloseButton" | "onClose">, "level" | "showCloseButton">> & Partial<Pick<Pick<AlertProps, "className" | "level" | "showCloseButton">, "className">> & import("../theme").ThemeOutterProps>) => {} | Pick<{}, K> | null) | Pick<{}, K> | null, callback?: (() => void) | undefined): void;
        forceUpdate(callback?: (() => void) | undefined): void;
        readonly props: Readonly<Pick<Pick<AlertProps, "level" | "showCloseButton" | "onClose">, "onClose"> & Partial<Pick<Pick<AlertProps, "level" | "showCloseButton" | "onClose">, "level" | "showCloseButton">> & Partial<Pick<Pick<AlertProps, "className" | "level" | "showCloseButton">, "className">> & import("../theme").ThemeOutterProps> & Readonly<{
            children?: React.ReactNode;
        }>;
        state: Readonly<{}>;
        refs: {
            [key: string]: React.ReactInstance;
        };
        componentDidMount?(): void;
        shouldComponentUpdate?(nextProps: Readonly<Pick<Pick<AlertProps, "level" | "showCloseButton" | "onClose">, "onClose"> & Partial<Pick<Pick<AlertProps, "level" | "showCloseButton" | "onClose">, "level" | "showCloseButton">> & Partial<Pick<Pick<AlertProps, "className" | "level" | "showCloseButton">, "className">> & import("../theme").ThemeOutterProps>, nextState: Readonly<{}>, nextContext: any): boolean;
        componentWillUnmount?(): void;
        componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<Pick<Pick<AlertProps, "level" | "showCloseButton" | "onClose">, "onClose"> & Partial<Pick<Pick<AlertProps, "level" | "showCloseButton" | "onClose">, "level" | "showCloseButton">> & Partial<Pick<Pick<AlertProps, "className" | "level" | "showCloseButton">, "className">> & import("../theme").ThemeOutterProps>, prevState: Readonly<{}>): any;
        componentDidUpdate?(prevProps: Readonly<Pick<Pick<AlertProps, "level" | "showCloseButton" | "onClose">, "onClose"> & Partial<Pick<Pick<AlertProps, "level" | "showCloseButton" | "onClose">, "level" | "showCloseButton">> & Partial<Pick<Pick<AlertProps, "className" | "level" | "showCloseButton">, "className">> & import("../theme").ThemeOutterProps>, prevState: Readonly<{}>, snapshot?: any): void;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<Pick<Pick<AlertProps, "level" | "showCloseButton" | "onClose">, "onClose"> & Partial<Pick<Pick<AlertProps, "level" | "showCloseButton" | "onClose">, "level" | "showCloseButton">> & Partial<Pick<Pick<AlertProps, "className" | "level" | "showCloseButton">, "className">> & import("../theme").ThemeOutterProps>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<Pick<Pick<AlertProps, "level" | "showCloseButton" | "onClose">, "onClose"> & Partial<Pick<Pick<AlertProps, "level" | "showCloseButton" | "onClose">, "level" | "showCloseButton">> & Partial<Pick<Pick<AlertProps, "className" | "level" | "showCloseButton">, "className">> & import("../theme").ThemeOutterProps>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<Pick<Pick<AlertProps, "level" | "showCloseButton" | "onClose">, "onClose"> & Partial<Pick<Pick<AlertProps, "level" | "showCloseButton" | "onClose">, "level" | "showCloseButton">> & Partial<Pick<Pick<AlertProps, "className" | "level" | "showCloseButton">, "className">> & import("../theme").ThemeOutterProps>, nextState: Readonly<{}>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<Pick<Pick<AlertProps, "level" | "showCloseButton" | "onClose">, "onClose"> & Partial<Pick<Pick<AlertProps, "level" | "showCloseButton" | "onClose">, "level" | "showCloseButton">> & Partial<Pick<Pick<AlertProps, "className" | "level" | "showCloseButton">, "className">> & import("../theme").ThemeOutterProps>, nextState: Readonly<{}>, nextContext: any): void;
    };
    new (props: Pick<Pick<AlertProps, "level" | "showCloseButton" | "onClose">, "onClose"> & Partial<Pick<Pick<AlertProps, "level" | "showCloseButton" | "onClose">, "level" | "showCloseButton">> & Partial<Pick<Pick<AlertProps, "className" | "level" | "showCloseButton">, "className">> & import("../theme").ThemeOutterProps, context: any): {
        render(): JSX.Element;
        context: any;
        setState<K extends never>(state: {} | ((prevState: Readonly<{}>, props: Readonly<Pick<Pick<AlertProps, "level" | "showCloseButton" | "onClose">, "onClose"> & Partial<Pick<Pick<AlertProps, "level" | "showCloseButton" | "onClose">, "level" | "showCloseButton">> & Partial<Pick<Pick<AlertProps, "className" | "level" | "showCloseButton">, "className">> & import("../theme").ThemeOutterProps>) => {} | Pick<{}, K> | null) | Pick<{}, K> | null, callback?: (() => void) | undefined): void;
        forceUpdate(callback?: (() => void) | undefined): void;
        readonly props: Readonly<Pick<Pick<AlertProps, "level" | "showCloseButton" | "onClose">, "onClose"> & Partial<Pick<Pick<AlertProps, "level" | "showCloseButton" | "onClose">, "level" | "showCloseButton">> & Partial<Pick<Pick<AlertProps, "className" | "level" | "showCloseButton">, "className">> & import("../theme").ThemeOutterProps> & Readonly<{
            children?: React.ReactNode;
        }>;
        state: Readonly<{}>;
        refs: {
            [key: string]: React.ReactInstance;
        };
        componentDidMount?(): void;
        shouldComponentUpdate?(nextProps: Readonly<Pick<Pick<AlertProps, "level" | "showCloseButton" | "onClose">, "onClose"> & Partial<Pick<Pick<AlertProps, "level" | "showCloseButton" | "onClose">, "level" | "showCloseButton">> & Partial<Pick<Pick<AlertProps, "className" | "level" | "showCloseButton">, "className">> & import("../theme").ThemeOutterProps>, nextState: Readonly<{}>, nextContext: any): boolean;
        componentWillUnmount?(): void;
        componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<Pick<Pick<AlertProps, "level" | "showCloseButton" | "onClose">, "onClose"> & Partial<Pick<Pick<AlertProps, "level" | "showCloseButton" | "onClose">, "level" | "showCloseButton">> & Partial<Pick<Pick<AlertProps, "className" | "level" | "showCloseButton">, "className">> & import("../theme").ThemeOutterProps>, prevState: Readonly<{}>): any;
        componentDidUpdate?(prevProps: Readonly<Pick<Pick<AlertProps, "level" | "showCloseButton" | "onClose">, "onClose"> & Partial<Pick<Pick<AlertProps, "level" | "showCloseButton" | "onClose">, "level" | "showCloseButton">> & Partial<Pick<Pick<AlertProps, "className" | "level" | "showCloseButton">, "className">> & import("../theme").ThemeOutterProps>, prevState: Readonly<{}>, snapshot?: any): void;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<Pick<Pick<AlertProps, "level" | "showCloseButton" | "onClose">, "onClose"> & Partial<Pick<Pick<AlertProps, "level" | "showCloseButton" | "onClose">, "level" | "showCloseButton">> & Partial<Pick<Pick<AlertProps, "className" | "level" | "showCloseButton">, "className">> & import("../theme").ThemeOutterProps>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<Pick<Pick<AlertProps, "level" | "showCloseButton" | "onClose">, "onClose"> & Partial<Pick<Pick<AlertProps, "level" | "showCloseButton" | "onClose">, "level" | "showCloseButton">> & Partial<Pick<Pick<AlertProps, "className" | "level" | "showCloseButton">, "className">> & import("../theme").ThemeOutterProps>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<Pick<Pick<AlertProps, "level" | "showCloseButton" | "onClose">, "onClose"> & Partial<Pick<Pick<AlertProps, "level" | "showCloseButton" | "onClose">, "level" | "showCloseButton">> & Partial<Pick<Pick<AlertProps, "className" | "level" | "showCloseButton">, "className">> & import("../theme").ThemeOutterProps>, nextState: Readonly<{}>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<Pick<Pick<AlertProps, "level" | "showCloseButton" | "onClose">, "onClose"> & Partial<Pick<Pick<AlertProps, "level" | "showCloseButton" | "onClose">, "level" | "showCloseButton">> & Partial<Pick<Pick<AlertProps, "className" | "level" | "showCloseButton">, "className">> & import("../theme").ThemeOutterProps>, nextState: Readonly<{}>, nextContext: any): void;
    };
    displayName: string;
    contextType: React.Context<string>;
    ComposedComponent: typeof Alert;
} & import("hoist-non-react-statics").NonReactStatics<typeof Alert, {}> & {
    ComposedComponent: typeof Alert;
};
export default _default;
