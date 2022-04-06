import React from 'react';

import {
  EuiPageTemplate,
  EuiFlexGrid,
  EuiFlexItem,
  EuiPanel,
  EuiCallOut,
  EuiPageHeader,
  EuiSpacer,
  EuiPageTemplateProps,
} from '../../../../../src';

export default ({
  template,
  pageHeader,
}: {
  template: EuiPageTemplateProps['template'];
  pageHeader?: EuiPageTemplateProps['pageHeader'];
}) => (
  <EuiPageTemplate restrictWidth={false} template={template}>
    <EuiCallOut title="This callout is placed before the EuiPageHeader." />
    <EuiSpacer />
    <EuiPageHeader {...pageHeader} bottomBorder />
    <EuiSpacer />
    <EuiFlexGrid columns={2}>
      <EuiFlexItem>
        <EuiPanel style={{ height: 200 }} />
      </EuiFlexItem>
      <EuiFlexItem>
        <EuiPanel style={{ height: 200 }} />
      </EuiFlexItem>
      <EuiFlexItem>
        <EuiPanel style={{ height: 200 }} />
      </EuiFlexItem>
      <EuiFlexItem>
        <EuiPanel style={{ height: 200 }} />
      </EuiFlexItem>
    </EuiFlexGrid>
  </EuiPageTemplate>
);
