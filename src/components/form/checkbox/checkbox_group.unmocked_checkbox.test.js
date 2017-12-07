import React from 'react';
import { mount } from 'enzyme';

import { EuiCheckboxGroup } from './checkbox_group';

describe('EuiCheckboxGroup', () => {
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
