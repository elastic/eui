import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test';

import { EuiTableHeaderCell } from './table_header_cell';

import { RIGHT_ALIGNMENT, CENTER_ALIGNMENT } from '../../services';

test('renders EuiTableHeaderCell', () => {
  const component = (
    <EuiTableHeaderCell {...requiredProps}>children</EuiTableHeaderCell>
  );

  expect(render(component)).toMatchSnapshot();
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

  describe('Overlapping attributes', () => {
    let consoleWarn: Console['warn'];

    beforeEach(() => {
      consoleWarn = console.warn;
      console.warn = jest.fn();
    });

    afterEach(() => {
      console.warn = consoleWarn;
    });

    test('resolves style and width attribute', () => {
      const component = (
        <EuiTableHeaderCell width="10%" style={{ width: '20%' }}>
          Test
        </EuiTableHeaderCell>
      );

      expect(render(component)).toMatchSnapshot();

      expect(console.warn).toBeCalledWith(
        'Two `width` properties were provided. Provide only one of `style.width` or `width` to avoid conflicts.'
      );
    });
  });
});
