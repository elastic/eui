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

    describe('searchValue', () => {
      it('renders just a EuiHighlight component when wrapping text', () => {
        const { container } = render(
          <EuiSelectableList
            options={options}
            {...selectableListRequiredProps}
            isVirtualized={false}
            textWrap="wrap"
            searchValue="Mi"
          />
        );

        expect(container.querySelector('.euiMark')).toHaveTextContent('Mi');
        expect(
          container.querySelector('.euiTextTruncate')
        ).not.toBeInTheDocument();
      });

      it('renders an EuiTextTruncate component when truncating text', () => {
        const { container, getByTestSubject } = render(
          <EuiSelectableList
            options={options}
            {...selectableListRequiredProps}
            textWrap="truncate"
            searchValue="titan"
          />
        );

        expect(getByTestSubject('titanOption')).toContainElement(
          container.querySelector('.euiTextTruncate')
        );
      });

      it('does not highlight/mark the current `searchValue` if `isPreFiltered.highlightSearch` is false', () => {
        const { container } = render(
          <EuiSelectableList
            options={options}
            {...selectableListRequiredProps}
            isPreFiltered={{ highlightSearch: false }}
            searchValue="Mi"
          />
        );

        expect(container.querySelector('.euiMark')).not.toBeInTheDocument();
      });
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

    describe('isVirtualized={false}', () => {
      it('renders', () => {
        const { container } = render(
          <EuiSelectableList
            options={options}
            {...selectableListRequiredProps}
            isVirtualized={false}
          />
        );

        expect(container.firstChild).toMatchSnapshot();
      });

      it('maintains the passed height when false', () => {
        const { container } = render(
          <EuiSelectableList
            options={options}
            {...selectableListRequiredProps}
            isVirtualized={false}
            height={300}
          />
        );

        expect(container.querySelector('.euiSelectableList__list')).toHaveStyle(
          'block-size: 300px'
        );
      });
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
      test('wrap', () => {
        const { container } = render(
          <EuiSelectableList
            options={options}
            {...selectableListRequiredProps}
            textWrap="wrap"
            isVirtualized={false}
          />
        );

        expect(
          container.querySelector('.euiSelectableListItem__text--truncate')
        ).not.toBeInTheDocument();
      });

      it('does not allow wrapping text if virtualization is on', () => {
        const { container } = render(
          <EuiSelectableList
            options={options}
            {...selectableListRequiredProps}
            textWrap="wrap"
            isVirtualized={true}
          />
        );

        expect(
          container.querySelector('.euiSelectableListItem__text--truncate')
        ).toBeInTheDocument();
      });

      it('allows setting `textWrap` per-option', () => {
        const { container } = render(
          <EuiSelectableList
            {...selectableListRequiredProps}
            textWrap="wrap"
            isVirtualized={false}
            options={[
              { label: 'A' },
              { label: 'B', textWrap: 'truncate' },
              { label: 'C' },
            ]}
          />
        );

        expect(
          container.querySelectorAll('.euiSelectableListItem__text--truncate')
        ).toHaveLength(1);
      });

      test('truncate', () => {
        const { container } = render(
          <EuiSelectableList
            options={options}
            {...selectableListRequiredProps}
            textWrap="truncate"
          />
        );

        expect(
          container.querySelector('.euiSelectableListItem__text--truncate')
        ).toBeInTheDocument();
      });
    });

    describe('truncationProps', () => {
      it('renders EuiTextTruncate', () => {
        const { container } = render(
          <EuiSelectableList
            options={options}
            {...selectableListRequiredProps}
            truncationProps={{ truncation: 'middle' }}
          />
        );

        expect(container.querySelector('.euiTextTruncate')).toBeInTheDocument();
      });

      it('allows setting `truncationProps` per-option', () => {
        const { container } = render(
          <EuiSelectableList
            {...selectableListRequiredProps}
            truncationProps={undefined}
            options={[
              { label: 'test', truncationProps: { truncation: 'startEnd' } },
            ]}
          />
        );

        expect(container.querySelector('.euiTextTruncate')).toBeInTheDocument();
      });
    });
  });

  describe('truncation performance optimization', () => {
    // Mock requestAnimationFrame
    beforeEach(() => {
      jest
        .spyOn(window, 'requestAnimationFrame')
        .mockImplementation((cb: Function) => cb());
    });

    it('does not render EuiTextTruncate if not virtualized and text is wrapping', () => {
      const { container } = render(
        <EuiSelectableList
          options={options}
          {...selectableListRequiredProps}
          isVirtualized={false}
          textWrap="wrap"
        />
      );

      expect(
        container.querySelector('.euiTextTruncate')
      ).not.toBeInTheDocument();
    });

    it('does not render EuiTextTruncate, and defaults to CSS truncation, if no truncationProps have been passed', () => {
      const { container } = render(
        <EuiSelectableList
          options={options}
          {...selectableListRequiredProps}
          truncationProps={undefined}
        />
      );

      expect(
        container.querySelector('.euiTextTruncate')
      ).not.toBeInTheDocument();
      expect(
        container.querySelector('.euiSelectableListItem__text--truncate')
      ).toBeInTheDocument();
    });

    it('attempts to use a default optimized option width calculated from the wrapping EuiAutoSizer', () => {
      // jsdom doesn't return valid element offsetWidths, so we have to mock it here
      Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {
        configurable: true,
        value: 600,
      });

      const { container } = render(
        <EuiSelectableList
          options={options}
          {...selectableListRequiredProps}
          isVirtualized={true}
          searchable={true}
          searchValue="searching"
        />
      );

      expect(container.querySelector('.euiTextTruncate')).toBeInTheDocument();
      expect(
        container.querySelector('[data-resize-observer]')
      ).not.toBeInTheDocument();

      // Reset jsdom mock
      Object.defineProperty(HTMLElement.prototype, 'offsetWidth', { value: 0 });
    });

    it('falls back to individual resize observers if options have append/prepend nodes', () => {
      const { container } = render(
        <EuiSelectableList
          {...selectableListRequiredProps}
          options={[
            { label: 'A', append: 'post' },
            { label: 'B' },
            { label: 'C', prepend: 'pre' },
          ]}
          truncationProps={{ truncation: 'start' }}
        />
      );

      expect(container.querySelectorAll('.euiTextTruncate')).toHaveLength(3);
      expect(container.querySelectorAll('[data-resize-observer]')).toHaveLength(
        2
      );
    });

    it('falls back to individual resize observers if individual options are truncated', () => {
      const { container } = render(
        <EuiSelectableList
          {...selectableListRequiredProps}
          options={[
            { label: 'A' },
            { label: 'B', truncationProps: { truncation: 'middle' } },
            { label: 'C', truncationProps: { truncation: 'startEnd' } },
          ]}
        />
      );

      expect(container.querySelectorAll('.euiTextTruncate')).toHaveLength(2);
      expect(container.querySelectorAll('[data-resize-observer]')).toHaveLength(
        2
      );
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
