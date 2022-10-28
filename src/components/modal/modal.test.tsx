/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { fireEvent } from '@testing-library/dom';
import { render } from '../../test/rtl';
import { requiredProps } from '../../test';

import { EuiModal } from './modal';

describe('EuiModal', () => {
  it('renders', () => {
    const { baseElement } = render(
      <EuiModal onClose={() => {}} {...requiredProps}>
        children
      </EuiModal>
    );

    // NOTE: Using baseElement instead of container is required for components that use portals
    expect(baseElement).toMatchSnapshot();
  });

  // TODO: Remove this onFocus scroll workaround after react-focus-on supports focusOptions
  // @see https://github.com/elastic/eui/issues/6304
  describe('focus/scroll workaround', () => {
    it('scrolls back to the original window position on initial modal focus', () => {
      window.scrollTo = jest.fn();

      const { getByTestSubject } = render(
        <EuiModal data-test-subj="modal" onClose={() => {}}>
          children
        </EuiModal>
      );

      // For whatever reason, react-focus-lock doesn't appear to trigger focus in RTL so we'll do it manually
      fireEvent.focusIn(getByTestSubject('modal'));
      // Confirm that scrolling does not occur more than once
      fireEvent.focusIn(getByTestSubject('modal'));
      fireEvent.focusIn(getByTestSubject('modal'));

      expect(window.scrollTo).toHaveBeenCalledTimes(1);
      jest.restoreAllMocks();
    });
  });
});
