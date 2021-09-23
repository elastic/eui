/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../../test/required_props';

import { EuiSelectableTemplateSitewide } from './selectable_template_sitewide';
import { EuiSelectableTemplateSitewideOption } from './selectable_template_sitewide_option';

const options: EuiSelectableTemplateSitewideOption[] = [
  {
    label: 'Basic data application',
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
    'data-test-subj': 'test-this',
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

    describe('popoverButton', () => {
      // @ts-ignore innerWidth might be read only but we can still override it for the sake of testing
      beforeAll(() => (window.innerWidth = 670));
      afterAll(() => 1024); // reset to jsdom's default

      test('is rendered', () => {
        const component = render(
          <EuiSelectableTemplateSitewide
            options={options}
            popoverButton={<button>Button</button>}
          />
        );

        expect(component).toMatchSnapshot();
      });

      test('is rendered with popoverButtonBreakpoints m', () => {
        const component = render(
          <EuiSelectableTemplateSitewide
            options={options}
            popoverButton={<button>Button</button>}
            popoverButtonBreakpoints={['xs', 's', 'm']}
          />
        );

        expect(component).toMatchSnapshot();
      });

      test('is not rendered with popoverButtonBreakpoints xs', () => {
        const component = render(
          <EuiSelectableTemplateSitewide
            options={options}
            popoverButton={<button>Button</button>}
            popoverButtonBreakpoints={['xs']}
          />
        );

        expect(component).toMatchSnapshot();
      });
    });
  });
});
