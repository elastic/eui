import React, { FunctionComponent, ReactNode } from 'react';
import classNames from 'classnames';
import {
  EuiSplitPanel,
  EuiPanelProps,
} from '../../../../../src/components/panel';

export interface GuideSectionExample {
  example: ReactNode;
  tabs?: ReactNode;
  /** Forces display of a certain content (playground props table) */
  tabContent?: ReactNode;
  ghostBackground?: boolean;
  demoPanelProps?: EuiPanelProps;
}

export const GuideSectionExample: FunctionComponent<GuideSectionExample> = ({
  example,
  tabs,
  ghostBackground = false,
  tabContent,
  demoPanelProps,
}) => {
  const classes = classNames({
    guideDemo__ghostBackground: ghostBackground,
  });

  return (
    // @ts-ignore TODO: Fix TS type
    <EuiSplitPanel className={classes}>
      {/* @ts-ignore TODO: Fix TS type */}
      {(InnerPanel) => (
        <>
          <InnerPanel {...demoPanelProps}>{example}</InnerPanel>
          <InnerPanel paddingSize="none" color="subdued">
            {tabs}
            {tabContent}
          </InnerPanel>
        </>
      )}
    </EuiSplitPanel>
  );
};
