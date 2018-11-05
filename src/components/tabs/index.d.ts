/// <reference path="../common.d.ts" />

declare module '@elastic/eui' {
  import { MouseEventHandler, ReactNode, SFC } from 'react';

  type TAB_SIZES = 's' | 'm';

  type EuiTabProps = CommonProps & {
    onClick: MouseEventHandler<HTMLButtonElement>;
    isSelected?: boolean;
    children?: ReactNode[];
    disabled?: boolean;
  };

  type EuiTabsProps = CommonProps & {
    children?: ReactNode[];
    size?: TAB_SIZES;
    expand?: boolean;
  };

  export interface EuiTabbedContentTab {
    id: string;
    name: string;
    content: ReactNode;
  }

  type EuiTabbedContentProps = CommonProps & {
    tabs: EuiTabbedContentTab[];
    onTabClick?: (tab: EuiTabbedContentTab) => void;
    selectedTab?: EuiTabbedContentTab;
    initialSelectedTab?: EuiTabbedContentTab;
    size?: TAB_SIZES;
    expand?: boolean;
  }

  export const EuiTab: SFC<EuiTabProps>;
  export const EuiTabs: SFC<EuiTabsProps>;
  export const EuiTabbedContent: SFC<EuiTabbedContentProps>;
}