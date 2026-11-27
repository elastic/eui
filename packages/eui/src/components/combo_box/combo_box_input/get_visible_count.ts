/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

export interface GetVisibleCountArgs {
  /** Natural (unshrunk) width of every pill, in selection order */
  widths: number[];
  /** Width available for pills, the "+N" badge and the input */
  available: number;
  /** Gap between the items of the row */
  gap: number;
  /** Width of the "+N" badge, reserved when some pills are hidden */
  badgeWidth: number;
  /** Width reserved for the search input */
  inputWidth: number;
  /** The narrowest the last visible pill may be truncated to */
  pillMinWidth: number;
}

/**
 * Works out how many pills to show in a single row (`selectionDisplay="collapse"`).
 * All but the last visible pill are shown in full. The last one may be
 * truncated to use the remaining space, as long as it stays at least
 * `pillMinWidth` wide (or fits in full). The rest are hidden behind "+N".
 */
export const getVisibleCount = ({
  widths,
  available,
  gap,
  badgeWidth,
  inputWidth,
  pillMinWidth,
}: GetVisibleCountArgs): number => {
  const total = widths.length;

  const prefixWidths = [0];
  widths.forEach((width) => {
    prefixWidths.push(prefixWidths[prefixWidths.length - 1] + width);
  });

  for (let count = total; count >= 1; count--) {
    const hasHiddenOptions = count < total;
    // Every pill and the badge are followed by a gap
    const gaps = gap * (count + Number(hasHiddenOptions));
    const spaceForLastPill =
      available -
      prefixWidths[count - 1] -
      (hasHiddenOptions ? badgeWidth : 0) -
      gaps -
      inputWidth;

    if (spaceForLastPill >= Math.min(widths[count - 1], pillMinWidth)) {
      return count;
    }
  }

  return 0;
};
