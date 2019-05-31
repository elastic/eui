import React, { cloneElement, Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import tabbable from 'tabbable';

import { EuiIcon } from '../icon';
import { EuiPopoverTitle } from '../popover';
import { EuiResizeObserver } from '../observer/resize_observer';
import { cascadingMenuKeyCodes } from '../../services';

const transitionDirectionAndTypeToClassNameMap = {
  next: {
    in: 'euiContextMenuPanel-txInLeft',
    out: 'euiContextMenuPanel-txOutLeft',
  },
  previous: {
    in: 'euiContextMenuPanel-txInRight',
    out: 'euiContextMenuPanel-txOutRight',
  },
};

export class EuiContextMenuPanel extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    title: PropTypes.node,
    onClose: PropTypes.func,
    onHeightChange: PropTypes.func,
    transitionType: PropTypes.oneOf(['in', 'out']),
    transitionDirection: PropTypes.oneOf(['next', 'previous']),
    onTransitionComplete: PropTypes.func,
    onUseKeyboardToNavigate: PropTypes.func,
    hasFocus: PropTypes.bool,
    items: PropTypes.array,
    watchedItemProps: PropTypes.array,
    showNextPanel: PropTypes.func,
    showPreviousPanel: PropTypes.func,
    initialFocusedItemIndex: PropTypes.number,
  };

  static defaultProps = {
    hasFocus: true,
    items: [],
  };

  constructor(props) {
    super(props);

    this.state = {
      prevProps: {
        items: this.props.items,
      },
      menuItems: [],
      isTransitioning: Boolean(props.transitionType),
      focusedItemIndex: props.initialFocusedItemIndex,
      currentHeight: undefined,
    };
  }

  incrementFocusedItemIndex = amount => {
    let nextFocusedItemIndex;

    if (this.state.focusedItemIndex === undefined) {
      // If this is the beginning of the user's keyboard navigation of the menu, then we'll focus
      // either the first or last item.
      nextFocusedItemIndex = amount < 0 ? this.state.menuItems.length - 1 : 0;
    } else {
      nextFocusedItemIndex = this.state.focusedItemIndex + amount;

      if (nextFocusedItemIndex < 0) {
        nextFocusedItemIndex = this.state.menuItems.length - 1;
      } else if (nextFocusedItemIndex === this.state.menuItems.length) {
        nextFocusedItemIndex = 0;
      }
    }

    this.setState({
      focusedItemIndex: nextFocusedItemIndex,
    });
  };

  onKeyDown = e => {
    // If this panel contains items you can use the left arrow key to go back at any time.
    // But if it doesn't contain items, then you have to focus on the back button specifically,
    // since there could be content inside the panel which requires use of the left arrow key,
    // e.g. text inputs.
    if (
      this.props.items.length ||
      document.activeElement === this.backButton ||
      document.activeElement === this.panel
    ) {
      if (e.keyCode === cascadingMenuKeyCodes.LEFT) {
        if (this.props.showPreviousPanel) {
          e.preventDefault();
          e.stopPropagation();
          this.props.showPreviousPanel();

          if (this.props.onUseKeyboardToNavigate) {
            this.props.onUseKeyboardToNavigate();
          }
        }
      }
    }

    if (this.props.items.length) {
      switch (e.keyCode) {
        case cascadingMenuKeyCodes.TAB:
          // We need to sync up with the user if s/he is tabbing through the items.
          const focusedItemIndex = this.state.menuItems.indexOf(
            document.activeElement
          );

          this.setState({
            focusedItemIndex:
              focusedItemIndex >= 0 &&
              focusedItemIndex < this.state.menuItems.length
                ? focusedItemIndex
                : undefined,
          });
          break;

        case cascadingMenuKeyCodes.UP:
          e.preventDefault();
          this.incrementFocusedItemIndex(-1);

          if (this.props.onUseKeyboardToNavigate) {
            this.props.onUseKeyboardToNavigate();
          }
          break;

        case cascadingMenuKeyCodes.DOWN:
          e.preventDefault();
          this.incrementFocusedItemIndex(1);

          if (this.props.onUseKeyboardToNavigate) {
            this.props.onUseKeyboardToNavigate();
          }
          break;

        case cascadingMenuKeyCodes.RIGHT:
          if (this.props.showNextPanel) {
            e.preventDefault();
            this.props.showNextPanel(this.state.focusedItemIndex);

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

  updateFocus() {
    // Give positioning time to render before focus is applied. Otherwise page jumps.
    requestAnimationFrame(() => {
      if (!this._isMounted) {
        return;
      }

      // If this panel has lost focus, then none of its content should be focused.
      if (!this.props.hasFocus) {
        if (this.panel.contains(document.activeElement)) {
          document.activeElement.blur();
        }
        return;
      }

      // Setting focus while transitioning causes the animation to glitch, so we have to wait
      // until it's finished before we focus anything.
      if (this.state.isTransitioning) {
        return;
      }

      // If there aren't any items then this is probably a form or something.
      if (!this.state.menuItems.length) {
        // If we've already focused on something inside the panel, everything's fine.
        if (this.panel.contains(document.activeElement)) {
          return;
        }

        // Otherwise let's focus the first tabbable item and expedite input from the user.
        if (this.content) {
          const tabbableItems = tabbable(this.content);
          if (tabbableItems.length) {
            tabbableItems[0].focus();
          }
        }
        return;
      }

      // If an item is focused, focus it.
      if (this.state.focusedItemIndex !== undefined) {
        this.state.menuItems[this.state.focusedItemIndex].focus();
        return;
      }

      // Focus on the panel as a last resort.
      if (!this.panel.contains(document.activeElement)) {
        this.panel.focus();
      }
    });
  }

  onTransitionComplete = () => {
    this.setState({
      isTransitioning: false,
    });

    if (this.props.onTransitionComplete) {
      this.props.onTransitionComplete();
    }
  };

  componentDidMount() {
    this.updateFocus();
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    let needsUpdate = false;
    const nextState = {};

    // Clear refs to menuItems if we're getting new ones.
    if (nextProps.items !== prevState.prevProps.items) {
      needsUpdate = true;
      nextState.menuItems = [];
      nextState.prevProps = { items: nextProps.items };
    }

    if (nextProps.transitionType) {
      needsUpdate = true;
      nextState.isTransitioning = true;
    }

    if (needsUpdate) {
      return nextState;
    }
    return null;
  }

  getWatchedPropsForItems(items) {
    // This lets us compare prevProps and nextProps among items so we can re-render if our items
    // have changed.
    const { watchedItemProps } = this.props;

    // Create fingerprint of all item's watched properties
    if (items.length && watchedItemProps && watchedItemProps.length) {
      return JSON.stringify(
        items.map(item => {
          // Create object of item properties and values
          const props = {
            key: item.key,
          };
          watchedItemProps.forEach(prop => (props[prop] = item.props[prop]));
          return props;
        })
      );
    }

    return null;
  }

  didItemsChange(prevItems, nextItems) {
    // If the count of items has changed then update
    if (prevItems.length !== nextItems.length) {
      return true;
    }

    // Check if any watched item properties changed by quick string comparison
    if (
      this.getWatchedPropsForItems(nextItems) !==
      this.getWatchedPropsForItems(prevItems)
    ) {
      return true;
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    // Prevent calling `this.updateFocus()` below if we don't have to.
    if (nextProps.hasFocus !== this.props.hasFocus) {
      return true;
    }

    if (nextState.isTransitioning !== this.state.isTransitioning) {
      return true;
    }

    if (nextState.focusedItemIndex !== this.state.focusedItemIndex) {
      return true;
    }

    // **
    // this component should have either items or children,
    // if there are items we can determine via `watchedItemProps` if we should update
    // if there are children we can't know if they have changed so return true
    // **

    if (this.props.items.length > 0 || nextProps.items.length > 0) {
      if (this.didItemsChange(this.props.items, nextProps.items)) {
        return true;
      }
    }

    // it's not possible (in any good way) to know if `children` has changed, assume they might have
    if (this.props.children != null) {
      return true;
    }

    return false;
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

  componentDidUpdate() {
    this.updateFocus();
  }

  menuItemRef = (index, node) => {
    // There's a weird bug where if you navigate to a panel without items, then this callback
    // is still invoked, so we have to do a truthiness check.
    if (node) {
      // Store all menu items.
      this.state.menuItems[index] = node;
    }
  };

  panelRef = node => {
    this.panel = node;

    this.updateHeight();
  };

  contentRef = node => {
    this.content = node;
  };

  render() {
    const {
      children,
      className,
      onClose,
      title,
      onHeightChange,
      transitionType,
      transitionDirection,
      onTransitionComplete,
      onUseKeyboardToNavigate,
      hasFocus,
      items,
      watchedItemProps,
      initialFocusedItemIndex,
      showNextPanel,
      showPreviousPanel,
      ...rest
    } = this.props;
    let panelTitle;

    if (title) {
      if (Boolean(onClose)) {
        panelTitle = (
          <button
            className="euiContextMenuPanelTitle"
            type="button"
            onClick={onClose}
            ref={node => {
              this.backButton = node;
            }}
            data-test-subj="contextMenuPanelTitleButton">
            <span className="euiContextMenu__itemLayout">
              <EuiIcon
                type="arrowLeft"
                size="m"
                className="euiContextMenu__icon"
              />

              <span className="euiContextMenu__text">{title}</span>
            </span>
          </button>
        );
      } else {
        panelTitle = (
          <EuiPopoverTitle>
            <span className="euiContextMenu__itemLayout">{title}</span>
          </EuiPopoverTitle>
        );
      }
    }

    const classes = classNames(
      'euiContextMenuPanel',
      className,
      this.state.isTransitioning &&
        transitionDirectionAndTypeToClassNameMap[transitionDirection]
        ? transitionDirectionAndTypeToClassNameMap[transitionDirection][
            transitionType
          ]
        : undefined
    );

    const content = items.length
      ? items.map((MenuItem, index) =>
          cloneElement(MenuItem, {
            buttonRef: this.menuItemRef.bind(this, index),
          })
        )
      : children;

    return (
      <div
        ref={this.panelRef}
        className={classes}
        onKeyDown={this.onKeyDown}
        tabIndex="0"
        onAnimationEnd={this.onTransitionComplete}
        {...rest}>
        {panelTitle}

        <div ref={this.contentRef}>
          <EuiResizeObserver onResize={() => this.updateHeight()}>
            {resizeRef => <div ref={resizeRef}>{content}</div>}
          </EuiResizeObserver>
        </div>
      </div>
    );
  }
}
