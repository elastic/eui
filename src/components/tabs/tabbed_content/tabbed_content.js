import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { htmlIdGenerator } from '../../../services';

import { EuiTabs, DISPLAYS, SIZES } from '../tabs';
import { EuiTab } from '../tab';

const makeId = htmlIdGenerator();

export class EuiTabbedContent extends Component {
  static propTypes = {
    className: PropTypes.string,
    /**
     * Choose `default` or alternative `condensed` display styles
     */
    display: PropTypes.oneOf(DISPLAYS),
    /**
     * Evenly stretches each tab to fill the horizontal space
     */
    expand: PropTypes.bool,
    /**
     * Use this prop to set the initially selected tab while letting the tabbed content component
     * control selection state internally
     */
    initialSelectedTab: PropTypes.object,
    onTabClick: PropTypes.func,
    /**
     * Use this prop if you want to control selection state within the owner component
     */
    selectedTab: PropTypes.object,
    size: PropTypes.oneOf(SIZES),
    /**
     * Each tab needs id and content properties, so we can associate it with its panel for accessibility.
     * The name property is also required to display to the user.
     */
    tabs: PropTypes.arrayOf(
      PropTypes.shape({
        content: PropTypes.node.isRequired,
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
      })
    ).isRequired,
  };

  constructor(props) {
    super(props);

    const { initialSelectedTab, selectedTab, tabs } = props;

    this.rootId = makeId();

    // Only track selection state if it's not controlled externally.
    if (!selectedTab) {
      this.state = {
        selectedTabId:
          (initialSelectedTab && initialSelectedTab.id) || tabs[0].id,
      };
    }
  }

  onTabClick = selectedTab => {
    const { onTabClick, selectedTab: externalSelectedTab } = this.props;

    if (onTabClick) {
      onTabClick(selectedTab);
    }

    // Only track selection state if it's not controlled externally.
    if (!externalSelectedTab) {
      this.setState({ selectedTabId: selectedTab.id });
    }
  };

  render() {
    const {
      className,
      display,
      expand,
      initialSelectedTab, // eslint-disable-line no-unused-vars
      onTabClick, // eslint-disable-line no-unused-vars
      selectedTab: externalSelectedTab,
      size,
      tabs,
      ...rest
    } = this.props;

    // Allow the consumer to control tab selection.
    const selectedTab =
      externalSelectedTab ||
      tabs.find(tab => tab.id === this.state.selectedTabId);

    const { content: selectedTabContent, id: selectedTabId } = selectedTab;

    return (
      <div className={className} {...rest}>
        <EuiTabs expand={expand} display={display} size={size}>
          {tabs.map(tab => {
            const {
              id,
              name,
              content, // eslint-disable-line no-unused-vars
              ...tabProps
            } = tab;
            const props = {
              key: id,
              id,
              ...tabProps,
              onClick: () => this.onTabClick(tab),
              isSelected: tab === selectedTab,
              'aria-controls': `${this.rootId}`,
            };

            return <EuiTab {...props}>{name}</EuiTab>;
          })}
        </EuiTabs>

        <div
          role="tabpanel"
          id={`${this.rootId}`}
          aria-labelledby={selectedTabId}
        >
          {selectedTabContent}
        </div>
      </div>
    );
  }
}
