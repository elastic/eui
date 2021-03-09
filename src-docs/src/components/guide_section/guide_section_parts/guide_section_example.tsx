import React, { FunctionComponent, ReactNode } from 'react';
import classNames from 'classnames';
import { EuiSplitPanel } from '../../../../../src/components/panel';
import { _EuiSplitPanelInnerProps } from '../../../../../src/components/panel/split_panel/';

export interface GuideSectionExample {
  example: ReactNode;
  tabs?: ReactNode;
  /** Forces display of a certain content (playground props table) */
  tabContent?: ReactNode;
  ghostBackground?: boolean;
  demoPanelProps?: _EuiSplitPanelInnerProps;
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

  console.log('demoPanelProps', demoPanelProps);

  return (
    <EuiSplitPanel.Outer className={classes}>
      <EuiSplitPanel.Inner {...demoPanelProps}>{example}</EuiSplitPanel.Inner>
      <EuiSplitPanel.Inner paddingSize="none" color="subdued">
        {tabs}
        {tabContent}
      </EuiSplitPanel.Inner>
    </EuiSplitPanel.Outer>
  );
};
