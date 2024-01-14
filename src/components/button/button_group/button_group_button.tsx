/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import classNames from 'classnames';
import React, { FunctionComponent, MouseEventHandler, useRef } from 'react';

import { useEuiTheme } from '../../../services';
import { useEuiButtonColorCSS } from '../../../themes/amsterdam/global_styling/mixins/button';
import { useInnerText } from '../../inner_text';

import { EuiButtonDisplay } from '../button_display/_button_display';
import { EuiButtonGroupOptionProps, EuiButtonGroupProps } from './button_group';
import {
  euiButtonGroupButtonStyles,
  _compressedButtonFocusColor,
  _uncompressedButtonFocus,
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
  size: EuiButtonGroupProps['buttonSize'];
  /**
   * Inherit from EuiButtonGroup
   */
  isIconOnly: EuiButtonGroupProps['isIconOnly'];
  /**
   * Inherit from EuiButtonGroup
   */
  onClick: MouseEventHandler<HTMLButtonElement>;
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
  title,
  titleDelay = 'long',
  titlePosition = 'top',
  onClick,
  ...rest
}) => {
  const isCompressed = size === 'compressed';
  const color = isDisabled ? 'disabled' : _color;
  const display = isSelected ? 'fill' : isCompressed ? 'empty' : 'base';

  const euiTheme = useEuiTheme();
  const buttonColorStyles = useEuiButtonColorCSS({ display })[color];
  const focusColorStyles = isCompressed
    ? _compressedButtonFocusColor(euiTheme, color)
    : _uncompressedButtonFocus(euiTheme);

  const styles = euiButtonGroupButtonStyles(euiTheme);
  const cssStyles = [
    styles.euiButtonGroupButton,
    isIconOnly && styles.iconOnly,
    isDisabled && isSelected ? styles.disabledAndSelected : buttonColorStyles,
    !isDisabled && focusColorStyles,
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
  const tooltipRef = useRef<EuiToolTip>(null);

  const onClickOverride: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    // Blur the tooltip so it doesn't stick around after click until rehovered/refocused
    tooltipRef.current?.onBlur();
    onClick(e);
  };

  return (
    <EuiToolTip
      ref={tooltipRef}
      content={isIconOnly ? title || innerText : undefined}
      delay={titleDelay}
      position={titlePosition}
      anchorProps={{
        className: classNames('euiButtonGroupButton__tooltipAnchor', {
          'euiButtonGroupButton__tooltipAnchor-isSelected': isSelected,
        }),
        css: [
          styles.euiButtonGroupButtonTooltipAnchor,
          styles[size!],
          !isCompressed && styles.uncompressed,
        ],
      }}
    >
      <EuiButtonDisplay
        css={cssStyles}
        className={buttonClasses}
        isDisabled={isDisabled}
        size={size === 'compressed' ? 's' : size}
        contentProps={{ css: contentStyles }}
        textProps={{
          css: textStyles,
          ref: buttonTextRef,
          'data-text': innerText,
        }}
        data-test-subj={id}
        isSelected={isSelected}
        onClick={onClickOverride}
        {...rest}
      >
        {label}
      </EuiButtonDisplay>
    </EuiToolTip>
  );
};
