import React, { Fragment, useState } from 'react';

import {
  EuiEmptyPrompt,
  EuiButton,
  EuiIcon,
  EuiTitle,
  EuiText,
  EuiImage,
  EuiLink,
  EuiSpacer,
  EuiSelect,
} from '../../../../src/components';

import illustration from '../../images/emptyPrompt__illustration.svg';

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
      />

      <EuiSpacer size="l" />

      <EuiEmptyPrompt
        icon={<EuiImage size="fullWidth" src={illustration} />}
        layout="horizontal"
        title={<h2>You have no spice</h2>}
        color={panelColor}
        body={
          <Fragment>
            <p>
              Navigators use massive amounts of spice to gain a limited form of
              prescience. This allows them to safely navigate interstellar
              space, enabling trade and travel throughout the galaxy.
            </p>
            <p>You&rsquo;ll need spice to rule Arrakis, young Atreides.</p>
          </Fragment>
        }
        actions={
          <EuiButton color="primary" fill>
            Harvest spice
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
