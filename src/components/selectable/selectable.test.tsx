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
import { shouldRenderCustomStyles } from '../../test/internal';

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
    const component = render(
      <EuiSelectable options={options} {...requiredProps} id="testId" />
    );

    expect(component).toMatchSnapshot();
  });

  test('should not reset the activeOptionIndex nor isFocused when EuiSelectable is blurred in favour of its search/listbox', () => {
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

    const listBox = component.find('div.euiSelectableList__list').getDOMNode();
    component
      .find('.euiSelectable')
      .simulate('blur', { relatedTarget: listBox });
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

  describe('search value', () => {
    it('supports inheriting initialSearchValue from searchProps.defaultValue', () => {
      const component = render(
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
      expect(component).toMatchSnapshot();
      expect(
        component.find('input[data-test-subj="searchInput"]').prop('value')
      ).toEqual('default value');
    });

    it('supports controlled searchValue state from searchProps.value', () => {
      const searchProps = {
        value: 'first value',
        'data-test-subj': 'searchInput',
      };
      const component = mount(
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
        component.find('input[data-test-subj="searchInput"]').prop('value')
      ).toEqual('first value');

      component.setProps({
        searchProps: { ...searchProps, value: 'second value' },
      });
      expect(
        component.find('input[data-test-subj="searchInput"]').prop('value')
      ).toEqual('second value');
    });

    it('updates options list when searchValue state is controlled by searchProps.value', () => {
      const searchProps = {
        value: 'Enceladus',
        'data-test-subj': 'searchInput',
      };
      const component = mount(
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
        (component.find('EuiSelectableList').props() as any).visibleOptions
      ).toHaveLength(1);

      component.setProps({
        searchProps: { ...searchProps, value: 'value not in list' },
      });

      expect(component.find('EuiSelectableList').exists()).toBeFalsy();

      component.setProps({
        searchProps: { ...searchProps, value: '' },
      });

      expect(
        (component.find('EuiSelectableList').props() as any).visibleOptions
      ).toEqual(options);
    });

    it('calls the searchProps.onChange callback on mount', () => {
      const onChange = jest.fn();
      mount(
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
      const component = render(
        <EuiSelectable
          options={options}
          searchable
          searchProps={{ 'data-test-subj': 'searchInput' }}
        >
          {(_, search) => <>{search}</>}
        </EuiSelectable>
      );
      expect(
        component.find('input[data-test-subj="searchInput"]').prop('value')
      ).toEqual('');
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

      const component = mount(
        <EuiSelectable<OptionalOption> options={options}>
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

      const component = mount(
        <EuiSelectable<ExtendedOption> options={options}>
          {(list) => list}
        </EuiSelectable>
      );

      component.update();

      expect(
        (component.find('EuiSelectableList').props() as any).visibleOptions
      ).toEqual(options);
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
      const component = render(
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

      expect(component).toMatchSnapshot();
    });
  });

  describe('onChange', () => {
    it('calls onChange with selected options array, click/keyboard event, and the clicked option', () => {
      const onChange = jest.fn();
      const component = mount(
        <EuiSelectable options={options} onChange={onChange}>
          {(list) => list}
        </EuiSelectable>
      );
      const target = component.find('div.euiSelectableList__list').getDOMNode();

      component.find('[role="option"]').first().simulate('click');
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange.mock.calls[0][0][0].checked).toEqual('on');
      expect(onChange.mock.calls[0][1].type).toEqual('click');
      expect(onChange.mock.calls[0][2]).toEqual({
        ...options[0],
        checked: 'on',
      });

      component.simulate('keydown', { key: 'Enter', target });
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
      const component = mount(
        <EuiSelectable options={options} onChange={onChange}>
          {(list) => (
            <>
              <button id="test">test</button>
              {list}
            </>
          )}
        </EuiSelectable>
      );
      const target = component.find('#test').getDOMNode();

      component.simulate('keydown', { key: 'Enter', target });
      expect(onChange).toHaveBeenCalledTimes(0);
    });
  });

  describe('onActiveOptionChange', () => {
    it('calls the optional callback whenever the internal activeOptionIndex state changes', () => {
      const callback = jest.fn();
      const component = mount(
        <EuiSelectable options={options} onActiveOptionChange={callback}>
          {(list) => list}
        </EuiSelectable>
      );
      const target = component.find('div.euiSelectableList__list').getDOMNode();

      component.simulate('keydown', { key: 'ArrowDown', target });
      expect(callback).toHaveBeenCalledWith(options[0]);

      component.simulate('keydown', { key: 'ArrowUp', target });
      expect(callback).toHaveBeenCalledWith(options[2]);
    });

    it('does not change internal activeOptionIndex state on keydown when focus is not on the search/listbox', () => {
      const callback = jest.fn();
      const component = mount(
        <EuiSelectable options={options} onActiveOptionChange={callback}>
          {(list) => (
            <>
              <button id="test">test</button>
              {list}
            </>
          )}
        </EuiSelectable>
      );
      const target = component.find('#test').getDOMNode();

      component.simulate('keydown', { key: 'ArrowDown', target });
      component.simulate('keydown', { key: 'ArrowUp', target });
      expect(callback).toHaveBeenCalledTimes(0);
    });

    it('handles the active option changing due to searching', () => {
      const callback = jest.fn();
      const component = mount(
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
      const target = component.find('input[type="search"]').getDOMNode();

      component.simulate('keydown', { key: 'ArrowDown', target });
      expect(callback).toHaveBeenCalledWith(options[2]); // Pandora
    });
  });

  describe('errorMessage prop', () => {
    it('does not render the message when not defined', () => {
      const component = render(
        <EuiSelectable options={options} errorMessage={null}>
          {(list) => list}
        </EuiSelectable>
      );

      expect(component).toMatchSnapshot();
    });

    it('does renders the message when defined', () => {
      const component = render(
        <EuiSelectable options={options} errorMessage="Error!">
          {(list) => list}
        </EuiSelectable>
      );

      expect(component).toMatchSnapshot();
    });

    it('can render an element as the message', () => {
      const component = render(
        <EuiSelectable
          options={options}
          errorMessage={<span>Element error!</span>}
        >
          {(list) => list}
        </EuiSelectable>
      );

      expect(component).toMatchSnapshot();
    });
  });

  describe('screen reader instructions', () => {
    it('sets default accessibility instructions correctly', () => {
      const searchProps = {
        value: 'Enceladus',
        'data-test-subj': 'searchInput',
      };
      const component = mount(
        <EuiSelectable options={options} searchable searchProps={searchProps}>
          {(list, search) => (
            <>
              {list}
              {search}
            </>
          )}
        </EuiSelectable>
      );

      expect(component.find('p#generated-id_instructions').text()).toEqual(
        ' Use the Up and Down arrow keys to move focus over options. Press Enter to select. Press Escape to collapse options.'
      );
    });

    it('sets custom accessibility instructions correctly', () => {
      const searchProps = {
        value: 'Enceladus',
        'data-test-subj': 'searchInput',
      };
      const component = mount(
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

      expect(component).toMatchSnapshot();
      expect(component.find('p#generated-id_instructions').text()).toEqual(
        'Custom screenreader instructions. Use the Up and Down arrow keys to move focus over options. Press Enter to select. Press Escape to collapse options.'
      );
    });
  });
});
