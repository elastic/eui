import React, { Component, HTMLAttributes } from 'react';
import classNames from 'classnames';
import { CommonProps } from '../common';
import { EuiSelectableSearch } from './selectable_search';
import { EuiSelectableMessage } from './selectable_message';
import { EuiSelectableList, EuiSelectableListItem } from './selectable_list';

export type EuiSelectableProps = HTMLAttributes<HTMLDivElement> &
  CommonProps & {};

export class EuiSelectable extends Component<EuiSelectableProps> {
  constructor(props: EuiSelectableProps) {
    super(props);
  }

  render() {
    const { children, className, ...rest } = this.props;

    const classes = classNames('euiSelectable', className);

    return (
      <div className={classes} {...rest}>
        <EuiSelectableSearch>Search</EuiSelectableSearch>
        <EuiSelectableMessage>Message</EuiSelectableMessage>
        {children}
        <EuiSelectableList>
          <EuiSelectableListItem>Item</EuiSelectableListItem>
          <EuiSelectableListItem checked="off">Item</EuiSelectableListItem>
          <EuiSelectableListItem checked="on">Item</EuiSelectableListItem>
          <EuiSelectableListItem isFocused>Item</EuiSelectableListItem>
          <EuiSelectableListItem disabled>Item</EuiSelectableListItem>
          <EuiSelectableListItem style={{ height: 40 }}>
            Item
          </EuiSelectableListItem>
        </EuiSelectableList>
      </div>
    );
  }
}
