/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { expect, type Locator } from '@playwright/test';

import { BaseObject, type ObjectScope } from '../../../base_object';
import { EuiFilePickerSelectors } from '../../../../components/form/file_picker/selectors';

/**
 * Playwright Component Object for {@link
 * https://eui.elastic.co/docs/components/forms/other/file-picker/ EuiFilePicker}.
 *
 * `testSubj` must be set on `EuiFilePicker` itself, EUI spreads it onto the
 * native `<input type="file">`.
 */
export class EuiFilePickerObject extends BaseObject {
  constructor(
    scope: ObjectScope,
    testSubj: string,
    componentSelector = EuiFilePickerSelectors.ROOT_SELECTOR
  ) {
    super(scope, testSubj, componentSelector);
  }

  /** The prompt next to the input. Shows the file name, "N files selected" or the initial prompt. */
  get prompt(): Locator {
    return this.wrapper.locator(EuiFilePickerSelectors.PROMPT_TEXT_SELECTOR);
  }

  /**
   * Pick these files, paths or in-memory payloads, and wait for the picker to
   * show them. Pass several only to a picker with `multiple`. An empty array
   * clears the picker.
   */
  async setFiles(
    files: Parameters<Locator['setInputFiles']>[0]
  ): Promise<void> {
    if (Array.isArray(files) && files.length === 0) {
      return this.clear();
    }
    await this.root.setInputFiles(files);
    await expect(this.wrapper).toHaveClass(/euiFilePicker-hasFiles/);
  }

  /** The names of the picked files, in the order the input holds them. */
  async getFileNames(): Promise<string[]> {
    await this.root.waitFor({ state: 'attached' });
    return this.root.evaluate((input: HTMLInputElement) =>
      Array.from(input.files ?? []).map((file) => file.name)
    );
  }

  /** Remove the picked files and wait for the initial prompt to come back. */
  async clear(): Promise<void> {
    await this.root.setInputFiles([]);
    await expect(this.wrapper).not.toHaveClass(/euiFilePicker-hasFiles/);
  }

  /** The `.euiFilePicker` around the input, reached from the input so a `Locator` scope works. */
  private get wrapper(): Locator {
    return this.root.locator(WRAPPER_ANCESTOR_XPATH);
  }
}

/** Nearest ancestor carrying the exact `euiFilePicker` class token. */
const WRAPPER_ANCESTOR_XPATH =
  "xpath=ancestor::*[contains(concat(' ', normalize-space(@class), ' '), ' euiFilePicker ')][1]";
