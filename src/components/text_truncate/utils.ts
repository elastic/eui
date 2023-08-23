/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

type Params = {
  fullText: string;
  ellipsis: string;
  availableWidth: number;
  container: HTMLElement;
};

export class TruncationUtils {
  fullText: Params['fullText'];
  ellipsis: Params['ellipsis'];
  availableWidth: Params['availableWidth'];
  container: Params['container'];
  span: HTMLSpanElement;

  constructor({ fullText, ellipsis, availableWidth, container }: Params) {
    this.fullText = fullText;
    this.ellipsis = ellipsis;
    this.availableWidth = availableWidth;
    this.container = container;

    // Create a temporary DOM element for manipulating text and determining text width
    this.span = document.createElement('span');
    this.container.appendChild(this.span);
  }

  /**
   * Span utils
   */

  get textWidth() {
    return this.span.offsetWidth;
  }

  setTextToCheck = (text: string) => {
    this.span.textContent = text;
  };

  cleanup = () => {
    this.container.removeChild(this.span);
  };

  /**
   * Early return checks
   */

  checkIfTruncationIsNeeded = () => {
    this.setTextToCheck(this.fullText);

    if (this.availableWidth > this.textWidth) {
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

  /**
   * Truncation enums
   */

  truncateStart = (truncationOffset: number) => {
    let truncatedText = this.fullText;
    let leadingText = '';
    const combinedText = () => `${leadingText}${truncatedText}`;

    if (truncationOffset) {
      [leadingText, truncatedText] = splitText(this.fullText).at(
        truncationOffset
      );
      // TODO: offset width check
    }

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
    const combinedText = () => `${truncatedText}${trailingText}`;

    if (truncationOffset) {
      const index = this.fullText.length - truncationOffset;
      [truncatedText, trailingText] = splitText(this.fullText).at(index);
      // TODO: offset width check
    }

    trailingText = this.ellipsis + trailingText;
    this.setTextToCheck(combinedText());

    while (this.textWidth > this.availableWidth) {
      truncatedText = removeLastCharacter(truncatedText);
      this.setTextToCheck(combinedText());
    }

    return combinedText();
  };

  truncateStartEndAtPosition = (truncationPosition: number) => {
    // If using a non-centered startEnd anchor position, we need to *build*
    // the string from scratch instead of *removing* from the full text string,
    // to make sure we don't go past the beginning or end of the text
    let truncatedText = '';
    this.setTextToCheck(truncatedText);

    // Ellipses are conditional - if the anchor is towards the beginning or end,
    // it's possible they shouldn't render
    let startingEllipsis = this.ellipsis;
    let endingEllipsis = this.ellipsis;

    // Split the text into two at the anchor position
    let [firstPart, secondPart] = splitText(this.fullText).at(
      truncationPosition
    );

    const combinedText = () =>
      `${startingEllipsis}${truncatedText}${endingEllipsis}`;

    while (this.textWidth <= this.availableWidth) {
      if (firstPart.length > 0) {
        truncatedText = `${getLastCharacter(firstPart)}${truncatedText}`;
        firstPart = removeLastCharacter(firstPart);
      } else {
        startingEllipsis = '';
      }

      if (secondPart.length > 0) {
        truncatedText = `${truncatedText}${getFirstCharacter(secondPart)}`;
        secondPart = removeFirstCharacter(secondPart);
      } else {
        endingEllipsis = '';
      }

      this.setTextToCheck(combinedText());
    }

    // Because this logic builds text outwards vs. removes inwards, the final text
    // width ends up a little larger than the container, and we need to remove
    // the last added character(s)
    if (!startingEllipsis) {
      truncatedText = removeLastCharacter(truncatedText);
    } else if (!endingEllipsis) {
      truncatedText = removeFirstCharacter(truncatedText);
    } else {
      truncatedText = removeFirstAndLastCharacters(truncatedText);
    }

    return combinedText();
  };

  truncateStartEndAtMiddle = () => {
    let truncatedText = this.fullText;
    this.setTextToCheck(truncatedText);

    const combinedText = () =>
      `${this.ellipsis}${truncatedText}${this.ellipsis}`;

    while (this.textWidth > this.availableWidth) {
      truncatedText = removeFirstAndLastCharacters(truncatedText);
      this.setTextToCheck(combinedText());
    }

    return combinedText();
  };

  truncateMiddle = () => {
    const middlePosition = Math.floor(this.fullText.length / 2);
    let [firstHalf, secondHalf] = splitText(this.fullText).at(middlePosition);
    let trimfirstHalf;

    const combinedText = () => `${firstHalf}${this.ellipsis}${secondHalf}`;
    this.setTextToCheck(combinedText());

    while (this.textWidth > this.availableWidth) {
      trimfirstHalf = !trimfirstHalf;
      if (trimfirstHalf) {
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
 * DRY character utils
 */
const removeLastCharacter = (text: string) =>
  text.substring(0, text.length - 1);

const getLastCharacter = (text: string) => text.substring(text.length - 1);

const removeFirstCharacter = (text: string) => text.substring(1);

const getFirstCharacter = (text: string) => text.substring(0, 1);

const removeFirstAndLastCharacters = (text: string) =>
  text.substring(1, text.length - 1);

const splitText = (text: string) => ({
  at: (index: number) => [text.substring(0, index), text.substring(index)],
});
