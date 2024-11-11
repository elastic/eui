import React, { useState } from 'react';

import { EuiSelect, useEuiTheme } from '@elastic/eui';

// @ts-expect-error Docusaurus theme is missing types for this component
import { Demo } from '@elastic/eui-docusaurus-theme/lib/components/demo';

// @ts-ignore - not typed
import pageNotFoundDark from './pageNotFound--dark.png';
// @ts-ignore - not typed
import pageNotFoundLight from './pageNotFound--light.png';
// @ts-ignore - not typed
import accessDeniedDark from './accessDenied--dark.png';
// @ts-ignore - not typed
import accessDeniedLight from './accessDenied--light.png';

const types: Array<{
  value: string;
  text: string;
  code: (colorMode: 'DARK' | 'LIGHT') => string;
}> = [
  {
    value: 'errorPages',
    text: 'Page not found',
    code: (colorMode) => `<EuiEmptyPrompt
  color="subdued"
  icon={
    <EuiImage
      size="fullWidth"
      src="${colorMode === 'DARK' ? pageNotFoundDark : pageNotFoundLight}"
      alt="An outer space illustration. In the background is a large moon and two planets. In the foreground is an astronaut floating in space and the numbers '404'."
    />
  }
  title={<h2>Page not found</h2>}
  layout="vertical"
  body={
    <p>
      We can&apos;t find the page you&apos;re looking for. It might have
      been removed, renamed, or it didn&apos;t exist in the first place.
    </p>
  }
  actions={[
    <EuiButton color="primary" fill>
      Home
    </EuiButton>,
    <EuiButtonEmpty iconType="arrowLeft" flush="both">
      Go back
    </EuiButtonEmpty>,
  ]}
/>`,
  },
  {
    value: 'noPrivileges',
    text: 'No permission',
    code: (colorMode) => `<EuiEmptyPrompt
  color="subdued"
  icon={
    <EuiImage
      size="fullWidth"
      src="${colorMode === 'DARK' ? accessDeniedDark : accessDeniedLight}"
      alt=""
    />
  }
  title={<h2>Access denied</h2>}
  layout="vertical"
  body={
    <p>
      Sorry to rain on your parade, but you don't have permissions to access
      this page.
    </p>
  }
  actions={[
    <EuiButton color="primary" fill>
      Home
    </EuiButton>,
    <EuiButtonEmpty iconType="arrowLeft" flush="both">
      Go back
    </EuiButtonEmpty>,
  ]}
/>`,
  },
  {
    value: 'licenseUpgrade',
    text: 'License upgrade',
    code: () => `<EuiEmptyPrompt
  color="subdued"
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
        Read the docs
      </EuiLink>
    </>
  }
/>`,
  },
];

export default () => {
  const { colorMode } = useEuiTheme();

  const [selectedType, setSelectedType] = useState(types[0]);

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const type = types.find((option) => option.value === e.target.value);
    if (type) {
      setSelectedType(type);
    }
  };

  return (
    <>
      <EuiSelect
        prepend="Examples"
        options={types.map((type) => ({
          value: type.value,
          text: type.text,
        }))}
        value={selectedType.value}
        onChange={(e) => onChange(e)}
        aria-label="Empty prompt examples"
      />

      <Demo key={`${selectedType.value}--${colorMode}`}>
        {selectedType.code(colorMode)}
      </Demo>
    </>
  );
};
