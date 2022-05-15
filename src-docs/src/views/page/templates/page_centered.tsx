import React, { ReactElement } from 'react';

import {
  EuiEmptyPrompt,
  EuiPageTemplate,
  EuiPageTemplateProps,
} from '../../../../../src';

export default ({
  content = <></>,
  alignment,
  sidebar,
  header,
  panelled,
}: {
  content: ReactElement;
  sidebar?: ReactElement;
  header?: EuiPageTemplateProps['pageHeader'];
  panelled?: EuiPageTemplateProps['panelled'];
  alignment?: EuiPageTemplateProps['alignment'];
}) => (
  <EuiPageTemplate
    alignment={alignment}
    pageSideBar={sidebar}
    pageHeader={header}
    panelled={panelled}
  >
    {alignment === 'center' ? (
      <EuiEmptyPrompt
        color={header ? 'subdued' : 'plain'}
        title={<span>No spice</span>}
        body={content}
      />
    ) : (
      content
    )}
  </EuiPageTemplate>
);
