import React from 'react';
import { render } from 'enzyme';

import {
  EuiFormControlLayout,
  ICON_SIDES,
} from './form_control_layout';

jest.mock('../../', () => ({ EuiIcon: 'eui_icon', EuiLoadingSpinner: 'eui_loading_spinner' }));

describe('EuiFormControlLayout', () => {
  test('is rendered', () => {
    const component = render(
      <EuiFormControlLayout>
        <input />
      </EuiFormControlLayout>
    );

    expect(component)
      .toMatchSnapshot();
  });

  describe('props', () => {
    test('icon is rendered', () => {
      const component = render(
        <EuiFormControlLayout icon="alert"/>
      );

      expect(component)
        .toMatchSnapshot();
    });

    describe('iconSide', () => {
      ICON_SIDES.forEach(side => {
        test(`${side} is rendered`, () => {
          const component = render(
            <EuiFormControlLayout icon="alert" iconSide={side}/>
          );

          expect(component)
            .toMatchSnapshot();
        });
      });
    });

    test('isLoading is rendered', () => {
      const component = render(
        <EuiFormControlLayout isLoading/>
      );

      expect(component)
        .toMatchSnapshot();
    });

    test('fullWidth is rendered', () => {
      const component = render(
        <EuiFormControlLayout fullWidth/>
      );

      expect(component)
        .toMatchSnapshot();
    });
  });
});
