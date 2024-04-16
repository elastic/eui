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
  ComponentType,
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

type ComponentPropType = ElementType<CommonProps>;

export type EuiFlexItemProps<TComponent extends ComponentPropType> =
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
       * `<EuiFlexGroup>` accepts and forwards all extra props to the custom
       * component.
       *
       * @example
       * // Renders a <button> element
       * <EuiFlexGroup component="button">
       *   Submit form
       * </EuiFlexGroup>
       * @default "div"
       */
      component?: TComponent;
    };

export const EuiFlexItem = <TComponent extends ComponentPropType>({
  children,
  className,
  grow = true,
  component = 'div' as TComponent,
  ...rest
}: EuiFlexItemProps<TComponent>) => {
  useEffect(() => {
    if (VALID_GROW_VALUES.indexOf(grow) === -1) {
      throw new Error(
        `Prop \`grow\` passed to \`EuiFlexItem\` must be a boolean or an integer between 0 and 10, received \`${grow}\``
      );
    }
  }, [grow]);

  const cssStyles = [
    styles.euiFlexItem,
    !grow ? styles.growZero : styles.grow,
    grow &&
      (typeof grow === 'number'
        ? styles.growSizes[grow]
        : styles.growSizes['1']),
  ];

  const classes = classNames('euiFlexItem', className);

  // Cast the resolved component prop type to ComponentType to help TS
  // process multiple infers and the overall type complexity.
  // This might not be needed in TypeScript 5
  const Component = component as ComponentType<CommonProps & typeof rest>;

  return (
    <Component css={cssStyles} className={classes} {...rest}>
      {children}
    </Component>
  );
};
