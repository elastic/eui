/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { fireEvent } from '@testing-library/react';
import { requiredProps } from '../../test/required_props';
import { render } from '../../test/rtl';

import { EuiFlyoutMenuBar, EuiFlyoutMenuBarAction } from './flyout_menu_bar';

describe('EuiFlyoutMenuBar', () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('is rendered', () => {
    const { container } = render(
      <EuiFlyoutMenuBar {...requiredProps} onClose={mockOnClose} />
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  describe('props', () => {
    test('title is rendered', () => {
      const { container } = render(
        <EuiFlyoutMenuBar title="Test Title" onClose={mockOnClose} />
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    test('children are rendered and take precedence over title', () => {
      const { container, getByText } = render(
        <EuiFlyoutMenuBar title="Test Title" onClose={mockOnClose}>
          <span>Custom Content</span>
        </EuiFlyoutMenuBar>
      );

      expect(getByText('Custom Content')).toBeInTheDocument();
      expect(container.firstChild).toMatchSnapshot();
    });

    test('close button calls onClose when clicked', () => {
      const { getByLabelText } = render(
        <EuiFlyoutMenuBar title="Test Title" onClose={mockOnClose} />
      );

      const closeButton = getByLabelText('Close this dialog');
      fireEvent.click(closeButton);

      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });
  });

  describe('actions', () => {
    const mockActions: EuiFlyoutMenuBarAction[] = [
      {
        key: 'edit',
        iconType: 'pencil',
        'aria-label': 'Edit',
        onClick: jest.fn(),
      },
      {
        key: 'share',
        iconType: 'share',
        'aria-label': 'Share',
        onClick: jest.fn(),
      },
    ];

    test('renders action buttons', () => {
      const { container, getByLabelText } = render(
        <EuiFlyoutMenuBar
          title="Test Title"
          onClose={mockOnClose}
          actions={mockActions}
        />
      );

      expect(getByLabelText('Edit')).toBeInTheDocument();
      expect(getByLabelText('Share')).toBeInTheDocument();
      expect(container.firstChild).toMatchSnapshot();
    });

    test('action buttons call onClick when clicked', () => {
      const { getByLabelText } = render(
        <EuiFlyoutMenuBar
          title="Test Title"
          onClose={mockOnClose}
          actions={mockActions}
        />
      );

      const editButton = getByLabelText('Edit');
      const shareButton = getByLabelText('Share');

      fireEvent.click(editButton);
      fireEvent.click(shareButton);

      expect(mockActions[0].onClick).toHaveBeenCalledTimes(1);
      expect(mockActions[1].onClick).toHaveBeenCalledTimes(1);
    });

    test('renders disabled action buttons', () => {
      const disabledActions: EuiFlyoutMenuBarAction[] = [
        {
          key: 'edit',
          iconType: 'pencil',
          'aria-label': 'Edit',
          onClick: jest.fn(),
          disabled: true,
        },
      ];

      const { container, getByLabelText } = render(
        <EuiFlyoutMenuBar
          title="Test Title"
          onClose={mockOnClose}
          actions={disabledActions}
        />
      );

      const editButton = getByLabelText('Edit');
      expect(editButton).toBeDisabled();
      expect(container.firstChild).toMatchSnapshot();
    });

    test('renders data-test-subj on action buttons', () => {
      const actionsWithTestSubj: EuiFlyoutMenuBarAction[] = [
        {
          key: 'edit',
          iconType: 'pencil',
          'aria-label': 'Edit',
          onClick: jest.fn(),
          'data-test-subj': 'edit-action',
        },
      ];

      const { getByTestSubject } = render(
        <EuiFlyoutMenuBar
          title="Test Title"
          onClose={mockOnClose}
          actions={actionsWithTestSubj}
        />
      );

      expect(getByTestSubject('edit-action')).toBeInTheDocument();
    });
  });

  describe('overflow menu', () => {
    const manyActions: EuiFlyoutMenuBarAction[] = [
      {
        key: 'edit',
        iconType: 'pencil',
        'aria-label': 'Edit',
        onClick: jest.fn(),
      },
      {
        key: 'share',
        iconType: 'share',
        'aria-label': 'Share',
        onClick: jest.fn(),
      },
      {
        key: 'copy',
        iconType: 'copy',
        'aria-label': 'Copy',
        onClick: jest.fn(),
      },
      {
        key: 'download',
        iconType: 'download',
        'aria-label': 'Download',
        onClick: jest.fn(),
      },
      {
        key: 'delete',
        iconType: 'trash',
        'aria-label': 'Delete',
        onClick: jest.fn(),
      },
    ];

    test('shows overflow menu when more than 3 actions', () => {
      const { container, getByLabelText } = render(
        <EuiFlyoutMenuBar
          title="Test Title"
          onClose={mockOnClose}
          actions={manyActions}
        />
      );

      // Should show first 2 actions as buttons
      expect(getByLabelText('Edit')).toBeInTheDocument();
      expect(getByLabelText('Share')).toBeInTheDocument();

      // Should show overflow menu button
      expect(getByLabelText('More actions')).toBeInTheDocument();

      expect(container.firstChild).toMatchSnapshot();
    });

    test('opens overflow menu when clicked', () => {
      const { getByLabelText, getByText } = render(
        <EuiFlyoutMenuBar
          title="Test Title"
          onClose={mockOnClose}
          actions={manyActions}
        />
      );

      const overflowButton = getByLabelText('More actions');
      fireEvent.click(overflowButton);

      // Should show overflow menu items
      expect(getByText('Copy')).toBeInTheDocument();
      expect(getByText('Download')).toBeInTheDocument();
      expect(getByText('Delete')).toBeInTheDocument();
    });

    test('calls action onClick from overflow menu', () => {
      const { getByLabelText, getByText } = render(
        <EuiFlyoutMenuBar
          title="Test Title"
          onClose={mockOnClose}
          actions={manyActions}
        />
      );

      // Open overflow menu
      const overflowButton = getByLabelText('More actions');
      fireEvent.click(overflowButton);

      // Click on overflow menu item
      const copyItem = getByText('Copy');
      fireEvent.click(copyItem);

      expect(manyActions[2].onClick).toHaveBeenCalledTimes(1);
    });

    test('shows disabled state in overflow menu', () => {
      const actionsWithDisabled = [
        ...manyActions.slice(0, 4),
        {
          key: 'delete',
          iconType: 'trash',
          'aria-label': 'Delete',
          onClick: jest.fn(),
          disabled: true,
        },
      ];

      const { getByLabelText, getByText } = render(
        <EuiFlyoutMenuBar
          title="Test Title"
          onClose={mockOnClose}
          actions={actionsWithDisabled}
        />
      );

      // Open overflow menu
      const overflowButton = getByLabelText('More actions');
      fireEvent.click(overflowButton);

      // Check disabled item
      const deleteItem = getByText('Delete');
      expect(deleteItem.closest('button')).toBeDisabled();
    });
  });

  describe('exactly 3 actions', () => {
    const threeActions: EuiFlyoutMenuBarAction[] = [
      {
        key: 'edit',
        iconType: 'pencil',
        'aria-label': 'Edit',
        onClick: jest.fn(),
      },
      {
        key: 'share',
        iconType: 'share',
        'aria-label': 'Share',
        onClick: jest.fn(),
      },
      {
        key: 'copy',
        iconType: 'copy',
        'aria-label': 'Copy',
        onClick: jest.fn(),
      },
    ];

    test('shows all 3 actions as buttons without overflow', () => {
      const { container, getByLabelText, queryByLabelText } = render(
        <EuiFlyoutMenuBar
          title="Test Title"
          onClose={mockOnClose}
          actions={threeActions}
        />
      );

      // Should show all 3 actions as buttons
      expect(getByLabelText('Edit')).toBeInTheDocument();
      expect(getByLabelText('Share')).toBeInTheDocument();
      expect(getByLabelText('Copy')).toBeInTheDocument();

      // Should NOT show overflow menu button
      expect(queryByLabelText('More actions')).not.toBeInTheDocument();

      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('accessibility', () => {
    test('close button has proper aria-label', () => {
      const { getByLabelText } = render(
        <EuiFlyoutMenuBar title="Test Title" onClose={mockOnClose} />
      );

      expect(getByLabelText('Close this dialog')).toBeInTheDocument();
    });

    test('action buttons have proper aria-labels', () => {
      const actions: EuiFlyoutMenuBarAction[] = [
        {
          key: 'edit',
          iconType: 'pencil',
          'aria-label': 'Edit document',
          onClick: jest.fn(),
        },
      ];

      const { getByLabelText } = render(
        <EuiFlyoutMenuBar
          title="Test Title"
          onClose={mockOnClose}
          actions={actions}
        />
      );

      expect(getByLabelText('Edit document')).toBeInTheDocument();
    });

    test('overflow menu button has proper aria-label', () => {
      const manyActions: EuiFlyoutMenuBarAction[] = Array.from(
        { length: 4 },
        (_, i) => ({
          key: `action-${i}`,
          iconType: 'pencil',
          'aria-label': `Action ${i}`,
          onClick: jest.fn(),
        })
      );

      const { getByLabelText } = render(
        <EuiFlyoutMenuBar
          title="Test Title"
          onClose={mockOnClose}
          actions={manyActions}
        />
      );

      expect(getByLabelText('More actions')).toBeInTheDocument();
    });
  });
});
