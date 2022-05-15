import React, { ReactElement } from 'react';
import { _EuiPageRestrictWidth } from '../../../../../src/components/page/_restrict_width';

import { EuiEmptyPrompt, EuiPageT } from '../../../../../src';

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
    <EuiPageT.Outer>
      {sideBar && (
        <EuiPageT.Sidebar paddingSize="l">{sideBar}</EuiPageT.Sidebar>
      )}

      <EuiPageT.Inner panelled={Boolean(sideBar)}>
        {pageHeader && (
          <EuiPageT.Header
            bottomBorder={sideBar ? true : 'extended'}
            pageTitle="Page title"
            paddingSize="l"
          />
        )}

        {emptyPrompt ? (
          <EuiPageT.Section
            color={pageHeader ? 'plain' : 'transparent'}
            alignment={'center'}
            grow
          >
            <EuiEmptyPrompt
              title={<span>No spice</span>}
              body={content}
              color={pageHeader || sideBar ? 'subdued' : 'plain'}
            />
          </EuiPageT.Section>
        ) : (
          <EuiPageT.Section color={'plain'} alignment={'top'} grow>
            {content}
          </EuiPageT.Section>
        )}
      </EuiPageT.Inner>
    </EuiPageT.Outer>
  );
};
