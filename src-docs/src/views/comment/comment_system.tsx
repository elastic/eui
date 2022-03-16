import React, { useState, useEffect, useRef } from 'react';
import { formatDate, htmlIdGenerator } from '../../../../src/services';
import {
  EuiComment,
  EuiCommentProps,
  EuiButtonIcon,
  EuiBadge,
  EuiMarkdownEditor,
  EuiMarkdownFormat,
  EuiSpacer,
  EuiFlexGroup,
  EuiFlexItem,
  EuiButton,
} from '../../../../src/components';

const actionButton = (
  <EuiButtonIcon
    title="Custom action"
    aria-label="Custom action"
    color="text"
    iconType="copy"
  />
);

const initialComments: EuiCommentProps[] = [
  {
    type: 'regular',
    username: 'emma',
    event: 'added a comment',
    timestamp: 'on 3rd March 2022',
    children: (
      <EuiMarkdownFormat textSize="s">
        Phishing emails have been on the rise since February
      </EuiMarkdownFormat>
    ),
    actions: actionButton,
  },
  {
    type: 'update',
    username: 'emma',
    event: (
      <>
        added tags <EuiBadge>case</EuiBadge> <EuiBadge>phising</EuiBadge>{' '}
        <EuiBadge>security</EuiBadge>
      </>
    ),
    timestamp: 'on 3rd March 2022',
    updateIcon: 'tag',
  },
  {
    type: 'regular',
    username: 'tiago',
    event: 'added a comment',
    timestamp: 'on 4th March 2022',
    actions: actionButton,
    children: (
      <EuiMarkdownFormat textSize="s">
        Take a look at this
        [Office.exe](http://my-drive.elastic.co/suspicious-file)
      </EuiMarkdownFormat>
    ),
  },
  {
    type: 'update',
    username: 'tiago',
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
          username: 'emma',
          event: 'added a comment',
          timestamp: `on ${date}`,
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
          updateIcon={comment.updateIcon}
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

      <EuiComment username="emma" type="custom">
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

        <EuiSpacer />

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
