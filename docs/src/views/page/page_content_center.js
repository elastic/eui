import React from 'react';

import {
  KuiPage,
  KuiPageBody,
  KuiPageContent,
  KuiPageContentBody,
  KuiPageContentHeader,
  KuiPageContentHeaderSection,
  KuiTitle,
} from '../../../../src/components';

export default () => (
  <KuiPage>
    <KuiPageBody>
      <KuiPageContent verticalPosition="center" horizontalPosition="center">
        <KuiPageContentHeader>
          <KuiPageContentHeaderSection>
            <KuiTitle>
              <h2>Content title</h2>
            </KuiTitle>
          </KuiPageContentHeaderSection>
        </KuiPageContentHeader>
        <KuiPageContentBody>
          Content body
        </KuiPageContentBody>
      </KuiPageContent>
    </KuiPageBody>
  </KuiPage>
);



