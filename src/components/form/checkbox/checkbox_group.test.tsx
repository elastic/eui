import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../../test/required_props';

import { EuiCheckboxGroup } from './checkbox_group';

jest.mock('./checkbox', () => ({ EuiCheckbox: 'eui_checkbox' }));

const checkboxGroupRequiredProps = {
  options: [],
  idToSelectedMap: {},
  onChange: () => {},
};

describe('EuiCheckboxGroup (mocked checkbox)', () => {
  test('is rendered', () => {
    const component = render(
      <EuiCheckboxGroup
        onChange={() => {}}
        {...checkboxGroupRequiredProps}
        {...requiredProps}
      />
    );

    expect(component).toMatchSnapshot();
  });

  test('options are rendered', () => {
    const component = render(
      <EuiCheckboxGroup
        {...checkboxGroupRequiredProps}
        options={[{ id: '1', label: 'kibana' }, { id: '2', label: 'elastic' }]}
      />
    );

    expect(component).toMatchSnapshot();
  });

  test('idToSelectedMap is rendered', () => {
    const component = render(
      <EuiCheckboxGroup
        {...checkboxGroupRequiredProps}
        options={[{ id: '1', label: 'kibana' }, { id: '2', label: 'elastic' }]}
        idToSelectedMap={{
          '1': true,
          '2': false,
        }}
      />
    );

    expect(component).toMatchSnapshot();
  });

  test('disabled is rendered', () => {
    const component = render(
      <EuiCheckboxGroup
        {...checkboxGroupRequiredProps}
        options={[{ id: '1', label: 'kibana' }, { id: '2', label: 'elastic' }]}
        idToSelectedMap={{
          '1': true,
          '2': false,
        }}
        disabled
      />
    );

    expect(component).toMatchSnapshot();
  });

  test('individual disabled is rendered', () => {
    const component = render(
      <EuiCheckboxGroup
        {...checkboxGroupRequiredProps}
        options={[
          { id: '1', label: 'kibana', disabled: true },
          { id: '2', label: 'elastic' },
        ]}
        idToSelectedMap={{
          '1': true,
          '2': false,
        }}
      />
    );

    expect(component).toMatchSnapshot();
  });

  test('legend is rendered', () => {
    const component = render(
      <EuiCheckboxGroup
        {...checkboxGroupRequiredProps}
        legend={{
          children: 'A legend',
        }}
      />
    );

    expect(component).toMatchSnapshot();
  });
});
