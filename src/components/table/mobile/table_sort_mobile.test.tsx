/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../../test';

import { EuiTableSortMobile } from './table_sort_mobile';

describe('EuiTableSortMobile', () => {
  test('is rendered', () => {
    const component = render(<EuiTableSortMobile {...requiredProps} />);

    expect(component).toMatchSnapshot();
  });
});
