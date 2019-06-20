import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';

import { htmlIdGenerator } from '../../../services';

import { EuiTabs, DISPLAYS, SIZES } from '../tabs';
import { EuiTab } from '../tab';

const makeId = htmlIdGenerator();

export const AUTOFOCUS = ['initial', 'selected'];

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
    /**
     * When tabbing into the tabs, set the focus on `initial` for the first tab,
     * or `selected` for the currently selected tab. Best use case is for inside of
     * overlay content like popovers or flyouts.
     */
    autoFocus: PropTypes.oneOf(AUTOFOCUS),
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
    this.divRef = createRef();

    // Only track selection state if it's not controlled externally.
    let selectedTabId;
    if (!selectedTab) {
      selectedTabId =
        (initialSelectedTab && initialSelectedTab.id) || tabs[0].id;
    }

    this.state = {
      selectedTabId,
      inFocus: false,
    };
  }

  componentDidMount() {
    // IE11 doesn't support the `relatedTarget` event property for blur events
    // but does add it for focusout. React doesn't support `onFocusOut` so here we are.
    if (this.divRef.current) {
      this.divRef.current.addEventListener('focusout', this.removeFocus);
    }
  }

  componentWillUnmount() {
    if (this.divRef.current) {
      this.divRef.current.removeEventListener('focusout', this.removeFocus);
    }
  }

  initializeFocus = () => {
    if (!this.state.inFocus && this.props.autoFocus === 'selected') {
      // Must wait for setState to finish before calling `.focus()`
      // as the focus call triggers a blur on the first tab
      this.setState({ inFocus: true }, () => {
        const targetTab = this.divRef.current.querySelector(
          `#${this.state.selectedTabId}`
        );
        targetTab.focus();
      });
    }
  };

  removeFocus = blurEvent => {
    // only set inFocus to false if the wrapping div doesn't contain the now-focusing element
    if (blurEvent.currentTarget.contains(blurEvent.relatedTarget) === false) {
      this.setState({
        inFocus: false,
      });
    }
  };

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
      initialSelectedTab,
      onTabClick,
      selectedTab: externalSelectedTab,
      size,
      tabs,
      autoFocus,
      ...rest
    } = this.props;

    // Allow the consumer to control tab selection.
    const selectedTab =
      externalSelectedTab ||
      tabs.find(tab => tab.id === this.state.selectedTabId);

    const { content: selectedTabContent, id: selectedTabId } = selectedTab;

    return (
      <div
        ref={this.divRef}
        className={className}
        {...rest}
        onFocus={this.initializeFocus}>
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
          aria-labelledby={selectedTabId}>
          {selectedTabContent}
        </div>
      </div>
    );
  }
}

EuiTabbedContent.defaultProps = {
  autoFocus: 'initial',
};
