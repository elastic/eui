import React from 'react';
import { EuiComment } from '../../../../src/components/comment';
import { EuiIcon } from '../../../../src/components/icon';
import { EuiAvatar } from '../../../../src/components/avatar';
import { EuiBadge } from '../../../../src/components/badge';
import { EuiFlexGroup, EuiFlexItem } from '../../../../src/components/flex';

const body =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ut quam eget augue pulvinar. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ut quam eget augue pulvinar.';

const longBody =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ut quam eget augue pulvinar. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ut quam eget augue pulvinar. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ut quam eget augue pulvinar. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ut quam eget augue pulvinar. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ut quam eget augue pulvinar. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ut quam eget augue pulvinar.';

const bodyUpdate = 'This type of comment can also have a body';

export default () => (
  <div>
    <EuiComment
      username="janed"
      event="added a comment"
      actions={<EuiIcon type="copy" />}
      timeStamp="on Jan 1, 2020">
      {body}
    </EuiComment>
    <EuiComment
      username="mariob"
      type="update"
      actions={<EuiIcon type="copy" />}
      event="pushed a new incident"
      timeStamp="on Jan 3, 2020"
      timelineIcon={<EuiAvatar size="l" name="Chandler" />}
    />
    <EuiComment
      actions={<EuiIcon type="copy" />}
      username={
        <EuiFlexGroup responsive={false} alignItems="center" gutterSize="s">
          <EuiFlexItem grow={false}>
            <EuiAvatar size="s" type="space" name="Pedro" />
          </EuiFlexItem>
          <EuiFlexItem grow={false}>pedror</EuiFlexItem>
        </EuiFlexGroup>
      }
      type="update"
      event={
        <EuiFlexGroup responsive={false} alignItems="center" gutterSize="s">
          <EuiFlexItem grow={false}>added tags</EuiFlexItem>
          <EuiFlexItem grow={false}>
            <EuiBadge color="primary">sample</EuiBadge>
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <EuiBadge color="secondary">review</EuiBadge>
          </EuiFlexItem>
        </EuiFlexGroup>
      }
      timeStamp="on Jan 4, 2020"
      timelineIcon={
        <div className="euiCommentTimeline__contentDefault">
          <EuiIcon size="l" type="tag" />
        </div>
      }
    />
    <EuiComment
      username="pancho1"
      type="update"
      event="edited case"
      timeStamp="on Jan 11, 2020"
      timelineIcon={<EuiAvatar size="l" name="Greg" />}
    />
    <EuiComment
      username="elohar"
      event="added a comment"
      actions={<EuiIcon type="copy" />}
      timeStamp="on Jan 14, 2020"
      timelineIcon={<EuiAvatar size="l" name="Andrea" />}>
      {longBody}
    </EuiComment>
    <EuiComment
      username="pancho1"
      type="update"
      event="edited case"
      timeStamp="on Jan 21, 2020"
      timelineIcon={<EuiAvatar size="l" name="Greg" />}>
      {bodyUpdate}
    </EuiComment>
  </div>
);
