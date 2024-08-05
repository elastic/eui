/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { renderHook } from '../../../test/rtl';
import { requiredProps } from '../../../test/required_props';

import { useEuiMemoizedStyles } from '../../../services';
import { euiSelectableTemplateSitewideStyles } from './selectable_template_sitewide.styles';

import {
  EuiSelectableTemplateSitewideOption,
  euiSelectableTemplateSitewideFormatOptions,
  euiSelectableTemplateSitewideRenderOptions,
} from './selectable_template_sitewide_option';

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
      type: 'warning',
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

describe('EuiSelectableTemplateSitewideOptions', () => {
  test('different configurations are formatted with euiSelectableTemplateSitewideFormatOptions()', () => {
    const { result } = renderHook(() => {
      const styles = useEuiMemoizedStyles(euiSelectableTemplateSitewideStyles);
      return euiSelectableTemplateSitewideFormatOptions(options, styles);
    });

    expect(result.current).toMatchSnapshot();
  });

  test('different configurations are rendered with euiSelectableTemplateSitewideRenderOptions()', () => {
    options.forEach((option) => {
      const component = euiSelectableTemplateSitewideRenderOptions(option, '');

      expect(component).toMatchSnapshot();
    });
  });

  test('different configurations are rendered with euiSelectableTemplateSitewideRenderOptions() and search text', () => {
    options.forEach((option) => {
      const component = euiSelectableTemplateSitewideRenderOptions(
        option,
        'data'
      );

      expect(component).toMatchSnapshot();
    });
  });
});
