import {
  MouseEventHandler,
  ReactNode,
  FunctionComponent,
  HTMLAttributes,
} from 'react';
import { CommonProps } from '../common';

declare module '@elastic/eui' {
  type TAB_SIZES = 's' | 'm';

  type TAB_DISPLAYS = 'default' | 'condensed';

  type EuiTabProps = {
    onClick: MouseEventHandler<HTMLButtonElement>;
    isSelected?: boolean;
    disabled?: boolean;
  };

  type EuiTabsProps = {
    size?: TAB_SIZES;
    display?: TAB_DISPLAYS;
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
    display?: TAB_DISPLAYS;
    expand?: boolean;
  };

  export const EuiTab: FunctionComponent<
    EuiTabProps & CommonProps & HTMLAttributes<HTMLDivElement>
  >;
  export const EuiTabs: FunctionComponent<
    EuiTabsProps & CommonProps & HTMLAttributes<HTMLDivElement>
  >;
  export const EuiTabbedContent: FunctionComponent<
    EuiTabbedContentProps & CommonProps & HTMLAttributes<HTMLDivElement>
  >;
}
