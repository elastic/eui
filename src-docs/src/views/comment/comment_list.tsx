import React from 'react';
import { EuiComment } from '../../../../src/components/comment';
import { EuiCommentList } from '../../../../src/components/comment';
import { EuiAvatar } from '../../../../src/components/avatar';
import { EuiBadge } from '../../../../src/components/badge';
// import { EuiFlexGroup, EuiFlexItem } from '../../../../src/components/flex';
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

const avatar = (
  <EuiAvatar
    imageUrl="https://source.unsplash.com/64x64/?woman"
    size="l"
    name="Juana"
  />
);

const comments = [
  {
    username: 'janed',
    event: 'added a comment',
    timestamp: 'on Jan 1, 2020',
    children: body,
  },
  {
    username: 'juanab',
    type: 'update',
    piensa: 'hello',
    actions: copyAction,
    event: 'pushed incident X0Z235',
    timestamp: 'on Jan 3, 2020',
    // timelineIcon: avatar,
    timelineIcon: (
      <EuiAvatar
        imageUrl="https://source.unsplash.com/64x64/?woman"
        size="l"
        name="Juana"
      />
    ),
  },
];

export default () => (
  <div>
    <EuiCommentList comments={comments} />
    <EuiCommentList comments={comments} />
    <EuiCommentList comments={comments} />
    <EuiCommentList comments={comments} />
    <EuiCommentList>
      <EuiComment
        username="andred"
        event="added a comment"
        timestamp="yesterday">
        {body}
      </EuiComment>
      <EuiComment
        username="luisg"
        type="update"
        event="edited case"
        timestamp="22 hours ago"
      />
      <EuiComment
        username="milal"
        type="update"
        event="edited case"
        timestamp="6 hours ago">
        {body}
      </EuiComment>
    </EuiCommentList>
    <EuiCommentList comments={comments} />
  </div>
);
