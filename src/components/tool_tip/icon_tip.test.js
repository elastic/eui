import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test';

import { EuiIconTip } from './icon_tip';

describe('EuiIconTip', () => {
  test('is rendered', () => {
    const component = render(
      <EuiIconTip title="title" id="id" content="content" {...requiredProps} />
    );

    expect(component)
      .toMatchSnapshot();
  });

  describe('props', () => {
    describe('type', () => {
      test('is rendered as the icon', () => {
        const component = render(
          <EuiIconTip type="alert" id="id" content="content" />
        );

        expect(component)
          .toMatchSnapshot();
      });
    });
  });
});
