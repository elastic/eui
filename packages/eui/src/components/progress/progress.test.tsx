/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { shouldRenderCustomStyles } from '../../test/internal';
import { requiredProps } from '../../test/required_props';
import { render } from '../../test/rtl';

import { EuiProgress, COLORS, SIZES } from './progress';

describe('EuiProgress', () => {
  test('is rendered', () => {
    const { container } = render(<EuiProgress {...requiredProps} />);

    expect(container.firstChild).toMatchSnapshot();
  });

  shouldRenderCustomStyles(<EuiProgress />);
  shouldRenderCustomStyles(<EuiProgress max={100} label="Test" />, {
    childProps: ['labelProps'],
    skip: { parentTest: true },
  });

  test('has max', () => {
    const { container } = render(<EuiProgress max={100} {...requiredProps} />);

    expect(container.firstChild).toMatchSnapshot();
  });

  test('has value', () => {
    const { container } = render(
      <EuiProgress value={100} {...requiredProps} />
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('is determinate', () => {
    const val = 50;
    const { container } = render(
      <EuiProgress max={val ? 100 : undefined} value={val} {...requiredProps} />
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('is indeterminate', () => {
    const val = undefined;
    const { container } = render(
      <EuiProgress max={val ? 100 : undefined} value={val} {...requiredProps} />
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('has valueText and label', () => {
    const { container } = render(
      <EuiProgress
        valueText="150"
        label="Label"
        value={50}
        max={100}
        {...requiredProps}
      />
    );

    expect(container).toMatchSnapshot();
  });

  test('valueText is true', () => {
    const { container } = render(
      <EuiProgress valueText={true} value={50} max={100} {...requiredProps} />
    );

    expect(container).toMatchSnapshot();
  });

  test('handles node in label', () => {
    const { container, getByTestSubject } = render(
      <EuiProgress
        label={<span data-test-subj="progress-label">Label text</span>}
        valueText={true}
        value={50}
        max={100}
        {...requiredProps}
      />
    );

    const labelElement = getByTestSubject('progress-label');
    expect(labelElement).toBeInTheDocument();
    expect(labelElement).toHaveTextContent('Label text');
    expect(container.querySelector('[aria-live]')).toHaveTextContent(
      'Label text'
    );
  });

  test('has screen reader only output', () => {
    const { container } = render(
      <EuiProgress
        label={<span>Label text</span>}
        valueText={true}
        value={50}
        max={100}
        {...requiredProps}
      />
    );

    expect(container.querySelector('[aria-live]')?.innerHTML).toBe(
      '<span>Label text 50%</span>'
    );
  });

  test('has labelProps', () => {
    const { container } = render(
      <EuiProgress
        max={100}
        value={50}
        labelProps={{ title: 'Custom title' }}
        valueText="150"
        {...requiredProps}
      />
    );

    expect(container).toMatchSnapshot();
  });

  describe('color', () => {
    [...COLORS, 'rgb(136, 85, 34)'].forEach((color) => {
      test(`${color} is rendered`, () => {
        const { container } = render(<EuiProgress color={color} />);

        expect(container.firstChild).toMatchSnapshot();
      });
    });

    describe('gradient', () => {
      const gradient =
        'linear-gradient(90deg, #00BFB3, #FEC514, #BD271E)';

      test('determinate progress renders a gradient color', () => {
        const { container } = render(
          <EuiProgress color={gradient} value={50} max={100} />
        );

        const progress = container.querySelector('progress');
        expect(progress).toBeInTheDocument();
        // Gradients are applied via background-image on pseudo-elements,
        // so no inline `color` style should be set (that path is for solid
        // custom colors that flow through `currentColor`).
        expect(progress?.getAttribute('style') ?? '').not.toContain('color');
        // The gradient style branch (not customColor) should be applied.
        expect(progress?.getAttribute('class') ?? '').toContain(
          'euiProgressGradientStyles'
        );
        expect(progress?.getAttribute('class') ?? '').not.toContain(
          'customColor'
        );
        expect(progress).toMatchSnapshot();
      });

      test('indeterminate progress renders a gradient color', () => {
        const { container } = render(<EuiProgress color={gradient} />);

        const indeterminate = container.querySelector('div.euiProgress');
        expect(indeterminate).toBeInTheDocument();
        expect(indeterminate?.getAttribute('style') ?? '').not.toContain(
          'color'
        );
        expect(indeterminate?.getAttribute('class') ?? '').toContain(
          'euiProgressGradientStyles'
        );
        expect(indeterminate?.getAttribute('class') ?? '').not.toContain(
          'customColor'
        );
        expect(indeterminate).toMatchSnapshot();
      });

      test('does not derive a custom text color from a gradient', () => {
        const { container } = render(
          <EuiProgress
            color={gradient}
            value={50}
            max={100}
            valueText="50%"
          />
        );

        const valueText = container.querySelector('.euiProgress__valueText');
        expect(valueText).toBeInTheDocument();
        // makeHighContrastColor would throw on a gradient string; guarding
        // against that means no inline color style here either.
        expect(valueText?.getAttribute('style') ?? '').not.toContain('color');
      });
    });
  });

  describe('size', () => {
    SIZES.forEach((size) => {
      test(`${size} is rendered`, () => {
        const { container } = render(<EuiProgress size={size} />);

        expect(container.firstChild).toMatchSnapshot();
      });
    });
  });
});
