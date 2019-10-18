import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test';

import { EuiTableHeaderCellCheckbox } from './table_header_cell_checkbox';

describe('EuiTableHeaderCellCheckbox', () => {
  test('is rendered', () => {
    const component = render(<EuiTableHeaderCellCheckbox {...requiredProps} />);

    expect(component).toMatchSnapshot();
  });

  describe('width and style', () => {
    test('accepts style attribute', () => {
      const component = (
        <EuiTableHeaderCellCheckbox style={{ width: '20%' }}>
          Test
        </EuiTableHeaderCellCheckbox>
      );

      expect(render(component)).toMatchSnapshot();
    });

    test('accepts width attribute', () => {
      const component = (
        <EuiTableHeaderCellCheckbox width="10%">
          Test
        </EuiTableHeaderCellCheckbox>
      );

      expect(render(component)).toMatchSnapshot();
    });

    test('accepts width attribute as number', () => {
      const component = (
        <EuiTableHeaderCellCheckbox width={100}>
          Test
        </EuiTableHeaderCellCheckbox>
      );

      expect(render(component)).toMatchSnapshot();
    });

    test('resolves style and width attribute', () => {
      const component = (
        <EuiTableHeaderCellCheckbox width="10%" style={{ width: '20%' }}>
          Test
        </EuiTableHeaderCellCheckbox>
      );

      expect(render(component)).toMatchSnapshot();
    });
  });
});
