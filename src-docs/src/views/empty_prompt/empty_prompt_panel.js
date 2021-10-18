import React, { useState } from 'react';

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
        icon={<EuiImage size="l" src={illustration} />}
        layout="horizontal"
        title={<h2>Create your first visualization</h2>}
        color={panelColor}
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
