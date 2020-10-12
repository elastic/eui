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
import React from 'react';
import { EuiDataGridColumn } from './data_grid_types';
import classNames from 'classnames';
import { EuiI18n } from '../i18n';
import { EuiButtonIcon } from '../button/button_icon';

export const EuiDataGridCellButtons = ({
  popoverIsOpen,
  onExpandClick,
  column,
  rowIndex,
}: {
  popoverIsOpen: boolean;
  onExpandClick: () => void;
  column?: EuiDataGridColumn;
  rowIndex: number;
}) => {
  const buttonIconClasses = classNames('euiDataGridRowCell__expandButtonIcon', {
    'euiDataGridRowCell__expandButtonIcon-isActive': popoverIsOpen,
  });
  const buttonClasses = classNames('euiDataGridRowCell__expandButton', {
    'euiDataGridRowCell__expandButton-isActive': popoverIsOpen,
  });
  const expandButton = (
    <EuiI18n
      key={'expand'}
      token="euiDataGridCellButtons.expandButtonTitle"
      default="Click or hit enter to interact with cell content">
      {(expandButtonTitle: string) => (
        <EuiButtonIcon
          className={buttonIconClasses}
          color="ghost"
          iconSize="s"
          iconType="expandMini"
          aria-hidden
          onClick={onExpandClick}
          title={expandButtonTitle}
        />
      )}
    </EuiI18n>
  );
  const additionalButtons =
    column && Array.isArray(column.cellActions)
      ? column.cellActions.map((action, idx) => (
          <EuiButtonIcon
            data-test-subj={action['data-test-subj']}
            key={idx}
            title={action['aria-label'] || action.label}
            aria-hidden
            className={classNames(
              'euiDataGridRowCell__actionButtonIcon',
              action.className
            )}
            iconSize="s"
            iconType={action.iconType}
            onClick={() => action.callback(rowIndex, column.id)}
          />
        ))
      : [];
  return (
    <div className={buttonClasses}>{[...additionalButtons, expandButton]}</div>
  );
};
