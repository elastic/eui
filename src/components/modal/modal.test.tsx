/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { render, screen } from '../../test/rtl';
import { requiredProps } from '../../test';
import { shouldRenderCustomStyles } from '../../test/internal';

import { EuiModal } from './modal';

describe('EuiModal', () => {
  shouldRenderCustomStyles(<EuiModal onClose={() => {}}>children</EuiModal>);

  it('renders', () => {
    const { baseElement } = render(
      <EuiModal onClose={() => {}} {...requiredProps}>
        children
      </EuiModal>
    );

    // NOTE: Using baseElement instead of container is required for components that use portals
    expect(baseElement).toMatchSnapshot();
  });

  describe('maxWidth', () => {
    it('true/undefined should apply the `defaultMaxWidth` class and no inline style', () => {
      render(
        <>
          <EuiModal onClose={() => {}} data-test-subj="A" maxWidth={true}>
            children
          </EuiModal>
          <EuiModal onClose={() => {}} data-test-subj="B">
            children
          </EuiModal>
        </>
      );
      const modalA = screen.queryByTestSubject('A')!;
      const modalB = screen.queryByTestSubject('B')!;

      expect(modalA.className).toContain('defaultMaxWidth');
      expect(modalB.className).toContain('defaultMaxWidth');
      expect(modalA.getAttribute('style')).toBeNull();
      expect(modalB.getAttribute('style')).toBeNull();
    });

    test('false should not apply either the `defaultMaxWidth` class or an inline style', () => {
      render(
        <EuiModal onClose={() => {}} data-test-subj="A" maxWidth={false}>
          children
        </EuiModal>
      );
      const modal = screen.queryByTestSubject('A')!;

      expect(modal.className).not.toContain('defaultMaxWidth');
      expect(modal.getAttribute('style')).toBeNull();
    });

    test('custom max width should not apply the `defaultMaxWidth` but should apply an inline style', () => {
      render(
        <>
          <EuiModal onClose={() => {}} data-test-subj="A" maxWidth={300}>
            children
          </EuiModal>
          <EuiModal onClose={() => {}} data-test-subj="B" maxWidth="50%">
            children
          </EuiModal>
        </>
      );
      const modalA = screen.queryByTestSubject('A')!;
      const modalB = screen.queryByTestSubject('B')!;

      expect(modalA.className).not.toContain('defaultMaxWidth');
      expect(modalB.className).not.toContain('defaultMaxWidth');
      expect(modalA.getAttribute('style')).toEqual('max-inline-size: 300px;');
      expect(modalB.getAttribute('style')).toEqual('max-inline-size: 50%;');
    });
  });
});
