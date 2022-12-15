/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../../test/required_props';
import { shouldRenderCustomStyles } from '../../../test/internal';

import { EuiForm } from '../form';
import { EuiRange } from './range';

const props = {
  value: '8',
  min: 0,
  max: 100,
};

describe('EuiRange', () => {
  shouldRenderCustomStyles(
    <EuiRange
      name="name"
      id="id"
      onChange={() => {}}
      {...props}
      {...requiredProps}
    />,
    { skipStyles: true } // style is in ...rest and is spread to a different location than className/css
  );

  test('is rendered', () => {
    const component = render(
      <EuiRange
        name="name"
        id="id"
        onChange={() => {}}
        {...props}
        {...requiredProps}
      />
    );

    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    test('disabled should render', () => {
      const component = render(<EuiRange {...props} disabled />);

      expect(component).toMatchSnapshot();
    });

    test('fullWidth should render', () => {
      const component = render(<EuiRange {...props} fullWidth />);

      expect(component).toMatchSnapshot();
    });

    test('compressed should render', () => {
      const component = render(<EuiRange {...props} compressed />);

      expect(component).toMatchSnapshot();
    });

    test('labels should render', () => {
      const component = render(<EuiRange {...props} showLabels />);

      expect(component).toMatchSnapshot();
    });

    test('ticks should render', () => {
      const component = render(
        <EuiRange {...props} showTicks tickInterval={20} />
      );

      expect(component).toMatchSnapshot();
    });

    test('custom ticks should render', () => {
      const component = render(
        <EuiRange
          {...props}
          showTicks
          ticks={[
            { label: '20kb', value: 20 },
            { label: '100kb', value: 100 },
          ]}
        />
      );

      expect(component).toMatchSnapshot();
    });

    test('range should render', () => {
      const component = render(<EuiRange {...props} showRange />);

      expect(component).toMatchSnapshot();
    });

    test('value should render', () => {
      const { value, ...localProps } = props;
      const component = render(
        <EuiRange
          value="200"
          showValue
          valuePrepend="before"
          valueAppend="after"
          {...localProps}
        />
      );

      expect(component).toMatchSnapshot();
    });

    test('input should render', () => {
      const component = render(
        <EuiRange
          name="name"
          id="id"
          onChange={() => {}}
          showInput
          {...props}
          {...requiredProps}
        />
      );

      expect(component).toMatchSnapshot();
    });

    test('slider should display in popover', () => {
      const component = render(
        <EuiRange
          name="name"
          id="id"
          onChange={() => {}}
          showInput="inputWithPopover"
          {...props}
          {...requiredProps}
        />
      );

      expect(component).toMatchSnapshot();
    });

    test('loading should display when showInput="inputWithPopover"', () => {
      const component = render(
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

      expect(component).toMatchSnapshot();
    });

    test('levels should render', () => {
      const component = render(
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

      expect(component).toMatchSnapshot();
    });
  });

  test('allows value prop to accept a number', () => {
    const { value, ...localProps } = props;
    const component = render(
      <EuiRange value={8} onChange={() => {}} showValue {...localProps} />
    );

    expect(component).toMatchSnapshot();
  });

  test('allows value prop to accept empty string', () => {
    const { value, ...localProps } = props;
    const component = render(
      <EuiRange value={''} onChange={() => {}} {...localProps} />
    );

    expect(component).toMatchSnapshot();
  });

  describe('inherits', () => {
    test('fullWidth from <EuiForm />', () => {
      const component = render(
        <EuiForm fullWidth>
          <EuiRange value={20} min={0} max={100} />
        </EuiForm>
      );

      expect(component).toMatchSnapshot();
    });
  });
});
