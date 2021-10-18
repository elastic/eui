import React from 'react';

import {
  EuiEmptyPrompt,
  EuiButton,
  EuiIcon,
  EuiTitle,
  EuiText,
  EuiImage,
  EuiLink,
} from '../../../../src/components';

import illustration from '../../images/emptyPrompt__illustration.svg';

export default () => {
  return (
    <>
      <EuiEmptyPrompt
        icon={<EuiImage size="l" src={illustration} />}
        title={<h2>Create your first visualization</h2>}
        layout="horizontal"
        color="plain"
        body={
          <>
            <p>
              There are no visualizations to display. This tool allows you to
              create a wide range of charts, graphs, maps, and other graphics.
            </p>
            <p>
              The visualizations you create can be easily shared with your
              peers.
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
    </>
  );
};
