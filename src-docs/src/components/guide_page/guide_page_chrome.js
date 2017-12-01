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

  renderSubSections = subSections => {
    if (!subSections) {
      return;
    }

    return subSections.map(subSection => ({
      id: `subSection-${subSection.id}`,
      name: subSection.name,
      onClick: this.onClickLink.bind(this, subSection.id),
    }));
  }

  renderGuidelineNavItems() {
    const matchingItems = this.props.guidelines.filter(item => (
      item.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
    ));

    // Build links to subsections if there's more than 1.
    if (this.props.sections.length > 1) {
      const currentSectionIndex = matchingItems.findIndex(item => item.name === this.props.currentRouteName);
      if (currentSectionIndex !== -1) {
        matchingItems[currentSectionIndex].subSections = this.props.sections.map(section => {
          return { ...section };
        });
      }
    }

    return {
      name: 'Guidelines',
      id: 'guidelines',
      items: matchingItems.map(item => {
        const {
          name,
          path,
          subSections,
        } = item;

        return {
          id: `guideline-${path}`,
          name,
          href: `#/${path}`,
          items: this.renderSubSections(subSections),
          isSelected: name === this.props.currentRouteName,
        };
      }),
    };
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
          return { ...section };
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

        return {
          id: `component-${path}`,
          name,
          href: `#/${path}`,
          items: this.renderSubSections(subSections),
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
        } = item;

        return {
          id: `sandbox-${path}`,
          name,
          href: `#/${path}`,
          isSelected: name === this.props.currentRouteName,
        };
      }),
    };
  }

  render() {
    const sideNav = [
      this.renderGuidelineNavItems(),
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
