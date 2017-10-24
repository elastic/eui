import PropTypes from 'prop-types';
import React, { Component } from 'react';

import {
  Link,
} from 'react-router';

import {
  EuiSideNav,
  EuiIcon,
  EuiSideNavItem,
  EuiSideNavTitle,
  EuiFieldSearch,
  EuiFlexGroup,
  EuiFlexItem,
  EuiText,
  EuiSpacer,
} from '../../../../src/components';

export class GuideNav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: '',
      isSideNavOpenOnMobile: false,
    };

    this.onSearchChange = this.onSearchChange.bind(this);
  }

  toggleOpenOnMobile() {
    this.setState({
      isSideNavOpenOnMobile: !this.state.isSideNavOpenOnMobile,
    });
  }

  onSearchChange(event) {
    this.setState({
      search: event.target.value,
    });
  }

  render() {
    const componentNavItems =
      this.props.components.filter(item => (
        item.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
      )).map((item, index) => {
        return (
          <EuiSideNavItem key={`componentNavItem-${index}`} isSelected={this.props.routes[1].name === item.name}>
            <Link
              className="guideNavItem__link"
              to={item.path}
              onClick={this.props.onShowChrome}
            >
              {item.name}
            </Link>
          </EuiSideNavItem>
        );
      });

    const sandboxNavItems =
      this.props.sandboxes.filter(item => (
        item.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
      )).map((item, index) => {
        return (
          <EuiSideNavItem key={`sandboxNavItem-${index}`}>
            <Link
              className="guideNavItem__link"
              to={item.path}
              onClick={this.props.onHideChrome}
            >
              {item.name}
            </Link>
          </EuiSideNavItem>
        );
      });

    return (
      <div>
        <EuiFlexGroup alignItems="center" gutterSize="small">
          <EuiFlexItem grow={false}>
            <Link
              to="/"
              className="guideLogo"
              onClick={this.props.onShowChrome}
            >
              <EuiIcon type="logoElastic" size="large" />
            </Link>
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <EuiText size="s">
              <button
                to="/"
                onClick={this.props.onToggleTheme}
                className="kuiLink"
              >
                Theme
              </button>
            </EuiText>
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <button
              onClick={this.props.onHideChrome}
            >
              <EuiIcon type="fullScreen" size="medium" />
            </button>
          </EuiFlexItem>
        </EuiFlexGroup>

        <EuiSpacer size="m" />

        <EuiSideNav
          mobileTitle="Navigate components"
          toggleOpenOnMobile={this.toggleOpenOnMobile.bind(this)}
          isOpenOnMobile={this.state.isSideNavOpenOnMobile}
        >
          <EuiFieldSearch
            placeholder="Search..."
            value={this.state.search}
            onChange={this.onSearchChange}
          />

          <EuiSpacer size="m" />

          <EuiSideNavTitle>
            Components
          </EuiSideNavTitle>

          {componentNavItems}

          <EuiSideNavTitle>
            Sandboxes
          </EuiSideNavTitle>

          {sandboxNavItems}

        </EuiSideNav>
      </div>
    );
  }
}

GuideNav.propTypes = {
  isChromeVisible: PropTypes.bool,
  isSandbox: PropTypes.bool,
  onToggleNav: PropTypes.func,
  onHideChrome: PropTypes.func,
  onShowChrome: PropTypes.func,
  routes: PropTypes.array,
  getPreviousRoute: PropTypes.func,
  components: PropTypes.array,
  sandboxes: PropTypes.array,
};
