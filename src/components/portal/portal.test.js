import React from 'react';
import { mount } from 'enzyme';
import { EuiPortal } from './portal';

describe('EuiPortal', () => {
  test('is rendered', () => {
    const component = mount(
      <div>
        <EuiPortal>
          Content
        </EuiPortal>
      </div>
    );

    expect(component)
      .toMatchSnapshot();
  });
});
