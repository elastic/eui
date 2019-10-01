import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test';

import { EuiCardSelect } from './card_select';

describe('EuiCardSelect', () => {
  test('is rendered', () => {
    const component = render(
      <EuiCardSelect onClick={() => {}} {...requiredProps} />
    );

    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    test('isSelected', () => {
      const component = render(<EuiCardSelect onClick={() => {}} isSelected />);

      expect(component).toMatchSnapshot();
    });

    test('isDisabled', () => {
      const component = render(<EuiCardSelect onClick={() => {}} isDisabled />);

      expect(component).toMatchSnapshot();
    });

    test('can override color', () => {
      const component = render(
        <EuiCardSelect onClick={() => {}} color="danger" />
      );

      expect(component).toMatchSnapshot();
    });

    test('can override text', () => {
      const component = render(
        <EuiCardSelect onClick={() => {}} children="Custom text" />
      );

      expect(component).toMatchSnapshot();
    });
  });
});
