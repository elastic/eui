import React from 'react';
import {
  EuiTimelineItem,
  EuiAvatar,
  EuiText,
  EuiCodeBlock,
  EuiLink,
  EuiMarkdownEditor,
} from '../../../../src/components';

export default () => (
  <div>
    <EuiTimelineItem
      icon={<EuiAvatar name="Checked" iconType="pencil" color="shade" />}
      header={
        <EuiText size="s">
          <p>
            <strong>Janet</strong> edited the dashboard 4 days ago
          </p>
        </EuiText>
      }
    />

    <EuiTimelineItem
      icon={<EuiAvatar name="system" iconType="editorComment" color="shade" />}
      header={
        <EuiText size="s">
          <p>
            <strong>Nicole</strong> mentioned this dashboard in{' '}
            <EuiLink href="#">case/comment#021</EuiLink> 2 days ago
          </p>
        </EuiText>
      }
    />

    <EuiTimelineItem
      icon={<EuiAvatar name="system" iconType="alert" color="shade" />}
      header={
        <EuiText size="s">
          <p>Error detected in dashboard 5 minutes ago</p>
        </EuiText>
      }
      panelPaddingSize="s"
      panelColor="danger"
    />

    <EuiTimelineItem
      icon={
        <EuiAvatar name="system" iconType="editorCodeBlock" color="shade" />
      }
      header={
        <EuiText size="s">
          <p>
            <strong>Nicole</strong> generated a new iframe 2 minutes ago
          </p>
        </EuiText>
      }
      body={
        <EuiCodeBlock
          language="html"
          isCopyable
          transparentBackground
          paddingSize="none"
        >
          {`<!-- Your dashboard iframe -->
<iframe src="#" width="560" height="315" allowfullscreen="allowfullscreen"></iframe>`}
        </EuiCodeBlock>
      }
      panelHasBorder
      panelPaddingSize="s"
      headerPanelColor="subdued"
    />

    <EuiTimelineItem
      icon={<EuiAvatar name="system" iconType="alert" color="shade" />}
      body={
        <EuiMarkdownEditor
          aria-label="Markdown editor"
          value={
            'Just a markdown editor passed in the `body` prop without any panel customization :tada:'
          }
          onChange={() => {}}
          initialViewMode="viewing"
          markdownFormatProps={{ textSize: 's' }}
        />
      }
    />
  </div>
);
