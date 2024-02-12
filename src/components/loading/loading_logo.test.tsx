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

import { EuiLoadingLogo, SIZES } from './loading_logo';

describe('EuiLoadingLogo', () => {
  test('is rendered', () => {
    const { container } = render(<EuiLoadingLogo {...requiredProps} />);

    expect(container.firstChild).toMatchSnapshot();
  });

  test('logo is rendered', () => {
    const { container } = render(
      <EuiLoadingLogo logo="logoElastic" {...requiredProps} />
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  describe('size', () => {
    SIZES.forEach((size) => {
      test(`${size} is rendered`, () => {
        const { container } = render(<EuiLoadingLogo size={size} />);

        expect(container.firstChild).toMatchSnapshot();
      });
    });
  });
});
