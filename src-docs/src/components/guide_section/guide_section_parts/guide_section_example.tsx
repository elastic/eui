import React, { FunctionComponent, ReactNode } from 'react';

import { EuiTabs } from '../../../../../src/components/tabs';
import { EuiFlexGroup, EuiFlexItem } from '../../../../../src/components/flex';
import { EuiPanel } from '../../../../../src/components/panel/panel';
import { EuiTitle } from '../../../../../src/components/title';

export interface GuideSectionExample {
  exampleCode: ReactNode;
  tabs?: ReactNode;
  tabContent?: ReactNode;
  playground?: any;
  componentName?: string;
}

export const GuideSectionExample: FunctionComponent<GuideSectionExample> = ({
  exampleCode,
  tabs,
  playground,
  tabContent,
  componentName,
}) => {
  return (
    <EuiPanel paddingSize="none" style={{ overflow: 'hidden' }}>
      <EuiPanel hasShadow={false} paddingSize="l" color="transparent">
        <EuiFlexGroup direction="column" alignItems="center">
          {exampleCode}
        </EuiFlexGroup>
      </EuiPanel>
      <EuiPanel
        paddingSize="s"
        color="subdued"
        hasShadow={false}
        borderRadius="none">
        {tabs ? (
          <EuiFlexGroup gutterSize="none" alignItems="center">
            <EuiFlexItem>
              <EuiTabs size="s" display="condensed">
                {tabs}
              </EuiTabs>
            </EuiFlexItem>
            <EuiFlexItem grow={false}>{playground}</EuiFlexItem>
          </EuiFlexGroup>
        ) : (
          <EuiTitle size="s">
            <h2>{componentName}</h2>
          </EuiTitle>
        )}
        {tabContent}
      </EuiPanel>
    </EuiPanel>
  );
};
