/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { useEffect } from 'react';
import { EuiToolTip } from '../../tool_tip';
import { EuiButtonIcon } from '../../button';
import { useEuiI18n } from '../../i18n';
import {
  EuiDataGridProps,
  EuiDataGridToolbarProps,
  EuiDataGridToolBarVisibilityOptions,
  EuiDataGridToolBarAdditionalControlsOptions,
  EuiDataGridToolBarAdditionalControlsLeftOptions,
} from '../data_grid_types';

// Used to simplify some sizing logic which is difficult to account for in tests
const IS_JEST_ENVIRONMENT = global.hasOwnProperty('_isJest');

// When below this number the grid only shows the full screen button
const MINIMUM_WIDTH_FOR_GRID_CONTROLS = 479;

// When data grid is full screen, we add a class to the body to remove the extra scrollbar
const GRID_IS_FULLSCREEN_CLASSNAME = 'euiDataGrid__restrictBody';

export const EuiDataGridToolbar = ({
  gridWidth,
  minSizeForControls = MINIMUM_WIDTH_FOR_GRID_CONTROLS,
  toolbarVisibility,
  isFullScreen,
  controlBtnClasses,
  displaySelector,
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

  useEffect(() => {
    // When data grid is full screen, we add a class to the body to remove the extra scrollbar and stay above any fixed headers
    if (isFullScreen) {
      document.body.classList.add(GRID_IS_FULLSCREEN_CLASSNAME);

      return () => {
        document.body.classList.remove(GRID_IS_FULLSCREEN_CLASSNAME);
      };
    }
  }, [isFullScreen]);

  const fullScreenSelector = (
    <EuiToolTip
      content={
        isFullScreen ? (
          <>
            {fullScreenButtonActive} (<kbd>esc</kbd>)
          </>
        ) : (
          fullScreenButton
        )
      }
      delay="long"
    >
      <EuiButtonIcon
        size="xs"
        iconType={isFullScreen ? 'fullScreenExit' : 'fullScreen'}
        color="text"
        className={controlBtnClasses}
        data-test-subj="dataGridFullScreenButton"
        onClick={() => setIsFullScreen(!isFullScreen)}
        aria-label={isFullScreen ? fullScreenButtonActive : fullScreenButton}
      />
    </EuiToolTip>
  );

  return (
    <div
      ref={setRef}
      className="euiDataGrid__controls"
      data-test-sub="dataGridControls"
    >
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
) {
  if (typeof toolbarVisibility === 'boolean') return null;
  const { additionalControls } = toolbarVisibility || {};
  if (!additionalControls) return null;

  // Typescript is having obj issues, so we need to force cast to EuiDataGridToolBarAdditionalControlsOptions here
  const additionalControlsObj: EuiDataGridToolBarAdditionalControlsOptions =
    additionalControls?.constructor === Object ? additionalControls : {};
  // Typescript workarounds continued
  const leftPositionObj: EuiDataGridToolBarAdditionalControlsLeftOptions =
    additionalControlsObj.left?.constructor === Object
      ? additionalControlsObj.left
      : {};

  if (position === 'right') {
    if (additionalControlsObj?.right) {
      return additionalControlsObj.right;
    }
  } else if (position === 'left.prepend') {
    if (leftPositionObj?.prepend) {
      return leftPositionObj.prepend;
    }
  } else if (position === 'left.append') {
    if (leftPositionObj?.append) {
      return leftPositionObj.append;
    }
    if (React.isValidElement(additionalControlsObj?.left)) {
      // If the consumer passed a single ReactNode to `additionalControls.left`, default to the left append position
      return additionalControlsObj.left;
    }
    if (React.isValidElement(additionalControls)) {
      // API backwards compatability: if the consumer passed a single ReactNode to `additionalControls`, default to the the left append position
      return additionalControls;
    }
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
