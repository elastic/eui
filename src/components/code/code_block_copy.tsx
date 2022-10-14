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

/**
 * Hook that returns copy-related state/logic/utils
 */
export const useCopy = ({
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

  const copyAriaLabel = useEuiI18n('euiCodeBlockCopy.copy', 'Copy');

  const copyButton = useMemo(() => {
    return showCopyButton ? (
      <div className="euiCodeBlock__copyButton">
        <EuiCopy textToCopy={textToCopy}>
          {(copy) => (
            <EuiButtonIcon
              onClick={copy}
              iconType="copyClipboard"
              color="text"
              aria-label={copyAriaLabel}
            />
          )}
        </EuiCopy>
      </div>
    ) : null;
  }, [showCopyButton, textToCopy, copyAriaLabel]);

  return { innerTextRef, copyButton };
};
