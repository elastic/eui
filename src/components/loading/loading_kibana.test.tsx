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

import { EuiLoadingKibana, SIZES } from './loading_kibana';

describe('EuiLoadingKibana', () => {
  test('is rendered', () => {
    const component = render(<EuiLoadingKibana {...requiredProps} />);

    expect(component).toMatchSnapshot();
  });

  describe('size', () => {
    SIZES.forEach((size) => {
      test(`${size} is rendered`, () => {
        const component = render(<EuiLoadingKibana size={size} />);

        expect(component).toMatchSnapshot();
      });
    });
  });
});
