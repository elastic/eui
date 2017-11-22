import React, { Component } from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';

import {
  Link,
} from 'react-router';

import {
  EuiSideNav,
  EuiIcon,
  EuiButtonEmpty,
  EuiSideNavItem,
  EuiSideNavTitle,
  EuiFieldSearch,
  EuiFlexGroup,
  EuiFlexItem,
  EuiSpacer,
} from '../../../../src/components';

export class GuidePageChrome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: '',
      isSideNavOpenOnMobile: false,
    };
  }

  toggleOpenOnMobile() {
    this.setState({
      isSideNavOpenOnMobile: !this.state.isSideNavOpenOnMobile,
    });
  }

  onSearchChange = event => {
    this.setState({
      search: event.target.value,
    });
  };

  scrollTo = position => {
    $('html, body').animate({
      scrollTop: position,
    }, 250);
  };

  onClickLink = id => {
    // Scroll to element.
    this.scrollTo($(`#${id}`).offset().top - 20);
  };

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
      <EuiFlexGroup alignItems="center" gutterSize="s" responsive={false}>
        <EuiFlexItem grow={false}>
          {homeLink}
        </EuiFlexItem>

        <EuiFlexItem grow={false}>
          <EuiButtonEmpty
            size="xs"
            onClick={this.props.onToggleTheme}
            className="euiLink"
            iconSide="right"
            color="text"
            iconType="invert"
          >
              Flip theme
          </EuiButtonEmpty>
        </EuiFlexItem>
      </EuiFlexGroup>
    );
  }

  renderComponentPageLinks() {
    const matchingItems = this.props.components.filter(item => (
      item.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
    ));

    return matchingItems.map((item, index) => (
      <EuiSideNavItem
        key={`componentNavItem-${index}`}
        isSelected={item.name === this.props.currentRouteName}
        indent={item.isSubSection}
      >
        <Link
          className="guideNavItem__link"
          to={item.path}
          onClick={this.scrollTo.bind(this, 0)}
        >
          {item.name.replace(/([a-z])([A-Z])/g, '$1 $2')}
        </Link>
      </EuiSideNavItem>
    ));
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

        <EuiFieldSearch
          placeholder="Search..."
          value={this.state.search}
          onChange={this.onSearchChange}
        />

        <EuiSpacer size="m" />

        <EuiSideNav
          mobileTitle="Navigate components"
          toggleOpenOnMobile={this.toggleOpenOnMobile.bind(this)}
          isOpenOnMobile={this.state.isSideNavOpenOnMobile}
        >

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
  currentRouteName: PropTypes.string.isRequired,
  components: PropTypes.array.isRequired,
  sandboxes: PropTypes.array.isRequired,
  sections: PropTypes.array.isRequired,
};
