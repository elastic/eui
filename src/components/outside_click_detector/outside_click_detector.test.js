import React from 'react';
import { render } from 'enzyme';

import { EuiOutsideClickDetector } from './outside_click_detector';

describe('EuiOutsideClickDetector', () => {
  test('is rendered', () => {
    const component = render(
      <EuiOutsideClickDetector onOutsideClick={() => {}}>
        <div />
      </EuiOutsideClickDetector>
    );

    expect(component)
      .toMatchSnapshot();
  });
});
