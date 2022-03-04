import React, { useState, useCallback } from 'react';
import { formatDate } from '../../../../src/services';
import {
  EuiComment,
  EuiCommentProps,
  EuiLink,
  EuiAvatar,
  EuiButtonIcon,
  EuiText,
  EuiBadge,
  EuiMarkdownEditor,
  EuiMarkdownFormat,
  EuiSpacer,
  EuiFlexGroup,
  EuiFlexItem,
  EuiButton,
} from '../../../../src/components/';

const actionButton = (
  <EuiButtonIcon
    title="Custom action"
    aria-label="Custom action"
    color="text"
    iconType="lensApp"
  />
);

const initialComments: EuiCommentProps[] = [
  {
    type: 'regular',
    username: 'emma@elastic.co',
    event: 'added a comment',
    timestamp: 'on 3rd March 2022',
    timelineIcon: <EuiAvatar name="emma" />,
    children: (
      <EuiText size="s">
        <p>Phishing emails have been on the rise since February</p>
      </EuiText>
    ),
    actions: actionButton,
  },
  {
    type: 'update',
    username: (
      <>
        <EuiAvatar size="s" name="emma" /> emma@elastic.co
      </>
    ),
    event: (
      <>
        added tags <EuiBadge>case</EuiBadge> <EuiBadge>phising</EuiBadge>{' '}
        <EuiBadge>security</EuiBadge>
      </>
    ),
    timestamp: 'on 3rd March 2022',
    timelineIcon: 'tag',
  },
  {
    type: 'regular',
    username: 'tiago@elastic.co',
    event: 'added a comment',
    timestamp: 'on 4th March 2022',
    timelineIcon: <EuiAvatar name="tiago" />,
    actions: actionButton,
    children: (
      <EuiText size="s">
        <p>
          Take a look at this <EuiLink href="#">Office.exe</EuiLink>
        </p>
      </EuiText>
    ),
  },
  {
    type: 'update',
    username: (
      <>
        <EuiAvatar size="s" name="tiago" /> tiago@elastic.co
      </>
    ),
    event: (
      <>
        marked case as <EuiBadge color="warning">In progress</EuiBadge>
      </>
    ),
    timestamp: 'on 4th March 2022',
  },
];

const replyMsg = `Thanks, Tiago for taking a look. :tada:

I also found something suspicious: [Update.exe](http://my-drive.elastic.co/suspicious-file).
`;

export default () => {
  const [editorValue, setEditorValue] = useState(replyMsg);
  const [comments, setComments] = useState(initialComments);
  const [isLoading, setIsLoading] = useState(false);

  const date = formatDate(Date.now(), 'dobLong');

  const onAddComment = () => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setEditorValue('');

      setComments([
        ...comments,
        {
          type: 'regular',
          username: 'emma@elastic.co',
          event: 'added a comment',
          timestamp: `on ${date}`,
          timelineIcon: <EuiAvatar name="emma" />,
          actions: actionButton,
          children: (
            <EuiMarkdownFormat textSize="s">{editorValue}</EuiMarkdownFormat>
          ),
        },
      ]);
    }, 3000);
  };

  const commentsList = comments.map((comment) => {
    if (comment.type === 'update') {
      return (
        <EuiComment
          type="update"
          username={comment.username}
          event={comment.event}
          timestamp={comment.timestamp}
          timelineIcon={comment.timelineIcon}
        />
      );
    } else {
      return (
        <EuiComment
          type="regular"
          username={comment.username}
          event={comment.event}
          timestamp={comment.timestamp}
          timelineIcon={comment.timelineIcon}
          actions={comment.actions}
        >
          {comment.children}
        </EuiComment>
      );
    }
  });

  return (
    <>
      <div>
        {commentsList}

        <EuiComment type="custom" timelineIcon={<EuiAvatar name="emma" />}>
          <EuiMarkdownEditor
            aria-label="Markdown editor"
            placeholder="Add a comment..."
            value={editorValue}
            onChange={setEditorValue}
            readOnly={isLoading}
            initialViewMode="editing"
            markdownFormatProps={{ textSize: 's' }}
          />
          <EuiSpacer />
          <EuiFlexGroup justifyContent="flexEnd">
            <EuiFlexItem grow={false}>
              <div>
                <EuiButton onClick={onAddComment} isLoading={isLoading}>
                  Add comment
                </EuiButton>
              </div>
            </EuiFlexItem>
          </EuiFlexGroup>
        </EuiComment>
      </div>
    </>
  );
};
