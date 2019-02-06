import { MouseEventHandler, ReactNode, SFC, HTMLAttributes } from 'react';
import { CommonProps } from '../common';

declare module '@elastic/eui' {
  type TAB_SIZES = 's' | 'm';

  type EuiTabProps = {
    onClick: MouseEventHandler<HTMLButtonElement>;
    isSelected?: boolean;
    disabled?: boolean;
  };

  type EuiTabsProps = {
    size?: TAB_SIZES;
    expand?: boolean;
  };

  export interface EuiTabbedContentTab {
    id: string;
    name: string;
    content: ReactNode;
  }

  type EuiTabbedContentProps = {
    tabs: EuiTabbedContentTab[];
    onTabClick?: (tab: EuiTabbedContentTab) => void;
    selectedTab?: EuiTabbedContentTab;
    initialSelectedTab?: EuiTabbedContentTab;
    size?: TAB_SIZES;
    expand?: boolean;
  }

  export const EuiTab: SFC<EuiTabProps & CommonProps & HTMLAttributes<HTMLDivElement>>;
  export const EuiTabs: SFC<EuiTabsProps & CommonProps & HTMLAttributes<HTMLDivElement>>;
  export const EuiTabbedContent: SFC<EuiTabbedContentProps & CommonProps & HTMLAttributes<HTMLDivElement>>;
}
