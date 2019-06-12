import React from 'react';

import {
  EuiFlexItem,
  EuiFlexGroup,
  EuiLink,
  EuiButton,
  EuiCopy,
} from '../../../../src/components';

import { getSpecId } from '@elastic/charts';

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

export const DATA = [
  { x: 0, y: 2 },
  { x: 1, y: 7 },
  { x: 2, y: 3 },
  { x: 3, y: 6 },
];

export const lineCustomSeriesColors = new Map();
const lineDataSeriesColorValues = {
  colorValues: [],
  specId: getSpecId('hidden'),
};
lineCustomSeriesColors.set(lineDataSeriesColorValues, '#00000000');
