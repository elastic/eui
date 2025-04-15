/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, HTMLAttributes, ReactNode } from 'react';
import classNames from 'classnames';

import { useEuiMemoizedStyles } from '../../services';
import { CommonProps, ExclusiveUnion } from '../common';
import {
  EuiFormLabel,
  _EuiFormLegendProps,
} from '../form/form_label/form_label';

import { euiKeyPadMenuStyles } from './key_pad_menu.styles';

export type _EuiKeyPadMenuCheckableProps = ExclusiveUnion<
  {
    /**
     * Rendered within a `legend` to label the `fieldset`.
     * To create a visually hidden legend, use `ariaLegend`
     */
    legend: ReactNode;
    /**
     * Pass through props to a `EuiFormLabel` component, except for `type`
     */
    legendProps?: Omit<_EuiFormLegendProps, 'type'>;
  },
  {
    /**
     * Custom aria-attribute for creating a *visually hidden* legend.
     * To create a visible legend, use `legend`
     */
    ariaLegend: string;
  }
>;

export type EuiKeyPadMenuProps = CommonProps &
  HTMLAttributes<HTMLElement> & {
    /**
     * Renders the the group as a `fieldset`.
     * Set to `true` to customize the labelling, or pass an #_EuiKeyPadMenuCheckableProps object to add a `legend` or `ariaLegend`
     */
    checkable?: _EuiKeyPadMenuCheckableProps | true;
  };

export const EuiKeyPadMenu: FunctionComponent<EuiKeyPadMenuProps> = ({
  children,
  className,
  checkable,
  ...rest
}) => {
  const hasCheckableConfig = typeof checkable === 'object';

  const classes = classNames('euiKeyPadMenu', className);

  const styles = useEuiMemoizedStyles(euiKeyPadMenuStyles);
  const cssStyles = [styles.euiKeyPadMenu];
  const legendCssStyles = [
    styles.euiKeyPadMenu__legend,
    hasCheckableConfig && checkable?.legendProps?.css,
  ];

  const legend =
    hasCheckableConfig && checkable.legend ? (
      <EuiFormLabel
        {...checkable.legendProps}
        css={legendCssStyles}
        type="legend"
      >
        {checkable.legend}
      </EuiFormLabel>
    ) : undefined;

  return checkable ? (
    <fieldset
      css={cssStyles}
      className={classes}
      aria-label={hasCheckableConfig ? checkable.ariaLegend : undefined}
      {...rest}
    >
      {legend}
      {children}
    </fieldset>
  ) : (
    <ul css={cssStyles} className={classes} {...rest}>
      {React.Children.map(children, (child) => (
        <li>{child}</li>
      ))}
    </ul>
  );
};
