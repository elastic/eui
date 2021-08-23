/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */
import React, { JSXElementConstructor, useMemo } from 'react';
import {
  EuiDataGridColumn,
  EuiDataGridColumnCellAction,
  EuiDataGridColumnCellActionProps,
} from '../data_grid_types';
import classNames from 'classnames';
import { EuiI18n } from '../../i18n';
import { EuiButtonIcon, EuiButtonIconProps } from '../../button/button_icon';

export const EuiDataGridCellButtons = ({
  popoverIsOpen,
  closePopover,
  onExpandClick,
  column,
  rowIndex,
}: {
  popoverIsOpen: boolean;
  closePopover: () => void;
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
      default="Click or hit enter to interact with cell content"
    >
      {(expandButtonTitle: string) => (
        <EuiButtonIcon
          display="fill"
          className={buttonIconClasses}
          color="primary"
          iconSize="s"
          iconType="expandMini"
          aria-hidden
          onClick={onExpandClick}
          title={expandButtonTitle}
        />
      )}
    </EuiI18n>
  );
  const additionalButtons = useMemo(() => {
    const ButtonComponent = (props: EuiButtonIconProps) => (
      <EuiButtonIcon
        {...props}
        aria-hidden
        className="euiDataGridRowCell__actionButtonIcon"
        iconSize="s"
      />
    );
    return column && Array.isArray(column.cellActions)
      ? column.cellActions.map(
          (Action: EuiDataGridColumnCellAction, idx: number) => {
            // React is more permissible than the TS types indicate
            const CellButtonElement = Action as JSXElementConstructor<
              EuiDataGridColumnCellActionProps
            >;
            return (
              <CellButtonElement
                key={idx}
                rowIndex={rowIndex}
                columnId={column.id}
                Component={ButtonComponent}
                isExpanded={false}
                closePopover={closePopover}
              />
            );
          }
        )
      : [];
  }, [column, rowIndex, closePopover]);

  return (
    <div className={buttonClasses}>{[...additionalButtons, expandButton]}</div>
  );
};
