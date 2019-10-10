import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../../test/required_props';

import { EuiHeaderAlert } from './header_alert';

describe('EuiHeaderAlert', () => {
  test('is rendered', () => {
    const component = render(
      <EuiHeaderAlert {...requiredProps} title="title" date="date" />
    );

    expect(component).toMatchSnapshot();
  });

  test('renders action', () => {
    const action = <button>Quietly take to the ship</button>;
    const component = render(
      <EuiHeaderAlert
        {...requiredProps}
        title="title"
        date="date"
        action={action}
      />
    );

    expect(component).toMatchSnapshot();
  });

  test('renders title as an element', () => {
    const title = <h2>Circumambulate the city</h2>;
    const component = render(
      <EuiHeaderAlert {...requiredProps} date="date" title={title} />
    );

    expect(component).toMatchSnapshot();
  });

  test('renders date as an element', () => {
    const date = <h2>October 18, 1851</h2>;
    const component = render(
      <EuiHeaderAlert {...requiredProps} title="shazm" date={date} />
    );

    expect(component).toMatchSnapshot();
  });
});
