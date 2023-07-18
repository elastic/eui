/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { isValidElement, ReactNode } from 'react';
import {
  EuiDataGridProps,
  EuiDataGridToolbarProps,
  EuiDataGridToolBarVisibilityOptions,
  EuiDataGridToolBarAdditionalControlsOptions,
} from '../data_grid_types';
import { EuiScreenReaderOnly } from '../../accessibility';
import { IS_JEST_ENVIRONMENT } from '../../../utils';

// When below this number the grid only shows the right control icon buttons
const MINIMUM_WIDTH_FOR_GRID_CONTROLS = 479;

export const EuiDataGridToolbar = ({
  gridWidth,
  minSizeForControls = MINIMUM_WIDTH_FOR_GRID_CONTROLS,
  toolbarVisibility,
  isFullScreen,
  fullScreenSelector,
  keyboardShortcuts,
  displaySelector,
  columnSelector,
  columnSorting,
}: EuiDataGridToolbarProps) => {
  // Enables/disables grid controls based on available width
  const hasRoomForGridControls = IS_JEST_ENVIRONMENT
    ? true
    : gridWidth > minSizeForControls || isFullScreen;

  return (
    <div className="euiDataGrid__controls" data-test-subj="dataGridControls">
      {hasRoomForGridControls && (
        <div className="euiDataGrid__leftControls">
          {renderAdditionalControls(toolbarVisibility, 'left.prepend')}
          {checkOrDefaultToolBarDisplayOptions(
            toolbarVisibility,
            'showColumnSelector'
          )
            ? columnSelector
            : null}
          {checkOrDefaultToolBarDisplayOptions(
            toolbarVisibility,
            'showSortSelector'
          )
            ? columnSorting
            : null}
          {renderAdditionalControls(toolbarVisibility, 'left.append')}
        </div>
      )}
      <div className="euiDataGrid__rightControls">
        {renderAdditionalControls(toolbarVisibility, 'right')}
        {checkOrDefaultToolBarDisplayOptions(
          toolbarVisibility,
          'showKeyboardShortcuts'
        ) ? (
          keyboardShortcuts
        ) : (
          <EuiScreenReaderOnly showOnFocus>
            <span>{keyboardShortcuts}</span>
          </EuiScreenReaderOnly>
        )}
        {checkOrDefaultToolBarDisplayOptions(
          toolbarVisibility,
          'showDisplaySelector'
        )
          ? displaySelector
          : null}
        {checkOrDefaultToolBarDisplayOptions(
          toolbarVisibility,
          'showFullScreenSelector'
        )
          ? fullScreenSelector
          : null}
      </div>
    </div>
  );
};

/**
 * Toolbar utilities
 */

// Typeguards to see if toolbarVisibility has a certain boolean property assigned
// If not, just set it to true and assume it's OK to show
function objectHasKey<O extends Record<string, any>, ObjectKey extends keyof O>(
  object: O,
  key: ObjectKey
): object is Required<O> {
  return object.hasOwnProperty(key);
}

export function checkOrDefaultToolBarDisplayOptions<
  OptionKey extends keyof EuiDataGridToolBarVisibilityOptions
>(
  arg: EuiDataGridProps['toolbarVisibility'],
  option: OptionKey
): Required<EuiDataGridToolBarVisibilityOptions>[OptionKey] {
  if (arg === undefined) {
    return true;
  } else if (typeof arg === 'boolean') {
    return arg as boolean;
  } else if (objectHasKey(arg, option)) {
    return arg[option];
  } else {
    return true;
  }
}

export function renderAdditionalControls(
  toolbarVisibility: EuiDataGridProps['toolbarVisibility'],
  position: 'left.prepend' | 'left.append' | 'right'
): ReactNode {
  if (typeof toolbarVisibility === 'boolean') return null;
  const { additionalControls } = toolbarVisibility || {};
  if (!additionalControls) return null;

  // API backwards compatability: if the consumer passed a single ReactNode to `additionalControls`,
  // default to the left append position.
  if (isValidElement(additionalControls)) {
    if (position !== 'left.append') return null;

    return additionalControls;
  }

  if (typeof additionalControls !== 'object') {
    return null;
  }

  const additionalControlsObj =
    additionalControls as EuiDataGridToolBarAdditionalControlsOptions;

  if (position === 'right') {
    return additionalControlsObj.right;
  }

  if (isValidElement(additionalControlsObj.left)) {
    if (position !== 'left.append') return null;

    return additionalControlsObj.left;
  }

  if (typeof additionalControlsObj.left !== 'object') {
    return null;
  }

  if (position === 'left.prepend') {
    return additionalControlsObj.left as ReactNode;
  }

  return null;
}

/**
 * Utility helper for selectors/controls that allow nested options
 * (e.g. column selector, display selector)
 */

export function getNestedObjectOptions<T>(
  controlOption: undefined | boolean | T,
  objectKey: keyof T
): boolean {
  // If the config is a boolean, nested options follow that boolean
  if (controlOption === false || controlOption === true) return controlOption;
  // If config is not defined, default to enabled
  if (controlOption == null) return true;
  // Otherwise, type should be an object of boolean values - dive into it and return the value
  return !!(controlOption[objectKey] ?? true);
}
