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

export class GuidePageChrome extends Component {
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

  renderIdentity() {
    const homeLink = (
      <Link
        to="/"
        className="guideLogo"
      >
        <EuiIcon type="logoElastic" size="l" />
      </Link>
    );

    return (
      <EuiFlexGroup alignItems="center" gutterSize="s">
        <EuiFlexItem grow={false}>
          {homeLink}
        </EuiFlexItem>

        <EuiFlexItem grow={false}>
          <EuiText size="s">
            <button
              onClick={this.props.onToggleTheme}
              className="euiLink"
            >
              Theme
            </button>
          </EuiText>
        </EuiFlexItem>
      </EuiFlexGroup>
    );
  }

  renderComponentPageLinks() {
    return this.props.components.filter(item => (
      item.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
    )).map((item, index) => {
      return (
        <EuiSideNavItem
          key={`componentNavItem-${index}`}
          isSelected={item.name === this.props.currentRouteName}
        >
          <Link
            className="guideNavItem__link"
            to={item.path}
          >
            {item.name}
          </Link>
        </EuiSideNavItem>
      );
    });
  }

  renderSandboxLinks() {
    return this.props.sandboxes.filter(item => (
      item.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
    )).map((item, index) => {
      return (
        <EuiSideNavItem key={`sandboxNavItem-${index}`}>
          <Link
            className="guideNavItem__link"
            to={item.path}
          >
            {item.name}
          </Link>
        </EuiSideNavItem>
      );
    });
  }

  render() {
    const componentNavItems = this.renderComponentPageLinks();
    const sandboxNavItems = this.renderSandboxLinks();

    return (
      <div>
        {this.renderIdentity()}

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

GuidePageChrome.propTypes = {
  enterSandbox: PropTypes.func,
  currentRouteName: PropTypes.string,
  getPreviousRoute: PropTypes.func,
  components: PropTypes.array,
  sandboxes: PropTypes.array,
};
