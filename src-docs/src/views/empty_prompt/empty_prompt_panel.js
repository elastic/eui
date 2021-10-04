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
  EuiButtonGroup,
  EuiSelect,
} from '../../../../src/components';

import illustrationLightMode from '../../images/emptyPrompt__illustration.svg';

export default () => {
  const layoutOptions = [
    {
      id: 'horizontal',
      label: 'Horizontal',
    },
    {
      id: 'vertical',
      label: 'Vertical',
    },
  ];

  const panelColorsArray = [
    'none',
    'primary',
    'success',
    'accent',
    'warning',
    'danger',
    'subdued',
    'plain',
    'transparent',
  ];

  const panelColorsOptions = panelColorsArray.map((name) => {
    if (name === 'none') {
      return {
        value: name,
        text: 'No color override',
      };
    } else {
      return {
        value: name,
        text: name,
      };
    }
  });

  const [panelColor, setPanelColor] = useState(panelColorsOptions[0].value);
  const [layout, setLayout] = useState('horizontal');

  const onChangeLayout = (optionId) => {
    setLayout(optionId);
  };

  const onChangePanelColor = (e) => {
    setPanelColor(e.target.value);
  };

  return (
    <>
      <EuiButtonGroup
        color="primary"
        legend="Change the layout"
        options={layoutOptions}
        idSelected={layout}
        onChange={(id) => onChangeLayout(id)}
      />

      <EuiSelect
        options={panelColorsOptions}
        value={panelColor}
        onChange={(e) => onChangePanelColor(e)}
      />

      <EuiSpacer size="m" />

      <EuiEmptyPrompt
        icon={<EuiImage size="fullWidth" src={illustrationLightMode} />}
        title={<h2>You have no spice</h2>}
        layout={layout}
        hasPanel
        panelProps={{
          className: 'hellooooo',
        }}
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
