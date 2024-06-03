/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import type { ExclusiveUnion } from '../../components/common';

export type CanvasTextParams = ExclusiveUnion<
  { container: HTMLElement },
  { font: CanvasTextDrawingStyles['font'] }
>;

/**
 * Creates a temporary Canvas element for manipulating text & determining text width.
 *
 * To accurately measure text, canvas rendering requires either a container to
 * compute/derive font styles from, or a static font string (useful for usage
 * outside the DOM). Particular care should be applied when fallback fonts are
 * used, as more fallback fonts can lead to less precision.
 *
 * Please note that while canvas is more significantly more performant than DOM
 * measurement, there are subpixel to single digit pixel differences between
 * DOM and canvas measurement due to the different rendering engines used.
 */
export class CanvasTextUtils {
  context: CanvasRenderingContext2D;
  currentText = '';

  constructor({ font, container }: CanvasTextParams) {
    this.context = document.createElement('canvas').getContext('2d')!;

    // Set the canvas font to ensure text width calculations are correct
    if (font) {
      this.context.font = font;
    } else if (container) {
      this.context.font = this.computeFontFromElement(container);
    }
  }

  computeFontFromElement = (element: HTMLElement) => {
    const computedStyles = window.getComputedStyle(element);
    // TODO: font-stretch is not included even though it potentially should be
    // @see https://developer.mozilla.org/en-US/docs/Web/CSS/font#constituent_properties
    // It appears to be unsupported and/or breaks font computation in canvas
    return [
      'font-style',
      'font-variant',
      'font-weight',
      'font-size',
      'font-family',
    ]
      .map((prop) => computedStyles.getPropertyValue(prop))
      .join(' ')
      .trim();
  };

  get textWidth() {
    return this.context.measureText(this.currentText).width;
  }

  setTextToCheck = (text: string) => {
    this.currentText = text;
  };
}
