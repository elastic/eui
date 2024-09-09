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

import { EuiHue } from './hue';

const onChange = () => {
  /* empty */
};

describe('EuiHue', () => {
  shouldRenderCustomStyles(<EuiHue onChange={onChange} />, {
    skip: { style: true },
  });
  // `style` goes onto a different element than `className`s
  shouldRenderCustomStyles(<EuiHue onChange={onChange} />, {
    skip: { css: true, className: true },
    targetSelector: '.euiHue__range',
  });

  test('is rendered', () => {
    const { container } = render(
      <EuiHue onChange={onChange} {...requiredProps} />
    );

    expect(container).toMatchSnapshot();
  });

  test('accepts a hue value', () => {
    const { container } = render(
      <EuiHue hue={180} onChange={onChange} {...requiredProps} />
    );

    expect(container).toMatchSnapshot();
  });

  test('accepts a hex value', () => {
    const { container } = render(
      <EuiHue hue={180} hex="#00FFFF" onChange={onChange} {...requiredProps} />
    );

    expect(container).toMatchSnapshot();
  });
});
