/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { requiredProps } from '../../../test/required_props';
import { render } from '../../../test/rtl';

import { EuiCheckboxGroup } from './checkbox_group';

jest.mock('./checkbox', () => ({
  EuiCheckbox: () => <div data-eui-checkbox="" />,
}));

const checkboxGroupRequiredProps = {
  options: [],
  idToSelectedMap: {},
  onChange: () => {},
};

describe('EuiCheckboxGroup (mocked checkbox)', () => {
  test('is rendered', () => {
    const { container } = render(
      <EuiCheckboxGroup {...checkboxGroupRequiredProps} {...requiredProps} />
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('options are rendered', () => {
    const { container } = render(
      <EuiCheckboxGroup
        {...checkboxGroupRequiredProps}
        options={[
          { id: '1', label: 'kibana' },
          { id: '2', label: 'elastic' },
        ]}
      />
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('idToSelectedMap is rendered', () => {
    const { container } = render(
      <EuiCheckboxGroup
        {...checkboxGroupRequiredProps}
        options={[
          { id: '1', label: 'kibana' },
          { id: '2', label: 'elastic' },
        ]}
        idToSelectedMap={{
          '1': true,
          '2': false,
        }}
      />
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('disabled is rendered', () => {
    const { container } = render(
      <EuiCheckboxGroup
        {...checkboxGroupRequiredProps}
        options={[
          { id: '1', label: 'kibana' },
          { id: '2', label: 'elastic' },
        ]}
        idToSelectedMap={{
          '1': true,
          '2': false,
        }}
        disabled
      />
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('individual disabled is rendered', () => {
    const { container } = render(
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

    expect(container.firstChild).toMatchSnapshot();
  });

  test('legend is rendered', () => {
    const { container } = render(
      <EuiCheckboxGroup
        {...checkboxGroupRequiredProps}
        legend={{
          children: 'A legend',
        }}
      />
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
