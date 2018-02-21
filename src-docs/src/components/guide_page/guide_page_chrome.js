import React, { Component } from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';

import {
  Link,
} from 'react-router';

import {
  EuiFieldSearch,
  EuiFlexGroup,
  EuiFlexItem,
  EuiIcon,
  EuiSideNav,
  EuiSpacer,
  EuiText,
} from '../../../../src/components';

import {
  GuideThemeSelector,
} from '../guide_theme_selector';

export class GuidePageChrome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: '',
      isSideNavOpenOnMobile: false,
    };
  }

  toggleOpenOnMobile = () => {
    this.setState({
      isSideNavOpenOnMobile: !this.state.isSideNavOpenOnMobile,
    });
  };

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
          <GuideThemeSelector
            onToggleTheme={this.props.onToggleTheme}
            selectedTheme={this.props.selectedTheme}
          />
        </EuiFlexItem>
      </EuiFlexGroup>
    );
  }

  renderSubSections = (subSections = []) => {
    if (subSections.length <= 1) {
      return;
    }

    return subSections.map(({ title, id }) => ({
      id: `subSection-${id}`,
      name: title,
      onClick: this.onClickLink.bind(this, id),
    }));
  }

  renderSideNav = sideNav => {
    // TODO: Add contents pages
    const sideNavSections = [];

    sideNav.forEach(section => {
      const matchingItems = section.items.filter(item => (
        item.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
      ));

      const items = matchingItems.map(item => {
        const {
          name,
          path,
          sections,
        } = item;

        return {
          id: `${section.type}-${path}`,
          name,
          href: `#/${path}`,
          items: this.renderSubSections(sections),
          isSelected: name === this.props.currentRouteName,
        };
      });

      if (!items.length) {
        return;
      }

      sideNavSections.push({
        name: section.name,
        id: section.type,
        items,
      });
    });

    return sideNavSections;
  };

  render() {
    const sideNav = this.renderSideNav(this.props.navigation);

    let sideNavContent;

    if (sideNav.length) {
      sideNavContent = (
        <EuiSideNav
          mobileTitle="Navigate components"
          toggleOpenOnMobile={this.toggleOpenOnMobile}
          isOpenOnMobile={this.state.isSideNavOpenOnMobile}
          items={sideNav}
        />
      );
    } else {
      sideNavContent = (
        <EuiText color="subdued" size="s">
          <p>No matches</p>
        </EuiText>
      );
    }

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

        {sideNavContent}
      </div>
    );
  }
}

GuidePageChrome.propTypes = {
  currentRouteName: PropTypes.string.isRequired,
  onToggleTheme: PropTypes.func.isRequired,
  selectedTheme: PropTypes.string.isRequired,
  navigation: PropTypes.array.isRequired,
};
