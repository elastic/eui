/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import type { ExclusiveUnion } from '../common';

interface SharedParams {
  fullText: string;
  ellipsis: string;
  availableWidth: number;
}
interface DOMParams extends SharedParams {
  container: HTMLElement;
}
type CanvasParams = SharedParams &
  ExclusiveUnion<
    { container: HTMLElement },
    { font: CanvasTextDrawingStyles['font'] }
  >;

/**
 * Utilities for truncating types at various positions, as well as
 * determining whether truncation is possible or even necessary.
 */
abstract class _TruncationUtils {
  protected fullText: SharedParams['fullText'];
  protected ellipsis: SharedParams['ellipsis'];
  protected availableWidth: SharedParams['availableWidth'];

  public debugPerformance = false;
  public debugCounter = 0;

  constructor({ fullText, ellipsis, availableWidth }: SharedParams) {
    this.fullText = fullText;
    this.ellipsis = ellipsis;
    this.availableWidth = availableWidth;
  }

  /**
   * Internal measurement utils which will be overridden depending on the
   * rendering approach used (e.g. DOM vs Canvas).
   */

  abstract textWidth: number;
  abstract setTextToCheck: (text: string) => void;

  /**
   * Internal utils for calculating a ratio based on the passed available width
   * vs the full text width.
   * This ratio is used to get an initial _approximate_ text string that should
   * be slightly over the available width, which we can then remove from
   * character-by-character until the text just fits within the available width.
   */

  widthRatio: number = 0;

  setTextWidthRatio = (text: string = this.fullText, textToOffset = '') => {
    // Account for reduced available width due to (e.g.) truncation offset
    let availableWidth = this.availableWidth;
    if (textToOffset) {
      this.setTextToCheck(textToOffset);
      availableWidth = availableWidth - this.textWidth;
    }

    this.setTextToCheck(text);
    this.widthRatio = availableWidth / this.textWidth;
  };

  getTextFromRatio = (text: string, type: 'start' | 'end') => {
    const characterRatio = Math.ceil(text.length * this.widthRatio);
    const index =
      type === 'start' ? text.length - characterRatio : characterRatio;

    const [end, start] = splitText(text).at(index);
    return type === 'start' ? start : end;
  };

  /**
   * Early return checks
   */

  checkIfTruncationIsNeeded = () => {
    this.setTextToCheck(this.fullText);

    if (this.availableWidth >= this.textWidth) {
      return false;
    }
  };

  checkSufficientEllipsisWidth = (truncation: string) => {
    const textToCheck =
      truncation === 'startEnd'
        ? `${this.ellipsis} ${this.ellipsis}` // startEnd needs a little more space
        : this.ellipsis;
    this.setTextToCheck(textToCheck);

    if (this.textWidth >= this.availableWidth * 0.9) {
      console.error(
        'The truncation ellipsis is larger than the available width. No text can be rendered.'
      );
      return false;
    }
  };

  checkTruncationOffsetWidth = (text: string) => {
    this.setTextToCheck(text);

    if (this.textWidth > this.availableWidth) {
      console.error(
        'The passed truncationOffset is too large for the available width. Truncating the offset instead.'
      );
      return false;
    }
  };

  /**
   * Truncation types logic. This is where the magic happens
   */

  truncateStart = (truncationOffset?: number) => {
    let truncatedText = this.fullText;
    let leadingText = '';
    const combinedText = () => leadingText + truncatedText;

    if (truncationOffset) {
      [leadingText, truncatedText] = splitText(this.fullText).at(
        truncationOffset
      );

      const widthCheck = leadingText + this.ellipsis;
      if (this.checkTruncationOffsetWidth(widthCheck) === false) {
        truncatedText = leadingText;
        leadingText = '';
      }
    }

    // Get text width ratio width accounting for any truncation offset text,
    // and guesstimate an initial truncated string
    this.setTextWidthRatio(truncatedText, leadingText);
    truncatedText = this.getTextFromRatio(truncatedText, 'start');
    leadingText += this.ellipsis;
    this.setTextToCheck(combinedText());

    while (this.textWidth > this.availableWidth) {
      truncatedText = removeFirstCharacter(truncatedText);
      this.setTextToCheck(combinedText());
    }

    return combinedText();
  };

  truncateEnd = (truncationOffset?: number) => {
    let truncatedText = this.fullText;
    let trailingText = '';
    const combinedText = () => truncatedText + trailingText;

    if (truncationOffset) {
      const index = this.fullText.length - truncationOffset;
      [truncatedText, trailingText] = splitText(this.fullText).at(index);

      const widthCheck = this.ellipsis + trailingText;
      if (this.checkTruncationOffsetWidth(widthCheck) === false) {
        truncatedText = trailingText;
        trailingText = '';
      }
    }

    // Get text width ratio width accounting for any truncation offset text,
    // and guesstimate an initial truncated string
    this.setTextWidthRatio(truncatedText, trailingText);
    truncatedText = this.getTextFromRatio(truncatedText, 'end');
    trailingText = this.ellipsis + trailingText;
    this.setTextToCheck(combinedText());

    while (this.textWidth > this.availableWidth) {
      truncatedText = removeLastCharacter(truncatedText);
      this.setTextToCheck(combinedText());
    }

    return combinedText();
  };

  truncateStartEndAtPosition = (truncationPosition: number) => {
    // Split the text from the anchor position, using the width ratio
    // to get the starting and ending indices from the position
    this.setTextWidthRatio();
    const characterRatio = Math.floor(
      (this.fullText.length * this.widthRatio) / 2
    );
    const truncateStart = truncationPosition - characterRatio;
    const truncateEnd = truncationPosition + characterRatio;

    // If either of the approximate start/end truncation indices go beyond the
    // bounds of the actual text, we can simply use end or start truncation instead
    if (truncateStart < 0) {
      return this.truncateEnd();
    }
    if (truncateEnd >= this.fullText.length) {
      return this.truncateStart();
    }

    let truncatedText = this.fullText.substring(truncateStart, truncateEnd);
    const combinedText = () => this.ellipsis + truncatedText + this.ellipsis;
    this.setTextToCheck(combinedText());

    let alternating;
    while (this.textWidth > this.availableWidth) {
      truncatedText = alternating
        ? removeLastCharacter(truncatedText)
        : removeFirstCharacter(truncatedText);
      alternating = !alternating;
      this.setTextToCheck(combinedText());
    }

    return combinedText();
  };

  truncateStartEndAtMiddle = () => {
    const middlePosition = Math.floor(this.fullText.length / 2);
    return this.truncateStartEndAtPosition(middlePosition);
  };

  truncateMiddle = () => {
    const middlePosition = Math.floor(this.fullText.length / 2);
    let [firstHalf, secondHalf] = splitText(this.fullText).at(middlePosition);

    this.setTextWidthRatio();
    firstHalf = this.getTextFromRatio(firstHalf, 'end');
    secondHalf = this.getTextFromRatio(secondHalf, 'start');

    const combinedText = () => firstHalf + this.ellipsis + secondHalf;
    this.setTextToCheck(combinedText());

    let alternating;
    while (this.textWidth > this.availableWidth) {
      alternating = !alternating;
      if (alternating) {
        firstHalf = removeLastCharacter(firstHalf);
      } else {
        secondHalf = removeFirstCharacter(secondHalf);
      }
      this.setTextToCheck(combinedText());
    }

    return combinedText();
  };
}

/**
 * Creates a temporary vanilla JS DOM element for manipulating text and
 * determining text width.
 *
 * Requires passing in a container element to which the temporary element
 * will be appended. Any CSS/font styles that need to be accounted for should
 * be automatically inherited from the container.
 *
 * NOTE: The consumer is responsible for calling the `cleanup()` method manually
 * to remove the temporary DOM node once their usage of this utility is complete.
 */
export class TruncationUtilsWithDOM extends _TruncationUtils {
  container: DOMParams['container'];
  span: HTMLSpanElement;

  constructor({ container, ...rest }: DOMParams) {
    super(rest);
    this.container = container;

    this.span = document.createElement('span');
    this.span.style.position = 'absolute'; // Prevent page reflow/repaint for performance
    this.span.style.whiteSpace = 'nowrap'; // EuiTextTruncate already sets this on the parent, but we'll set it here as well for consumers who use this util standalone
    this.container.appendChild(this.span);
  }

  get textWidth() {
    return this.span.offsetWidth;
  }

  setTextToCheck = (text: string) => {
    this.span.textContent = text;

    if (this.debugPerformance) {
      this.debugCounter++;
    }
  };

  cleanup = () => {
    this.container.removeChild(this.span);

    if (this.debugPerformance) {
      console.debug(`Iterations: ${this.debugCounter}`, this.span.textContent);
    }
  };
}

/**
 * Creates a temporary Canvas element for manipulating text & determining
 * text width. This method is compatible with charts or other canvas-rendered
 * frameworks, and requires no cleanup method.
 *
 * To accurately measure text, canvas rendering requires either a container to
 * compute/derive font styles from, or a static font string (useful for usage
 * outside the DOM). Particular care should be applied when fallback fonts are
 * used, as more fallback fonts can lead to less precision.
 *
 * Please note that while canvas is more performant than DOM measurement, there
 * are subpixel to single digit pixel differences between DOM and canvas
 * measurement due to the different rendering engines used.
 */
export class TruncationUtilsWithCanvas extends _TruncationUtils {
  context: CanvasRenderingContext2D;
  currentText = '';

  constructor({ font, container, ...rest }: CanvasParams) {
    super(rest);

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
    if (this.debugPerformance) {
      this.debugCounter++;
    }
    return this.context.measureText(this.currentText).width;
  }

  setTextToCheck = (text: string) => {
    this.currentText = text;
  };
}

/**
 * DRY character/substring utils
 */

const removeLastCharacter = (text: string) =>
  text.substring(0, text.length - 1);

const removeFirstCharacter = (text: string) => text.substring(1);

const splitText = (text: string) => ({
  at: (index: number) => [text.substring(0, index), text.substring(index)],
});
