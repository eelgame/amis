/// <reference types="hoist-non-react-statics" />
import { Config } from './config';
import { Fields, ConditionGroupValue, Funcs } from './types';
import { ThemeProps } from '../../theme';
import React from 'react';
export interface CBGroupOrItemProps extends ThemeProps {
    config: Config;
    value?: ConditionGroupValue;
    fields: Fields;
    funcs?: Funcs;
    index: number;
    data?: any;
    draggable?: boolean;
    onChange: (value: ConditionGroupValue, index: number) => void;
    removeable?: boolean;
    onDragStart?: (e: React.MouseEvent) => void;
    onRemove?: (index: number) => void;
}
export declare class CBGroupOrItem extends React.Component<CBGroupOrItemProps> {
    handleItemChange(value: any): void;
    handleItemRemove(): void;
    render(): JSX.Element;
}
declare const _default: {
    new (props: (Pick<CBGroupOrItemProps, "data" | "value" | "index" | "draggable" | "onChange" | "onDragStart" | "config" | "fields" | "funcs" | "removeable" | "onRemove"> & import("../../theme").ThemeOutterProps) | Readonly<Pick<CBGroupOrItemProps, "data" | "value" | "index" | "draggable" | "onChange" | "onDragStart" | "config" | "fields" | "funcs" | "removeable" | "onRemove"> & import("../../theme").ThemeOutterProps>): {
        render(): JSX.Element;
        context: any;
        setState<K extends never>(state: {} | ((prevState: Readonly<{}>, props: Readonly<Pick<CBGroupOrItemProps, "data" | "value" | "index" | "draggable" | "onChange" | "onDragStart" | "config" | "fields" | "funcs" | "removeable" | "onRemove"> & import("../../theme").ThemeOutterProps>) => {} | Pick<{}, K> | null) | Pick<{}, K> | null, callback?: (() => void) | undefined): void;
        forceUpdate(callback?: (() => void) | undefined): void;
        readonly props: Readonly<Pick<CBGroupOrItemProps, "data" | "value" | "index" | "draggable" | "onChange" | "onDragStart" | "config" | "fields" | "funcs" | "removeable" | "onRemove"> & import("../../theme").ThemeOutterProps> & Readonly<{
            children?: React.ReactNode;
        }>;
        state: Readonly<{}>;
        refs: {
            [key: string]: React.ReactInstance;
        };
        componentDidMount?(): void;
        shouldComponentUpdate?(nextProps: Readonly<Pick<CBGroupOrItemProps, "data" | "value" | "index" | "draggable" | "onChange" | "onDragStart" | "config" | "fields" | "funcs" | "removeable" | "onRemove"> & import("../../theme").ThemeOutterProps>, nextState: Readonly<{}>, nextContext: any): boolean;
        componentWillUnmount?(): void;
        componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<Pick<CBGroupOrItemProps, "data" | "value" | "index" | "draggable" | "onChange" | "onDragStart" | "config" | "fields" | "funcs" | "removeable" | "onRemove"> & import("../../theme").ThemeOutterProps>, prevState: Readonly<{}>): any;
        componentDidUpdate?(prevProps: Readonly<Pick<CBGroupOrItemProps, "data" | "value" | "index" | "draggable" | "onChange" | "onDragStart" | "config" | "fields" | "funcs" | "removeable" | "onRemove"> & import("../../theme").ThemeOutterProps>, prevState: Readonly<{}>, snapshot?: any): void;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<Pick<CBGroupOrItemProps, "data" | "value" | "index" | "draggable" | "onChange" | "onDragStart" | "config" | "fields" | "funcs" | "removeable" | "onRemove"> & import("../../theme").ThemeOutterProps>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<Pick<CBGroupOrItemProps, "data" | "value" | "index" | "draggable" | "onChange" | "onDragStart" | "config" | "fields" | "funcs" | "removeable" | "onRemove"> & import("../../theme").ThemeOutterProps>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<Pick<CBGroupOrItemProps, "data" | "value" | "index" | "draggable" | "onChange" | "onDragStart" | "config" | "fields" | "funcs" | "removeable" | "onRemove"> & import("../../theme").ThemeOutterProps>, nextState: Readonly<{}>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<Pick<CBGroupOrItemProps, "data" | "value" | "index" | "draggable" | "onChange" | "onDragStart" | "config" | "fields" | "funcs" | "removeable" | "onRemove"> & import("../../theme").ThemeOutterProps>, nextState: Readonly<{}>, nextContext: any): void;
    };
    new (props: Pick<CBGroupOrItemProps, "data" | "value" | "index" | "draggable" | "onChange" | "onDragStart" | "config" | "fields" | "funcs" | "removeable" | "onRemove"> & import("../../theme").ThemeOutterProps, context: any): {
        render(): JSX.Element;
        context: any;
        setState<K extends never>(state: {} | ((prevState: Readonly<{}>, props: Readonly<Pick<CBGroupOrItemProps, "data" | "value" | "index" | "draggable" | "onChange" | "onDragStart" | "config" | "fields" | "funcs" | "removeable" | "onRemove"> & import("../../theme").ThemeOutterProps>) => {} | Pick<{}, K> | null) | Pick<{}, K> | null, callback?: (() => void) | undefined): void;
        forceUpdate(callback?: (() => void) | undefined): void;
        readonly props: Readonly<Pick<CBGroupOrItemProps, "data" | "value" | "index" | "draggable" | "onChange" | "onDragStart" | "config" | "fields" | "funcs" | "removeable" | "onRemove"> & import("../../theme").ThemeOutterProps> & Readonly<{
            children?: React.ReactNode;
        }>;
        state: Readonly<{}>;
        refs: {
            [key: string]: React.ReactInstance;
        };
        componentDidMount?(): void;
        shouldComponentUpdate?(nextProps: Readonly<Pick<CBGroupOrItemProps, "data" | "value" | "index" | "draggable" | "onChange" | "onDragStart" | "config" | "fields" | "funcs" | "removeable" | "onRemove"> & import("../../theme").ThemeOutterProps>, nextState: Readonly<{}>, nextContext: any): boolean;
        componentWillUnmount?(): void;
        componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<Pick<CBGroupOrItemProps, "data" | "value" | "index" | "draggable" | "onChange" | "onDragStart" | "config" | "fields" | "funcs" | "removeable" | "onRemove"> & import("../../theme").ThemeOutterProps>, prevState: Readonly<{}>): any;
        componentDidUpdate?(prevProps: Readonly<Pick<CBGroupOrItemProps, "data" | "value" | "index" | "draggable" | "onChange" | "onDragStart" | "config" | "fields" | "funcs" | "removeable" | "onRemove"> & import("../../theme").ThemeOutterProps>, prevState: Readonly<{}>, snapshot?: any): void;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<Pick<CBGroupOrItemProps, "data" | "value" | "index" | "draggable" | "onChange" | "onDragStart" | "config" | "fields" | "funcs" | "removeable" | "onRemove"> & import("../../theme").ThemeOutterProps>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<Pick<CBGroupOrItemProps, "data" | "value" | "index" | "draggable" | "onChange" | "onDragStart" | "config" | "fields" | "funcs" | "removeable" | "onRemove"> & import("../../theme").ThemeOutterProps>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<Pick<CBGroupOrItemProps, "data" | "value" | "index" | "draggable" | "onChange" | "onDragStart" | "config" | "fields" | "funcs" | "removeable" | "onRemove"> & import("../../theme").ThemeOutterProps>, nextState: Readonly<{}>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<Pick<CBGroupOrItemProps, "data" | "value" | "index" | "draggable" | "onChange" | "onDragStart" | "config" | "fields" | "funcs" | "removeable" | "onRemove"> & import("../../theme").ThemeOutterProps>, nextState: Readonly<{}>, nextContext: any): void;
    };
    displayName: string;
    contextType: React.Context<string>;
    ComposedComponent: typeof CBGroupOrItem;
} & import("hoist-non-react-statics").NonReactStatics<typeof CBGroupOrItem, {}> & {
    ComposedComponent: typeof CBGroupOrItem;
};
export default _default;
