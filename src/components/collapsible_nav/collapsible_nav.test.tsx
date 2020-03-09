import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import { EuiCollapsibleNav } from './collapsible_nav';

jest.mock('../overlay_mask', () => ({
  EuiOverlayMask: (props: any) => <div {...props} />,
}));

describe('EuiCollapsibleNav', () => {
  test('is rendered', () => {
    const component = render(
      <EuiCollapsibleNav onClose={() => {}} {...requiredProps} />
    );

    expect(component).toMatchSnapshot();
  });

  test('can be docked', () => {
    const component = render(
      <EuiCollapsibleNav docked={true} onClose={() => {}} />
    );

    expect(component).toMatchSnapshot();
  });
});
