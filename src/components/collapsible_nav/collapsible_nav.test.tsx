import React, { ReactNode } from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import { EuiCollapsibleNav } from './collapsible_nav';

jest.mock('../portal', () => ({
  EuiPortal: ({ children }: { children: ReactNode }) => children,
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
