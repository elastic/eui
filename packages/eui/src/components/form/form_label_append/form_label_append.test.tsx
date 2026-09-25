/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { requiredProps } from '../../../test/required_props';
import { render } from '../../../test/rtl';

import { EuiFormLabelAppend } from './form_label_append';

describe('EuiFormLabelAppend', () => {
  test('is rendered', () => {
    const { container } = render(
      <EuiFormLabelAppend {...requiredProps}>Optional</EuiFormLabelAppend>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders string children as subdued text', () => {
    const { container } = render(
      <EuiFormLabelAppend>Optional</EuiFormLabelAppend>
    );

    expect(container.querySelector('.euiFormLabelAppend')).not.toBeNull();
  });

  test('renders custom element children as-is', () => {
    const { container } = render(
      <EuiFormLabelAppend>
        <a href="#">Learn more</a>
      </EuiFormLabelAppend>
    );

    expect(container.querySelector('.euiFormLabelAppend')).toBeNull();
    expect(container.querySelector('a')).not.toBeNull();
  });
});
