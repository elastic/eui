/* eslint-disable import/no-unresolved */
import React, { ReactNode, useState } from 'react';

import { EuiSpacer, EuiSelect } from '../../../../src/components';
import { GuideSection } from '../../components/guide_section/guide_section';
import { GuideSectionTypes } from '../../components/guide_section/guide_section_types';
import { PanelColor } from '../../../../src/components/panel/panel';

import pageError from './prompt_types/page_error';
const pageErrorSource = require('!!raw-loader!./prompt_types/page_error');
import noPermission from './prompt_types/no_permission';
const noPermissionSource = require('!!raw-loader!./prompt_types/no_permission');
import licenseUpgrade from './prompt_types/license_upgrade';
const licenseUpgradeSource = require('!!raw-loader!./prompt_types/license_upgrade');
import complex from './prompt_types/complex';
const complexSource = require('!!raw-loader!./prompt_types/complex');

export default () => {
  const options: Array<{
    value: string;
    text: string;
    component: ReactNode;
    source: any;
    demoBackground?: PanelColor;
  }> = [
    {
      value: 'pageError',
      text: 'Page not found',
      component: pageError,
      source: pageErrorSource,
    },
    {
      value: 'noPermission',
      text: 'No permission',
      component: noPermission,
      source: noPermissionSource,
    },
    {
      value: 'licenseUpgrade',
      text: 'License upgrade',
      component: licenseUpgrade,
      source: licenseUpgradeSource,
    },
    {
      value: 'complex',
      text: 'Complex',
      component: complex,
      source: complexSource,
      demoBackground: 'subdued',
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
