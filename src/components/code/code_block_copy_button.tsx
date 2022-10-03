/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */
import React, { FunctionComponent } from 'react';
import { EuiCopy } from '../copy';
import { useEuiI18n } from '../i18n';
import { EuiButtonIcon } from '../button';

export const EuiCodeBlockCopyButton: FunctionComponent<{
  textToCopy: string;
}> = ({ textToCopy }) => {
  const copyButton = useEuiI18n('euiCodeBlockCopyButton.copy', 'Copy');

  return (
    <div className="euiCodeBlock__copyButton">
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
    </div>
  );
};
