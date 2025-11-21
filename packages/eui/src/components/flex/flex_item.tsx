/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  ElementType,
  useEffect,
  ComponentPropsWithoutRef,
  PropsWithChildren,
  ForwardedRef,
  forwardRef,
  Ref,
  ReactElement,
  FunctionComponent,
} from 'react';
import classNames from 'classnames';
import { CommonProps } from '../common';

import { euiFlexItemStyles as styles } from './flex_item.styles';

const VALID_GROW_VALUES = [
  null,
  undefined,
  true,
  false,
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
] as const;

export type EuiFlexItemProps<TComponent extends ElementType = 'div'> =
  PropsWithChildren &
    CommonProps &
    ComponentPropsWithoutRef<TComponent> & {
      grow?: boolean | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | null; // Leave this as an inline string enum so the props table properly parses it
      /**
       * Customize the component type that is rendered.
       *
       * It can be any valid React component type like a tag name string
       * such as `'div'` or `'span'`, a React component (a function, a class,
       * or an exotic component like `memo()`).
       *
       * `<EuiFlexItem>` accepts and forwards all extra props to the custom
       * component.
       *
       * @example
       * // Renders a <button> element
       * <EuiFlexItem component="button">
       *   Submit form
       * </EuiFlexItem>
       * @default "div"
       */
      component?: TComponent;
    };

const EuiFlexItemInternal = <TComponent extends ElementType>(
  {
    children,
    className,
    grow: _grow = true,
    component = 'div' as TComponent,
    ...rest
  }: EuiFlexItemProps<TComponent>,
  ref: ForwardedRef<TComponent>
): ReactElement<EuiFlexItemProps<TComponent>, TComponent> => {
  // resets `grow` to the default value when an invalid value is passed
  const grow = VALID_GROW_VALUES.indexOf(_grow) === -1 ? true : _grow;

  useEffect(() => {
    if (
      process.env.NODE_ENV === 'development' &&
      VALID_GROW_VALUES.indexOf(_grow) === -1
    ) {
      console.warn(
        `Prop \`grow\` passed to \`EuiFlexItem\` must be a boolean or an integer between 0 and 10, received \`${_grow}\`. Defaulting to \`true\`.`
      );
    }
  }, [_grow]);

  const cssStyles = [
    styles.euiFlexItem,
    !grow ? styles.growZero : styles.grow,
    grow &&
      (typeof grow === 'number'
        ? styles.growSizes[grow]
        : styles.growSizes['1']),
  ];

  const classes = classNames('euiFlexItem', className);

  // Cast `component` to FunctionComponent to simplify its type.
  // Note that FunctionComponent type is used here for purely typing
  // convenience since we specify the return type above, and function
  // components don't support `ref`s, but that doesn't matter in this case.
  const Component = component as FunctionComponent<CommonProps & typeof rest>;

  return (
    <Component {...rest} ref={ref} css={cssStyles} className={classes}>
      {children}
    </Component>
  );
};

// Cast forwardRef return type to work with the generic TComponent type
// and not fallback to implicit any typing
export const EuiFlexItem = forwardRef(EuiFlexItemInternal) as (<
  TComponent extends ElementType,
  TComponentRef = ReactElement<any, TComponent>
>(
  props: EuiFlexItemProps<TComponent> & {
    ref?: Ref<TComponentRef>;
  }
) => ReactElement) & { displayName?: string };

EuiFlexItem.displayName = 'EuiFlexItem';
