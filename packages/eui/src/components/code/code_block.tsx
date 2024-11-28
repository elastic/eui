/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, useMemo } from 'react';
import { RefractorNode } from 'refractor';
import classNames from 'classnames';

import {
  useCombinedRefs,
  useEuiTheme,
  useEuiMemoizedStyles,
  tabularCopyMarkers,
} from '../../services';
import { ExclusiveUnion } from '../common';
import {
  EuiCodeSharedProps,
  DEFAULT_LANGUAGE,
  checkSupportedLanguage,
  getHtmlContent,
  highlightByLine,
} from './utils';
import { LineAnnotationMap } from './code_block_annotations';
import { useOverflow } from './code_block_overflow';
import { useCopy } from './code_block_copy';
import {
  useFullScreen,
  EuiCodeBlockFullScreenWrapper,
} from './code_block_full_screen';
import { EuiCodeBlockControls } from './code_block_controls';
import { EuiCodeBlockVirtualized } from './code_block_virtualized';
import {
  euiCodeBlockStyles,
  euiCodeBlockPreStyles,
  euiCodeBlockCodeStyles,
} from './code_block.styles';
import { EuiScreenReaderOnly } from '../accessibility';
import { useEuiI18n } from '../i18n';

// Based on observed line height for non-virtualized code blocks
const fontSizeToRowHeightMap = {
  s: 18,
  m: 21,
  l: 24,
};

export const FONT_SIZES = ['s', 'm', 'l'] as const;
export type EuiCodeBlockFontSize = (typeof FONT_SIZES)[number];

export const PADDING_SIZES = ['none', 's', 'm', 'l'] as const;
export type EuiCodeBlockPaddingSize = (typeof PADDING_SIZES)[number];

// This exclusive union enforces specific props based on isVirtualized
type VirtualizedOptionProps = ExclusiveUnion<
  {
    isVirtualized: true;
    overflowHeight: number | string;
    whiteSpace?: 'pre';
  },
  {
    isVirtualized?: false;
    overflowHeight?: number | string;
    whiteSpace?: 'pre' | 'pre-wrap';
  }
>;

interface LineNumbersConfig {
  start?: number;
  highlight?: string;
  annotations?: LineAnnotationMap;
}

export type EuiCodeBlockProps = EuiCodeSharedProps & {
  paddingSize?: EuiCodeBlockPaddingSize;
  fontSize?: EuiCodeBlockFontSize;

  /**
   * Specify how `white-space` inside the element is handled.
   * `pre` respects line breaks/white space but doesn't force them to wrap the line
   * `pre-wrap` respects line breaks/white space but does force them to wrap the line when necessary.
   */
  whiteSpace?: 'pre' | 'pre-wrap';

  /**
   * Displays an icon button to copy the code snippet to the clipboard.
   */
  isCopyable?: boolean;

  /**
   * Customizes the aria-label for the copy button.
   *
   * @default 'Copy'
   */
  copyAriaLabel?: string;

  /**
   * Displays line numbers.
   * Optionally accepts a configuration object for setting the starting number,
   * visually highlighting ranges, or annotating specific lines:
   * `{ start: 100, highlight: '1, 5-10, 20-30, 40', annotations: { 6: 'A special note about this line' } }`
   */
  lineNumbers?: boolean | LineNumbersConfig;

  /**
   * Sets the maximum container height.
   * Accepts a pixel value (`300`) or a percentage (`'100%'`)
   * Ensure the container has calcuable height when using a percentage
   */
  overflowHeight?: number | string;

  /**
   * Renders code block lines virtually.
   * Useful for improving load times of large code blocks.
   *
   * When using this configuration, `overflowHeight` is required and
   * `whiteSpace` can only be `pre`.
   */
  isVirtualized?: boolean;
} & VirtualizedOptionProps;

export const EuiCodeBlock: FunctionComponent<EuiCodeBlockProps> = ({
  language: _language = DEFAULT_LANGUAGE,
  transparentBackground = false,
  paddingSize = 'l',
  fontSize = 's',
  isCopyable = false,
  copyAriaLabel,
  whiteSpace = 'pre-wrap',
  children,
  className,
  overflowHeight,
  isVirtualized: _isVirtualized,
  lineNumbers = false,
  ...rest
}) => {
  const euiTheme = useEuiTheme();
  const language = useMemo(
    () => checkSupportedLanguage(_language),
    [_language]
  );

  const lineNumbersConfig = useMemo(() => {
    const config = typeof lineNumbers === 'object' ? lineNumbers : {};
    return lineNumbers
      ? { start: 1, show: true, ...config }
      : { start: 1, show: false };
  }, [lineNumbers]);

  // Used by `FixedSizeList` when `isVirtualized=true` or `children` is parsable
  const data: RefractorNode[] = useMemo(() => {
    if (typeof children !== 'string') {
      return [];
    }
    return highlightByLine(children, language, lineNumbersConfig, euiTheme);
  }, [children, language, lineNumbersConfig, euiTheme]);

  // Used by `pre` when `isVirtualized=false` or `children` is not parsable
  const content = useMemo(
    () => getHtmlContent(data, children),
    [data, children]
  );

  const isVirtualized = useMemo(
    () => !!(_isVirtualized && Array.isArray(data)),
    [_isVirtualized, data]
  );

  const { innerTextRef, copyButton } = useCopy({
    copyAriaLabel,
    isCopyable,
    isVirtualized,
    children,
  });

  const { setWrapperRef, tabIndex, overflowHeightStyles } = useOverflow({
    overflowHeight,
  });

  const combinedRef = useCombinedRefs<HTMLPreElement>([
    innerTextRef,
    setWrapperRef,
  ]);

  const { fullScreenButton, isFullScreen, onKeyDown } = useFullScreen({
    overflowHeight,
  });

  const hasControls = !!(copyButton || fullScreenButton);
  const hasBothControls = !!(copyButton && fullScreenButton);

  const styles = useEuiMemoizedStyles(euiCodeBlockStyles);
  const cssStyles = [
    styles.euiCodeBlock,
    styles[fontSize],
    transparentBackground && styles.transparentBackground,
    hasControls &&
      (hasBothControls
        ? styles.hasBothControls[paddingSize]
        : styles.hasControls[paddingSize]),
  ];

  const preStyles = useEuiMemoizedStyles(euiCodeBlockPreStyles);
  const [preProps, preFullscreenProps] = useMemo(() => {
    const isWhiteSpacePre = whiteSpace === 'pre' || isVirtualized;

    const cssStyles = [
      preStyles.euiCodeBlock__pre,
      isWhiteSpacePre
        ? preStyles.whiteSpace.pre.pre
        : preStyles.whiteSpace.preWrap.preWrap,
    ];

    const preProps = {
      className: 'euiCodeBlock__pre',
      css: [
        ...cssStyles,
        preStyles.padding[paddingSize],
        hasControls &&
          (isWhiteSpacePre
            ? preStyles.whiteSpace.pre.controlsOffset[paddingSize]
            : preStyles.whiteSpace.preWrap.controlsOffset[paddingSize]),
      ],
      tabIndex: isVirtualized ? 0 : tabIndex,
    };
    const preFullscreenProps = {
      className: 'euiCodeBlock__pre',
      css: [
        ...cssStyles,
        // Force fullscreen to use xl padding
        preStyles.padding.xl,
        hasControls &&
          (isWhiteSpacePre
            ? preStyles.whiteSpace.pre.controlsOffset.xl
            : preStyles.whiteSpace.preWrap.controlsOffset.xl),
      ],
      tabIndex: 0,
    };

    return [preProps, preFullscreenProps];
  }, [
    preStyles,
    whiteSpace,
    isVirtualized,
    hasControls,
    paddingSize,
    tabIndex,
  ]);

  const codeStyles = useEuiMemoizedStyles(euiCodeBlockCodeStyles);
  const codeProps = useMemo(() => {
    const cssStyles = [
      codeStyles.euiCodeBlock__code,
      isVirtualized && codeStyles.isVirtualized,
    ];

    return {
      className: 'euiCodeBlock__code',
      css: cssStyles,
      'data-code-language': language,
      ...rest,
    };
  }, [codeStyles, language, isVirtualized, rest]);

  const codeBlockLabel = useEuiI18n(
    'euiCodeBlock.label',
    '{language} code block:',
    {
      language,
    }
  );
  // pre tags don't accept aria-label without an
  // appropriate role, we add a SR only text instead
  const codeBlockLabelElement = (
    <>
      {tabularCopyMarkers.hiddenNoCopyBoundary}
      <EuiScreenReaderOnly>
        <div>{codeBlockLabel}</div>
      </EuiScreenReaderOnly>
      {tabularCopyMarkers.hiddenNoCopyBoundary}
    </>
  );

  return (
    <div
      css={cssStyles}
      className={classNames('euiCodeBlock', className)}
      style={overflowHeightStyles}
    >
      {isVirtualized ? (
        <EuiCodeBlockVirtualized
          data={data}
          rowHeight={fontSizeToRowHeightMap[fontSize]}
          overflowHeight={overflowHeight}
          preProps={preProps}
          codeProps={codeProps}
        />
      ) : (
        <pre {...preProps} ref={combinedRef} style={overflowHeightStyles}>
          {codeBlockLabelElement}
          <code {...codeProps}>{content}</code>
        </pre>
      )}
      <EuiCodeBlockControls
        controls={[fullScreenButton, copyButton]}
        paddingSize={paddingSize}
      />

      {isFullScreen && (
        <EuiCodeBlockFullScreenWrapper onClose={onKeyDown}>
          {isVirtualized ? (
            <EuiCodeBlockVirtualized
              data={data}
              rowHeight={fontSizeToRowHeightMap.l}
              preProps={preFullscreenProps}
              codeProps={codeProps}
            />
          ) : (
            <pre {...preFullscreenProps}>
              {codeBlockLabelElement}
              <code {...codeProps}>{content}</code>
            </pre>
          )}
          <EuiCodeBlockControls
            controls={[fullScreenButton, copyButton]}
            paddingSize="l"
          />
        </EuiCodeBlockFullScreenWrapper>
      )}
    </div>
  );
};
