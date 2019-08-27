import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { EuiListGroup, EuiListGroupItem } from '../list_group';
import { EuiNavDrawerFlyout } from './nav_drawer_flyout';
import { EuiNavDrawerGroup } from './nav_drawer_group';
import { EuiOutsideClickDetector } from '../outside_click_detector';
import { EuiI18n } from '../i18n';
import { EuiFlexItem } from '../flex';
import { throttle } from '../color_picker/utils';

export class EuiNavDrawer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLocked: props.isLocked,
      isCollapsed: !props.isLocked,
      flyoutIsCollapsed: true,
      outsideClickDisabled: true,
      isManagingFocus: false,
      toolTipsEnabled: true,
    };
  }

  componentDidMount() {
    if (this.props.isLocked) {
      window.addEventListener('resize', this.functionToCallOnWindowResize);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.functionToCallOnWindowResize);
  }

  returnOnIsLockedUpdate = isLockedState => {
    if (this.props.onIsLockedUpdate) {
      this.props.onIsLockedUpdate(isLockedState);
    }
  };

  functionToCallOnWindowResize = throttle(() => {
    if (window.innerWidth < 1200) {
      this.collapseDrawer();
      this.collapseFlyout();
    }
    // reacts every 50ms to resize changes and always gets the final update
  }, 50);

  timeoutID;

  sideNavLockClicked = () => {
    if (this.state.isLocked) {
      window.removeEventListener('resize', this.functionToCallOnWindowResize);
    } else {
      window.addEventListener('resize', this.functionToCallOnWindowResize);
    }

    this.returnOnIsLockedUpdate(!this.state.isLocked);

    this.setState({
      isLocked: !this.state.isLocked,
      isCollapsed: false,
      outsideClickDisabled: true,
    });
  };

  toggleOpen = () => {
    this.setState({
      isCollapsed: !this.state.isCollapsed,
    });

    setTimeout(() => {
      this.setState({
        outsideClickDisabled: this.state.isCollapsed ? true : false,
        toolTipsEnabled: this.state.isCollapsed ? true : false,
      });
    }, 150);
  };

  collapseButtonClick = () => {
    if (this.state.isCollapsed) {
      this.expandDrawer();
    } else {
      this.collapseDrawer();
    }

    this.collapseFlyout();
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
      isLocked: false,
    });

    this.returnOnIsLockedUpdate(false);

    // Scrolls the menu and flyout back to top when the nav drawer collapses
    setTimeout(() => {
      document.getElementById('navDrawerMenu').scrollTop = 0;
    }, 50);

    // In case it was locked before, remove the window resize listener
    window.removeEventListener('resize', this.functionToCallOnWindowResize);
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
  };

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
  };

  expandFlyout = (links, title) => {
    const content = links;

    if (this.state.navFlyoutTitle === title) {
      this.collapseFlyout();
    } else {
      this.setState({
        flyoutIsCollapsed: false,
        navFlyoutTitle: title,
        navFlyoutContent: content,
        isCollapsed: this.state.isLocked ? false : true,
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
      toolTipsEnabled: this.state.isLocked ? false : true,
    });
  };

  closeBoth = () => {
    if (!this.state.isLocked) this.collapseDrawer();
    this.collapseFlyout();
  };

  handleDrawerMenuClick = e => {
    // walk up e.target until either:
    // 1. a[href] - close the menu
    // 2. document.body - do nothing

    let element = e.target;
    while (
      element !== undefined &&
      element !== document.body &&
      (element.tagName !== 'A' || element.getAttribute('href') === undefined)
    ) {
      element = element.parentElement;
    }

    if (element !== document.body) {
      // this is an anchor with an href
      this.closeBoth();
    }
  };

  render() {
    const {
      children,
      className,
      showExpandButton,
      showToolTips,
      isCollapsed,
      isLocked,
      onIsLockedUpdate,
      ...rest
    } = this.props;

    const classes = classNames(
      'euiNavDrawer',
      {
        'euiNavDrawer-isCollapsed': this.state.isCollapsed,
        'euiNavDrawer-isExpanded': !this.state.isCollapsed,
        'euiNavDrawer-isLocked': this.state.isLocked,
        'euiNavDrawer-flyoutIsCollapsed': this.state.flyoutIsCollapsed,
        'euiNavDrawer-flyoutIsExpanded': !this.state.flyoutIsCollapsed,
      },
      className
    );

    let footerContent;
    if (showExpandButton) {
      footerContent = (
        <EuiListGroup className="euiNavDrawer__expandButton" flush>
          <EuiI18n
            tokens={[
              'euiNavDrawer.sideNavCollapse',
              'euiNavDrawer.sideNavExpand',
              'euiNavDrawer.sideNavLockAriaLabel',
              'euiNavDrawer.sideNavLockExpanded',
              'euiNavDrawer.sideNavLockCollapsed',
            ]}
            defaults={[
              'Collapse',
              'Expand',
              'Dock navigation',
              'Navigation is docked',
              'Navigation is undocked',
            ]}>
            {([
              sideNavCollapse,
              sideNavExpand,
              sideNavLockAriaLabel,
              sideNavLockExpanded,
              sideNavLockCollapsed,
            ]) => (
              <EuiListGroupItem
                label={this.state.isCollapsed ? sideNavExpand : sideNavCollapse}
                iconType={this.state.isCollapsed ? 'menuRight' : 'menuLeft'}
                size="s"
                showToolTip={this.state.isCollapsed}
                extraAction={{
                  className: 'euiNavDrawer__expandButtonLockAction',
                  color: 'text',
                  onClick: this.sideNavLockClicked,
                  iconType: this.state.isLocked ? 'lock' : 'lockOpen',
                  iconSize: 's',
                  'aria-label': sideNavLockAriaLabel,
                  title: this.state.isLocked
                    ? sideNavLockExpanded
                    : sideNavLockCollapsed,
                  'aria-checked': this.state.isLocked ? true : false,
                  role: 'switch',
                }}
                onClick={this.collapseButtonClick}
                data-test-subj={
                  this.state.isCollapsed
                    ? 'navDrawerExpandButton-isCollapsed'
                    : 'navDrawerExpandButton-isExpanded'
                }
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
      if (child.type === EuiNavDrawerGroup) {
        const item = React.cloneElement(child, {
          flyoutMenuButtonClick: this.expandFlyout,
          showToolTips: this.state.toolTipsEnabled && showToolTips,
        });
        return item;
      } else {
        return child;
      }
    });

    const menuClasses = classNames('euiNavDrawerMenu', {
      'euiNavDrawerMenu-hasFooter': footerContent,
    });

    return (
      <EuiOutsideClickDetector
        onOutsideClick={() => this.closeBoth()}
        isDisabled={this.state.outsideClickDisabled}>
        <div
          className={classes}
          onBlur={this.focusOut}
          onFocus={this.manageFocus}
          {...rest}>
          <EuiFlexItem grow={false}>
            <div
              id="navDrawerMenu"
              className={menuClasses}
              onClick={this.handleDrawerMenuClick}>
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

  /**
   * Keep drawer locked open by default
   */
  isLocked: PropTypes.bool,

  /**
   * Returns the current state of isLocked
   */
  onIsLockedUpdate: PropTypes.func,
};

EuiNavDrawer.defaultProps = {
  showExpandButton: true,
  showToolTips: true,
};
