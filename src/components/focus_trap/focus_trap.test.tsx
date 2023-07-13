/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { EventHandler } from 'react';
import { render, mount } from 'enzyme';

import { findTestSubject, takeMountedSnapshot } from '../../test';

import { EuiEvent } from '../outside_click_detector/outside_click_detector';
import { EuiFocusTrap } from './focus_trap';
import { EuiPortal } from '../portal';

describe('EuiFocusTrap', () => {
  test('is rendered', () => {
    const component = mount(
      <EuiFocusTrap>
        <div />
      </EuiFocusTrap>
    );

    expect(
      takeMountedSnapshot(component, { hasArrayOutput: true })
    ).toMatchSnapshot();
  });

  test('can be disabled', () => {
    const component = render(
      <EuiFocusTrap disabled>
        <div />
      </EuiFocusTrap>
    );

    expect(component).toMatchSnapshot();
  });

  test('accepts className and style', () => {
    const component = render(
      <EuiFocusTrap className="testing" style={{ height: '100%' }}>
        <div />
      </EuiFocusTrap>
    );

    expect(component).toMatchSnapshot();
  });

  describe('behavior', () => {
    describe('focus', () => {
      test('is set on the first focusable element by default', () => {
        const component = mount(
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

        expect(findTestSubject(component, 'input').getDOMNode()).toBe(
          document.activeElement
        );
      });

      test('will blur focus when negating `autoFocus`', () => {
        mount(
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

      test('is set on the element identified by `data-autofocus`', () => {
        const component = mount(
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

        expect(findTestSubject(component, 'input2').getDOMNode()).toBe(
          document.activeElement
        );
      });
    });
  });
});
