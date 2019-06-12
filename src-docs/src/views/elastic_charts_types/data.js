import React from 'react';

import {
  EuiFlexItem,
  EuiFlexGroup,
  EuiLink,
  EuiButton,
  EuiCopy,
} from '../../../../src/components';

export const DATA = [
  { x: 0, y: 2, g: 'data 1' },
  { x: 1, y: 7, g: 'data 1' },
  { x: 2, y: 3, g: 'data 1' },
  { x: 3, y: 6, g: 'data 1' },
  { x: 0, y: 1, g: 'data 2' },
  { x: 1, y: 3, g: 'data 2' },
  { x: 2, y: 4.5, g: 'data 2' },
  { x: 3, y: 2, g: 'data 2' },
];

export function chartsDocsCardFooterContent(docsUrl, snippet) {
  if (!docsUrl && !snippet) {
    return;
  }

  return (
    <EuiFlexGroup justifyContent="spaceBetween" alignItems="center">
      <EuiFlexItem grow={false}>
        {docsUrl && <EuiLink href={docsUrl}>Docs</EuiLink>}
      </EuiFlexItem>
      <EuiFlexItem grow={false}>
        {snippet && (
          <EuiCopy textToCopy={snippet}>
            {copy => <EuiButton onClick={copy}>Copy snippet</EuiButton>}
          </EuiCopy>
        )}
      </EuiFlexItem>
    </EuiFlexGroup>
  );
}
