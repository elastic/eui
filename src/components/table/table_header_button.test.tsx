/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import { EuiTableHeaderButton } from './table_header_button';

describe('EuiTableHeaderButton', () => {
  test('is rendered', () => {
    const component = render(<EuiTableHeaderButton {...requiredProps} />);

    expect(component).toMatchSnapshot();
  });
});
