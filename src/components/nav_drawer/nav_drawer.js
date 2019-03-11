import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { EuiListGroup, EuiListGroupItem } from '../list_group';
import { EuiNavDrawerFlyout } from './nav_drawer_flyout';
import { EuiOutsideClickDetector } from '../outside_click_detector';
import { EuiI18n } from '../i18n';
import { EuiFlexItem } from '../flex';


export class EuiNavDrawer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isCollapsed: true,
      flyoutIsCollapsed: true,
      outsideClickDisabled: true,
      isManagingFocus: false,
      toolTipsEnabled: true,
    };
  }

  timeoutID;

  toggleOpen = () => {
    this.setState({
      isCollapsed: !this.state.isCollapsed
    });

    setTimeout(() => {
      this.setState({
        outsideClickDisabled: this.state.isCollapsed ? true : false,
        toolTipsEnabled: this.state.isCollapsed ? true : false,
      });
    }, 150);
  };

  expandDrawer = () => {
    this.setState({
      isCollapsed: false,
      outsideClickDisabled: false,
    });

    setTimeout(() => {
      this.setState({
        toolTipsEnabled: false,
      });
    }, 150);
  };

  collapseDrawer = () => {
    this.setState({
      isCollapsed: true,
      outsideClickDisabled: this.state.flyoutIsCollapsed ? true : false,
      toolTipsEnabled: true,
    });

    // Scrolls the menu and flyout back to top when the nav drawer collapses
    setTimeout(() => {
      document.getElementById('navDrawerMenu').scrollTop = 0;
    }, 50);
  };

  manageFocus = () => {
    // This prevents the drawer from collapsing when tabbing through children
    // by clearing the timeout thus cancelling the onBlur event (see focusOut).
    // This means isManagingFocus remains true as long as a child element
    // has focus. This is the case since React bubbles up onFocus and onBlur
    // events from the child elements.
    clearTimeout(this.timeoutID);

    if (!this.state.isManagingFocus) {
      this.setState({
        isManagingFocus: true,
      });
    }
  }

  focusOut = () => {
    // This collapses the drawer when no children have focus (i.e. tabbed out).
    // In other words, if focus does not bubble up from a child element, then
    // the drawer will collapse. See the corresponding block in expandDrawer
    // (called by onFocus) which cancels this operation via clearTimeout.
    this.timeoutID = setTimeout(() => {
      if (this.state.isManagingFocus) {
        this.setState({
          isManagingFocus: false,
        });

        this.closeBoth();
      }
    }, 0);
  }

  expandFlyout = (links, title) => {
    const content = links;

    this.setState({
      flyoutIsCollapsed: false,
      navFlyoutTitle: title,
      navFlyoutContent: content,
      isCollapsed: true,
      toolTipsEnabled: false,
      outsideClickDisabled: false,
    });
  };

  collapseFlyout = () => {
    this.setState({
      flyoutIsCollapsed: true,
      navFlyoutTitle: null,
      navFlyoutContent: null,
      toolTipsEnabled: true,
    });
  };

  closeBoth = () => {
    this.collapseDrawer();
    this.collapseFlyout();
  }

  render() {
    const {
      children,
      className,
      showExpandButton,
      showToolTips,
      ...rest
    } = this.props;

    const classes = classNames(
      'euiNavDrawer',
      {
        'euiNavDrawer-isCollapsed': this.state.isCollapsed,
        'euiNavDrawer-isExpanded': !this.state.isCollapsed,
        'euiNavDrawer-flyoutIsCollapsed': this.state.flyoutIsCollapsed,
        'euiNavDrawer-flyoutIsExpanded': !this.state.flyoutIsCollapsed,
      },
      className
    );

    let footerContent;
    if (showExpandButton) {
      footerContent = (
        <EuiListGroup
          className="euiNavDrawer__expandButton"
          flush
        >
          <EuiI18n
            tokens={['euiNavDrawer.sideNavCollapse', 'euiNavDrawer.sideNavExpand']}
            defaults={['Collapse', 'Expand']}
          >
            {([sideNavCollapse, sideNavExpand]) => (
              <EuiListGroupItem
                label={this.state.isCollapsed ? sideNavExpand : sideNavCollapse}
                iconType={this.state.isCollapsed ? 'sortRight' : 'sortLeft'}
                size="s"
                showToolTip={this.state.isCollapsed}
                onClick={this.state.isCollapsed ? () => {this.expandDrawer(); this.collapseFlyout();} : () => this.collapseDrawer()}
              />
            )}
          </EuiI18n>
        </EuiListGroup>
      );
    }

    const flyoutContent = (
      <EuiNavDrawerFlyout
        id="navDrawerFlyout"
        title={this.state.navFlyoutTitle}
        isCollapsed={this.state.flyoutIsCollapsed}
        listItems={this.state.navFlyoutContent}
        wrapText
      />
    );

    // Add an onClick that expands the flyout sub menu for any list items (links)
    // that have a flyoutMenu prop (sub links)
    let modifiedChildren = children;

    // 1. Loop through the EuiNavDrawer children (EuiListGroup, EuiHorizontalRules, etc)
    modifiedChildren = React.Children.map(this.props.children, (child, childIndex) => {

      // 2a. Check if child is an EuiListGroup (i.e. not an EuiHorizontalRule)
      if (child.type.name === 'EuiListGroup') {

        // 3a. Loop through list items passed as an array on EuiListGroup
        if (typeof child.props.listItems !== 'undefined') {
          const listItemArray = child.props.listItems;
          const modifiedListItems = listItemArray.map((item) => {
            // 4. If there is a flyoutMenu prop, then add an onClick prop
            if (item.flyoutMenu) {
              const { flyoutMenu, ...itemProps } = item;
              return {
                onClick: () => this.expandFlyout(flyoutMenu.listItems, flyoutMenu.title),
                ...itemProps
              };
            }
            return item;
          });
          child = ({ ...child, ...{
            props: ({ ...child.props, ...{ listItems: modifiedListItems } })
          } });
        }

        // 3b. Loop through list itmes passed as separate EuiListGroupItem components
        if (typeof child.props.children !== 'undefined') {
          const listGroupItems = child.props.children;

          // 4. If there is a flyoutMenu prop, then add an onClick prop
          // If only one child, then there is no index; props is top level
          if (listGroupItems.props) {
            const item = React.cloneElement(listGroupItems, {
              onClick: listGroupItems.props.flyoutMenu ?
                () => this.expandFlyout(
                  listGroupItems.props.flyoutMenu.listItems,
                  listGroupItems.props.flyoutMenu.title
                )
                : null,
            });

            // Remove `flyoutMenu` so it doesn't get passed to the DOM
            const {
              flyoutMenu,  // eslint-disable-line no-unused-vars
              ...itemProps
            } = item.props;

            child = React.cloneElement(child, {
              key: childIndex,
              children: ({ ...item, ...{ props: { ...itemProps } } })
            });
          // If more than one child, then there is an index
          } else {
            child = React.cloneElement(child, {
              key: childIndex,
              children: Object.keys(listGroupItems).map((key, itemIndex) => {
                const item = React.cloneElement(listGroupItems[key], {
                  key: itemIndex,
                  onClick: listGroupItems[itemIndex].props.flyoutMenu ?
                    () => this.expandFlyout(
                      listGroupItems[itemIndex].props.flyoutMenu.listItems,
                      listGroupItems[itemIndex].props.flyoutMenu.title
                    )
                    : null,
                });

                // Remove `flyoutMenu` so it doesn't get passed to the DOM
                const {
                  flyoutMenu,  // eslint-disable-line no-unused-vars
                  ...itemProps
                } = item.props;

                return ({ ...item, ...{ props: { ...itemProps } } });
              })
            });
          }
        }

        // 5. If showToolTips passed and currently enabled, add showToolTips prop to EuiListGroup
        if (this.state.toolTipsEnabled && showToolTips) {
          return React.cloneElement(child, {
            showToolTips: true
          });
        } else {
          return child;
        }

      // 2b. Child is not an EuiListGroup, so just return it as-is
      } else {
        return child;
      }
    });

    const menuClasses = classNames(
      'euiNavDrawerMenu', { 'euiNavDrawerMenu-hasFooter': footerContent, },
    );

    return (
      <EuiOutsideClickDetector
        onOutsideClick={() => this.closeBoth()}
        isDisabled={this.state.outsideClickDisabled}
      >
        <div
          className={classes}
          onBlur={this.focusOut}
          onFocus={this.manageFocus}
          {...rest}
        >
          <EuiFlexItem grow={false}>
            <div id="navDrawerMenu" className={menuClasses}>
              {/* Put expand button first so it's first in tab order then on toggle starts the tabbing of the items from the top */}
              {/* TODO: Add a "skip navigation" keyboard only button */}
              {footerContent}
              {modifiedChildren}
            </div>
          </EuiFlexItem>

          {flyoutContent}
        </div>
      </EuiOutsideClickDetector>
    );
  }
}

EuiNavDrawer.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,

  /**
   * Adds fixed toggle button to bottom of menu area
   */
  showExpandButton: PropTypes.bool,

  /**
   * Display tooltips on side nav items
   */
  showToolTips: PropTypes.bool,
};

EuiNavDrawer.defaultProps = {
  showExpandButton: true,
  showToolTips: true,
};
