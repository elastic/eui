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

import { EuiSaturation } from './saturation';
import { fireEvent } from '@testing-library/react';

const onChange = () => {
  /* empty */
};

describe('EuiSaturation', () => {
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

  test('it renders a color label tooltip on hover', async () => {
    const { getByText } = render(
      <EuiSaturation onChange={onChange} {...requiredProps} hex="#000000" />
    );

    const thumbElement = document.querySelector('.euiSaturation__indicator')!;

    fireEvent.mouseOver(thumbElement);

    await waitForEuiToolTipVisible();

    expect(getByText('#000000')).toBeInTheDocument();

    fireEvent.mouseLeave(thumbElement);

    await waitForEuiToolTipHidden();
  });

  test('it renders a color label tooltip on focus', async () => {
    const { getByText } = render(
      <EuiSaturation onChange={onChange} {...requiredProps} hex="#000000" />
    );

    const thumbElement = document.querySelector('.euiSaturation__indicator')!;

    fireEvent.focus(thumbElement);

    await waitForEuiToolTipVisible();

    expect(getByText('#000000')).toBeInTheDocument();

    fireEvent.blur(thumbElement);

    await waitForEuiToolTipHidden();
  });
});
