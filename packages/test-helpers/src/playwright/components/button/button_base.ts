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

  /** The visible text, trimmed. Empty for an icon-only button. */
  async getText(): Promise<string> {
    return (await this.root.innerText()).trim();
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
