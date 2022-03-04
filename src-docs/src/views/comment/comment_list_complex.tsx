import React, { useState, useEffect, useRef } from 'react';
import { formatDate, htmlIdGenerator } from '../../../../src/services';
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
  EuiFormErrorText,
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
  const errorElementId = useRef(htmlIdGenerator()());
  const [editorValue, setEditorValue] = useState(replyMsg);
  const [comments, setComments] = useState(initialComments);
  const [isLoading, setIsLoading] = useState(false);
  const [editorError, setEditorError] = useState(true);

  const date = formatDate(Date.now(), 'dobLong');

  useEffect(() => {
    if (editorValue === '') {
      setEditorError(true);
    } else {
      setEditorError(false);
    }
  }, [editorValue, editorError]);

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

  const commentsList = comments.map((comment, index) => {
    if (comment.type === 'update') {
      return (
        <EuiComment
          key={`comment-update-${index}`}
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
          key={`comment-regular-${index}`}
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
      {commentsList}

      <EuiComment type="custom" timelineIcon={<EuiAvatar name="emma" />}>
        <EuiMarkdownEditor
          aria-label="Markdown editor"
          aria-describedby={errorElementId.current}
          placeholder="Add a comment..."
          value={editorValue}
          onChange={setEditorValue}
          readOnly={isLoading}
          initialViewMode="editing"
          markdownFormatProps={{ textSize: 's' }}
        />

        {editorError ? (
          <>
            <EuiSpacer size="xs" />

            <EuiFormErrorText id={errorElementId.current}>
              A comment is required.
            </EuiFormErrorText>
          </>
        ) : (
          <EuiSpacer />
        )}

        <EuiFlexGroup justifyContent="flexEnd">
          <EuiFlexItem grow={false}>
            <div>
              <EuiButton
                onClick={onAddComment}
                isLoading={isLoading}
                isDisabled={editorError}
              >
                Add comment
              </EuiButton>
            </div>
          </EuiFlexItem>
        </EuiFlexGroup>
      </EuiComment>
    </>
  );
};
