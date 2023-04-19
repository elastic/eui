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

  it('renders in readMode', () => {
    const { container, getByTestSubject, getByText } = render(
      <EuiInlineEditTitle {...inlineEditTitleProps} />
    );

    expect(container.firstChild).toMatchSnapshot();

    expect(getByTestSubject('euiInlineReadModeButton')).toBeTruthy();
    expect(getByText('Hello World!')).toBeTruthy();
  });

  it('renders in editMode', () => {
    const { container, getByTestSubject, queryByTestSubject } = render(
      <EuiInlineEditTitle {...inlineEditTitleProps} startWithEditOpen={true} />
    );

    expect(container.firstChild).toMatchSnapshot();

    expect(getByTestSubject('euiInlineEditModeInput')).toBeTruthy();
    expect(queryByTestSubject('euiInlineReadModeButton')).toBeFalsy();
  });

  describe('Title Sizes', () => {
    TITLE_SIZES.forEach((size) => {
      it(`renders in size ${size} in readMode`, () => {
        const { container } = render(
          <EuiInlineEditTitle {...inlineEditTitleProps} size={size} />
        );

        expect(container.firstChild).toMatchSnapshot();
      });
    });

    TITLE_SIZES.forEach((size) => {
      it(`renders in size ${size} in readMode`, () => {
        const { container } = render(
          <EuiInlineEditTitle
            {...inlineEditTitleProps}
            startWithEditOpen={true}
            size={size}
          />
        );

        expect(container.firstChild).toMatchSnapshot();
      });
    });
  });
});
