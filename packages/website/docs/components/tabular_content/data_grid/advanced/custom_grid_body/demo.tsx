import React, { useState } from 'react';
// @ts-ignore - missing types?
import BrowserOnly from '@docusaurus/BrowserOnly';
import {
  EuiSplitPanel,
  EuiFlexGroup,
  EuiSwitch,
  EuiTabbedContent,
  EuiCodeBlock,
} from '@elastic/eui';

import virtualizedSource from '!!raw-loader!./virtualized_body';
import VirtualizedBody from './virtualized_body';

import unvirtualizedSource from '!!raw-loader!./unvirtualized_body';
import UnvirtualizedBody from './unvirtualized_body';

import dataSource from '!!raw-loader!./data_columns_cells';
import dataGridSource from '!!raw-loader!./data_grid';

export default () => {
  const [virtualized, setVirtualized] = useState(false);
  const [autoHeight, setAutoHeight] = useState(true);

  return (
    <EuiSplitPanel.Outer hasBorder>
      <EuiSplitPanel.Inner color="subdued">
        <EuiFlexGroup alignItems="center">
          <EuiSwitch
            label="Custom virtualization"
            checked={virtualized}
            onChange={() => setVirtualized(!virtualized)}
          />
          <EuiSwitch
            label="Constrained grid height"
            checked={virtualized ? true : !autoHeight}
            disabled={virtualized}
            onChange={() => setAutoHeight(!autoHeight)}
          />
        </EuiFlexGroup>
      </EuiSplitPanel.Inner>
      <EuiSplitPanel.Inner>
        <BrowserOnly>
          {() =>
            virtualized ? (
              <VirtualizedBody />
            ) : (
              <UnvirtualizedBody autoHeight={autoHeight} />
            )
          }
        </BrowserOnly>
      </EuiSplitPanel.Inner>
      <EuiSplitPanel.Inner color="subdued" paddingSize="none">
        <EuiTabbedContent
          size="s"
          css={{ '.euiTabs': { paddingInlineStart: 12 } }}
          tabs={[
            {
              id: 'body',
              name: 'Body component',
              content: (
                <CodeSnippetWrapper>
                  {virtualized ? virtualizedSource : unvirtualizedSource}
                </CodeSnippetWrapper>
              ),
            },
            {
              id: 'cell',
              name: 'Cell components',
              content: <CodeSnippetWrapper>{dataSource}</CodeSnippetWrapper>,
            },
            {
              id: 'datagrid',
              name: 'Data grid component',
              content: (
                <CodeSnippetWrapper>{dataGridSource}</CodeSnippetWrapper>
              ),
            },
          ]}
        />
      </EuiSplitPanel.Inner>
    </EuiSplitPanel.Outer>
  );
};

const CodeSnippetWrapper = ({ children }) => (
  <EuiCodeBlock
    language="tsx"
    isCopyable
    fontSize="m"
    paddingSize="m"
    overflowHeight={400}
  >
    {children}
  </EuiCodeBlock>
);
