import React, { ReactElement } from 'react';
import { _EuiPageRestrictWidth } from '../../../../../src/components/page/_restrict_width';

import {
  EuiPage,
  EuiPageSideBar,
  EuiPageBody,
  EuiEmptyPrompt,
  EuiPageHeader,
  EuiPageSection,
} from '../../../../../src';

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
        <EuiPageSideBar paddingSize="l" sticky>
          {sideBar}
        </EuiPageSideBar>
      )}

      <EuiPageBody paddingSize="none" panelled={Boolean(sideBar)}>
        {pageHeader && (
          <EuiPageHeader
            bottomBorder={sideBar ? true : 'extended'}
            pageTitle="Page title"
            paddingSize="l"
          />
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
