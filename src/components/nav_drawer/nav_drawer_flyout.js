import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import FocusTrap from 'focus-trap-react';

import { EuiTitle } from '../title';
import { EuiListGroup } from '../list_group';

export class EuiNavDrawerFlyout extends Component {
  static propTypes = {
    className: PropTypes.string,
    listItems: EuiListGroup.propTypes.listItems,

    /**
     * Display a title atop the flyout
     */
    title: PropTypes.string,

    /**
     * Toggle the nav drawer between collapsed and expanded
     */
    isCollapsed: PropTypes.bool,
  };

  static defaultProps = {
    isCollapsed: true,
  };

  constructor(...args) {
    super(...args);

    // The version of focus-trap-react that we're on only
    // returns focus when the trap is unmounted, not on deactivation
    // To track if we need the trap mounted or not means tracking focus
    this.state = {
      trappingFocus: false,
    };
  }

  componentDidUpdate(prevProps) {
    const { isCollapsed: wasCollapsed, listItems: prevItems } = prevProps;
    const { isCollapsed, listItems } = this.props;

    const nowExpanded = wasCollapsed && !isCollapsed;
    const newItems = prevItems !== listItems;
    if (nowExpanded || newItems) {
      this.setState({ // eslint-disable-line react/no-did-update-set-state
        trappingFocus: true
      });
    }
  }

  untrap = () => {
    this.setState({
      trappingFocus: false
    });
  }

  render() {
    const { className, title, isCollapsed, listItems, ...rest } = this.props;
    const classes = classNames(
      'euiNavDrawerFlyout',
      {
        'euiNavDrawerFlyout-isCollapsed': isCollapsed,
        'euiNavDrawerFlyout-isExpanded': !isCollapsed,
      },
      className
    );

    const items = <EuiListGroup className="euiNavDrawerFlyout__listGroup" listItems={listItems} />;

    return (
      <div
        className={classes}
        aria-labelledby="navDrawerFlyoutTitle"
        onBlur={this.onBlur}
        {...rest}
      >
        <EuiTitle tabIndex="-1" size="xxs"><h5 id="navDrawerFlyoutTitle">{title}</h5></EuiTitle>
        {
          this.state.trappingFocus
            ? (
              <FocusTrap
                active={true}
                focusTrapOptions={{
                  clickOutsideDeactivates: true,
                  returnFocusOnDeactivate: true,
                  onDeactivate: this.untrap,
                }}
              >
                {items}
              </FocusTrap>
            )
            : items
        }
      </div>
    );

  }
}
