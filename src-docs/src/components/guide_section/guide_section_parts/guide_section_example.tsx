import React, { FunctionComponent, ReactNode } from 'react';
import classNames from 'classnames';

import { EuiTabs } from '../../../../../src/components/tabs';
import { EuiFlexGroup, EuiFlexItem } from '../../../../../src/components/flex';
import { EuiPanel, EuiSplitPanel } from '../../../../../src/components/panel';

export interface GuideSectionExample {
  exampleCode: ReactNode;
  tabs?: ReactNode;
  tabContent?: ReactNode;
  playground?: any;
  ghostBackground?: boolean;
}

export const GuideSectionExample: FunctionComponent<GuideSectionExample> = ({
  exampleCode,
  tabs,
  playground,
  tabContent,
  ghostBackground = false,
}) => {
  const classes = classNames({
    guideDemo__ghostBackground: ghostBackground,
  });

  const tabClasses = classNames('guideDemo__tabs', {
    'guideDemo__tabs--open': tabContent,
  });

  return (
    <EuiSplitPanel className={classes}>
      {(panelProps) => (
        <>
          <EuiPanel {...panelProps}>{exampleCode}</EuiPanel>
          <EuiPanel {...panelProps} paddingSize="none" color="subdued">
            <EuiFlexGroup
              className={tabClasses}
              gutterSize="none"
              alignItems="center">
              <EuiFlexItem>
                <EuiTabs size="s" display="condensed">
                  {tabs}
                </EuiTabs>
              </EuiFlexItem>
              <EuiFlexItem grow={false}>{playground}</EuiFlexItem>
            </EuiFlexGroup>
            {tabContent && (
              <EuiPanel {...panelProps} paddingSize="none" color="subdued">
                {tabContent}
              </EuiPanel>
            )}
          </EuiPanel>
        </>
      )}
    </EuiSplitPanel>
  );
};
