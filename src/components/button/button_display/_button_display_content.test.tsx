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

  describe('button icon', () => {
    it('renders icons on the left side by default', () => {
      const { container, queryByTestSubject } = render(
        <EuiButtonDisplayContent iconType="user">
          <span data-test-subj="content" />
        </EuiButtonDisplayContent>
      );

      expect(container.firstChild).toMatchSnapshot();
      expect(queryByTestSubject('content')?.previousSibling).toBeTruthy();
      expect(queryByTestSubject('content')?.nextSibling).toBeFalsy();
    });

    it('renders icons on the right side', () => {
      const { container, queryByTestSubject } = render(
        <EuiButtonDisplayContent iconType="user" iconSide="right">
          <span data-test-subj="content" />
        </EuiButtonDisplayContent>
      );

      expect(container.firstChild).toMatchSnapshot();
      expect(queryByTestSubject('content')?.previousSibling).toBeFalsy();
      expect(queryByTestSubject('content')?.nextSibling).toBeTruthy();
    });

    describe('loading icon', () => {
      it('replaces existing icons', () => {
        const { container } = render(
          <EuiButtonDisplayContent iconType="user" isLoading>
            Loading
          </EuiButtonDisplayContent>
        );

        expect(container.firstChild).toMatchSnapshot();
        expect(container.querySelector('.euiLoadingSpinner')).toBeTruthy();
      });

      it('renders disabled & loading spinners with custom border color', () => {
        const { container } = render(
          <EuiButtonDisplayContent isLoading isDisabled>
            Loading
          </EuiButtonDisplayContent>
        );

        expect(container.firstChild).toMatchSnapshot();
      });
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
