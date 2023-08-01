import React from 'react';

import {
  EuiHeader,
  EuiHeaderSectionItem,
  EuiHeaderLogo,
  EuiHeaderLinks,
  EuiHeaderLink,
} from '../../../../src/components';

export default () => {
  return (
    <EuiHeader>
      <EuiHeaderSectionItem>
        <EuiHeaderLogo>Elastic</EuiHeaderLogo>
      </EuiHeaderSectionItem>

      <EuiHeaderSectionItem>
        <EuiHeaderLinks aria-label="App navigation links example">
          <EuiHeaderLink isActive>Docs</EuiHeaderLink>

          <EuiHeaderLink>Code</EuiHeaderLink>

          <EuiHeaderLink iconType="help">Help</EuiHeaderLink>
        </EuiHeaderLinks>
      </EuiHeaderSectionItem>
    </EuiHeader>
  );
};
