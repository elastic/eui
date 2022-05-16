import React, { ReactElement } from 'react';
import { _EuiPageRestrictWidth } from '../../../../../src/components/page/_restrict_width';

import { EuiEmptyPrompt, EuiPageTemplate } from '../../../../../src';

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
    <EuiPageTemplate.Outer>
      {sideBar && (
        <EuiPageTemplate.Sidebar paddingSize="l">
          {sideBar}
        </EuiPageTemplate.Sidebar>
      )}

      <EuiPageTemplate.Inner panelled={Boolean(sideBar)}>
        {pageHeader && (
          <EuiPageTemplate.Header
            bottomBorder={sideBar ? true : 'extended'}
            pageTitle="Page title"
            paddingSize="l"
          />
        )}

        {emptyPrompt ? (
          <EuiPageTemplate.Section
            color={pageHeader ? 'plain' : 'transparent'}
            alignment={'center'}
            grow
          >
            <EuiEmptyPrompt
              title={<span>No spice</span>}
              body={content}
              color={pageHeader || sideBar ? 'subdued' : 'plain'}
            />
          </EuiPageTemplate.Section>
        ) : (
          <EuiPageTemplate.Section color={'plain'} alignment={'top'} grow>
            {content}
          </EuiPageTemplate.Section>
        )}
      </EuiPageTemplate.Inner>
    </EuiPageTemplate.Outer>
  );
};
