/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { render } from '../../../test/rtl';
import { shouldRenderCustomStyles } from '../../../test/internal';

import { EuiRangeInput } from './range_input';

const requiredProps = {
  min: 0,
  max: 100,
  value: 0,
  onChange: () => {},
};

describe('EuiRangeInput', () => {
  shouldRenderCustomStyles(<EuiRangeInput {...requiredProps} />);

  it('renders', () => {
    const { container } = render(<EuiRangeInput {...requiredProps} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  describe('widthStyle', () => {
    it('does not set a width style if the `autoSize` is set to false', () => {
      const { container } = render(
        <EuiRangeInput {...requiredProps} autoSize={false} />
      );
      const widthStyle = container
        .querySelector('.euiRangeInput')
        ?.getAttribute('style');

      expect(widthStyle).toBeFalsy();
    });

    it('increases input character width dynamically based on value', () => {
      const { rerender, container } = render(
        <EuiRangeInput {...requiredProps} value="0" />
      );
      const getWidthStyle = () =>
        container.querySelector('.euiRangeInput')?.getAttribute('style');

      expect(getWidthStyle()).toMatchInlineSnapshot(
        '"inline-size: calc(12px + 1ch + 2em + 0px);"'
      );

      rerender(<EuiRangeInput {...requiredProps} value="10" />);
      expect(getWidthStyle()).toMatchInlineSnapshot(
        '"inline-size: calc(12px + 2ch + 2em + 0px);"'
      );

      rerender(<EuiRangeInput {...requiredProps} value="100" />);
      expect(getWidthStyle()).toMatchInlineSnapshot(
        '"inline-size: calc(12px + 3ch + 2em + 0px);"'
      );

      rerender(<EuiRangeInput {...requiredProps} value="1000" />);
      expect(getWidthStyle()).toMatchInlineSnapshot(
        '"inline-size: calc(12px + 4ch + 2em + 22px);"'
      );

      // Should not go above 4 characters in width
      rerender(<EuiRangeInput {...requiredProps} value="10000" />);
      expect(getWidthStyle()).toMatchInlineSnapshot(
        '"inline-size: calc(12px + 4ch + 2em + 22px);"'
      );
    });

    test('compressed', () => {
      const { container } = render(
        <EuiRangeInput {...requiredProps} compressed />
      );
      const widthStyle = container
        .querySelector('.euiRangeInput')
        ?.getAttribute('style');

      expect(widthStyle).toMatchInlineSnapshot(
        '"inline-size: calc(8px + 1ch + 2em + 0px);"'
      );
    });

    test('invalid', () => {
      const { container } = render(
        <EuiRangeInput {...requiredProps} isInvalid />
      );
      const widthStyle = container
        .querySelector('.euiRangeInput')
        ?.getAttribute('style');

      expect(widthStyle).toMatchInlineSnapshot(
        '"inline-size: calc(12px + 1ch + 2em + 22px);"'
      );
    });

    test('invalid + compressed', () => {
      const { container } = render(
        <EuiRangeInput {...requiredProps} isInvalid compressed />
      );
      const widthStyle = container
        .querySelector('.euiRangeInput')
        ?.getAttribute('style');

      expect(widthStyle).toMatchInlineSnapshot(
        '"inline-size: calc(8px + 1ch + 2em + 18px);"'
      );
    });
  });
});
