/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { shouldRenderCustomStyles } from '../../../test/internal';
import { requiredProps } from '../../../test/required_props';
import { render } from '../../../test/rtl';

import { EuiForm } from '../form';
import { EuiRange } from './range';

const props = {
  value: '8',
  min: 0,
  max: 100,
};

describe('EuiRange', () => {
  shouldRenderCustomStyles(<EuiRange {...props} {...requiredProps} />, {
    skip: { style: true },
  });
  // style is in ...rest and is spread to a different location than className/css
  shouldRenderCustomStyles(<EuiRange {...props} {...requiredProps} />, {
    targetSelector: '.euiRangeSlider',
    skip: { className: true, css: true },
  });

  test('is rendered', () => {
    const { container } = render(
      <EuiRange
        name="name"
        id="id"
        onChange={() => {}}
        {...props}
        {...requiredProps}
      />
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  describe('props', () => {
    test('disabled should render', () => {
      const { container } = render(<EuiRange {...props} disabled />);

      expect(container.firstChild).toMatchSnapshot();
    });

    test('fullWidth should render', () => {
      const { container } = render(<EuiRange {...props} fullWidth />);

      expect(container.firstChild).toMatchSnapshot();
    });

    test('compressed should render', () => {
      const { container } = render(<EuiRange {...props} compressed />);

      expect(container.firstChild).toMatchSnapshot();
    });

    test('labels should render', () => {
      const { container } = render(<EuiRange {...props} showLabels />);

      expect(container.firstChild).toMatchSnapshot();
    });

    test('ticks should render', () => {
      const { container } = render(
        <EuiRange {...props} showTicks tickInterval={20} />
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    test('custom ticks should render', () => {
      const { container } = render(
        <EuiRange
          {...props}
          showTicks
          ticks={[
            { label: '20kb', value: 20 },
            { label: '100kb', value: 100 },
          ]}
        />
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    test('range should render', () => {
      const { container } = render(<EuiRange {...props} showRange />);

      expect(container.firstChild).toMatchSnapshot();
    });

    test('value should render', () => {
      const { value, ...localProps } = props;
      const { container } = render(
        <EuiRange
          value="200"
          showValue
          valuePrepend="before"
          valueAppend="after"
          {...localProps}
        />
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    test('input should render', () => {
      const { container } = render(
        <EuiRange
          name="name"
          id="id"
          onChange={() => {}}
          showInput
          {...props}
          {...requiredProps}
        />
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    test('slider should display in popover', () => {
      const { container } = render(
        <EuiRange
          name="name"
          id="id"
          onChange={() => {}}
          showInput="inputWithPopover"
          {...props}
          {...requiredProps}
        />
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    test('loading should display when showInput="inputWithPopover"', () => {
      const { container } = render(
        <EuiRange
          name="name"
          id="id"
          onChange={() => {}}
          showInput="inputWithPopover"
          isLoading
          {...props}
          {...requiredProps}
        />
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    test('levels should render', () => {
      const { container } = render(
        <EuiRange
          levels={[
            {
              min: 0,
              max: 20,
              color: 'danger',
            },
            {
              min: 20,
              max: 100,
              color: 'success',
            },
          ]}
          value={20}
          min={0}
          max={100}
        />
      );

      expect(container.firstChild).toMatchSnapshot();
    });
  });

  test('allows value prop to accept a number', () => {
    const { value, ...localProps } = props;
    const { container } = render(
      <EuiRange value={8} onChange={() => {}} showValue {...localProps} />
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('allows value prop to accept empty string', () => {
    const { value, ...localProps } = props;
    const { container } = render(
      <EuiRange value={''} onChange={() => {}} {...localProps} />
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  describe('inherits', () => {
    test('fullWidth from <EuiForm />', () => {
      const { container } = render(
        <EuiForm fullWidth>
          <EuiRange value={20} min={0} max={100} />
        </EuiForm>
      );

      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
