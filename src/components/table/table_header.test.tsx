/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import { EuiTableHeader } from './table_header';

describe('EuiTableHeader', () => {
  test('is rendered', () => {
    const component = (
      <EuiTableHeader {...requiredProps}>
        <td>children</td>
      </EuiTableHeader>
    );
    expect(render(component)).toMatchSnapshot();
  });

  test('is rendered without <tr>', () => {
    const component = (
      <EuiTableHeader wrapWithTableRow={false}>
        <tr>
          <td>children</td>
        </tr>
      </EuiTableHeader>
    );
    expect(render(component)).toMatchSnapshot();
  });
});
