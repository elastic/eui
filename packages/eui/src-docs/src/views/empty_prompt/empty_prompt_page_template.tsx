import React from 'react';

import {
  EuiPageTemplate,
  EuiButton,
  EuiTitle,
  EuiLink,
  EuiImage,
} from '../../../../src/components';
import illustration from '../../images/empty-prompt/illustration.svg';

export default () => (
  <EuiPageTemplate minHeight="0">
    <EuiPageTemplate.EmptyPrompt
      title={<h2>Create your first visualization</h2>}
      icon={<EuiImage size="fullWidth" src={illustration} alt="" />}
      color="plain"
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
            <span>Want to learn more?</span>
          </EuiTitle>{' '}
          <EuiLink href="#" target="_blank">
            Read the docs
          </EuiLink>
        </>
      }
    />
  </EuiPageTemplate>
);
