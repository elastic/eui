import React from 'react';
import { shallow, render, mount } from 'enzyme';
import sinon from 'sinon';
import { requiredProps, findTestSubject } from '../../test';
import { comboBoxKeyCodes } from '../../services';

import { EuiComboBox } from './combo_box';

// This module requires a browser environment, so we'll fake what it returns.
jest.mock('tabbable', () => () => [{
  focus: () => {},
}, {
  focus: () => {},
}, {
  focus: () => {},
}]);

const options = [{
  label: 'Titan',
  'data-test-subj': 'titanOption',
}, {
  label: 'Enceladus',
}, {
  label: 'Mimas',
}, {
  label: 'Dione',
}, {
  label: 'Iapetus',
}, {
  label: 'Phoebe',
}, {
  label: 'Rhea',
}, {
  label: 'Pandora is one of Saturn\'s moons, named for a Titaness of Greek mythology',
}, {
  label: 'Tethys',
}, {
  label: 'Hyperion',
}];

describe('EuiComboBox', () => {
  test('is rendered', () => {
    const component = render(
      <EuiComboBox {...requiredProps} />
    );

    expect(component).toMatchSnapshot();
  });
});

describe('props', () => {
  test('options are rendered', () => {
    // NOTE: It's tough to test this because the dropdown containing the options opens up in
    // a portal.
    const component = shallow(
      <EuiComboBox options={options} />
    );

    expect(component).toMatchSnapshot();
  });

  test('selectedOptions are rendered', () => {
    const component = shallow(
      <EuiComboBox
        options={options}
        selectedOptions={[options[2], options[4]]}
      />
    );

    expect(component).toMatchSnapshot();
  });

  describe('isClearable=false disallows user from clearing input', () => {
    test('when no options are selected', () => {
      const component = shallow(
        <EuiComboBox
          options={options}
          isClearable={false}
        />
      );

      expect(component).toMatchSnapshot();
    });

    test('when options are selected', () => {
      const component = shallow(
        <EuiComboBox
          options={options}
          selectedOptions={[options[2], options[4]]}
          isClearable={false}
        />
      );

      expect(component).toMatchSnapshot();
    });
  });

  test('singleSelection is rendered', () => {
    const component = shallow(
      <EuiComboBox
        options={options}
        selectedOptions={[options[2]]}
        singleSelection={true}
      />
    );

    expect(component).toMatchSnapshot();
  });

  test('isDisabled is rendered', () => {
    const component = shallow(
      <EuiComboBox
        options={options}
        selectedOptions={[options[2]]}
        isDisabled={true}
      />
    );

    expect(component).toMatchSnapshot();
  });
});

describe('behavior', () => {
  describe('tabbing', () => {
    test.skip(`off the search input closes the options list if the user isn't navigating the options`, () => {
      const component = mount(
        <EuiComboBox
          options={options}
          selectedOptions={[options[2]]}
        />
      );

      const searchInput = findTestSubject(component, 'comboBoxSearchInput');
      searchInput.simulate('focus');

      // Focusing the input should open the options list.
      expect(findTestSubject(component, 'comboBoxOptionsList')).toBeDefined();

      // Tab backwards to take focus off the combo box.
      searchInput.simulate('keyDown', { keyCode: comboBoxKeyCodes.TAB, shiftKey: true });

      // Losing focus will close the options list.
      expect(findTestSubject(component, 'comboBoxOptionsList')).toBeUndefined();
    });

    test('off the search input does nothing if the user is navigating the options', () => {
      const component = mount(
        <EuiComboBox
          options={options}
          selectedOptions={[options[2]]}
        />
      );

      const searchInput = findTestSubject(component, 'comboBoxSearchInput');
      searchInput.simulate('focus');

      // Focusing the input should open the options list.
      expect(findTestSubject(component, 'comboBoxOptionsList')).toBeDefined();

      // Navigate to an option.
      searchInput.simulate('keyDown', { keyCode: comboBoxKeyCodes.DOWN });

      // Tab backwards to take focus off the combo box.
      searchInput.simulate('keyDown', { keyCode: comboBoxKeyCodes.TAB, shiftKey: true });

      // List remains open.
      expect(findTestSubject(component, 'comboBoxOptionsList')).toBeDefined();
    });
  });

  describe('clear button', () => {
    test('calls onChange callback with empty array', () => {
      const onChangeHandler = sinon.spy();
      const component = mount(
        <EuiComboBox
          options={options}
          selectedOptions={[options[2]]}
          onChange={onChangeHandler}
        />
      );

      findTestSubject(component, 'comboBoxClearButton').simulate('click');
      sinon.assert.calledOnce(onChangeHandler);
      sinon.assert.calledWith(onChangeHandler, []);
    });

    test('focuses the input', () => {
      const component = mount(
        <EuiComboBox
          options={options}
          selectedOptions={[options[2]]}
          onChange={() => {}}
        />
      );

      findTestSubject(component, 'comboBoxClearButton').simulate('click');
      expect(findTestSubject(component, 'comboBoxSearchInput').getDOMNode()).toBe(document.activeElement);
    });
  });
});
