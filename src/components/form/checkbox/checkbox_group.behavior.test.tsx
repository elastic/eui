import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';

import { EuiCheckboxGroup } from './checkbox_group';

// This exists because we need to run the following tests
// without mocking the Checkbox component, such as testing
// an interaction that is handled by the Checkbox component.
describe('EuiCheckboxGroup behavior', () => {
  test('id is bound to onChange', () => {
    const onChangeHandler = sinon.stub();
    const component = mount(
      <EuiCheckboxGroup
        options={[{ id: '1', label: 'kibana', disabled: false }]}
        idToSelectedMap={{
          '1': true,
        }}
        onChange={onChangeHandler}
      />
    );

    component.find('input[type="checkbox"]').simulate('change');
    sinon.assert.calledWith(onChangeHandler, '1');
  });
});
