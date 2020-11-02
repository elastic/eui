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
