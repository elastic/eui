/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { act } from '@testing-library/react';
import { testCustomHook } from '../../../../test/internal';
import { useHeaderIsInteractive } from './header_is_interactive';

describe('useHeaderIsInteractive', () => {
  const createMockGrid = () => {
    const mockGridEl = document.createElement('div');
    const mockHeaderEl = mockGridEl.appendChild(document.createElement('div'));
    mockHeaderEl.setAttribute('data-test-subj', 'dataGridHeader');

    return [mockGridEl, mockHeaderEl];
  };

  describe('initial headerIsInteractive state', () => {
    it('returns false when there are no interactive children within the header', () => {
      const [mockGridEl] = createMockGrid();
      const {
        return: { headerIsInteractive },
      } = testCustomHook(() => useHeaderIsInteractive(mockGridEl));

      expect(headerIsInteractive).toEqual(false);
    });

    it('returns true when there are interactive children within the header', () => {
      const [mockGridEl, mockHeaderEl] = createMockGrid();
      mockHeaderEl.appendChild(document.createElement('button')); // Interactive child

      const {
        return: { headerIsInteractive },
      } = testCustomHook(() => useHeaderIsInteractive(mockGridEl));

      expect(headerIsInteractive).toEqual(true);
    });
  });

  describe('handleHeaderMutation', () => {
    it('updates headerIsInteractive state by checking if tabbable elements exist in the header cell', () => {
      const [, mockHeaderEl] = createMockGrid();
      const mockCell = document.createElement('div');
      const mockTarget = mockCell.appendChild(document.createElement('div'));
      mockTarget.setAttribute('data-euigrid-tab-managed', 'true');
      mockHeaderEl.appendChild(mockCell);

      const {
        return: { headerIsInteractive, handleHeaderMutation },
        getUpdatedState,
      } = testCustomHook(() => useHeaderIsInteractive(null));
      expect(headerIsInteractive).toEqual(false);

      act(() => handleHeaderMutation([{ target: mockTarget }]));

      expect(getUpdatedState().headerIsInteractive).toEqual(true);
    });
  });
});
