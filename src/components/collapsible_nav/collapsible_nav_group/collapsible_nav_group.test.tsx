import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../../test/required_props';

import { EuiCollapsibleNavGroup, BACKGROUNDS } from './collapsible_nav_group';

describe('EuiCollapsibleNavGroup', () => {
  test('is rendered', () => {
    const component = render(
      <EuiCollapsibleNavGroup
        title="Title"
        initialIsOpen={false}
        id="id"
        {...requiredProps}
      />
    );

    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    test('iconType is rendered', () => {
      const component = render(
        <EuiCollapsibleNavGroup
          title="Title"
          initialIsOpen={false}
          iconType="bolt"
          id="id"
        />
      );

      expect(component).toMatchSnapshot();
    });

    describe('background', () => {
      BACKGROUNDS.forEach(color => {
        test(`${color} is rendered`, () => {
          const component = render(
            <EuiCollapsibleNavGroup
              title="Title"
              initialIsOpen={false}
              id="id"
              background={color}
            />
          );

          expect(component).toMatchSnapshot();
        });
      });
    });
  });
});
