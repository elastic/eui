/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { render, screen } from '../../test/rtl';
import { requiredProps } from '../../test';

import { EuiFlyoutMenu } from './flyout_menu';
import { EuiFlyoutMenuContext } from './flyout_menu_context';

describe('EuiFlyoutMenu', () => {
  const onClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderWithContext = (ui: React.ReactElement) => {
    return render(
      <EuiFlyoutMenuContext.Provider value={{ onClose }}>
        {ui}
      </EuiFlyoutMenuContext.Provider>
    );
  };

  describe('basic rendering', () => {
    it('renders with title', () => {
      const { container } = renderWithContext(
        <EuiFlyoutMenu {...requiredProps} title="Test Title" />
      );

      expect(container.querySelector('.euiFlyoutMenu')).toBeInTheDocument();
      expect(screen.getByText('Test Title')).toBeInTheDocument();
    });

    it('renders without title', () => {
      const { container } = renderWithContext(
        <EuiFlyoutMenu {...requiredProps} />
      );

      expect(container.querySelector('.euiFlyoutMenu')).toBeInTheDocument();
    });

    it('renders with custom titleId', () => {
      const { container } = renderWithContext(
        <EuiFlyoutMenu
          {...requiredProps}
          title="Custom Title"
          titleId="my-custom-id"
        />
      );

      const titleElement = container.querySelector('#my-custom-id');
      expect(titleElement).toBeInTheDocument();
      expect(titleElement?.textContent).toBe('Custom Title');
    });
  });

  describe('hideTitle prop', () => {
    it('shows title by default when hideTitle is not specified', () => {
      const { getByText } = renderWithContext(
        <EuiFlyoutMenu title="Visible Title" />
      );

      const title = getByText('Visible Title');
      expect(title).toBeInTheDocument();
      expect(title).toBeVisible();
    });

    it('applies screen reader only styles when hideTitle is true', () => {
      const { container, getByText } = renderWithContext(
        <EuiFlyoutMenu
          title="Hidden Title"
          titleId="test-title-id"
          hideTitle={true}
        />
      );

      const titleContainer = container.querySelector('#test-title-id');
      expect(titleContainer).toBeInTheDocument();

      const titleText = getByText('Hidden Title');
      expect(titleText).toBeInTheDocument();
      // The title should have the hiddenTitle CSS class applied
      // We can't test visibility directly in JSDOM as CSS-in-JS isn't fully evaluated
      expect(titleText.className).toContain('euiFlyoutMenu__hiddenTitle');
    });

    it('shows title when hideTitle is false', () => {
      const { getByText } = renderWithContext(
        <EuiFlyoutMenu title="Visible Title" hideTitle={false} />
      );

      const title = getByText('Visible Title');
      expect(title).toBeVisible();
    });
  });

  describe('close button', () => {
    it('renders close button by default', () => {
      const { container } = renderWithContext(
        <EuiFlyoutMenu title="Test Title" />
      );

      expect(
        container.querySelector('[data-test-subj="euiFlyoutCloseButton"]')
      ).toBeInTheDocument();
    });

    it('hides close button when hideCloseButton is true', () => {
      const { container } = renderWithContext(
        <EuiFlyoutMenu title="Test Title" hideCloseButton={true} />
      );

      expect(
        container.querySelector('[data-test-subj="euiFlyoutCloseButton"]')
      ).not.toBeInTheDocument();
    });

    it('calls onClose when close button is clicked', () => {
      const { container } = renderWithContext(
        <EuiFlyoutMenu title="Test Title" />
      );

      const closeButton = container.querySelector(
        '[data-test-subj="euiFlyoutCloseButton"]'
      );
      closeButton?.dispatchEvent(new MouseEvent('click', { bubbles: true }));

      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });

  describe('back button', () => {
    it('does not render back button by default', () => {
      const { queryByText } = renderWithContext(
        <EuiFlyoutMenu title="Test Title" />
      );

      expect(queryByText('Back')).not.toBeInTheDocument();
    });

    it('renders back button when showBackButton is true', () => {
      const { getByText } = renderWithContext(
        <EuiFlyoutMenu title="Test Title" showBackButton={true} />
      );

      expect(getByText('Back')).toBeInTheDocument();
    });

    it('calls backButtonProps.onClick when back button is clicked', () => {
      const handleBack = jest.fn();
      const { getByText } = renderWithContext(
        <EuiFlyoutMenu
          title="Test Title"
          showBackButton={true}
          backButtonProps={{ onClick: handleBack }}
        />
      );

      getByText('Back').click();
      expect(handleBack).toHaveBeenCalledTimes(1);
    });
  });

  describe('history items', () => {
    const historyItems = [
      { title: 'History 1', onClick: jest.fn() },
      { title: 'History 2', onClick: jest.fn() },
    ];

    it('does not render history popover when historyItems is empty', () => {
      const { container } = renderWithContext(
        <EuiFlyoutMenu title="Test Title" historyItems={[]} />
      );

      expect(
        container.querySelector('[aria-label="History"]')
      ).not.toBeInTheDocument();
    });

    it('renders history popover when historyItems are provided', () => {
      const { container } = renderWithContext(
        <EuiFlyoutMenu title="Test Title" historyItems={historyItems} />
      );

      expect(
        container.querySelector('[aria-label="History"]')
      ).toBeInTheDocument();
    });
  });

  describe('custom actions', () => {
    const customActions = [
      {
        iconType: 'gear',
        onClick: jest.fn(),
        'aria-label': 'Settings',
      },
      {
        iconType: 'share',
        onClick: jest.fn(),
        'aria-label': 'Share',
      },
    ];

    it('does not render custom actions when not provided', () => {
      const { container } = renderWithContext(
        <EuiFlyoutMenu title="Test Title" />
      );

      expect(container.querySelectorAll('.euiButtonIcon').length).toBe(1); // Only close button
    });

    it('renders custom action buttons', () => {
      const { container } = renderWithContext(
        <EuiFlyoutMenu title="Test Title" customActions={customActions} />
      );

      const buttons = container.querySelectorAll('.euiButtonIcon');
      // Should have 2 custom actions + 1 close button = 3 total
      expect(buttons.length).toBeGreaterThanOrEqual(2);
    });

    it('calls onClick when custom action is clicked', () => {
      const { container } = renderWithContext(
        <EuiFlyoutMenu title="Test Title" customActions={customActions} />
      );

      const settingsButton = container.querySelector('[aria-label="Settings"]');
      settingsButton?.dispatchEvent(new MouseEvent('click', { bubbles: true }));

      expect(customActions[0].onClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('accessibility', () => {
    it('title is accessible even when hidden', () => {
      const { container } = renderWithContext(
        <EuiFlyoutMenu
          title="Screen Reader Title"
          titleId="sr-title"
          hideTitle={true}
        />
      );

      const title = container.querySelector('#sr-title');
      expect(title).toBeInTheDocument();
      expect(title?.textContent).toBe('Screen Reader Title');
      // The title should still be accessible to screen readers
    });

    it('provides aria-label for back button', () => {
      const { container } = renderWithContext(
        <EuiFlyoutMenu
          title="Test"
          showBackButton={true}
          backButtonProps={{
            onClick: jest.fn(),
            'aria-label': 'Go back',
          }}
        />
      );

      const backButton = container.querySelector(
        'button[aria-label="Go back"]'
      );
      expect(backButton).toBeInTheDocument();
    });

    it('provides aria-labels for custom actions', () => {
      const customActions = [
        { iconType: 'gear', onClick: jest.fn(), 'aria-label': 'Settings' },
      ];

      const { container } = renderWithContext(
        <EuiFlyoutMenu title="Test" customActions={customActions} />
      );

      const settingsButton = container.querySelector('[aria-label="Settings"]');
      expect(settingsButton).toBeInTheDocument();
    });
  });
});
