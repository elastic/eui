/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  HTMLAttributes,
  FunctionComponent,
  ReactNode,
  Ref,
  useState,
  useMemo,
  useCallback,
} from 'react';

import { useCombinedRefs } from '../../services';
import {
  EuiResizeObserver,
  EuiResizeObserverProps,
} from '../observer/resize_observer';
import type { CommonProps } from '../common';

import { euiTextTruncateStyles } from './text_truncate.styles';

const TRUNCATION_TYPES = ['end', 'start', 'startEnd', 'middle'] as const;
export type EuiTextTruncationTypes = (typeof TRUNCATION_TYPES)[number];

export type EuiTextTruncateProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  'children' | 'onResize'
> &
  CommonProps & {
    /**
     * The full text string to truncate
     */
    text: string;
    /**
     * The truncation type desired. Determines where the ellipses are placed.
     */
    truncation?: EuiTextTruncationTypes;
    /**
     * This prop **only** applies to the `start` and `end` truncation types.
     * It allows preserving a certain number of characters of either the
     * starting or ending text.
     *
     * If the passed offset is greater than half of the total text length,
     * the truncation will simply default to `middle` instead.
     */
    truncationOffset?: number;
    /**
     * This prop **only** applies to the `startEnd` truncation type.
     * It allows customizing the anchor position of the displayed text,
     * which otherwise defaults to the middle of the text string.
     *
     * The primary use case for this prop for is search highlighting - e.g., if
     * a user searches for a specific word in the text, pass the index of that
     * found word to ensure it is always visible.
     *
     * This behavior will intelligently detect when positions are close to the start
     * or end of the text, and omit leading or trailing ellipses when necessary.
     * If the passed position is greater than the total text length,
     * the truncation will simply default to `start` instead.
     */
    truncationPosition?: number;
    /**
     * Defaults to the horizontal ellipsis character.
     * Can be optionally configured to use other punctuation,
     * e.g. spaces, brackets, hyphens, asterisks, etc.
     */
    ellipsis?: string;
    /**
     * By default, EuiTextTruncate will render a resize observer to detect the
     * available width it has. For performance reasons (e.g. multiple truncated
     * text items within the same container), you may opt to pass in your own
     * container width, which will skip initializing a resize observer.
     */
    width?: number;
    /**
     * Optional callback that fires when the default resizer observer both mounts and
     * registers a size change. This callback will **not** fire if `width` is passed.
     */
    onResize?: (width: number) => void;
    /**
     * By default, EuiTextTruncate will render the truncated string directly.
     * You can optionally pass a render prop function to the component, which
     * allows for more flexible text rendering, e.g. adding custom markup
     * or highlighting
     */
    children?: (truncatedString: string) => ReactNode;
  };

export const EuiTextTruncate: FunctionComponent<EuiTextTruncateProps> = ({
  width,
  ...props
}) => {
  return width != null ? (
    <EuiTextTruncateWithWidth width={width} {...props} />
  ) : (
    <EuiTextTruncateWithResizeObserver {...props} />
  );
};

const EuiTextTruncateWithWidth: FunctionComponent<
  Omit<EuiTextTruncateProps, 'onResize'> & {
    width: number;
    containerRef?: Ref<HTMLDivElement>;
  }
> = ({
  width,
  children,
  text,
  truncation: _truncation = 'end',
  truncationOffset: _truncationOffset = 0,
  truncationPosition,
  ellipsis = '…',
  containerRef,
  ...rest
}) => {
  // Note: This needs to be a state and not a ref to trigger a rerender on mount
  const [containerEl, setContainerEl] = useState<HTMLDivElement | null>(null);
  const refs = useCombinedRefs([setContainerEl, containerRef]);

  // Handle exceptions where we need to override the passed props
  const { truncation, truncationOffset } = useMemo(() => {
    let truncation = _truncation;
    let truncationOffset = 0;

    if (_truncation === 'end' || _truncation === 'start') {
      const offsetIsTooLarge = _truncationOffset >= Math.floor(text.length / 2);
      if (offsetIsTooLarge) {
        truncation = 'middle';
      } else {
        truncationOffset = _truncationOffset > 0 ? _truncationOffset : 0; // Negative offsets cause infinite loops
      }
    } else if (_truncation === 'startEnd' && truncationPosition != null) {
      if (truncationPosition <= 0) {
        truncation = 'end';
      } else if (truncationPosition >= text.length) {
        truncation = 'start';
      }
    }
    return { truncation, truncationOffset };
  }, [_truncation, _truncationOffset, truncationPosition, text.length]);

  const truncatedText = useMemo(() => {
    if (!containerEl || !width) return '';

    // Create a temporary DOM element for manipulating text and determining text width
    const span = document.createElement('span');
    containerEl.appendChild(span);

    // Check to make sure the container width can even fit the ellipsis, let alone text
    span.textContent =
      truncation === 'startEnd' // startEnd needs a little more space
        ? `${ellipsis} ${ellipsis}`
        : ellipsis;
    if (span.offsetWidth >= width * 0.9) {
      console.error(
        'The truncation ellipsis is larger than the available width. No text can be rendered.'
      );
      containerEl.removeChild(span);
      return '';
    }

    span.textContent = text;

    // Check if we need to truncate at all
    if (width > span.offsetWidth) {
      containerEl.removeChild(span);
      return text;
    }

    const substringOffset = truncationOffset + ellipsis.length + 1;

    switch (truncation) {
      case 'end':
        const endPosition = text.length - truncationOffset;
        const endOffset = span.textContent.substring(endPosition);
        const endRemaining = span.textContent.substring(0, endPosition);

        // Make sure that the offset alone isn't larger than the actual available width
        span.textContent = `${ellipsis}${endOffset}`;
        if (span.offsetWidth > width) {
          // There isn't a super great way to handle this visually.
          // The best we can do is simply render the broken truncation
          console.error(
            `The passed truncationOffset of ${truncationOffset} is too large for available width.`
          );
          break;
        }
        span.textContent = `${endRemaining}${ellipsis}${endOffset}`;

        while (span.offsetWidth > width) {
          const offset = span.textContent.length - substringOffset;
          const trimmedText = span.textContent.substring(0, offset);
          span.textContent = `${trimmedText}${ellipsis}${endOffset}`;
        }
        break;

      case 'start':
        const startOffset = span.textContent.substring(0, truncationOffset);
        const startRemaining = span.textContent.substring(truncationOffset);

        // Make sure that the offset alone isn't larger than the actual available width
        span.textContent = `${startOffset}${ellipsis}`;
        if (span.offsetWidth > width) {
          // There isn't a super great way to handle this visually.
          // The best we can do is simply render the broken truncation
          console.error(
            `The passed truncationOffset of ${truncationOffset} is too large for available width.`
          );
          break;
        }
        span.textContent = `${startOffset}${ellipsis}${startRemaining}`;

        while (span.offsetWidth > width) {
          const trimmedText = span.textContent.substring(substringOffset);
          span.textContent = `${startOffset}${ellipsis}${trimmedText}`;
        }
        break;

      case 'startEnd':
        if (truncationPosition == null) {
          while (span.offsetWidth > width) {
            const trimmedMiddle = span.textContent.substring(
              substringOffset,
              span.textContent.length - substringOffset
            );
            span.textContent = `${ellipsis}${trimmedMiddle}${ellipsis}`;
          }
        } else {
          // If using a non-centered startEnd anchor position, we need to *build*
          // the string from scratch instead of *removing* from the full text string,
          // to make sure we don't go past the beginning or end of the text
          let builtText = '';
          span.textContent = builtText;

          // Ellipses are conditional - if the anchor is towards the beginning or end,
          // it's possible they shouldn't render
          let startingEllipsis = ellipsis;
          let endingEllipsis = ellipsis;

          // Split the text into two at the anchor position
          let firstPart = text.substring(0, truncationPosition);
          let secondPart = text.substring(truncationPosition);

          while (span.offsetWidth <= width) {
            // Because this logic builds text outwards vs. removes inwards, the final text
            // width ends up a little larger than the container if we don't add this catch
            const previousText = span.textContent;
            span.textContent = `${startingEllipsis}${builtText}${endingEllipsis}`;
            if (span.offsetWidth > width) {
              span.textContent = previousText;
              break;
            }

            if (firstPart.length > 0) {
              // Split off and prepend the last character of the first part
              const lastChar = firstPart.length - 1;
              builtText = `${firstPart.substring(lastChar)}${builtText}`;
              firstPart = firstPart.substring(0, lastChar);
            } else {
              startingEllipsis = '';
            }

            if (secondPart.length > 0) {
              // Split off and append first character of the second part
              builtText = `${builtText}${secondPart.substring(0, 1)}`;
              secondPart = secondPart.substring(1);
            } else {
              endingEllipsis = '';
            }
          }
        }
        break;

      case 'middle':
        const middlePosition = Math.floor(text.length / 2);
        let firstHalf = text.substring(0, middlePosition);
        let secondHalf = text.substring(middlePosition);
        let trimfirstHalf = true;

        while (span.offsetWidth > width) {
          if (trimfirstHalf) {
            firstHalf = firstHalf.substring(0, firstHalf.length - 1);
          } else {
            secondHalf = secondHalf.substring(1);
          }
          span.textContent = `${firstHalf}${ellipsis}${secondHalf}`;
          trimfirstHalf = !trimfirstHalf;
        }
        break;
    }

    const truncatedText = span.textContent;
    containerEl.removeChild(span);

    return truncatedText;
  }, [
    width,
    text,
    truncation,
    truncationOffset,
    truncationPosition,
    ellipsis,
    containerEl,
  ]);

  const isTruncating = truncatedText !== text;

  return (
    <div
      css={euiTextTruncateStyles.euiTextTruncate}
      ref={refs}
      title={isTruncating ? text : undefined}
      {...rest}
    >
      {isTruncating ? (
        <>
          <span
            css={euiTextTruncateStyles.truncatedText}
            aria-hidden
            data-test-subj="truncatedText"
          >
            {children ? children(truncatedText) : truncatedText}
          </span>
          <span css={euiTextTruncateStyles.fullText} data-test-subj="fullText">
            {text}
          </span>
        </>
      ) : (
        <span data-test-subj="fullText">{text}</span>
      )}
    </div>
  );
};

const EuiTextTruncateWithResizeObserver: FunctionComponent<
  Omit<EuiTextTruncateProps, 'width'>
> = ({ onResize: _onResize, ...props }) => {
  const [width, setWidth] = useState(0);
  const onResize: EuiResizeObserverProps['onResize'] = useCallback(
    ({ width }) => {
      setWidth(width);
      _onResize?.(width);
    },
    [_onResize]
  );

  return (
    <EuiResizeObserver onResize={onResize}>
      {(ref) => (
        <EuiTextTruncateWithWidth width={width} containerRef={ref} {...props} />
      )}
    </EuiResizeObserver>
  );
};
