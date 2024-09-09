/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the "Elastic License
 * 2.0", the "GNU Affero General Public License v3.0 only", and the "Server Side
 * Public License v 1"; you may not use this file except in compliance with, at
 * your election, the "Elastic License 2.0", the "GNU Affero General Public
 * License v3.0 only", or the "Server Side Public License, v 1".
 */

import React from 'react';
import { requiredProps } from '../../test/required_props';
import { shouldRenderCustomStyles } from '../../test/internal';
import { render } from '../../test/rtl';

import { EuiSaturation } from './saturation';

const onChange = () => {
  /* empty */
};

describe('EuiHue', () => {
  shouldRenderCustomStyles(<EuiSaturation onChange={onChange} />);

  test('is rendered', () => {
    const { container } = render(
      <EuiSaturation onChange={onChange} {...requiredProps} />
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('accepts a color', () => {
    const { container } = render(
      <EuiSaturation
        color={[180, 1, 0.5]}
        onChange={onChange}
        {...requiredProps}
      />
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
