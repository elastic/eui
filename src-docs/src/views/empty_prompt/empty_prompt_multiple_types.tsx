/* eslint-disable import/no-unresolved */
import React, { ComponentType, useState } from 'react';

import { EuiSpacer, EuiSelect } from '../../../../src/components';
import { GuideSection } from '../../components/guide_section/guide_section';
import { GuideSectionTypes } from '../../components/guide_section/guide_section_types';
import { PanelColor } from '../../../../src/components/panel/panel';

import errorPages from './prompt_types/page_not_found';
const errorPagesSource = require('!!raw-loader!./prompt_types/page_not_found');
import noPrivileges from './prompt_types/no_permission';
const noPrivilegesSource = require('!!raw-loader!./prompt_types/no_permission');
import licenseUpgrade from './prompt_types/license_upgrade';
const licenseUpgradeSource = require('!!raw-loader!./prompt_types/license_upgrade');

export default () => {
  const options: Array<{
    value: string;
    text: string;
    component: ComponentType;
    source: any;
    demoBackground?: PanelColor;
  }> = [
    {
      value: 'errorPages',
      text: 'Page not found',
      component: errorPages,
      source: errorPagesSource,
    },
    {
      value: 'noPrivileges',
      text: 'No permission',
      component: noPrivileges,
      source: noPrivilegesSource,
    },
    {
      value: 'licenseUpgrade',
      text: 'License upgrade',
      component: licenseUpgrade,
      source: licenseUpgradeSource,
    },
  ];

  const [value, setValue] = useState(options[0].value);
  const [EmptyState, setEmptyState] = useState<ComponentType>(
    options[0].component
  );
  const [emptyStateSource, setEmptyStateSource] = useState(options[0].source);
  const [demoPanelColor, setDemoPanelColor] = useState(
    options[0].demoBackground
  );

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValue(e.target.value);

    const component = options.find((item) => item.value === e.target.value);

    setEmptyState(component!.component);
    setEmptyStateSource(component!.source);
    setDemoPanelColor(component?.demoBackground);
  };

  return (
    <>
      <EuiSelect
        prepend="Examples"
        options={options.map((option) => {
          return {
            value: option.value,
            text: option.text,
          };
        })}
        value={value}
        onChange={(e) => onChange(e)}
        aria-label="Empty prompt examples"
      />

      <EuiSpacer size="l" />

      <GuideSection
        demo={<EmptyState />}
        demoPanelProps={{
          color: demoPanelColor,
        }}
        source={[
          {
            type: GuideSectionTypes.JS,
            code: emptyStateSource,
          },
        ]}
      />
    </>
  );
};
