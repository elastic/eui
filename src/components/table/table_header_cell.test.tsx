import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import { EuiTableHeaderCell } from './table_header_cell';

import { RIGHT_ALIGNMENT, CENTER_ALIGNMENT } from '../../services';

test('renders EuiTableHeaderCell', () => {
  const component = (
    <EuiTableHeaderCell {...requiredProps}>children</EuiTableHeaderCell>
  );

  expect(render(component)).toMatchSnapshot();
});

test('renders td when children is null/undefined', () => {
  const component = render(<EuiTableHeaderCell {...requiredProps} />);

  expect(component).toMatchSnapshot();
});

describe('align', () => {
  test('defaults to left', () => {
    const component = <EuiTableHeaderCell />;

    expect(render(component)).toMatchSnapshot();
  });

  test('renders right when specified', () => {
    const component = <EuiTableHeaderCell align={RIGHT_ALIGNMENT} />;

    expect(render(component)).toMatchSnapshot();
  });

  test('renders center when specified', () => {
    const component = <EuiTableHeaderCell align={CENTER_ALIGNMENT} />;

    expect(render(component)).toMatchSnapshot();
  });
});

describe('width and style', () => {
  const _consoleWarn = console.warn;
  beforeAll(() => {
    console.warn = (...args: [any?, ...any[]]) => {
      // Suppress an expencted warning
      if (
        args.length === 1 &&
        args[0] ===
          'Two `width` properties were provided. Provide only one of `style.width` or `width` to avoid conflicts.'
      )
        return;
      _consoleWarn.apply(console, args);
    };
  });
  afterAll(() => {
    console.warn = _consoleWarn;
  });

  test('accepts style attribute', () => {
    const component = (
      <EuiTableHeaderCell style={{ width: '20%' }}>Test</EuiTableHeaderCell>
    );

    expect(render(component)).toMatchSnapshot();
  });

  test('accepts width attribute', () => {
    const component = <EuiTableHeaderCell width="10%">Test</EuiTableHeaderCell>;

    expect(render(component)).toMatchSnapshot();
  });

  test('accepts width attribute as number', () => {
    const component = <EuiTableHeaderCell width={100}>Test</EuiTableHeaderCell>;

    expect(render(component)).toMatchSnapshot();
  });

  test('resolves style and width attribute', () => {
    const component = (
      <EuiTableHeaderCell width="10%" style={{ width: '20%' }}>
        Test
      </EuiTableHeaderCell>
    );

    expect(render(component)).toMatchSnapshot();
  });
});
