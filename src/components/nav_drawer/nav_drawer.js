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

    if (this.state.navFlyoutTitle === title) {
      this.collapseFlyout();
    } else {
      this.setState({
        flyoutIsCollapsed: false,
        navFlyoutTitle: title,
        navFlyoutContent: content,
        isCollapsed: true,
        toolTipsEnabled: false,
        outsideClickDisabled: false,
      });
    }
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

  handleDrawerMenuClick = e => {
    // walk up e.target until either:
    // 1. a[href] - close the menu
    // 2. document.body - do nothing

    let element = e.target;
    while (element !== undefined && element !== document.body && (element.tagName !== 'A' || element.getAttribute('href') === undefined)) {
      element = element.parentElement;
    }

    if (element !== document.body) {
      // this is an anchor with an href
      this.closeBoth();
    }
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
                iconType={this.state.isCollapsed ? 'menuRight' : 'menuLeft'}
                size="s"
                showToolTip={this.state.isCollapsed}
                onClick={this.state.isCollapsed ? () => {this.expandDrawer(); this.collapseFlyout();} : () => this.collapseDrawer()}
                data-test-subj={this.state.isCollapsed ? 'navDrawerExpandButton-isCollapsed' : 'navDrawerExpandButton-isExpanded'}
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
    modifiedChildren = React.Children.map(this.props.children, child => {
      // 2. Check if child is an EuiNavDrawerGroup and if it does have a flyout, add the expand function
      if (child.type.name === 'EuiNavDrawerGroup') {
        const item = React.cloneElement(child, {
          flyoutMenuButtonClick: this.expandFlyout,
          showToolTips: this.state.toolTipsEnabled && showToolTips,
        });
        return item;
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
            <div id="navDrawerMenu" className={menuClasses} onClick={this.handleDrawerMenuClick}>
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
