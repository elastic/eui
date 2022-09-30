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

import { EuiForm } from '../form';
import { EuiTextArea } from './text_area';

describe('EuiTextArea', () => {
  test('is rendered', () => {
    const component = render(<EuiTextArea {...requiredProps} />);

    expect(component).toMatchSnapshot();
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
