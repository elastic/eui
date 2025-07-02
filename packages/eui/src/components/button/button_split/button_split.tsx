/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { useState } from 'react';
import { euiButtonSplitStyles } from './button_split.styles';
import { EuiButton, EuiButtonPropsForButton, EuiButtonProps } from '../button';
import { EuiButtonIcon, EuiButtonIconProps } from '../button_icon/button_icon';
import { EuiPopover, EuiPopoverProps } from '../../popover';

export interface EuiButtonSplitProps {
  /** Shared color for both the main button and icon button */
  color: EuiButtonProps['color'];
  /** Shared fill for both buttons */
  fill?: EuiButtonProps['fill'];
  /** Shared size for both buttons */
  size?: EuiButtonProps['size'];
  /** Shared isDisabled for both buttons */
  isDisabled?: EuiButtonProps['isDisabled'];
  /** Props for the main button (left side), except shared props. Only button props are allowed, not anchor props. */
  buttonProps: Omit<
    EuiButtonPropsForButton,
    'color' | 'fill' | 'size' | 'isDisabled'
  >;
  /** Props for the icon button (right side), except shared props */
  iconButtonProps: Omit<
    EuiButtonIconProps,
    'color' | 'display' | 'size' | 'isDisabled'
  >;
  /** Render prop for the menu contents to show in the popover */
  popoverMenu: (closePopover: () => void) => React.ReactNode;
  /** Optional className for the split button wrapper */
  className?: string;
  /** Optional style for the split button wrapper */
  style?: React.CSSProperties;
  /** Optional padding size for the popover panel */
  panelPaddingSize?: EuiPopoverProps['panelPaddingSize'];
}

export const EuiButtonSplit: React.FC<EuiButtonSplitProps> = ({
  color,
  fill,
  size,
  isDisabled,
  buttonProps,
  iconButtonProps,
  popoverMenu,
  className = '',
  style = {},
  panelPaddingSize = 's',
}) => {
  const [isPopoverOpen, setPopoverOpen] = useState(false);
  const onButtonClick = () => setPopoverOpen((isOpen) => !isOpen);
  const closePopover = () => setPopoverOpen(false);
  const styles = euiButtonSplitStyles();

  return (
    <span
      className={`euiButtonSplit ${className}`}
      style={style}
      css={styles.euiButtonSplit}
    >
      <EuiButton
        {...buttonProps}
        color={color}
        fill={fill}
        size={size}
        isDisabled={isDisabled}
        css={styles.leftButton}
      />
      <span css={styles.rightSpan(color ?? 'primary')}>
        <EuiPopover
          button={
            <EuiButtonIcon
              {...iconButtonProps}
              color={color}
              display={fill ? 'fill' : 'base'}
              size={size}
              isDisabled={isDisabled}
              onClick={onButtonClick}
              css={styles.iconButton(color ?? 'primary')}
            />
          }
          isOpen={isPopoverOpen}
          closePopover={closePopover}
          panelPaddingSize={panelPaddingSize}
          anchorPosition="downRight"
        >
          {popoverMenu(closePopover)}
        </EuiPopover>
      </span>
    </span>
  );
};
