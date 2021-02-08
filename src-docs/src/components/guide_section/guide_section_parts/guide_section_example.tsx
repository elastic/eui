import React, { FunctionComponent, ReactNode } from 'react';
import classNames from 'classnames';

import { EuiTabs } from '../../../../../src/components/tabs';
import { EuiFlexGroup, EuiFlexItem } from '../../../../../src/components/flex';
import { EuiSplitPanel } from '../../../../../src/components/panel';
import { EuiIcon } from '../../../../../src/components/icon';

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
    // @ts-ignore TODO: Fix TS type
    <EuiSplitPanel className={classes}>
      {/* @ts-ignore TODO: Fix TS type */}
      {(InnerPanel) => (
        <>
          <InnerPanel>{exampleCode}</InnerPanel>
          <InnerPanel paddingSize="none" color="subdued">
            <EuiFlexGroup
              responsive={Boolean(playground)}
              className={tabClasses}
              gutterSize="none"
              alignItems="center">
              <EuiFlexItem>
                <EuiFlexGroup
                  responsive={false}
                  gutterSize="m"
                  alignItems="center">
                  <EuiFlexItem grow={false}>
                    <EuiIcon type="editorCodeBlock" />
                  </EuiFlexItem>
                  <EuiFlexItem grow={false}>
                    <EuiTabs
                      className="eui-displayInlineBlock"
                      size="s"
                      display="condensed">
                      {tabs}
                    </EuiTabs>
                  </EuiFlexItem>
                </EuiFlexGroup>
              </EuiFlexItem>
              {playground && (
                <EuiFlexItem grow={false}>{playground}</EuiFlexItem>
              )}
            </EuiFlexGroup>
            {tabContent && (
              <InnerPanel paddingSize="none" color="subdued">
                {tabContent}
              </InnerPanel>
            )}
          </InnerPanel>
        </>
      )}
    </EuiSplitPanel>
  );
};
