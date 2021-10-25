import React, { Fragment, useState } from 'react';

import {
  EuiEmptyPrompt,
  EuiButton,
  EuiButtonEmpty,
  EuiImage,
  EuiLink,
  EuiSpacer,
  EuiSelect,
  EuiFlexGroup,
  EuiFlexItem,
  EuiTitle,
} from '../../../../src/components';

import illustration from '../../images/empty-prompt_illustration.svg';

export default () => {
  const pageError = (
    <EuiEmptyPrompt
      icon={<EuiImage size="l" src={illustration} alt="" />}
      title={<h2>Page not found</h2>}
      layout="vertical"
      body={
        <p>
          The page you are looking for might have been removed or temporarily
          unavailable.
        </p>
      }
      actions={[
        <EuiButton color="primary" fill>
          Go home
        </EuiButton>,
        <EuiButtonEmpty iconType="arrowLeft" flush="left">
          Go back
        </EuiButtonEmpty>,
      ]}
    />
  );

  const noPermission = (
    <EuiEmptyPrompt
      iconType="lock"
      title={<h2>Contact your administrator for access</h2>}
      body={<p>To view cases in this space, you need additional privileges.</p>}
      actions={
        <EuiButton color="primary" fill>
          Go home
        </EuiButton>
      }
    />
  );

  const licenseUpgrade = (
    <EuiEmptyPrompt
      iconType="logoKibana"
      title={<h2>Do more with Kibana!</h2>}
      layout="vertical"
      hasBorder
      body={
        <p>
          Start a free trial or upgrade your license to use anomaly detection.
        </p>
      }
      actions={[
        <EuiButton color="primary" fill>
          Upgrade
        </EuiButton>,
        <EuiButtonEmpty>Start a free trial</EuiButtonEmpty>,
      ]}
      footer={
        <>
          <EuiTitle size="xxs">
            <h3>Want to learn more?</h3>
          </EuiTitle>
          <EuiLink href="#" target="_blank">
            Read documentation
          </EuiLink>
        </>
      }
    />
  );

  const noData = (
    <EuiEmptyPrompt
      icon={<EuiImage size="l" src={illustration} alt="" />}
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
            If you&apos;re not ready to use your own data, add a sample data
            set.
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
        <EuiFlexGroup>
          <EuiFlexItem grow={false}>
            <EuiTitle size="xxs">
              <h3>Want to learn more?</h3>
            </EuiTitle>

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

  const options = [
    {
      value: 'pageError',
      text: 'Page error',
      component: pageError,
    },
    {
      value: 'noPermission',
      text: 'No permission',
      component: noPermission,
    },
    {
      value: 'licenseUpgrade',
      text: 'License upgrade',
      component: licenseUpgrade,
    },
    {
      value: 'noData',
      text: 'No data',
      component: noData,
    },
  ];

  const [value, setValue] = useState(options[0].value);
  const [emptyState, setEmptyState] = useState(options[0].component);

  const onChange = (e) => {
    setValue(e.target.value);

    const component = options.find((item) => item.value === e.target.value);

    setEmptyState(component.component);
  };

  return (
    <>
      <EuiSelect
        prepend="Examples"
        options={options}
        value={value}
        onChange={(e) => onChange(e)}
        aria-label="Empty prompt examples"
      />

      <EuiSpacer size="l" />

      {emptyState}
    </>
  );
};
