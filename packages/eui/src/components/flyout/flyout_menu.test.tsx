/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { render, screen } from '../../test/rtl';
import { requiredProps } from '../../test/required_props';

import { EuiFlyoutMenu } from './flyout_menu';
import { EuiFlyoutMenuContext } from './flyout_menu_context';
import { EuiFlyoutManagerContext } from './manager/provider';
import { LEVEL_MAIN, LEVEL_CHILD } from './manager/const';

describe('EuiFlyoutMenu', () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    mockOnClose.mockClear();
  });

  describe('basic rendering', () => {
    it('renders without context', () => {
      const { container } = render(
        <EuiFlyoutMenu {...requiredProps} title="Test Title" />
      );

      expect(container.querySelector('.euiFlyoutMenu')).toBeInTheDocument();
      expect(screen.getByText('Test Title')).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: /close/i })
      ).toBeInTheDocument();
    });

    it('renders with a title', () => {
      render(<EuiFlyoutMenu title="Test Title" />);

      expect(screen.getByText('Test Title')).toBeInTheDocument();
    });

    it('renders without a title', () => {
      const { container } = render(<EuiFlyoutMenu />);

      expect(container.querySelector('.euiTitle')).not.toBeInTheDocument();
    });

    it('renders a close button by default', () => {
      render(<EuiFlyoutMenu title="Test" />);

      expect(
        screen.getByRole('button', { name: /close/i })
      ).toBeInTheDocument();
    });
  });

  describe('props', () => {
    it('hides the close button when hideCloseButton is true', () => {
      render(<EuiFlyoutMenu title="Test" hideCloseButton />);

      expect(
        screen.queryByRole('button', { name: /close/i })
      ).not.toBeInTheDocument();
    });

    it('renders custom actions', () => {
      const customActions = [
        {
          iconType: 'gear',
          onClick: jest.fn(),
          'aria-label': 'Settings',
        },
        {
          iconType: 'broom',
          onClick: jest.fn(),
          'aria-label': 'Clean',
        },
      ];

      render(<EuiFlyoutMenu title="Test" customActions={customActions} />);

      expect(screen.getByLabelText('Settings')).toBeInTheDocument();
      expect(screen.getByLabelText('Clean')).toBeInTheDocument();
    });

    it('applies titleId to the title element', () => {
      const { container } = render(
        <EuiFlyoutMenu title="Test" titleId="custom-id" />
      );

      const title = container.querySelector('#custom-id');
      expect(title).toBeInTheDocument();
      expect(title).toHaveClass('euiTitle');
    });
  });

  describe('context integration', () => {
    const mockHistoryItems = [
      { title: 'First', onClick: jest.fn() },
      { title: 'Second', onClick: jest.fn() },
      { title: 'Third', onClick: jest.fn() },
    ];

    const mockManagerContext = {
      historyItems: mockHistoryItems,
      goBack: jest.fn(),
    } as any;

    describe('with main flyout context', () => {
      it('shows back button when level is LEVEL_MAIN and history items exist', () => {
        const mockMenuContext = {
          level: LEVEL_MAIN as typeof LEVEL_MAIN,
          onClose: mockOnClose,
        };

        render(
          <EuiFlyoutManagerContext.Provider value={mockManagerContext}>
            <EuiFlyoutMenuContext.Provider value={mockMenuContext}>
              <EuiFlyoutMenu title="Test" />
            </EuiFlyoutMenuContext.Provider>
          </EuiFlyoutManagerContext.Provider>
        );

        expect(screen.getByText('Back')).toBeInTheDocument();
      });

      it('shows history popover when level is LEVEL_MAIN and history items exist', () => {
        const mockMenuContext = {
          level: LEVEL_MAIN as typeof LEVEL_MAIN,
          onClose: mockOnClose,
        };

        render(
          <EuiFlyoutManagerContext.Provider value={mockManagerContext}>
            <EuiFlyoutMenuContext.Provider value={mockMenuContext}>
              <EuiFlyoutMenu title="Test" />
            </EuiFlyoutMenuContext.Provider>
          </EuiFlyoutManagerContext.Provider>
        );

        expect(screen.getByLabelText('History')).toBeInTheDocument();
      });

      it('hides back button when hideBackButton is true', () => {
        const mockMenuContext = {
          level: LEVEL_MAIN as typeof LEVEL_MAIN,
          onClose: mockOnClose,
        };

        render(
          <EuiFlyoutManagerContext.Provider value={mockManagerContext}>
            <EuiFlyoutMenuContext.Provider value={mockMenuContext}>
              <EuiFlyoutMenu title="Test" hideBackButton />
            </EuiFlyoutMenuContext.Provider>
          </EuiFlyoutManagerContext.Provider>
        );

        expect(screen.queryByText('Back')).not.toBeInTheDocument();
      });
    });

    describe('with child flyout context', () => {
      it('does not show back button when level is LEVEL_CHILD', () => {
        const mockMenuContext = {
          level: LEVEL_CHILD as typeof LEVEL_CHILD,
          onClose: mockOnClose,
        };

        render(
          <EuiFlyoutManagerContext.Provider value={mockManagerContext}>
            <EuiFlyoutMenuContext.Provider value={mockMenuContext}>
              <EuiFlyoutMenu title="Test" />
            </EuiFlyoutMenuContext.Provider>
          </EuiFlyoutManagerContext.Provider>
        );

        expect(screen.queryByText('Back')).not.toBeInTheDocument();
      });

      it('does not show history popover when level is LEVEL_CHILD', () => {
        const mockMenuContext = {
          level: LEVEL_CHILD as typeof LEVEL_CHILD,
          onClose: mockOnClose,
        };

        render(
          <EuiFlyoutManagerContext.Provider value={mockManagerContext}>
            <EuiFlyoutMenuContext.Provider value={mockMenuContext}>
              <EuiFlyoutMenu title="Test" />
            </EuiFlyoutMenuContext.Provider>
          </EuiFlyoutManagerContext.Provider>
        );

        expect(screen.queryByLabelText('History')).not.toBeInTheDocument();
      });
    });

    describe('without manager context', () => {
      it('renders without back button when manager context is null', () => {
        const mockMenuContext = {
          level: LEVEL_MAIN as typeof LEVEL_MAIN,
          onClose: mockOnClose,
        };

        render(
          <EuiFlyoutMenuContext.Provider value={mockMenuContext}>
            <EuiFlyoutMenu title="Test" />
          </EuiFlyoutMenuContext.Provider>
        );

        expect(screen.queryByText('Back')).not.toBeInTheDocument();
      });

      it('renders without history popover when manager context is null', () => {
        const mockMenuContext = {
          level: LEVEL_MAIN as typeof LEVEL_MAIN,
          onClose: mockOnClose,
        };

        render(
          <EuiFlyoutMenuContext.Provider value={mockMenuContext}>
            <EuiFlyoutMenu title="Test" />
          </EuiFlyoutMenuContext.Provider>
        );

        expect(screen.queryByLabelText('History')).not.toBeInTheDocument();
      });
    });

    describe('without history items', () => {
      it('does not show back button when history is empty', () => {
        const emptyManagerContext = {
          historyItems: [],
          goBack: jest.fn(),
        } as any;

        const mockMenuContext = {
          level: LEVEL_MAIN as typeof LEVEL_MAIN,
          onClose: mockOnClose,
        };

        render(
          <EuiFlyoutManagerContext.Provider value={emptyManagerContext}>
            <EuiFlyoutMenuContext.Provider value={mockMenuContext}>
              <EuiFlyoutMenu title="Test" />
            </EuiFlyoutMenuContext.Provider>
          </EuiFlyoutManagerContext.Provider>
        );

        expect(screen.queryByText('Back')).not.toBeInTheDocument();
      });
    });
  });

  describe('interactions', () => {
    it('calls onClose from context when close button is clicked', () => {
      const mockMenuContext = {
        onClose: mockOnClose,
      };

      render(
        <EuiFlyoutMenuContext.Provider value={mockMenuContext}>
          <EuiFlyoutMenu title="Test" />
        </EuiFlyoutMenuContext.Provider>
      );

      screen.getByRole('button', { name: /close/i }).click();
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it('calls custom action onClick when clicked', () => {
      const customActionClick = jest.fn();
      const customActions = [
        {
          iconType: 'gear',
          onClick: customActionClick,
          'aria-label': 'Settings',
        },
      ];

      render(<EuiFlyoutMenu title="Test" customActions={customActions} />);

      screen.getByLabelText('Settings').click();
      expect(customActionClick).toHaveBeenCalledTimes(1);
    });
  });
});
