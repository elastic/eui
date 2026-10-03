/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  HTMLAttributes,
  ReactNode,
  FocusEvent,
  useRef,
  useState,
  FunctionComponent,
} from 'react';

import { EuiTabs, EuiTabsSizes } from '../tabs';
import { EuiTab, EuiTabProps } from '../tab';
import { CommonProps } from '../../common';
import { useGeneratedHtmlId } from '../../../services';

/**
 * Marked as const so type is `['initial', 'selected']` instead of `string[]`
 */
export const AUTOFOCUS = ['initial', 'selected'] as const;

export interface EuiTabbedContentTab extends EuiTabProps {
  id: string;
  name: ReactNode;
  content: ReactNode;
}

export type EuiTabbedContentProps = CommonProps &
  Omit<HTMLAttributes<HTMLDivElement>, 'autoFocus'> & {
    /**
     * When tabbing into the tabs, set the focus on `initial` for the first tab,
     * or `selected` for the currently selected tab. Best use case is for inside of
     * overlay content like popovers or flyouts.
     */
    autoFocus?: 'initial' | 'selected';
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

export const EuiTabbedContent: FunctionComponent<EuiTabbedContentProps> = ({
  autoFocus = 'initial',
  className,
  expand,
  initialSelectedTab,
  onTabClick,
  selectedTab: externalSelectedTab,
  size,
  tabs,
  ...rest
}) => {
  const rootId = useGeneratedHtmlId();
  const tabsRef = useRef<HTMLDivElement>(null);
  const inFocusRef = useRef(false);

  const [selectedTabId, setSelectedTabId] = useState<string | undefined>(() =>
    externalSelectedTab ? undefined : initialSelectedTab?.id || tabs[0].id
  );

  const focusTab = (id?: string) => {
    const targetTab = tabsRef.current?.querySelector<HTMLDivElement>(`#${id}`);
    targetTab?.focus();
  };

  const initializeFocus = () => {
    if (!inFocusRef.current && autoFocus === 'selected') {
      inFocusRef.current = true;
      focusTab(selectedTabId);
    }
  };

  const removeFocus = (blurEvent: FocusEvent<HTMLDivElement>) => {
    // only set inFocus to false if the wrapping div doesn't contain the now-focusing element
    const currentTarget = blurEvent.currentTarget! as HTMLElement;
    const relatedTarget = blurEvent.relatedTarget! as HTMLElement;
    if (currentTarget.contains(relatedTarget) === false) {
      inFocusRef.current = false;
    }
  };

  const handleTabClick = (tab: EuiTabbedContentTab) => {
    onTabClick?.(tab);

    // Only track selection state if it's not controlled externally.
    if (!externalSelectedTab) {
      setSelectedTabId(tab.id);
      focusTab(tab.id);
    }
  };

  // Allow the consumer to control tab selection.
  const selectedTab =
    externalSelectedTab ||
    tabs.find((tab) => tab.id === selectedTabId) ||
    tabs[0]; // Fall back to the first tab if a selected tab can't be found

  const { content: selectedTabContent, id: selectedTabContentId } = selectedTab;

  return (
    <div className={className} {...rest}>
      <EuiTabs
        ref={tabsRef}
        expand={expand}
        size={size}
        onFocus={initializeFocus}
        onBlur={removeFocus}
      >
        {tabs.map((tab) => {
          const {
            id,
            name,
            content, // eslint-disable-line no-unused-vars
            ...tabProps
          } = tab;

          return (
            <EuiTab
              key={id}
              id={id}
              {...tabProps}
              onClick={() => handleTabClick(tab)}
              isSelected={tab === selectedTab}
              aria-controls={rootId}
            >
              {name}
            </EuiTab>
          );
        })}
      </EuiTabs>

      <div role="tabpanel" id={rootId} aria-labelledby={selectedTabContentId}>
        {selectedTabContent}
      </div>
    </div>
  );
};

EuiTabbedContent.displayName = 'EuiTabbedContent';
