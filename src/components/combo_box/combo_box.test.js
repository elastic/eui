import React from 'react';
import { shallow } from 'enzyme';
import { requiredProps } from '../../test';

import { EuiComboBox } from './combo_box';

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
    const component = shallow(
      <EuiComboBox {...requiredProps} />
    );

    expect(component).toMatchSnapshot();
  });
});

describe('props', () => {
  test('options', () => {
    const component = shallow(
      <EuiComboBox
        options={options}
        {...requiredProps}
      />
    );

    expect(component).toMatchSnapshot();
  });

  test('selectedOptions', () => {
    const component = shallow(
      <EuiComboBox
        options={options}
        selectedOptions={[options[2], options[4]]}
        {...requiredProps}
      />
    );

    expect(component).toMatchSnapshot();
  });

  describe('isClearable is false', () => {
    test('without selectedOptions', () => {
      const component = shallow(
        <EuiComboBox
          options={options}
          isClearable={false}
          {...requiredProps}
        />
      );

      expect(component).toMatchSnapshot();
    });

    test('with selectedOptions', () => {
      const component = shallow(
        <EuiComboBox
          options={options}
          selectedOptions={[options[2], options[4]]}
          isClearable={false}
          {...requiredProps}
        />
      );

      expect(component).toMatchSnapshot();
    });
  });

  test('singleSelection', () => {
    const component = shallow(
      <EuiComboBox
        options={options}
        selectedOptions={[options[2]]}
        singleSelection={true}
        {...requiredProps}
      />
    );

    expect(component).toMatchSnapshot();
  });

  test('isDisabled', () => {
    const component = shallow(
      <EuiComboBox
        options={options}
        selectedOptions={[options[2]]}
        isDisabled={true}
        {...requiredProps}
      />
    );

    expect(component).toMatchSnapshot();
  });
});
