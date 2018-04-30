import React, { Component } from 'react'
import PropTypes from 'prop-types';

import { htmlIdGenerator } from '../../../services';

import { EuiTabs, SIZES } from '../tabs';
import { EuiTab } from '../tab';

const makeId = htmlIdGenerator();

export class EuiTabbedContent extends Component {
  static propTypes = {
    className: PropTypes.string,
    // We use the id to associate tabs with panels for accessibility.
    tabs: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.string.isRequired })).isRequired,
    onTabClick: PropTypes.func,
    selectedTab: PropTypes.object,
    initialSelectedTab: PropTypes.object,
    size: PropTypes.oneOf(SIZES),
  };

  constructor(props) {
    super(props);

    const { initialSelectedTab, selectedTab, tabs } = props;

    this.rootId = makeId();

    this.state = {
      selectedTab: selectedTab || initialSelectedTab || tabs[0],
    };
  }

  onTabClick = (selectedTab) => {
    const { onTabClick } = this.props;

    if (onTabClick) {
      onTabClick(selectedTab)
    }

    this.setState({ selectedTab })
  };

  render() {
    const {
      className,
      tabs,
      onTabClick, // eslint-disable-line no-unused-vars
      initialSelectedTab, // eslint-disable-line no-unused-vars
      selectedTab: externalSelectedTab,
      size,
      ...rest
    } = this.props;

    // Allow the consumer to control tab selection.
    const selectedTab = externalSelectedTab || this.state.selectedTab

    const {
      content: selectedTabContent,
      id: selectedTabId,
    } = selectedTab

    return (
      <div className={className} {...rest}>
        <EuiTabs size={size}>
          {
          tabs.map((tab) => {
            const {
              id,
              name,
              content, // eslint-disable-line no-unused-vars
              ...tabProps
            } = tab
            const props = {
              key: id,
              id,
              ...tabProps,
              onClick: () => this.onTabClick(tab),
              isSelected: tab === selectedTab,
              'aria-controls': `${this.rootId}-${id}`,
            };

            return <EuiTab {...props}>{name}</EuiTab>;
          })
        }
        </EuiTabs>

        <div
          role='tabpanel'
          id={`${this.rootId}-${selectedTabId}`}
          aria-labelledby={selectedTabId}
        >
          {selectedTabContent}
        </div>
      </div>
    )
  }
}
