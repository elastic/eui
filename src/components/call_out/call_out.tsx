/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  forwardRef,
  FunctionComponent,
  HTMLAttributes,
  ReactNode,
} from 'react';

import classNames from 'classnames';

import { CommonProps } from '../common';
import { IconType, EuiIcon } from '../icon';

import { EuiButtonIcon } from '../button';
import { EuiText } from '../text';
import { useEuiTheme } from '../../services';
import { EuiPanel } from '../panel';
import { EuiTitle } from '../title';
import { EuiI18n } from '../i18n';

import { euiCallOutStyles, euiCallOutHeadingStyles } from './call_out.styles';

export const COLORS = ['primary', 'success', 'warning', 'danger'] as const;
export type Color = (typeof COLORS)[number];

export const HEADINGS = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p'] as const;
type Heading = (typeof HEADINGS)[number];

type Size = 's' | 'm';

export type EuiCallOutProps = CommonProps &
  Omit<HTMLAttributes<HTMLDivElement>, 'title' | 'color'> & {
    title?: ReactNode;
    iconType?: IconType;
    color?: Color;
    size?: Size;
    heading?: Heading;
    onClose?: (
      event?:
        | React.KeyboardEvent<HTMLDivElement>
        | React.MouseEvent<HTMLButtonElement>
    ) => void;
    isDismissible?: boolean;
  };

type CallOutHeaderProps = {
  title?: ReactNode;
  headerIcon?: ReactNode;
  heading: Heading;
  size: 's' | 'm';
  cssHeaderStyles: any;
};

const CallOutHeader: FunctionComponent<CallOutHeaderProps> = ({
  title,
  headerIcon,
  heading,
  size,
  cssHeaderStyles,
}) => {
  if (!title) return null;

  const H: Heading = heading;
  return (
    <EuiTitle size={size === 's' ? 'xxs' : 'xs'} css={cssHeaderStyles}>
      <H className="euiCallOutHeader__title">
        {headerIcon}
        {title}
      </H>
    </EuiTitle>
  );
};

export const EuiCallOut = forwardRef<HTMLDivElement, EuiCallOutProps>(
  (
    {
      title,
      color = 'primary',
      size = 'm',
      iconType,
      children,
      className,
      heading = 'p',
      onClose,
      isDismissible = true,
      ...rest
    },
    ref
  ) => {
    const theme = useEuiTheme();
    const styles = euiCallOutStyles(theme);
    const cssStyles = [styles.euiCallOut];
    const cssCloseIconStyle = [styles.euiCallOut__closeIcon];
    const cssTitleEndStyle = [styles.euiCallOut__title_endSpace];

    const cssIconStyle = [styles.euiCallOut__icon];
    const cssDescriptionStyle = [styles.euiCallOut__description];

    const headerStyles = euiCallOutHeadingStyles(theme);
    const cssHeaderStyles = [
      headerStyles.euiCallOutHeader,
      headerStyles[color],
    ];

    const classes = classNames(
      'euiCallOut',
      {
        [`euiCallOut--${color}`]: color,
      },
      className
    );

    const closeIcon = isDismissible ? (
      <EuiI18n token="euiCallOut.closeCallOut" default="Close callout">
        {(closeCallOut: string) => (
          <EuiButtonIcon
            iconType="cross"
            onClick={onClose}
            aria-label={closeCallOut}
            css={cssCloseIconStyle}
            color={color}
          />
        )}
      </EuiI18n>
    ) : null;

    const headerIcon = iconType && (
      <EuiIcon
        css={cssIconStyle}
        type={iconType}
        size="m"
        aria-hidden="true"
        color="inherit"
      />
    );

    const optionalChildren = children && (
      <EuiText
        css={cssDescriptionStyle}
        size={size === 's' ? 'xs' : 's'}
        color="default"
      >
        {children}
      </EuiText>
    );

    return (
      <EuiPanel
        borderRadius="none"
        color={color}
        css={cssStyles}
        paddingSize={size === 's' ? 's' : 'm'}
        className={classes}
        panelRef={ref}
        grow={false}
        {...rest}
      >
        {closeIcon}
        <CallOutHeader
          title={title}
          headerIcon={headerIcon}
          heading={heading}
          size={size}
          cssHeaderStyles={[cssHeaderStyles, isDismissible && cssTitleEndStyle]}
        />
        {optionalChildren}
      </EuiPanel>
    );
  }
);
EuiCallOut.displayName = 'EuiCallOut';
