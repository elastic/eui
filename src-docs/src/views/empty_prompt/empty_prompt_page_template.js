import React from 'react';

import {
  EuiPageTemplate,
  EuiEmptyPrompt,
  EuiButton,
  EuiTitle,
  EuiText,
  EuiLink,
  EuiIcon,
  EuiImage,
} from '../../../../src/components';

import illustration from '../../images/emptyPrompt__illustration.svg';

export default ({ button = <></>, sideNav }) => (
  <EuiPageTemplate
    restrictWidth={false}
    template="centeredContent"
    pageContentProps={{ paddingSize: 'none' }}
    pageSideBar={sideNav}
    pageHeader={{
      iconType: 'logoElastic',
      pageTitle: 'Page title',
      rightSideItems: [button],
    }}
  >
    <EuiEmptyPrompt
      title={<h2>Create your first data visualization</h2>}
      icon={<EuiImage size="l" src={illustration} />}
      color="plain"
      hasBorder={true}
      layout="horizontal"
      body={
        <>
          <p>
            There are no visualizations to display. This tool allows you to
            create a wide range of charts, graphs, maps, and other graphics.
          </p>
          <p>
            The visualizations you create can be easily shared with your peers.
          </p>
        </>
      }
      actions={
        <EuiButton color="primary" fill>
          Create visualization
        </EuiButton>
      }
      footer={
        <>
          <EuiTitle size="xxs">
            <h3>Want to learn more?</h3>
          </EuiTitle>
          <EuiText size="s">
            <EuiLink href="#" color="subdued">
              <EuiIcon type="documentation" /> Read documentation
            </EuiLink>
          </EuiText>
        </>
      }
    />
  </EuiPageTemplate>
);
