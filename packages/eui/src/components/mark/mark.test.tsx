/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { shouldRenderCustomStyles } from '../../test/internal';
import { requiredProps } from '../../test/required_props';
import { render } from '../../test/rtl';

import { EuiMark } from './mark';

describe('EuiMark', () => {
  shouldRenderCustomStyles(<EuiMark>Marked</EuiMark>);

  test('is rendered', () => {
    const { container } = render(<EuiMark {...requiredProps}>Marked</EuiMark>);

    expect(container.firstChild).toMatchSnapshot();
  });

  describe('No screen reader helper text', () => {
    test('is rendered without CSS :before', () => {
      const { container } = render(
        <EuiMark hasScreenReaderHelpText={false} {...requiredProps}>
          Marked
        </EuiMark>
      );

      expect(container.firstChild).not.toHaveStyleRule(
        'content',
        "' [highlight start] '"
      );
    });

    test('is rendered without CSS :after', () => {
      const { container } = render(
        <EuiMark hasScreenReaderHelpText={false} {...requiredProps}>
          Marked
        </EuiMark>
      );

      expect(container.firstChild).not.toHaveStyleRule(
        'content',
        "' [highlight end] '"
      );
    });
  });
});
