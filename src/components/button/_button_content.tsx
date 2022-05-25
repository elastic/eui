/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { HTMLAttributes, FunctionComponent, Ref } from 'react';
import classNames from 'classnames';
import { CommonProps, keysOf } from '../common';
import { EuiLoadingSpinner } from '../loading';
import { EuiIcon, IconType } from '../icon';

export type ButtonContentIconSide_Deprecated = 'left' | 'right';

const iconSideToClassNameMap: {
  [side in ButtonContentIconSide_Deprecated]: string | null;
} = {
  left: null,
  right: 'euiButtonContent--iconRight',
};

export const ICON_SIDES = keysOf(iconSideToClassNameMap);

export type EuiButtonContentType_Deprecated = HTMLAttributes<HTMLSpanElement>;

/**
 * *INTERNAL ONLY*
 * This component is simply a helper component for reuse within other button components
 * This component has been deprecated in favor of the new EuiButtonDisplayContent.
 */
export interface EuiButtonContentProps_Deprecated extends CommonProps {
  /**
   * Any `type` accepted by EuiIcon
   */
  iconType?: IconType;
  /**
   * Can only be one side `left` or `right`
   */
  iconSide?: ButtonContentIconSide_Deprecated;
  isLoading?: boolean;
  /**
   * Object of props passed to the <span/> wrapping the content's text/children only (not icon)
   */
  textProps?: HTMLAttributes<HTMLSpanElement> &
    CommonProps & {
      ref?: Ref<HTMLSpanElement>;
      'data-text'?: string;
    };
  iconSize?: 's' | 'm';
}

export const EuiButtonContent_Deprecated: FunctionComponent<
  EuiButtonContentType_Deprecated & EuiButtonContentProps_Deprecated
> = ({
  children,
  textProps,
  isLoading = false,
  iconType,
  iconSize = 'm',
  iconSide = 'left',
  ...contentProps
}) => {
  // Add an icon to the button if one exists.
  let buttonIcon;

  if (isLoading) {
    buttonIcon = (
      <EuiLoadingSpinner
        className="euiButtonContent__spinner"
        size={iconSize}
      />
    );
  } else if (iconType) {
    buttonIcon = (
      <EuiIcon
        className="euiButtonContent__icon"
        type={iconType}
        size={iconSize}
        color="inherit" // forces the icon to inherit its parent color
      />
    );
  }

  const contentClassNames = classNames(
    'euiButtonContent',
    iconSide ? iconSideToClassNameMap[iconSide] : null,
    contentProps && contentProps.className
  );

  return (
    <span {...contentProps} className={contentClassNames}>
      {buttonIcon}
      <span {...textProps}>{children}</span>
    </span>
  );
};
