import React, { Component } from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';

import { Link } from 'react-router';

import {
  EuiFieldSearch,
  EuiFlexGroup,
  EuiFlexItem,
  EuiIcon,
  EuiSideNav,
  EuiSpacer,
  EuiText,
  EuiButtonIcon,
  EuiPopover,
  EuiPopoverTitle,
} from '../../../../src/components';

import { GuideLocaleSelector } from '../guide_locale_selector';
import { GuideThemeSelector } from '../guide_theme_selector';

export class GuidePageChrome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: '',
      isSideNavOpenOnMobile: false,
      isPopoverOpen: false,
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
      isSideNavOpenOnMobile: event.target.value !== '',
    });
  };

  scrollTo = position => {
    $('html, body').animate(
      {
        scrollTop: position,
      },
      250
    );
  };

  onClickLink = id => {
    // Scroll to element.
    this.scrollTo($(`#${id}`).offset().top - 20);

    this.setState({
      search: '',
      isSideNavOpenOnMobile: false,
    });
  };

  onClickRoute = () => {
    this.setState({
      search: '',
      isSideNavOpenOnMobile: false,
    });
  };

  onButtonClick() {
    this.setState({
      isPopoverOpen: !this.state.isPopoverOpen,
    });
  }

  closePopover() {
    this.setState({
      isPopoverOpen: false,
    });
  }

  renderIdentity() {
    const button = (
      <EuiButtonIcon
        iconType="gear"
        onClick={this.onButtonClick.bind(this)}
        aria-label="Open EUI options menu"
        color="text"
      />
    );
    return (
      <EuiFlexGroup
        alignItems="center"
        gutterSize="s"
        justifyContent="spaceBetween"
        responsive={false}
        wrap>
        <EuiFlexItem grow={false}>
          <EuiFlexGroup
            alignItems="center"
            gutterSize="s"
            responsive={false}
            wrap>
            <EuiFlexItem grow={false}>
              <Link to="/" className="guideLogo" aria-label="Go to home page">
                <EuiIcon type="logoElastic" size="l" />
              </Link>
            </EuiFlexItem>
            <EuiFlexItem grow={false}>
              <Link to="/" aria-label="Go to home page" className="euiLink">
                <strong>Elastic UI</strong>
              </Link>
            </EuiFlexItem>
          </EuiFlexGroup>
        </EuiFlexItem>

        <EuiFlexItem grow={false}>
          <EuiPopover
            id="popover"
            button={button}
            isOpen={this.state.isPopoverOpen}
            closePopover={this.closePopover.bind(this)}>
            <EuiPopoverTitle>Docs options</EuiPopoverTitle>
            <div className="guideOptionsPopover">
              <GuideThemeSelector
                onToggleTheme={this.props.onToggleTheme}
                selectedTheme={this.props.selectedTheme}
              />
              {location.host === 'localhost:8030' ? ( // eslint-disable-line no-restricted-globals
                <EuiFlexItem grow={false}>
                  <GuideLocaleSelector
                    onToggleLocale={this.props.onToggleLocale}
                    selectedLocale={this.props.selectedLocale}
                  />
                </EuiFlexItem>
              ) : null}
            </div>
          </EuiPopover>
        </EuiFlexItem>
      </EuiFlexGroup>
    );
  }

  renderSubSections = (subSections = []) => {
    const subSectionsWithTitles = subSections.filter(item => item.title);

    if (subSectionsWithTitles.length <= 1) {
      return;
    }

    return subSectionsWithTitles.map(({ title, id }) => ({
      id: `subSection-${id}`,
      name: title,
      onClick: this.onClickLink.bind(this, id),
    }));
  };

  renderSideNav = sideNav => {
    // TODO: Add contents pages
    const sideNavSections = [];

    sideNav.forEach(section => {
      const matchingItems = section.items.filter(
        item =>
          item.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !==
            -1 && item.hidden !== true
      );

      const items = matchingItems.map(item => {
        const { name, path, sections } = item;

        return {
          id: `${section.type}-${path}`,
          name,
          href: `#/${path}`,
          onClick: this.onClickRoute.bind(this),
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
      <div className="guideSideNav">
        <div className="guideSideNav__identity">
          {this.renderIdentity()}

          <EuiSpacer size="m" />

          <div className="guideSideNav__search">
            <EuiFieldSearch
              placeholder="Search"
              value={this.state.search}
              onChange={this.onSearchChange}
            />
          </div>
        </div>

        <div className="guideSideNav__content">{sideNavContent}</div>
      </div>
    );
  }
}

GuidePageChrome.propTypes = {
  currentRouteName: PropTypes.string,
  onToggleTheme: PropTypes.func.isRequired,
  selectedTheme: PropTypes.string.isRequired,
  onToggleLocale: PropTypes.func.isRequired,
  selectedLocale: PropTypes.string.isRequired,
  navigation: PropTypes.array.isRequired,
};
