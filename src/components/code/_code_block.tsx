/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  CSSProperties,
  FunctionComponent,
  KeyboardEvent,
  ReactNode,
  useEffect,
  useMemo,
  useState,
} from 'react';
import classNames from 'classnames';
import { highlight, AST, RefractorNode } from 'refractor';
import { keys, useCombinedRefs } from '../../services';
import { EuiButtonIcon } from '../button';
import { keysOf } from '../common';
import { EuiCopy } from '../copy';
import { EuiFocusTrap } from '../focus_trap';
import { EuiI18n } from '../i18n';
import { useInnerText } from '../inner_text';
import { useMutationObserver } from '../observer/mutation_observer';
import { useResizeObserver } from '../observer/resize_observer';
import { EuiOverlayMask } from '../overlay_mask';

type ExtendedRefractorNode = RefractorNode & {
  lineStart?: number;
  lineEnd?: number;
};

const isAstElement = (node: RefractorNode): node is AST.Element =>
  node.hasOwnProperty('type') && node.type === 'element';

const nodeToHtml = (
  node: RefractorNode,
  idx: number,
  nodes: RefractorNode[],
  depth: number = 0
): ReactNode => {
  if (isAstElement(node)) {
    const { properties, tagName, children } = node;

    return React.createElement(
      tagName,
      {
        ...properties,
        key: `node-${depth}-${idx}`,
        className: classNames(properties.className),
      },
      children && children.map((el, i) => nodeToHtml(el, i, nodes, depth + 1))
    );
  }

  return node.value;
};

const addLineData = (
  nodes: ExtendedRefractorNode[],
  data = { lineNumber: 1 }
): ExtendedRefractorNode[] => {
  return nodes.reduce<ExtendedRefractorNode[]>((result, node) => {
    const lineStart = data.lineNumber;
    if (node.type === 'text') {
      if (!node.value.match(/\r\n?|\n/)) {
        node.lineStart = lineStart;
        node.lineEnd = lineStart;
        result.push(node);
      } else {
        const lines = node.value.split(/\r\n?|\n/);
        lines.forEach((line, i) => {
          const num = i === 0 ? data.lineNumber : ++data.lineNumber;
          result.push({
            type: 'text',
            value: i === lines.length - 1 ? line : `${line}\n`,
            lineStart: num,
            lineEnd: num,
          });
        });
      }
      return result;
    }

    if (node.children && node.children.length) {
      const children = addLineData(node.children, data);
      const first = children[0];
      const last = children[children.length - 1];
      const start = first.lineStart ?? lineStart;
      const end = last.lineEnd ?? lineStart;
      if (start !== end) {
        children.forEach((node) => {
          result.push(node);
        });
      } else {
        node.lineStart = start;
        node.lineEnd = end;
        node.children = children;
        result.push(node);
      }
      return result;
    }

    result.push(node);
    return result;
  }, []);
};

function wrapLines(nodes: ExtendedRefractorNode[]) {
  const grouped: ExtendedRefractorNode[][] = [];
  nodes.forEach((node) => {
    const lineStart = node.lineStart! - 1;
    if (grouped[lineStart]) {
      grouped[lineStart].push(node);
    } else {
      grouped[lineStart] = [node];
    }
  });
  const wrapped: RefractorNode[] = [];
  grouped.forEach((node) => {
    wrapped.push({
      type: 'element',
      tagName: 'span',
      properties: {
        className: ['euiCodeBlock__line'],
      },
      children: node,
    });
  });
  return wrapped;
}

const highlightByLine = (children: string, language: string) => {
  return wrapLines(addLineData(highlight(children, language)));
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

export interface EuiCodeBlockImplProps {
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
   * @see https://github.com/wooorm/refractor#syntaxes
   * for options
   */
  language?: string;
  overflowHeight?: number;
  paddingSize?: PaddingSize;
  transparentBackground?: boolean;
  /**
   * Specify how `white-space` inside the element is handled.
   * `pre` respects line breaks/white space but doesn't force them to wrap the line
   * `pre-wrap` respects line breaks/white space but does force them to wrap the line when necessary.
   */
  whiteSpace?: 'pre' | 'pre-wrap';
}

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
  language,
  inline,
  children,
  className,
  overflowHeight,
  ...rest
}) => {
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

  const content = useMemo(() => {
    if (!language || typeof children !== 'string') {
      return children;
    }
    const nodes = inline
      ? highlight(children, language)
      : highlightByLine(children, language);
    return nodes.length === 0 ? children : nodes.map(nodeToHtml);
  }, [children, language, inline]);

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
      'euiCodeBlock--hasControls': isCopyable || overflowHeight,
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
  });

  const optionalStyles: CSSProperties = {};

  if (overflowHeight) {
    optionalStyles.maxHeight = overflowHeight;
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

  const getCopyButton = (textToCopy?: string) => {
    let copyButton: JSX.Element | undefined;

    if (isCopyable && textToCopy) {
      copyButton = (
        <div className="euiCodeBlock__copyButton">
          <EuiI18n token="euiCodeBlock.copyButton" default="Copy">
            {(copyButton: string) => (
              <EuiCopy textToCopy={textToCopy}>
                {(copy) => (
                  <EuiButtonIcon
                    onClick={copy}
                    iconType="copy"
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
        defaults={['Collapse', 'Expand']}>
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
              <pre className={preClasses} tabIndex={0}>
                <code className={codeClasses} onKeyDown={onKeyDown}>
                  {content}
                </code>
              </pre>

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
      <pre
        ref={combinedRef}
        style={optionalStyles}
        className={preClasses}
        tabIndex={tabIndex}>
        {codeSnippet}
      </pre>
      {/*
          If the below fullScreen code renders, it actually attaches to the body because of
          EuiOverlayMask's React portal usage.
        */}
      {codeBlockControls}
      {getFullScreenDisplay(codeBlockControls)}
    </div>
  );
};
