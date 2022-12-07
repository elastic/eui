/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { useEffect, useRef } from 'react';
import { render, mount } from 'enzyme';
import { requiredProps } from '../../../test/required_props';
import { shouldRenderCustomStyles } from '../../../test/internal';

import { EuiForm } from '../form';
import type { EuiDualRangeProps } from './types';
import { EuiDualRange, EuiDualRangeClass } from './dual_range';

const props = {
  min: 0,
  max: 100,
  value: ['1', '8'] as EuiDualRangeProps['value'],
  onChange: () => {},
};

describe('EuiDualRange', () => {
  shouldRenderCustomStyles(
    <EuiDualRange name="name" id="id" {...props} {...requiredProps} />,
    { skipStyles: true } // style is in ...rest and is spread to a different location than className/css
  );

  test('is rendered', () => {
    const component = render(
      <EuiDualRange name="name" id="id" {...props} {...requiredProps} />
    );

    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    test('disabled should render', () => {
      const component = render(<EuiDualRange {...props} disabled />);

      expect(component).toMatchSnapshot();
    });

    test('fullWidth should render', () => {
      const component = render(<EuiDualRange {...props} fullWidth />);

      expect(component).toMatchSnapshot();
    });

    test('compressed should render', () => {
      const component = render(<EuiDualRange {...props} compressed />);

      expect(component).toMatchSnapshot();
    });

    test('labels should render', () => {
      const component = render(<EuiDualRange {...props} showLabels />);

      expect(component).toMatchSnapshot();
    });

    test('ticks should render', () => {
      const component = render(
        <EuiDualRange {...props} showTicks tickInterval={20} />
      );

      expect(component).toMatchSnapshot();
    });

    test('custom ticks should render', () => {
      const component = render(
        <EuiDualRange
          {...props}
          value={[20, 100]}
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
      const component = render(<EuiDualRange {...props} showRange />);

      expect(component).toMatchSnapshot();
    });

    test('inputs should render', () => {
      const component = render(
        <EuiDualRange
          {...props}
          {...requiredProps}
          name="name"
          id="id"
          showInput
        />
      );

      expect(component).toMatchSnapshot();
    });

    test('slider should display in popover', () => {
      const component = render(
        <EuiDualRange
          {...props}
          name="name"
          id="id"
          showInput="inputWithPopover"
        />
      );

      expect(component).toMatchSnapshot();
    });

    test('loading should display when showInput="inputWithPopover"', () => {
      const component = render(
        <EuiDualRange
          {...props}
          name="name"
          id="id"
          showInput="inputWithPopover"
          isLoading
        />
      );

      expect(component).toMatchSnapshot();
    });

    test('levels should render', () => {
      const component = render(
        <EuiDualRange
          {...props}
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
        />
      );

      expect(component).toMatchSnapshot();
    });

    test('isDraggable should render', () => {
      const component = render(<EuiDualRange {...props} isDraggable />);

      expect(component).toMatchSnapshot();
    });
  });

  test('allows value prop to accept numbers', () => {
    const component = render(<EuiDualRange {...props} value={[1, 8]} />);

    expect(component).toMatchSnapshot();
  });

  test('allows value prop to accept empty strings', () => {
    const component = render(<EuiDualRange {...props} value={['', '']} />);

    expect(component).toMatchSnapshot();
  });

  describe('input props', () => {
    test('can be applied to min and max inputs', () => {
      const component = render(
        <EuiDualRange
          {...props}
          name="name"
          id="id"
          min={1}
          max={10}
          showInput
          minInputProps={{ 'aria-label': 'Min value' }}
          maxInputProps={{ 'aria-label': 'Max value' }}
        />
      );

      expect(component).toMatchSnapshot();
    });
  });

  describe('inherits', () => {
    test('fullWidth from <EuiForm />', () => {
      const component = render(
        <EuiForm fullWidth>
          <EuiDualRange {...props} />
        </EuiForm>
      );

      if (
        !component.find('.euiRangeWrapper').attr('class').includes('-fullWidth')
      ) {
        throw new Error(
          'expected EuiDualRange to inherit fullWidth from EuiForm'
        );
      }
    });
  });

  describe('ref methods', () => {
    // Whether we like it or not, at least 2 Kibana instances are using EuiDualRange
    // `ref`s to access the `onResize` instance method (search for `rangeRef.current?.onResize`)
    // If we switch EuiDualRange to a function component, we'll need to use `useImperativeHandle`
    // to allow Kibana to continue calling `onResize`
    test('onResize', () => {
      // This super annoying type is now required to pass both the `ref` typing and account for instance methods
      type EuiDualRangeRef = React.ComponentProps<typeof EuiDualRange> &
        EuiDualRangeClass;

      const ConsumerDualRange = ({ callResize }: { callResize?: boolean }) => {
        const rangeRef = useRef<EuiDualRangeRef>(null);

        useEffect(() => {
          if (callResize) rangeRef.current?.onResize(500);
        }, [callResize]);

        return <EuiDualRange {...props} ref={rangeRef} />;
      };

      const component = mount(<ConsumerDualRange />);
      const instance = component
        .find(EuiDualRangeClass)
        .instance() as EuiDualRangeClass;

      const onResizeSpy = jest.spyOn(instance, 'onResize');
      component.setProps({ callResize: true }).update();
      expect(onResizeSpy).toHaveBeenCalled();
    });
  });
});
