/// <reference types="hoist-non-react-statics" />
import React from 'react';
import { ThemeProps } from '../../theme';
export interface InputSwitchProps extends ThemeProps {
    options: Array<any>;
    value: any;
    onChange: (value: any) => void;
}
export declare function InputSwitch({ options, value, onChange, classnames: cx }: InputSwitchProps): JSX.Element;
declare const _default: {
    new (props: (Pick<InputSwitchProps, "value" | "options" | "onChange"> & import("../../theme").ThemeOutterProps) | Readonly<Pick<InputSwitchProps, "value" | "options" | "onChange"> & import("../../theme").ThemeOutterProps>): {
        render(): JSX.Element;
        context: any;
        setState<K extends never>(state: {} | ((prevState: Readonly<{}>, props: Readonly<Pick<InputSwitchProps, "value" | "options" | "onChange"> & import("../../theme").ThemeOutterProps>) => {} | Pick<{}, K> | null) | Pick<{}, K> | null, callback?: (() => void) | undefined): void;
        forceUpdate(callback?: (() => void) | undefined): void;
        readonly props: Readonly<Pick<InputSwitchProps, "value" | "options" | "onChange"> & import("../../theme").ThemeOutterProps> & Readonly<{
            children?: React.ReactNode;
        }>;
        state: Readonly<{}>;
        refs: {
            [key: string]: React.ReactInstance;
        };
        componentDidMount?(): void;
        shouldComponentUpdate?(nextProps: Readonly<Pick<InputSwitchProps, "value" | "options" | "onChange"> & import("../../theme").ThemeOutterProps>, nextState: Readonly<{}>, nextContext: any): boolean;
        componentWillUnmount?(): void;
        componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<Pick<InputSwitchProps, "value" | "options" | "onChange"> & import("../../theme").ThemeOutterProps>, prevState: Readonly<{}>): any;
        componentDidUpdate?(prevProps: Readonly<Pick<InputSwitchProps, "value" | "options" | "onChange"> & import("../../theme").ThemeOutterProps>, prevState: Readonly<{}>, snapshot?: any): void;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<Pick<InputSwitchProps, "value" | "options" | "onChange"> & import("../../theme").ThemeOutterProps>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<Pick<InputSwitchProps, "value" | "options" | "onChange"> & import("../../theme").ThemeOutterProps>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<Pick<InputSwitchProps, "value" | "options" | "onChange"> & import("../../theme").ThemeOutterProps>, nextState: Readonly<{}>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<Pick<InputSwitchProps, "value" | "options" | "onChange"> & import("../../theme").ThemeOutterProps>, nextState: Readonly<{}>, nextContext: any): void;
    };
    new (props: Pick<InputSwitchProps, "value" | "options" | "onChange"> & import("../../theme").ThemeOutterProps, context: any): {
        render(): JSX.Element;
        context: any;
        setState<K extends never>(state: {} | ((prevState: Readonly<{}>, props: Readonly<Pick<InputSwitchProps, "value" | "options" | "onChange"> & import("../../theme").ThemeOutterProps>) => {} | Pick<{}, K> | null) | Pick<{}, K> | null, callback?: (() => void) | undefined): void;
        forceUpdate(callback?: (() => void) | undefined): void;
        readonly props: Readonly<Pick<InputSwitchProps, "value" | "options" | "onChange"> & import("../../theme").ThemeOutterProps> & Readonly<{
            children?: React.ReactNode;
        }>;
        state: Readonly<{}>;
        refs: {
            [key: string]: React.ReactInstance;
        };
        componentDidMount?(): void;
        shouldComponentUpdate?(nextProps: Readonly<Pick<InputSwitchProps, "value" | "options" | "onChange"> & import("../../theme").ThemeOutterProps>, nextState: Readonly<{}>, nextContext: any): boolean;
        componentWillUnmount?(): void;
        componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<Pick<InputSwitchProps, "value" | "options" | "onChange"> & import("../../theme").ThemeOutterProps>, prevState: Readonly<{}>): any;
        componentDidUpdate?(prevProps: Readonly<Pick<InputSwitchProps, "value" | "options" | "onChange"> & import("../../theme").ThemeOutterProps>, prevState: Readonly<{}>, snapshot?: any): void;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<Pick<InputSwitchProps, "value" | "options" | "onChange"> & import("../../theme").ThemeOutterProps>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<Pick<InputSwitchProps, "value" | "options" | "onChange"> & import("../../theme").ThemeOutterProps>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<Pick<InputSwitchProps, "value" | "options" | "onChange"> & import("../../theme").ThemeOutterProps>, nextState: Readonly<{}>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<Pick<InputSwitchProps, "value" | "options" | "onChange"> & import("../../theme").ThemeOutterProps>, nextState: Readonly<{}>, nextContext: any): void;
    };
    displayName: string;
    contextType: React.Context<string>;
    ComposedComponent: typeof InputSwitch;
} & import("hoist-non-react-statics").NonReactStatics<typeof InputSwitch, {}> & {
    ComposedComponent: typeof InputSwitch;
};
export default _default;
