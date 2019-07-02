import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import { EuiFlexGrid, GUTTER_SIZES, COLUMNS, DIRECTIONS } from './flex_grid';

describe('EuiFlexGrid', () => {
  test('is rendered', () => {
    const component = render(
      <EuiFlexGrid columns={3} {...requiredProps}>
        <h2>My Child</h2>
      </EuiFlexGrid>
    );

    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    describe('gutterSize', () => {
      GUTTER_SIZES.forEach(value => {
        test(`${value} is rendered`, () => {
          const component = render(<EuiFlexGrid gutterSize={value} />);

          expect(component).toMatchSnapshot();
        });
      });
    });

    describe('columns', () => {
      COLUMNS.forEach(value => {
        test(`${value} is rendered`, () => {
          const component = render(<EuiFlexGrid columns={value} />);

          expect(component).toMatchSnapshot();
        });
      });
    });

    describe('direction', () => {
      DIRECTIONS.forEach(value => {
        test(`${value} is rendered`, () => {
          const component = render(<EuiFlexGrid direction={value} />);

          expect(component).toMatchSnapshot();
        });
      });
    });

    describe('responsive', () => {
      test('is rendered', () => {
        const component = render(<EuiFlexGrid responsive={false} />);

        expect(component).toMatchSnapshot();
      });
    });
  });
});
