import React, { useState } from 'react';

import {
  EuiEmptyPrompt,
  EuiButton,
  EuiSpacer,
  EuiSelect,
  EuiTitle,
  EuiLink,
} from '../../../../src/components';

export default () => {
  const panelColorsArray = [
    'plain',
    'primary',
    'success',
    'accent',
    'warning',
    'danger',
    'subdued',
    'transparent',
  ];

  const panelColorsOptions = panelColorsArray.map((name) => {
    return {
      value: name,
      text: name,
    };
  });

  const [panelColor, setPanelColor] = useState(panelColorsOptions[0].value);

  const onChangePanelColor = (e) => {
    setPanelColor(e.target.value);
  };

  return (
    <>
      <EuiSelect
        prepend="Color"
        options={panelColorsOptions}
        value={panelColor}
        onChange={(e) => onChangePanelColor(e)}
        compressed
        aria-label="Empty prompt panel colors"
      />

      <EuiSpacer size="l" />
      <EuiEmptyPrompt
        iconType="logoSecurity"
        title={<h2>Start adding cases</h2>}
        color={panelColor}
        body={
          <p>
            There are no cases to display. Add a new case or change your filter
            settings.
          </p>
        }
        actions={
          <EuiButton color="primary" fill>
            Add a case
          </EuiButton>
        }
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
    </>
  );
};
