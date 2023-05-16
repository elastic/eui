/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { render } from '../../test/rtl';
import { requiredProps } from '../../test/required_props';

import {
  EuiInlineEditTitle,
  EuiInlineEditTitleProps,
} from './inline_edit_title';
import { TITLE_SIZES } from '../title/title';

describe('EuiInlineEditTitle', () => {
  const inlineEditTitleProps: EuiInlineEditTitleProps = {
    ...requiredProps,
    inputAriaLabel: 'Edit title inline',
    defaultValue: 'Hello World!',
    heading: 'h1',
  };

  it('renders', () => {
    const { container } = render(
      <EuiInlineEditTitle {...inlineEditTitleProps} />
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders the heading prop', () => {
    const { container } = render(
      <EuiInlineEditTitle {...inlineEditTitleProps} heading="h3" />
    );
    expect(container.querySelector('h3')).toBeTruthy();
  });

  test('isReadOnly', () => {
    const { container, getByTestSubject } = render(
      <EuiInlineEditTitle isReadOnly={true} {...inlineEditTitleProps} />
    );

    expect(container.firstChild).toMatchSnapshot();

    expect(getByTestSubject('euiInlineReadModeButton')).toHaveAttribute(
      'role',
      'heading'
    );
    expect(getByTestSubject('euiInlineReadModeButton')).toHaveAttribute(
      'aria-level',
      '1'
    );
  });

  describe('title sizes', () => {
    TITLE_SIZES.forEach((size) => {
      it(`renders size ${size}`, () => {
        const { container } = render(
          <EuiInlineEditTitle {...inlineEditTitleProps} size={size} />
        );

        expect(container.firstChild).toMatchSnapshot();
      });
    });
  });
});
