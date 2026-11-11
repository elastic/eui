/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  FunctionComponent,
  HTMLAttributes,
  ReactNode,
  SVGAttributes,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import type { SerializedStyles } from '@emotion/react';

import { noCopyBoundsRegex, useEuiMemoizedStyles } from '../../services';
import { useInnerText } from '../inner_text';
import { EuiCopy } from '../copy';
import { useEuiI18n } from '../i18n';
import { EuiButtonIcon } from '../button';
import { EuiIcon } from '../icon';
import { NEW_LINE_REGEX_GLOBAL } from './utils';
import { euiCodeBlockCopyIconStyles } from './code_block_copy.styles';

const CodeBlockCopiedContext = createContext(false);
// POC: motion study held the check for about 1.8s. 0.75s keeps the confirmation brief.
const COPY_CHECK_HOLD_MS = 750;

const CodeBlockCopyIcon: FunctionComponent<
  SVGAttributes<SVGElement> & { css?: SerializedStyles | SerializedStyles[] }
> = ({ css: iconCss, ...rest }) => {
  const showCheck = useContext(CodeBlockCopiedContext);
  const styles = useEuiMemoizedStyles(euiCodeBlockCopyIconStyles);

  return (
    // POC: iconType passes SVG props; only className/aria attrs reach this span.
    <span {...(rest as HTMLAttributes<HTMLSpanElement>)} css={iconCss}>
      <span css={styles.frame}>
        <span css={[styles.layer, showCheck ? styles.hidden : styles.visible]}>
          <EuiIcon type="copy" color="inherit" aria-hidden="true" />
        </span>
        <span css={[styles.layer, showCheck ? styles.visible : styles.hidden]}>
          <EuiIcon type="check" color="inherit" aria-hidden="true" />
        </span>
      </span>
    </span>
  );
};

const CodeBlockCopyButton: FunctionComponent<{
  copy: () => void;
  copyCount: number;
  label: string;
}> = ({ copy, copyCount, label }) => {
  const [showCheck, setShowCheck] = useState(false);
  const timer = useRef<number>();

  useEffect(() => {
    if (!copyCount) return;
    setShowCheck(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(
      () => setShowCheck(false),
      COPY_CHECK_HOLD_MS
    );
  }, [copyCount]);

  useEffect(
    () => () => {
      window.clearTimeout(timer.current);
    },
    []
  );

  return (
    <CodeBlockCopiedContext.Provider value={showCheck}>
      <EuiButtonIcon
        onClick={copy}
        iconType={CodeBlockCopyIcon}
        color="text"
        aria-label={label}
        data-test-subj="euiCodeBlockCopy"
      />
    </CodeBlockCopiedContext.Provider>
  );
};

/**
 * Hook that returns copy-related state/logic/utils
 */
export const useCopy = ({
  copyAriaLabel,
  isCopyable,
  isVirtualized,
  children,
}: {
  copyAriaLabel?: string;
  isCopyable: boolean;
  isVirtualized: boolean;
  children: ReactNode;
}) => {
  const [innerTextRef, _innerText] = useInnerText('');
  const innerText = useMemo(() => {
    if (!_innerText) return;

    return (
      _innerText
        // remove text that should not be copied (e.g. screen reader instructions)
        ?.replace(noCopyBoundsRegex, '')
        // Normalize line terminations to match native JS format
        ?.replace(NEW_LINE_REGEX_GLOBAL, '\n')
        // remove initial line break (if there was hidden content removed)
        ?.replace(/^\n/, '')
        // Reduce two or more consecutive new line characters to a single one
        // This is needed primarily because of how syntax highlighting
        // generated DOM elements affect `innerText` output.
        ?.replace(/\n{2,}/g, '\n') || ''
    );
  }, [_innerText]);
  const textToCopy = isVirtualized ? `${children}` : innerText; // Virtualized code blocks do not have inner text

  const showCopyButton = isCopyable && textToCopy;

  const copyDefaultAriaLabel = useEuiI18n('euiCodeBlockCopy.copy', 'Copy');

  const copyButton = useMemo(() => {
    return showCopyButton ? (
      <div className="euiCodeBlock__copyButton">
        <EuiCopy textToCopy={textToCopy}>
          {(copy, _isCopied, copyCount) => (
            <CodeBlockCopyButton
              copy={copy}
              copyCount={copyCount}
              label={copyAriaLabel || copyDefaultAriaLabel}
            />
          )}
        </EuiCopy>
      </div>
    ) : null;
  }, [copyAriaLabel, copyDefaultAriaLabel, showCopyButton, textToCopy]);

  return { innerTextRef, copyButton };
};
