/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { BaseObject } from '../../base_object';

/**
 * Shared behaviour of the button family and links. The root is the clickable
 * element itself, a `<button>` or an `<a>`.
 */
export abstract class EuiButtonBaseObject extends BaseObject {
  /** Click the element. What follows is up to the consumer. */
  async click(): Promise<void> {
    await this.root.click();
  }

  /**
   * The visible text, trimmed, with line breaks as rendered. Empty for an
   * icon-only button. Screen reader only text, as the external link suffix,
   * is left out, EUI clips it to a single pixel rather than hiding it.
   */
  async getText(): Promise<string> {
    return this.root.evaluate((element) => {
      const clipped = Array.from(element.querySelectorAll('*')).filter(
        (node): node is HTMLElement => {
          const { width, height } = node.getBoundingClientRect();
          return node instanceof HTMLElement && width <= 1 && height <= 1;
        }
      );
      const previous = clipped.map((node) => node.style.display);
      clipped.forEach((node) => (node.style.display = 'none'));
      const text = (element as HTMLElement).innerText;
      clipped.forEach((node, i) => (node.style.display = previous[i]));
      return text.trim();
    });
  }

  /**
   * Whether EUI's loading spinner replaces the icon. Only the component's own
   * spinner counts, not one rendered inside the children.
   */
  async isLoading(): Promise<boolean> {
    await this.root.waitFor({ state: 'attached' });
    const spinner = this.root.locator(
      ':scope > .euiLoadingSpinner, :scope > * > .euiLoadingSpinner'
    );
    return (await spinner.count()) > 0;
  }

  /**
   * Whether the element is disabled, through the native attribute or
   * `aria-disabled`, which EUI uses when the element keeps focus or is a link.
   */
  async isDisabled(): Promise<boolean> {
    if (await this.root.isDisabled()) {
      return true;
    }
    return (await this.root.getAttribute('aria-disabled')) === 'true';
  }
}
