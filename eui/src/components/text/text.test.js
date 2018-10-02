import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import { EuiText } from './text';

describe('EuiText', () => {
  test('is rendered', () => {
    const component = render(
      <EuiText {...requiredProps}>
        <p>Content</p>
      </EuiText>
    );

    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    describe('grow', () => {
      test('is rendered', () => {
        const component = render(
          <EuiText {...requiredProps} grow>
            <p>Content</p>
          </EuiText>
        );

        expect(component).toMatchSnapshot();
      });
    });
  });
});
