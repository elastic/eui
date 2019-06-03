import { EuiPopoverPosition } from './types';

type Dimension = 'height' | 'width';

export const POSITIONS: EuiPopoverPosition[] = [
  'top',
  'right',
  'bottom',
  'left',
];

interface BoundingBox {
  [position: string]: number;
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export interface EuiClientRect extends BoundingBox {
  height: number;
  width: number;
}

const relatedDimension: { [position in EuiPopoverPosition]: Dimension } = {
  top: 'height',
  right: 'width',
  bottom: 'height',
  left: 'width',
};

const dimensionPositionAttribute: {
  [dimension in Dimension]: 'top' | 'left'
} = {
  height: 'top',
  width: 'left',
};

const positionComplements: {
  [position in EuiPopoverPosition]: EuiPopoverPosition
} = {
  top: 'bottom',
  right: 'left',
  bottom: 'top',
  left: 'right',
};

// always resolving to top/left is taken advantage of by knowing they are the
// minimum edges of the bounding box
const positionSubstitutes: {
  [position in EuiPopoverPosition]: 'left' | 'top'
} = {
  top: 'left',
  right: 'top',
  bottom: 'left',
  left: 'top',
};

interface FindPopoverPositionArgs {
  anchor: HTMLElement;
  popover: HTMLElement;
  align?: EuiPopoverPosition;
  position: EuiPopoverPosition;
  forcePosition?: boolean;
  buffer?: number;
  offset?: number;
  allowCrossAxis?: boolean;
  container?: HTMLElement;
  arrowConfig?: { arrowWidth: number; arrowBuffer: number };
  returnBoundingBox?: boolean;
}

/**
 * Calculates the absolute positioning (relative to document.body) to place a popover element
 *
 * @param anchor {HTMLElement} Element to anchor the popover to
 * @param popover {HTMLElement} Element containing the popover content
 * @param position {string} Position the user wants. One of ["top", "right", "bottom", "left"]
 * @param [forcePosition] {boolean} If true, use only the provided `position` value and don't try any other position
 * @param [align] {string} Cross-axis alignment. One of ["top", "right", "bottom", "left"]
 * @param [buffer=16] {number} Minimum distance between the popover and the bounding container
 * @param [offset=0] {number} Distance between the popover and the anchor
 * @param [allowCrossAxis=true] {boolean} Whether to allow the popover to be positioned on the cross-axis
 * @param [container] {HTMLElement} Element the popover must be constrained to fit within
 * @param [arrowConfig] {{arrowWidth: number, arrowBuffer: number}} If
 *  present, describes the size & constraints for an arrow element, and the
 *  function return value will include an `arrow` param with position details
 *
 * @returns {{
 *   top: number,
 *   left: number,
 *   position: string,
 *   fit: number,
 *   arrow?: {left: number, top: number}
 * } | null} absolute page coordinates for the popover, and the
 *  placements's relation to the anchor; if there's no room this returns null
 */
export function findPopoverPosition({
  anchor,
  popover,
  align,
  position,
  forcePosition,
  buffer = 16,
  offset = 0,
  allowCrossAxis = true,
  container,
  arrowConfig,
  returnBoundingBox,
}: FindPopoverPositionArgs) {
  // find the screen-relative bounding boxes of the anchor, popover, and container
  const anchorBoundingBox = getElementBoundingBox(anchor);
  const popoverBoundingBox = getElementBoundingBox(popover);

  // calculate the window's bounds
  // window.(innerWidth|innerHeight) do not account for scrollbars
  // so prefer the clientWidth/clientHeight of the DOM if available
  const documentWidth =
    document.documentElement.clientWidth || window.innerWidth;
  const documentHeight =
    document.documentElement.clientHeight || window.innerHeight;
  const windowBoundingBox: EuiClientRect = {
    top: 0,
    right: documentWidth,
    bottom: documentHeight,
    left: 0,
    height: documentHeight,
    width: documentWidth,
  };

  // if no container element is given fall back to using the window viewport
  const containerBoundingBox = container
    ? getElementBoundingBox(container)
    : windowBoundingBox;

  /**
   * `position` was specified by the function caller and is a strong hint
   * as to the preferred location of the popover relative to the anchor.
   * However, we strongly prefer showing all of the popover content within
   * the window+container boundary and will iterate over the four
   * possible sides until a perfect fit is located. If none of the locations
   * fully contain popover, the location with the best fit is selected.
   *
   * This approach first checks the preferred `position`, then its opposite
   * along the same axis, next a location on the cross-axis, and finally it
   * tests the remaining position.
   *
   * e.g.
   * if position = "top" the order is top, bottom, left right
   * if position = "right" the order is right, left, top, bottom
   */

  // Try the user-desired position first.
  const iterationPositions = [position];
  // keep user-defined alignment in the original positions.
  const iterationAlignments: Array<undefined | EuiPopoverPosition> = [align];

  if (forcePosition !== true) {
    iterationPositions.push(positionComplements[position]); // Try the complementary position.
    iterationAlignments.push(align); // keep user-defined alignment in the complementary position.

    if (allowCrossAxis) {
      iterationPositions.push(
        positionSubstitutes[position], // Switch to the cross axis.
        positionComplements[positionSubstitutes[position]] // Try the complementary position on the cross axis.
      );
      iterationAlignments.push(undefined, undefined); // discard desired alignment on cross-axis
    }
  } else {
    // position is forced, if it conficts with the alignment then reset align to `null`
    // e.g. original placement request for `downLeft` is moved to the `left` side, future calls
    // will position and align `left`, and `leftLeft` is not a valid placement
    if (
      position === align ||
      (align !== undefined && position === positionComplements[align])
    ) {
      iterationAlignments[0] = undefined;
    }
  }

  let bestFit = -Infinity;
  let bestPosition = null;

  for (let idx = 0; idx < iterationPositions.length; idx++) {
    const iterationPosition = iterationPositions[idx];

    // See if we can find a position with a better fit than we've found so far.
    const screenCoordinates = getPopoverScreenCoordinates({
      position: iterationPosition,
      align: iterationAlignments[idx],
      anchorBoundingBox,
      popoverBoundingBox,
      windowBoundingBox,
      containerBoundingBox,
      offset,
      buffer,
      arrowConfig,
    });

    if (screenCoordinates.fit > bestFit) {
      bestFit = screenCoordinates.fit;
      bestPosition = {
        fit: screenCoordinates.fit,
        position: iterationPosition,
        top: screenCoordinates.top + window.pageYOffset,
        left: screenCoordinates.left + window.pageXOffset,
        arrow: screenCoordinates.arrow,
      };

      // If we've already found the ideal fit, use that position.
      if (bestFit === 1) {
        break;
      }
    }

    // If we haven't improved the fit, then continue on and try a new position.
  }

  return returnBoundingBox
    ? { ...bestPosition, anchorBoundingBox: { ...anchorBoundingBox } }
    : bestPosition;
}

interface GetPopoverScreenCoordinatesArgs {
  position: EuiPopoverPosition;
  align?: EuiPopoverPosition;
  anchorBoundingBox: EuiClientRect;
  popoverBoundingBox: EuiClientRect;
  windowBoundingBox: EuiClientRect;
  containerBoundingBox: EuiClientRect;
  arrowConfig?: { arrowWidth: number; arrowBuffer: number };
  offset?: number;
  buffer?: number;
}

/**
 * Given a target position and the popover's surrounding context, returns either an
 * object with {top, left} screen coordinates or `null` if it's not possible to show
 * content in the target position
 * @param position {string} the target position, one of ["top", "right", "bottom", "left"]
 * @param align {string} target alignment on the cross-axis, one of ["top", "right", "bottom", "left"]
 * @param anchorBoundingBox {Object} bounding box of the anchor element
 * @param popoverBoundingBox {Object} bounding box of the popover element
 * @param windowBoundingBox {Object} bounding box of the window
 * @param containerBoundingBox {Object} bounding box of the container
 * @param [arrowConfig] {{arrowWidth: number, arrowBuffer: number}} If present, describes the size &
 *  constraints for an arrow element, and the function return value will include an `arrow` param
 *  with position details
 * @param [offset=0] {number} Distance between the popover and the anchor
 * @param [buffer=0] {number} Minimum distance between the popover's
 *  placement and the container edge
 *
 * @returns {{top: number, left: number, relativePlacement: string, fit:
 * number, arrow?: {top: number, left: number}}|null}
 *  object with top/left coordinates, the popover's relative position to the anchor, and how well the
 *  popover fits in the location (0.0 -> 1.0) oordinates and the popover's relative position, if
 *  there is no room in this placement then null
 */
export function getPopoverScreenCoordinates({
  position,
  align,
  anchorBoundingBox,
  popoverBoundingBox,
  windowBoundingBox,
  containerBoundingBox,
  arrowConfig,
  offset = 0,
  buffer = 0,
}: GetPopoverScreenCoordinatesArgs) {
  /**
   * The goal is to find the best way to align the popover content
   * on the given side of the anchor element. The popover prefers
   * centering on the anchor but can shift along the cross-axis as needed.
   *
   * We return the top/left coordinates that best fit the popover inside
   * the given boundaries, and also return the `fit` value which indicates
   * what percentage of the popover is within the bounds.
   *
   * e.g. finding a location when position=top
   * the preferred location is directly over the anchor
   *
   *        +----------------------+
   *        |       popover        |
   *        +----------------------+
   *                   v
   *            +--------------+
   *            |    anchor    |
   *            +--------------+
   *
   * but if anchor doesn't have much (or any) room on its ride side
   * the popover will shift to the left
   *
   *    +----------------------+
   *    |       popover        |
   *    +----------------------+
   *                   v
   *            +--------------+
   *            |    anchor    |
   *            +--------------+
   *
   */

  const crossAxisFirstSide = positionSubstitutes[position]; // "top" -> "left"
  const crossAxisSecondSide = positionComplements[crossAxisFirstSide]; // "left" -> "right"
  const crossAxisDimension = relatedDimension[crossAxisFirstSide]; // "left" -> "width"

  const { crossAxisPosition, crossAxisArrowPosition } = getCrossAxisPosition({
    crossAxisFirstSide,
    crossAxisSecondSide,
    crossAxisDimension,
    position,
    align,
    buffer,
    offset,
    windowBoundingBox,
    containerBoundingBox,
    popoverBoundingBox,
    anchorBoundingBox,
    arrowConfig,
  });

  const primaryAxisDimension = relatedDimension[position]; // "top" -> "height"
  const primaryAxisPositionName =
    dimensionPositionAttribute[primaryAxisDimension]; // "height" -> "top"

  const {
    primaryAxisPosition,
    primaryAxisArrowPosition,
  } = getPrimaryAxisPosition({
    position,
    offset,
    popoverBoundingBox,
    anchorBoundingBox,
    arrowConfig,
  });

  const popoverPlacement = {
    [crossAxisFirstSide]: crossAxisPosition,
    [primaryAxisPositionName]: primaryAxisPosition,
  };

  // calculate the fit of the popover in this location
  // fit is in range 0.0 -> 1.0 and is the percentage of the popover which is visible in this location
  const combinedBoundingBox = intersectBoundingBoxes(
    windowBoundingBox,
    containerBoundingBox
  );

  // shrink the visible bounding box by `buffer`
  // to compute a fit value
  combinedBoundingBox.top += buffer;
  combinedBoundingBox.right -= buffer;
  combinedBoundingBox.bottom -= buffer;
  combinedBoundingBox.left += buffer;

  const fit = getVisibleFit(
    {
      top: popoverPlacement.top,
      right: popoverPlacement.left + popoverBoundingBox.width,
      bottom: popoverPlacement.top + popoverBoundingBox.height,
      left: popoverPlacement.left,
      width: popoverBoundingBox.width,
      height: popoverBoundingBox.height,
    },
    combinedBoundingBox
  );

  const arrow = arrowConfig
    ? {
        [crossAxisFirstSide]:
          crossAxisArrowPosition! - popoverPlacement[crossAxisFirstSide],
        [primaryAxisPositionName]: primaryAxisArrowPosition,
      }
    : undefined;

  return {
    fit,
    top: popoverPlacement.top,
    left: popoverPlacement.left,
    arrow,
  };
}

interface GetCrossAxisPositionArgs {
  crossAxisFirstSide: EuiPopoverPosition;
  crossAxisSecondSide: EuiPopoverPosition;
  crossAxisDimension: Dimension;
  position: EuiPopoverPosition;
  align?: EuiPopoverPosition;
  buffer: number;
  offset: number;
  windowBoundingBox: EuiClientRect;
  containerBoundingBox: EuiClientRect;
  popoverBoundingBox: EuiClientRect;
  anchorBoundingBox: EuiClientRect;
  arrowConfig?: { arrowWidth: number; arrowBuffer: number };
}

interface CrossAxisPosition {
  crossAxisPosition: number;
  crossAxisArrowPosition: number | undefined;
}

function getCrossAxisPosition({
  crossAxisFirstSide,
  crossAxisSecondSide,
  crossAxisDimension,
  position,
  align,
  buffer,
  offset,
  windowBoundingBox,
  containerBoundingBox,
  popoverBoundingBox,
  anchorBoundingBox,
  arrowConfig,
}: GetCrossAxisPositionArgs): CrossAxisPosition {
  // how much of the popover overflows past either side of the anchor if its centered
  const popoverSizeOnCrossAxis = popoverBoundingBox[crossAxisDimension];
  const anchorSizeOnCrossAxis = anchorBoundingBox[crossAxisDimension];
  const anchorHalfSize = anchorSizeOnCrossAxis / 2;

  // the popover's original position on the cross-axis is determined by:
  const crossAxisPositionOriginal =
    anchorBoundingBox[crossAxisFirstSide] + // where the anchor is located
    anchorHalfSize - // plus half anchor dimension
    popoverSizeOnCrossAxis / 2; // less half the popover dimension

  // To fit the content within both the window and container,
  // compute the smaller of the two spaces along each edge
  const combinedBoundingBox = intersectBoundingBoxes(
    windowBoundingBox,
    containerBoundingBox
  );
  const availableSpace = getAvailableSpace(
    anchorBoundingBox,
    combinedBoundingBox,
    buffer,
    offset,
    position
  );
  const minimumSpace = arrowConfig ? arrowConfig.arrowBuffer : 0;

  const contentOverflowSize =
    (popoverSizeOnCrossAxis - anchorSizeOnCrossAxis) / 2;

  let alignAmount = 0;
  let alignDirection = 1;
  let amountOfShiftNeeded = 0;
  let shiftDirection = 1;

  if (align != null) {
    // no alignment, find how much the container boundary requires the content to shift
    alignDirection = align === 'top' || align === 'left' ? 1 : -1;
    alignAmount = contentOverflowSize;

    const alignedOverflowAmount = contentOverflowSize + alignAmount;
    const needsShift =
      alignedOverflowAmount > availableSpace[positionComplements[align]];
    amountOfShiftNeeded = needsShift
      ? alignedOverflowAmount - availableSpace[positionComplements[align]]
      : 0;
    shiftDirection = -1 * alignDirection;
  } else {
    // shifting the popover to one side may yield a better fit
    const spaceAvailableOnFirstSide = availableSpace[crossAxisFirstSide];
    const spaceAvailableOnSecondSide = availableSpace[crossAxisSecondSide];

    const isShiftTowardFirstSide =
      spaceAvailableOnFirstSide > spaceAvailableOnSecondSide;
    shiftDirection = isShiftTowardFirstSide ? -1 : 1;

    // determine which direction has more room and the popover should shift to
    const leastAvailableSpace = Math.min(
      spaceAvailableOnFirstSide,
      spaceAvailableOnSecondSide
    );

    const needsShift = contentOverflowSize > leastAvailableSpace;
    amountOfShiftNeeded = needsShift
      ? contentOverflowSize - leastAvailableSpace
      : 0;
  }

  // shift over the popover if necessary
  const shiftAmount = amountOfShiftNeeded * shiftDirection;
  let crossAxisPosition =
    crossAxisPositionOriginal + shiftAmount + alignAmount * alignDirection;

  // if an `arrowConfig` is specified, find where to position the arrow
  let crossAxisArrowPosition;
  if (arrowConfig) {
    const { arrowWidth } = arrowConfig;
    crossAxisArrowPosition =
      anchorBoundingBox[crossAxisFirstSide] + anchorHalfSize - arrowWidth / 2;

    // make sure there's enough buffer around the arrow
    // by calculating how how much the arrow would need to move
    // but instead of moving the arrow, shift the popover content
    if (crossAxisArrowPosition < crossAxisPosition + minimumSpace) {
      // arrow is too close to the minimum side
      const difference =
        crossAxisPosition + minimumSpace - crossAxisArrowPosition;
      crossAxisPosition -= difference;
    } else if (
      crossAxisArrowPosition + minimumSpace + arrowWidth >
      crossAxisPosition + popoverSizeOnCrossAxis
    ) {
      // arrow is too close to the maximum side
      const edge = crossAxisPosition + popoverSizeOnCrossAxis;
      const difference =
        crossAxisArrowPosition - (edge - minimumSpace - arrowWidth);
      crossAxisPosition += difference;
    }
  }

  return {
    crossAxisPosition,
    crossAxisArrowPosition,
  };
}

interface GetPrimaryAxisPositionArgs {
  position: EuiPopoverPosition;
  offset: number;
  popoverBoundingBox: BoundingBox;
  anchorBoundingBox: BoundingBox;
  arrowConfig?: { arrowWidth: number; arrowBuffer: number };
}

function getPrimaryAxisPosition({
  position,
  offset,
  popoverBoundingBox,
  anchorBoundingBox,
  arrowConfig,
}: GetPrimaryAxisPositionArgs) {
  // if positioning to the top or left, the target position decreases
  // from the anchor's top or left, otherwise the position adds to the anchor's
  const isOffsetDecreasing = position === 'top' || position === 'left';

  const primaryAxisDimension = relatedDimension[position]; // "top" -> "height"
  const popoverSizeOnPrimaryAxis = popoverBoundingBox[primaryAxisDimension];

  // start at the top or left edge of the anchor element
  const primaryAxisPositionName =
    dimensionPositionAttribute[primaryAxisDimension]; // "height" -> "top"
  const anchorEdgeOrigin = anchorBoundingBox[primaryAxisPositionName];

  // find the popover position on the primary axis
  const anchorSizeOnPrimaryAxis = anchorBoundingBox[primaryAxisDimension];
  const primaryAxisOffset = isOffsetDecreasing
    ? popoverSizeOnPrimaryAxis
    : anchorSizeOnPrimaryAxis;
  const contentOffset =
    (offset + primaryAxisOffset!) * (isOffsetDecreasing ? -1 : 1);
  const primaryAxisPosition = anchorEdgeOrigin + contentOffset;

  let primaryAxisArrowPosition;

  if (arrowConfig) {
    primaryAxisArrowPosition = isOffsetDecreasing
      ? popoverSizeOnPrimaryAxis
      : 0;
  }

  return {
    primaryAxisPosition,
    primaryAxisArrowPosition,
  };
}

/**
 * Finds the client pixel coordinate of each edge for the element's bounding box,
 * and the bounding box's width & height
 *
 * @param {HTMLElement} element
 * @returns {{top: number, right: number, bottom: number, left: number, height: number, width: number}}
 */
export function getElementBoundingBox(element: HTMLElement): EuiClientRect {
  const rect = element.getBoundingClientRect();
  return {
    top: rect.top,
    right: rect.right,
    bottom: rect.bottom,
    left: rect.left,
    height: rect.height,
    width: rect.width,
  };
}

/**
 * Calculates the available content space between anchor and container
 *
 * @param {Object} anchorBoundingBox Client bounding box of the anchor element
 * @param {Object} containerBoundingBox Client bounding box of the container element
 * @param {number} buffer Minimum distance between the popover and the bounding container
 * @param {number} offset Distance between the popover and the anchor
 * @param {string} offsetSide Side the offset needs to be applied to, one
 *  of ["top", "right", "bottom", "left"]
 * @returns {{top: number, right: number, bottom: number, left: number}}
 */
export function getAvailableSpace(
  anchorBoundingBox: BoundingBox,
  containerBoundingBox: BoundingBox,
  buffer: number,
  offset: number,
  offsetSide: EuiPopoverPosition
): BoundingBox {
  return {
    top:
      anchorBoundingBox.top -
      containerBoundingBox.top -
      buffer -
      (offsetSide === 'top' ? offset : 0),
    right:
      containerBoundingBox.right -
      anchorBoundingBox.right -
      buffer -
      (offsetSide === 'right' ? offset : 0),
    bottom:
      containerBoundingBox.bottom -
      anchorBoundingBox.bottom -
      buffer -
      (offsetSide === 'bottom' ? offset : 0),
    left:
      anchorBoundingBox.left -
      containerBoundingBox.left -
      buffer -
      (offsetSide === 'left' ? offset : 0),
  };
}

/**
 * Computes the fit (overlap) of the content within the container, fit is in range 0.0 => 1.0
 * @param contentBoundingBox bounding box of content to calculate fit for
 * @param containerBoundingBox bounding box of container
 * @returns {number}
 */
export function getVisibleFit(
  contentBoundingBox: BoundingBox,
  containerBoundingBox: BoundingBox
): number {
  const intersection = intersectBoundingBoxes(
    contentBoundingBox,
    containerBoundingBox
  );

  if (
    intersection.left > intersection.right ||
    intersection.top > intersection.top
  ) {
    // there is no intersection, the boxes are completely separated on at least one axis
    return 0;
  }

  const intersectionArea =
    (intersection.right - intersection.left) *
    (intersection.bottom - intersection.top);
  const contentArea =
    (contentBoundingBox.right - contentBoundingBox.left) *
    (contentBoundingBox.bottom - contentBoundingBox.top);

  return intersectionArea / contentArea;
}

/**
 * Calculates the intersection space between two bounding boxes
 *
 * @param firstBox
 * @param secondBox
 * @returns {EuiClientRect}
 */
export function intersectBoundingBoxes(
  firstBox: BoundingBox,
  secondBox: BoundingBox
): EuiClientRect {
  const top = Math.max(firstBox.top, secondBox.top);
  const right = Math.min(firstBox.right, secondBox.right);
  const bottom = Math.min(firstBox.bottom, secondBox.bottom);
  const left = Math.max(firstBox.left, secondBox.left);
  const height = Math.max(bottom - top, 0);
  const width = Math.max(right - left, 0);

  return {
    top,
    right,
    bottom,
    left,
    height,
    width,
  };
}

/**
 * Returns the top-most defined z-index in the element's ancestor hierarchy
 * relative to the `target` element; if no z-index is defined, returns "0"
 * @param element {HTMLElement}
 * @param cousin {HTMLElement}
 * @returns {string}
 */
export function getElementZIndex(
  element: HTMLElement,
  cousin: HTMLElement
): string {
  /**
   * finding the z-index of `element` is not the full story
   * its the CSS stacking context that is important
   * take this DOM for example:
   * body
   *   section[z-index: 1000]
   *     p[z-index: 500]
   *       button
   *   div
   *
   * what z-index does the `div` need to display next to `button`?
   * the `div` and `section` are where the stacking context splits
   * so `div` needs to copy `section`'s z-index in order to
   * appear next to / over `button`
   *
   * calculate this by starting at `button` and finding its offsetParents
   * then walk the parents from top -> down until the stacking context
   * split is found, or if there is no split then a specific z-index is unimportant
   */

  // build the array of the element + its offset parents
  const nodesToInspect: HTMLElement[] = [];
  while (true) {
    nodesToInspect.push(element);

    // AFAICT this is a valid cast - the libdefs appear wrong
    element = element.offsetParent as HTMLElement;

    // stop if there is no parent
    if (element == null) {
      break;
    }

    // stop if the parent contains the related element
    // as this is the z-index ancestor
    if (element.contains(cousin)) {
      break;
    }
  }

  // reverse the nodes to walk from top -> element
  nodesToInspect.reverse();

  for (const node of nodesToInspect) {
    // get this node's z-index css value
    const zIndex = window.document
      .defaultView!.getComputedStyle(node)
      .getPropertyValue('z-index');

    // if the z-index is not a number (e.g. "auto") return null, else the value
    if (!isNaN(parseInt(zIndex, 10))) {
      return zIndex;
    }
  }

  return '0';
}
