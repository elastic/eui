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

import { EuiInlineEditText, EuiInlineEditTextProps } from './inline_edit_text';
import { TEXT_SIZES } from '../text/text';

describe('EuiInlineEditTitle', () => {
  test('renders as title in readMode', () => {
    const { container } = render(
      <EuiInlineEditText
        inputAriaLabel={'textInputReadModeTest'}
        defaultValue="hello world"
        {...requiredProps}
      />
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders as title in editMode', () => {
    const { container } = render(
      <EuiInlineEditText
        inputAriaLabel={'textInputEditModeTest'}
        defaultValue="hello world"
        startWithEditOpen={true}
        {...requiredProps}
      />
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  describe('props', () => {
    describe('sizes', () => {
      // Remove 'relative' from text sizes available for EuiInlineEditText
      const usedTextSizes = TEXT_SIZES.filter((size) => size !== 'relative');

      usedTextSizes.forEach((size: string) => {
        test(`${size} is rendered in readMode`, () => {
          const component = render(
            <EuiInlineEditText
              size={size as EuiInlineEditTextProps['size']}
              defaultValue="Hello World!"
              inputAriaLabel="inlineEditLabel"
              saveButtonAriaLabel="saveEditButton"
            />
          );

          expect(component).toMatchSnapshot();
        });
      });

      usedTextSizes.forEach((size: string) => {
        test(`${size} is rendered in editMode`, () => {
          const component = render(
            <EuiInlineEditText
              size={size as EuiInlineEditTextProps['size']}
              defaultValue="Hello World!"
              inputAriaLabel="inlineEditLabel"
              saveButtonAriaLabel="saveEditButton"
              startWithEditOpen={true}
            />
          );

          expect(component).toMatchSnapshot();
        });
      });
    });
  });
});
