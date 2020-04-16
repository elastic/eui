import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import { EuiCollapsibleNav } from './collapsible_nav';

jest.mock('../overlay_mask', () => ({
  EuiOverlayMask: (props: any) => <div {...props} />,
}));

const propsNeededToRender = { id: 'id', isOpen: true };

describe('EuiCollapsibleNav', () => {
  test('is rendered', () => {
    const component = render(
      <EuiCollapsibleNav {...propsNeededToRender} {...requiredProps} />
    );

    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    test('onClose', () => {
      const component = render(
        <EuiCollapsibleNav {...propsNeededToRender} onClose={() => {}} />
      );

      expect(component).toMatchSnapshot();
    });

    test('isDocked', () => {
      const component = render(
        <EuiCollapsibleNav {...propsNeededToRender} isDocked={true} />
      );

      expect(component).toMatchSnapshot();
    });

    test('dockedBreakpoint', () => {
      const component = render(
        <EuiCollapsibleNav {...propsNeededToRender} dockedBreakpoint={500} />
      );

      expect(component).toMatchSnapshot();
    });

    test('button', () => {
      const component = render(
        <EuiCollapsibleNav {...propsNeededToRender} button={<button />} />
      );

      expect(component).toMatchSnapshot();
    });

    test('showCloseButton can be false', () => {
      const component = render(
        <EuiCollapsibleNav {...propsNeededToRender} showCloseButton={false} />
      );

      expect(component).toMatchSnapshot();
    });

    test('showButtonIfDocked', () => {
      const component = render(
        <EuiCollapsibleNav
          {...propsNeededToRender}
          button={<button />}
          isDocked={true}
          showButtonIfDocked={true}
        />
      );

      expect(component).toMatchSnapshot();
    });
  });

  test('does not render if isOpen is false', () => {
    const component = render(<EuiCollapsibleNav id="id" />);

    expect(component).toMatchSnapshot();
  });
});
