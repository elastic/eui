import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  EuiFieldSearch,
  EuiFlexGroup,
  EuiFlexItem,
  EuiSideNav,
  EuiText,
} from '../../../../src/components';

import { EuiHighlight } from '../../../../src/components/highlight';
import { EuiBadge } from '../../../../src/components/badge';
import { slugify } from '../../../../src/services';

export class GuidePageChrome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: '',
      isSideNavOpenOnMobile: false,
      isPopoverOpen: false,
    };
  }

  componentDidMount = () => {
    this.scrollNavSectionIntoView();
  };

  toggleOpenOnMobile = () => {
    this.setState({
      isSideNavOpenOnMobile: !this.state.isSideNavOpenOnMobile,
    });
    // Scroll the mobile nav to the currently open page
    setTimeout(() => {
      const sideNav = document.querySelector('.euiSideNav__content');
      const selectedNavItem = sideNav?.querySelector(
        '.euiSideNavItemButton-isSelected'
      ).parentElement;
      sideNav.scrollTop = selectedNavItem.offsetTop - sideNav.offsetHeight;
    }, 200);
  };

  onSearchChange = (event) => {
    this.setState({
      search: event.target.value,
      isSideNavOpenOnMobile: event.target.value !== '',
    });
  };

  renderSideNavBadge = ({ isBeta, isNew, isDeprecated }) => {
    if (isBeta) {
      return (
        <EuiBadge color="warning" className="guideSideNav__itemBadge">
          BETA
        </EuiBadge>
      );
    }
    if (isNew) {
      return (
        <EuiBadge color="accent" className="guideSideNav__itemBadge">
          NEW
        </EuiBadge>
      );
    }
    if (isDeprecated) {
      return (
        <EuiBadge color="danger" className="guideSideNav__itemBadge">
          Deprecated
        </EuiBadge>
      );
    }
    return undefined;
  };

  scrollNavSectionIntoView = () => {
    // wait a bit for react to blow away and re-create the DOM
    // then scroll the selected nav section into view
    setTimeout(() => {
      const sideNav = document.querySelector('.guideSideNav__content');

      const selectedNavItem = sideNav?.querySelector(
        '.euiSideNavItemButton-isSelected'
      );
      if (selectedNavItem) {
        const selectedNavGroup = selectedNavItem.parentElement;

        // Wait a bit for react to blow away and re-create the DOM
        // then scroll the selected nav section into view
        setTimeout(() => {
          // Center the open/selected item on the nav
          const scrollOffset =
            selectedNavGroup.offsetTop -
            sideNav.offsetHeight / 2 +
            selectedNavGroup.offsetHeight / 2;

          // Don't use `scrollIntoView` or scroll APIs - they cause side effects
          // on body scrolling for some annoying reason
          sideNav.scrollTop = scrollOffset;
        }, 1); // Note: Webkit browsers require this timeout duration, FF doesn't
      }
    });
  };

  renderSubSections = (href, subSections = [], searchTerm = '') => {
    let hasMatchingSubItem = false;

    const subSectionsWithTitles = subSections.filter((item) => {
      if (!item.title) {
        return false;
      }

      if (searchTerm) {
        hasMatchingSubItem = this.searchSubSections(searchTerm, item);
        if (hasMatchingSubItem) return true;

        return item.title.toLowerCase().indexOf(searchTerm) !== -1;
      }

      return true;
    });

    // don't render solitary sub-items unless there's an active search
    if (subSectionsWithTitles.length <= (searchTerm ? 0 : 1)) {
      return;
    }

    return subSectionsWithTitles.map(
      ({ title, isBeta, isNew, isDeprecated, sections }) => {
        const id = slugify(title);

        const subSectionHref = `${href}/${id}`;
        const subSectionHashIdHref = `${href}#${id}`;

        const sectionHref = sections ? subSectionHref : subSectionHashIdHref;
        const subItems = sections
          ? this.renderSubSections(sectionHref, sections, searchTerm)
          : undefined;

        const isCurrentlyOpenSubSection =
          window.location.hash.includes(subSectionHref);

        let name = title;
        if (searchTerm) {
          name = (
            <EuiHighlight
              className="guideSideNav__item--inSearch"
              search={searchTerm}
            >
              {title}
            </EuiHighlight>
          );
        }

        return {
          id: sectionHref,
          name: isCurrentlyOpenSubSection ? <strong>{name}</strong> : name,
          href: sectionHref,
          className: isCurrentlyOpenSubSection
            ? 'guideSideNav__item--openSubTitle'
            : '',
          items: subItems,
          forceOpen: !!searchTerm || isCurrentlyOpenSubSection,
          icon: this.renderSideNavBadge({ isBeta, isNew, isDeprecated }),
        };
      }
    );
  };

  renderSideNav = (sideNav) => {
    // TODO: Add contents pages
    const sideNavSections = [];

    const searchTerm = this.state.search.toLowerCase();

    sideNav.forEach((section) => {
      let hasMatchingSubItem = false;

      const matchingItems = section.items.filter((item) => {
        if (item.hidden) {
          return false;
        }

        hasMatchingSubItem = this.searchSubSections(searchTerm, item);
        if (hasMatchingSubItem) return true;

        if (item.name.toLowerCase().indexOf(searchTerm) !== -1) {
          return true;
        }
      });

      const items = matchingItems.map((item) => {
        const { name, path, sections, isBeta, isNew, isDeprecated } = item;

        const href = `#/${path}`;

        let visibleName = name;
        if (searchTerm) {
          visibleName = (
            <EuiHighlight
              className="guideSideNav__item--inSearch"
              search={searchTerm}
            >
              {name}
            </EuiHighlight>
          );
        }

        return {
          id: `${section.type}-${path}`,
          name: visibleName,
          href,
          items: this.renderSubSections(href, sections, searchTerm),
          isSelected: item.path === this.props.currentRoute.path,
          forceOpen: !!(searchTerm && hasMatchingSubItem),
          className: 'guideSideNav__item',
          icon: this.renderSideNavBadge({ isBeta, isNew, isDeprecated }),
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

  searchSubSections = (searchTerm, navItem) => {
    const subSections = navItem.sections || [];

    return subSections.some((subSection) => {
      const subSectionTitle = subSection.title || '';
      if (subSectionTitle.toLowerCase().includes(searchTerm)) {
        return true;
      }
      if (subSection.sections) {
        if (this.searchSubSections(searchTerm, subSection)) {
          return true;
        }
      }
    });
  };

  render() {
    const sideNav = this.renderSideNav(this.props.navigation);

    let sideNavContent;

    if (sideNav.length) {
      sideNavContent = (
        <EuiSideNav
          mobileTitle="Navigation"
          toggleOpenOnMobile={this.toggleOpenOnMobile}
          isOpenOnMobile={this.state.isSideNavOpenOnMobile}
          items={sideNav}
          aria-label="EUI navigation"
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
      <EuiFlexGroup
        style={{ height: '100%' }}
        direction="column"
        responsive={false}
        gutterSize="none"
      >
        <EuiFlexItem
          role="search"
          grow={false}
          className="guideSideNav__search"
        >
          <EuiFieldSearch
            fullWidth
            placeholder="Search"
            value={this.state.search}
            onChange={this.onSearchChange}
            aria-label="Search for a docs section"
          />
        </EuiFlexItem>
        <EuiFlexItem className="guideSideNav__content">
          {sideNavContent}
        </EuiFlexItem>
      </EuiFlexGroup>
    );
  }
}

GuidePageChrome.propTypes = {
  currentRoute: PropTypes.object.isRequired,
  navigation: PropTypes.array.isRequired,
};
