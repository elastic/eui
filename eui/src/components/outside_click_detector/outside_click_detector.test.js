import React from 'react';
import { render, mount } from 'enzyme';

import { EuiOutsideClickDetector } from './outside_click_detector';

describe('EuiOutsideClickDetector', () => {
  test('is rendered', () => {
    const component = render(
      <EuiOutsideClickDetector onOutsideClick={() => {}}>
        <div />
      </EuiOutsideClickDetector>
    );

    expect(component)
      .toMatchSnapshot();
  });

  describe('behavior', () => {
    test('nested detectors', () => {
      const unrelatedDetector = jest.fn();
      const parentDetector = jest.fn();
      const childDetector = jest.fn();

      // enzyme doesn't mount the components into the global jsdom `document`
      // but that's where the click detector listener is,
      // pass the top-level mounted component's click event on to document
      const triggerDocumentClick = e => {
        const event = new Event('click');
        event.euiGeneratedBy = e.nativeEvent.euiGeneratedBy;
        document.dispatchEvent(event);
      };

      const component = mount(
        <div onClick={triggerDocumentClick}>
          <div>
            <EuiOutsideClickDetector onOutsideClick={parentDetector}>
              <div>
                <EuiOutsideClickDetector onOutsideClick={childDetector}>
                  <div data-test-subj="target"/>
                </EuiOutsideClickDetector>
              </div>
            </EuiOutsideClickDetector>
          </div>

          <EuiOutsideClickDetector onOutsideClick={unrelatedDetector}>
            <div/>
          </EuiOutsideClickDetector>
        </div>
      );

      component.find('[data-test-subj="target"]').simulate('click');

      expect(unrelatedDetector).toHaveBeenCalledTimes(1);
      expect(parentDetector).toHaveBeenCalledTimes(0);
      expect(childDetector).toHaveBeenCalledTimes(0);
    });
  });
});
