/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { requiredProps } from '../../test/required_props';
import { render } from '../../test/rtl';

import { EuiLoadingSpinner, SIZES } from './loading_spinner';

describe('EuiLoadingSpinner', () => {
  test('is rendered', () => {
    const { container } = render(<EuiLoadingSpinner {...requiredProps} />);

    expect(container.firstChild).toMatchSnapshot();
  });

  describe('size', () => {
    SIZES.forEach((size) => {
      test(`${size} is rendered`, () => {
        const { container } = render(<EuiLoadingSpinner size={size} />);

        expect(container.firstChild).toMatchSnapshot();
      });
    });
  });

  test('custom colors', () => {
    const { container } = render(
      <>
        <EuiLoadingSpinner color={{ border: 'white' }} />
        <EuiLoadingSpinner color={{ highlight: 'black' }} />
        <EuiLoadingSpinner
          color={{ border: 'white', highlight: 'black' }}
          style={{ color: 'red' }} // Should merge together
        />
      </>
    );

    expect(container).toMatchSnapshot();
  });
});
