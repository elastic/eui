/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { mount, render } from 'enzyme';
import { requiredProps } from '../../test';

import { EuiSelectable } from './selectable';
import { EuiSelectableOption } from './selectable_option';

const options: EuiSelectableOption[] = [
  {
    label: 'Titan',
    'data-test-subj': 'titanOption',
  },
  {
    label: 'Enceladus',
  },
  {
    label:
      "Pandora is one of Saturn's moons, named for a Titaness of Greek mythology",
  },
];

describe('EuiSelectable', () => {
  test('is rendered', () => {
    const component = render(
      <EuiSelectable options={options} {...requiredProps} />
    );

    expect(component).toMatchSnapshot();
  });

  test('should not reset the activeOptionIndex nor isFocused when EuiSelectable is blurred in favour of its popover', () => {
    const component = mount(
      <EuiSelectable options={options} searchable>
        {(list, search) => (
          <>
            {list}
            {search}
          </>
        )}
      </EuiSelectable>
    );

    component.setState({
      activeOptionIndex: 0,
      isFocused: true,
    });
    expect(component.state()).toMatchSnapshot();

    component.find('.euiSelectable').simulate('blur', {
      relatedTarget: { firstChild: { id: 'generated-id_listbox' } },
    });
    component.update();
    expect(component.state()).toMatchSnapshot();
  });

  describe('props', () => {
    test('searchable', () => {
      const component = render(<EuiSelectable options={options} searchable />);

      expect(component).toMatchSnapshot();
    });

    test('singleSelection', () => {
      const component = render(
        <EuiSelectable options={options} singleSelection />
      );

      expect(component).toMatchSnapshot();
    });

    test('allowExclusions', () => {
      const component = render(
        <EuiSelectable options={options} allowExclusions />
      );

      expect(component).toMatchSnapshot();
    });

    test('isLoading', () => {
      const component = render(<EuiSelectable options={options} isLoading />);

      expect(component).toMatchSnapshot();
    });

    test('height can be forced', () => {
      const component = render(
        <EuiSelectable options={options} height={200} />
      );

      expect(component).toMatchSnapshot();
    });

    test('height can be full', () => {
      const component = render(
        <EuiSelectable options={options} height="full" />
      );

      expect(component).toMatchSnapshot();
    });

    test('renderOption', () => {
      const component = render(
        <EuiSelectable
          options={options}
          renderOption={(option: EuiSelectableOption, searchValue?: string) => {
            return (
              <span>
                {searchValue} =&gt; {option.label}
              </span>
            );
          }}
        />
      );

      expect(component).toMatchSnapshot();
    });

    test('listProps', () => {
      const component = render(
        <EuiSelectable
          options={options}
          listProps={{
            windowProps: {
              onScroll: () => {},
            },
          }}
        />
      );

      expect(component).toMatchSnapshot();
    });
  });

  describe('custom options', () => {
    test('optional properties', () => {
      type OptionalOption = EuiSelectableOption<{ value?: string }>;
      const options: OptionalOption[] = [
        {
          label: 'Titan',
          'data-test-subj': 'titanOption',
          value: 'titan',
        },
        {
          label: 'Enceladus',
          value: 'enceladus',
        },
        {
          label:
            "Pandora is one of Saturn's moons, named for a Titaness of Greek mythology",
        },
      ];

      const onChange = (options: OptionalOption[]) => {
        jest.fn(() => options);
      };

      const component = mount(
        <EuiSelectable<OptionalOption> options={options} onChange={onChange}>
          {(list) => list}
        </EuiSelectable>
      );

      expect(
        (component.find('EuiSelectableList').props() as any).visibleOptions
      ).toEqual(options);
    });

    test('required properties', () => {
      type ExtendedOption = EuiSelectableOption<{ value: string }>;
      const options: ExtendedOption[] = [
        {
          label: 'Titan',
          'data-test-subj': 'titanOption',
          value: 'titan',
        },
        {
          label: 'Enceladus',
          value: 'enceladus',
        },
        {
          label:
            "Pandora is one of Saturn's moons, named for a Titaness of Greek mythology",
          value: 'pandora',
        },
      ];

      const onChange = (options: ExtendedOption[]) => {
        jest.fn(() => options);
      };

      const component = mount(
        <EuiSelectable<ExtendedOption> options={options} onChange={onChange}>
          {(list) => list}
        </EuiSelectable>
      );

      component.update();

      expect(
        (component.find('EuiSelectableList').props() as any).visibleOptions
      ).toEqual(options);
    });
  });
});
