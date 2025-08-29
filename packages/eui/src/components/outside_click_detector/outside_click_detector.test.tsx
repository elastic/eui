/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { fireEvent } from '@testing-library/react';
import { render } from '../../test/rtl';

import { EuiOutsideClickDetector } from './outside_click_detector';

jest.mock('./../../services/accessibility', () => {
  return jest.requireActual('./../../services/accessibility');
});

describe('EuiOutsideClickDetector', () => {
  test('is rendered', () => {
    const { container } = render(
      <EuiOutsideClickDetector onOutsideClick={() => {}}>
        <div />
      </EuiOutsideClickDetector>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  describe('behavior', () => {
    test('nested detectors', () => {
      const unrelatedDetector = jest.fn();
      const parentDetector = jest.fn();
      const childDetector = jest.fn();

      const { getByTestSubject } = render(
        <div>
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

      fireEvent.mouseDown(getByTestSubject('target'));
      fireEvent.mouseUp(getByTestSubject('target'));

      expect(unrelatedDetector).toHaveBeenCalledTimes(1);
      expect(parentDetector).toHaveBeenCalledTimes(0);
      expect(childDetector).toHaveBeenCalledTimes(0);
    });
  });
});
