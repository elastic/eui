/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { fireEvent, waitFor } from '@testing-library/react';
import { render, screen, waitForEuiPopoverOpen } from '../../test/rtl';
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
    it('hides title by default when hideTitle is not specified', () => {
      const { getByText } = renderWithContext(
        <EuiFlyoutMenu title="Hidden Title" />
      );

      const title = getByText('Hidden Title');
      expect(title).toBeInTheDocument();
      // Title is visually hidden by default (screen reader only)
      expect(title.className).toContain('euiFlyoutMenu__hiddenTitle');
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
      expect(onClose).toHaveBeenCalledWith(expect.anything(), {
        reason: 'close-button',
      });
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

    it('renders history popover when at least two historyItems are provided', () => {
      const { container } = renderWithContext(
        <EuiFlyoutMenu title="Test Title" historyItems={historyItems} />
      );

      expect(
        container.querySelector('[aria-label="History"]')
      ).toBeInTheDocument();
    });

    it('does not render history popover for a single historyItem', () => {
      const { container, getByTestSubject } = renderWithContext(
        <EuiFlyoutMenu
          title="Test Title"
          historyItems={[historyItems[0]]}
          showBackButton
        />
      );

      expect(
        container.querySelector('[aria-label="History"]')
      ).not.toBeInTheDocument();
      // the back button already navigates to that single item
      expect(getByTestSubject('euiFlyoutMenuBackButton')).toBeInTheDocument();
    });

    it('renders history items with iconType as list group item icons', async () => {
      const itemsWithIcon = [
        {
          title: 'With icon',
          iconType: 'faceHappy' as const,
          onClick: jest.fn(),
        },
        { title: 'Without icon', onClick: jest.fn() },
      ];
      const { container } = renderWithContext(
        <EuiFlyoutMenu title="Test Title" historyItems={itemsWithIcon} />
      );

      const historyButton = container.querySelector(
        '[aria-label="History"]'
      ) as HTMLElement;
      fireEvent.click(historyButton!);
      await waitForEuiPopoverOpen();

      // Popover panel may render in a portal
      const listGroupItems = document.querySelectorAll('.euiListGroupItem');
      expect(listGroupItems).toHaveLength(2);
      // First item has iconType: expect icon (euiListGroupItem__icon)
      const firstItem = listGroupItems[0];
      expect(
        firstItem.querySelector('.euiListGroupItem__icon')
      ).toBeInTheDocument();
      // Second item has no iconType: no icon node
      const secondItem = listGroupItems[1];
      expect(
        secondItem.querySelector('.euiListGroupItem__icon')
      ).not.toBeInTheDocument();
    });

    it('uses the clockCounter icon for the history trigger', async () => {
      const { container } = renderWithContext(
        <EuiFlyoutMenu title="Test Title" historyItems={historyItems} />
      );

      const historyButton = container.querySelector('[aria-label="History"]');
      await waitFor(() => {
        expect(
          historyButton?.querySelector('[data-euiicon-type="clockCounter"]')
        ).toBeInTheDocument();
      });
    });

    it('shows a "Recently visited" tooltip on hover of the history trigger', () => {
      const { getByTestSubject, getByRole } = renderWithContext(
        <EuiFlyoutMenu title="Test Title" historyItems={historyItems} />
      );

      fireEvent.mouseOver(getByTestSubject('euiFlyoutMenuHistoryButton'));

      expect(getByRole('tooltip')).toHaveTextContent('Recently visited');
    });
  });

  describe('leadingActions and trailingActions', () => {
    const leadingActions = [
      {
        iconType: 'documents',
        onClick: jest.fn(),
        'aria-label': 'View surrounding documents',
      },
    ];
    const trailingActions = [
      {
        iconType: 'minimize',
        onClick: jest.fn(),
        'aria-label': 'Minimize',
        toolTipContent: 'Minimize',
      },
    ];

    it('renders leadingActions and calls their onClick handlers', () => {
      const { container } = renderWithContext(
        <EuiFlyoutMenu title="Test Title" leadingActions={leadingActions} />
      );

      const button = container.querySelector(
        '[aria-label="View surrounding documents"]'
      );
      expect(button).toBeInTheDocument();

      button?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      expect(leadingActions[0].onClick).toHaveBeenCalledTimes(1);
    });

    it('renders trailingActions and calls their onClick handlers', () => {
      const { container } = renderWithContext(
        <EuiFlyoutMenu title="Test Title" trailingActions={trailingActions} />
      );

      const button = container.querySelector('[aria-label="Minimize"]');
      expect(button).toBeInTheDocument();

      button?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      expect(trailingActions[0].onClick).toHaveBeenCalledTimes(1);
    });

    it('renders both leadingActions and trailingActions together', () => {
      const { container } = renderWithContext(
        <EuiFlyoutMenu
          title="Test Title"
          leadingActions={leadingActions}
          trailingActions={trailingActions}
        />
      );

      expect(
        container.querySelector('[aria-label="View surrounding documents"]')
      ).toBeInTheDocument();
      expect(
        container.querySelector('[aria-label="Minimize"]')
      ).toBeInTheDocument();
    });

    it('shows a tooltip when toolTipContent is provided', () => {
      const { getByRole } = renderWithContext(
        <EuiFlyoutMenu title="Test Title" trailingActions={trailingActions} />
      );

      const button = screen.getByLabelText('Minimize');
      fireEvent.mouseOver(button);

      expect(getByRole('tooltip')).toHaveTextContent('Minimize');
    });

    it('does not render a tooltip when toolTipContent is not provided', () => {
      const { queryByRole } = renderWithContext(
        <EuiFlyoutMenu title="Test Title" leadingActions={leadingActions} />
      );

      const button = screen.getByLabelText('View surrounding documents');
      fireEvent.mouseOver(button);

      expect(queryByRole('tooltip')).not.toBeInTheDocument();
    });

    it('forwards toolTipProps to the underlying EuiToolTip', () => {
      const actionsWithToolTipProps = [
        {
          iconType: 'minimize',
          onClick: jest.fn(),
          'aria-label': 'Minimize',
          toolTipContent: 'Minimize',
          toolTipProps: { position: 'left' as const },
        },
      ];

      const { getByRole } = renderWithContext(
        <EuiFlyoutMenu
          title="Test Title"
          trailingActions={actionsWithToolTipProps}
        />
      );

      fireEvent.mouseOver(screen.getByLabelText('Minimize'));

      expect(getByRole('tooltip').className).toContain('euiToolTip-left');
    });

    it('falls back to the deprecated customActions alias when trailingActions is not supplied', () => {
      const deprecatedCustomActions = [
        { iconType: 'gear', onClick: jest.fn(), 'aria-label': 'Settings' },
      ];

      const { container } = renderWithContext(
        <EuiFlyoutMenu
          title="Test Title"
          customActions={deprecatedCustomActions}
        />
      );

      expect(
        container.querySelector('[aria-label="Settings"]')
      ).toBeInTheDocument();
    });

    it('prefers trailingActions over the deprecated customActions alias when both are supplied', () => {
      const deprecatedCustomActions = [
        { iconType: 'gear', onClick: jest.fn(), 'aria-label': 'Settings' },
      ];

      const { container } = renderWithContext(
        <EuiFlyoutMenu
          title="Test Title"
          customActions={deprecatedCustomActions}
          trailingActions={trailingActions}
        />
      );

      expect(
        container.querySelector('[aria-label="Minimize"]')
      ).toBeInTheDocument();
      expect(
        container.querySelector('[aria-label="Settings"]')
      ).not.toBeInTheDocument();
    });
  });

  describe('control-group dividers', () => {
    const leadingActions = [
      {
        iconType: 'documents',
        onClick: jest.fn(),
        'aria-label': 'View surrounding documents',
      },
    ];
    const trailingActions = [
      { iconType: 'minimize', onClick: jest.fn(), 'aria-label': 'Minimize' },
    ];
    const historyItems = [
      { title: 'History 1', onClick: jest.fn() },
      { title: 'History 2', onClick: jest.fn() },
    ];

    it('renders a divider between the back button and history when both are present', () => {
      const { container } = renderWithContext(
        <EuiFlyoutMenu
          title="Test Title"
          showBackButton
          historyItems={historyItems}
        />
      );

      expect(
        container.querySelectorAll('.euiFlyoutMenu__divider')
      ).toHaveLength(1);
    });

    it('does not render a divider when only the back button is present', () => {
      const { container } = renderWithContext(
        <EuiFlyoutMenu title="Test Title" showBackButton />
      );

      expect(
        container.querySelectorAll('.euiFlyoutMenu__divider')
      ).toHaveLength(0);
    });

    it('does not render a divider when a single history item suppresses the popover', () => {
      const { container } = renderWithContext(
        <EuiFlyoutMenu
          title="Test Title"
          showBackButton
          historyItems={[historyItems[0]]}
        />
      );

      expect(
        container.querySelectorAll('.euiFlyoutMenu__divider')
      ).toHaveLength(0);
    });

    it('does not render a divider when only history is present', () => {
      const { container } = renderWithContext(
        <EuiFlyoutMenu title="Test Title" historyItems={historyItems} />
      );

      expect(
        container.querySelectorAll('.euiFlyoutMenu__divider')
      ).toHaveLength(0);
    });

    it('renders a divider between built-in leading controls and leadingActions', () => {
      const { container } = renderWithContext(
        <EuiFlyoutMenu
          title="Test Title"
          showBackButton
          leadingActions={leadingActions}
        />
      );

      expect(
        container.querySelectorAll('.euiFlyoutMenu__divider')
      ).toHaveLength(1);
    });

    it('does not render a divider when leadingActions is present without built-in leading controls', () => {
      const { container } = renderWithContext(
        <EuiFlyoutMenu title="Test Title" leadingActions={leadingActions} />
      );

      expect(
        container.querySelectorAll('.euiFlyoutMenu__divider')
      ).toHaveLength(0);
    });

    it('renders a divider between trailingActions and the close button', () => {
      const { container } = renderWithContext(
        <EuiFlyoutMenu title="Test Title" trailingActions={trailingActions} />
      );

      expect(
        container.querySelectorAll('.euiFlyoutMenu__divider')
      ).toHaveLength(1);
    });

    it('does not render a trailing divider when the close button is hidden', () => {
      const { container } = renderWithContext(
        <EuiFlyoutMenu
          title="Test Title"
          trailingActions={trailingActions}
          hideCloseButton
        />
      );

      expect(
        container.querySelectorAll('.euiFlyoutMenu__divider')
      ).toHaveLength(0);
    });

    it('does not render a trailing divider when trailingActions is empty', () => {
      const { container } = renderWithContext(<EuiFlyoutMenu title="Test" />);

      expect(
        container.querySelectorAll('.euiFlyoutMenu__divider')
      ).toHaveLength(0);
    });

    it('renders both leading and trailing dividers independently when leadingActions is absent but trailing content exists', () => {
      const { container } = renderWithContext(
        <EuiFlyoutMenu
          title="Test Title"
          showBackButton
          trailingActions={trailingActions}
        />
      );

      // Only the trailing/close divider should render since leadingActions is absent
      expect(
        container.querySelectorAll('.euiFlyoutMenu__divider')
      ).toHaveLength(1);
    });

    it('renders both boundary dividers when all groups are present', () => {
      const { container } = renderWithContext(
        <EuiFlyoutMenu
          title="Test Title"
          showBackButton
          historyItems={historyItems}
          leadingActions={leadingActions}
          trailingActions={trailingActions}
        />
      );

      // back|history + built-in|leading + trailing|close
      expect(
        container.querySelectorAll('.euiFlyoutMenu__divider')
      ).toHaveLength(3);
    });
  });

  describe('pagination', () => {
    const pagination = {
      currentIndex: 1,
      total: 5,
      onPrevious: jest.fn(),
      onNext: jest.fn(),
    };

    beforeEach(() => {
      pagination.onPrevious.mockClear();
      pagination.onNext.mockClear();
    });

    it('displays the correct counter text', () => {
      const { getAllByText } = renderWithContext(
        <EuiFlyoutMenu
          pagination={{ ...pagination, currentIndex: 1, total: 5 }}
        />
      );

      expect(getAllByText('2 of 5').length).toBeGreaterThanOrEqual(1);
    });

    it('disables Prev button when currentIndex is 0', () => {
      const { container } = renderWithContext(
        <EuiFlyoutMenu pagination={{ ...pagination, currentIndex: 0 }} />
      );

      expect(
        container.querySelector(
          '[data-test-subj="euiFlyoutMenuPaginationPrev"]'
        )
      ).toBeDisabled();
    });

    it('disables Next button when currentIndex is total - 1', () => {
      const { container } = renderWithContext(
        <EuiFlyoutMenu
          pagination={{ ...pagination, currentIndex: 4, total: 5 }}
        />
      );

      expect(
        container.querySelector(
          '[data-test-subj="euiFlyoutMenuPaginationNext"]'
        )
      ).toBeDisabled();
    });

    it('calls onPrevious when Prev button is clicked', () => {
      const { container } = renderWithContext(
        <EuiFlyoutMenu pagination={pagination} />
      );

      const prevButton = container.querySelector(
        '[data-test-subj="euiFlyoutMenuPaginationPrev"]'
      ) as HTMLElement;
      fireEvent.click(prevButton);

      expect(pagination.onPrevious).toHaveBeenCalledTimes(1);
    });

    it('calls onNext when Next button is clicked', () => {
      const { container } = renderWithContext(
        <EuiFlyoutMenu pagination={pagination} />
      );

      const nextButton = container.querySelector(
        '[data-test-subj="euiFlyoutMenuPaginationNext"]'
      ) as HTMLElement;
      fireEvent.click(nextButton);

      expect(pagination.onNext).toHaveBeenCalledTimes(1);
    });

    it('disables screen reader output for the Prev/Next tooltips', () => {
      const { getByTestSubject } = renderWithContext(
        <EuiFlyoutMenu pagination={pagination} />
      );

      fireEvent.mouseOver(getByTestSubject('euiFlyoutMenuPaginationNext'));

      expect(
        getByTestSubject('euiFlyoutMenuPaginationNext')
      ).not.toHaveAttribute('aria-describedby');
    });

    it('hides the back button when pagination is provided (pagination replaces navigation per design spec)', () => {
      const { queryByText } = renderWithContext(
        <EuiFlyoutMenu pagination={pagination} showBackButton={true} />
      );
      expect(queryByText('Back')).not.toBeInTheDocument();
    });

    it('defaults to chevron up/down icons', () => {
      const { container } = renderWithContext(
        <EuiFlyoutMenu pagination={pagination} />
      );

      expect(
        container.querySelector(
          '[data-test-subj="euiFlyoutMenuPaginationPrev"] [data-euiicon-type="chevronSingleUp"]'
        )
      ).toBeInTheDocument();
      expect(
        container.querySelector(
          '[data-test-subj="euiFlyoutMenuPaginationNext"] [data-euiicon-type="chevronSingleDown"]'
        )
      ).toBeInTheDocument();
    });

    it('omits the First/Last buttons unless onFirst/onLast are provided', () => {
      const { queryByTestSubject } = renderWithContext(
        <EuiFlyoutMenu pagination={pagination} />
      );

      expect(
        queryByTestSubject('euiFlyoutMenuPaginationFirst')
      ).not.toBeInTheDocument();
      expect(
        queryByTestSubject('euiFlyoutMenuPaginationLast')
      ).not.toBeInTheDocument();
    });

    describe('jump to first/last', () => {
      const onFirst = jest.fn();
      const onLast = jest.fn();
      const jumpPagination = { ...pagination, onFirst, onLast };

      beforeEach(() => {
        onFirst.mockClear();
        onLast.mockClear();
      });

      it('calls onFirst and onLast when the jump buttons are clicked', () => {
        const { getByTestSubject } = renderWithContext(
          <EuiFlyoutMenu pagination={jumpPagination} />
        );

        fireEvent.click(getByTestSubject('euiFlyoutMenuPaginationFirst'));
        fireEvent.click(getByTestSubject('euiFlyoutMenuPaginationLast'));

        expect(onFirst).toHaveBeenCalledTimes(1);
        expect(onLast).toHaveBeenCalledTimes(1);
      });

      it('defaults to limit icons for the jump buttons', () => {
        const { container } = renderWithContext(
          <EuiFlyoutMenu pagination={jumpPagination} />
        );

        expect(
          container.querySelector(
            '[data-test-subj="euiFlyoutMenuPaginationFirst"] [data-euiicon-type="chevronLimitLeft"]'
          )
        ).toBeInTheDocument();
        expect(
          container.querySelector(
            '[data-test-subj="euiFlyoutMenuPaginationLast"] [data-euiicon-type="chevronLimitRight"]'
          )
        ).toBeInTheDocument();
      });

      it('switches the Prev/Next defaults to left/right chevrons', () => {
        const { container } = renderWithContext(
          <EuiFlyoutMenu pagination={jumpPagination} />
        );

        expect(
          container.querySelector(
            '[data-test-subj="euiFlyoutMenuPaginationPrev"] [data-euiicon-type="chevronSingleLeft"]'
          )
        ).toBeInTheDocument();
        expect(
          container.querySelector(
            '[data-test-subj="euiFlyoutMenuPaginationNext"] [data-euiicon-type="chevronSingleRight"]'
          )
        ).toBeInTheDocument();
      });

      it('disables the First button at the beginning of the list', () => {
        const { getByTestSubject } = renderWithContext(
          <EuiFlyoutMenu
            pagination={{ ...jumpPagination, currentIndex: 0, total: 5 }}
          />
        );

        expect(getByTestSubject('euiFlyoutMenuPaginationFirst')).toBeDisabled();
        expect(
          getByTestSubject('euiFlyoutMenuPaginationLast')
        ).not.toBeDisabled();
      });

      it('disables the Last button at the end of the list', () => {
        const { getByTestSubject } = renderWithContext(
          <EuiFlyoutMenu
            pagination={{ ...jumpPagination, currentIndex: 4, total: 5 }}
          />
        );

        expect(
          getByTestSubject('euiFlyoutMenuPaginationFirst')
        ).not.toBeDisabled();
        expect(getByTestSubject('euiFlyoutMenuPaginationLast')).toBeDisabled();
      });
    });

    it('still renders the pagination controls when there is only one item', () => {
      const { getAllByText, container } = renderWithContext(
        <EuiFlyoutMenu
          pagination={{ ...pagination, currentIndex: 0, total: 1 }}
        />
      );

      expect(getAllByText('1 of 1').length).toBeGreaterThanOrEqual(1);
      expect(
        container.querySelector(
          '[data-test-subj="euiFlyoutMenuPaginationPrev"]'
        )
      ).toBeDisabled();
      expect(
        container.querySelector(
          '[data-test-subj="euiFlyoutMenuPaginationNext"]'
        )
      ).toBeDisabled();
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

    it('provides aria-labels for trailing actions', () => {
      const trailingActions = [
        { iconType: 'gear', onClick: jest.fn(), 'aria-label': 'Settings' },
      ];

      const { container } = renderWithContext(
        <EuiFlyoutMenu title="Test" trailingActions={trailingActions} />
      );

      const settingsButton = container.querySelector('[aria-label="Settings"]');
      expect(settingsButton).toBeInTheDocument();
    });
  });
});
