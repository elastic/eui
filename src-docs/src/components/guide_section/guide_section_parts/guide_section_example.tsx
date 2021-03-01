import React, { FunctionComponent, ReactNode } from 'react';
import classNames from 'classnames';
import { EuiSplitPanel } from '../../../../../src/components/panel';

export interface GuideSectionExample {
  example: ReactNode;
  tabs?: ReactNode;
  /** Forces display of a certain content (playground props table) */
  tabContent?: ReactNode;
  ghostBackground?: boolean;
}

export const GuideSectionExample: FunctionComponent<GuideSectionExample> = ({
  example,
  tabs,
  ghostBackground = false,
  tabContent,
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
          <InnerPanel>{example}</InnerPanel>
          <InnerPanel paddingSize="none" color="subdued">
            {tabs}
            {tabContent}
          </InnerPanel>
        </>
      )}
    </EuiSplitPanel>
  );
};
