import React from 'react';
import { EuiComment } from '../../../../src/components/comment';
import { EuiAvatar } from '../../../../src/components/avatar';
import { EuiBadge } from '../../../../src/components/badge';
import { EuiFlexGroup, EuiFlexItem } from '../../../../src/components/flex';
import { EuiButtonIcon } from '../../../../src/components/button';
import { EuiText } from '../../../../src/components/text';

const body = (
  <EuiText size="s">
    <p>
      Far out in the uncharted backwaters of the unfashionable end of the
      western spiral arm of the Galaxy lies a small unregarded yellow sun.
    </p>
  </EuiText>
);

const longBody = (
  <EuiText size="s">
    <p>
      This planet has - or rather had - a problem, which was this: most of the
      people living on it were unhappy for pretty much of the time. Many
      solutions were suggested for this problem, but most of these were largely
      concerned with the movements of small green pieces of paper, which is odd
      because on the whole it was not the small green pieces of paper that were
      unhappy.
    </p>
  </EuiText>
);

const copyAction = (
  <EuiButtonIcon
    title="Custom action"
    aria-label="Custom action"
    color="subdued"
    iconType="copy"
  />
);

export default () => (
  <div>
    <EuiComment
      username="janed"
      event="added a comment"
      actions={copyAction}
      timestamp="on Jan 1, 2020">
      {body}
    </EuiComment>
    <EuiComment
      username="juanab"
      type="update"
      actions={copyAction}
      event="pushed incident X0Z235"
      timestamp="on Jan 3, 2020"
      timelineIcon={
        <EuiAvatar
          imageUrl="https://source.unsplash.com/64x64/?woman"
          size="l"
          name="Juana"
        />
      }
    />
    <EuiComment
      username="pancho1"
      type="update"
      event="edited case"
      timestamp="on Jan 9, 2020"
    />
    <EuiComment
      actions={copyAction}
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
      timestamp="on Jan 11, 2020"
      timelineIcon="tag"
    />
    <EuiComment
      username="elohar"
      event="added a comment"
      actions={copyAction}
      timestamp="on Jan 14, 2020"
      timelineIcon={<EuiAvatar size="l" name="Eloha" />}>
      {longBody}
    </EuiComment>
  </div>
);
