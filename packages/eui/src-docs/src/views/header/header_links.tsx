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
          {(closeMobilePopover) => (
            <>
              <EuiHeaderLink isActive onClick={closeMobilePopover}>
                Docs
              </EuiHeaderLink>

              <EuiHeaderLink onClick={closeMobilePopover}>Code</EuiHeaderLink>

              <EuiHeaderLink iconType="help" onClick={closeMobilePopover}>
                Help
              </EuiHeaderLink>
            </>
          )}
        </EuiHeaderLinks>
      </EuiHeaderSectionItem>
    </EuiHeader>
  );
};
