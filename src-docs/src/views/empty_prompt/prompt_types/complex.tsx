import React from 'react';

import {
  EuiEmptyPrompt,
  EuiButton,
  EuiButtonEmpty,
  EuiImage,
  EuiFlexGroup,
  EuiFlexItem,
  EuiTitle,
} from '../../../../../src/components';

import illustration from '../../../images/empty-prompt_illustration.svg';

export default () => (
  <EuiEmptyPrompt
    icon={<EuiImage size="fullWidth" src={illustration} alt="" />}
    title={<h2>Get started by adding your data</h2>}
    layout="horizontal"
    color="plain"
    body={
      <>
        <p>
          To start working with your data, use one of our many ingest options.
          Collect data from an app or service, or upload a file.
        </p>
        <p>
          If you&apos;re not ready to use your own data, add a sample data set.
        </p>
      </>
    }
    actions={[
      <EuiButton color="primary" fill>
        Add your data
      </EuiButton>,
      <EuiButtonEmpty>Try sample data</EuiButtonEmpty>,
    ]}
    footer={
      <EuiFlexGroup className="eui-textLeft">
        <EuiFlexItem grow={false}>
          <EuiTitle size="xxs">
            <h3>Want to learn more?</h3>
          </EuiTitle>
          <span>
            <EuiButtonEmpty
              href="#"
              iconType="popout"
              iconSide="right"
              iconSize="s"
              flush="both"
              size="s"
            >
              Read documentation
            </EuiButtonEmpty>
          </span>
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <EuiTitle size="xxs">
            <h3>Pretty sure you have data?</h3>
          </EuiTitle>
          <span>
            <EuiButtonEmpty
              onClick={() => {}}
              iconType="refresh"
              iconSide="right"
              iconSize="s"
              flush="both"
              size="s"
            >
              Check for new data
            </EuiButtonEmpty>
          </span>
        </EuiFlexItem>
      </EuiFlexGroup>
    }
  />
);
