import React, { ReactElement } from 'react';

import { EuiPageTemplate, EuiPageTemplateProps } from '../../../../../src';

export default ({
  content = <></>,
  header,
  panelled,
}: {
  content: ReactElement;
  header?: EuiPageTemplateProps['pageHeader'];
  panelled?: EuiPageTemplateProps['panelled'];
}) => (
  <EuiPageTemplate pageHeader={header} panelled={panelled}>
    {content}
  </EuiPageTemplate>
);
