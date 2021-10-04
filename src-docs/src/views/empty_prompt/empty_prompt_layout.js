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

  const [layout, setLayout] = useState('horizontal');

  const onChangeLayout = (optionId) => {
    setLayout(optionId);
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

      <EuiSpacer size="m" />

      <EuiEmptyPrompt
        icon={<EuiImage size="fullWidth" src={illustrationLightMode} />}
        title={<h2>You have no spice</h2>}
        layout={layout}
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
