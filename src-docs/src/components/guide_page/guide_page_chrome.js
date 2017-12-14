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

  renderGuidelineNavItems() {
    const matchingItems = this.props.guidelines.filter(item => (
      item.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
    ));

    return {
      name: 'Guidelines',
      id: 'guidelines',
      items: matchingItems.map(item => {
        const {
          name,
          path,
          sections,
        } = item;

        return {
          id: `guideline-${path}`,
          name,
          href: `#/${path}`,
          items: this.renderSubSections(sections),
          isSelected: name === this.props.currentRouteName,
        };
      }),
    };
  }

  renderComponentNavItems() {
    const matchingItems = this.props.components.filter(item => (
      item.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
    ));

    return {
      name: 'Components',
      id: 'components',
      items: matchingItems.map(item => {
        const {
          name,
          path,
          sections,
        } = item;

        return {
          id: `component-${path}`,
          name,
          href: `#/${path}`,
          items: this.renderSubSections(sections),
          isSelected: name === this.props.currentRouteName,
        };
      }),
    };
  }

  rendePatternNavItems() {
    const matchingItems = this.props.patterns.filter(item => (
      item.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
    ));

    return {
      name: 'Patterns',
      id: 'patterns',
      items: matchingItems.map(item => {
        const {
          name,
          path,
          sections,
        } = item;

        return {
          id: `pattern-${path}`,
          name,
          href: `#/${path}`,
          items: this.renderSubSections(sections),
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
      this.rendePatternNavItems(),
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
  onToggleTheme: PropTypes.func.isRequired,
  selectedTheme: PropTypes.string.isRequired,
  guidelines: PropTypes.array.isRequired,
  components: PropTypes.array.isRequired,
  patterns: PropTypes.array.isRequired,
  sandboxes: PropTypes.array.isRequired,
};
