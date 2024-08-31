/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  ButtonHTMLAttributes,
  FunctionComponent,
  HTMLAttributes,
} from 'react';
import { css } from '@emotion/react';
import classNames from 'classnames';

import { CommonProps, ExclusiveUnion } from '../../common';
import { EuiIcon, EuiIconProps, IconType } from '../../icon';

export type EuiFormControlLayoutCustomIconProps = CommonProps &
  ExclusiveUnion<
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'>,
    HTMLAttributes<HTMLSpanElement>
  > & {
    type: IconType;
    size?: EuiIconProps['size'];
    iconRef?:
      | string
      | ((el: HTMLButtonElement | HTMLSpanElement | null) => void);
  };

export const EuiFormControlLayoutCustomIcon: FunctionComponent<
  EuiFormControlLayoutCustomIconProps
> = ({ className, onClick, type, iconRef, size, color, disabled, ...rest }) => {
  const classes = classNames('euiFormControlLayoutCustomIcon', className);
  const cssStyles = [
    styles.euiFormControlLayoutCustomIcon,
    onClick ? styles.clickable : styles.unclickable,
  ];

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        css={cssStyles}
        className={classes}
        ref={iconRef}
        {...rest}
      >
        <EuiIcon
          className="euiFormControlLayoutCustomIcon__icon"
          aria-hidden="true"
          size={size}
          type={type}
          color={color}
        />
      </button>
    );
  }

  return (
    <span css={cssStyles} className={classes} ref={iconRef} {...rest}>
      <EuiIcon
        className="euiFormControlLayoutCustomIcon__icon"
        aria-hidden="true"
        size={size}
        type={type}
        color={color}
      />
    </span>
  );
};

const styles = {
  euiFormControlLayoutCustomIcon: css`
    font-size: 0; /* Ensures the icon stays vertically centered */
  `,
  // Skip css`` here to avoid generating an Emotion className
  unclickable: `
    pointer-events: none;
  `,
  clickable: css`
    pointer-events: all;

    &:disabled {
      cursor: not-allowed;
      color: currentColor; /* Should inherit disabled form color from euiFormControlLayoutIcons */
    }
  `,
};
