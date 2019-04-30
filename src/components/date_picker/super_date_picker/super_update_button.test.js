import React from 'react';
import { shallow } from 'enzyme';

import { EuiSuperUpdateButton } from './super_update_button';

const noop = () => {};

describe('EuiSuperUpdateButton', () => {
  test('is rendered', () => {
    const component = shallow(<EuiSuperUpdateButton onClick={noop} />);

    expect(component).toMatchSnapshot();
  });

  test('needsUpdate', () => {
    const component = shallow(
      <EuiSuperUpdateButton needsUpdate onClick={noop} />
    );

    expect(component).toMatchSnapshot();
  });

  test('isDisabled', () => {
    const component = shallow(
      <EuiSuperUpdateButton isDisabled onClick={noop} />
    );

    expect(component).toMatchSnapshot();
  });

  test('isLoading', () => {
    const component = shallow(
      <EuiSuperUpdateButton isLoading onClick={noop} />
    );

    expect(component).toMatchSnapshot();
  });
});
