/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  CSSProperties,
  HTMLAttributes,
  FunctionComponent,
  KeyboardEvent,
  ReactElement,
  ReactNode,
  memo,
  forwardRef,
  useEffect,
  useMemo,
  useState,
} from 'react';
import classNames from 'classnames';
import { highlight, RefractorNode, listLanguages } from 'refractor';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import { keys, useCombinedRefs } from '../../services';
import { EuiButtonIcon } from '../button';
import { keysOf, CommonProps, ExclusiveUnion } from '../common';
import { EuiCopy } from '../copy';
import { EuiFocusTrap } from '../focus_trap';
import { EuiI18n } from '../i18n';
import { useInnerText } from '../inner_text';
import { useMutationObserver } from '../observer/mutation_observer';
import { useResizeObserver } from '../observer/resize_observer';
import { EuiOverlayMask } from '../overlay_mask';
import { highlightByLine, nodeToHtml } from './utils';

// eslint-disable-next-line local/forward-ref
const virtualizedOuterElement = ({
  className,
}: HTMLAttributes<HTMLPreElement>) =>
  memo(
    forwardRef<any, any>((props, ref) => (
      <pre {...props} ref={ref} className={className} tabIndex={0} />
    ))
  );

// eslint-disable-next-line local/forward-ref
const virtualizedInnerElement = ({
  className,
  onKeyDown,
}: HTMLAttributes<HTMLElement>) =>
  memo(
    forwardRef<any, any>((props, ref) => (
      <code {...props} ref={ref} className={className} onKeyDown={onKeyDown} />
    ))
  );

const ListRow = ({ data, index, style }: ListChildComponentProps) => {
  const row = data[index];
  row.properties.style = style;
  return nodeToHtml(row, index, data, 0);
};

const SUPPORTED_LANGUAGES = listLanguages();
const DEFAULT_LANGUAGE = 'text';

// Based on observed line height for non-virtualized code blocks
const fontSizeToRowHeightMap = {
  s: 16,
  m: 19,
  l: 21,
};

const fontSizeToClassNameMap = {
  s: 'euiCodeBlock--fontSmall',
  m: 'euiCodeBlock--fontMedium',
  l: 'euiCodeBlock--fontLarge',
};

type PaddingSize = 'none' | 's' | 'm' | 'l';
type FontSize = 's' | 'm' | 'l';

export const FONT_SIZES = keysOf(fontSizeToClassNameMap);

const paddingSizeToClassNameMap: { [paddingSize in PaddingSize]: string } = {
  none: '',
  s: 'euiCodeBlock--paddingSmall',
  m: 'euiCodeBlock--paddingMedium',
  l: 'euiCodeBlock--paddingLarge',
};

export const PADDING_SIZES = keysOf(paddingSizeToClassNameMap);

// overflowHeight is required when using virtualization
type VirtualizedOptionProps = ExclusiveUnion<
  {
    /**
     * Renders code block lines virtually.
     * Useful for improving load times of large code blocks.
     * `overflowHeight` is required when using this configuration.
     */
    isVirtualized: true;
    /**
     * Sets the maximum container height.
     * Accepts a pixel value (`300`) or a percentage (`'100%'`)
     * Ensure the container has calcuable height when using a percentage
     */
    overflowHeight: number | string;
  },
  {
    isVirtualized?: boolean;
    overflowHeight?: number | string;
  }
>;

interface LineNumbersConfig {
  start?: number;
}

export type EuiCodeBlockImplProps = CommonProps & {
  className?: string;
  fontSize?: FontSize;

  /**
   * Displays the passed code in an inline format. Also removes any margins set.
   */
  inline?: boolean;

  /**
   * Displays an icon button to copy the code snippet to the clipboard.
   */
  isCopyable?: boolean;

  /**
   * Sets the syntax highlighting for a specific language
   * @see https://prismjs.com/#supported-languages
   * for options
   */
  language?: string;
  paddingSize?: PaddingSize;
  transparentBackground?: boolean;

  /**
   * Specify how `white-space` inside the element is handled.
   * `pre` respects line breaks/white space but doesn't force them to wrap the line
   * `pre-wrap` respects line breaks/white space but does force them to wrap the line when necessary.
   */
  whiteSpace?: 'pre' | 'pre-wrap';

  /**
   * Displays line numbers.
   * Optionally accepts a configuration object for setting the starting number:
   * `{start: 100}`
   */
  lineNumbers?: boolean | LineNumbersConfig;
} & VirtualizedOptionProps;

/**
 * This is the base component extended by EuiCode and EuiCodeBlock.
 * These components share the same propTypes definition with EuiCodeBlockImpl.
 */
export const EuiCodeBlockImpl: FunctionComponent<EuiCodeBlockImplProps> = ({
  transparentBackground = false,
  paddingSize = 'l',
  fontSize = 's',
  isCopyable = false,
  whiteSpace = 'pre-wrap',
  language: _language = DEFAULT_LANGUAGE,
  inline,
  children,
  className,
  overflowHeight,
  isVirtualized: _isVirtualized,
  lineNumbers = false,
  ...rest
}) => {
  const language: string = useMemo(
    () =>
      SUPPORTED_LANGUAGES.includes(_language) ? _language : DEFAULT_LANGUAGE,
    [_language]
  );
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [wrapperRef, setWrapperRef] = useState<Element | null>(null);
  const [innerTextRef, _innerText] = useInnerText('');
  const innerText = useMemo(
    () => _innerText?.replace(/[\r\n?]{2}|\n\n/g, '\n'),
    [_innerText]
  );
  const [tabIndex, setTabIndex] = useState<-1 | 0>(-1);
  const combinedRef = useCombinedRefs<HTMLPreElement>([
    innerTextRef,
    setWrapperRef,
  ]);
  const { width, height } = useResizeObserver(wrapperRef);
  const rowHeight = useMemo(() => fontSizeToRowHeightMap[fontSize], [fontSize]);
  const lineNumbersConfig = useMemo(() => {
    const config = typeof lineNumbers === 'object' ? lineNumbers : {};
    return lineNumbers
      ? { start: 1, show: true, ...config }
      : { start: 1, show: false };
  }, [lineNumbers]);

  // Used by `FixedSizeList` when `isVirtualized=true` or `children` is parsable (`isVirtualized=true`)
  const data: RefractorNode[] = useMemo(() => {
    if (typeof children !== 'string') {
      return [];
    }
    return inline
      ? highlight(children, language)
      : highlightByLine(children, language, lineNumbersConfig);
  }, [children, language, inline, lineNumbersConfig]);

  const isVirtualized = useMemo(() => _isVirtualized && Array.isArray(data), [
    _isVirtualized,
    data,
  ]);

  // Used by `pre` when `isVirtualized=false` or `children` is not parsable (`isVirtualized=false`)
  const content: ReactElement[] | ReactNode = useMemo(() => {
    if (!Array.isArray(data) || data.length < 1) {
      return children;
    }
    return data.map(nodeToHtml);
  }, [data, children]);

  const doesOverflow = () => {
    if (!wrapperRef) return;

    const { clientWidth, clientHeight, scrollWidth, scrollHeight } = wrapperRef;
    const doesOverflow =
      scrollHeight > clientHeight || scrollWidth > clientWidth;

    setTabIndex(doesOverflow ? 0 : -1);
  };

  useMutationObserver(wrapperRef, doesOverflow, {
    subtree: true,
    childList: true,
  });

  useEffect(doesOverflow, [width, height, wrapperRef]);

  const onKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === keys.ESCAPE) {
      event.preventDefault();
      event.stopPropagation();
      closeFullScreen();
    }
  };

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  const closeFullScreen = () => {
    setIsFullScreen(false);
  };

  const classes = classNames(
    'euiCodeBlock',
    fontSizeToClassNameMap[fontSize],
    paddingSizeToClassNameMap[paddingSize],
    {
      'euiCodeBlock--transparentBackground': transparentBackground,
      'euiCodeBlock--inline': inline,
      'euiCodeBlock--hasControl': isCopyable || overflowHeight,
      'euiCodeBlock--hasBothControls': isCopyable && overflowHeight,
      'euiCodeBlock--hasLineNumbers': lineNumbersConfig.show,
    },
    {
      prismjs: !className?.includes('prismjs'),
      [`language-${language || 'none'}`]: !className?.includes('language'),
    },
    className
  );

  const codeClasses = classNames('euiCodeBlock__code', language);

  const preClasses = classNames('euiCodeBlock__pre', {
    'euiCodeBlock__pre--whiteSpacePre': whiteSpace === 'pre',
    'euiCodeBlock__pre--whiteSpacePreWrap': whiteSpace === 'pre-wrap',
    'euiCodeBlock__pre--isVirtualized': isVirtualized,
  });

  const optionalStyles: CSSProperties = {};

  if (overflowHeight) {
    const property =
      typeof overflowHeight === 'string' ? 'height' : 'maxHeight';
    optionalStyles[property] = overflowHeight;
  }

  const codeSnippet = (
    <code className={codeClasses} {...rest}>
      {content}
    </code>
  );

  const wrapperProps = {
    className: classes,
    style: optionalStyles,
  };

  if (inline) {
    return <span {...wrapperProps}>{codeSnippet}</span>;
  }

  const getCopyButton = (_textToCopy?: string) => {
    let copyButton: JSX.Element | undefined;
    // Fallback to `children` in the case of virtualized blocks.
    const textToCopy = _textToCopy || `${children}`;

    if (isCopyable && textToCopy) {
      copyButton = (
        <div className="euiCodeBlock__copyButton">
          <EuiI18n token="euiCodeBlock.copyButton" default="Copy">
            {(copyButton: string) => (
              <EuiCopy textToCopy={textToCopy}>
                {(copy) => (
                  <EuiButtonIcon
                    onClick={copy}
                    iconType="copyClipboard"
                    color="text"
                    aria-label={copyButton}
                  />
                )}
              </EuiCopy>
            )}
          </EuiI18n>
        </div>
      );
    }

    return copyButton;
  };

  let fullScreenButton: JSX.Element | undefined;

  if (!inline && overflowHeight) {
    fullScreenButton = (
      <EuiI18n
        tokens={[
          'euiCodeBlock.fullscreenCollapse',
          'euiCodeBlock.fullscreenExpand',
        ]}
        defaults={['Collapse', 'Expand']}
      >
        {([fullscreenCollapse, fullscreenExpand]: string[]) => (
          <EuiButtonIcon
            className="euiCodeBlock__fullScreenButton"
            onClick={toggleFullScreen}
            iconType={isFullScreen ? 'cross' : 'fullScreen'}
            color="text"
            aria-label={isFullScreen ? fullscreenCollapse : fullscreenExpand}
          />
        )}
      </EuiI18n>
    );
  }

  const getCodeBlockControls = (textToCopy?: string) => {
    let codeBlockControls;
    const copyButton = getCopyButton(textToCopy);

    if (copyButton || fullScreenButton) {
      codeBlockControls = (
        <div className="euiCodeBlock__controls">
          {fullScreenButton}
          {copyButton}
        </div>
      );
    }

    return codeBlockControls;
  };

  const getFullScreenDisplay = (codeBlockControls?: JSX.Element) => {
    let fullScreenDisplay;

    if (isFullScreen) {
      // Force fullscreen to use large font and padding.
      const fullScreenClasses = classNames(
        'euiCodeBlock',
        fontSizeToClassNameMap[fontSize],
        'euiCodeBlock-paddingLarge',
        'euiCodeBlock-isFullScreen',
        className
      );

      fullScreenDisplay = (
        <EuiOverlayMask>
          <EuiFocusTrap clickOutsideDisables={true}>
            <div className={fullScreenClasses}>
              {isVirtualized ? (
                <AutoSizer>
                  {({ height, width }) => (
                    <FixedSizeList
                      height={height}
                      width={width}
                      itemData={data}
                      itemSize={rowHeight}
                      itemCount={data.length}
                      outerElementType={virtualizedOuterElement({
                        className: preClasses,
                      })}
                      innerElementType={virtualizedInnerElement({
                        className: codeClasses,
                        onKeyDown,
                      })}
                    >
                      {ListRow}
                    </FixedSizeList>
                  )}
                </AutoSizer>
              ) : (
                <pre className={preClasses} tabIndex={0}>
                  <code className={codeClasses} onKeyDown={onKeyDown}>
                    {content}
                  </code>
                </pre>
              )}

              {codeBlockControls}
            </div>
          </EuiFocusTrap>
        </EuiOverlayMask>
      );
    }

    return fullScreenDisplay;
  };

  const codeBlockControls = getCodeBlockControls(innerText);
  return (
    <div {...wrapperProps}>
      {isVirtualized ? (
        <AutoSizer disableHeight={typeof overflowHeight === 'number'}>
          {({ height, width }) => (
            <FixedSizeList
              height={height ?? overflowHeight}
              width={width}
              itemData={data}
              itemSize={rowHeight}
              itemCount={data.length}
              outerElementType={virtualizedOuterElement({
                className: preClasses,
              })}
              innerElementType={virtualizedInnerElement({
                className: codeClasses,
                onKeyDown,
              })}
            >
              {ListRow}
            </FixedSizeList>
          )}
        </AutoSizer>
      ) : (
        <pre
          ref={combinedRef}
          style={optionalStyles}
          className={preClasses}
          tabIndex={tabIndex}
        >
          {codeSnippet}
        </pre>
      )}
      {/*
          If the below fullScreen code renders, it actually attaches to the body because of
          EuiOverlayMask's React portal usage.
        */}
      {codeBlockControls}
      {getFullScreenDisplay(codeBlockControls)}
    </div>
  );
};
