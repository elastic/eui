import { ReactElement, ReactNode, MouseEventHandler } from 'react';

import { RenderItem } from './side_nav_item';

export interface EuiSideNavItemType<T> {
  /**
   * A value that is passed to React as the `key` for this item
   */
  id: string | number;
  /**
   * If set to true it will force the item to display in an "open" state at all times.
   */
  forceOpen?: boolean;
  /**
   * Is an optional string to be passed as the navigation item's `href` prop, and by default it will force rendering of the item as an `<a>`.
   */
  href?: string;
  target?: string;
  rel?: string;
  /**
   * React node which will be rendered as a small icon to the left of the navigation item text.
   */
  icon?: ReactElement;
  /**
   * If set to true it will render the item in a visible "selected" state, and will force all ancestor navigation items to render in an "open" state.
   */
  isSelected?: boolean;
  /**
   * Array containing additional item objects, representing nested children of this navigation item.
   */
  items?: Array<EuiSideNavItemType<T>>;
  /**
   * React node representing the text to render for this item (usually a string will suffice).
   */
  name: ReactNode;
  /**
   * Callback function to be passed as the navigation item's `onClick` prop, and by default it will force rendering of the item as a `<button>` instead of a link.
   */
  onClick?: MouseEventHandler<HTMLButtonElement>;
  /**
   * Function overriding default rendering for this navigation item — when called, it should return a React node representing a replacement navigation item.
   */
  renderItem?: RenderItem<T>;
}
