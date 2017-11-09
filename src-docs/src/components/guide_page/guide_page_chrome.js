import React, { Component } from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';

import {
  Link,
} from 'react-router';

import {
  EuiButtonEmpty,
  EuiFieldSearch,
  EuiFlexGroup,
  EuiFlexItem,
  EuiIcon,
  EuiSideNav,
  EuiSpacer,
  EuiText,
} from '../../../../src/components';

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

  renderComponentNavItems() {
    const matchingItems = this.props.components.filter(item => (
      item.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
    ));

    // Build links to subsections if there's more than 1.
    if (this.props.sections.length > 1) {
      const currentSectionIndex = matchingItems.findIndex(item => item.name === this.props.currentRouteName);
      if (currentSectionIndex !== -1) {
        matchingItems[currentSectionIndex].subSections = this.props.sections.map(section => {
          return {
            ...section,
          };
        });
      }
    }

    return {
      name: 'Components',
      id: 'components',
      items: matchingItems.map(item => {
        const {
          name,
          path,
          subSections,
        } = item;

        let items;

        if (subSections) {
          // Sometimes subsections have the same ID as the parents section, so let's give them
          // a unique prefix.
          items = subSections.map(subSection => ({
            id: `subSection-${subSection.id}`,
            name: subSection.name,
            onClick: this.onClickLink.bind(this, subSection.id),
          }));
        }

        return {
          id: `component-${path}`,
          name,
          href: `#/${path}`,
          items,
          isSelected: name === this.props.currentRouteName,
        };
      }),
    };
  }

  renderSandboxNavItems() {
    const matchingItems = this.props.sandboxes.filter(item => (
      item.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
    ));

    return {
      name: 'Sandboxes',
      id: 'sandboxes',
      items: matchingItems.map(item => {
        const {
          name,
          path,
          subSections,
        } = item;

        let items;

        if (subSections) {
          // Sometimes subsections have the same ID as the parents section, so let's give them
          // a unique prefix.
          items = subSections.map(subSection => ({
            id: `subSection-${subSection.id}`,
            name: subSection.name,
            onClick: this.onClickLink.bind(this, subSection.id),
          }));
        }

        return {
          id: `sandbox-${path}`,
          name,
          href: `#/${path}`,
          items,
          isSelected: name === this.props.currentRouteName,
        };
      }),
    };

    return map((item, index) => {
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
    const sideNav = [
      this.renderComponentNavItems(),
      this.renderSandboxNavItems(),
    ];

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
          toggleOpenOnMobile={this.toggleOpenOnMobile}
          isOpenOnMobile={this.state.isSideNavOpenOnMobile}
          items={sideNav}
        />
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
