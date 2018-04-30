import React, { Component } from 'react'
import PropTypes from 'prop-types';

import { EuiTabs, SIZES } from '../tabs';
import { EuiTab } from '../tab';

export class EuiTabbedContent extends Component {
  static propTypes = {
    className: PropTypes.string,
    tabs: PropTypes.array.isRequired,
    onTabClick: PropTypes.func,
    selectedTab: PropTypes.object,
    initialSelectedTab: PropTypes.object,
    size: PropTypes.oneOf(SIZES),
  };

  constructor(props) {
    super(props);

    const { initialSelectedTab, selectedTab, tabs } = props;

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
    const { content } = selectedTab

    return (
      <div className={className} {...rest}>
        <EuiTabs size={size}>
          {
          tabs.map((tab, index) => {
            const { id, name, ...tabProps } = tab
            const props = {
              key: id !== undefined ? id : index,
              ...tabProps,
              onClick: () => this.onTabClick(tab),
              isSelected: tab === selectedTab,
            };

            return <EuiTab {...props}>{name}</EuiTab>;
          })
        }
        </EuiTabs>

        {content}
      </div>
    )
  }
}
