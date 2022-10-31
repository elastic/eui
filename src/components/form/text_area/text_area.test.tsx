/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../../test/required_props';
import { shouldRenderCustomStyles } from '../../../test/internal';

import { EuiForm } from '../form';
import { EuiTextArea, RESIZE } from './text_area';

describe('EuiTextArea', () => {
  shouldRenderCustomStyles(<EuiTextArea />);

  test('is rendered', () => {
    const component = render(<EuiTextArea {...requiredProps} />);

    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    describe('isInvalid', () => {
      it('is rendered', () => {
        const component = render(<EuiTextArea isInvalid />);

        expect(component).toMatchSnapshot();
      });
    });

    describe('fullWidth', () => {
      it('is rendered', () => {
        const component = render(<EuiTextArea fullWidth />);

        expect(component).toMatchSnapshot();
      });
    });

    describe('compressed', () => {
      it('is rendered', () => {
        const component = render(<EuiTextArea compressed />);

        expect(component).toMatchSnapshot();
      });
    });

    describe('resize', () => {
      RESIZE.forEach((item) => {
        it(`${item} is rendered`, () => {
          const component = render(<EuiTextArea resize={item} />);

          expect(component).toMatchSnapshot();
        });
      });
    });
  });

  describe('inherits', () => {
    test('fullWidth from <EuiForm />', () => {
      const component = render(
        <EuiForm fullWidth>
          <EuiTextArea />
        </EuiForm>
      );

      if (!component.find('.euiTextArea').hasClass('euiTextArea--fullWidth')) {
        throw new Error(
          'expected EuiTextArea to inherit fullWidth from EuiForm'
        );
      }
    });
  });
});
