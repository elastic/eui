import React from 'react';
import { mount } from 'enzyme';

import { EuiCheckboxGroup } from './checkbox_group';

// This exists because we need to run the following tests
// without mocking the Checkbox component, such as testing
// an interaction that is handled by the Checkbox component.
describe('EuiCheckboxGroupUnmockedCheckbox', () => {
  test('id is bound to onChange', () => {
    let id;

    const onChange = (_id) => {
      id = _id;
    };

    const component = mount(
      <EuiCheckboxGroup
        options={[
          { id: '1', label: 'kibana', disabled: false },
        ]}
        idToSelectedMap={{
          '1': true,
        }}
        onChange={onChange}
      />
    );

    component.find('input[type="checkbox"]').simulate('change');
    expect(id).toBe('1');
  });
});
