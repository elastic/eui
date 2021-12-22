import React, { ReactElement } from 'react';
import { _EuiPageRestrictWidth } from '../../../../../src/components/page/_restrict_width';

import {
  EuiPage,
  EuiPageContent,
  EuiPageSideBar,
  EuiPageBody,
  EuiEmptyPrompt,
  EuiPageHeader,
} from '../../../../../src';

export default ({
  content = <></>,
  sideBar,
  centeredContent,
  restrictWidth,
}: _EuiPageRestrictWidth & {
  content: ReactElement;
  sideBar?: ReactElement;
  centeredContent?: boolean;
}) => {
  const bottomBorder = sideBar ? true : 'extended';

  return (
    <EuiPage paddingSize="none">
      {sideBar && (
        <EuiPageSideBar paddingSize="l" sticky>
          {sideBar}
        </EuiPageSideBar>
      )}

      <EuiPageBody panelled={Boolean(sideBar)}>
        {centeredContent ? (
          <EuiPageContent
            panelled={false}
            alignment="center"
            restrictWidth={restrictWidth}
          >
            <EuiEmptyPrompt
              title={<span>No spice</span>}
              body={content}
              color={sideBar ? 'subdued' : 'plain'}
            />
          </EuiPageContent>
        ) : (
          <>
            <EuiPageHeader
              bottomBorder={bottomBorder}
              restrictWidth={restrictWidth}
              pageTitle="Page title"
            />
            <EuiPageContent
              bottomBorder={bottomBorder}
              restrictWidth={restrictWidth}
              color="transparent"
              grow={false}
            >
              Secondary content
            </EuiPageContent>
            <EuiPageContent alignment={'top'} restrictWidth={restrictWidth}>
              {content}
            </EuiPageContent>
          </>
        )}
      </EuiPageBody>
    </EuiPage>
  );
};
