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

describe('EuiInlineEditText', () => {
  const inlineEditTextProps: EuiInlineEditTextProps = {
    ...requiredProps,
    inputAriaLabel: 'Edit text inline',
    defaultValue: 'Hello World!',
  };

  it('renders in readMode', () => {
    const { container, getByTestSubject, getByText } = render(
      <EuiInlineEditText {...inlineEditTextProps} />
    );

    expect(container.firstChild).toMatchSnapshot();

    expect(getByTestSubject('euiInlineReadModeButton')).toBeTruthy();
    expect(getByText('Hello World!')).toBeTruthy();
  });

  it('renders in editMode', () => {
    const { container, getByTestSubject, queryByTestSubject } = render(
      <EuiInlineEditText {...inlineEditTextProps} startWithEditOpen={true} />
    );

    expect(container.firstChild).toMatchSnapshot();

    expect(getByTestSubject('euiInlineEditModeInput')).toBeTruthy();
    expect(queryByTestSubject('euiInlineReadModeButton')).toBeFalsy();
  });

  describe('Text Sizes', () => {
    // Remove 'relative' from text sizes available for EuiInlineEditText
    const availableTextSizes = TEXT_SIZES.filter((size) => size !== 'relative');

    availableTextSizes.forEach((size: string) => {
      test(`renders in ${size} in readMode`, () => {
        const { container } = render(
          <EuiInlineEditText
            {...inlineEditTextProps}
            size={size as EuiInlineEditTextProps['size']}
          />
        );

        expect(container.firstChild).toMatchSnapshot();
      });
    });

    availableTextSizes.forEach((size: string) => {
      test(`renders in ${size} in editMode`, () => {
        const { container } = render(
          <EuiInlineEditText
            {...inlineEditTextProps}
            size={size as EuiInlineEditTextProps['size']}
            startWithEditOpen={true}
          />
        );

        expect(container.firstChild).toMatchSnapshot();
      });
    });
  });
});
