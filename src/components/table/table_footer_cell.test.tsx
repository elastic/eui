import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test/required_props';

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
});
