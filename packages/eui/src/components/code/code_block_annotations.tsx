/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  FunctionComponent,
  PropsWithChildren,
  ReactNode,
  useState,
} from 'react';

import { useEuiTheme, useEuiMemoizedStyles } from '../../services';
import { useEuiButtonFocusCSS } from '../../global_styling/mixins/_button';
import { CommonProps } from '../common';
import { useEuiI18n } from '../i18n';
import { EuiPopover } from '../popover';
import { EuiIcon } from '../icon';

import { euiCodeBlockAnnotationsStyles } from './code_block_annotations.style';

export type LineAnnotationMap = Record<number, ReactNode>;

type EuiCodeBlockAnnotationProps = PropsWithChildren &
  CommonProps & {
    lineNumber: number;
  };

export const EuiCodeBlockAnnotation: FunctionComponent<
  EuiCodeBlockAnnotationProps
> = ({ lineNumber, children, ...rest }) => {
  const [isOpen, setIsOpen] = useState(false);

  const ariaLabel = useEuiI18n(
    'euiCodeBlockAnnotations.ariaLabel',
    'Click to view a code annotation for line {lineNumber}',
    { lineNumber }
  );

  const styles = useEuiMemoizedStyles(euiCodeBlockAnnotationsStyles);
  const buttonIconFocusStyle = useEuiButtonFocusCSS();
  const cssButtonIconStyles = [
    styles.euiCodeBlockAnnotation__buttonIcon,
    buttonIconFocusStyle,
  ];

  const { euiTheme, colorMode } = useEuiTheme();
  const isDarkMode = colorMode === 'DARK';
  const iconColor = isDarkMode ? euiTheme.colors.ink : 'ghost';

  return (
    <EuiPopover
      css={styles.euiCodeBlockAnnotation}
      {...rest}
      isOpen={isOpen}
      closePopover={() => setIsOpen(false)}
      button={
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label={ariaLabel}
          css={cssButtonIconStyles}
          data-test-subj="euiCodeBlockAnnotationIcon"
        >
          <EuiIcon type={AnnotationInfoIcon} size="s" color={iconColor} />
        </button>
      }
      zIndex={Number(euiTheme.levels.mask) + 1} // Ensure fullscreen annotation popovers sit above the mask
      anchorPosition="downLeft"
      panelProps={{ 'data-test-subj': 'euiCodeBlockAnnotationPopover' }}
    >
      {children}
    </EuiPopover>
  );
};

const AnnotationInfoIcon: FunctionComponent = (props) => (
  <svg
    width={11}
    height={11}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7.139 14l-.052-6.007H5V6.28h4.111l.052 6.007h1.915V14h-3.94zM6.712 3.38c0-.396.118-.725.354-.987S7.639 2 8.077 2c.438 0 .777.131 1.016.393.24.262.359.591.359.987 0 .39-.12.714-.359.972s-.578.388-1.016.388c-.438 0-.775-.13-1.011-.388-.236-.258-.354-.582-.354-.972z"
    />
  </svg>
);
