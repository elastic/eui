import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import {
  EuiFlexGrid,
  GUTTER_SIZES,
  COLUMNS,
} from './flex_grid';

describe('EuiFlexGrid', () => {
  test('is rendered', () => {
    const component = render(
      <EuiFlexGrid columns={3} {...requiredProps} />
    );

    expect(component)
      .toMatchSnapshot();
  });

  /*
  children: PropTypes.node,
  className: PropTypes.string,
  gutterSize: PropTypes.oneOf(GUTTER_SIZES),
  columns: PropTypes.oneOf(COLUMNS).isRequired,
  */

  describe('props', () => {
    test('children', () => {
      const component = render(
        <EuiFlexGrid {...requiredProps}>
          <h2>My Child</h2>
        </EuiFlexGrid>
      );

      expect(component)
        .toMatchSnapshot();
    });

    describe('gutterSize', () => {
      GUTTER_SIZES.forEach(value => {
        test(`${value} is rendered`, () => {
          const component = render(
            <EuiFlexGrid
              gutterSize={value}
              {...requiredProps}
            />
          );

          expect(component)
            .toMatchSnapshot();
        });
      });
    });

    describe('columns', () => {
      COLUMNS.forEach(value => {
        test(`${value} is rendered`, () => {
          const component = render(
            <EuiFlexGrid
              columns={value}
              {...requiredProps}
            />
          );

          expect(component)
            .toMatchSnapshot();
        });
      });
    });
  });
});
