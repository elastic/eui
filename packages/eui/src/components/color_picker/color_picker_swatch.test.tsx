/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { fireEvent } from '@testing-library/react';
import { requiredProps } from '../../test';
import { shouldRenderCustomStyles } from '../../test/internal';
import {
  render,
  waitForEuiToolTipHidden,
  waitForEuiToolTipVisible,
} from '../../test/rtl';

import { EuiColorPickerSwatch } from './color_picker_swatch';

describe('EuiColorPickerSwatch', () => {
  shouldRenderCustomStyles(<EuiColorPickerSwatch />);

  test('is rendered', () => {
    const { container } = render(<EuiColorPickerSwatch {...requiredProps} />);

    expect(container.firstChild).toMatchSnapshot();
  });

  describe('showToolTip', () => {
    test('it renders a color label tooltip on hover', async () => {
      const { getByTestSubject, getByText } = render(
        <EuiColorPickerSwatch
          {...requiredProps}
          color="#000000"
          data-test-subj="color-picker-swatch"
        />
      );

      const swatchElement = getByTestSubject('color-picker-swatch');

      fireEvent.mouseOver(swatchElement);

      await waitForEuiToolTipVisible();

      expect(getByText('#000000')).toBeInTheDocument();

      fireEvent.mouseLeave(swatchElement);

      await waitForEuiToolTipHidden();
    });

    test('it renders a color label tooltip on focus', async () => {
      const { getByTestSubject, getByText } = render(
        <EuiColorPickerSwatch
          {...requiredProps}
          color="#000000"
          data-test-subj="color-picker-swatch"
        />
      );

      const swatchElement = getByTestSubject('color-picker-swatch');

      fireEvent.focus(swatchElement);

      await waitForEuiToolTipVisible();

      expect(getByText('#000000')).toBeInTheDocument();

      fireEvent.blur(swatchElement);

      await waitForEuiToolTipHidden();
    });

    test('it does not render a color label tooltip when `showToolTip` is `false`', async () => {
      const { getByTestSubject } = render(
        <EuiColorPickerSwatch
          {...requiredProps}
          color="#000000"
          showToolTip={false}
          data-test-subj="color-picker-swatch"
        />
      );

      const swatchElement = getByTestSubject('color-picker-swatch');

      fireEvent.mouseOver(swatchElement);

      await waitForEuiToolTipHidden();

      fireEvent.focus(swatchElement);

      await waitForEuiToolTipHidden();
    });
  });
});
