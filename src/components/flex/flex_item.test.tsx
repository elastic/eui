/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { render } from 'enzyme';
import {
  requiredProps,
  startThrowingReactWarnings,
  stopThrowingReactWarnings,
} from '../../test';

import { EuiFlexItem, GROW_SIZES } from './flex_item';

beforeAll(startThrowingReactWarnings);
afterAll(stopThrowingReactWarnings);

describe('EuiFlexItem', () => {
  test('is rendered', () => {
    const component = render(<EuiFlexItem {...requiredProps} />);

    expect(component).toMatchSnapshot();
  });

  describe('grow', () => {
    GROW_SIZES.concat([true, false]).forEach((value) => {
      test(`${value} is rendered`, () => {
        const component = render(<EuiFlexItem grow={value} />);

        expect(component).toMatchSnapshot();
      });
    });
  });
});
