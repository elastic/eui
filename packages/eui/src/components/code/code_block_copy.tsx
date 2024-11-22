/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { ReactNode, useMemo } from 'react';
import { useInnerText } from '../inner_text';
import { EuiCopy } from '../copy';
import { useEuiI18n } from '../i18n';
import { EuiButtonIcon } from '../button';
import { NEW_LINE_REGEX_GLOBAL } from './utils';

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
  const innerText = useMemo(
    () =>
      _innerText
        // Normalize line terminations to match native JS format
        ?.replace(NEW_LINE_REGEX_GLOBAL, '\n')
        // Reduce two or more consecutive new line characters to a single one
        // This is needed primarily because of how syntax highlighting
        // generated DOM elements affect `innerText` output.
        .replace(/\n{2,}/g, '\n') || '',
    [_innerText]
  );
  const textToCopy = isVirtualized ? `${children}` : innerText; // Virtualized code blocks do not have inner text

  const showCopyButton = isCopyable && textToCopy;

  const copyDefaultAriaLabel = useEuiI18n('euiCodeBlockCopy.copy', 'Copy');

  const copyButton = useMemo(() => {
    return showCopyButton ? (
      <div className="euiCodeBlock__copyButton">
        <EuiCopy textToCopy={textToCopy}>
          {(copy) => (
            <EuiButtonIcon
              onClick={copy}
              iconType="copyClipboard"
              color="text"
              aria-label={copyAriaLabel || copyDefaultAriaLabel}
              data-test-subj="euiCodeBlockCopy"
            />
          )}
        </EuiCopy>
      </div>
    ) : null;
  }, [copyAriaLabel, copyDefaultAriaLabel, showCopyButton, textToCopy]);

  return { innerTextRef, copyButton };
};
