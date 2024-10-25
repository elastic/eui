/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  cloneElement,
  Component,
  HTMLAttributes,
  PropsWithChildren,
  ReactElement,
  ReactNode,
} from 'react';
import classNames from 'classnames';
import { tabbable, FocusableElement } from 'tabbable';

import {
  withEuiStylesMemoizer,
  WithEuiStylesMemoizerProps,
  keys,
} from '../../services';
import { CommonProps, NoArgCallback } from '../common';
import { EuiResizeObserver } from '../observer/resize_observer';

import {
  EuiContextMenuItem,
  EuiContextMenuItemProps,
} from './context_menu_item';
import { euiContextMenuPanelStyles } from './context_menu_panel.styles';

export type EuiContextMenuPanelHeightChangeHandler = (height: number) => void;
export type EuiContextMenuPanelTransitionType = 'in' | 'out';
export type EuiContextMenuPanelTransitionDirection = 'next' | 'previous';
export type EuiContextMenuPanelShowPanelCallback = (
  currentPanelIndex?: number
) => void;

export const SIZES = ['s', 'm'] as const;

export type EuiContextMenuPanelProps = PropsWithChildren &
  CommonProps &
  Omit<
    HTMLAttributes<HTMLDivElement>,
    'onKeyDown' | 'tabIndex' | 'onAnimationEnd' | 'title'
  > & {
    /**
     * Determines the initially focused menu item for keyboard and screen reader users.
     *
     * Can be set to `-1` to prevent autofocus (an uncommon case that must have
     * keyboard accessibility accounted for manually if used)
     */
    initialFocusedItemIndex?: number;
    items?: ReactElement[];
    onClose?: NoArgCallback<void>;
    onHeightChange?: EuiContextMenuPanelHeightChangeHandler;
    onTransitionComplete?: NoArgCallback<void>;
    onUseKeyboardToNavigate?: NoArgCallback<void>;
    showNextPanel?: EuiContextMenuPanelShowPanelCallback;
    showPreviousPanel?: NoArgCallback<void>;
    title?: ReactNode;
    transitionDirection?: EuiContextMenuPanelTransitionDirection;
    transitionType?: EuiContextMenuPanelTransitionType;
    /**
     * Alters the size of the items and the title
     */
    size?: (typeof SIZES)[number];
  };

type Props = EuiContextMenuPanelProps;

interface State {
  prevProps: {
    items: Props['items'];
  };
  menuItems: FocusableElement[];
  focusedItemIndex?: number;
  currentHeight?: number;
  height?: number;
  waitingForInitialPopover: boolean;
  tookInitialFocus: boolean;
}

export class EuiContextMenuPanelClass extends Component<
  WithEuiStylesMemoizerProps & Props,
  State
> {
  static defaultProps: Partial<Props> = {
    items: [],
  };

  private _isMounted = false;
  private backButton?: HTMLElement | null = null;
  private panel?: HTMLElement | null = null;
  private initialPopoverParent?: HTMLElement | null = null;

  constructor(props: WithEuiStylesMemoizerProps & Props) {
    super(props);

    this.state = {
      prevProps: {
        items: this.props.items,
      },
      menuItems: [],
      focusedItemIndex:
        props.onClose &&
        props.initialFocusedItemIndex != null &&
        props.initialFocusedItemIndex !== -1
          ? props.initialFocusedItemIndex + 1 // Account for panel title back button
          : props.initialFocusedItemIndex,
      currentHeight: undefined,
      waitingForInitialPopover: false,
      tookInitialFocus: false,
    };
  }

  // Find all tabbable menu items on both panel init and
  // whenever `menuItems` resets when `props.items` changes
  findMenuItems = () => {
    if (!this.panel) return;
    if (!this.props.items?.length) return; // We only need menu items/arrow key navigation for the `items` API
    if (this.state.menuItems.length) return; // If we already have menu items, no need to continue

    const tabbableItems = tabbable(this.panel);
    if (tabbableItems.length) {
      this.setState({ menuItems: tabbableItems });
    }
  };

  focusMenuItem = (direction: 'up' | 'down') => {
    const indexOffset = direction === 'up' ? -1 : 1;
    let nextFocusedItemIndex;

    if (this.state.focusedItemIndex === undefined) {
      // If this is the beginning of the user's keyboard navigation of the menu, then we'll focus
      // either the first or last item.
      nextFocusedItemIndex =
        direction === 'up' ? this.state.menuItems.length - 1 : 0;
    } else {
      nextFocusedItemIndex = this.state.focusedItemIndex + indexOffset;

      if (nextFocusedItemIndex < 0) {
        nextFocusedItemIndex = this.state.menuItems.length - 1;
      } else if (nextFocusedItemIndex === this.state.menuItems.length) {
        nextFocusedItemIndex = 0;
      }
    }

    this.setState({ focusedItemIndex: nextFocusedItemIndex });
    this.state.menuItems[nextFocusedItemIndex]?.focus();
  };

  onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    // If this panel contains items you can use the left arrow key to go back at any time.
    // But if it doesn't contain items, then you have to focus on the back button specifically,
    // since there could be content inside the panel which requires use of the left arrow key,
    // e.g. text inputs.
    const { items, onClose, showPreviousPanel } = this.props;

    if (
      onClose &&
      (items?.length ||
        document.activeElement === this.backButton ||
        document.activeElement === this.panel)
    ) {
      if (event.key === keys.ARROW_LEFT) {
        if (showPreviousPanel) {
          event.preventDefault();
          event.stopPropagation();
          showPreviousPanel();

          if (this.props.onUseKeyboardToNavigate) {
            this.props.onUseKeyboardToNavigate();
          }
        }
      }
    }

    if (items?.length) {
      switch (event.key) {
        case keys.TAB:
          requestAnimationFrame(() => {
            // NOTE: document.activeElement is stale if not wrapped in requestAnimationFrame
            const focusedItemIndex = this.state.menuItems.indexOf(
              document.activeElement as HTMLElement
            );

            // We need to sync our internal state with the user tabbing through items
            this.setState({
              focusedItemIndex:
                focusedItemIndex >= 0 &&
                focusedItemIndex < this.state.menuItems.length
                  ? focusedItemIndex
                  : undefined,
            });
          });
          break;

        case keys.ARROW_UP:
          event.preventDefault();
          this.focusMenuItem('up');

          if (this.props.onUseKeyboardToNavigate) {
            this.props.onUseKeyboardToNavigate();
          }
          break;

        case keys.ARROW_DOWN:
          event.preventDefault();
          this.focusMenuItem('down');

          if (this.props.onUseKeyboardToNavigate) {
            this.props.onUseKeyboardToNavigate();
          }
          break;

        case keys.ARROW_RIGHT:
          if (this.props.showNextPanel) {
            event.preventDefault();
            this.props.showNextPanel(
              onClose && this.state.focusedItemIndex
                ? this.state.focusedItemIndex - 1 // Account for panel title back button
                : this.state.focusedItemIndex
            );

            if (this.props.onUseKeyboardToNavigate) {
              this.props.onUseKeyboardToNavigate();
            }
          }
          break;

        default:
          break;
      }
    }
  };

  takeInitialFocus() {
    // Give positioning time to render before focus is applied. Otherwise page jumps.
    requestAnimationFrame(() => {
      if (!this._isMounted) {
        return;
      }

      // Don't take focus yet if EuiContextMenu is in a popover
      // and the popover is initially opening/transitioning in
      if (this.initialPopoverParent && this.state.waitingForInitialPopover) {
        return;
      }

      // Setting focus while transitioning causes the animation to glitch, so we have to wait
      // until it's finished before we focus anything.
      if (this.props.transitionType) {
        // If the panel is transitioning, set focus to the panel so that users using
        // arrow keys that are fast clickers don't accidentally get stranded focus
        // or trigger keystrokes when it shouldn't
        this.panel?.focus({ preventScroll: true });
        return;
      }

      // Initial focus has already been handled, no need to continue and potentially hijack/focus fight
      if (this.state.tookInitialFocus) {
        return;
      }

      // `initialFocusedItemIndex={-1}` should only be used when preventing initial item focus is desired
      if (this.state.focusedItemIndex === -1) {
        // Resetting the focusedItemIndex to 0 allows keyboard up/down behavior to
        // still work correctly later if the panel is manually tabbed into
        return this.setState({ tookInitialFocus: true, focusedItemIndex: 0 });
      }

      // If an item should be focused, focus it (if it exists)
      if (this.state.focusedItemIndex != null && this.state.menuItems.length) {
        const focusedItem = this.state.menuItems[this.state.focusedItemIndex];
        if (focusedItem) {
          focusedItem.focus();
          return this.setState({ tookInitialFocus: true });
        }
      }

      // Otherwise, if the back button panel title is present, focus it
      if (this.backButton) {
        // Focus the back button for both `items` and `children` APIs
        this.backButton.focus();
        // If `items`, ensure our focused item index is correct
        if (this.state.menuItems.length) {
          this.setState({ focusedItemIndex: 0 });
        }
        return this.setState({ tookInitialFocus: true });
      }

      // Focus on the panel as a last resort.
      if (this.panel && !this.panel.contains(document.activeElement)) {
        this.panel.focus();
        this.setState({ tookInitialFocus: true });
      }
    });
  }

  reclaimPopoverFocus = () => {
    this.setState({ waitingForInitialPopover: false });
    this.takeInitialFocus();
  };

  onTransitionComplete = () => {
    if (this.props.onTransitionComplete) {
      this.props.onTransitionComplete();
    }
  };

  componentDidUpdate(_: Props, prevState: State) {
    if (prevState.menuItems !== this.state.menuItems) {
      this.findMenuItems();
    }
    // Focus isn't always ready to be taken on mount, so we need to call it
    // on update as well just in case
    this.takeInitialFocus();
  }

  componentDidMount() {
    // If EuiContextMenu is used within an EuiPopover, we need to wait for EuiPopover to:
    // 1. Correctly set its `returnFocus` to the toggling button,
    //    so focus is correctly restored to the popover toggle on close
    // 2. Finish its react-focus-on `autoFocus` behavior after transitioning in,
    //    so the panel can handle its own focus without focus fighting
    if (this.initialPopoverParent) {
      this.initialPopoverParent.addEventListener(
        'focus',
        this.reclaimPopoverFocus,
        { once: true }
      );
    } else {
      this.takeInitialFocus();
    }
    this._isMounted = true;
  }

  componentWillUnmount() {
    this.initialPopoverParent?.removeEventListener(
      'focus',
      this.reclaimPopoverFocus
    );
    this._isMounted = false;
  }

  static getDerivedStateFromProps(
    nextProps: Props,
    prevState: State
  ): Partial<State> | null {
    let needsUpdate = false;
    const nextState: Partial<State> = {};

    // Clear refs to menuItems if we're getting new ones.
    if (nextProps.items !== prevState.prevProps.items) {
      needsUpdate = true;
      nextState.menuItems = [];
      nextState.prevProps = { items: nextProps.items };
    }

    if (needsUpdate) {
      return nextState;
    }
    return null;
  }

  updateHeight() {
    const currentHeight = this.panel ? this.panel.clientHeight : 0;

    if (this.state.height !== currentHeight) {
      if (this.props.onHeightChange) {
        this.props.onHeightChange(currentHeight);

        this.setState({ height: currentHeight });
      }
    }
  }

  getInitialPopoverParent() {
    // If `transitionType` exists, that means we're navigating between panels
    // and the initial popover has already loaded, so we shouldn't need this logic
    if (this.props.transitionType) return;

    if (!this.panel) return;

    const parent = this.panel.parentNode as HTMLElement;
    if (!parent) return;
    const hasEuiContextMenuParent = parent.classList.contains('euiContextMenu');

    // It's possible to use an EuiContextMenuPanel directly in a popover without
    // an EuiContextMenu, so we need to account for that when searching parent nodes
    const popoverParent = hasEuiContextMenuParent
      ? (parent?.parentNode?.parentNode as HTMLElement)
      : (parent?.parentNode as HTMLElement);
    if (!popoverParent) return;

    const hasPopoverParent = !!popoverParent.dataset.popoverPanel;
    if (!hasPopoverParent) return;

    this.initialPopoverParent = popoverParent;
    this.setState({ waitingForInitialPopover: true });
  }

  panelRef = (node: HTMLElement | null) => {
    this.panel = node;

    this.updateHeight();
    this.getInitialPopoverParent();
    this.findMenuItems();
  };

  render() {
    const {
      stylesMemoizer,
      children,
      className,
      onClose,
      title,
      onHeightChange,
      transitionType,
      transitionDirection,
      onTransitionComplete,
      onUseKeyboardToNavigate,
      items,
      initialFocusedItemIndex,
      showNextPanel,
      showPreviousPanel,
      size,
      ...rest
    } = this.props;

    const classes = classNames('euiContextMenuPanel', className);

    const styles = stylesMemoizer(euiContextMenuPanelStyles);
    const cssStyles = [
      styles.euiContextMenuPanel,
      transitionDirection &&
        transitionType &&
        styles[transitionDirection][transitionType],
    ];

    const panelTitle = title && (
      <EuiContextMenuItem
        css={styles.euiContextMenuPanel__title}
        className="euiContextMenuPanel__title"
        onClick={onClose}
        buttonRef={(node: HTMLButtonElement) => {
          if (onClose) this.backButton = node;
        }}
        data-test-subj={
          onClose ? 'contextMenuPanelTitleButton' : 'contextMenuPanelTitle'
        }
        icon={onClose && 'arrowLeft'}
      >
        {title}
      </EuiContextMenuItem>
    );

    const content =
      items && items.length
        ? items.map((MenuItem) => {
            const cloneProps: Partial<EuiContextMenuItemProps> = {};
            if (size) {
              cloneProps.size = size;
            }
            return MenuItem.type === EuiContextMenuItem
              ? cloneElement(MenuItem, cloneProps)
              : MenuItem;
          })
        : children;

    return (
      <div
        ref={this.panelRef}
        css={cssStyles}
        className={classes}
        onKeyDown={this.onKeyDown}
        tabIndex={-1}
        onAnimationEnd={this.onTransitionComplete}
        {...rest}
      >
        {panelTitle}

        <EuiResizeObserver onResize={() => this.updateHeight()}>
          {(resizeRef) => <div ref={resizeRef}>{content}</div>}
        </EuiResizeObserver>
      </div>
    );
  }
}

export const EuiContextMenuPanel =
  withEuiStylesMemoizer<EuiContextMenuPanelProps>(EuiContextMenuPanelClass);
