/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import React, { Component, createRef, HTMLAttributes, ReactNode } from 'react';

import { htmlIdGenerator } from '../../../services';

import { EuiTabs, EuiTabsDisplaySizes, EuiTabsSizes } from '../tabs';
import { EuiTab } from '../tab';
import { CommonProps } from '../../common';

/**
 * Marked as const so type is `['initial', 'selected']` instead of `string[]`
 */
export const AUTOFOCUS = ['initial', 'selected'] as const;

export interface EuiTabbedContentTab {
  id: string;
  name: ReactNode;
  content: ReactNode;
}

interface EuiTabbedContentState {
  selectedTabId: string | undefined;
  inFocus: boolean;
}

export type EuiTabbedContentProps = CommonProps &
  HTMLAttributes<HTMLDivElement> & {
    /**
     * When tabbing into the tabs, set the focus on `initial` for the first tab,
     * or `selected` for the currently selected tab. Best use case is for inside of
     * overlay content like popovers or flyouts.
     */
    autoFocus?: 'initial' | 'selected';
    /**
     * Choose `default` or alternative `condensed` display styles
     */
    display?: EuiTabsDisplaySizes;
    /**
     * Evenly stretches each tab to fill the horizontal space
     */
    expand?: boolean;
    /**
     * Use this prop to set the initially selected tab while letting the tabbed content component
     * control selection state internally
     */
    initialSelectedTab?: EuiTabbedContentTab;
    onTabClick?: (selectedTab: EuiTabbedContentTab) => void;
    /**
     * Use this prop if you want to control selection state within the owner component
     */
    selectedTab?: EuiTabbedContentTab;
    size?: EuiTabsSizes;
    /**
     * Each tab needs id and content properties, so we can associate it with its panel for accessibility.
     * The name property (a node) is also required to display to the user.
     */
    tabs: EuiTabbedContentTab[];
  };

export class EuiTabbedContent extends Component<
  EuiTabbedContentProps,
  EuiTabbedContentState
> {
  static defaultProps = {
    autoFocus: 'initial',
  };

  private readonly rootId = htmlIdGenerator()();

  private readonly tabsRef = createRef<HTMLDivElement>();

  constructor(props: EuiTabbedContentProps) {
    super(props);

    const { initialSelectedTab, selectedTab, tabs } = props;

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
    if (this.tabsRef.current) {
      // Current short-term solution for event listener (see https://github.com/elastic/eui/pull/2717)
      this.tabsRef.current.addEventListener(
        'focusout' as 'blur',
        this.removeFocus
      );
    }
  }

  componentWillUnmount() {
    if (this.tabsRef.current) {
      // Current short-term solution for event listener (see https://github.com/elastic/eui/pull/2717)
      this.tabsRef.current.removeEventListener(
        'focusout' as 'blur',
        this.removeFocus
      );
    }
  }

  focusTab = () => {
    const targetTab: HTMLDivElement | null = this.tabsRef.current!.querySelector(
      `#${this.state.selectedTabId}`
    );
    targetTab!.focus();
  };

  initializeFocus = () => {
    if (!this.state.inFocus && this.props.autoFocus === 'selected') {
      // Must wait for setState to finish before calling `.focus()`
      // as the focus call triggers a blur on the first tab
      this.setState({ inFocus: true }, () => {
        this.focusTab();
      });
    }
  };

  // todo: figure out type for blurEvent
  removeFocus = (blurEvent: FocusEvent) => {
    // only set inFocus to false if the wrapping div doesn't contain the now-focusing element
    const currentTarget = blurEvent.currentTarget! as HTMLElement;
    const relatedTarget = blurEvent.relatedTarget! as HTMLElement;
    if (currentTarget.contains(relatedTarget) === false) {
      this.setState({
        inFocus: false,
      });
    }
  };

  onTabClick = (selectedTab: EuiTabbedContentTab) => {
    const { onTabClick, selectedTab: externalSelectedTab } = this.props;

    if (onTabClick) {
      onTabClick(selectedTab);
    }

    // Only track selection state if it's not controlled externally.
    if (!externalSelectedTab) {
      this.setState({ selectedTabId: selectedTab.id }, () => {
        this.focusTab();
      });
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
      tabs.find(
        (tab: EuiTabbedContentTab) => tab.id === this.state.selectedTabId
      );

    const { content: selectedTabContent, id: selectedTabId } = selectedTab!;

    return (
      <div className={className} {...rest}>
        <EuiTabs
          ref={this.tabsRef}
          expand={expand}
          display={display}
          size={size}
          onFocus={this.initializeFocus}>
          {tabs.map((tab: EuiTabbedContentTab) => {
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
