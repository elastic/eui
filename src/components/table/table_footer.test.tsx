/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { render } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import { EuiTableFooter } from './table_footer';

describe('EuiTableFooter', () => {
  test('is rendered', () => {
    const component = render(
      <EuiTableFooter {...requiredProps}>children</EuiTableFooter>
    );

    expect(component).toMatchSnapshot();
  });
});
