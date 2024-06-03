import React, { ReactElement } from 'react';
import { _EuiPageRestrictWidth } from '../../../../src/components/page/_restrict_width';

import {
  EuiPage,
  EuiPageSidebar,
  EuiPageBody,
  EuiEmptyPrompt,
  EuiPageHeader,
  EuiPageSection,
} from '../../../../src';

export default ({
  content = <></>,
  sideBar,
  pageHeader,
  emptyPrompt,
}: _EuiPageRestrictWidth & {
  content: ReactElement;
  sideBar?: ReactElement;
  pageHeader?: boolean;
  emptyPrompt?: boolean;
}) => {
  return (
    <EuiPage paddingSize="none">
      {sideBar && (
        <EuiPageSidebar paddingSize="l" sticky>
          {sideBar}
        </EuiPageSidebar>
      )}

      <EuiPageBody paddingSize="none" panelled={Boolean(sideBar)}>
        {pageHeader && (
          <EuiPageSection bottomBorder={sideBar ? true : 'extended'}>
            <EuiPageHeader pageTitle="Page title" />
          </EuiPageSection>
        )}

        {emptyPrompt ? (
          <EuiPageSection
            color={pageHeader ? 'plain' : 'transparent'}
            alignment={'center'}
            grow
          >
            <EuiEmptyPrompt
              title={<span>No spice</span>}
              body={content}
              color={pageHeader || sideBar ? 'subdued' : 'plain'}
            />
          </EuiPageSection>
        ) : (
          <EuiPageSection color={'plain'} alignment={'top'} grow>
            {content}
          </EuiPageSection>
        )}
      </EuiPageBody>
    </EuiPage>
  );
};
