import React, { Component, createRef, HTMLAttributes, ReactNode } from 'react'

import { htmlIdGenerator } from '../../../services';

import { EuiTabs, EuiTabsDisplaySizes, EuiTabsSizes } from '../tabs'
import { EuiTab } from '../tab';
import { CommonProps } from '../../common'

const makeId = htmlIdGenerator();

/**
 * Marked as const so type is `['initial', 'selected']` instead of `string[]`
 */
export const AUTOFOCUS = ['initial', 'selected'] as const;

export interface EuiTabbedContentTabDescriptor {
  id: string;
  name: string;
  content: ReactNode;
}

interface EuiTabbedContentState {
  selectedTabId: string | undefined;
  inFocus: boolean;
}

export type EuiTabbedContentProps = CommonProps
  & HTMLAttributes<HTMLDivElement>
  & {
  autoFocus?: 'initial' | 'selected';
  display?: EuiTabsDisplaySizes;
  expand?: boolean;
  initialSelectedTab?: EuiTabbedContentTabDescriptor;
  onTabClick?: (selectedTab: EuiTabbedContentTabDescriptor) => void;
  selectedTab?: EuiTabbedContentTabDescriptor;
  size?: EuiTabsSizes;
  tabs: Array<EuiTabbedContentTabDescriptor>
}

export class EuiTabbedContent extends Component<EuiTabbedContentProps, EuiTabbedContentState> {
  static defaultProps = {
    autoFocus: 'initial',
  };

  private readonly rootId = makeId();

  private readonly divRef = createRef<HTMLDivElement>()

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
    if (this.divRef.current) {
      // Current short-term solution for event listener (see https://github.com/elastic/eui/pull/2717)
      this.divRef.current.addEventListener('focusout' as 'blur', this.removeFocus);
    }
  }

  componentWillUnmount() {
    if (this.divRef.current) {
      // Current short-term solution for event listener (see https://github.com/elastic/eui/pull/2717)
      this.divRef.current.removeEventListener('focusout' as 'blur', this.removeFocus);
    }
  }

  initializeFocus = () => {
    if (!this.state.inFocus && this.props.autoFocus === 'selected') {
      // Must wait for setState to finish before calling `.focus()`
      // as the focus call triggers a blur on the first tab
      this.setState({ inFocus: true }, () => {
        const targetTab: HTMLDivElement | null = this.divRef.current!.querySelector(
          `#${this.state.selectedTabId}`
        );
        targetTab!.focus();
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

  onTabClick = (selectedTab: EuiTabbedContentTabDescriptor) => {
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
      tabs.find((tab: EuiTabbedContentTabDescriptor) => tab.id === this.state.selectedTabId);

    const { content: selectedTabContent, id: selectedTabId } = selectedTab!;

    return (
      <div
        ref={this.divRef}
        className={className}
        {...rest}
        onFocus={this.initializeFocus}>
        <EuiTabs expand={expand} display={display} size={size}>
          {tabs.map((tab: EuiTabbedContentTabDescriptor) => {
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
