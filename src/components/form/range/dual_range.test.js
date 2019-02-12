import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../../test/required_props';

import { EuiDualRange } from './dual_range';

describe('EuiDualRange', () => {
  test('is rendered', () => {
    const component = render(
      <EuiDualRange
        name="name"
        id="id"
        min={1}
        max={10}
        value={['1', '8']}
        onChange={() => {}}
        {...requiredProps}
      />
    );

    expect(component)
      .toMatchSnapshot();
  });

  describe('props', () => {
    test('fullWidth should render', () => {
      const component = render(
        <EuiDualRange fullWidth/>
      );

      expect(component)
        .toMatchSnapshot();
    });

    test('compressed should render', () => {
      const component = render(
        <EuiDualRange compressed/>
      );

      expect(component)
        .toMatchSnapshot();
    });

    test('labels should render', () => {
      const component = render(
        <EuiDualRange showLabels/>
      );

      expect(component)
        .toMatchSnapshot();
    });

    test('ticks should render', () => {
      const component = render(
        <EuiDualRange showTicks tickInterval={20}/>
      );

      expect(component)
        .toMatchSnapshot();
    });

    test('range should render', () => {
      const component = render(
        <EuiDualRange showRange value={[1, 8]} />
      );

      expect(component)
        .toMatchSnapshot();
    });

    test('inputs should render', () => {
      const component = render(
        <EuiDualRange
          name="name"
          id="id"
          min={1}
          max={10}
          value={['1', '8']}
          onChange={() => {}}
          showInput
          {...requiredProps}
        />
      );

      expect(component)
        .toMatchSnapshot();
    });

    test('levels should render', () => {
      const component = render(
        <EuiDualRange
          levels={[
            {
              min: 0,
              max: 600,
              color: 'danger'
            },
            {
              min: 600,
              max: 2000,
              color: 'success'
            }
          ]}
        />
      );

      expect(component)
        .toMatchSnapshot();
    });
  });

  test('allows value prop to accept numbers', () => {
    const component = render(
      <EuiDualRange
        value={[1, 8]}
        onChange={() => {}}
      />
    );

    expect(component)
      .toMatchSnapshot();
  });
});
