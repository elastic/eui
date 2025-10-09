/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import classNames from 'classnames';
import React, {
  FunctionComponent,
  MouseEventHandler,
  ReactElement,
} from 'react';
import { CSSInterpolation } from '@emotion/css';

import { useEuiMemoizedStyles } from '../../../services';
import { useEuiButtonColorCSS } from '../../../global_styling/mixins/_button';
import { useInnerText } from '../../inner_text';

import {
  EuiButtonDisplay,
  EuiButtonDisplayCommonProps,
} from '../button_display/_button_display';
import { EuiButtonGroupOptionProps, EuiButtonGroupProps } from './button_group';
import {
  euiButtonGroupButtonStyles,
  _compressedButtonFocusColors,
} from './button_group_button.styles';
import { EuiToolTip } from '../../../components/tool_tip';

type Props = EuiButtonGroupOptionProps & {
  /**
   * Styles the selected button to look selected (usually with `fill`)
   */
  isSelected?: boolean;
  /**
   * Inherit from EuiButtonGroup
   */
  color: EuiButtonGroupProps['color'];
  /**
   * Inherit from EuiButtonGroup
   */
  size: NonNullable<EuiButtonGroupProps['buttonSize']>;
  /**
   * Inherit from EuiButtonGroup
   */
  isIconOnly: EuiButtonGroupProps['isIconOnly'];
  /**
   * Inherit from EuiButtonGroup
   */
  onClick: MouseEventHandler<HTMLButtonElement>;
  contentProps?: EuiButtonDisplayCommonProps['contentProps'];
};

export const EuiButtonGroupButton: FunctionComponent<Props> = ({
  className,
  id,
  isDisabled,
  isIconOnly,
  isSelected = false,
  label,
  value, // Prevent prop from being spread
  size,
  color: _color = 'primary',
  toolTipContent,
  toolTipProps,
  contentProps,
  ...rest
}) => {
  const isCompressed = size === 'compressed';
  const color = isDisabled ? 'disabled' : _color;
  const hasBorder = color !== 'text' && !isCompressed;
  const display = isSelected
    ? 'fill'
    : isCompressed || hasBorder
    ? 'empty'
    : 'base';
  const hasToolTip = !!toolTipContent;

  const styles = useEuiMemoizedStyles(euiButtonGroupButtonStyles);
  const focusColorStyles = useEuiMemoizedStyles(_compressedButtonFocusColors);
  const buttonColorStyles = useEuiButtonColorCSS({ display })[color];

  const cssStyles = [
    styles.euiButtonGroupButton,
    isIconOnly && styles.iconOnly,
    !isCompressed &&
      (hasToolTip ? styles.uncompressed.hasToolTip : styles.uncompressed[size]),
    isCompressed ? styles.compressed : styles.uncompressed.uncompressed,
    isDisabled && isSelected ? styles.disabledAndSelected : buttonColorStyles,
    !isDisabled && isCompressed && focusColorStyles[color],
    hasBorder && styles.hasBorder,
  ];
  const tooltipWrapperStyles = [
    styles.tooltipWrapper,
    !isCompressed && styles.uncompressed[size],
  ];
  const contentStyles = [
    styles.content.euiButtonGroupButton__content,
    isCompressed && styles.content.compressed,
  ];
  const textStyles = [
    isIconOnly
      ? styles.text.euiButtonGroupButton__iconOnly
      : styles.text.euiButtonGroupButton__text,
  ];

  const buttonClasses = classNames(
    'euiButtonGroupButton',
    {
      'euiButtonGroupButton-isSelected': isSelected,
      'euiButtonGroupButton-isIconOnly': isIconOnly,
    },
    className
  );

  /**
   * Because the selected buttons also increase their text weight to 'bold',
   * we don't want the whole button size to shift when selected, so we determine
   * the base width of the button via the `euiTextShift()` method in SASS.
   */
  const [buttonTextRef, innerText] = useInnerText();

  return (
    <EuiButtonGroupButtonWithToolTip
      toolTipContent={toolTipContent}
      toolTipProps={toolTipProps}
      wrapperCss={tooltipWrapperStyles}
      isSelected={isSelected}
    >
      <EuiButtonDisplay
        css={cssStyles}
        className={buttonClasses}
        isDisabled={isDisabled}
        size={size === 'compressed' ? 's' : size}
        contentProps={{
          ...contentProps,
          css: [contentStyles, contentProps?.css],
        }}
        textProps={{
          css: textStyles,
          ref: buttonTextRef,
          'data-text': innerText,
        }}
        title={innerText}
        data-test-subj={id}
        isSelected={isSelected}
        {...rest}
      >
        {label}
      </EuiButtonDisplay>
    </EuiButtonGroupButtonWithToolTip>
  );
};

const EuiButtonGroupButtonWithToolTip: FunctionComponent<
  Pick<Props, 'toolTipContent' | 'toolTipProps'> & {
    children: ReactElement;
    wrapperCss: CSSInterpolation;
    isSelected: boolean;
  }
> = ({ toolTipContent, toolTipProps, wrapperCss, isSelected, children }) => {
  return toolTipContent ? (
    <EuiToolTip
      content={toolTipContent}
      position="top"
      {...toolTipProps}
      anchorProps={{
        ...toolTipProps?.anchorProps,
        className: classNames(
          'euiButtonGroup__tooltipWrapper',
          { 'euiButtonGroup__tooltipWrapper-isSelected': isSelected },
          toolTipProps?.anchorProps?.className
        ),
        css: [wrapperCss, toolTipProps?.anchorProps?.css],
      }}
    >
      {children}
    </EuiToolTip>
  ) : (
    children
  );
};
