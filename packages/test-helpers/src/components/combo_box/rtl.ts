/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { fireEvent, waitFor } from '@testing-library/react';
import { getAriaControlsElement, getTargetContainer, WaitForOptions } from '../../utils/rtl/internal';
import { EuiPopoverTestHelpers } from '../popover/rtl';
import { EuiComboBoxSelectors } from './selectors';

/**
 * Find outer <EuiComboBox> element or throw when it doesn't exist
 */
const findElement = async (
  container?: HTMLElement,
  options?: WaitForOptions,
) => {
  const target = getTargetContainer(container);

  try {
    return await target.findByTestSubject(
      EuiComboBoxSelectors.TEST_SUBJ,
      undefined,
      options,
    );
  } catch (err) {
    throw new Error(
      `Unable to find <EuiComboBox> within given container. Make sure ` +
      `it's rendered on the screen when calling this function ` +
      `or increase the timeout if you're waiting for an asynchronous action`
    );
  }
};

const getInput = async (container?: HTMLElement) => {
  const target = getTargetContainer(container);

  return target.getByTestSubject(EuiComboBoxSelectors.SEARCH_INPUT_TEST_SUBJ);
};

/**
 * Whether the options list is currently open (visible)
 */
const isOptionsListOpen = async (container?: HTMLElement) => {
  // Find the outer element
  const wrappingElement = await findElement(container);
  // Get EuiComboBox <input> element and read its aria-controls to find the exact listbox element
  const inputElement = await getInput(wrappingElement);

  return !!getAriaControlsElement(inputElement);
};

/**
 * Opens EuiComboBox options list
 */
const openOptionsList = async (container?: HTMLElement) => {
  // Ignore if options list is already open
  if (await isOptionsListOpen(container)) {
    return;
  }

  const target = getTargetContainer(container);

  fireEvent.click(
    target.getByTestSubject(
      EuiComboBoxSelectors.OPTIONS_LIST_TOGGLE_BUTTON_TEST_SUBJ
    )
  );

  await EuiPopoverTestHelpers.waitForOpen();

  await waitFor(() => {
    expect(
      target.queryByTestSubject(EuiComboBoxSelectors.OPTIONS_LIST_TEST_SUBJ)
    ).toBeInTheDocument();
  });
};

/**
 * Closes EuiComboBox options list
 */
const closeOptionsList = async (container?: HTMLElement) => {
  // Ignore if options list is already closed
  if (!(await isOptionsListOpen(container))) {
    return;
  }

  const target = getTargetContainer(container);

  fireEvent.click(
    target.getByTestSubject(
      EuiComboBoxSelectors.OPTIONS_LIST_TOGGLE_BUTTON_TEST_SUBJ
    )
  );

  await waitFor(() => {
    expect(
      target.queryByTestSubject(EuiComboBoxSelectors.OPTIONS_LIST_TEST_SUBJ)
    ).not.toBeInTheDocument();
  });
};

export const EuiComboBoxTestHelpers = {
  isOptionsListOpen,
  openOptionsList,
  closeOptionsList,
};
