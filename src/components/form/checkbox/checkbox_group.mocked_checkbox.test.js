import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../../test/required_props';

import { EuiCheckboxGroup } from './checkbox_group';

jest.mock('./checkbox', () => ({ EuiCheckbox: 'eui_checkbox' }));

describe('EuiCheckboxGroupMockedCheckbox', () => {
  test('is rendered', () => {
    const component = render(
      <EuiCheckboxGroup onChange={() => {}} {...requiredProps} id="foobar" />
    );

    expect(component)
      .toMatchSnapshot();
  });

  test('options are rendered', () => {
    const component = render(
      <EuiCheckboxGroup
        options={[
          { id: '1', label: 'kibana', disabled: false },
          { id: '2', label: 'elastic', disabled: true },
        ]}
        onChange={() => {}}
      />
    );

    expect(component)
      .toMatchSnapshot();
  });

  test('idToSelectedMap is rendered', () => {
    const component = render(
      <EuiCheckboxGroup
        options={[
          { id: '1', label: 'kibana', disabled: false },
          { id: '2', label: 'elastic', disabled: true },
        ]}
        idToSelectedMap={{
          '1': true,
          '2': false,
        }}
        onChange={() => {}}
      />
    );

    expect(component)
      .toMatchSnapshot();
  });
});
