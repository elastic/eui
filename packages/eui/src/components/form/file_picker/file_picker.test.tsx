/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the "Elastic License
 * 2.0", the "GNU Affero General Public License v3.0 only", and the "Server Side
 * Public License v 1"; you may not use this file except in compliance with, at
 * your election, the "Elastic License 2.0", the "GNU Affero General Public
 * License v3.0 only", or the "Server Side Public License, v 1".
 */

import React from 'react';
import { requiredProps } from '../../../test';
import { render } from '../../../test/rtl';
import { shouldRenderCustomStyles } from '../../../test/internal';

import { EuiForm } from '../form';
import { EuiFilePicker } from './file_picker';

describe('EuiFilePicker', () => {
  shouldRenderCustomStyles(<EuiFilePicker />, { skip: { style: true } });

  shouldRenderCustomStyles(<EuiFilePicker />, {
    // inline styles are applied to input instead of wrapper
    skip: { className: true, css: true },
    targetSelector: 'input',
  });

  test('is rendered', () => {
    const { container } = render(<EuiFilePicker {...requiredProps} />);

    expect(container.firstChild).toMatchSnapshot();
  });

  describe('inherits', () => {
    test('fullWidth from <EuiForm />', () => {
      const { container } = render(
        <EuiForm fullWidth>
          <EuiFilePicker />
        </EuiForm>
      );

      const filePicker = container.querySelector('.euiFilePicker');
      expect(filePicker!.className).toContain('fullWidth');
    });
  });
});
