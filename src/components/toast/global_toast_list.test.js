import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import { EuiGlobalToastList } from './global_toast_list';

describe('EuiGlobalToastList', () => {
  test('is rendered', () => {
    const component = render(
      <EuiGlobalToastList
        {...requiredProps}
        dismissToast={() => {}}
        toastLifeTimeMs={1000}
      />
    );

    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    describe('toasts', () => {
      it('is rendered', () => {
        const toats = [
          { id: 'A', title: 'A' },
          { id: 'B', title: 'B' },
          { id: 'C', title: 'C' },
        ];

        const component = render(
          <EuiGlobalToastList
            toasts={toats}
            dismissToast={() => {}}
            toastLifeTimeMs={1000}
          />
        );

        expect(component).toMatchSnapshot();
      });
    });
  });
});
