/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { EventHandler, MouseEvent as ReactMouseEvent } from 'react';
import { render, mount } from 'enzyme';

import { EuiOutsideClickDetector, EuiEvent } from './outside_click_detector';

jest.mock('./../../services/accessibility', () => {
  return jest.requireActual('./../../services/accessibility');
});

describe('EuiOutsideClickDetector', () => {
  test('is rendered', () => {
    const component = render(
      <EuiOutsideClickDetector onOutsideClick={() => {}}>
        <div />
      </EuiOutsideClickDetector>
    );

    expect(component).toMatchSnapshot();
  });

  describe('behavior', () => {
    test('nested detectors', () => {
      const unrelatedDetector = jest.fn();
      const parentDetector = jest.fn();
      const childDetector = jest.fn();

      // enzyme doesn't mount the components into the global jsdom `document`
      // but that's where the click detector listener is,
      // pass the top-level mounted component's click event on to document
      const triggerDocumentMouseDown: EventHandler<any> = (
        e: ReactMouseEvent
      ) => {
        const event = new Event('mousedown') as EuiEvent;
        event.euiGeneratedBy = ((e.nativeEvent as unknown) as EuiEvent).euiGeneratedBy;
        document.dispatchEvent(event);
      };

      const triggerDocumentMouseUp: EventHandler<any> = (
        e: ReactMouseEvent
      ) => {
        const event = new Event('mouseup') as EuiEvent;
        event.euiGeneratedBy = ((e.nativeEvent as unknown) as EuiEvent).euiGeneratedBy;
        document.dispatchEvent(event);
      };

      const component = mount(
        <div
          onMouseDown={triggerDocumentMouseDown}
          onMouseUp={triggerDocumentMouseUp}>
          <div>
            <EuiOutsideClickDetector onOutsideClick={parentDetector}>
              <div>
                <EuiOutsideClickDetector onOutsideClick={childDetector}>
                  <div data-test-subj="target" />
                </EuiOutsideClickDetector>
              </div>
            </EuiOutsideClickDetector>
          </div>

          <EuiOutsideClickDetector onOutsideClick={unrelatedDetector}>
            <div />
          </EuiOutsideClickDetector>
        </div>
      );

      component.find('[data-test-subj="target"]').simulate('mousedown');
      component.find('[data-test-subj="target"]').simulate('mouseup');

      expect(unrelatedDetector).toHaveBeenCalledTimes(1);
      expect(parentDetector).toHaveBeenCalledTimes(0);
      expect(childDetector).toHaveBeenCalledTimes(0);
    });
  });
});
