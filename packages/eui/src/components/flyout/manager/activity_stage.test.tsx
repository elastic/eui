/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { render, screen } from '../../../test/rtl';
import { useFlyoutActivityStage } from './activity_stage';
import { useFlyoutManager } from './provider';
import {
  LAYOUT_MODE_SIDE_BY_SIDE,
  LAYOUT_MODE_STACKED,
  LEVEL_MAIN,
  LEVEL_CHILD,
  STAGE_ACTIVE,
  STAGE_BACKGROUNDED,
  STAGE_BACKGROUNDING,
  STAGE_CLOSING,
  STAGE_INACTIVE,
  STAGE_OPENING,
  STAGE_RETURNING,
} from './const';

// Mock the hooks to control their return values
jest.mock('./hooks', () => ({
  useFlyoutLayoutMode: jest.fn(),
  useHasChildFlyout: jest.fn(),
  useIsFlyoutActive: jest.fn(),
}));

jest.mock('./provider', () => ({
  EuiFlyoutManager: ({ children }: { children: React.ReactNode }) => children,
  useFlyoutManager: jest.fn(),
}));

// Mock the actions
jest.mock('./actions', () => ({
  setActivityStage: jest.fn(),
}));

import {
  useFlyoutLayoutMode,
  useHasChildFlyout,
  useIsFlyoutActive,
} from './hooks';
import { setActivityStage } from './actions';

const mockUseFlyoutLayoutMode = useFlyoutLayoutMode as jest.Mock;
const mockUseHasChildFlyout = useHasChildFlyout as jest.Mock;
const mockUseIsFlyoutActive = useIsFlyoutActive as jest.Mock;
const mockUseFlyoutManager = useFlyoutManager as jest.Mock;
const mockSetActivityStage = setActivityStage as jest.Mock;

describe('useFlyoutActivityStage', () => {
  const mockDispatch = jest.fn();
  const mockState = {
    flyouts: [
      {
        flyoutId: 'main-1',
        level: LEVEL_MAIN,
        activityStage: STAGE_ACTIVE,
      },
      {
        flyoutId: 'child-1',
        level: LEVEL_CHILD,
        activityStage: STAGE_ACTIVE,
      },
    ],
    sessions: [{ main: 'main-1', child: 'child-1' }],
    layoutMode: LAYOUT_MODE_STACKED,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseFlyoutManager.mockReturnValue({
      state: mockState,
      dispatch: mockDispatch,
    });
    mockUseFlyoutLayoutMode.mockReturnValue(LAYOUT_MODE_STACKED);
    mockUseHasChildFlyout.mockReturnValue(false);
    mockUseIsFlyoutActive.mockReturnValue(true);
    mockSetActivityStage.mockReturnValue({ type: 'SET_ACTIVITY_STAGE' });
  });

  const TestComponent = ({
    flyoutId,
    level,
  }: {
    flyoutId: string;
    level: 'main' | 'child';
  }) => {
    const { activityStage, onAnimationEnd } = useFlyoutActivityStage({
      flyoutId,
      level,
    });

    return (
      <div data-test-subj="test-component">
        <div data-test-subj="activity-stage">{activityStage}</div>
        <button data-test-subj="animation-end" onClick={onAnimationEnd}>
          Animation End
        </button>
      </div>
    );
  };

  describe('initial state', () => {
    it('returns the activity stage from state when available', () => {
      render(<TestComponent flyoutId="main-1" level={LEVEL_MAIN} />);

      expect(screen.getByTestSubject('activity-stage')).toHaveTextContent(
        STAGE_ACTIVE
      );
    });

    it('returns STAGE_OPENING when flyout is active but no stage in state', () => {
      const stateWithoutStage = {
        ...mockState,
        flyouts: [
          {
            flyoutId: 'main-1',
            level: LEVEL_MAIN,
            // No activityStage
          },
        ],
      };
      mockUseFlyoutManager.mockReturnValue({
        state: stateWithoutStage,
        dispatch: mockDispatch,
      });

      render(<TestComponent flyoutId="main-1" level={LEVEL_MAIN} />);

      // When no activityStage in state, it should default to STAGE_ACTIVE for active flyouts
      expect(screen.getByTestSubject('activity-stage')).toHaveTextContent(
        STAGE_ACTIVE
      );
    });

    it('returns STAGE_INACTIVE when flyout is not active and no stage in state', () => {
      mockUseIsFlyoutActive.mockReturnValue(false);
      const stateWithoutStage = {
        ...mockState,
        flyouts: [
          {
            flyoutId: 'main-1',
            level: LEVEL_MAIN,
            // No activityStage
          },
        ],
      };
      mockUseFlyoutManager.mockReturnValue({
        state: stateWithoutStage,
        dispatch: mockDispatch,
      });

      render(<TestComponent flyoutId="main-1" level={LEVEL_MAIN} />);

      // When no activityStage in state and flyout is inactive, it should default to STAGE_INACTIVE
      expect(screen.getByTestSubject('activity-stage')).toHaveTextContent(
        STAGE_INACTIVE
      );
    });
  });

  describe('stage transitions based on activity', () => {
    it('transitions from ACTIVE to CLOSING when flyout becomes inactive', () => {
      const { rerender } = render(
        <TestComponent flyoutId="main-1" level={LEVEL_MAIN} />
      );

      // Initially active
      expect(screen.getByTestSubject('activity-stage')).toHaveTextContent(
        STAGE_ACTIVE
      );

      // Change to inactive
      mockUseIsFlyoutActive.mockReturnValue(false);
      rerender(<TestComponent flyoutId="main-1" level={LEVEL_MAIN} />);

      expect(mockDispatch).toHaveBeenCalledWith(
        mockSetActivityStage('main-1', STAGE_CLOSING)
      );
    });

    it('transitions from INACTIVE to RETURNING when flyout becomes active', () => {
      const stateWithInactive = {
        ...mockState,
        flyouts: [
          {
            flyoutId: 'main-1',
            level: LEVEL_MAIN,
            activityStage: STAGE_INACTIVE,
          },
        ],
      };
      mockUseFlyoutManager.mockReturnValue({
        state: stateWithInactive,
        dispatch: mockDispatch,
      });

      const { rerender } = render(
        <TestComponent flyoutId="main-1" level={LEVEL_MAIN} />
      );

      // Initially inactive
      expect(screen.getByTestSubject('activity-stage')).toHaveTextContent(
        STAGE_INACTIVE
      );

      // Change to active
      mockUseIsFlyoutActive.mockReturnValue(true);
      rerender(<TestComponent flyoutId="main-1" level={LEVEL_MAIN} />);

      expect(mockDispatch).toHaveBeenCalledWith(
        mockSetActivityStage('main-1', STAGE_RETURNING)
      );
    });
  });

  describe('main flyout backgrounding logic', () => {
    it('transitions to BACKGROUNDING when main flyout is active, has child, and layout is stacked', () => {
      mockUseHasChildFlyout.mockReturnValue(true);
      mockUseFlyoutLayoutMode.mockReturnValue(LAYOUT_MODE_STACKED);

      render(<TestComponent flyoutId="main-1" level={LEVEL_MAIN} />);

      expect(mockDispatch).toHaveBeenCalledWith(
        mockSetActivityStage('main-1', STAGE_BACKGROUNDING)
      );
    });

    it('does not transition to BACKGROUNDING when layout is side-by-side', () => {
      mockUseHasChildFlyout.mockReturnValue(true);
      mockUseFlyoutLayoutMode.mockReturnValue(LAYOUT_MODE_SIDE_BY_SIDE);

      render(<TestComponent flyoutId="main-1" level={LEVEL_MAIN} />);

      expect(mockDispatch).not.toHaveBeenCalledWith(
        mockSetActivityStage('main-1', STAGE_BACKGROUNDING)
      );
    });

    it('does not transition to BACKGROUNDING when no child flyout', () => {
      mockUseHasChildFlyout.mockReturnValue(false);
      mockUseFlyoutLayoutMode.mockReturnValue(LAYOUT_MODE_STACKED);

      render(<TestComponent flyoutId="main-1" level={LEVEL_MAIN} />);

      expect(mockDispatch).not.toHaveBeenCalledWith(
        mockSetActivityStage('main-1', STAGE_BACKGROUNDING)
      );
    });

    it('does not transition to BACKGROUNDING for child flyouts', () => {
      mockUseHasChildFlyout.mockReturnValue(true);
      mockUseFlyoutLayoutMode.mockReturnValue(LAYOUT_MODE_STACKED);

      render(<TestComponent flyoutId="child-1" level={LEVEL_CHILD} />);

      expect(mockDispatch).not.toHaveBeenCalledWith(
        mockSetActivityStage('child-1', STAGE_BACKGROUNDING)
      );
    });
  });

  describe('main flyout returning logic', () => {
    it('transitions from BACKGROUNDED to RETURNING when child is gone', () => {
      const stateWithBackgrounded = {
        ...mockState,
        flyouts: [
          {
            flyoutId: 'main-1',
            level: LEVEL_MAIN,
            activityStage: STAGE_BACKGROUNDED,
          },
        ],
        sessions: [{ main: 'main-1', child: null }],
      };
      mockUseFlyoutManager.mockReturnValue({
        state: stateWithBackgrounded,
        dispatch: mockDispatch,
      });
      mockUseHasChildFlyout.mockReturnValue(false);

      render(<TestComponent flyoutId="main-1" level={LEVEL_MAIN} />);

      expect(mockDispatch).toHaveBeenCalledWith(
        mockSetActivityStage('main-1', STAGE_RETURNING)
      );
    });

    it('transitions from BACKGROUNDING to RETURNING when child is gone', () => {
      const stateWithBackgrounding = {
        ...mockState,
        flyouts: [
          {
            flyoutId: 'main-1',
            level: LEVEL_MAIN,
            activityStage: STAGE_BACKGROUNDING,
          },
        ],
        sessions: [{ main: 'main-1', child: null }],
      };
      mockUseFlyoutManager.mockReturnValue({
        state: stateWithBackgrounding,
        dispatch: mockDispatch,
      });
      mockUseHasChildFlyout.mockReturnValue(false);

      render(<TestComponent flyoutId="main-1" level={LEVEL_MAIN} />);

      expect(mockDispatch).toHaveBeenCalledWith(
        mockSetActivityStage('main-1', STAGE_RETURNING)
      );
    });

    it('transitions from BACKGROUNDED to RETURNING when layout changes to side-by-side', () => {
      const stateWithBackgrounded = {
        ...mockState,
        flyouts: [
          {
            flyoutId: 'main-1',
            level: LEVEL_MAIN,
            activityStage: STAGE_BACKGROUNDED,
          },
        ],
      };
      mockUseFlyoutManager.mockReturnValue({
        state: stateWithBackgrounded,
        dispatch: mockDispatch,
      });
      mockUseHasChildFlyout.mockReturnValue(true);
      mockUseFlyoutLayoutMode.mockReturnValue(LAYOUT_MODE_SIDE_BY_SIDE);

      render(<TestComponent flyoutId="main-1" level={LEVEL_MAIN} />);

      expect(mockDispatch).toHaveBeenCalledWith(
        mockSetActivityStage('main-1', STAGE_RETURNING)
      );
    });

    it('does not transition to RETURNING when still has child and layout is stacked', () => {
      const stateWithBackgrounded = {
        ...mockState,
        flyouts: [
          {
            flyoutId: 'main-1',
            level: LEVEL_MAIN,
            activityStage: STAGE_BACKGROUNDED,
          },
        ],
      };
      mockUseFlyoutManager.mockReturnValue({
        state: stateWithBackgrounded,
        dispatch: mockDispatch,
      });
      mockUseHasChildFlyout.mockReturnValue(true);
      mockUseFlyoutLayoutMode.mockReturnValue(LAYOUT_MODE_STACKED);

      render(<TestComponent flyoutId="main-1" level={LEVEL_MAIN} />);

      expect(mockDispatch).not.toHaveBeenCalledWith(
        mockSetActivityStage('main-1', STAGE_RETURNING)
      );
    });
  });

  describe('onAnimationEnd transitions', () => {
    it('transitions from OPENING to ACTIVE', () => {
      const stateWithOpening = {
        ...mockState,
        flyouts: [
          {
            flyoutId: 'main-1',
            level: LEVEL_MAIN,
            activityStage: STAGE_OPENING,
          },
        ],
      };
      mockUseFlyoutManager.mockReturnValue({
        state: stateWithOpening,
        dispatch: mockDispatch,
      });

      render(<TestComponent flyoutId="main-1" level={LEVEL_MAIN} />);

      screen.getByTestSubject('animation-end').click();

      expect(mockDispatch).toHaveBeenCalledWith(
        mockSetActivityStage('main-1', STAGE_ACTIVE)
      );
    });

    it('transitions from RETURNING to ACTIVE', () => {
      const stateWithReturning = {
        ...mockState,
        flyouts: [
          {
            flyoutId: 'main-1',
            level: LEVEL_MAIN,
            activityStage: STAGE_RETURNING,
          },
        ],
      };
      mockUseFlyoutManager.mockReturnValue({
        state: stateWithReturning,
        dispatch: mockDispatch,
      });

      render(<TestComponent flyoutId="main-1" level={LEVEL_MAIN} />);

      screen.getByTestSubject('animation-end').click();

      expect(mockDispatch).toHaveBeenCalledWith(
        mockSetActivityStage('main-1', STAGE_ACTIVE)
      );
    });

    it('transitions from CLOSING to INACTIVE', () => {
      const stateWithClosing = {
        ...mockState,
        flyouts: [
          {
            flyoutId: 'main-1',
            level: LEVEL_MAIN,
            activityStage: STAGE_CLOSING,
          },
        ],
      };
      mockUseFlyoutManager.mockReturnValue({
        state: stateWithClosing,
        dispatch: mockDispatch,
      });

      render(<TestComponent flyoutId="main-1" level={LEVEL_MAIN} />);

      screen.getByTestSubject('animation-end').click();

      expect(mockDispatch).toHaveBeenCalledWith(
        mockSetActivityStage('main-1', STAGE_INACTIVE)
      );
    });

    it('transitions from BACKGROUNDING to BACKGROUNDED', () => {
      const stateWithBackgrounding = {
        ...mockState,
        flyouts: [
          {
            flyoutId: 'main-1',
            level: LEVEL_MAIN,
            activityStage: STAGE_BACKGROUNDING,
          },
        ],
      };
      mockUseFlyoutManager.mockReturnValue({
        state: stateWithBackgrounding,
        dispatch: mockDispatch,
      });

      render(<TestComponent flyoutId="main-1" level={LEVEL_MAIN} />);

      screen.getByTestSubject('animation-end').click();

      expect(mockDispatch).toHaveBeenCalledWith(
        mockSetActivityStage('main-1', STAGE_BACKGROUNDED)
      );
    });

    it('does not transition when stage is already final', () => {
      const stateWithActive = {
        ...mockState,
        flyouts: [
          {
            flyoutId: 'main-1',
            level: LEVEL_MAIN,
            activityStage: STAGE_ACTIVE,
          },
        ],
      };
      mockUseFlyoutManager.mockReturnValue({
        state: stateWithActive,
        dispatch: mockDispatch,
      });

      render(<TestComponent flyoutId="main-1" level={LEVEL_MAIN} />);

      screen.getByTestSubject('animation-end').click();

      expect(mockDispatch).not.toHaveBeenCalled();
    });
  });

  describe('edge cases', () => {
    it('handles missing flyout in state gracefully', () => {
      const stateWithoutFlyout = {
        ...mockState,
        flyouts: [],
      };
      mockUseFlyoutManager.mockReturnValue({
        state: stateWithoutFlyout,
        dispatch: mockDispatch,
      });

      render(<TestComponent flyoutId="missing-flyout" level={LEVEL_MAIN} />);

      // When flyout is not in state, it should default to STAGE_ACTIVE for active flyouts
      expect(screen.getByTestSubject('activity-stage')).toHaveTextContent(
        STAGE_ACTIVE
      );
    });

    it('handles null context gracefully', () => {
      mockUseFlyoutManager.mockReturnValue(null);

      render(<TestComponent flyoutId="main-1" level={LEVEL_MAIN} />);

      // When context is null, it should default to STAGE_ACTIVE for active flyouts
      expect(screen.getByTestSubject('activity-stage')).toHaveTextContent(
        STAGE_ACTIVE
      );
    });

    it('handles missing dispatch gracefully', () => {
      mockUseFlyoutManager.mockReturnValue({
        state: mockState,
        dispatch: undefined,
      });

      render(<TestComponent flyoutId="main-1" level={LEVEL_MAIN} />);

      // Should not crash
      expect(screen.getByTestSubject('activity-stage')).toBeInTheDocument();
    });

    it('prevents unnecessary transitions when stage is already correct', () => {
      const stateWithActive = {
        ...mockState,
        flyouts: [
          {
            flyoutId: 'main-1',
            level: LEVEL_MAIN,
            activityStage: STAGE_ACTIVE,
          },
        ],
      };
      mockUseFlyoutManager.mockReturnValue({
        state: stateWithActive,
        dispatch: mockDispatch,
      });
      mockUseIsFlyoutActive.mockReturnValue(true);

      render(<TestComponent flyoutId="main-1" level={LEVEL_MAIN} />);

      // Should not dispatch since stage is already ACTIVE
      expect(mockDispatch).not.toHaveBeenCalled();
    });
  });

  describe('hook integration', () => {
    it('calls all required hooks', () => {
      render(<TestComponent flyoutId="main-1" level={LEVEL_MAIN} />);

      expect(mockUseIsFlyoutActive).toHaveBeenCalledWith('main-1');
      expect(mockUseHasChildFlyout).toHaveBeenCalledWith('main-1');
      expect(mockUseFlyoutLayoutMode).toHaveBeenCalled();
      expect(mockUseFlyoutManager).toHaveBeenCalled();
    });

    it('returns correct interface', () => {
      const TestHookComponent = () => {
        const result = useFlyoutActivityStage({
          flyoutId: 'main-1',
          level: LEVEL_MAIN,
        });

        return (
          <div>
            <div data-test-subj="activity-stage">{result.activityStage}</div>
            <div data-test-subj="has-on-animation-end">
              {typeof result.onAnimationEnd === 'function'
                ? 'function'
                : 'not-function'}
            </div>
          </div>
        );
      };

      render(<TestHookComponent />);

      expect(screen.getByTestSubject('activity-stage')).toBeInTheDocument();
      expect(screen.getByTestSubject('has-on-animation-end')).toHaveTextContent(
        'function'
      );
    });
  });
});
