/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { render } from '../../../test/rtl';
import { requiredProps } from '../../../test/required_props';
import { shouldRenderCustomStyles } from '../../../test/internal';

import { EuiButtonDisplayContent } from './_button_display_content';

describe('EuiButtonDisplayContent', () => {
  shouldRenderCustomStyles(
    <EuiButtonDisplayContent>Text</EuiButtonDisplayContent>,
    { childProps: ['textProps'] }
  );

  it('renders', () => {
    const { container } = render(
      <EuiButtonDisplayContent {...requiredProps}>
        Content
      </EuiButtonDisplayContent>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  describe('props', () => {
    test('textProps', () => {
      const { getByTestSubject } = render(
        <EuiButtonDisplayContent textProps={{ 'data-test-subj': 'testing' }}>
          Text
        </EuiButtonDisplayContent>
      );

      expect(getByTestSubject('testing')).toBeTruthy();
    });
  });

  describe('text span wrapper', () => {
    it('renders a text span wrapper if the content is a string', () => {
      const { container } = render(
        <EuiButtonDisplayContent>Text</EuiButtonDisplayContent>
      );

      expect(container.querySelector('.eui-textTruncate')).toBeTruthy();
    });

    it('renders a text span wrapper if textProps is passed', () => {
      const { getByTestSubject, container } = render(
        <EuiButtonDisplayContent textProps={{ 'data-test-subj': 'testing' }}>
          <>Text</>
        </EuiButtonDisplayContent>
      );

      expect(getByTestSubject('testing')).toBeTruthy();
      expect(container.querySelector('.eui-textTruncate')).toBeTruthy();
    });

    it('does not render a text span wrapper if custom child with no textProps are passed', () => {
      const { getByTestSubject, container } = render(
        <EuiButtonDisplayContent>
          <span data-test-subj="custom">Text</span>
        </EuiButtonDisplayContent>
      );

      expect(getByTestSubject('custom')).toBeTruthy();
      expect(container.querySelector('.eui-textTruncate')).toBeFalsy();
    });
  });
});
