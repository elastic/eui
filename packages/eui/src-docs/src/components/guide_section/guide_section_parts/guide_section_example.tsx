import React, { FunctionComponent, ReactNode } from 'react';
import classNames from 'classnames';
import { EuiSplitPanel } from '../../../../../src/components/panel';
import { _EuiSplitPanelInnerProps } from '../../../../../src/components/panel/split_panel/';
import { EuiHorizontalRule, useEuiTheme } from '../../../../../src';

export interface GuideSectionExample {
  example: ReactNode;
  tabs?: ReactNode;
  /** Forces display of a certain content (playground props table) */
  tabContent?: ReactNode;
  ghostBackground?: boolean;
  demoPanelProps?: _EuiSplitPanelInnerProps;
  /** Creates another inner split panel containing an array of custom controls */
  exampleToggles?: any;
}

export const GuideSectionExample: FunctionComponent<GuideSectionExample> = ({
  example,
  tabs,
  ghostBackground = false,
  tabContent,
  demoPanelProps,
  exampleToggles,
}) => {
  const classes = classNames(demoPanelProps?.className, {
    guideDemo__ghostBackground: ghostBackground,
  });

  const { highContrastMode } = useEuiTheme();

  return (
    <EuiSplitPanel.Outer hasBorder hasShadow={false} data-eui-docs-example>
      <EuiSplitPanel.Inner
        color="plain"
        {...demoPanelProps}
        className={classes}
      >
        {example}
      </EuiSplitPanel.Inner>
      {exampleToggles && !highContrastMode && (
        <EuiHorizontalRule margin="none" />
      )}
      {exampleToggles && (
        <EuiSplitPanel.Inner paddingSize="m" color="subdued">
          {exampleToggles}
        </EuiSplitPanel.Inner>
      )}
      {exampleToggles && tabs && !highContrastMode && (
        <EuiHorizontalRule margin="none" />
      )}
      {(tabs || tabContent) && (
        <EuiSplitPanel.Inner paddingSize="none" color="subdued">
          {tabs}
          {tabContent}
        </EuiSplitPanel.Inner>
      )}
    </EuiSplitPanel.Outer>
  );
};
