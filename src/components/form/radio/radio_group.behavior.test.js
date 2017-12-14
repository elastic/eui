import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';

import { EuiRadioGroup } from './radio_group';

// This exists because we need to run the following tests
// without mocking the Radio component, such as testing
// an interaction that is handled by the Radio component.
describe('EuiRadioGroup behavior', () => {
  test('id is bound to onChange', () => {
    const onChangeHandler = sinon.stub();
    const component = mount(
      <EuiRadioGroup
        options={[
          { id: '1', label: 'Option #1' },
        ]}
        idSelected="1"
        onChange={onChangeHandler}
      />
    );

    component.find('input[type="radio"]').simulate('change');
    sinon.assert.calledWith(onChangeHandler, '1');
  });
});
