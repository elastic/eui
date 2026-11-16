/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import type { Locator } from '@playwright/test';

import { BaseObject, type ObjectScope } from '../../../base_object';
import { EuiFormRowSelectors } from '../../../../components/form/form_row/selectors';

/**
 * Playwright Component Object for {@link
 * https://eui.elastic.co/docs/components/forms/layouts/row/ EuiFormRow}.
 *
 * `testSubj` must be set on `EuiFormRow` itself, EUI spreads it onto the row
 * element. Drive the field inside with its own Component Object. Only the
 * row's own label, errors and help texts are read, a nested row inside the
 * field, as an inline `EuiColorPicker` renders, is left out.
 */
export class EuiFormRowObject extends BaseObject {
  constructor(
    scope: ObjectScope,
    testSubj: string,
    componentSelector = EuiFormRowSelectors.ROOT_SELECTOR
  ) {
    super(scope, testSubj, componentSelector);
  }

  /** The label, absent without `label`. */
  get label(): Locator {
    return this.root.locator(
      `:scope > ${EuiFormRowSelectors.LABEL_WRAPPER_SELECTOR} > ${EuiFormRowSelectors.LABEL_SELECTOR}`
    );
  }

  /** The error texts, absent unless `isInvalid` with `error`. */
  get errors(): Locator {
    return this.ownFieldChildren(EuiFormRowSelectors.ERROR_TEXT_SELECTOR);
  }

  /** The help texts, absent without `helpText`. */
  get helpTexts(): Locator {
    return this.ownFieldChildren(EuiFormRowSelectors.HELP_TEXT_SELECTOR);
  }

  /** The label text, or an empty string without `label`. */
  async getLabel(): Promise<string> {
    return this.textOf(this.label);
  }

  /** The help texts, in order. Empty without `helpText`. */
  async getHelpTexts(): Promise<string[]> {
    return this.textsOf(this.helpTexts);
  }

  /** The errors, in order. Empty unless `isInvalid` with `error`. */
  async getErrors(): Promise<string[]> {
    return this.textsOf(this.errors);
  }

  /**
   * Whether the row is invalid. True when the label is marked invalid or an
   * error is shown, a row without a label and without `error` cannot be told
   * apart from a valid one.
   */
  async isInvalid(): Promise<boolean> {
    await this.root.waitFor({ state: 'attached' });
    const invalidLabel = await this.label
      .and(this.root.locator('[aria-invalid="true"]'))
      .count();
    if (invalidLabel > 0) {
      return true;
    }
    return (await this.errors.count()) > 0;
  }

  /** Direct children of the row's own field wrapper matching `selector`. */
  private ownFieldChildren(selector: string): Locator {
    return this.root.locator(
      `:scope > ${EuiFormRowSelectors.FIELD_WRAPPER_SELECTOR} > ${selector}`
    );
  }

  private async textOf(element: Locator): Promise<string> {
    await this.root.waitFor({ state: 'attached' });
    if ((await element.count()) === 0) {
      return '';
    }
    return (await element.innerText()).trim();
  }

  private async textsOf(elements: Locator): Promise<string[]> {
    await this.root.waitFor({ state: 'attached' });
    const texts = await elements.allInnerTexts();
    return texts.map((text) => text.trim());
  }
}
