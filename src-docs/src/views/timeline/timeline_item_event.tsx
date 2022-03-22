import React from 'react';
import {
  EuiTimelineItem,
  EuiAvatar,
  EuiText,
  EuiCodeBlock,
  EuiLink,
  EuiMarkdownEditor,
  EuiSplitPanel,
  EuiPanel,
} from '../../../../src/components';

export default () => (
  <div>
    <EuiTimelineItem
      icon={<EuiAvatar name="Checked" iconType="pencil" color="subdued" />}
      alignItems="center"
    >
      <EuiPanel paddingSize="none" color="transparent">
        <EuiText size="s">
          <p>
            <strong>Janet</strong> edited the dashboard 4 days ago
          </p>
        </EuiText>
      </EuiPanel>
    </EuiTimelineItem>

    <EuiTimelineItem
      icon={
        <EuiAvatar name="system" iconType="editorComment" color="subdued" />
      }
      alignItems="center"
    >
      <EuiPanel paddingSize="none" color="transparent">
        <EuiText size="s">
          <p>
            <strong>Nicole</strong> mentioned this dashboard in{' '}
            <EuiLink href="#">case/comment#021</EuiLink> 2 days ago
          </p>
        </EuiText>
      </EuiPanel>
    </EuiTimelineItem>

    <EuiTimelineItem
      icon={<EuiAvatar name="system" iconType="alert" color="subdued" />}
    >
      <EuiPanel color="danger" paddingSize="s">
        <EuiText size="s">
          <p>Error detected in dashboard 5 minutes ago</p>
        </EuiText>
      </EuiPanel>
    </EuiTimelineItem>

    <EuiTimelineItem
      icon={
        <EuiAvatar name="system" iconType="editorCodeBlock" color="subdued" />
      }
    >
      <EuiSplitPanel.Outer hasBorder grow>
        <EuiSplitPanel.Inner color="subdued" paddingSize="s">
          <EuiText size="s">
            <p>
              <strong>Nicole</strong> generated a new iframe 2 minutes ago
            </p>
          </EuiText>
        </EuiSplitPanel.Inner>
        <EuiSplitPanel.Inner paddingSize="s" color="plain">
          <EuiCodeBlock
            language="html"
            isCopyable
            transparentBackground
            paddingSize="none"
          >
            {`<!-- Your dashboard iframe -->
<iframe src="#" width="560" height="315" allowfullscreen="allowfullscreen"></iframe>`}
          </EuiCodeBlock>
        </EuiSplitPanel.Inner>
      </EuiSplitPanel.Outer>
    </EuiTimelineItem>

    <EuiTimelineItem
      icon={<EuiAvatar name="system" iconType="alert" color="subdued" />}
    >
      <EuiMarkdownEditor
        aria-label="Markdown editor"
        value={
          'Just a markdown editor passed in the `body` prop without any panel customization :tada:'
        }
        onChange={() => {}}
        initialViewMode="viewing"
        markdownFormatProps={{ textSize: 's' }}
        height={280}
      />
    </EuiTimelineItem>
  </div>
);
