/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

/**
 * @license MIT License
 *
 * Copyright (c) 2025 Martin Winkler
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 * @see {@link https://github.com/teetotum/match-container/blob/main/matchContainer.js}
 */

import { v1 as uuid } from 'uuid';

/*
  TODO
  - [ ] document and explain what this is doing
    - [ ] that is depends on https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/transition-behavior#browser_compatibility
  - [ ] add JSDoc
  - [ ] add tests
*/

export function matchContainer(
  element: HTMLElement,
  containerQueryString: string
) {
  return new ContainerQueryList(element, containerQueryString);
}

class ContainerQueryListChangeEvent extends Event {
  readonly matches: boolean;
  readonly container: string;

  constructor(matches: boolean, container: string) {
    super('change');
    this.matches = matches;
    this.container = container;
  }
}

class ContainerQueryList extends EventTarget {
  private element: HTMLElement | null = null;
  private styleSheet: CSSStyleSheet | null = null;
  private markerAttributeName: string = '';
  private sentinelPropertyName: string = '';
  private computedStyle: CSSStyleDeclaration | null = null;
  private transitionRunListener: ((event: TransitionEvent) => void) | null =
    null;

  #matches: boolean = false;

  get matches() {
    return this.#matches;
  }

  readonly query: string;

  constructor(element: HTMLElement, containerQueryString: string) {
    super();

    this.query = containerQueryString;
    this.element = element;
    // we call this only once to try to avoid any impact on performance
    this.computedStyle = getComputedStyle(this.element);

    const uniqueName = `container-query-observer-${uuid()}`;
    this.markerAttributeName = `data-${uniqueName}`;
    this.sentinelPropertyName = `--${uniqueName}`;

    // order is important
    this.applyMarkerAttribute();
    this.createStyleSheet();
    this.#matches =
      this.computedStyle.getPropertyValue(this.sentinelPropertyName) ===
      '--true';
    this.setupTransitionListener();
  }

  private applyMarkerAttribute() {
    this.element!.setAttribute(this.markerAttributeName, '');
  }

  private createStyleSheet() {
    const css = `
      @property ${this.sentinelPropertyName} {
        syntax: '<custom-ident>';
        inherits: false;
        initial-value: --false;
      }
      @container ${this.query} {
        [${this.markerAttributeName}] {
          ${this.sentinelPropertyName}: --true;
        }
      }
    `;
    const styleSheet = new CSSStyleSheet();
    styleSheet.replaceSync(css);
    document.adoptedStyleSheets = [...document.adoptedStyleSheets, styleSheet];
    this.styleSheet = styleSheet;
  }

  private setupTransitionListener() {
    const { element, computedStyle, sentinelPropertyName } = this;

    if (!element) return;

    let currentValue = computedStyle!.getPropertyValue(sentinelPropertyName);

    element.style.setProperty(
      'transition',
      `${sentinelPropertyName} 0.001ms step-start`
    );
    element.style.setProperty('transition-behavior', 'allow-discrete');

    this.transitionRunListener = (event: TransitionEvent) => {
      if (event.target !== element) return;

      const nextValue = computedStyle!.getPropertyValue(sentinelPropertyName);
      if (nextValue === currentValue) return;

      currentValue = nextValue;
      this.#matches = nextValue === '--true';

      this.dispatchEvent(
        new ContainerQueryListChangeEvent(this.#matches, this.query)
      );
    };

    element.addEventListener('transitionrun', this.transitionRunListener);
  }

  removeEventListener(
    type: string,
    callback: EventListenerOrEventListenerObject | null,
    options?: boolean | EventListenerOptions
  ): void {
    super.removeEventListener(type, callback, options);

    if (type === 'change') {
      this.cleanup();
    }
  }

  private cleanup() {
    // remove the stylesheet from adoptedStyleSheets
    if (this.styleSheet) {
      document.adoptedStyleSheets = document.adoptedStyleSheets.filter(
        (sheet) => sheet !== this.styleSheet
      );
    }

    if (!this.element) return;

    if (this.transitionRunListener) {
      this.element.removeEventListener(
        'transitionrun',
        this.transitionRunListener
      );
    }

    this.element.removeAttribute(this.markerAttributeName);
    this.element.style.removeProperty('transition');
    this.element.style.removeProperty('transition-behavior');

    this.element = null;
    this.styleSheet = null;
    this.computedStyle = null;
    this.transitionRunListener = null;
  }
}
