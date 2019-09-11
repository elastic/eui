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
import { EuiHighlight } from '../../../../src/components/highlight';

const scrollTo = position => {
  $('html, body').animate(
    {
      scrollTop: position,
    },
    250
  );
};

function scrollToSelector(selector, attempts = 5) {
  const element = $(selector);

  if (element.length) {
    scrollTo(element.offset().top - 20);
  } else if (attempts > 0) {
    setTimeout(scrollToSelector.bind(null, selector, attempts - 1), 250);
  }
}

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

  scrollNavSectionIntoView = () => {
    setTimeout(() => {
      // wait a bit for react to blow away and re-create the DOM
      // then scroll the selected nav section into view
      const selectedButton = $('.euiSideNavItemButton-isSelected');
      if (selectedButton.length) {
        const root = selectedButton.parents('.euiSideNavItem--root');
        if (root.length) {
          root.get(0).scrollIntoView();
        }
      }
    }, 250);
  };

  onClickLink = id => {
    // Scroll to element.
    scrollToSelector(`#${id}`);

    this.setState(
      {
        search: '',
        isSideNavOpenOnMobile: false,
      },
      this.scrollNavSectionIntoView
    );
  };

  onClickRoute = () => {
    // timeout let's IE11 do its thing and update the url
    // allowing react-router to navigate to the route
    // otherwise IE11 somehow kills the navigation
    setTimeout(() => {
      this.setState(
        {
          search: '',
          isSideNavOpenOnMobile: false,
        },
        this.scrollNavSectionIntoView
      );
    }, 0);
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
                <GuideLocaleSelector
                  onToggleLocale={this.props.onToggleLocale}
                  selectedLocale={this.props.selectedLocale}
                />
              ) : null}
            </div>
          </EuiPopover>
        </EuiFlexItem>
      </EuiFlexGroup>
    );
  }

  renderSubSections = (href, subSections = [], searchTerm = '') => {
    const subSectionsWithTitles = subSections.filter(item => {
      if (!item.title) {
        return false;
      }

      if (searchTerm) {
        return item.title.toLowerCase().indexOf(searchTerm) !== -1;
      }

      return true;
    });

    // don't render solitary sub-items unless there's an active search
    if (subSectionsWithTitles.length <= (searchTerm ? 0 : 1)) {
      return;
    }

    return subSectionsWithTitles.map(({ title, id }) => {
      let name = title;
      if (searchTerm) {
        name = (
          <EuiHighlight
            className="guideSideNav__item--inSearch"
            search={searchTerm}>
            {title}
          </EuiHighlight>
        );
      }

      return {
        id: `subSection-${id}`,
        name,
        href,
        onClick: this.onClickLink.bind(this, id),
      };
    });
  };

  renderSideNav = sideNav => {
    // TODO: Add contents pages
    const sideNavSections = [];

    const searchTerm = this.state.search.toLowerCase();

    sideNav.forEach(section => {
      let hasMatchingSubItem = false;

      const matchingItems = section.items.filter(item => {
        if (item.hidden) {
          return false;
        }

        const itemSections = item.sections || [];
        for (let i = 0; i < itemSections.length; i++) {
          const sectionTitle = itemSections[i].title || '';
          if (sectionTitle.toLowerCase().indexOf(searchTerm) !== -1) {
            hasMatchingSubItem = true;
            return true;
          }
        }

        if (item.name.toLowerCase().indexOf(searchTerm) !== -1) {
          return true;
        }
      });

      const items = matchingItems.map(item => {
        const { name, path, sections } = item;
        const href = `#/${path}`;

        let visibleName = name;
        if (searchTerm) {
          visibleName = (
            <EuiHighlight
              className="guideSideNav__item--inSearch"
              search={searchTerm}>
              {name}
            </EuiHighlight>
          );
        }

        return {
          id: `${section.type}-${path}`,
          name: visibleName,
          href,
          onClick: this.onClickRoute.bind(this),
          items: this.renderSubSections(href, sections, searchTerm),
          isSelected: name === this.props.currentRouteName,
          forceOpen: !!(searchTerm && hasMatchingSubItem),
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
