import React from 'react';
import { render } from 'enzyme';
import { EuiCollapsibleNavToggle } from './collapsible_nav_toggle';

describe('EuiCollapsibleNavToggle', () => {
  test('is rendered', () => {
    const component = render(
      <EuiCollapsibleNavToggle navIsDocked={false}>
        <span />
      </EuiCollapsibleNavToggle>
    );

    expect(component).toMatchSnapshot();
  });

  test('is rendered when navIsDocked is true', () => {
    const component = render(
      <EuiCollapsibleNavToggle navIsDocked={true}>
        <span />
      </EuiCollapsibleNavToggle>
    );

    expect(component).toMatchSnapshot();
  });
});
