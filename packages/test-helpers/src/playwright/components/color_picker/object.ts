/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { expect, type Locator } from '@playwright/test';

import { BaseObject, type ObjectScope } from '../../base_object';
import { EuiColorPickerSelectors } from '../../../components/color_picker/selectors';

/**
 * Playwright Component Object for {@link
 * https://eui.elastic.co/docs/components/forms/color-picker/ EuiColorPicker}.
 *
 * `testSubj` must be set on `EuiColorPicker` itself. `locator` is the anchor:
 * the default text input, or the element passed as the `button` prop. See the
 * package README for what this does not cover.
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

  /**
   * Type `color` into the hex input and verify it was accepted. With the
   * default anchor that input is the anchor itself. With a custom `button`
   * the input lives inside the panel, so the picker is opened, filled and
   * closed again. Throws if the panel has no input
   * (`secondaryInputDisplay="none"`).
   */
  async setColor(color: string): Promise<void> {
    // EUI echoes the value back uppercased.
    const expected = color.toUpperCase();

    if (await this.isInputAnchor()) {
      await this.root.fill(color);
      await expect(this.root).toHaveValue(expected);
      await this.root.blur();
      return;
    }

    await this.toggle();
    const input = await this.secondaryInput();
    await input.fill(color);
    await expect(input).toHaveValue(expected);
    await this.toggle();
  }

  /**
   * The color shown in the hex input, uppercased. With a custom `button` the
   * picker is opened to read it and closed again.
   */
  async getColor(): Promise<string> {
    if (await this.isInputAnchor()) {
      return this.root.inputValue();
    }

    await this.toggle();
    const value = await (await this.secondaryInput()).inputValue();
    await this.toggle();
    return value;
  }

  private async isInputAnchor(): Promise<boolean> {
    return this.root.evaluate((el) => el.tagName === 'INPUT');
  }

  /**
   * Click a custom `button` anchor, which toggles the panel, and wait for the
   * panel to follow. Only used with a custom `button`: the default input
   * anchor opens on click but does not close on a second one.
   */
  private async toggle(): Promise<void> {
    const wasOpen = (await this.panel.count()) > 0;
    await this.root.click();
    if (wasOpen) {
      await this.panel.waitFor({ state: 'detached' });
    } else {
      await expect(this.panel).toHaveAttribute('data-popover-open', 'true');
    }
  }

  private async secondaryInput(): Promise<Locator> {
    const input = this.panel.locator(EuiColorPickerSelectors.SECONDARY_INPUT_SELECTOR);
    if ((await input.count()) === 0) {
      throw new Error(
        `EuiColorPicker "${this.testSubj}" uses a custom button and its panel has no hex input. ` +
          `Set secondaryInputDisplay to "top" or "bottom" to read or set its color.`
      );
    }
    return input;
  }
}
