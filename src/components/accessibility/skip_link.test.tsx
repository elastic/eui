import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test';

import { EuiSkipLink, POSITIONS } from './skip_link';

describe('EuiSkipLink', () => {
  test('is rendered', () => {
    const component = render(
      <EuiSkipLink destinationId="somewhere" {...requiredProps} />
    );

    expect(component).toMatchSnapshot();
  });

  describe('position', () => {
    POSITIONS.forEach(position => {
      test(`${position} is rendered`, () => {
        const component = render(
          <EuiSkipLink position={position} destinationId="somewhere" />
        );

        expect(component).toMatchSnapshot();
      });
    });
  });
});
