/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { requiredProps } from '../../test/required_props';
import { shouldRenderCustomStyles } from '../../test/internal';
import {
  render,
  waitForEuiToolTipHidden,
  waitForEuiToolTipVisible,
} from '../../test/rtl';

import { EuiHue } from './hue';
import { fireEvent } from '@testing-library/react';

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

  test('it renders a color label tooltip on hover', async () => {
    const { getByText } = render(
      <EuiHue hue={180} hex="#00FFFF" onChange={onChange} {...requiredProps} />
    );

    const thumbElement = document.querySelector('.euiHue__range')!;

    fireEvent.mouseOver(thumbElement);

    await waitForEuiToolTipVisible();

    expect(getByText('#00FFFF')).toBeInTheDocument();

    fireEvent.mouseLeave(thumbElement);

    await waitForEuiToolTipHidden();
  });

  test('it renders a color label tooltip on focus', async () => {
    const { getByText } = render(
      <EuiHue hue={180} hex="#00FFFF" onChange={onChange} {...requiredProps} />
    );

    const thumbElement = document.querySelector('.euiHue__range')!;

    fireEvent.focus(thumbElement);

    await waitForEuiToolTipVisible();

    expect(getByText('#00FFFF')).toBeInTheDocument();

    fireEvent.blur(thumbElement);

    await waitForEuiToolTipHidden();
  });
});
