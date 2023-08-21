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
} from 'react';

import { useCombinedRefs } from '../../services';
import { EuiResizeObserver } from '../observer/resize_observer';
import type { CommonProps } from '../common';

import { euiTextTruncateStyles } from './text_truncate.styles';

export type EuiTextTruncateProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  'children'
> &
  CommonProps & {
    children: (truncatedString: string) => ReactNode;
    text: string;
    truncation: 'end' | 'start' | 'startEnd' | 'middle'; // TODO: [start: x, end: y?]; - needs to support combobox search highlight
    truncationOffset?: number; // only applies to end and start
    separator?: string;
    width?: number; // Will allow turning off the automatic resize observer for performance, e.g. in EuiComboBox
  };

export const EuiTextTruncate: FunctionComponent<EuiTextTruncateProps> = ({
  width,
  ...props
}) => {
  const [containerWidth, setContainerWidth] = useState(0);

  return width ? (
    <EuiTextTruncateToWidth width={width} {...props} />
  ) : (
    <EuiResizeObserver onResize={({ width }) => setContainerWidth(width)}>
      {(containerResizeRef) => (
        <EuiTextTruncateToWidth
          width={containerWidth}
          containerRef={containerResizeRef}
          {...props}
        />
      )}
    </EuiResizeObserver>
  );
};

const EuiTextTruncateToWidth: FunctionComponent<
  EuiTextTruncateProps & { width: number; containerRef?: Ref<HTMLDivElement> }
> = ({
  children,
  text,
  truncation: _truncation = 'end',
  truncationOffset: _truncationOffset = 0,
  separator = '…',
  width,
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

    // Quick check to make sure consumers didn't pass in an insane separator
    span.textContent = separator;
    if (span.offsetWidth >= width * 0.9) {
      throw new Error(
        'The separator passed is larger than the available width and cannot be used.'
      );
    }

    span.textContent = text;

    // Check if we need to truncate at all
    if (width > span.offsetWidth) {
      containerEl.removeChild(span);
      return text;
    }

    const substringOffset = truncationOffset + separator.length + 1;

    switch (truncation) {
      case 'end':
        const endPosition = text.length - truncationOffset;
        const endOffset = span.textContent.substring(endPosition);
        const endRemaining = span.textContent.substring(0, endPosition);
        span.textContent = `${endRemaining}${separator}${endOffset}`;

        while (span.offsetWidth > width) {
          const offset = span.textContent.length - substringOffset;
          const trimmedText = span.textContent.substring(0, offset);
          span.textContent = `${trimmedText}${separator}${endOffset}`;
        }
        break;

      case 'start':
        const startOffset = span.textContent.substring(0, truncationOffset);
        const startRemaining = span.textContent.substring(truncationOffset);
        span.textContent = `${startOffset}${separator}${startRemaining}`;

        while (span.offsetWidth > width) {
          const trimmedText = span.textContent.substring(substringOffset);
          span.textContent = `${startOffset}${separator}${trimmedText}`;
        }
        break;

      case 'startEnd':
        while (span.offsetWidth > width) {
          const trimmedMiddle = span.textContent.substring(
            substringOffset,
            span.textContent.length - substringOffset
          );
          span.textContent = `${separator}${trimmedMiddle}${separator}`;
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
          span.textContent = `${firstHalf}${separator}${secondHalf}`;
          trimfirstHalf = !trimfirstHalf;
        }
        break;
    }

    const truncatedText = span.textContent;
    containerEl.removeChild(span);

    return truncatedText;
  }, [width, text, truncation, truncationOffset, separator, containerEl]);

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
