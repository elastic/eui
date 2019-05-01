import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../../test/required_props';

import { EuiRange } from './range';

describe('EuiRange', () => {
  test('is rendered', () => {
    const component = render(
      <EuiRange
        name="name"
        id="id"
        min={1}
        max={10}
        value="8"
        onChange={() => {}}
        {...requiredProps}
      />
    );

    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    test('disabled should render', () => {
      const component = render(<EuiRange disabled />);

      expect(component).toMatchSnapshot();
    });

    test('fullWidth should render', () => {
      const component = render(<EuiRange fullWidth />);

      expect(component).toMatchSnapshot();
    });

    test('compressed should render', () => {
      const component = render(<EuiRange compressed />);

      expect(component).toMatchSnapshot();
    });

    test('labels should render', () => {
      const component = render(<EuiRange showLabels />);

      expect(component).toMatchSnapshot();
    });

    test('ticks should render', () => {
      const component = render(<EuiRange showTicks tickInterval={20} />);

      expect(component).toMatchSnapshot();
    });

    test('custom ticks should render', () => {
      const component = render(
        <EuiRange
          showTicks
          ticks={[{ label: '20kb', value: 20 }, { label: '100kb', value: 100 }]}
        />
      );

      expect(component).toMatchSnapshot();
    });

    test('range should render', () => {
      const component = render(<EuiRange showRange value="8" />);

      expect(component).toMatchSnapshot();
    });

    test('value should render', () => {
      const component = render(
        <EuiRange
          value="200"
          showValue
          valuePrepend="before"
          valueAppend="after"
        />
      );

      expect(component).toMatchSnapshot();
    });

    test('input should render', () => {
      const component = render(
        <EuiRange
          name="name"
          id="id"
          min={1}
          max={10}
          value="8"
          onChange={() => {}}
          showInput
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
        />
      );

      expect(component).toMatchSnapshot();
    });
  });

  test('allows value prop to accept a number', () => {
    const component = render(
      <EuiRange value={8} onChange={() => {}} showValue />
    );

    expect(component).toMatchSnapshot();
  });

  test('allows value prop to accept empty string', () => {
    const component = render(<EuiRange value={''} onChange={() => {}} />);

    expect(component).toMatchSnapshot();
  });
});
