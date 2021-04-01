/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import classNames from 'classnames';
import hljs from 'highlight.js';
import React, {
  CSSProperties,
  FunctionComponent,
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
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
   * @see http://highlightjs.readthedocs.io/en/latest/css-classes-reference.html#language-names-and-aliases
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
  const [isPortalTargetReady, setIsPortalTargetReady] = useState(false);
  const codeTarget = useRef<HTMLDivElement | null>(null);
  const code = useRef<HTMLElement | null>(null);
  const [wrapperRef, setWrapperRef] = useState<Element | null>(null);
  const [innerTextRef, innerText] = useInnerText('');
  const [tabIndex, setTabIndex] = useState<-1 | 0>(-1);
  const combinedRef = useCombinedRefs<HTMLPreElement>([
    innerTextRef,
    setWrapperRef,
  ]);
  const { width, height } = useResizeObserver(wrapperRef);
  const [codeFullScreen, setCodeFullScreen] = useState<HTMLElement | null>(
    null
  );

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

  useEffect(() => {
    codeTarget.current = document.createElement('div');
    setIsPortalTargetReady(true);
  }, []);

  useEffect(() => {
    /**
     * because React maintains a mapping between its Virtual DOM representation and the actual
     * DOM elements (including text nodes), and hljs modifies the DOM structure which leads
     * to React updating detached nodes, we render to a document fragment and
     * copy from that fragment into the target elements
     * (https://github.com/elastic/eui/issues/2322)
     */
    const html = isPortalTargetReady ? codeTarget.current!.innerHTML : '';

    if (code.current) {
      code.current.innerHTML = html;
    }

    if (language) {
      if (code.current) {
        hljs.highlightBlock(code.current);
      }
    }
  });

  useEffect(() => {
    if (codeFullScreen) {
      const html = isPortalTargetReady ? codeTarget.current!.innerHTML : '';
      codeFullScreen.innerHTML = html;
      if (language) {
        hljs.highlightBlock(codeFullScreen);
      }
    }
  }, [isPortalTargetReady, codeFullScreen, language]);

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

  const codeSnippet = <code ref={code} className={codeClasses} {...rest} />;

  const wrapperProps = {
    className: classes,
    style: optionalStyles,
  };

  if (inline) {
    return isPortalTargetReady ? (
      <>
        {createPortal(children, codeTarget.current!)}
        <span {...wrapperProps}>{codeSnippet}</span>
      </>
    ) : null;
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
                <code
                  ref={setCodeFullScreen}
                  className={codeClasses}
                  onKeyDown={onKeyDown}
                />
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
  return isPortalTargetReady ? (
    <>
      {createPortal(children, codeTarget.current!)}
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
    </>
  ) : null;
};
