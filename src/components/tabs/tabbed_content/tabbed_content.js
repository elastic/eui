import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { htmlIdGenerator } from '../../../services';

import { EuiTabs, SIZES } from '../tabs';
import { EuiTab } from '../tab';

const makeId = htmlIdGenerator();

export class EuiTabbedContent extends Component {
  static propTypes = {
    className: PropTypes.string,

    /**
     * Each tab needs id and content properties, so we can associate it with its panel for accessibility.
     * The name property is also required to display to the user.
     */
    tabs: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        content: PropTypes.node.isRequired,
      })
    ).isRequired,
    onTabClick: PropTypes.func,

    /**
     * Use this prop if you want to control selection state within the owner component
     */
    selectedTab: PropTypes.object,

    /**
     * Use this prop to set the initially selected tab while letting the tabbed content component
     * control selection state internally
     */
    initialSelectedTab: PropTypes.object,
    size: PropTypes.oneOf(SIZES),
    /**
     * Evenly stretches each tab to fill the horizontal space
     */
    expand: PropTypes.bool,
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
      tabs,
      selectedTab: externalSelectedTab,
      size,
      expand,
      ...rest
    } = this.props;

    delete rest.onTabClick;
    delete rest.initialSelectedTab;

    // Allow the consumer to control tab selection.
    const selectedTab =
      externalSelectedTab ||
      tabs.find(tab => tab.id === this.state.selectedTabId);

    const { content: selectedTabContent, id: selectedTabId } = selectedTab;

    return (
      <div className={className} {...rest}>
        <EuiTabs size={size} expand={expand}>
          {tabs.map(tab => {
            const { id, name, ...tabProps } = tab;

            delete tabProps.content;

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
          aria-labelledby={selectedTabId}>
          {selectedTabContent}
        </div>
      </div>
    );
  }
}
