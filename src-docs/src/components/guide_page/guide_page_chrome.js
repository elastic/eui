import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  EuiBadge,
  EuiFlexGroup,
  EuiFlexItem,
  EuiPageSideBar,
  EuiSideNav,
} from '../../../../src/components';

export class GuidePageChrome extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);

    this.state = {
      search: '',
      isSideNavOpenOnMobile: false,
      isPopoverOpen: false,
    };
  }

  componentDidMount = () => {
    this._isMounted = true;

    this.scrollNavSectionIntoViewSync();
  };

  componentWillUnmount = () => {
    this._isMounted = false;
  };

  toggleOpenOnMobile = () => {
    this.setState({
      isSideNavOpenOnMobile: !this.state.isSideNavOpenOnMobile,
    });
  };

  onSearchChange = (event) => {
    this.setState({
      search: event.target.value,
      isSideNavOpenOnMobile: event.target.value !== '',
    });
  };

  scrollNavSectionIntoViewSync = () => {
    // wait a bit for react to blow away and re-create the DOM
    // then scroll the selected nav section into view
    const selectedButton = document.querySelector(
      '.euiSideNavItemButton-isSelected'
    );
    if (selectedButton) {
      let root = selectedButton.parentNode;

      while (
        !root.classList.contains('euiSideNavItem--root') &&
        !root.classList.contains('guideSideNav')
      ) {
        root = root.parentNode;
      }
      root.scrollIntoView();
    }
  };

  scrollNavSectionIntoView = () => {
    setTimeout(() => {
      this.scrollNavSectionIntoViewSync();
    }, 250);
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

  renderSubSections = (href, subSections = []) => {
    const subSectionsWithTitles = subSections.filter(({ title }) => !!title);

    if (subSectionsWithTitles.length < 2) return;

    return subSectionsWithTitles.map(({ title, id }) => ({
      id: `subSection-${id}`,
      name: title,
      href: href.concat(`#${id}`),
    }));
  };

  renderSideNav = (sideNav) => {
    // TODO: Add contents pages
    const sideNavSections = [];

    sideNav.forEach((section) => {
      const matchingItems = section.items.filter((item) => {
        if (item.hidden) return false;

        const itemSections = item.sections ?? [];

        for (let i = 0; i < itemSections.length; i++) {
          const sectionTitle = itemSections[i].title ?? '';
          if (sectionTitle.toLowerCase().indexOf('') !== -1) return true;
        }

        if (item.name.toLowerCase().indexOf('') !== -1) return true;
      });

      const items = matchingItems.map((item) => {
        const { name, path, sections, isNew } = item;
        const href = `#/${path}`;

        let newBadge;
        if (isNew) {
          newBadge = (
            <EuiBadge color="accent" className="guideSideNav__newBadge">
              NEW
            </EuiBadge>
          );
        }

        return {
          id: `${section.type}-${path}`,
          name,
          href,
          items: this.renderSubSections(href, sections),
          isSelected: item.path === this.props.currentRoute.path,
          forceOpen: item.path === this.props.currentRoute.path,
          className: 'guideSideNav__item',
          icon: newBadge,
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
    return (
      <EuiPageSideBar className="guideSideNav" sticky>
        <EuiFlexGroup
          style={{ height: '100%' }}
          direction="column"
          responsive={false}
          gutterSize="none">
          <EuiFlexItem className="guideSideNav__content">
            <EuiSideNav
              mobileTitle="Navigate components"
              toggleOpenOnMobile={this.toggleOpenOnMobile}
              isOpenOnMobile={this.state.isSideNavOpenOnMobile}
              items={this.renderSideNav(this.props.navigation)}
              aria-label="EUI"
            />
          </EuiFlexItem>
        </EuiFlexGroup>
      </EuiPageSideBar>
    );
  }
}

GuidePageChrome.propTypes = {
  currentRoute: PropTypes.object.isRequired,
  navigation: PropTypes.array.isRequired,
};
