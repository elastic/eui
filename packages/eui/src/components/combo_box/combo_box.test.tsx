/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { fireEvent } from '@testing-library/react';
import {
  render,
  showEuiComboBoxOptions,
  waitForEuiToolTipVisible,
} from '../../test/rtl';
import {
  shouldRenderCustomStyles,
  testOnReactVersion,
} from '../../test/internal';
import { requiredProps } from '../../test';

import { keys } from '../../services';
import { EuiComboBox } from './combo_box';
import type { EuiComboBoxOptionOption } from './types';

interface Options {
  'data-test-subj'?: string;
  label: string;
  toolTipContent?: string;
  toolTipProps?: {};
}
const options: Options[] = [
  {
    'data-test-subj': 'titanOption',
    label: 'Titan',
  },
  { label: 'Enceladus' },
  { label: 'Mimas' },
  { label: 'Dione' },
  { label: 'Iapetus' },
  { label: 'Phoebe' },
  { label: 'Rhea' },
  {
    label:
      "Pandora is one of Saturn's moons, named for a Titaness of Greek mythology",
  },
  { label: 'Tethys' },
  { label: 'Hyperion' },
];

describe('EuiComboBox', () => {
  shouldRenderCustomStyles(<EuiComboBox />);

  shouldRenderCustomStyles(
    <EuiComboBox
      options={[{ label: 'test', truncationProps: { truncation: 'middle' } }]}
    />,
    {
      skip: { parentTest: true },
      childProps: ['truncationProps', 'options[0]'],
      renderCallback: showEuiComboBoxOptions,
    }
  );

  it('renders', () => {
    const { container } = render(<EuiComboBox {...requiredProps} />);

    expect(container.firstChild).toMatchSnapshot();
  });

  it('supports thousands of options in an options group', () => {
    // tests for a regression: RangeError: Maximum call stack size exceeded
    // https://mathiasbynens.be/demo/javascript-argument-count
    const options: EuiComboBoxOptionOption[] = [{ label: 'test', options: [] }];
    for (let i = 0; i < 250000; i++) {
      options[0].options?.push({ label: `option ${i}` });
    }

    render(<EuiComboBox {...requiredProps} options={options} />);
  });

  // React 16 for some reason doesn't snapshot the screen reader text
  testOnReactVersion(['17', '18'])(
    'renders the options list dropdown',
    async () => {
      const { baseElement } = render(
        <EuiComboBox
          options={options}
          data-test-subj="alsoGetsAppliedToOptionsList"
        />
      );
      await showEuiComboBoxOptions();

      expect(baseElement).toMatchSnapshot();
    }
  );

  it('renders selectedOptions as pills', () => {
    const { getAllByTestSubject } = render(
      <EuiComboBox
        options={options}
        selectedOptions={[options[2], options[4]]}
      />
    );
    const selections = getAllByTestSubject('euiComboBoxPill');

    expect(selections).toHaveLength(2);
    expect(selections[0]).toHaveTextContent(options[2].label);
    expect(selections[1]).toHaveTextContent(options[4].label);
  });

  describe('props', () => {
    describe('option.prepend & option.append', () => {
      const options = [
        { label: '1', prepend: <span data-test-subj="prepend">Pre</span> },
        { label: '2', append: <span data-test-subj="append">Post</span> },
      ];

      it('renders in pills', () => {
        const { getByTestSubject } = render(
          <EuiComboBox options={options} selectedOptions={options} />
        );

        expect(getByTestSubject('prepend')).toBeInTheDocument();
        expect(getByTestSubject('append')).toBeInTheDocument();
      });

      test('renders in the options dropdown', async () => {
        const { getByTestSubject } = render(<EuiComboBox options={options} />);
        await showEuiComboBoxOptions();

        expect(getByTestSubject('prepend')).toBeInTheDocument();
        expect(getByTestSubject('append')).toBeInTheDocument();
      });

      test('renders in single selection', () => {
        const { getByTestSubject, queryByTestSubject } = render(
          <EuiComboBox
            options={options}
            selectedOptions={[options[0]]}
            singleSelection={{ asPlainText: true }}
          />
        );

        expect(getByTestSubject('prepend')).toBeInTheDocument();
        expect(queryByTestSubject('append')).not.toBeInTheDocument();
      });
    });

    describe('singleSelection', () => {
      it('does not show or allow selecting more than one option', async () => {
        const onChange = jest.fn();

        const { getAllByTestSubject } = render(
          <EuiComboBox
            options={options}
            onChange={onChange}
            selectedOptions={[options[2], options[0]]}
            singleSelection={true}
          />
        );
        const selections = getAllByTestSubject('euiComboBoxPill');

        expect(selections).toHaveLength(1);
        expect(selections[0]).toHaveTextContent('Mimas');
      });

      it('selects existing option when opened', async () => {
        const { getByTestSubject } = render(
          <EuiComboBox
            options={options}
            selectedOptions={[options[0]]}
            singleSelection={true}
          />
        );
        await showEuiComboBoxOptions();

        const dropdown = getByTestSubject('comboBoxOptionsList');
        const checkedOption = '[data-euiicon-type="check"]';

        // Should only have 1 checked item
        expect(dropdown.querySelectorAll(checkedOption)).toHaveLength(1);

        // The first option should be rendered and have the check
        const option = dropdown.querySelector('[data-test-subj="titanOption"]');
        expect(option).toBeTruthy();
        expect(option!.querySelector(checkedOption)).toBeTruthy();
      });

      it('renders prepend and append in form layout', () => {
        const { container } = render(
          <EuiComboBox
            options={options}
            singleSelection={true}
            prepend="String"
            append="String"
          />
        );

        expect(
          container.querySelector('.euiFormControlLayout__prepend')
        ).toBeInTheDocument();
        expect(
          container.querySelector('.euiFormControlLayout__append')
        ).toBeInTheDocument();
      });

      it('renders `asPlainText` in the search input, not as a pill', () => {
        const { queryByTestSubject, getByTestSubject } = render(
          <EuiComboBox
            options={options}
            selectedOptions={[options[2]]}
            singleSelection={{ asPlainText: true }}
          />
        );

        const searchInput = getByTestSubject('comboBoxSearchInput');
        expect(searchInput).toHaveValue('Mimas');
        expect(searchInput).toHaveStyle('inline-size: 100%');

        expect(queryByTestSubject('euiComboBoxPill')).not.toBeInTheDocument();
      });
    });

    describe('toolTipContent & tooltipProps', () => {
      it('renders a tooltip with applied props on mouseover', async () => {
        const options = [
          {
            label: 'Titan',
            'data-test-subj': 'titanOption',
            toolTipContent: 'I am a tooltip!',
            toolTipProps: {
              'data-test-subj': 'optionToolTip',
            },
          },
          {
            label: 'Enceladus',
          },
          {
            label: 'Mimas',
          },
        ];

        const { getByTestSubject } = render(<EuiComboBox options={options} />);

        await showEuiComboBoxOptions();

        fireEvent.mouseOver(getByTestSubject('titanOption'));
        await waitForEuiToolTipVisible();

        expect(getByTestSubject('optionToolTip')).toBeInTheDocument();
        expect(getByTestSubject('optionToolTip')).toHaveTextContent(
          'I am a tooltip!'
        );
      });

      it('renders a tooltip with applied props on keyboard navigation', async () => {
        const options = [
          {
            label: 'Titan',
            'data-test-subj': 'titanOption',
            toolTipContent: 'I am a tooltip!',
            toolTipProps: {
              'data-test-subj': 'optionToolTip',
            },
          },
          {
            label: 'Enceladus',
          },
          {
            label: 'Mimas',
          },
        ];

        const { getByTestSubject } = render(<EuiComboBox options={options} />);
        await showEuiComboBoxOptions();

        const input = getByTestSubject('comboBoxSearchInput');
        fireEvent.keyDown(input, { key: keys.ARROW_DOWN });

        await waitForEuiToolTipVisible();

        expect(getByTestSubject('optionToolTip')).toBeInTheDocument();
        expect(getByTestSubject('optionToolTip')).toHaveTextContent(
          'I am a tooltip!'
        );
      });

      describe('placeholder', () => {
        it('renders', () => {
          const { getByTestSubject } = render(
            <EuiComboBox
              options={options}
              selectedOptions={[]}
              placeholder="Select something"
            />
          );
          const searchInput = getByTestSubject('comboBoxSearchInput');

          expect(searchInput).toHaveAttribute(
            'placeholder',
            'Select something'
          );
          expect(searchInput).toHaveStyle('inline-size: 100%');
        });

        it('does not render the placeholder if a selection has been made', () => {
          const { getByTestSubject } = render(
            <EuiComboBox
              options={options}
              selectedOptions={[options[0]]}
              placeholder="Select something"
            />
          );
          const searchInput = getByTestSubject('comboBoxSearchInput');
          expect(searchInput).not.toHaveAttribute('placeholder');
        });

        it('does not render the placeholder if a search value exists', () => {
          const { getByTestSubject } = render(
            <EuiComboBox options={options} placeholder="Select something" />
          );
          const searchInput = getByTestSubject('comboBoxSearchInput');
          expect(searchInput).toHaveAttribute('placeholder');

          fireEvent.change(searchInput, { target: { value: 'some search' } });
          expect(searchInput).not.toHaveAttribute('placeholder');
        });
      });

      test('isDisabled', () => {
        const { container, queryByTestSubject, queryByTitle } = render(
          <EuiComboBox
            options={options}
            selectedOptions={[options[0]]}
            isDisabled={true}
          />
        );

        expect(container.firstElementChild!.className).toContain('-isDisabled');
        expect(queryByTestSubject('comboBoxSearchInput')).toBeDisabled();

        expect(queryByTestSubject('comboBoxClearButton')).toBeFalsy();
        expect(queryByTestSubject('comboBoxToggleListButton')).toBeFalsy();
        expect(
          queryByTitle('Remove Titan from selection in this group')
        ).toBeFalsy();
      });

      test('fullWidth', () => {
        // TODO: Should likely be a visual screenshot test
        const { container } = render(
          <EuiComboBox
            options={options}
            selectedOptions={[options[2]]}
            fullWidth={true}
          />
        );

        expect(container.firstElementChild!.className).toContain('-fullWidth');
        expect(
          container.querySelector('.euiFormControlLayout')!.className
        ).toContain('-fullWidth');
      });

      test('autoFocus', () => {
        const { getByTestSubject } = render(
          <EuiComboBox
            options={options}
            selectedOptions={[options[2], options[3]]}
            autoFocus
          />
        );

        expect(document.activeElement).toBe(
          getByTestSubject('comboBoxSearchInput')
        );
      });

      test('aria-label / aria-labelledby renders on the input, not on the wrapper', () => {
        const { getByTestSubject } = render(
          <EuiComboBox
            options={options}
            // Production usages shouldn't have both attributes,
            // we're just combining them for testing expedience
            aria-label="Test label"
            aria-labelledby="test-heading-id"
          />
        );
        const input = getByTestSubject('comboBoxSearchInput');

        expect(input).toHaveAttribute('aria-label', 'Test label');
        expect(input).toHaveAttribute('aria-labelledby', 'test-heading-id');
      });

      test('inputRef', () => {
        const inputRefCallback = jest.fn();

        const { getByRole } = render(
          <EuiComboBox options={options} inputRef={inputRefCallback} />
        );
        expect(inputRefCallback).toHaveBeenCalledTimes(1);

        expect(getByRole('combobox')).toBe(inputRefCallback.mock.calls[0][0]);
      });

      test('onSearchChange', () => {
        const onSearchChange = jest.fn();
        const { getByTestSubject, queryAllByRole } = render(
          <EuiComboBox options={options} onSearchChange={onSearchChange} />
        );
        const input = getByTestSubject('comboBoxSearchInput');

        fireEvent.change(input, { target: { value: 'no results' } });
        expect(onSearchChange).toHaveBeenCalledWith('no results', false);
        expect(queryAllByRole('option')).toHaveLength(0);

        fireEvent.change(input, { target: { value: 'titan' } });
        expect(onSearchChange).toHaveBeenCalledWith('titan', true);
        expect(queryAllByRole('option')).toHaveLength(2);
      });
    });

    it('does not show multiple checkmarks with duplicate labels', async () => {
      const options = [
        { label: 'Titan', key: 'titan1' },
        { label: 'Titan', key: 'titan2' },
        { label: 'Tethys' },
      ];
      const { baseElement } = render(
        <EuiComboBox
          singleSelection={{ asPlainText: true }}
          options={options}
          selectedOptions={[options[1]]}
        />
      );
      await showEuiComboBoxOptions();

      const dropdownOptions = baseElement.querySelectorAll(
        '.euiFilterSelectItem'
      );
      expect(
        dropdownOptions[0]!.querySelector('[data-euiicon-type="check"]')
      ).toBeFalsy();
      expect(
        dropdownOptions[1]!.querySelector('[data-euiicon-type="check"]')
      ).toBeTruthy();
    });

    describe('behavior', () => {
      describe('hitting "Enter"', () => {
        describe('when the search input matches a value', () => {
          it('selects the option', () => {
            const onChange = jest.fn();
            const { getByTestSubject } = render(
              <EuiComboBox options={[{ label: 'Red' }]} onChange={onChange} />
            );

            const input = getByTestSubject('comboBoxSearchInput');
            fireEvent.change(input, { target: { value: 'red' } });
            fireEvent.keyDown(input, { key: 'Enter' });

            expect(onChange).toHaveBeenCalledWith([{ label: 'Red' }]);
          });

          it('accounts for group labels', () => {
            const onChange = jest.fn();
            const { getByTestSubject } = render(
              <EuiComboBox
                options={[{ label: 'Group', options: [{ label: 'Blue' }] }]}
                onChange={onChange}
              />
            );

            const input = getByTestSubject('comboBoxSearchInput');
            fireEvent.change(input, { target: { value: 'blue' } });
            fireEvent.keyDown(input, { key: 'Enter' });

            expect(onChange).toHaveBeenCalledWith([{ label: 'Blue' }]);
          });
        });

        describe('when `onCreateOption` is passed', () => {
          it('fires the callback when there is input', () => {
            const onCreateOptionHandler = jest.fn();

            const { getByTestSubject } = render(
              <EuiComboBox
                options={options}
                selectedOptions={[options[2]]}
                onCreateOption={onCreateOptionHandler}
              />
            );
            const input = getByTestSubject('comboBoxSearchInput');

            fireEvent.change(input, { target: { value: 'foo' } });
            fireEvent.keyDown(input, { key: 'Enter' });

            expect(onCreateOptionHandler).toHaveBeenCalledTimes(1);
            expect(onCreateOptionHandler).toHaveBeenCalledWith('foo', options);
          });

          it('does not fire the callback when there is no input', () => {
            const onCreateOptionHandler = jest.fn();

            const { getByTestSubject } = render(
              <EuiComboBox
                options={options}
                selectedOptions={[options[2]]}
                onCreateOption={onCreateOptionHandler}
              />
            );
            const input = getByTestSubject('comboBoxSearchInput');

            fireEvent.keyDown(input, { key: 'Enter' });

            expect(onCreateOptionHandler).not.toHaveBeenCalled();
          });

          it('fires the callback only once when adding duplicated values', () => {
            const onCreateOptionHandler = jest.fn();

            const { getByTestSubject } = render(
              <EuiComboBox
                delimiter=","
                options={options}
                selectedOptions={[options[2]]}
                onCreateOption={onCreateOptionHandler}
              />
            );
            const input = getByTestSubject('comboBoxSearchInput');

            fireEvent.change(input, { target: { value: 'a, a,  a,   a' } });
            fireEvent.keyDown(input, { key: 'Enter' });

            expect(onCreateOptionHandler).toHaveBeenCalledTimes(1);
            expect(onCreateOptionHandler).toHaveBeenCalledWith('a', options);
          });
        });
      });

      describe('tabbing off the search input', () => {
        it("closes the options list if the user isn't navigating the options", async () => {
          const keyDownBubbled = jest.fn();

          const { getByTestSubject } = render(
            <div onKeyDown={keyDownBubbled}>
              <EuiComboBox options={options} selectedOptions={[options[2]]} />
            </div>
          );
          await showEuiComboBoxOptions();

          const mockEvent = { key: keys.TAB, shiftKey: true };
          fireEvent.keyDown(getByTestSubject('comboBoxSearchInput'), mockEvent);

          // If the TAB keydown bubbled up to the wrapper, then a browser DOM would shift the focus
          expect(keyDownBubbled).toHaveBeenCalledWith(
            expect.objectContaining(mockEvent)
          );
        });

        it('calls onCreateOption', () => {
          const onCreateOptionHandler = jest.fn();

          const { getByTestSubject } = render(
            <EuiComboBox
              options={options}
              selectedOptions={[options[2]]}
              onCreateOption={onCreateOptionHandler}
            />
          );
          const input = getByTestSubject('comboBoxSearchInput');

          fireEvent.change(input, { target: { value: 'foo' } });
          fireEvent.blur(input);

          expect(onCreateOptionHandler).toHaveBeenCalledTimes(1);
          expect(onCreateOptionHandler).toHaveBeenCalledWith('foo', options);
        });

        it('does nothing if the user is navigating the options', async () => {
          const keyDownBubbled = jest.fn();

          const { getByTestSubject } = render(
            <div onKeyDown={keyDownBubbled}>
              <EuiComboBox options={options} selectedOptions={[options[2]]} />
            </div>
          );
          await showEuiComboBoxOptions();

          // Navigate to an option then tab off
          const input = getByTestSubject('comboBoxSearchInput');
          fireEvent.keyDown(input, { key: keys.ARROW_DOWN });
          fireEvent.keyDown(input, { key: keys.TAB });

          // If the TAB keydown did not bubble to the wrapper, then the tab event was prevented
          expect(keyDownBubbled).not.toHaveBeenCalled();
        });
      });

      describe('clear button', () => {
        it('renders when options are selected', () => {
          const { getByTestSubject } = render(
            <EuiComboBox options={options} selectedOptions={[options[2]]} />
          );

          expect(getByTestSubject('comboBoxClearButton')).toBeInTheDocument();
        });

        it('does not render when no options are selected', () => {
          const { queryByTestSubject } = render(
            <EuiComboBox options={options} />
          );

          expect(queryByTestSubject('comboBoxClearButton')).toBeFalsy();
        });

        it('does not render when isClearable is false', () => {
          const { queryByTestSubject } = render(
            <EuiComboBox
              options={options}
              selectedOptions={[options[2]]}
              isClearable={false}
            />
          );

          expect(queryByTestSubject('comboBoxClearButton')).toBeFalsy();
        });

        it('calls the onChange callback with empty array', () => {
          const onChangeHandler = jest.fn();

          const { getByTestSubject } = render(
            <EuiComboBox
              options={options}
              selectedOptions={[options[2]]}
              onChange={onChangeHandler}
            />
          );
          fireEvent.click(getByTestSubject('comboBoxClearButton'));

          expect(onChangeHandler).toHaveBeenCalledTimes(1);
          expect(onChangeHandler).toHaveBeenCalledWith([]);
        });

        it('focuses the input', () => {
          const { getByTestSubject } = render(
            <EuiComboBox
              options={options}
              selectedOptions={[options[2]]}
              onChange={() => {}}
            />
          );
          fireEvent.click(getByTestSubject('comboBoxClearButton'));

          expect(document.activeElement).toBe(
            getByTestSubject('comboBoxSearchInput')
          );
        });
      });

      describe('sortMatchesBy', () => {
        const sortMatchesByOptions = [
          { label: 'Something is Disabled' },
          ...options,
        ];

        test('"none"', () => {
          const { getByTestSubject, getAllByRole } = render(
            <EuiComboBox options={sortMatchesByOptions} sortMatchesBy="none" />
          );
          fireEvent.change(getByTestSubject('comboBoxSearchInput'), {
            target: { value: 'di' },
          });

          const foundOptions = getAllByRole('option');
          expect(foundOptions).toHaveLength(2);
          expect(foundOptions[0]).toHaveTextContent('Something is Disabled');
          expect(foundOptions[1]).toHaveTextContent('Dione');
        });

        test('"startsWith"', () => {
          const { getByTestSubject, getAllByRole } = render(
            <EuiComboBox
              options={sortMatchesByOptions}
              sortMatchesBy="startsWith"
            />
          );
          fireEvent.change(getByTestSubject('comboBoxSearchInput'), {
            target: { value: 'di' },
          });

          const foundOptions = getAllByRole('option');
          expect(foundOptions).toHaveLength(2);
          expect(foundOptions[0]).toHaveTextContent('Dione');
          expect(foundOptions[1]).toHaveTextContent('Something is Disabled');
        });
      });

      describe('isCaseSensitive', () => {
        const isCaseSensitiveOptions = [{ label: 'Case sensitivity' }];

        test('false', () => {
          const { getByTestSubject, queryAllByRole } = render(
            <EuiComboBox
              options={isCaseSensitiveOptions}
              isCaseSensitive={false}
            />
          );
          fireEvent.change(getByTestSubject('comboBoxSearchInput'), {
            target: { value: 'case' },
          });

          expect(queryAllByRole('option')).toHaveLength(1);
        });

        test('true', () => {
          const { getByTestSubject, queryAllByRole } = render(
            <EuiComboBox
              options={isCaseSensitiveOptions}
              isCaseSensitive={true}
            />
          );
          const input = getByTestSubject('comboBoxSearchInput');

          fireEvent.change(input, { target: { value: 'case' } });
          expect(queryAllByRole('option')).toHaveLength(0);

          fireEvent.change(input, { target: { value: 'Case' } });
          expect(queryAllByRole('option')).toHaveLength(1);
        });
      });
    });
  });
});
