import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../../test/required_props';

import { EuiFormControlLayoutDelimited } from './form_control_layout_delimited';
import { EuiIcon } from '../../icon';

describe('EuiFormControlLayoutDelimited', () => {
  test('is rendered', () => {
    const component = render(
      <EuiFormControlLayoutDelimited
        startControl={<span>start</span>}
        endControl={<span>end</span>}
        {...requiredProps}
      />
    );

    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    describe('delimiter', () => {
      describe('is rendered', () => {
        test('as a string', () => {
          const component = render(
            <EuiFormControlLayoutDelimited
              startControl={<span>start</span>}
              endControl={<span>end</span>}
              delimiter="+"
            />
          );

          expect(component).toMatchSnapshot();
        });

        test('as a node', () => {
          const icon = <EuiIcon type="alert" />;

          const component = render(
            <EuiFormControlLayoutDelimited
              startControl={<span>start</span>}
              endControl={<span>end</span>}
              delimiter={icon}
            />
          );

          expect(component).toMatchSnapshot();
        });
      });
    });
  });
});
