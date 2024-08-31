/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { render } from '../../../test/rtl';
import { shouldRenderCustomStyles } from '../../../test/internal';
import { requiredProps } from '../../../test/required_props';

import { EuiIcon } from '../../icon';
import { EuiForm } from '../form';

import { EuiFormControlLayoutDelimited } from './form_control_layout_delimited';

describe('EuiFormControlLayoutDelimited', () => {
  shouldRenderCustomStyles(
    <EuiFormControlLayoutDelimited
      startControl={<span>start</span>}
      endControl={<span>end</span>}
    />,
    { childProps: ['wrapperProps'] }
  );

  test('is rendered', () => {
    const { container } = render(
      <EuiFormControlLayoutDelimited
        startControl={<span>start</span>}
        endControl={<span>end</span>}
        {...requiredProps}
      />
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  describe('props', () => {
    describe('delimiter', () => {
      describe('is rendered', () => {
        test('as a string', () => {
          const { container } = render(
            <EuiFormControlLayoutDelimited
              startControl={<span>start</span>}
              endControl={<span>end</span>}
              delimiter="+"
            />
          );

          expect(container.firstChild).toMatchSnapshot();
        });

        test('as a node', () => {
          const icon = <EuiIcon type="error" />;

          const { container } = render(
            <EuiFormControlLayoutDelimited
              startControl={<span>start</span>}
              endControl={<span>end</span>}
              delimiter={icon}
            />
          );

          expect(container.firstChild).toMatchSnapshot();
        });
      });
    });
  });

  describe('inherits', () => {
    test('fullWidth from <EuiForm />', () => {
      const { baseElement } = render(
        <EuiForm fullWidth>
          <EuiFormControlLayoutDelimited
            startControl={<span>start</span>}
            endControl={<span>end</span>}
          />
        </EuiForm>
      );

      const layout = baseElement.querySelector(
        '.euiFormControlLayoutDelimited'
      );
      expect(layout!.className).toContain('fullWidth');
    });
  });
});
