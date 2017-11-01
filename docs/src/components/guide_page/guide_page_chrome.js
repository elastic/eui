import React, { Component } from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';

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
    const matchingItems = this.props.components.filter(item => (
      item.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
    ));

    // Build links to subsections if there's more than 1.
    if (this.props.sections.length > 1) {
      const currentSectionIndex = matchingItems.findIndex(item => item.name === this.props.currentRouteName);
      if (currentSectionIndex !== -1) {
        const subSections = this.props.sections.map(section => {
          return {
            ...section,
            isSubSection: true,
          };
        });
        matchingItems[currentSectionIndex].hasSubSections = true;
        matchingItems.splice(currentSectionIndex + 1, 0, ...subSections);
      }
    }

    return matchingItems.map((item, index) => {
      let button;

      if (item.isSubSection) {
        button = (
          <button
            className="guideNavItem__link"
            onClick={this.onClickLink.bind(this, item.id)}
          >
            {item.name}
          </button>
        );
      } else {
        button = (
          <Link
            className="guideNavItem__link"
            to={item.path}
            onClick={this.scrollTo.bind(this, 0)}
          >
            {item.name}
          </Link>
        );
      }

      return (
        <EuiSideNavItem
          key={`componentNavItem-${index}`}
          isSelected={item.name === this.props.currentRouteName}
          indent={item.isSubSection}
        >
          {button}
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
  currentRouteName: PropTypes.string.isRequired,
  components: PropTypes.array.isRequired,
  sandboxes: PropTypes.array.isRequired,
  sections: PropTypes.array.isRequired,
};
