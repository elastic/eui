/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import classNames from 'classnames';
import React, {
  Children,
  ComponentType,
  Fragment,
  FunctionComponent,
  isValidElement,
  ReactElement,
  useMemo,
} from 'react';

import {
  EuiDisabledProps,
  useEuiMemoizedStyles,
  useEuiTheme,
  useGeneratedHtmlId,
} from '../../../services';
import {
  getEuiButtonColors,
  getEuiFilledButtonColors,
} from '../../../global_styling';
import { CommonProps } from '../../common';
import { EuiButtonProps } from '../button';
import { EuiSplitButtonContext } from './split_button_context';
import {
  EuiSplitButtonActionPrimary,
  EuiSplitButtonActionPrimaryProps,
  EuiSplitButtonActionSecondary,
  EuiSplitButtonActionSecondaryProps,
} from './split_button_actions';
import {
  euiSplitButtonDividerStyles,
  euiSplitButtonStyles,
} from './split_button.styles';

type EuiSplitButtonCommonProps = EuiDisabledProps & {
  size?: EuiButtonProps['size'];
  color?: EuiButtonProps['color'];
  fill?: EuiButtonProps['fill'];
  isLoading?: EuiButtonProps['isLoading'];
};

export type EuiSplitButtonProps = CommonProps &
  EuiSplitButtonCommonProps & {
    /* NOTE: This definition is not actually enforced by Typescript.
    The tuple type ensures 2 children are expected, but the function component type won't be evaluated properly.
    We use this definition anyway as documentation for users.
    To advocate correct usage this requires runtime checks for development mode. */
    children: [
      ReactElement<
        EuiSplitButtonActionPrimaryProps,
        typeof EuiSplitButtonActionPrimary
      >,
      ReactElement<
        EuiSplitButtonActionSecondaryProps,
        typeof EuiSplitButtonActionSecondary
      >
    ];
  };

export const _EuiSplitButton: FunctionComponent<EuiSplitButtonProps> = ({
  className,
  children,
  size = 'm',
  color = 'primary',
  fill = false,
  isDisabled,
  hasAriaDisabled,
  isLoading,
  ...rest
}) => {
  const euiThemeContext = useEuiTheme();
  const { highContrastMode } = euiThemeContext;

  const [primaryAction, secondaryAction] = children;
  const key = useGeneratedHtmlId({ suffix: 'EuiSplitButton' });

  const commonProps = {
    size,
    color,
    fill,
    isDisabled,
    hasAriaDisabled,
    isLoading,
  };

  const buttonFilledColors = getEuiFilledButtonColors(
    euiThemeContext,
    isDisabled ? 'disabled' : color
  );
  const buttonColors = getEuiButtonColors(
    euiThemeContext,
    isDisabled ? 'disabled' : color
  );

  const classes = classNames('euiSplitButton', className);
  const styles = useEuiMemoizedStyles(euiSplitButtonStyles);
  const cssStyles = [styles.euiSplitButton, fill && styles.fill];
  const dividerStyles = useMemo(
    () =>
      euiSplitButtonDividerStyles(
        euiThemeContext,
        !fill
          ? buttonColors.borderColor
          : highContrastMode && fill
          ? buttonFilledColors.backgroundColor
          : 'transparent'
      ),
    [
      euiThemeContext,
      highContrastMode,
      fill,
      buttonFilledColors.backgroundColor,
      buttonColors.borderColor,
    ]
  );

  // NOTE: dev-mode-only runtime check to evaluate if correct child components are passed
  if (process.env.NODE_ENV !== 'production') {
    const childArray = Children.toArray(children);
    const expectedTypes = [
      ['EuiSplitButton.ActionPrimary', 'EuiSplitButtonActionPrimary'],
      ['EuiSplitButton.ActionSecondary', 'EuiSplitButtonActionSecondary'],
    ];

    childArray.forEach((child, index) => {
      if (!isValidElement(child)) return;

      const componentName = getComponentName(child.type);
      const expectedComponents = expectedTypes[index];

      if (!expectedComponents.includes(componentName)) {
        console.warn(
          `⚠️ EuiSplitButton: Expected <${expectedComponents[0]}> at position ${
            index + 1
          }, got <${componentName}>. You might be using a wrapper. Using e.g. React.memo() or React.lazy() is valid, other component wrappers are not and will break styling.
          To verify expected usage, please check the documentation: https://eui.elastic.co/docs/components/navigation/buttons/split-button/`
        );
      }
    });
  }

  return (
    <div role="group" className={classes} css={cssStyles} {...rest}>
      <EuiSplitButtonContext.Provider value={commonProps}>
        <Fragment key={`${key}-primaryAction`}>{primaryAction}</Fragment>
        <div
          className="euiSplitButton__divider"
          css={dividerStyles.divider}
          aria-hidden="true"
        />
        <Fragment key={`${key}-secondaryAction`}>{secondaryAction}</Fragment>
      </EuiSplitButtonContext.Provider>
    </div>
  );
};

export const EuiSplitButton = Object.assign(_EuiSplitButton, {
  ActionPrimary: EuiSplitButtonActionPrimary,
  ActionSecondary: EuiSplitButtonActionSecondary,
});

/* internal utils */

const getComponentName = (type: ComponentType<any> | string): string => {
  if (typeof type === 'string') return type;
  return type.displayName || type.name || 'Unknown';
};
