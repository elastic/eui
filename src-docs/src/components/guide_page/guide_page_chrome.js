import React, { Component } from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';

import {
  Link,
} from 'react-router';

import {
  EuiButtonEmpty,
  EuiContextMenuItem,
  EuiContextMenuPanel,
  EuiFieldSearch,
  EuiFlexGroup,
  EuiFlexItem,
  EuiIcon,
  EuiPopover,
  EuiSideNav,
  EuiSpacer,
} from '../../../../src/components';

export class GuidePageChrome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: '',
      isSideNavOpenOnMobile: false,
      isThemePopoverOpen: false,
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

  onThemeButtonClick = () => {
    this.setState({
      isThemePopoverOpen: !this.state.isThemePopoverOpen,
    });
  };

  closeThemePopover = () => {
    this.setState({
      isThemePopoverOpen: false,
    });
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

    const themeButton = (
      <EuiButtonEmpty
        size="s"
        color="text"
        iconType="arrowDown"
        iconSide="right"
        onClick={this.onThemeButtonClick}
      >
        Theme
      </EuiButtonEmpty>
    );

    const themeOptions = [{
      name: 'Light',
      value: 'light',
    }, {
      name: 'Dark',
      value: 'dark',
    }, {
      name: 'K6',
      value: 'k6',
    }, {
      name: 'K6 dark',
      value: 'k6_dark',
    }].map(option => {
      const { name, value } = option;

      return (
        <EuiContextMenuItem
          key={value}
          icon={value === this.props.selectedTheme ? 'check' : 'empty'}
          onClick={() => { this.closeThemePopover(); this.props.onToggleTheme(value); }}
        >
          {`${name}`}
        </EuiContextMenuItem>
      );
    });

    return (
      <EuiFlexGroup alignItems="center" gutterSize="s" responsive={false}>
        <EuiFlexItem grow={false}>
          {homeLink}
        </EuiFlexItem>

        <EuiFlexItem grow={false}>
          <EuiPopover
            id="pageChromeThemePopover"
            button={themeButton}
            isOpen={this.state.isThemePopoverOpen}
            closePopover={this.closeThemePopover}
            panelPaddingSize="none"
            withTitle
            anchorPosition="downRight"
          >
            <EuiContextMenuPanel
              style={{ width: '120px' }}
              items={themeOptions}
            />
          </EuiPopover>
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
  onToggleTheme: PropTypes.func.isRequired,
  selectedTheme: PropTypes.string.isRequired,
  guidelines: PropTypes.array.isRequired,
  components: PropTypes.array.isRequired,
  sandboxes: PropTypes.array.isRequired,
};
