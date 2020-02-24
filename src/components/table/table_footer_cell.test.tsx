import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test';

import { EuiTableFooterCell } from './table_footer_cell';

import { RIGHT_ALIGNMENT, CENTER_ALIGNMENT } from '../../services';

describe('EuiTableFooterCell', () => {
  test('is rendered', () => {
    const component = render(
      <EuiTableFooterCell {...requiredProps}>children</EuiTableFooterCell>
    );

    expect(component).toMatchSnapshot();
  });

  describe('align', () => {
    test('defaults to left', () => {
      const component = <EuiTableFooterCell />;

      expect(render(component)).toMatchSnapshot();
    });

    test('renders right when specified', () => {
      const component = <EuiTableFooterCell align={RIGHT_ALIGNMENT} />;

      expect(render(component)).toMatchSnapshot();
    });

    test('renders center when specified', () => {
      const component = <EuiTableFooterCell align={CENTER_ALIGNMENT} />;

      expect(render(component)).toMatchSnapshot();
    });
  });

  describe('width and style', () => {
    test('accepts style attribute', () => {
      const component = (
        <EuiTableFooterCell style={{ width: '20%' }}>Test</EuiTableFooterCell>
      );

      expect(render(component)).toMatchSnapshot();
    });

    test('accepts width attribute', () => {
      const component = (
        <EuiTableFooterCell width="10%">Test</EuiTableFooterCell>
      );

      expect(render(component)).toMatchSnapshot();
    });

    test('accepts width attribute as number', () => {
      const component = (
        <EuiTableFooterCell width={100}>Test</EuiTableFooterCell>
      );

      expect(render(component)).toMatchSnapshot();
    });

    describe('resolves overlapping attributes', () => {
      let consoleWarn: Console['warn'];

      beforeEach(() => {
        consoleWarn = console.warn;
        console.warn = jest.fn();
      });

      afterEach(() => {
        console.warn = consoleWarn;
      });

      test('in style vs width', () => {
        const component = (
          <EuiTableFooterCell width="10%" style={{ width: '20%' }}>
            Test
          </EuiTableFooterCell>
        );

        expect(render(component)).toMatchSnapshot();

        expect(console.warn).toBeCalledWith(
          'Two `width` properties were provided. Provide only one of `style.width` or `width` to avoid conflicts.'
        );
      });
    });
  });
});
