/* eslint-disable import/no-unresolved */
import React, { useState, FunctionComponent } from 'react';
import reactElementToJSXString from 'react-element-to-jsx-string';
import {
  EuiSpacer,
  EuiSelect,
  EuiEmptyPrompt,
  EuiEmptyPromptProps,
} from '../../../../src/components';
import { GuideSection } from '../../components/guide_section/guide_section';
import { GuideSectionTypes } from '../../components/guide_section/guide_section_types';
import { COLORS, PanelColor } from '../../../../src/components/panel/panel';
import { examples, examplesType } from './_examples';

const example: examplesType = examples.startAddingCases;

const Panel: FunctionComponent<{
  color: EuiEmptyPromptProps['color'];
}> = ({ color }) => {
  return (
    <EuiEmptyPrompt
      iconType={example.iconTypeApp}
      title={example.title}
      color={color}
      body={example.body}
      actions={example.actions}
      footer={example.footer}
    />
  );
};

export default () => {
  const panelColorsOptions = COLORS.map((name) => {
    return {
      value: name,
      text: name,
    };
  });

  const [panelColor, setPanelColor] = useState(panelColorsOptions[0].value);

  const onChangePanelColor = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPanelColor(e.target.value as PanelColor);
  };

  const panelSource = `
  import React from 'react';
  import { EuiEmptyPrompt, EuiButton, EuiTitle, EuiLink } from '@elastic/eui';
  
  export default () => (
    ${reactElementToJSXString(
      <EuiEmptyPrompt
        iconType={example.iconTypeApp}
        title={example.title}
        color={panelColor}
        body={example.body}
        actions={example.actions}
        footer={example.footer}
      />
    )}
  );
  `;

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

      <GuideSection
        demo={<Panel color={panelColor} />}
        source={[
          {
            type: GuideSectionTypes.JSX_STRING,
            code: panelSource,
          },
        ]}
        props={{ EuiEmptyPrompt }}
        snippet={`<EuiEmptyPrompt
  iconType="solutionApp"
  color="${panelColor}"
  title={<h2>Your title</h2>}
  body={<p>Content</p>}
  actions={actions}
  footer={footer}
/>`}
      />
    </>
  );
};
