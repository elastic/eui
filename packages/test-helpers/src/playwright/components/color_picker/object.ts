/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import type { Locator } from '@playwright/test';

import { BaseObject, type ObjectScope } from '../../base_object';
import { EuiColorPickerSelectors } from '../../../components/color_picker/selectors';

/**
 * Playwright Component Object for {@link
 * https://eui.elastic.co/docs/components/forms/color-picker/ EuiColorPicker}.
 *
 * `testSubj` must be set on `EuiColorPicker` itself. Covers only the default
 * text-input anchor, not a custom `button` prop. See the package README for
 * what this does not cover.
 */
export class EuiColorPickerObject extends BaseObject {
  constructor(scope: ObjectScope, testSubj: string) {
    super(scope, testSubj, EuiColorPickerSelectors.ANCHOR_SELECTOR);
  }

  /**
   * The popover panel. Rendered in a portal, so it is found on the page, not
   * under the anchor. Resolves to zero elements while closed.
   */
  public get panel(): Locator {
    return this.root.page().locator(EuiColorPickerSelectors.PANEL_SELECTOR);
  }

  /** The swatch buttons inside {@link panel}. */
  public get swatches(): Locator {
    return this.panel.locator(EuiColorPickerSelectors.SWATCH_SELECTOR);
  }
}
