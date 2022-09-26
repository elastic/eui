/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { CSSProperties, FunctionComponent, useMemo } from 'react';
import { RefractorNode } from 'refractor';
import { useCombinedRefs, useEuiTheme } from '../../services';
import { ExclusiveUnion } from '../common';
import {
  EuiCodeSharedProps,
  DEFAULT_LANGUAGE,
  checkSupportedLanguage,
  getHtmlContent,
  highlightByLine,
  useOverflowDetection,
  useCopy,
  useFullScreen,
} from './utils';
import {
  euiCodeBlockStyles,
  euiCodeBlockPreStyles,
  euiCodeBlockCodeStyles,
  euiCodeBlockControlsStyles,
} from './code_block.styles';
import { useEuiPaddingCSS } from '../../global_styling';
import { EuiCodeBlockFullScreenWrapper } from './code_block_full_screen_wrapper';
import { EuiCodeBlockCopyButton } from './code_block_copy_button';
import { EuiCodeFullScreenButton } from './code_block_full_screen_button';
import { EuiCodeBlockVirtualized } from './code_block_virtualized';

// Based on observed line height for non-virtualized code blocks
const fontSizeToRowHeightMap = {
  s: 18,
  m: 21,
  l: 24,
};

export const FONT_SIZES = ['s', 'm', 'l'] as const;
export type EuiCodeBlockFontSize = typeof FONT_SIZES[number];

export const PADDING_SIZES = ['none', 's', 'm', 'l'] as const;
export type EuiCodeBlockPaddingSize = typeof PADDING_SIZES[number];

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
   * Displays line numbers.
   * Optionally accepts a configuration object for setting the starting number and visual highlighting ranges:
   * `{ start: 100, highlight: '1, 5-10, 20-30, 40' }`
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
  whiteSpace = 'pre-wrap',
  children,
  className,
  overflowHeight,
  isVirtualized: _isVirtualized,
  lineNumbers = false,
  ...rest
}) => {
  const language = useMemo(() => checkSupportedLanguage(_language), [
    _language,
  ]);

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
    return highlightByLine(children, language, lineNumbersConfig);
  }, [children, language, lineNumbersConfig]);

  // Used by `pre` when `isVirtualized=false` or `children` is not parsable
  const content = useMemo(() => getHtmlContent(data, children), [
    data,
    children,
  ]);

  const isVirtualized = useMemo(
    () => !!(_isVirtualized && Array.isArray(data)),
    [_isVirtualized, data]
  );

  const { innerTextRef, showCopyButton, textToCopy } = useCopy({
    isCopyable,
    isVirtualized,
    children,
  });

  const { setWrapperRef, tabIndex } = useOverflowDetection();

  const combinedRef = useCombinedRefs<HTMLPreElement>([
    innerTextRef,
    setWrapperRef,
  ]);

  const {
    showFullScreenButton,
    onKeyDown,
    isFullScreen,
    toggleFullScreen,
  } = useFullScreen({ overflowHeight });

  const euiTheme = useEuiTheme();

  const codeProps = useMemo(() => {
    const codeStyles = euiCodeBlockCodeStyles(euiTheme);
    const codeCssStyles = codeStyles.euiCodeBlock__code;

    return {
      className: 'euiCodeBlock__code',
      css: codeCssStyles,
      'data-code-language': language,
      ...rest,
    };
  }, [language, euiTheme, rest]);

  const preCssProps = useMemo(() => {
    const preClasses = 'euiCodeBlock__pre';

    const preStyles = euiCodeBlockPreStyles(euiTheme);

    const preCssStyles = [
      preStyles.euiCodeBlock__pre,
      (whiteSpace === 'pre' || isVirtualized) && preStyles.whiteSpacePre,
      whiteSpace === 'pre-wrap' &&
        !isVirtualized &&
        preStyles.whiteSpacePreWrap,
      isVirtualized && preStyles.isVirtualized,
      isFullScreen && preStyles.isFullScreen,
    ];

    return {
      className: preClasses,
      css: preCssStyles,
    };
  }, [euiTheme, whiteSpace, isVirtualized, isFullScreen]);

  const preFullscreenProps = useMemo(() => {
    return {
      ...preCssProps,
      tabIndex: 0,
      onKeyDown,
    };
  }, [onKeyDown, preCssProps]);

  const overflowHeightStyles: CSSProperties = useMemo(() => {
    if (overflowHeight) {
      const property =
        typeof overflowHeight === 'string' ? 'height' : 'maxHeight';
      return {
        [property]: overflowHeight,
      };
    }
    return {};
  }, [overflowHeight]);

  // Classes used in both fullscreen and non-fullscreen mode
  const wrapperClasses = 'euiCodeBlock';
  const styles = euiCodeBlockStyles(euiTheme);
  const cssStylesPaddingSize = useEuiPaddingCSS()[paddingSize];

  const wrapperCssStyles = useMemo(() => {
    return [
      styles.euiCodeBlock,
      styles[fontSize],
      cssStylesPaddingSize,
      !isFullScreen && transparentBackground && styles.transparentBackground,
      (showCopyButton || showFullScreenButton) && styles.hasControls,
      showCopyButton && showFullScreenButton && styles.hasBothControls,
      lineNumbersConfig.show && styles.hasLineNumbers,
    ];
  }, [
    isFullScreen,
    transparentBackground,
    showCopyButton,
    showFullScreenButton,
    lineNumbersConfig.show,
    styles,
    cssStylesPaddingSize,
    fontSize,
  ]);

  const wrapperProps = useMemo(() => {
    return {
      className: wrapperClasses,
      css: wrapperCssStyles,
      style: overflowHeightStyles,
    };
  }, [overflowHeightStyles, wrapperCssStyles]);

  const constrolsStyles = euiCodeBlockControlsStyles(euiTheme);

  const controlsCssStyles = useMemo(
    () => [
      constrolsStyles.euiCodeBlock__controls,
      isFullScreen && constrolsStyles.isFullScreen,
    ],
    []
  );

  const codeBlockControls = useMemo(() => {
    if (showCopyButton || showFullScreenButton) {
      return (
        <div className="euiCodeBlock__controls" css={controlsCssStyles}>
          {showFullScreenButton && (
            <EuiCodeFullScreenButton
              isFullScreen={isFullScreen}
              toggleFullScreen={toggleFullScreen}
            />
          )}
          {showCopyButton && <EuiCodeBlockCopyButton textToCopy={textToCopy} />}
        </div>
      );
    }
  }, [
    isFullScreen,
    toggleFullScreen,
    showCopyButton,
    showFullScreenButton,
    textToCopy,
    controlsCssStyles,
  ]);

  return (
    <div {...wrapperProps}>
      {isVirtualized ? (
        <EuiCodeBlockVirtualized
          data={data}
          rowHeight={fontSizeToRowHeightMap[fontSize]}
          overflowHeight={overflowHeight}
          preProps={preFullscreenProps} // Note: the virtualized codeblock always sets a tabIndex of 0
          codeProps={codeProps}
        />
      ) : (
        <pre
          ref={combinedRef}
          style={overflowHeightStyles}
          {...preCssProps}
          tabIndex={tabIndex}
        >
          <code {...codeProps}>{content}</code>
        </pre>
      )}
      {codeBlockControls}

      {isFullScreen && (
        <EuiCodeBlockFullScreenWrapper>
          <div {...wrapperProps}>
            {isVirtualized ? (
              <EuiCodeBlockVirtualized
                data={data}
                rowHeight={fontSizeToRowHeightMap.l}
                preProps={preFullscreenProps}
                codeProps={codeProps}
              />
            ) : (
              <pre {...preFullscreenProps}>
                <code {...codeProps}>{content}</code>
              </pre>
            )}
            {codeBlockControls}
          </div>
        </EuiCodeBlockFullScreenWrapper>
      )}
    </div>
  );
};
