/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../../test';

import { EuiForm } from '../form';
import { EuiFilePicker } from './file_picker';

describe('EuiFilePicker', () => {
  test('is rendered', () => {
    const component = render(<EuiFilePicker {...requiredProps} />);

    expect(component).toMatchSnapshot();
  });

  describe('inherits', () => {
    test('fullWidth from <EuiForm />', () => {
      const component = render(
        <EuiForm fullWidth>
          <EuiFilePicker />
        </EuiForm>
      );

      if (
        !component.find('.euiFilePicker').hasClass('euiFilePicker--fullWidth')
      ) {
        throw new Error(
          'expected EuiFilePicker to inherit fullWidth from EuiForm'
        );
      }
    });
  });
});
