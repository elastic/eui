/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../../test/required_props';

import { EuiSelectableTemplateSitewide } from './selectable_template_sitewide';
import { EuiSelectableTemplateSitewideOptionProps } from './selectable_template_sitewide_option';

const options: EuiSelectableTemplateSitewideOptionProps[] = [
  {
    label: 'Basic data application',
    'data-test-subj': 'test-this',
    avatar: {
      name: 'Default Space',
    },
    meta: [
      {
        text: 'Application',
        type: 'application',
      },
    ],
    url: 'welcome-dashboards',
    ...requiredProps,
  },
  {
    label: 'Platform with deployment highlighted',
    icon: {
      type: 'user',
    },
    meta: [
      {
        text: 'Account',
        type: 'platform',
      },
      {
        text: 'personal-databoard',
        type: 'deployment',
        highlightSearchString: true,
      },
    ],
  },
  {
    label: 'Other metas',
    searchableLabel: 'Totally custom with pink metadata',
    icon: {
      type: 'alert',
      color: 'accent',
    },
    meta: [
      {
        text: 'Article',
        type: 'article',
      },
      {
        text: 'Case',
        type: 'case',
      },
      {
        text: 'Text',
      },
      {
        text: 'I have a custom type',
        type: 'PINK',
      },
    ],
  },
];

// Mock the htmlIdGenerator to generate predictable ids for snapshot tests
jest.mock('../../../services/accessibility/html_id_generator', () => ({
  htmlIdGenerator: () => () => 'htmlId',
}));

describe('EuiSelectableTemplateSitewide', () => {
  test('is rendered', () => {
    const component = render(
      <EuiSelectableTemplateSitewide options={options} {...requiredProps} />
    );

    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    test('popoverProps is rendered', () => {
      const component = render(
        <EuiSelectableTemplateSitewide
          options={options}
          popoverProps={{ className: 'customPopoverClass' }}
        />
      );

      expect(component).toMatchSnapshot();
    });

    test('popoverTitle is rendered', () => {
      const component = render(
        <EuiSelectableTemplateSitewide
          options={options}
          popoverTitle={<>Title</>}
        />
      );

      expect(component).toMatchSnapshot();
    });

    test('popoverFooter is rendered', () => {
      const component = render(
        <EuiSelectableTemplateSitewide
          options={options}
          popoverFooter={<>Footer</>}
        />
      );

      expect(component).toMatchSnapshot();
    });
  });
});
