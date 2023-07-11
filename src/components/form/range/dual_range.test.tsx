/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { useEffect, useRef } from 'react';
import { fireEvent } from '@testing-library/dom';
import { requiredProps } from '../../../test';
import { shouldRenderCustomStyles } from '../../../test/internal';
import { render, screen } from '../../../test/rtl';

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
  shouldRenderCustomStyles(<EuiDualRange {...props} {...requiredProps} />, {
    skip: { style: true },
  });
  // style is in ...rest and is spread to a different location than className/css
  shouldRenderCustomStyles(<EuiDualRange {...props} {...requiredProps} />, {
    targetSelector: '.euiRangeSlider',
    skip: { className: true, css: true },
  });

  it('renders', () => {
    const { container } = render(
      <EuiDualRange name="name" id="id" {...props} {...requiredProps} />
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  describe('props', () => {
    describe('disabled', () => {
      it('renders slider role elements as interactive when disabled=false', () => {
        render(<EuiDualRange {...props} disabled={false} />);

        screen.getAllByRole('slider', { hidden: true }).forEach((element) => {
          if (element.tagName.toLowerCase() === 'input') {
            expect(element).not.toBeDisabled();
          } else {
            expect(element).toHaveAttribute('aria-disabled', 'false');
          }
        });
      });

      it('renders slider role elements as disabled when disabled=true', () => {
        render(<EuiDualRange {...props} disabled />);

        screen.getAllByRole('slider', { hidden: true }).forEach((element) => {
          if (element.tagName.toLowerCase() === 'input') {
            expect(element).toBeDisabled();
          } else {
            expect(element).toHaveAttribute('aria-disabled', 'true');
          }
        });
      });
    });

    describe('fullWidth', () => {
      it('renders using full-width layout when fullWidth=true', () => {
        const { container } = render(<EuiDualRange {...props} fullWidth />);

        expect(container.firstChild).toHaveStyleRule('max-inline-size', '100%');
      });

      it('inherits fullWidth from EuiForm', () => {
        const { container } = render(
          <EuiForm fullWidth>
            <EuiDualRange {...props} />
          </EuiForm>
        );

        expect(container.firstChild!.firstChild).toHaveStyleRule(
          'max-inline-size',
          '100%'
        );
      });
    });

    describe('compressed', () => {
      it('renders using compressed layout when compressed=true', () => {
        const { container } = render(<EuiDualRange {...props} compressed />);

        // TODO: Rule value should be extracted from the default theme
        expect(container.firstChild).toHaveStyleRule('block-size', '32px');
      });
    });

    describe('showLabels', () => {
      it('renders labels when showLabels=true', () => {
        const { container } = render(<EuiDualRange {...props} showLabels />);

        expect(container.firstChild).toMatchSnapshot();
      });
    });

    describe('showTicks', () => {
      it('renders ticks configured by tickInterval prop when showTicks=true', () => {
        render(<EuiDualRange {...props} showTicks tickInterval={20} />);

        const expectedTicks = ['0', '20', '40', '60', '80', '100'];
        const ticks = screen.getAllByRole('button');
        expect(ticks).toHaveLength(expectedTicks.length);
        ticks.forEach((element) => {
          expect(expectedTicks).toContain((element as HTMLButtonElement).value);
        });
      });

      it('renders ticks based the "ticks"s prop when showTicks=true', () => {
        const ticks = [
          { label: '20kb', value: 20 },
          { label: '100kb', value: 100 },
        ];

        const tickValues = ticks.map((tick) => tick.value.toString());

        render(
          <EuiDualRange {...props} value={[20, 100]} showTicks ticks={ticks} />
        );

        const tickElements = screen.getAllByRole('button');
        expect(tickElements).toHaveLength(ticks.length);
        tickElements.forEach((element) => {
          expect(tickValues).toContain((element as HTMLButtonElement).value);
        });
      });
    });

    describe('showRange', () => {
      it('renders range when showRange=true', () => {
        const { container } = render(<EuiDualRange {...props} showRange />);

        expect(container.firstChild).toMatchSnapshot();
      });

      it('hides range when showRange=false', () => {
        const { container } = render(
          <EuiDualRange {...props} showRange={false} />
        );

        expect(container.firstChild).toMatchSnapshot();
      });
    });

    describe('showInput', () => {
      it('renders inputs when showInput=true', () => {
        render(
          <EuiDualRange
            {...props}
            {...requiredProps}
            name="name"
            id="id"
            showInput
            minInputProps={{ 'aria-label': 'Min value' }}
            maxInputProps={{ 'aria-label': 'Max value' }}
          />
        );

        expect(
          screen.getByRole('spinbutton', { name: 'Min value' })
        ).toHaveValue(1);
        expect(
          screen.getByRole('spinbutton', { name: 'Max value' })
        ).toHaveValue(8);
      });

      it('renders inputs with popover slider when showInput="inputWithPopover"', () => {
        render(
          <EuiDualRange
            {...props}
            name="name"
            id="id"
            showInput="inputWithPopover"
            minInputProps={{ 'aria-label': 'Min value' }}
          />
        );

        expect(screen.getAllByRole('spinbutton')).toHaveLength(2);

        fireEvent.focusIn(
          screen.getByRole('spinbutton', { name: 'Min value' })
        );

        expect(screen.getByRole('dialog')).toBeDefined();
        expect(screen.getAllByRole('slider')).toHaveLength(2);
      });
    });

    describe('loading', () => {
      it('renders loading state when showInput="inputWithPopover" and loading=true', () => {
        render(
          <EuiDualRange
            {...props}
            name="name"
            id="id"
            showInput="inputWithPopover"
            isLoading
          />
        );

        expect(screen.getByRole('progressbar')).toBeVisible();
      });
    });

    describe('levels', () => {
      it('renders levels when levels prop is set', () => {
        const { container } = render(
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

        expect(container.firstChild).toMatchSnapshot();
      });
    });

    describe('isDraggable', () => {
      it('renders draggable track when isDraggable=true', () => {
        const { container } = render(<EuiDualRange {...props} isDraggable />);

        expect(container.firstChild).toMatchSnapshot();
      });
    });

    describe('value', () => {
      it('accepts numbers', () => {
        const { container } = render(
          <EuiDualRange {...props} value={[1, 8]} />
        );

        expect(container.firstChild).toMatchSnapshot();
      });

      it('accepts empty strings', () => {
        const { container } = render(
          <EuiDualRange {...props} value={['', '']} />
        );

        expect(container.firstChild).toMatchSnapshot();
      });
    });

    describe('minInputProps', () => {
      it('applies passed props to min input', () => {
        const { container } = render(
          <EuiDualRange
            {...props}
            showInput
            minInputProps={{ 'aria-label': 'Min value' }}
          />
        );

        expect(container.firstChild).toMatchSnapshot();
      });

      it('allows overriding default props', () => {
        const { container } = render(
          <EuiDualRange {...props} showInput minInputProps={{ value: '123' }} />
        );

        expect(container.firstChild).toMatchSnapshot();
      });
    });

    describe('maxInputProps', () => {
      it('applies passed props to max input', () => {
        const { container } = render(
          <EuiDualRange
            {...props}
            showInput
            maxInputProps={{ 'aria-label': 'Max value' }}
          />
        );

        expect(container.firstChild).toMatchSnapshot();
      });

      it('allows overriding default props', () => {
        const { container } = render(
          <EuiDualRange {...props} showInput maxInputProps={{ value: '123' }} />
        );

        expect(container.firstChild).toMatchSnapshot();
      });
    });
  });

  describe('ref methods', () => {
    // Whether we like it or not, at least 2 Kibana instances are using EuiDualRange
    // `ref`s to access the `onResize` instance method (search for `rangeRef.current?.onResize`)
    // If we switch EuiDualRange to a function component, we'll need to use `useImperativeHandle`
    // to allow Kibana to continue calling `onResize`
    it('allows calling the internal onResize method', () => {
      // This super annoying type is now required to pass both the `ref` typing and account for instance methods
      type EuiDualRangeRef = React.ComponentProps<typeof EuiDualRange> &
        EuiDualRangeClass;

      const ConsumerDualRange = () => {
        const rangeRef = useRef<EuiDualRangeRef>(null);

        useEffect(() => {
          rangeRef.current?.onResize(500);
        }, []);

        return <EuiDualRange {...props} ref={rangeRef} />;
      };

      render(<ConsumerDualRange />);

      // There isn't anything we can assert on here that isn't a huge headache,
      // but the test should fail if `ref.current.onResize` is no longer available
    });
  });
});
