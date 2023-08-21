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

export type EuiTextTruncateProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  'children' | 'onResize'
> &
  CommonProps & {
    /**
     * EuiTextTruncate passes back the truncated text as a render prop
     * (instead of rendering the truncated string directly). This API allows
     * you to use the text more flexibly, e.g. adding custom markup/highlighting
     */
    children: (truncatedString: string) => ReactNode;
    /**
     * The full text string to truncate
     */
    text: string;
    /**
     * The truncation type desired. Determines where the ellipses are placed.
     */
    truncation: 'end' | 'start' | 'startEnd' | 'middle'; // TODO: [start: x, end: y?]; - needs to support combobox search highlight
    /**
     * This prop **only** affects the `start` and `end` truncation types.
     * It allows preserving a certain number of characters of either the
     * starting or ending text.
     *
     * If the passed offset is greater than half of the total text length,
     * the truncation will simply default to `middle` instead.
     */
    truncationOffset?: number;
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
  ellipsis = '…',
  containerRef,
  ...rest
}) => {
  // Note: This needs to be a state and not a ref to trigger a rerender on mount
  const [containerEl, setContainerEl] = useState<HTMLDivElement | null>(null);
  const refs = useCombinedRefs([setContainerEl, containerRef]);

  const truncationUsesOffset = _truncation === 'end' || _truncation === 'start';
  const truncationOffsetIsTooLarge =
    truncationUsesOffset && _truncationOffset >= Math.floor(text.length / 2);

  const truncation = useMemo(() => {
    if (truncationOffsetIsTooLarge) {
      return 'middle' as const;
    } else {
      return _truncation;
    }
  }, [_truncation, truncationOffsetIsTooLarge]);

  const truncationOffset = useMemo(() => {
    if (truncationUsesOffset && !truncationOffsetIsTooLarge) {
      return _truncationOffset;
    } else {
      return 0;
    }
  }, [_truncationOffset, truncationOffsetIsTooLarge, truncationUsesOffset]);

  const truncatedText = useMemo(() => {
    if (!containerEl || !width) return '';

    // Create a temporary DOM element for manipulating text and determining text width
    const span = document.createElement('span');
    containerEl.appendChild(span);

    // Check to make sure the container width can even fit the ellipsis, let alone text
    span.textContent = ellipsis;
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
        span.textContent = `${startOffset}${ellipsis}${startRemaining}`;

        while (span.offsetWidth > width) {
          const trimmedText = span.textContent.substring(substringOffset);
          span.textContent = `${startOffset}${ellipsis}${trimmedText}`;
        }
        break;

      case 'startEnd':
        while (span.offsetWidth > width) {
          const trimmedMiddle = span.textContent.substring(
            substringOffset,
            span.textContent.length - substringOffset
          );
          span.textContent = `${ellipsis}${trimmedMiddle}${ellipsis}`;
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
  }, [width, text, truncation, truncationOffset, ellipsis, containerEl]);

  return (
    <div
      css={euiTextTruncateStyles.euiTextTruncate}
      ref={refs}
      title={text}
      aria-label={text}
      {...rest}
    >
      {truncatedText && children(truncatedText)}
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
