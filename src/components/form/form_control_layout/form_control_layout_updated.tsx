/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

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

import React, {
  cloneElement,
  FunctionComponent,
  ReactElement,
  ReactNode,
} from 'react';
import classNames from 'classnames';

import { EuiFormControlLayoutIcons } from './form_control_layout_icons';
import { EuiFormLabel } from '../form_label';
import {
  EuiFormControlLayoutProps,
  _EuiPrependAppendType,
} from './form_control_layout';

export type _EuiPrependAppendSide = 'append' | 'prepend';

export const _createPrependAppendIDs = (
  inputId: string,
  side: _EuiPrependAppendSide,
  index: number
) => {
  return `${inputId}-${side}${index}`;
};

export const EuiFormControlLayoutUpdated: FunctionComponent<
  Omit<EuiFormControlLayoutProps, 'inputId' | 'prepend' | 'append'> & {
    /**
     * `inputId` is required to attach appropritely with prepend/append
     */
    inputId: string;
    /**
     * Final nodes are rendered via field component
     */
    prepend?: ReactNode;
    append?: ReactNode;
  }
> = ({
  children,
  icon,
  clear,
  fullWidth,
  isLoading,
  isDisabled,
  compressed,
  className,
  prepend,
  append,
  readOnly,
  inputId,
  ...rest
}) => {
  const classes = classNames(
    'euiFormControlLayout',
    {
      'euiFormControlLayout--fullWidth': fullWidth,
      'euiFormControlLayout--compressed': compressed,
      'euiFormControlLayout--readOnly': readOnly,
      'euiFormControlLayout--group': prepend || append,
      'euiFormControlLayout-isDisabled': isDisabled,
    },
    className
  );

  return (
    <div className={classes} {...rest}>
      {prepend}
      <div className="euiFormControlLayout__childrenWrapper">
        {children}

        <EuiFormControlLayoutIcons
          icon={icon}
          clear={clear}
          compressed={compressed}
          isLoading={isLoading}
        />
      </div>
      {append}
    </div>
  );
};

export const renderSideNode = (
  side: _EuiPrependAppendSide,
  inputId: string,
  /**
   * Nodes can be a single string or ReactElement, or an array of these
   */
  nodes?: _EuiPrependAppendType
) => {
  let finalNodes: ReactNode[] | undefined;
  const finalNodeIDs: string[] = [];

  // All string types get wrapped in labels,
  // Otherwise are cloned to have a class name applied

  if (typeof nodes === 'string') {
    // If they passed a simple string
    const id = _createPrependAppendIDs(inputId, side, 0);
    finalNodeIDs.push(id);
    finalNodes = [createFormLabel(side, nodes, id)];
  } else if (nodes) {
    // Otherwise map through each
    finalNodes = React.Children.map(nodes, (item, index) => {
      const nodeIsString = typeof item === 'string';

      if (item && nodeIsString) {
        const id =
          nodeIsString && _createPrependAppendIDs(inputId, side, index);
        finalNodeIDs.push(id);
        return createFormLabel(side, item as string, id);
      } else {
        // @ts-ignore Ugh TS
        return createSideNode(side, item, index);
      }
    });
  }

  return { finalNodes, finalNodeIDs };
};

export const createFormLabel = (
  side: _EuiPrependAppendSide,
  string: string,
  id: string
) => {
  return (
    <EuiFormLabel key={id} id={id} className={`euiFormControlLayout__${side}`}>
      {string}
    </EuiFormLabel>
  );
};

export const createSideNode = (
  side: _EuiPrependAppendSide,
  node?: ReactElement,
  key?: React.Key
): ReactNode => {
  if (!node) return;
  return cloneElement(node, {
    className: classNames(
      `euiFormControlLayout__${side}`,
      node.props.className
    ),
    key: key,
  });
};
