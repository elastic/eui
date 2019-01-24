import React from 'react';
import { shallow } from 'enzyme';

import {
  EuiSuperUpdateButton,
} from './update_button';

const noop = () => {};

describe('EuiSuperUpdateButton', () => {
  test('is rendered', () => {
    const component = shallow(
      <EuiSuperUpdateButton
        onApply={noop}
      />
    );

    expect(component)
      .toMatchSnapshot();
  });

  test('hasChanged', () => {
    const component = shallow(
      <EuiSuperUpdateButton
        hasChanged
        onApply={noop}
      />
    );

    expect(component)
      .toMatchSnapshot();
  });

  test('isInvalid', () => {
    const component = shallow(
      <EuiSuperUpdateButton
        isInvalid
        onApply={noop}
      />
    );

    expect(component)
      .toMatchSnapshot();
  });

  test('isLoading', () => {
    const component = shallow(
      <EuiSuperUpdateButton
        isLoading
        onApply={noop}
      />
    );

    expect(component)
      .toMatchSnapshot();
  });
});
