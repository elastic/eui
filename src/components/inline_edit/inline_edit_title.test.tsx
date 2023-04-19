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

import { EuiInlineEditTitle } from './inline_edit_title';
import { TITLE_SIZES } from '../title/title';

describe('EuiInlineEditTitle', () => {
  test('renders as title in readMode', () => {
    const { container } = render(
      <EuiInlineEditTitle
        inputAriaLabel={'textInputReadModeTest'}
        defaultValue="hello world"
        heading="h1"
        {...requiredProps}
      />
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders as title in editMode', () => {
    const { container } = render(
      <EuiInlineEditTitle
        inputAriaLabel={'textInputEditModeTest'}
        defaultValue="hello world"
        heading="h1"
        startWithEditOpen={true}
        {...requiredProps}
      />
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  describe('props', () => {
    describe('sizes', () => {
      TITLE_SIZES.forEach((size) => {
        test(`${size} is rendered in readMode`, () => {
          const { container } = render(
            <EuiInlineEditTitle
              size={size}
              defaultValue="Hello World!"
              inputAriaLabel="inlineEditLabel"
              saveButtonAriaLabel="saveEditButton"
              heading="h1"
            />
          );

          expect(container.firstChild).toMatchSnapshot();
        });
      });

      TITLE_SIZES.forEach((size) => {
        test(`${size} is rendered in editMode`, () => {
          const { container } = render(
            <EuiInlineEditTitle
              size={size}
              defaultValue="Hello World!"
              inputAriaLabel="inlineEditLabel"
              saveButtonAriaLabel="saveEditButton"
              startWithEditOpen={true}
              heading="h1"
            />
          );

          expect(container.firstChild).toMatchSnapshot();
        });
      });
    });
  });
});
