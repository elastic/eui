import React, { useState } from 'react';

import { EuiSwitch, EuiSuggestItem } from '../../../../src/components';
import { GuideSection } from '../../components/guide_section/guide_section';
import { GuideSectionTypes } from '../../components/guide_section/guide_section_types';

import SuggestItem from './suggest_item';
const suggestItemSource = require('!!raw-loader!./suggest_item');

export default () => {
  const [fullWidth, setFullWidth] = useState(false);
  const [withInput, setWithInput] = useState(false);
  const [virtualized, setVirtualized] = useState(false);

  return (
    <>
      <EuiSwitch
        label="Full width"
        checked={fullWidth}
        onChange={(e) => setFullWidth(e.target.checked)}
      />{' '}
      &emsp;
      <EuiSwitch
        label="In dropdown"
        checked={withInput}
        onChange={(e) => {
          const checked = e.target.checked;
          setWithInput(checked);
          setVirtualized((isSet) => (checked ? isSet : false));
        }}
      />{' '}
      &emsp;
      <EuiSwitch
        label="Virtualized"
        checked={virtualized}
        disabled={!withInput}
        onChange={(e) => setVirtualized(e.target.checked)}
      />{' '}
      &emsp;
      <GuideSection
        demo={
          <SuggestItem
            withInput={withInput}
            fullWidth={fullWidth}
            virtualized={virtualized}
          />
        }
        source={[
          {
            type: GuideSectionTypes.JS,
            code: suggestItemSource,
          },
        ]}
        props={{ EuiSuggestItem }}
      />
    </>
  );
};
