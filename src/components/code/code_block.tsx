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
  forwardRef,
  ReactNode,
  useEffect,
  useMemo,
  useState,
  useCallback,
} from 'react';
import classNames from 'classnames';
import { RefractorNode } from 'refractor';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import { keys, useCombinedRefs } from '../../services';
import { EuiAutoSizer } from '../auto_sizer';
import { EuiButtonIcon } from '../button';
import { keysOf, ExclusiveUnion } from '../common';
import { EuiCopy } from '../copy';
import { EuiFocusTrap } from '../focus_trap';
import { EuiI18n } from '../i18n';
import { useInnerText } from '../inner_text';
import { useMutationObserver } from '../observer/mutation_observer';
import { useResizeObserver } from '../observer/resize_observer';
import { EuiOverlayMask } from '../overlay_mask';
import {
  EuiCodeSharedProps,
  DEFAULT_LANGUAGE,
  checkSupportedLanguage,
  getHtmlContent,
  nodeToHtml,
  highlightByLine,
} from './utils';

// Based on observed line height for non-virtualized code blocks
const fontSizeToRowHeightMap = {
  s: 18,
  m: 21,
  l: 24,
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
  paddingSize?: PaddingSize;
  fontSize?: FontSize;

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

  const { innerTextRef, showCopyButton, CopyButton } = useCopy({
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
    FullScreenButton,
    FullScreenDisplay,
  } = useFullScreen({ overflowHeight });

  // Classes used in both full-screen and non-full-screen mode
  const wrapperClasses = classNames(className, 'euiCodeBlock', {
    'euiCodeBlock--hasControl': showCopyButton || showFullScreenButton,
    'euiCodeBlock--hasBothControls': showCopyButton && showFullScreenButton,
    'euiCodeBlock--hasLineNumbers': lineNumbersConfig.show,
  });

  // Classes used in non-full-screen mode only
  const classes = classNames(
    wrapperClasses,
    fontSizeToClassNameMap[fontSize],
    paddingSizeToClassNameMap[paddingSize],
    {
      'euiCodeBlock--transparentBackground': transparentBackground,
    }
  );

  const codeProps = useMemo(
    () => ({
      className: 'euiCodeBlock__code',
      'data-code-language': language,
      ...rest,
    }),
    [language, rest]
  );

  const preClasses = classNames('euiCodeBlock__pre', {
    'euiCodeBlock__pre--whiteSpacePre': whiteSpace === 'pre' || isVirtualized,
    'euiCodeBlock__pre--whiteSpacePreWrap':
      whiteSpace === 'pre-wrap' && !isVirtualized,
    'euiCodeBlock__pre--isVirtualized': isVirtualized,
  });
  const preFullscreenProps = useMemo(
    () => ({
      className: preClasses,
      tabIndex: 0,
      onKeyDown,
    }),
    [preClasses, onKeyDown]
  );

  const optionalStyles: CSSProperties = {};

  if (overflowHeight) {
    const property =
      typeof overflowHeight === 'string' ? 'height' : 'maxHeight';
    optionalStyles[property] = overflowHeight;
  }

  const wrapperProps = {
    className: classes,
    style: optionalStyles,
  };

  let codeBlockControls;
  if (showCopyButton || showFullScreenButton) {
    codeBlockControls = (
      <div className="euiCodeBlock__controls">
        <FullScreenButton />
        <CopyButton />
      </div>
    );
  }

  return (
    <div {...wrapperProps}>
      {isVirtualized ? (
        <VirtualizedCodeBlock
          data={data}
          rowHeight={fontSizeToRowHeightMap[fontSize]}
          overflowHeight={overflowHeight}
          preProps={preFullscreenProps} // Note: the virtualized codeblock always sets a tabIndex of 0
          codeProps={codeProps}
        />
      ) : (
        <pre
          ref={combinedRef}
          style={optionalStyles}
          className={preClasses}
          tabIndex={tabIndex}
        >
          <code {...codeProps}>{content}</code>
        </pre>
      )}
      {codeBlockControls}

      <FullScreenDisplay className={wrapperClasses}>
        {isVirtualized ? (
          <VirtualizedCodeBlock
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
      </FullScreenDisplay>
    </div>
  );
};

/**
 * Overflow logic
 *
 * Detects whether the code block overflows and returns a tabIndex of 0 if so,
 * which allows keyboard users to use the up/down arrow keys to scroll through
 * the container.
 */

const useOverflowDetection = () => {
  const [wrapperRef, setWrapperRef] = useState<Element | null>(null);
  const [tabIndex, setTabIndex] = useState<-1 | 0>(-1);
  const { width, height } = useResizeObserver(wrapperRef);

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

  return { setWrapperRef, tabIndex };
};

/**
 * Copy logic
 */

const useCopy = ({
  isCopyable,
  isVirtualized,
  children,
}: {
  isCopyable: boolean;
  isVirtualized: boolean;
  children: ReactNode;
}) => {
  const [innerTextRef, _innerText] = useInnerText('');
  const innerText = useMemo(
    () => _innerText?.replace(/[\r\n?]{2}|\n\n/g, '\n') || '',
    [_innerText]
  );
  const textToCopy = isVirtualized ? `${children}` : innerText; // Virtualized code blocks do not have inner text

  const showCopyButton = isCopyable && textToCopy;

  const CopyButton = () => {
    if (!showCopyButton) return null;

    return (
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
  };

  return { innerTextRef, showCopyButton, CopyButton };
};

/**
 * Fullscreen logic
 */

const useFullScreen = ({
  overflowHeight,
}: {
  overflowHeight?: number | string;
}) => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  const onKeyDown = useCallback((event: KeyboardEvent<HTMLElement>) => {
    if (event.key === keys.ESCAPE) {
      event.preventDefault();
      event.stopPropagation();
      setIsFullScreen(false);
    }
  }, []);

  const showFullScreenButton = !!overflowHeight;

  const FullScreenButton: React.FC = () => {
    if (!showFullScreenButton) return null;
    return (
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
            iconType={isFullScreen ? 'fullScreenExit' : 'fullScreen'}
            color="text"
            aria-label={isFullScreen ? fullscreenCollapse : fullscreenExpand}
          />
        )}
      </EuiI18n>
    );
  };

  const FullScreenDisplay: React.FC<{ className: string }> = ({
    children,
    className,
  }) => {
    if (!isFullScreen) return null;

    // Force fullscreen to use large font and padding.
    const fullScreenClasses = classNames(
      className,
      'euiCodeBlock--fontLarge',
      'euiCodeBlock--paddingLarge',
      'euiCodeBlock-isFullScreen'
    );

    // Attaches to the body because of EuiOverlayMask's React portal usage.
    return (
      <EuiOverlayMask>
        <EuiFocusTrap clickOutsideDisables={true}>
          <div className={fullScreenClasses}>{children}</div>
        </EuiFocusTrap>
      </EuiOverlayMask>
    );
  };

  return {
    showFullScreenButton,
    FullScreenButton,
    FullScreenDisplay,
    onKeyDown,
  };
};

/**
 * Virtualization logic
 */

const ListRow = ({ data, index, style }: ListChildComponentProps) => {
  const row = data[index];
  row.properties.style = style;
  return nodeToHtml(row, index, data, 0);
};

const VirtualizedCodeBlock = ({
  data,
  rowHeight,
  overflowHeight,
  preProps,
  codeProps,
}: {
  data: RefractorNode[];
  rowHeight: number;
  overflowHeight?: number | string;
  preProps: HTMLAttributes<HTMLPreElement>;
  codeProps: HTMLAttributes<HTMLElement>;
}) => {
  const VirtualizedOuterElement = useMemo(
    () =>
      forwardRef<any, any>((props, ref) => (
        <pre {...props} ref={ref} {...preProps} />
      )),
    [preProps]
  );

  const VirtualizedInnerElement = useMemo(
    () =>
      forwardRef<any, any>((props, ref) => (
        <code {...props} ref={ref} {...codeProps} />
      )),
    [codeProps]
  );

  return (
    <EuiAutoSizer disableHeight={typeof overflowHeight === 'number'}>
      {({ height, width }) => (
        <FixedSizeList
          height={height ?? overflowHeight}
          width={width}
          itemData={data}
          itemSize={rowHeight}
          itemCount={data.length}
          outerElementType={VirtualizedOuterElement}
          innerElementType={VirtualizedInnerElement}
        >
          {ListRow}
        </FixedSizeList>
      )}
    </EuiAutoSizer>
  );
};
