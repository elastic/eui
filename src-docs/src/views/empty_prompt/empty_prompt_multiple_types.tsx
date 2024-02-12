import React, { ReactNode, useState } from 'react';

import { EuiSpacer, EuiSelect } from '../../../../src/components';
import { GuideSection } from '../../components/guide_section/guide_section';
import { GuideSectionTypes } from '../../components/guide_section/guide_section_types';
import { PanelColor } from '../../../../src/components/panel/panel';

import ErrorPages from './prompt_types/page_not_found';
const errorPagesSource = require('!!raw-loader!./prompt_types/page_not_found');
import NoPrivileges from './prompt_types/no_permission';
const noPrivilegesSource = require('!!raw-loader!./prompt_types/no_permission');
import LicenseUpgrade from './prompt_types/license_upgrade';
const licenseUpgradeSource = require('!!raw-loader!./prompt_types/license_upgrade');

export default () => {
  const options: Array<{
    value: string;
    text: string;
    component: ReactNode;
    source: any;
    demoBackground?: PanelColor;
  }> = [
    {
      value: 'errorPages',
      text: 'Page not found',
      component: <ErrorPages />,
      source: errorPagesSource,
    },
    {
      value: 'noPrivileges',
      text: 'No permission',
      component: <NoPrivileges />,
      source: noPrivilegesSource,
    },
    {
      value: 'licenseUpgrade',
      text: 'License upgrade',
      component: <LicenseUpgrade />,
      source: licenseUpgradeSource,
    },
  ];

  const [value, setValue] = useState(options[0].value);
  const [emptyState, setEmptyState] = useState(options[0].component);
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
        demo={emptyState}
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
