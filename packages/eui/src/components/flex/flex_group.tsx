/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  ComponentPropsWithoutRef,
  ElementType,
  ForwardedRef,
  forwardRef,
  FunctionComponent,
  PropsWithChildren,
  ReactElement,
  Ref,
} from 'react';
import classNames from 'classnames';
import { CommonProps } from '../common';

import { useEuiMemoizedStyles } from '../../services';
import { euiFlexGroupStyles } from './flex_group.styles';

export const GUTTER_SIZES = ['none', 'xs', 's', 'm', 'l', 'xl'] as const;
export type EuiFlexGroupGutterSize = (typeof GUTTER_SIZES)[number];

export const ALIGN_ITEMS = [
  'stretch',
  'flexStart',
  'flexEnd',
  'center',
  'baseline',
] as const;
export type FlexGroupAlignItems = (typeof ALIGN_ITEMS)[number];

export const JUSTIFY_CONTENTS = [
  'flexStart',
  'flexEnd',
  'center',
  'spaceBetween',
  'spaceAround',
  'spaceEvenly',
] as const;
type FlexGroupJustifyContent = (typeof JUSTIFY_CONTENTS)[number];

export const DIRECTIONS = [
  'row',
  'rowReverse',
  'column',
  'columnReverse',
] as const;
type FlexGroupDirection = (typeof DIRECTIONS)[number];

export type EuiFlexGroupProps<TComponent extends ElementType = 'div'> =
  PropsWithChildren &
    CommonProps &
    ComponentPropsWithoutRef<TComponent> & {
      alignItems?: FlexGroupAlignItems;
      /**
       * Customize the component type that is rendered.
       *
       * It can be any valid React component type like a tag name string
       * such as `'div'` or `'span'`, a React component (a function, a class,
       * or an exotic component like `memo()`).
       *
       * `EuiFlexGroup` accepts and forwards all extra props to the custom
       * component.
       *
       * @default "div"
       */
      component?: TComponent;
      direction?: FlexGroupDirection;
      gutterSize?: EuiFlexGroupGutterSize;
      justifyContent?: FlexGroupJustifyContent;
      responsive?: boolean;
      wrap?: boolean;
    };

const EuiFlexGroupInternal = <TComponent extends ElementType>(
  {
    className,
    component = 'div' as TComponent,
    gutterSize = 'm',
    alignItems = 'stretch',
    responsive = true,
    justifyContent = 'flexStart',
    direction = 'row',
    wrap = false,
    ...rest
  }: EuiFlexGroupProps<TComponent>,
  ref: ForwardedRef<TComponent>
): ReactElement<EuiFlexGroupProps<TComponent>, TComponent> => {
  const styles = useEuiMemoizedStyles(euiFlexGroupStyles);
  const cssStyles = [
    styles.euiFlexGroup,
    responsive && !direction.includes('column') && styles.responsive,
    wrap && styles.wrap,
    styles.gutterSizes[gutterSize],
    styles.justifyContent[justifyContent],
    styles.alignItems[alignItems],
    styles.direction[direction],
  ];

  const classes = classNames('euiFlexGroup', className);

  // Cast `component` to FunctionComponent to simplify its type.
  // Note that FunctionComponent type is used here for purely typing
  // convenience since we specify the return type above, and function
  // components don't support `ref`s, but that doesn't matter in this case.
  const Component = component as FunctionComponent<CommonProps & typeof rest>;

  return <Component {...rest} ref={ref} className={classes} css={cssStyles} />;
};

// Cast forwardRef return type to work with the generic TComponent type
// and not fallback to implicit any typing
export const EuiFlexGroup = forwardRef(EuiFlexGroupInternal) as (<
  TComponent extends ElementType = 'div',
  TComponentRef = ReactElement<any, TComponent>
>(
  props: EuiFlexGroupProps<TComponent> & {
    ref?: Ref<TComponentRef>;
  }
) => ReactElement) & { displayName?: string };

EuiFlexGroup.displayName = 'EuiFlexGroup';
