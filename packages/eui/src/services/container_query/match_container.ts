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

/**
 * Listen for changes on a container query.
 * Just like `window.matchMedia`.
 *
 * @example
 * ```js
 * const cql = matchContainer(element, '(width > 42rem)');
 * cql.addEventListener('change', ({ matches }) {
 *   // ..
 * })
 * ```
 *
 * @param element
 * @param containerQueryString e.g. (width > 42rem)
 * @returns ContainerQueryList
 */
export function matchContainer(
  element: HTMLElement,
  containerQueryString: string
) {
  return new ContainerQueryList(element, containerQueryString);
}

/**
 * `change` event dispatched by instances of {@link ContainerQueryList}
 * whenever the value of `matches` changes
 */
export class ContainerQueryListChangeEvent extends Event {
  /** Whether the container query matches */
  readonly matches: boolean;
  /** A string representation of the container query list e.g. "(width > 1000px)" */
  readonly container: string;

  constructor(matches: boolean, container: string) {
    super('change');
    this.matches = matches;
    this.container = container;
  }
}

/**
 * A hacky implementation of a possible native `ContainerQueryList`
 * based on the teetotum/match-container polyfill:
 * - based on a API proposal in W3C CSS WG {@link https://github.com/w3c/csswg-drafts/issues/6205})
 * - mimicking MediaQueryList {@link https://developer.mozilla.org/en-US/docs/Web/API/MediaQueryList}
 *
 * Not meant to be used directly, but rather call `matchContainer`.
 *
 * It works by listening on a `transitionrun` event on the element,
 * that gets triggered by a container query changing a custom property.
 * Setting `transition-behavior: allow-discrete` is what makes it possible
 * to have a CSS `transition` for a custom property.
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/transition-behavior}
 */
export class ContainerQueryList extends EventTarget {
  private element: HTMLElement | null = null;
  private styleSheet: CSSStyleSheet | null = null;
  private markerAttributeName: string = '';
  private sentinelPropertyName: string = '';
  private computedStyle: CSSStyleDeclaration | null = null;
  private transitionRunListener: ((event: TransitionEvent) => void) | null =
    null;

  #matches: boolean = false;

  /** Whether the container query matches */
  get matches() {
    return this.#matches;
  }

  /**
   * A string representation of the container query list e.g. "(width > 1000px)"
   * (the name is weird but it is so for consistency with mediaQueryList.media)
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/MediaQueryList/media}
   * */
  readonly container: string;

  constructor(element: HTMLElement, containerQueryString: string) {
    super();

    this.container = containerQueryString;
    this.element = element;
    // we call this only once to try to avoid any impact on performance
    this.computedStyle = getComputedStyle(this.element);

    const uniqueName = `container-query-observer-${uuid()}`;
    this.markerAttributeName = `data-${uniqueName}`;
    this.sentinelPropertyName = `--${uniqueName}`;

    // order is important (as in life)
    this.applyMarkerAttribute();
    this.createStyleSheet();
    this.#matches =
      this.computedStyle.getPropertyValue(this.sentinelPropertyName) ===
      '--true';
    this.setupTransitionListener();
  }

  /**
   * The marker attribute is `data-container-query-observer-{UUID}`,
   * it will be used as a selector in the container query,
   * in the global CSS that's being added below.
   */
  private applyMarkerAttribute() {
    this.element!.setAttribute(this.markerAttributeName, '');
  }

  /**
   * Create a CSS custom property with values either `--true` or `--false`,
   * and add container query targetting the element.
   * Whenever the container query matches, the custom property will be `--true`.
   * This styles are added globaly via `document.adoptedStyleSheets`.
   */
  private createStyleSheet() {
    const css = `
      @property ${this.sentinelPropertyName} {
        syntax: '<custom-ident>';
        inherits: false;
        initial-value: --false;
      }
      @container ${this.container} {
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

  /**
   * This is the key to the hack:
   * - a `transition` style is added for the custom property
   * - the `transitionrun` event will fire whenever the custom property value changes
   *   because of the container query
   * - we get the value from computed styles
   * - the `matches` value is updated and
   * - a ContainerQueryListChangeEvent event is dispatched
   */
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
        new ContainerQueryListChangeEvent(this.#matches, this.container)
      );
    };

    element.addEventListener('transitionrun', this.transitionRunListener);
  }

  dispose() {
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
