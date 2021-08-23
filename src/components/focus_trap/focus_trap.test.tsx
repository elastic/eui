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

    // skipping because react-focus-on / react-focus-lock uses two handlers,
    // one on the container to record what element was clicked and a second
    // on the document, checking if the event target is the same on both
    // because enzyme doesn't bubble the event, it is difficult to simulate
    // the browser behaviour - we can revisit these tests when we have an
    // actual browser environment
    describe.skip('clickOutsideDisables', () => {
      // enzyme doesn't mount the components into the global jsdom `document`
      // but that's where the click detector listener is,
      // pass the top-level mounted component's click event on to document
      const triggerDocumentMouseDown: EventHandler<any> = (
        e: React.MouseEvent
      ) => {
        const event = new Event('mousedown') as EuiEvent;
        event.euiGeneratedBy = ((e.nativeEvent as unknown) as EuiEvent).euiGeneratedBy;
        document.dispatchEvent(event);
      };

      const triggerDocumentMouseUp: EventHandler<any> = (
        e: React.MouseEvent
      ) => {
        const event = new Event('mousedown') as EuiEvent;
        event.euiGeneratedBy = ((e.nativeEvent as unknown) as EuiEvent).euiGeneratedBy;
        document.dispatchEvent(event);
      };

      test('trap remains enabled when false', () => {
        const component = mount(
          <div
            onMouseDown={triggerDocumentMouseDown}
            onMouseUp={triggerDocumentMouseUp}
          >
            <EuiFocusTrap>
              <div data-test-subj="container">
                <input data-test-subj="input" />
                <input data-test-subj="input2" />
              </div>
            </EuiFocusTrap>
            <button data-test-subj="outside" />
          </div>
        );

        // The existence of `data-focus-lock-disabled=false` indicates that the trap is enabled.
        expect(
          component.find('[data-focus-lock-disabled=false]').length
        ).not.toBeLessThan(1);
        findTestSubject(component, 'outside').simulate('mousedown');
        findTestSubject(component, 'outside').simulate('mouseup');
        // `react-focus-lock` relies on real DOM events to move focus about.
        // Exposed attributes are the most consistent way to attain its state.
        // See https://github.com/theKashey/react-focus-lock/blob/master/_tests/FocusLock.spec.js for the lib in use
        // Trap remains enabled
        expect(
          component.find('[data-focus-lock-disabled=false]').length
        ).not.toBeLessThan(1);
      });

      test('trap remains enabled after internal clicks', () => {
        const component = mount(
          <div
            onMouseDown={triggerDocumentMouseDown}
            onMouseUp={triggerDocumentMouseUp}
          >
            <EuiFocusTrap clickOutsideDisables>
              <div data-test-subj="container">
                <input data-test-subj="input" />
                <input data-test-subj="input2" />
              </div>
            </EuiFocusTrap>
            <button data-test-subj="outside" />
          </div>
        );

        expect(
          component.find('[data-focus-lock-disabled=false]').length
        ).not.toBeLessThan(1);
        findTestSubject(component, 'input2').simulate('mousedown');
        findTestSubject(component, 'input2').simulate('mouseup');
        // Trap remains enabled
        expect(
          component.find('[data-focus-lock-disabled=false]').length
        ).not.toBeLessThan(1);
      });

      test('trap remains enabled after internal portal clicks', () => {
        const component = mount(
          <div
            onMouseDown={triggerDocumentMouseDown}
            onMouseUp={triggerDocumentMouseUp}
          >
            <EuiFocusTrap clickOutsideDisables>
              <div data-test-subj="container">
                <input data-test-subj="input" />
                <input data-test-subj="input2" />
                <EuiPortal>
                  <input data-test-subj="input3" />
                </EuiPortal>
              </div>
            </EuiFocusTrap>
            <button data-test-subj="outside" />
          </div>
        );

        expect(
          component.find('[data-focus-lock-disabled=false]').length
        ).not.toBeLessThan(1);
        findTestSubject(component, 'input3').simulate('mousedown');
        findTestSubject(component, 'input3').simulate('mouseup');
        // Trap remains enabled
        expect(
          component.find('[data-focus-lock-disabled=false]').length
        ).not.toBeLessThan(1);
      });

      test('trap becomes disabled on outside clicks', () => {
        const component = mount(
          <div
            onMouseDown={triggerDocumentMouseDown}
            onMouseUp={triggerDocumentMouseUp}
          >
            <EuiFocusTrap clickOutsideDisables>
              <div data-test-subj="container">
                <input data-test-subj="input" />
                <input data-test-subj="input2" />
              </div>
            </EuiFocusTrap>
            <button data-test-subj="outside" />
          </div>
        );

        expect(
          component.find('[data-focus-lock-disabled=false]').length
        ).not.toBeLessThan(1);
        findTestSubject(component, 'outside').simulate('mousedown');
        findTestSubject(component, 'outside').simulate('mouseup');
        // Trap becomes disabled
        expect(component.find('[data-focus-lock-disabled=false]').length).toBe(
          0
        );
      });
    });
  });
});
