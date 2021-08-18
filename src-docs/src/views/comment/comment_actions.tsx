import React, { Component, HTMLAttributes } from 'react';
import { EuiComment } from '../../../../src/components/comment_list';
import { EuiButtonIcon } from '../../../../src/components/button';
import { EuiText } from '../../../../src/components/text';
import { EuiPopover } from '../../../../src/components/popover';
import {
  EuiContextMenuPanel,
  EuiContextMenuItem,
} from '../../../../src/components/context_menu';
import { CommonProps } from '../../../../src/components/common';

const body = (
  <EuiText size="s">
    <p>
      This comment has custom actions available. See the upper right corner.
    </p>
  </EuiText>
);

export type CustomActionsProps = HTMLAttributes<HTMLDivElement> &
  CommonProps & {};

interface CustomActionsState {
  isPopoverOpen: boolean;
}

export default class extends Component<CustomActionsProps, CustomActionsState> {
  state = {
    isPopoverOpen: false,
  };

  togglePopover = () => {
    this.setState((prevState) => ({
      isPopoverOpen: !prevState.isPopoverOpen,
    }));
  };

  closePopover = () => {
    this.setState({
      isPopoverOpen: false,
    });
  };

  render() {
    const { isPopoverOpen } = this.state;
    const customActions = (
      <EuiPopover
        button={
          <EuiButtonIcon
            aria-label="Actions"
            iconType="gear"
            size="s"
            color="text"
            onClick={() => this.togglePopover()}
          />
        }
        isOpen={isPopoverOpen}
        closePopover={() => this.closePopover()}
        panelPaddingSize="none"
        anchorPosition="leftCenter"
      >
        <EuiContextMenuPanel
          items={[
            <EuiContextMenuItem
              key="A"
              icon="pencil"
              onClick={() => {
                this.closePopover();
              }}
            >
              Edit
            </EuiContextMenuItem>,
            <EuiContextMenuItem
              key="B"
              icon="share"
              onClick={() => {
                this.closePopover();
              }}
            >
              Share
            </EuiContextMenuItem>,
            <EuiContextMenuItem
              key="C"
              icon="copy"
              onClick={() => {
                this.closePopover();
              }}
            >
              Copy
            </EuiContextMenuItem>,
          ]}
        />
      </EuiPopover>
    );
    return (
      <div>
        <EuiComment
          username="janed"
          event="added a comment"
          actions={customActions}
          timestamp="Jan 1, 2020"
        >
          {body}
        </EuiComment>
      </div>
    );
  }
}
