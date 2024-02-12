import React, { useState } from 'react';

import {
  EuiSpacer,
  EuiSelect,
  EuiEmptyPrompt,
} from '../../../../src/components';
import { GuideSection } from '../../components/guide_section/guide_section';
import { GuideSectionTypes } from '../../components/guide_section/guide_section_types';
import { COLORS, PanelColor } from '../../../../src/components/panel/panel';

import { Panel } from './empty_prompt_panel';
const panelSource = require('!!raw-loader!./empty_prompt_panel');

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
            type: GuideSectionTypes.JS,
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
