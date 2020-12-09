/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import classNames from 'classnames';
import React, {
  createElement,
  FunctionComponent,
  HTMLAttributes,
  ReactNode,
} from 'react';
import { CommonProps } from '../common';
import { EuiTitle, EuiTitleProps, EuiTitleSize } from '../title';
import { EuiStepNumber, EuiStepStatus } from './step_number';

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
   * Title sizing equivalent to EuiTitle, but only `m`, `s` and `xs`. Defaults to `s`
   */
  titleSize?: Exclude<EuiTitleProps['size'], 'xxxs' | 'xxs' | 'l'>;
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
  const classes = classNames(
    'euiStep',
    {
      'euiStep--small': titleSize === 'xs',
      'euiStep-isDisabled': status === 'disabled',
    },
    className
  );
  const numberClasses = classNames('euiStep__circle', {
    'euiStepNumber--small': titleSize === 'xs',
  });

  return (
    <div className={classes} {...rest}>
      <div className="euiStep__titleWrapper">
        <EuiStepNumber
          className={numberClasses}
          number={step}
          status={status}
          titleSize={titleSize}
          isHollow={status === 'incomplete'}
        />
        <EuiTitle size={titleSize as EuiTitleSize} className="euiStep__title">
          {createElement(headingElement, null, title)}
        </EuiTitle>
      </div>

      <div className="euiStep__content">{children}</div>
    </div>
  );
};
