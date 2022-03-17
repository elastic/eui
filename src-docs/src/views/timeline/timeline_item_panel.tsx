import React from 'react';
import {
  EuiTimelineItem,
  EuiTimelineItemPanel,
  EuiAvatar,
  EuiText,
  EuiCodeBlock,
} from '../../../../src/components';

export default () => (
  <div>
    <EuiTimelineItem
      icon={<EuiAvatar name="Checked" iconType="pencil" color="shade" />}
    >
      <EuiTimelineItemPanel
        header={
          <EuiText size="s">
            <p>
              <strong>Janet</strong> edited the dashboard 2 days
            </p>
          </EuiText>
        }
      />
    </EuiTimelineItem>
    <EuiTimelineItem
      icon={<EuiAvatar name="system" iconType="eye" color="shade" />}
    >
      <EuiTimelineItemPanel
        header={
          <EuiText size="s">
            <p>
              <strong>Pedro</strong> changed permissions
            </p>
          </EuiText>
        }
      />
    </EuiTimelineItem>

    <EuiTimelineItem
      icon={<EuiAvatar name="system" iconType="editorComment" color="shade" />}
    >
      <EuiTimelineItemPanel
        header={
          <EuiText size="s">
            <p>
              <strong>Nicole</strong> mentioned this dashboard in comment#021
            </p>
          </EuiText>
        }
      />
    </EuiTimelineItem>

    <EuiTimelineItem
      icon={<EuiAvatar name="system" iconType="alert" color="shade" />}
    >
      <EuiTimelineItemPanel
        paddingSize="s"
        header={
          <EuiText size="s">
            <p>Error detected in dashboard</p>
          </EuiText>
        }
        headerColor="danger"
      />
    </EuiTimelineItem>

    <EuiTimelineItem
      icon={
        <EuiAvatar name="system" iconType="editorCodeBlock" color="shade" />
      }
    >
      <EuiTimelineItemPanel
        hasBorder
        paddingSize="s"
        headerColor="subdued"
        header={
          <EuiText size="s">
            <p>A new iframe was generated</p>
          </EuiText>
        }
      >
        <EuiCodeBlock
          language="html"
          isCopyable
          transparentBackground
          paddingSize="none"
        >
          {`<!-- I'm an example of HTML -->
<h1>Hello world!</h1>
<p>Lorem ipsum dolor sit amet.</p>`}
        </EuiCodeBlock>
      </EuiTimelineItemPanel>
    </EuiTimelineItem>
  </div>
);
