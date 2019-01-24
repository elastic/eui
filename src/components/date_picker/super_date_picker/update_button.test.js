import React from 'react';
import { shallow } from 'enzyme';

import {
  EuiUpdateButton,
} from './update_button';

const noop = () => {};

describe('EuiUpdateButton', () => {
  test('is rendered', () => {
    const component = shallow(
      <EuiUpdateButton
        onApply={noop}
      />
    );

    expect(component)
      .toMatchSnapshot();
  });

  test('hasChanged', () => {
    const component = shallow(
      <EuiUpdateButton
        hasChanged
        onApply={noop}
      />
    );

    expect(component)
      .toMatchSnapshot();
  });

  test('isInvalid', () => {
    const component = shallow(
      <EuiUpdateButton
        isInvalid
        onApply={noop}
      />
    );

    expect(component)
      .toMatchSnapshot();
  });

  test('isLoading', () => {
    const component = shallow(
      <EuiUpdateButton
        isLoading
        onApply={noop}
      />
    );

    expect(component)
      .toMatchSnapshot();
  });
});
