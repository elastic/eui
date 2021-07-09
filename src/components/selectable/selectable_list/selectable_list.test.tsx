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

import { EuiSelectableList } from './selectable_list';
import { EuiSelectableOption } from '../selectable_option';

const options: EuiSelectableOption[] = [
  {
    label: 'Titan',
    'data-test-subj': 'titanOption',
  },
  {
    label: 'Enceladus',
  },
  {
    label: 'Mimas',
  },
  {
    label:
      "Pandora is one of Saturn's moons, named for a Titaness of Greek mythology",
  },
  {
    label: 'Tethys',
  },
  {
    label: 'Hyperion',
  },
];

const selectableListRequiredProps = {
  makeOptionId: (index: number | undefined) => `option_${index}`,
  listId: 'list',
  onOptionClick: () => {},
  setActiveOptionIndex: () => {},
  ...requiredProps,
};

describe('EuiSelectableListItem', () => {
  test('is rendered', () => {
    const component = render(
      <EuiSelectableList options={options} {...selectableListRequiredProps} />
    );

    expect(component).toMatchSnapshot();
  });
  describe('props', () => {
    test('visibleOptions', () => {
      const component = render(
        <EuiSelectableList
          options={options}
          visibleOptions={options.slice(2)}
          {...selectableListRequiredProps}
        />
      );

      expect(component).toMatchSnapshot();
    });

    test('searchValue', () => {
      const component = render(
        <EuiSelectableList
          options={options}
          searchValue="Mi"
          {...selectableListRequiredProps}
        />
      );

      expect(component).toMatchSnapshot();
    });

    test('searchValue', () => {
      const component = render(
        <EuiSelectableList
          options={options}
          searchValue="Mi"
          {...selectableListRequiredProps}
        />
      );

      expect(component).toMatchSnapshot();
    });

    test('renderOption', () => {
      const component = render(
        <EuiSelectableList
          options={options}
          renderOption={(option: EuiSelectableOption, searchValue?: string) => {
            return (
              <span>
                {searchValue} =&gt; {option.label}
              </span>
            );
          }}
          {...selectableListRequiredProps}
        />
      );

      expect(component).toMatchSnapshot();
    });

    test('height is forced', () => {
      const component = render(
        <EuiSelectableList
          options={options}
          height={200}
          {...selectableListRequiredProps}
        />
      );

      expect(component).toMatchSnapshot();
    });

    test('height is full', () => {
      const component = render(
        <EuiSelectableList
          options={options}
          height="full"
          {...selectableListRequiredProps}
        />
      );

      expect(component).toMatchSnapshot();
    });

    test('allowExclusions', () => {
      const component = render(
        <EuiSelectableList
          options={options}
          allowExclusions
          {...selectableListRequiredProps}
        />
      );

      expect(component).toMatchSnapshot();
    });

    test('activeOptionIndex', () => {
      const component = render(
        <EuiSelectableList
          options={options}
          activeOptionIndex={2}
          {...selectableListRequiredProps}
        />
      );

      expect(component).toMatchSnapshot();
    });

    test('rowHeight', () => {
      const component = render(
        <EuiSelectableList
          options={options}
          rowHeight={20}
          {...selectableListRequiredProps}
        />
      );

      expect(component).toMatchSnapshot();
    });

    test('showIcons can be turned off', () => {
      const component = render(
        <EuiSelectableList
          options={options}
          showIcons={false}
          {...selectableListRequiredProps}
        />
      );

      expect(component).toMatchSnapshot();
    });

    test('singleSelection can be turned on', () => {
      const component = render(
        <EuiSelectableList
          options={options}
          singleSelection={true}
          {...selectableListRequiredProps}
        />
      );

      expect(component).toMatchSnapshot();
    });

    test('singleSelection can be forced so that at least one must be selected', () => {
      const component = render(
        <EuiSelectableList
          options={options}
          singleSelection="always"
          {...selectableListRequiredProps}
        />
      );

      expect(component).toMatchSnapshot();
    });

    test('bordered', () => {
      const component = render(
        <EuiSelectableList
          options={options}
          bordered
          {...selectableListRequiredProps}
        />
      );

      expect(component).toMatchSnapshot();
    });
  });
});
