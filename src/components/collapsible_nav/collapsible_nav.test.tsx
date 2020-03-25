import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import { EuiCollapsibleNav } from './collapsible_nav';

jest.mock('../overlay_mask', () => ({
  EuiOverlayMask: (props: any) => <div {...props} />,
}));

describe('EuiCollapsibleNav', () => {
  test('is rendered', () => {
    const component = render(<EuiCollapsibleNav id="id" {...requiredProps} />);

    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    test('onClose', () => {
      const component = render(
        <EuiCollapsibleNav id="id" onClose={() => {}} />
      );

      expect(component).toMatchSnapshot();
    });

    test('isDocked', () => {
      const component = render(<EuiCollapsibleNav id="id" isDocked={true} />);

      expect(component).toMatchSnapshot();
    });

    test('isOpen', () => {
      const component = render(<EuiCollapsibleNav id="id" isOpen={true} />);

      expect(component).toMatchSnapshot();
    });

    test('button', () => {
      const component = render(
        <EuiCollapsibleNav id="id" button={<button />} />
      );

      expect(component).toMatchSnapshot();
    });

    test('hideButtonIfDocked', () => {
      const component = render(
        <EuiCollapsibleNav
          id="id"
          button={<button />}
          hideButtonIfDocked={false}
        />
      );

      expect(component).toMatchSnapshot();
    });
  });
});
