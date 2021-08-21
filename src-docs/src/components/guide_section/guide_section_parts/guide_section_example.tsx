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
  const classes = classNames(demoPanelProps?.className, {
    guideDemo__ghostBackground: ghostBackground,
  });

  return (
    <EuiSplitPanel.Outer hasBorder hasShadow={false}>
      <EuiSplitPanel.Inner
        color="plain"
        {...demoPanelProps}
        className={classes}
      >
        {example}
      </EuiSplitPanel.Inner>
      {(tabs || tabContent) && (
        <EuiSplitPanel.Inner paddingSize="none" color="subdued">
          {tabs}
          {tabContent}
        </EuiSplitPanel.Inner>
      )}
    </EuiSplitPanel.Outer>
  );
};
