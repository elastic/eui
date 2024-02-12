/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { render } from '../../test/rtl';
import { shouldRenderCustomStyles } from '../../test/internal';

import { EuiFocusTrap } from './focus_trap';

describe('EuiFocusTrap', () => {
  shouldRenderCustomStyles(<EuiFocusTrap>Test</EuiFocusTrap>);

  it('renders', () => {
    const { container } = render(
      <EuiFocusTrap>
        <div />
      </EuiFocusTrap>
    );

    expect(container).toMatchSnapshot();
  });

  it('can be disabled', () => {
    const { container } = render(
      <EuiFocusTrap disabled>
        <div />
      </EuiFocusTrap>
    );

    expect(container).toMatchSnapshot();
  });

  it('accepts className and style', () => {
    const { container } = render(
      <EuiFocusTrap className="testing" style={{ height: '100%' }}>
        <div />
      </EuiFocusTrap>
    );

    expect(container).toMatchSnapshot();
  });

  describe('behavior', () => {
    describe('focus', () => {
      it('is set on the first focusable element by default', () => {
        const { getByTestSubject } = render(
          <div>
            <input data-test-subj="outside" />
            <EuiFocusTrap>
              <div data-test-subj="container">
                <input data-test-subj="input" />
                <input data-test-subj="input2" />
              </div>
            </EuiFocusTrap>
          </div>
        );

        expect(getByTestSubject('input')).toBe(document.activeElement);
      });

      it('will blur focus when negating `autoFocus`', () => {
        render(
          <div>
            <input data-test-subj="outside" />
            <EuiFocusTrap autoFocus={false}>
              <div data-test-subj="container">
                <input data-test-subj="input" />
                <input data-test-subj="input2" />
              </div>
            </EuiFocusTrap>
          </div>
        );

        expect(document.body).toBe(document.activeElement);
      });

      it('is set on the element identified by `data-autofocus`', () => {
        const { getByTestSubject } = render(
          <div>
            <input data-test-subj="outside" />
            <EuiFocusTrap>
              <div data-test-subj="container">
                <input data-test-subj="input" />
                <input data-autofocus data-test-subj="input2" />
              </div>
            </EuiFocusTrap>
          </div>
        );

        expect(getByTestSubject('input2')).toBe(document.activeElement);
      });
    });
  });
});
