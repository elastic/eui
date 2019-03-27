import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../../test/required_props';

import { EuiSelectableListItem } from './selectable_list_item';

describe('EuiSelectableListItem', () => {
  test('is rendered', () => {
    const component = render(<EuiSelectableListItem {...requiredProps} />);

    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    test('checked is on', () => {
      const component = render(<EuiSelectableListItem checked="on" />);

      expect(component).toMatchSnapshot();
    });

    test('checked is off', () => {
      const component = render(<EuiSelectableListItem checked="off" />);

      expect(component).toMatchSnapshot();
    });

    test('showIcons can be turned off', () => {
      const component = render(<EuiSelectableListItem showIcons={false} />);

      expect(component).toMatchSnapshot();
    });

    test('isFocused', () => {
      const component = render(<EuiSelectableListItem isFocused />);

      expect(component).toMatchSnapshot();
    });

    test('disabled', () => {
      const component = render(<EuiSelectableListItem disabled />);

      expect(component).toMatchSnapshot();
    });

    test('prepend', () => {
      const component = render(<EuiSelectableListItem prepend={<span />} />);

      expect(component).toMatchSnapshot();
    });

    test('append', () => {
      const component = render(<EuiSelectableListItem append={<span />} />);

      expect(component).toMatchSnapshot();
    });
  });
});
