import React from 'react';
import { render, mount } from 'enzyme';

import { findTestSubject } from '../../test';

import { EuiFocusTrap } from './focus_trap';
import { EuiPortal } from '../portal';

describe('EuiFocusTrap', () => {
  test('is rendered', () => {
    const component = render(
      <EuiFocusTrap>
        <div />
      </EuiFocusTrap>
    );

    expect(component)
      .toMatchSnapshot();
  });

  test('can be disabled', () => {
    const component = render(
      <EuiFocusTrap disabled>
        <div />
      </EuiFocusTrap>
    );

    expect(component)
      .toMatchSnapshot();
  });

  test('can have outside click detection', () => {
    const component = render(
      <EuiFocusTrap clickOutsideDisables>
        <div />
      </EuiFocusTrap>
    );

    expect(component)
      .toMatchSnapshot();
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

        expect(findTestSubject(component, 'input').getDOMNode()).toBe(document.activeElement);
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

        expect(findTestSubject(component, 'input2').getDOMNode()).toBe(document.activeElement);
      });
    });

    describe('clickOutsideDisables', () => {
      // enzyme doesn't mount the components into the global jsdom `document`
      // but that's where the click detector listener is,
      // pass the top-level mounted component's click event on to document
      const triggerDocumentClick = e => {
        const event = new Event('click');
        event.euiGeneratedBy = e.nativeEvent.euiGeneratedBy;
        document.dispatchEvent(event);
      };

      test('trap remains enabled when false', (done) => {
        const component = mount(
          <div onClick={triggerDocumentClick}>
            <EuiFocusTrap>
              <div data-test-subj="container">
                <input data-test-subj="input" />
                <input data-test-subj="input2" />
              </div>
            </EuiFocusTrap>
            <button data-test-subj="outside" />
          </div>
        );

        findTestSubject(component, 'outside').simulate('click');
        setTimeout(() => {
          // `react-focus-lock` relies on real DOM events to move focus about.
          // Exposed attributes are the most consistent way to attain its state.
          // See https://github.com/theKashey/react-focus-lock/blob/master/_tests/FocusLock.spec.js for the lib in use
          expect(component.find('[data-focus-lock-disabled=false]').length).toBe(1);
          done();
        }, 10);
      });

      test('trap remains enabled after internal clicks', (done) => {
        const component = mount(
          <div onClick={triggerDocumentClick}>
            <EuiFocusTrap clickOutsideDisables>
              <div data-test-subj="container">
                <input data-test-subj="input" />
                <input data-test-subj="input2" />
              </div>
            </EuiFocusTrap>
            <button data-test-subj="outside" />
          </div>
        );

        findTestSubject(component, 'input2').simulate('click');
        setTimeout(() => {
          expect(component.find('[data-focus-lock-disabled=false]').length).toBe(1);
          done();
        }, 10);
      });

      test('trap remains enabled after internal portal clicks', (done) => {
        const component = mount(
          <div onClick={triggerDocumentClick}>
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

        findTestSubject(component, 'input3').simulate('click');
        setTimeout(() => {
          expect(component.find('[data-focus-lock-disabled=false]').length).toBe(1);
          done();
        }, 10);
      });

      test('trap becomes disabled on outside clicks', (done) => {
        const component = mount(
          <div onClick={triggerDocumentClick}>
            <EuiFocusTrap clickOutsideDisables>
              <div data-test-subj="container">
                <input data-test-subj="input" />
                <input data-test-subj="input2" />
              </div>
            </EuiFocusTrap>
            <button data-test-subj="outside" />
          </div>
        );

        findTestSubject(component, 'outside').simulate('click');
        setTimeout(() => {
          expect(component.find('[data-focus-lock-disabled=false]').length).toBe(0);
          done();
        }, 10);
      });
    });
  });
});
