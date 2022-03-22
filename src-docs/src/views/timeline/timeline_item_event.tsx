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
      icon={<EuiAvatar name="Checked" iconType="pencil" color="subdued" />}
      header={
        <EuiText size="s">
          <p>
            <strong>Janet</strong> edited the dashboard 4 days ago
          </p>
        </EuiText>
      }
    />

    <EuiTimelineItem
      icon={
        <EuiAvatar name="system" iconType="editorComment" color="subdued" />
      }
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
      icon={<EuiAvatar name="system" iconType="alert" color="subdued" />}
      header={
        <EuiText size="s">
          <p>Error detected in dashboard 5 minutes ago</p>
        </EuiText>
      }
      panelProps={{
        paddingSize: 's',
        color: 'danger',
      }}
    />

    <EuiTimelineItem
      panelProps={{
        hasBorder: true,
        paddingSize: 's',
        headerColor: 'subdued',
      }}
      icon={
        <EuiAvatar name="system" iconType="editorCodeBlock" color="subdued" />
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
    />

    <EuiTimelineItem
      icon={<EuiAvatar name="system" iconType="alert" color="subdued" />}
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
