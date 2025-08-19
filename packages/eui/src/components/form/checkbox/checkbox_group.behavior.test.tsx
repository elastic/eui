/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { fireEvent } from '@testing-library/react';
import { render } from '../../../test/rtl';

import { EuiCheckboxGroup } from './checkbox_group';

// This exists because we need to run the following tests
// without mocking the Checkbox component, such as testing
// an interaction that is handled by the Checkbox component.
describe('EuiCheckboxGroup behavior', () => {
  test('id is bound to onChange', () => {
    const onChangeHandler = jest.fn();
    const { getByRole } = render(
      <EuiCheckboxGroup
        options={[{ id: '1', label: 'kibana', disabled: false }]}
        idToSelectedMap={{
          '1': true,
        }}
        onChange={onChangeHandler}
      />
    );

    fireEvent.click(getByRole('checkbox'));
    expect(onChangeHandler).toHaveBeenCalledTimes(1);
    expect(onChangeHandler).toHaveBeenCalledWith(
      '1',
      expect.anything() // SyntheticBaseEvent
    );
  });
});
