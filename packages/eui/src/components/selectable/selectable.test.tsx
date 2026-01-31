/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { fireEvent } from '@testing-library/react';
import { requiredProps } from '../../test';
import { shouldRenderCustomStyles } from '../../test/internal';
import { render } from '../../test/rtl';

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
  shouldRenderCustomStyles(
    <EuiSelectable options={options} searchable>
      {(list, search) => (
        <>
          {search}
          {list}
        </>
      )}
    </EuiSelectable>,
    { childProps: ['searchProps', 'listProps', 'listProps.windowProps'] }
  );

  test('is rendered', () => {
    const { container } = render(
      <EuiSelectable options={options} {...requiredProps} id="testId" />
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('should not reset the activeOptionIndex nor isFocused when EuiSelectable is blurred in favour of its search/listbox', () => {
    const { container } = render(
      <EuiSelectable options={options} searchable>
        {(list, search) => (
          <>
            {list}
            {search}
          </>
        )}
      </EuiSelectable>
    );

    const option = container.querySelector(
      '.euiSelectableListItem[aria-posinset="2"]'
    )!;
    fireEvent.click(option);
    expect(option).toHaveClass('euiSelectableListItem-isFocused');

    const searchbox = container.querySelector('.euiSelectableSearch')!;
    fireEvent.focus(searchbox);
    expect(option).toHaveClass('euiSelectableListItem-isFocused');
  });

  describe('props', () => {
    test('searchable', () => {
      const { container } = render(
        <EuiSelectable options={options} searchable />
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    test('singleSelection', () => {
      const { container } = render(
        <EuiSelectable options={options} singleSelection />
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    test('allowExclusions', () => {
      const { container } = render(
        <EuiSelectable options={options} allowExclusions />
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    test('isLoading', () => {
      const { container } = render(
        <EuiSelectable options={options} isLoading />
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    test('height can be forced', () => {
      const { container } = render(
        <EuiSelectable options={options} height={200} />
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    test('height can be full', () => {
      const { container } = render(
        <EuiSelectable options={options} height="full" />
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    test('renderOption', () => {
      const { container } = render(
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

      expect(container.firstChild).toMatchSnapshot();
    });

    test('listProps', () => {
      const { container } = render(
        <EuiSelectable
          options={options}
          listProps={{
            windowProps: {
              onScroll: () => {},
            },
          }}
        />
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    test('compressed', () => {
      const { container } = render(
        <EuiSelectable options={options} searchable compressed>
          {(list, search) => (
            <>
              {search}
              {list}
            </>
          )}
        </EuiSelectable>
      );

      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('search value', () => {
    it('supports inheriting initialSearchValue from searchProps.defaultValue', () => {
      const { container, getByTestSubject } = render(
        <EuiSelectable
          options={options}
          searchable
          searchProps={{
            defaultValue: 'default value',
            'data-test-subj': 'searchInput',
          }}
        >
          {(list, search) => (
            <>
              {list}
              {search}
            </>
          )}
        </EuiSelectable>
      );
      expect(container.firstChild).toMatchSnapshot();
      expect(getByTestSubject('searchInput')).toHaveValue('default value');
    });

    it('supports controlled searchValue state from searchProps.value', () => {
      const searchProps = {
        value: 'first value',
        'data-test-subj': 'searchInput',
      };
      const { rerender, getByTestSubject } = render(
        <EuiSelectable options={options} searchable searchProps={searchProps}>
          {(list, search) => (
            <>
              {list}
              {search}
            </>
          )}
        </EuiSelectable>
      );
      expect(getByTestSubject('searchInput')).toHaveValue('first value');

      rerender(
        <EuiSelectable
          options={options}
          searchable
          searchProps={{ ...searchProps, value: 'second value' }}
        >
          {(list, search) => (
            <>
              {list}
              {search}
            </>
          )}
        </EuiSelectable>
      );
      expect(getByTestSubject('searchInput')).toHaveValue('second value');
    });

    it('updates options list when searchValue state is controlled by searchProps.value', () => {
      const { rerender, queryAllByRole, queryByRole } = render(
        <EuiSelectable
          options={options}
          searchable
          searchProps={{ value: 'Enceladus' }}
        >
          {(list, search) => (
            <>
              {list}
              {search}
            </>
          )}
        </EuiSelectable>
      );
      expect(queryByRole('listbox')).toBeInTheDocument();
      expect(queryAllByRole('option')).toHaveLength(1);

      rerender(
        <EuiSelectable
          options={options}
          searchable
          searchProps={{ value: 'value not in list' }}
        >
          {(list, search) => (
            <>
              {list}
              {search}
            </>
          )}
        </EuiSelectable>
      );
      expect(queryByRole('listbox')).not.toBeInTheDocument();
      expect(queryAllByRole('option')).toHaveLength(0);

      rerender(
        <EuiSelectable options={options} searchable searchProps={{ value: '' }}>
          {(list, search) => (
            <>
              {list}
              {search}
            </>
          )}
        </EuiSelectable>
      );
      expect(queryByRole('listbox')).toBeInTheDocument();
      expect(queryAllByRole('option')).toHaveLength(options.length);
    });

    it('calls the searchProps.onChange callback on mount', () => {
      const onChange = jest.fn();
      render(
        <EuiSelectable
          options={options}
          searchable
          searchProps={{ value: 'pandora', onChange }}
        >
          {(_, search) => <>{search}</>}
        </EuiSelectable>
      );
      expect(onChange).toHaveBeenCalledWith('pandora', [options[2]]);
    });

    it('defaults to an empty string if no value or defaultValue is passed from searchProps', () => {
      const { getByTestSubject } = render(
        <EuiSelectable
          options={options}
          searchable
          searchProps={{ 'data-test-subj': 'searchInput' }}
        >
          {(_, search) => <>{search}</>}
        </EuiSelectable>
      );

      expect(getByTestSubject('searchInput')).toHaveValue('');
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

      expect(() =>
        render(
          <EuiSelectable<OptionalOption> options={options}>
            {(list) => list}
          </EuiSelectable>
        )
      ).not.toThrow();
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

      const { rerender } = render(
        <EuiSelectable<ExtendedOption> options={options}>
          {(list) => list}
        </EuiSelectable>
      );

      expect(() =>
        rerender(
          <EuiSelectable<ExtendedOption> options={options}>
            {(list) => list}
          </EuiSelectable>
        )
      ).not.toThrow();
    });

    test('with data', () => {
      type WithData = {
        numeral?: string;
      };
      const options = [
        {
          label: 'Titan',
          data: {
            numeral: 'VI',
          },
        },
        {
          label: 'Enceladus',
          data: {
            numeral: 'II',
          },
        },
        {
          label:
            "Pandora is one of Saturn's moons, named for a Titaness of Greek mythology",
          data: {
            numeral: 'XVII',
          },
        },
      ];
      const { container } = render(
        <EuiSelectable<WithData>
          options={options}
          renderOption={(option) => {
            return (
              <span>
                {option.numeral}: {option.label}
              </span>
            );
          }}
        >
          {(list) => list}
        </EuiSelectable>
      );

      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('onChange', () => {
    it('calls onChange with selected options array, click/keyboard event, and the clicked option', () => {
      const onChange = jest.fn();
      const { container, getAllByRole } = render(
        <EuiSelectable options={options} onChange={onChange}>
          {(list) => list}
        </EuiSelectable>
      );

      fireEvent.click(getAllByRole('option')[0]);
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange.mock.calls[0][0][0].checked).toEqual('on');
      expect(onChange.mock.calls[0][1].type).toEqual('click');
      expect(onChange.mock.calls[0][2]).toEqual({
        ...options[0],
        checked: 'on',
      });

      const target = container.querySelector('.euiSelectableList__list')!;
      fireEvent.keyDown(target, { key: 'Enter' });
      expect(onChange).toHaveBeenCalledTimes(2);
      expect(onChange.mock.calls[1][0][0].checked).toEqual('on');
      expect(onChange.mock.calls[1][1].type).toEqual('keydown');
      expect(onChange.mock.calls[1][2]).toEqual({
        ...options[0],
        checked: 'on',
      });
    });

    it('does not call onChange on keydown when focus is not on the search/listbox', () => {
      const onChange = jest.fn();
      const { container } = render(
        <EuiSelectable options={options} onChange={onChange}>
          {(list) => (
            <>
              <button id="test">test</button>
              {list}
            </>
          )}
        </EuiSelectable>
      );
      const target = container.querySelector('#test')!;
      fireEvent.keyDown(target, { key: 'Enter' });
      expect(onChange).toHaveBeenCalledTimes(0);
    });
  });

  describe('onActiveOptionChange', () => {
    it('calls the optional callback whenever the internal activeOptionIndex state changes', () => {
      const callback = jest.fn();
      const { container } = render(
        <EuiSelectable options={options} onActiveOptionChange={callback}>
          {(list) => list}
        </EuiSelectable>
      );
      const target = container.querySelector('.euiSelectableList__list')!;

      fireEvent.keyDown(target, { key: 'ArrowDown' });
      expect(callback).toHaveBeenCalledWith(options[0]);

      fireEvent.keyDown(target, { key: 'ArrowUp' });
      expect(callback).toHaveBeenCalledWith(options[2]);
    });

    it('does not change internal activeOptionIndex state on keydown when focus is not on the search/listbox', () => {
      const callback = jest.fn();
      const { container } = render(
        <EuiSelectable options={options} onActiveOptionChange={callback}>
          {(list) => (
            <>
              <button id="test">test</button>
              {list}
            </>
          )}
        </EuiSelectable>
      );
      const target = container.querySelector('#test')!;

      fireEvent.keyDown(target, { key: 'ArrowDown' });
      fireEvent.keyDown(target, { key: 'ArrowUp' });
      expect(callback).toHaveBeenCalledTimes(0);
    });

    it('handles the active option changing due to searching', () => {
      const callback = jest.fn();
      const { getByRole } = render(
        <EuiSelectable
          options={options}
          searchable
          searchProps={{ value: 'pandora' }}
          onActiveOptionChange={callback}
        >
          {(list, search) => (
            <>
              {search}
              {list}
            </>
          )}
        </EuiSelectable>
      );
      const target = getByRole('searchbox');

      fireEvent.keyDown(target, { key: 'ArrowDown' });
      expect(callback).toHaveBeenCalledWith(options[2]); // Pandora
    });
  });

  describe('errorMessage prop', () => {
    it('does not render the message when not defined', () => {
      const { container } = render(
        <EuiSelectable options={options} errorMessage={null}>
          {(list) => list}
        </EuiSelectable>
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    it('does renders the message when defined', () => {
      const { container } = render(
        <EuiSelectable options={options} errorMessage="Error!">
          {(list) => list}
        </EuiSelectable>
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    it('can render an element as the message', () => {
      const { container } = render(
        <EuiSelectable
          options={options}
          errorMessage={<span>Element error!</span>}
        >
          {(list) => list}
        </EuiSelectable>
      );

      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('screen reader instructions', () => {
    it('sets default accessibility instructions correctly', () => {
      const searchProps = {
        value: 'Enceladus',
        'data-test-subj': 'searchInput',
      };
      const { container } = render(
        <EuiSelectable options={options} searchable searchProps={searchProps}>
          {(list, search) => (
            <>
              {list}
              {search}
            </>
          )}
        </EuiSelectable>
      );

      expect(
        container.querySelector('p#generated-id_instructions')
      ).toHaveTextContent(
        'Use the Up and Down arrow keys to move focus over options. Press Enter to select. Press Escape to collapse options.'
      );
    });

    it('sets custom accessibility instructions correctly', () => {
      const searchProps = {
        value: 'Enceladus',
        'data-test-subj': 'searchInput',
      };
      const { container } = render(
        <EuiSelectable
          selectableScreenReaderText="Custom screenreader instructions."
          options={options}
          searchable
          searchProps={searchProps}
        >
          {(list, search) => (
            <>
              {list}
              {search}
            </>
          )}
        </EuiSelectable>
      );

      expect(
        container.querySelector('p#generated-id_instructions')
      ).toHaveTextContent(
        'Custom screenreader instructions. Use the Up and Down arrow keys to move focus over options. Press Enter to select. Press Escape to collapse options.'
      );
    });
  });
});
