/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { EuiButtonEmpty } from '../button';
import { useEuiI18n } from '../i18n';
import {
  EuiDataGridProps,
  EuiDataGridToolbarProps,
  EuiDataGridToolBarVisibilityOptions,
} from './data_grid_types';

// Used to simplify some sizing logic which is difficult to account for in tests
const IS_JEST_ENVIRONMENT = global.hasOwnProperty('_isJest');

// When below this number the grid only shows the full screen button
const MINIMUM_WIDTH_FOR_GRID_CONTROLS = 479;

// When data grid is full screen, we add a class to the body to remove the extra scrollbar
const GRID_IS_FULLSCREEN_CLASSNAME = 'euiDataGrid__restrictBody';

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

export const EuiDataGridToolbar = ({
  gridWidth,
  minSizeForControls = MINIMUM_WIDTH_FOR_GRID_CONTROLS,
  toolbarVisibility,
  isFullScreen,
  controlBtnClasses,
  styleSelector,
  columnSelector,
  columnSorting,
  setRef,
  setIsFullScreen,
}: EuiDataGridToolbarProps) => {
  const [fullScreenButton, fullScreenButtonActive] = useEuiI18n(
    [
      'euiDataGridToolbar.fullScreenButton',
      'euiDataGridToolbar.fullScreenButtonActive',
    ],
    ['Full screen', 'Exit full screen']
  );
  const hasRoomForGridControls = IS_JEST_ENVIRONMENT
    ? true
    : gridWidth > minSizeForControls || isFullScreen;

  // need to safely access those Web APIs
  if (typeof document !== 'undefined') {
    // When data grid is full screen, we add a class to the body to remove the extra scrollbar
    document.body.classList.toggle(GRID_IS_FULLSCREEN_CLASSNAME, isFullScreen);
  }

  const fullScreenSelector = (
    <EuiButtonEmpty
      size="xs"
      iconType="fullScreen"
      color="text"
      className={controlBtnClasses}
      data-test-subj="dataGridFullScreenButton"
      onClick={() => setIsFullScreen(!isFullScreen)}
    >
      {isFullScreen ? fullScreenButtonActive : fullScreenButton}
    </EuiButtonEmpty>
  );

  return (
    <div
      ref={setRef}
      className="euiDataGrid__controls"
      data-test-sub="dataGridControls"
    >
      {hasRoomForGridControls && (
        <>
          {checkOrDefaultToolBarDisplayOptions(
            toolbarVisibility,
            'additionalControls'
          ) && typeof toolbarVisibility !== 'boolean'
            ? toolbarVisibility.additionalControls
            : null}
          {checkOrDefaultToolBarDisplayOptions(
            toolbarVisibility,
            'showColumnSelector'
          )
            ? columnSelector
            : null}
          {checkOrDefaultToolBarDisplayOptions(
            toolbarVisibility,
            'showStyleSelector'
          )
            ? styleSelector
            : null}
          {checkOrDefaultToolBarDisplayOptions(
            toolbarVisibility,
            'showSortSelector'
          )
            ? columnSorting
            : null}
        </>
      )}
      {checkOrDefaultToolBarDisplayOptions(
        toolbarVisibility,
        'showFullScreenSelector'
      )
        ? fullScreenSelector
        : null}
    </div>
  );
};
