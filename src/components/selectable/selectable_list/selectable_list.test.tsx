/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { render } from '../../../test/rtl';
import { requiredProps } from '../../../test/required_props';

import { EuiSelectableList } from './selectable_list';
import { PADDING_SIZES } from './selectable_list_item';
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
    const { container } = render(
      <EuiSelectableList options={options} {...selectableListRequiredProps} />
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  describe('props', () => {
    test('visibleOptions', () => {
      const { container } = render(
        <EuiSelectableList
          options={options}
          visibleOptions={options.slice(2)}
          {...selectableListRequiredProps}
        />
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    test('searchValue', () => {
      const { container } = render(
        <EuiSelectableList
          options={options}
          searchValue="Mi"
          {...selectableListRequiredProps}
        />
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    test('searchValue', () => {
      const { container } = render(
        <EuiSelectableList
          options={options}
          searchValue="Mi"
          {...selectableListRequiredProps}
        />
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    test('renderOption', () => {
      const { container } = render(
        <EuiSelectableList
          options={options}
          renderOption={(option: EuiSelectableOption, searchValue?: string) => {
            return (
              <span>
                {searchValue || undefined} =&gt; {option.label}
              </span>
            );
          }}
          {...selectableListRequiredProps}
        />
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    test('height is forced', () => {
      const { container } = render(
        <EuiSelectableList
          options={options}
          height={200}
          {...selectableListRequiredProps}
        />
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    test('height is full', () => {
      const { container } = render(
        <EuiSelectableList
          options={options}
          height="full"
          {...selectableListRequiredProps}
        />
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    test('allowExclusions', () => {
      const { container } = render(
        <EuiSelectableList
          options={options}
          allowExclusions
          {...selectableListRequiredProps}
        />
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    test('activeOptionIndex', () => {
      const { container } = render(
        <EuiSelectableList
          options={options}
          activeOptionIndex={2}
          {...selectableListRequiredProps}
        />
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    test('rowHeight', () => {
      const { container } = render(
        <EuiSelectableList
          options={options}
          rowHeight={20}
          {...selectableListRequiredProps}
        />
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    test('showIcons can be turned off', () => {
      const { container } = render(
        <EuiSelectableList
          options={options}
          showIcons={false}
          {...selectableListRequiredProps}
        />
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    test('singleSelection can be turned on', () => {
      const { container } = render(
        <EuiSelectableList
          options={options}
          singleSelection={true}
          {...selectableListRequiredProps}
        />
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    test('singleSelection can be forced so that at least one must be selected', () => {
      const { container } = render(
        <EuiSelectableList
          options={options}
          singleSelection="always"
          {...selectableListRequiredProps}
        />
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    test('bordered', () => {
      const { container } = render(
        <EuiSelectableList
          options={options}
          bordered
          {...selectableListRequiredProps}
        />
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    test('isVirtualized can be false', () => {
      const { container } = render(
        <EuiSelectableList
          options={options}
          isVirtualized={false}
          {...selectableListRequiredProps}
        />
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    test('searchable enables correct screen reader instructions', () => {
      const { container } = render(
        <EuiSelectableList
          options={options}
          searchable={true}
          {...selectableListRequiredProps}
        />
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    describe('paddingSize', () => {
      PADDING_SIZES.forEach((size) => {
        test(`${size} is rendered`, () => {
          const { container } = render(
            <EuiSelectableList
              options={options}
              paddingSize={size}
              {...selectableListRequiredProps}
            />
          );

          expect(container.firstChild).toMatchSnapshot();
        });
      });
    });

    describe('textWrap', () => {
      test('can be "wrap"', () => {
        const { container } = render(
          <EuiSelectableList
            options={options}
            textWrap="wrap"
            {...selectableListRequiredProps}
          />
        );

        expect(container.firstChild).toMatchSnapshot();
      });
    });
  });

  describe('group labels', () => {
    const optionsWithGroupLabels: EuiSelectableOption[] = [
      { label: 'Spaaaace' },
      {
        label: 'Moons',
        isGroupLabel: true,
      },
      { label: 'Titan' },
      { label: 'Io' },
      {
        label: 'Planets',
        isGroupLabel: true,
      },
      { label: 'Mercury' },
      { label: 'Mars' },
      {
        label: 'Suns',
        isGroupLabel: true,
      },
    ];

    it('renders with correct aria-setsize and aria-posinset offsets on non-group-labels', () => {
      const { container } = render(
        <EuiSelectableList
          options={optionsWithGroupLabels}
          {...selectableListRequiredProps}
        />
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    it('handles updating aria attrs correctly when options are changed/updated', () => {
      const { container, rerender } = render(
        <EuiSelectableList
          options={optionsWithGroupLabels}
          isVirtualized={false}
          {...selectableListRequiredProps}
        />
      );

      const updatedOptions: EuiSelectableOption[] = [
        ...optionsWithGroupLabels.slice(1),
        { label: 'Sol' },
      ];
      rerender(
        <EuiSelectableList
          options={updatedOptions}
          isVirtualized={false}
          {...selectableListRequiredProps}
        />
      );

      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
