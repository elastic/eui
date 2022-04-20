/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { render } from 'enzyme';
import {
  renderWithStyles,
  shouldRenderCustomStyles,
} from '../../test/internal';
import { requiredProps } from '../../test/required_props';

import { EuiMark } from './mark';

describe('EuiMark', () => {
  renderWithStyles(<EuiMark>Marked</EuiMark>);
  shouldRenderCustomStyles(<EuiMark>Marked</EuiMark>);

  test('is rendered', () => {
    expect(
      render(<EuiMark {...requiredProps}>Marked</EuiMark>)
    ).toMatchSnapshot();
  });

  describe('No screen reader helper text', () => {
    test('is rendered without CSS :before', () => {
      expect(
        render(
          <EuiMark hasScreenReaderHelpText={false} {...requiredProps}>
            Marked
          </EuiMark>
        )
      ).not.toHaveStyleRule('content', "' [highlight start] '");
    });

    test('is rendered without CSS :after', () => {
      expect(
        render(
          <EuiMark hasScreenReaderHelpText={false} {...requiredProps}>
            Marked
          </EuiMark>
        )
      ).not.toHaveStyleRule('content', "' [highlight end] '");
    });
  });
});
