/// <reference types="hoist-non-react-statics" />
import React from 'react';
import { Fields, ConditionGroupValue, Funcs } from './types';
import { ThemeProps } from '../../theme';
import { Config } from './config';
export interface ConditionGroupProps extends ThemeProps {
    config: Config;
    value?: ConditionGroupValue;
    fields: Fields;
    funcs?: Funcs;
    showNot?: boolean;
    data?: any;
    onChange: (value: ConditionGroupValue) => void;
    removeable?: boolean;
    onRemove?: (e: React.MouseEvent) => void;
    onDragStart?: (e: React.MouseEvent) => void;
}
export declare class ConditionGroup extends React.Component<ConditionGroupProps> {
    getValue(): ConditionGroupValue;
    handleNotClick(): void;
    handleConjunctionClick(): void;
    handleAdd(): void;
    handleAddGroup(): void;
    handleItemChange(item: any, index: number): void;
    handleItemRemove(index: number): void;
    render(): JSX.Element;
}
declare const _default: {
    new (props: (Pick<ConditionGroupProps, "data" | "value" | "onChange" | "onDragStart" | "config" | "fields" | "funcs" | "removeable" | "onRemove" | "showNot"> & import("../../theme").ThemeOutterProps) | Readonly<Pick<ConditionGroupProps, "data" | "value" | "onChange" | "onDragStart" | "config" | "fields" | "funcs" | "removeable" | "onRemove" | "showNot"> & import("../../theme").ThemeOutterProps>): {
        render(): JSX.Element;
        context: any;
        setState<K extends never>(state: {} | ((prevState: Readonly<{}>, props: Readonly<Pick<ConditionGroupProps, "data" | "value" | "onChange" | "onDragStart" | "config" | "fields" | "funcs" | "removeable" | "onRemove" | "showNot"> & import("../../theme").ThemeOutterProps>) => {} | Pick<{}, K> | null) | Pick<{}, K> | null, callback?: (() => void) | undefined): void;
        forceUpdate(callback?: (() => void) | undefined): void;
        readonly props: Readonly<Pick<ConditionGroupProps, "data" | "value" | "onChange" | "onDragStart" | "config" | "fields" | "funcs" | "removeable" | "onRemove" | "showNot"> & import("../../theme").ThemeOutterProps> & Readonly<{
            children?: React.ReactNode;
        }>;
        state: Readonly<{}>;
        refs: {
            [key: string]: React.ReactInstance;
        };
        componentDidMount?(): void;
        shouldComponentUpdate?(nextProps: Readonly<Pick<ConditionGroupProps, "data" | "value" | "onChange" | "onDragStart" | "config" | "fields" | "funcs" | "removeable" | "onRemove" | "showNot"> & import("../../theme").ThemeOutterProps>, nextState: Readonly<{}>, nextContext: any): boolean;
        componentWillUnmount?(): void;
        componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<Pick<ConditionGroupProps, "data" | "value" | "onChange" | "onDragStart" | "config" | "fields" | "funcs" | "removeable" | "onRemove" | "showNot"> & import("../../theme").ThemeOutterProps>, prevState: Readonly<{}>): any;
        componentDidUpdate?(prevProps: Readonly<Pick<ConditionGroupProps, "data" | "value" | "onChange" | "onDragStart" | "config" | "fields" | "funcs" | "removeable" | "onRemove" | "showNot"> & import("../../theme").ThemeOutterProps>, prevState: Readonly<{}>, snapshot?: any): void;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<Pick<ConditionGroupProps, "data" | "value" | "onChange" | "onDragStart" | "config" | "fields" | "funcs" | "removeable" | "onRemove" | "showNot"> & import("../../theme").ThemeOutterProps>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<Pick<ConditionGroupProps, "data" | "value" | "onChange" | "onDragStart" | "config" | "fields" | "funcs" | "removeable" | "onRemove" | "showNot"> & import("../../theme").ThemeOutterProps>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<Pick<ConditionGroupProps, "data" | "value" | "onChange" | "onDragStart" | "config" | "fields" | "funcs" | "removeable" | "onRemove" | "showNot"> & import("../../theme").ThemeOutterProps>, nextState: Readonly<{}>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<Pick<ConditionGroupProps, "data" | "value" | "onChange" | "onDragStart" | "config" | "fields" | "funcs" | "removeable" | "onRemove" | "showNot"> & import("../../theme").ThemeOutterProps>, nextState: Readonly<{}>, nextContext: any): void;
    };
    new (props: Pick<ConditionGroupProps, "data" | "value" | "onChange" | "onDragStart" | "config" | "fields" | "funcs" | "removeable" | "onRemove" | "showNot"> & import("../../theme").ThemeOutterProps, context: any): {
        render(): JSX.Element;
        context: any;
        setState<K extends never>(state: {} | ((prevState: Readonly<{}>, props: Readonly<Pick<ConditionGroupProps, "data" | "value" | "onChange" | "onDragStart" | "config" | "fields" | "funcs" | "removeable" | "onRemove" | "showNot"> & import("../../theme").ThemeOutterProps>) => {} | Pick<{}, K> | null) | Pick<{}, K> | null, callback?: (() => void) | undefined): void;
        forceUpdate(callback?: (() => void) | undefined): void;
        readonly props: Readonly<Pick<ConditionGroupProps, "data" | "value" | "onChange" | "onDragStart" | "config" | "fields" | "funcs" | "removeable" | "onRemove" | "showNot"> & import("../../theme").ThemeOutterProps> & Readonly<{
            children?: React.ReactNode;
        }>;
        state: Readonly<{}>;
        refs: {
            [key: string]: React.ReactInstance;
        };
        componentDidMount?(): void;
        shouldComponentUpdate?(nextProps: Readonly<Pick<ConditionGroupProps, "data" | "value" | "onChange" | "onDragStart" | "config" | "fields" | "funcs" | "removeable" | "onRemove" | "showNot"> & import("../../theme").ThemeOutterProps>, nextState: Readonly<{}>, nextContext: any): boolean;
        componentWillUnmount?(): void;
        componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<Pick<ConditionGroupProps, "data" | "value" | "onChange" | "onDragStart" | "config" | "fields" | "funcs" | "removeable" | "onRemove" | "showNot"> & import("../../theme").ThemeOutterProps>, prevState: Readonly<{}>): any;
        componentDidUpdate?(prevProps: Readonly<Pick<ConditionGroupProps, "data" | "value" | "onChange" | "onDragStart" | "config" | "fields" | "funcs" | "removeable" | "onRemove" | "showNot"> & import("../../theme").ThemeOutterProps>, prevState: Readonly<{}>, snapshot?: any): void;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<Pick<ConditionGroupProps, "data" | "value" | "onChange" | "onDragStart" | "config" | "fields" | "funcs" | "removeable" | "onRemove" | "showNot"> & import("../../theme").ThemeOutterProps>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<Pick<ConditionGroupProps, "data" | "value" | "onChange" | "onDragStart" | "config" | "fields" | "funcs" | "removeable" | "onRemove" | "showNot"> & import("../../theme").ThemeOutterProps>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<Pick<ConditionGroupProps, "data" | "value" | "onChange" | "onDragStart" | "config" | "fields" | "funcs" | "removeable" | "onRemove" | "showNot"> & import("../../theme").ThemeOutterProps>, nextState: Readonly<{}>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<Pick<ConditionGroupProps, "data" | "value" | "onChange" | "onDragStart" | "config" | "fields" | "funcs" | "removeable" | "onRemove" | "showNot"> & import("../../theme").ThemeOutterProps>, nextState: Readonly<{}>, nextContext: any): void;
    };
    displayName: string;
    contextType: React.Context<string>;
    ComposedComponent: typeof ConditionGroup;
} & import("hoist-non-react-statics").NonReactStatics<typeof ConditionGroup, {}> & {
    ComposedComponent: typeof ConditionGroup;
};
export default _default;
