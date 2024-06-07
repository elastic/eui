/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import classNames from 'classnames';
import React, {
  createElement,
  FunctionComponent,
  HTMLAttributes,
  ReactNode,
} from 'react';
import { CommonProps } from '../common';
import { EuiTitle, EuiTitleProps } from '../title';
import { EuiStepNumber, EuiStepStatus } from './step_number';
import { useEuiTheme } from '../../services';
import {
  euiStepStyles,
  euiStepContentStyles,
  euiStepTitleStyles,
} from './step.styles';

export interface EuiStepInterface {
  /**
   * ReactNode to render as this component's content
   */
  children: ReactNode;
  /**
   * The HTML tag used for the title
   */
  headingElement?: string;
  /**
   * The number of the step in the list of steps
   */
  step?: number;
  title: string;
  /**
   * May replace the number provided in props.step with alternate styling.
   */
  status?: EuiStepStatus;
  /**
   * Title sizing equivalent to **EuiTitle**, but only `m`, `s`, `xs` font sizes.
   * The `xxs` size reduces the size of the accompanying step indicator, but not the title itself.
   * @default s
   */
  titleSize?: Extract<EuiTitleProps['size'], 'xxs' | 'xs' | 's' | 'm'>;
}

export type EuiStepProps = CommonProps &
  Omit<HTMLAttributes<HTMLDivElement>, 'title'> &
  EuiStepInterface;

export const EuiStep: FunctionComponent<EuiStepProps> = ({
  className,
  children,
  headingElement = 'p',
  step = 1,
  title,
  titleSize = 's',
  status,
  ...rest
}) => {
  const classes = classNames('euiStep', className);

  const euiTheme = useEuiTheme();
  const styles = euiStepStyles(euiTheme);
  const cssStyles = [styles.euiStep, styles[titleSize]];

  const contentStyles = euiStepContentStyles(euiTheme);
  const cssContentStyles = [
    contentStyles.euiStep__content,
    contentStyles[titleSize],
  ];

  const titleStyles = euiStepTitleStyles(euiTheme);
  const cssStepTitleStyles = [
    titleStyles.euiStep__title,
    status === 'disabled' && titleStyles.isDisabled,
    titleStyles[titleSize],
  ];
  const cssTitleWrapperStyles = titleStyles.euiStep__titleWrapper;

  return (
    <div className={classes} css={cssStyles} {...rest}>
      <div className="euiStep__titleWrapper" css={cssTitleWrapperStyles}>
        <EuiStepNumber
          number={step}
          status={status}
          titleSize={titleSize === 'xxs' ? 'none' : titleSize}
        />
        <EuiTitle
          size={titleSize === 'xxs' ? 'xs' : titleSize}
          className="euiStep__title"
          css={cssStepTitleStyles}
        >
          {createElement(headingElement, null, title)}
        </EuiTitle>
      </div>

      <div className="euiStep__content" css={cssContentStyles}>
        {children}
      </div>
    </div>
  );
};
