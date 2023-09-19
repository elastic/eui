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
 * This internal shared/base class contains the actual logic for truncating text
 * (as well as a few handy utilities for checking whether truncation is possible
 * or even necessary).
 *
 * How the underlying mechanism works: the full text is rendered, and then
 * characters are removed one by one until the width of the text fits within
 * the specified available width.
 *
 * Side note: The exception to this is the `truncateStartEndAtPosition` method,
 * which works by building up from an empty string / by adding characters
 * instead of removing them.
 */
abstract class _TruncationUtils {
  protected fullText: SharedParams['fullText'];
  protected ellipsis: SharedParams['ellipsis'];
  protected availableWidth: SharedParams['availableWidth'];

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
        `The passed truncationOffset is too large for the available width. Truncating the offset instead.`
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
    const combinedText = () => `${leadingText}${truncatedText}`;

    if (truncationOffset) {
      [leadingText, truncatedText] = splitText(this.fullText).at(
        truncationOffset
      );

      const widthCheck = `${leadingText}${this.ellipsis}`;
      if (this.checkTruncationOffsetWidth(widthCheck) === false) {
        truncatedText = leadingText;
        leadingText = '';
      }
    }

    leadingText += this.ellipsis;
    this.setTextToCheck(combinedText());

    // let i = 0;
    // while (this.textWidth > this.availableWidth) {
    //   truncatedText = removeFirstCharacter(truncatedText);
    //   this.setTextToCheck(combinedText());
    //   i++;
    // }
    // console.log('char by char', i, combinedText());
    // return combinedText();

    let j = 0;
    let removedText = '';
    while (this.textWidth > this.availableWidth && truncatedText.length > 1) {
      j++;
      [removedText, truncatedText] = splitText(truncatedText).inHalf();
      this.setTextToCheck(combinedText());

      while (this.textWidth < this.availableWidth && removedText.length > 1) {
        let textToAdd = removedText;
        [removedText, textToAdd] = splitText(removedText).inHalf();
        truncatedText = addText(textToAdd).atStartOf(truncatedText);
        this.setTextToCheck(combinedText());
        j++;
      }
    }
    console.log('binary', j, combinedText());

    return combinedText();
  };

  truncateEnd = (truncationOffset?: number) => {
    let truncatedText = this.fullText;
    let trailingText = '';
    const combinedText = () => `${truncatedText}${trailingText}`;

    if (truncationOffset) {
      const index = this.fullText.length - truncationOffset;
      [truncatedText, trailingText] = splitText(this.fullText).at(index);

      const widthCheck = `${this.ellipsis}${trailingText}`;
      if (this.checkTruncationOffsetWidth(widthCheck) === false) {
        truncatedText = trailingText;
        trailingText = '';
      }
    }

    trailingText = this.ellipsis + trailingText;
    this.setTextToCheck(combinedText());

    // let i = 0;
    // while (this.textWidth > this.availableWidth) {
    //   truncatedText = removeLastCharacter(truncatedText);
    //   this.setTextToCheck(combinedText());
    //   i++;
    // }
    // console.log('char by char', i, combinedText());
    // return combinedText();

    // let j = 0;
    let removedText = '';
    while (this.textWidth > this.availableWidth && truncatedText.length > 1) {
      // j++;
      [truncatedText, removedText] = splitText(truncatedText).inHalf();
      this.setTextToCheck(combinedText());

      while (this.textWidth < this.availableWidth && removedText.length > 1) {
        let textToAdd = removedText;
        [textToAdd, removedText] = splitText(removedText).inHalf();
        truncatedText = addText(textToAdd).atEndOf(truncatedText);
        this.setTextToCheck(combinedText());
      }
    }
    // console.log('binary', j, combinedText());

    return combinedText();
  };

  // !! THIS DOESN'T WORK !!
  truncateStartEndAtPosition = (truncationPosition: number) => {
    // If using a non-centered startEnd anchor position, we need to *build*
    // the string from scratch instead of *removing* from the full text string,
    // to make sure we don't go past the beginning or end of the text
    const removedText = splitText(this.fullText).at(truncationPosition);
    const addedText = ['', ''];

    // Ellipses are conditional - if the anchor is towards the beginning or end,
    // it's possible they shouldn't render
    const halfAvailableWidth = Math.floor(this.availableWidth / 2);

    let startingEllipsis = this.ellipsis;
    this.setTextToCheck(removedText[0]);
    if (this.textWidth <= halfAvailableWidth) {
      addedText[0] = removedText[0];
      removedText[0] = '';
      startingEllipsis = '';
    }

    let endingEllipsis = this.ellipsis;
    this.setTextToCheck(removedText[1]);
    if (this.textWidth <= halfAvailableWidth) {
      addedText[1] = removedText[1];
      removedText[1] = '';
      endingEllipsis = '';
    }

    const combinedText = () =>
      `${startingEllipsis}${addedText[0]}${addedText[1]}${endingEllipsis}`;
    this.setTextToCheck(combinedText());

    // let i = 0;
    while (
      this.textWidth <= this.availableWidth &&
      (removedText[0].length > 1 || removedText[1].length > 1)
    ) {
      // console.log('BEFORE', addedText[0], addedText[1]);
      if (startingEllipsis) {
        let textToAdd: string;
        [removedText[0], textToAdd] = splitText(removedText[0]).inHalf();
        addedText[0] = addText(textToAdd).atStartOf(addedText[0]);
      }

      if (endingEllipsis) {
        let textToAdd: string;
        [textToAdd, removedText[1]] = splitText(removedText[1]).inHalf();
        addedText[1] = addText(textToAdd).atEndOf(addedText[1]);
      }
      // console.log('DURING', addedText[0], addedText[1]);

      this.setTextToCheck(combinedText());
      // i++;

      // Remove text now
      while (
        this.textWidth > this.availableWidth &&
        (addedText[0].length > 1 || addedText[1].length > 1)
      ) {
        if (startingEllipsis) {
          [removedText[0], addedText[0]] = splitText(addedText[0]).inHalf();
          // [removedText[0], addedText[0]] = splitText(addedText[0]).at(1);
        }
        if (endingEllipsis) {
          [addedText[1], removedText[1]] = splitText(addedText[1]).inHalf();
          // [addedText[1], removedText[1]] = splitText(addedText[1]).at(
          //   addedText[1].length - 1
          // );
        }
        // console.log('AFTER', addedText[0], addedText[1]);

        this.setTextToCheck(combinedText());
        // i++;
      }
    }
    // console.log('binary', i);

    // while (this.textWidth <= this.availableWidth) {
    //   if (firstPart.length > 0) {
    //     truncatedText = `${getLastCharacter(firstPart)}${truncatedText}`;
    //     firstPart = removeLastCharacter(firstPart);
    //   } else {
    //     startingEllipsis = '';
    //   }

    //   if (secondPart.length > 0) {
    //     truncatedText = `${truncatedText}${getFirstCharacter(secondPart)}`;
    //     secondPart = removeFirstCharacter(secondPart);
    //   } else {
    //     endingEllipsis = '';
    //   }

    //   this.setTextToCheck(combinedText());
    // }

    // // Because this logic builds text outwards vs. removing inwards, the final
    // // text width ends up a little larger than the container, and we need to
    // // remove the last added character(s)
    // if (!startingEllipsis) {
    //   truncatedText = removeLastCharacter(truncatedText);
    // } else if (!endingEllipsis) {
    //   truncatedText = removeFirstCharacter(truncatedText);
    // } else {
    //   truncatedText = removeFirstAndLastCharacters(truncatedText);
    // }

    return combinedText();
  };

  truncateStartEndAtMiddle = () => {
    const removedText = ['', ''];
    let truncatedText = this.fullText;
    this.setTextToCheck(truncatedText);

    const combinedText = () =>
      `${this.ellipsis}${truncatedText}${this.ellipsis}`;

    while (this.textWidth > this.availableWidth && truncatedText.length > 1) {
      const firstFourth = Math.floor(truncatedText.length / 4);
      [removedText[0], truncatedText] =
        splitText(truncatedText).at(firstFourth);

      const lastFourth = truncatedText.length - firstFourth;
      [truncatedText, removedText[1]] = splitText(truncatedText).at(lastFourth);

      this.setTextToCheck(combinedText());

      while (
        this.textWidth < this.availableWidth &&
        removedText[0].length > 1 &&
        removedText[1].length > 1
      ) {
        const textToAdd = [...removedText];

        [removedText[0], textToAdd[0]] = splitText(removedText[0]).inHalf();
        [textToAdd[1], removedText[1]] = splitText(removedText[1]).inHalf();

        truncatedText = `${textToAdd[0]}${truncatedText}${textToAdd[1]}`;
        this.setTextToCheck(combinedText());
      }
    }

    return combinedText();
  };

  truncateMiddle = () => {
    const removedText = ['', ''];
    let [firstHalf, secondHalf] = splitText(this.fullText).inHalf();

    const combinedText = () => `${firstHalf}${this.ellipsis}${secondHalf}`;
    this.setTextToCheck(combinedText());

    while (
      this.textWidth > this.availableWidth &&
      firstHalf.length > 1 &&
      secondHalf.length > 1
    ) {
      [firstHalf, removedText[0]] = splitText(firstHalf).inHalf();
      [removedText[1], secondHalf] = splitText(secondHalf).inHalf();
      this.setTextToCheck(combinedText());

      while (
        this.textWidth < this.availableWidth &&
        removedText[0].length > 1 &&
        removedText[1].length > 1
      ) {
        const textToAdd = [...removedText];

        [textToAdd[0], removedText[0]] = splitText(removedText[0]).inHalf();
        firstHalf = addText(textToAdd[0]).atEndOf(firstHalf);

        [removedText[1], textToAdd[1]] = splitText(removedText[1]).inHalf();
        secondHalf = addText(textToAdd[1]).atStartOf(secondHalf);

        this.setTextToCheck(combinedText());
      }
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
  };

  cleanup = () => {
    this.container.removeChild(this.span);
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

const getLastCharacter = (text: string) => text.substring(text.length - 1);

const removeFirstCharacter = (text: string) => text.substring(1);

const getFirstCharacter = (text: string) => text.substring(0, 1);

const splitText = (text: string) => ({
  at: (index: number) => [text.substring(0, index), text.substring(index)],
  inHalf: () => {
    const middleIndex = Math.floor(text.length / 2);
    return [text.substring(0, middleIndex), text.substring(middleIndex)];
  },
});

const addText = (textToAdd: string) => ({
  atStartOf: (text: string) => `${textToAdd}${text}`,
  atEndOf: (text: string) => text + textToAdd,
});
