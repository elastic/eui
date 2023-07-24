/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import {
  requiredProps,
  startThrowingReactWarnings,
  stopThrowingReactWarnings,
} from '../../test';
import { shouldRenderCustomStyles } from '../../test/internal';
import { render } from '../../test/rtl';

import { EuiFlexItem, VALID_GROW_VALUES } from './flex_item';

beforeAll(startThrowingReactWarnings);
afterAll(stopThrowingReactWarnings);

describe('EuiFlexItem', () => {
  shouldRenderCustomStyles(<EuiFlexItem />);

  test('is rendered', () => {
    const { container } = render(<EuiFlexItem {...requiredProps} />);

    expect(container.firstChild).toMatchSnapshot();
  });

  test('component', () => {
    const { container } = render(<EuiFlexItem component="span" />);

    expect(container.firstChild).toMatchSnapshot();
  });

  describe('grow', () => {
    VALID_GROW_VALUES.forEach((value) => {
      test(`${value} is rendered`, () => {
        const { container } = render(<EuiFlexItem grow={value} />);

        expect(container.firstChild).toMatchSnapshot();
      });
    });
  });
});
