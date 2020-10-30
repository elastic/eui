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
import { act } from 'react-dom/test-utils';
import { render, mount } from 'enzyme';
import { requiredProps } from '../../../test/required_props';

import {
  EuiSelectableImperativeHandle,
  EuiSelectableTemplateSitewide,
} from './selectable_template_sitewide';
import { EuiSelectableTemplateSitewideOption } from './selectable_template_sitewide_option';
import { EuiPopover } from '../../popover';

const options: EuiSelectableTemplateSitewideOption[] = [
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

  describe('ref methods', () => {
    test('inputRef is usable', () => {
      const inputRef = jest.fn();

      const component = mount(
        <EuiSelectableTemplateSitewide
          options={options}
          searchProps={{
            'data-test-subj': 'inputField',
            inputRef,
          }}
          popoverButtonBreakpoints={['xs']}
        />
      );

      expect(inputRef).toBeCalledTimes(1);
      expect(inputRef).toHaveBeenCalledWith(
        component.find('input[data-test-subj="inputField"]').getDOMNode()
      );
    });

    test('allows closing of popover', () => {
      let ref: EuiSelectableImperativeHandle;
      const setRef = (_ref: EuiSelectableImperativeHandle) => (ref = _ref);

      const component = mount(
        <EuiSelectableTemplateSitewide
          ref={setRef}
          options={options}
          searchProps={{
            'data-test-subj': 'inputField',
          }}
          popoverButtonBreakpoints={['xs']}
        />
      );

      // verify the popover isn't open
      expect(component.find(EuiPopover).props().isOpen).toBe(false);

      // focus on the input field
      const inputFieldDom = component
        .find('input[data-test-subj="inputField"]')
        .getDOMNode();
      const focusEvent = {
        currentTarget: inputFieldDom,
      } as React.FocusEvent<HTMLInputElement>;
      act(() => {
        component.find('input[data-test-subj="inputField"]').props().onFocus!(
          focusEvent
        );
      });
      component.update();

      // verify the popover has opened
      expect(component.find(EuiPopover).props().isOpen).toBe(true);

      // programatically close
      act(() => {
        ref.setIsPopoverOpen(false);
      });
      component.update();

      // verify the popover has closed
      expect(component.find(EuiPopover).props().isOpen).toBe(false);
    });

    test('allows setting the input value', () => {
      let ref: EuiSelectableImperativeHandle;
      const setRef = (_ref: EuiSelectableImperativeHandle) => (ref = _ref);

      const component = mount(
        <EuiSelectableTemplateSitewide
          ref={setRef}
          options={options}
          searchProps={{
            'data-test-subj': 'inputField',
            defaultValue: 'original',
          }}
          popoverButtonBreakpoints={['xs']}
        />
      );

      // verify the default value is set
      expect(
        component
          .find('input[data-test-subj="inputField"]')
          .getDOMNode<HTMLInputElement>().value
      ).toBe('original');

      // programatically set the value
      act(() => {
        ref!.setSearchValue('upgraded');
      });
      component.update();

      // verify the new value is set
      expect(
        component
          .find('input[data-test-subj="inputField"]')
          .getDOMNode<HTMLInputElement>().value
      ).toBe('upgraded');
    });
  });
});
