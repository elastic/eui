import React, { useState } from 'react';
import {
  EuiCommentList,
  EuiComment,
  EuiButtonIcon,
  EuiText,
  EuiPopover,
  EuiContextMenuPanel,
  EuiContextMenuItem,
  EuiLink,
  EuiFlyout,
  EuiFlyoutHeader,
  EuiFlyoutBody,
  EuiTitle,
} from '../../../../src/components/';
import { useGeneratedHtmlId } from '../../../../src/services/';

const body = (
  <EuiText size="s">
    <p>
      This comment has custom actions available. See the upper right corner.
    </p>
  </EuiText>
);

export default () => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isFlyoutVisible, setIsFlyoutVisible] = useState(false);

  const flyoutTitleId = useGeneratedHtmlId({
    prefix: 'flyoutTitleId',
  });

  const togglePopover = () => {
    setIsPopoverOpen(!isPopoverOpen);
  };

  const closePopover = () => {
    setIsPopoverOpen(false);
  };

  const toggleFlyout = () => {
    setIsFlyoutVisible(!isFlyoutVisible);
  };

  const flyout = isFlyoutVisible && (
    <EuiFlyout
      ownFocus
      onClose={() => setIsFlyoutVisible(false)}
      aria-labelledby={flyoutTitleId}
    >
      <EuiFlyoutHeader hasBorder>
        <EuiTitle size="m">
          <h2 id={flyoutTitleId}>Malware detection alert</h2>
        </EuiTitle>
      </EuiFlyoutHeader>
      <EuiFlyoutBody>
        <EuiText>
          <p>
            Use a flyout to show more details related to your comment event.
          </p>
        </EuiText>
      </EuiFlyoutBody>
    </EuiFlyout>
  );

  const customActions = (
    <EuiPopover
      button={
        <EuiButtonIcon
          aria-label="Actions"
          iconType="boxesHorizontal"
          size="xs"
          color="text"
          onClick={togglePopover}
        />
      }
      isOpen={isPopoverOpen}
      closePopover={togglePopover}
      panelPaddingSize="none"
      anchorPosition="leftCenter"
    >
      <EuiContextMenuPanel
        items={[
          <EuiContextMenuItem key="A" icon="pencil" onClick={closePopover}>
            Edit
          </EuiContextMenuItem>,
          <EuiContextMenuItem key="B" icon="share" onClick={closePopover}>
            Share
          </EuiContextMenuItem>,
          <EuiContextMenuItem key="C" icon="copy" onClick={closePopover}>
            Copy
          </EuiContextMenuItem>,
        ]}
      />
    </EuiPopover>
  );

  const updateActions = [
    <EuiButtonIcon
      key="copy-alert"
      title="Copy alert link"
      aria-label="Copy alert link"
      iconType="link"
      size="xs"
      color="text"
    />,
    <EuiButtonIcon
      key="show-details"
      title="Show the alert details in a flyout"
      aria-label="Show details"
      iconType="popout"
      size="xs"
      color="text"
      onClick={toggleFlyout}
    />,
  ];

  return (
    <>
      <EuiCommentList aria-label="Actions">
        <EuiComment
          username="janed"
          timelineAvatarAriaLabel="Jane Doe"
          event="added a comment"
          actions={customActions}
          timestamp="on Jan 1, 2020"
        >
          {body}
        </EuiComment>
        <EuiComment
          username="system"
          timelineAvatarAriaLabel="System"
          timelineAvatar="dot"
          event={
            <>
              pushed a new incident <EuiLink>malware detection</EuiLink>
            </>
          }
          actions={updateActions}
          timestamp="on Jan 2, 2020"
          eventColor="danger"
        />
      </EuiCommentList>
      {flyout}
    </>
  );
};
