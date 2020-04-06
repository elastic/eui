import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { EuiListGroup, EuiListGroupItem } from '../list_group';
import { EuiNavDrawerFlyout } from './nav_drawer_flyout';
import { EuiNavDrawerGroup, ATTR_SELECTOR } from './nav_drawer_group';
import { EuiOutsideClickDetector } from '../outside_click_detector';
import { EuiI18n } from '../i18n';
import { EuiFlexItem, EuiFlexGroup } from '../flex';
import { throttle } from '../color_picker/utils';

const MENU_ELEMENT_ID = 'navDrawerMenu';

export class EuiNavDrawer extends Component {
  constructor(props) {
    super(props);
    this.expandButtonRef;

    this.state = {
      isLocked: props.isLocked,
      isCollapsed: !props.isLocked,
      flyoutIsCollapsed: true,
      outsideClickDisabled: true,
      isManagingFocus: false,
      toolTipsEnabled: true,
      focusReturnRef: null,
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

  // Although not used in `src/`, this method is available to and used in `src-docs/`
  // for implementation-specific nav menu toggling via `ref` reference
  toggleOpen = () => {
    this.setState(
      ({ isCollapsed }) => ({
        isCollapsed: !isCollapsed,
      }),
      () => {
        this.setState(({ isCollapsed }) => ({
          outsideClickDisabled: isCollapsed,
          toolTipsEnabled: isCollapsed,
        }));
      }
    );
  };

  collapseButtonClick = () => {
    if (this.state.isCollapsed) {
      this.expandDrawer();
    } else {
      this.collapseDrawer();
    }

    this.collapseFlyout();

    requestAnimationFrame(() => {
      if (this.expandButtonRef) {
        this.expandButtonRef.focus();
      }
    });
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

  expandFlyout = (links, title, item) => {
    const content = links;

    if (this.state.navFlyoutTitle === title) {
      this.collapseFlyout();
    } else {
      this.setState(
        ({ isLocked }) => {
          return {
            flyoutIsCollapsed: false,
            navFlyoutTitle: title,
            navFlyoutContent: content,
            isCollapsed: isLocked ? false : true,
            toolTipsEnabled: false,
            outsideClickDisabled: false,
            focusReturnRef: item.label,
          };
        },
        () => {
          // Ideally this uses React `ref` instead of `querySelector`, but the menu composition
          // does not allow for deep `ref` element management at present
          const element = document.querySelector(
            `#${MENU_ELEMENT_ID} [${ATTR_SELECTOR}='${item.label}']`
          );
          if (!element) return;
          element.setAttribute('aria-expanded', 'true');
        }
      );
    }
  };

  collapseFlyout = (shouldReturnFocus = true) => {
    const focusReturn = this.state.focusReturnRef;
    this.setState(
      {
        flyoutIsCollapsed: true,
        navFlyoutTitle: null,
        navFlyoutContent: null,
        toolTipsEnabled: this.state.isLocked ? false : true,
        focusReturnRef: null,
      },
      () => {
        // Ideally this uses React `ref` instead of `querySelector`, but the menu composition
        // does not allow for deep `ref` element management at present
        const element = document.querySelector(
          `#${MENU_ELEMENT_ID} [${ATTR_SELECTOR}='${focusReturn}']`
        );
        if (!element) return;
        requestAnimationFrame(() => {
          element.setAttribute('aria-expanded', 'false');
        });
        if (!shouldReturnFocus) return;
        requestAnimationFrame(() => {
          element.focus();
        });
      }
    );
  };

  closeBoth = () => {
    if (!this.state.isLocked) this.collapseDrawer();
    this.collapseFlyout(false);
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

  modifyChildren = children => {
    // Loop through the EuiNavDrawer children (EuiListGroup, EuiHorizontalRules, etc)
    // Filter out falsy items
    const filteredChildren = React.Children.toArray(children);
    return React.Children.map(filteredChildren, child => {
      // Allow for Fragments by recursive modification
      if (child.type === React.Fragment) {
        return this.modifyChildren(child.props.children);
      } else if (child.type === EuiNavDrawerGroup) {
        // Check if child is an EuiNavDrawerGroup and if it does have a flyout, add the expand function
        return React.cloneElement(child, {
          flyoutMenuButtonClick: this.expandFlyout,
          showToolTips: this.state.toolTipsEnabled && this.props.showToolTips,
        });
      } else {
        return child;
      }
    });
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
                buttonRef={node => (this.expandButtonRef = node)}
                label={this.state.isCollapsed ? sideNavExpand : sideNavCollapse}
                iconType={this.state.isCollapsed ? 'menuRight' : 'menuLeft'}
                size="s"
                className={
                  this.state.isCollapsed
                    ? 'navDrawerExpandButton-isCollapsed'
                    : 'navDrawerExpandButton-isExpanded'
                }
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
                  'aria-pressed': this.state.isLocked ? true : false,
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
        onClose={this.collapseFlyout}
      />
    );

    // Add an onClick that expands the flyout sub menu for any list items (links)
    // that have a flyoutMenu prop (sub links)
    let modifiedChildren = children;

    modifiedChildren = this.modifyChildren(this.props.children);

    const menuClasses = classNames('euiNavDrawerMenu', {
      'euiNavDrawerMenu-hasFooter': footerContent,
    });

    return (
      <EuiOutsideClickDetector
        onOutsideClick={() => this.closeBoth()}
        isDisabled={this.state.outsideClickDisabled}>
        <nav className={classes} {...rest}>
          <EuiFlexGroup gutterSize="none" responsive={false}>
            <EuiFlexItem grow={false}>
              <div
                id={MENU_ELEMENT_ID}
                className={menuClasses}
                onClick={this.handleDrawerMenuClick}>
                {/* TODO: Add a "skip navigation" keyboard only button */}
                {footerContent}
                {modifiedChildren}
              </div>
            </EuiFlexItem>
            {flyoutContent}
          </EuiFlexGroup>
        </nav>
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
