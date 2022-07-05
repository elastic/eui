import React from 'react';
import { Link } from 'react-router-dom';

import { GuideSectionTypes } from '../../components';
import {
  EuiCode,
  EuiComment,
  EuiCommentList,
  EuiCallOut,
  EuiText,
  EuiSpacer,
} from '../../../../src/components';
import commentConfig from './playground';
import CommentProps from './comment_props';

import CommentList from './comment_list';
const commentListSource = require('!!raw-loader!./comment_list');
const commentListSnippet = `<EuiCommentList
  aria-label="Comment list example"
  comments={[
    {
      username: username,
      event: event,
      timestamp: timestamp,
      children: body,
    },
]}
/>`;

import CommentFlexible from './comment_flexible';
const commentFlexibleSource = require('!!raw-loader!./comment_flexible');
const commentFlexibleSnippet = `<EuiComment
  eventIcon="pencil"
  username="janed"
  event={event}
  timestamp={timestamp}
  actions={customActions}
>
  {children}
</EuiComment>
`;

import CommentAvatar from './comment_avatar';
const commentAvatarSource = require('!!raw-loader!./comment_avatar');
const commentAvatarSnippet = [
  `<EuiCommentList aria-label="Timeline icon example">
  <EuiComment username="janed">
    {body}
  </EuiComment>
</EuiCommentList>
`,
  `<EuiCommentList aria-label="Timeline icon example">
  <EuiComment timelineIcon="tag" username="janed" />
</EuiCommentList>
`,
  `<EuiCommentList aria-label="Timeline icon example">
  <EuiComment timelineIcon={avatar} username="janed">
    {body}
  </EuiComment>
</EuiCommentList>
`,
];

import CommentActions from './comment_actions';
const commentActionsSource = require('!!raw-loader!./comment_actions');
const commentActionsSnippet = `<EuiCommentList aria-label="Comment actions example">
  <EuiComment username="janed" actions={customActions}>
    {body}
  </EuiComment>
</EuiCommentList>`;

import CommentSystem from './comment_system';
const commentSystemSource = require('!!raw-loader!./comment_system');

export const CommentListExample = {
  title: 'Comment list',
  intro: (
    <EuiText>
      <p>
        The <strong>EuiCommentList</strong> is a timeline component built on top
        of{' '}
        <Link to="/display/timeline">
          <strong>EuiTimeline</strong>
        </Link>
        . It allows you to display comments or logging actions that either a
        user or a system has performed.
      </p>

      <EuiCallOut
        color="warning"
        iconType="accessibility"
        title={
          <>
            For accessibility, it is highly recommended to provide a descriptive{' '}
            <EuiCode>aria-label</EuiCode>, or a text node ID of an external
            label to the <EuiCode>aria-labelledby</EuiCode> prop of the{' '}
            <strong>EuiCommentList</strong>.
          </>
        }
      />
    </EuiText>
  ),
  sections: [
    {
      title: 'Basic comment list',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: commentListSource,
        },
      ],
      text: (
        <div>
          Use <strong>EuiCommentList</strong> to display a list of{' '}
          <strong>EuiComments</strong>. Pass an array of{' '}
          <strong>EuiComment</strong> objects and{' '}
          <strong>EuiCommentList</strong> will generate a comment thread.
        </div>
      ),
      props: { EuiCommentList, EuiComment },
      snippet: commentListSnippet,
      demo: <CommentList />,
    },
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: commentFlexibleSource,
        },
      ],
      title: 'Comment',
      text: (
        <>
          <EuiText>
            <p>
              The <strong>EuiComment</strong> is flexible and adapts the design
              according to the props passed.
            </p>
          </EuiText>
          <EuiSpacer />
          <CommentProps snippet={commentFlexibleSnippet} />
          <EuiSpacer />
          <EuiText>
            <ul style={{ listStyleType: 'upper-alpha' }}>
              <li>
                <EuiCode>avatar</EuiCode>: Shows an avatar that should indicate
                who is the author of the comment. By default, the avatar show
                initials that are generated from the <EuiCode>username</EuiCode>{' '}
                prop. When no <EuiCode>username</EuiCode> is passed, you can
                define an avatar by using the <EuiCode>avatarName</EuiCode> and{' '}
                <EuiCode>avatarIcon</EuiCode> props.
              </li>
              <li>
                <EuiCode>eventIcon</EuiCode>: Icon that shows before the
                username. Use in conjunction with{' '}
                <EuiCode>eventIconAriaLabel</EuiCode> to pass an aria label to
                the event icon.
              </li>
              <li>
                <EuiCode>username</EuiCode>: Author of the comment.
              </li>
              <li>
                <EuiCode>event</EuiCode>: Shows inside a badge denoting what
                type of event it is. Use in conjunction with{' '}
                <EuiCode>severity</EuiCode> and <EuiCode>badgeColor</EuiCode> to
                indicate the level of urgency.
              </li>
              <li>
                <EuiCode>timestamp</EuiCode>: Time of occurrence of the event.
              </li>
              <li>
                <EuiCode>actions</EuiCode>: Custom actions that the user can
                perform from the comment&apos;s header. When having multiple
                actions, consider grouping them in a nested menu system using a{' '}
                <Link to="/layout/popover">
                  <strong>EuiPopover</strong>
                </Link>{' '}
                with a{' '}
                <Link to="/navigation/context-menu">
                  <strong>EuiContextMenu</strong>
                </Link>
              </li>
              <li>
                <EuiCode>children</EuiCode>: Use this prop to pass a user
                message or any custom component.
              </li>
            </ul>
          </EuiText>
          <EuiSpacer />
          <EuiText>
            <p>
              The following demo shows how you can combine different props to
              create different types of comments events like a regular, update,
              update with a danger background and a custom one.
            </p>
          </EuiText>
        </>
      ),
      props: { EuiCommentList, EuiComment },
      snippet: commentFlexibleSnippet,
      demo: <CommentFlexible />,
      playground: commentConfig,
    },
    {
      title: 'Comment avatar',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: commentAvatarSource,
        },
      ],
      text: (
        <>
          <p>
            The avatar is a very important part of the comment and you should
            always show one:
          </p>
          <ol>
            <li>
              By default, each <strong>EuiComment</strong> shows an avatar with
              the initial letter of the <EuiCode>username</EuiCode>. It also
              uses the <EuiCode>username</EuiCode> for the avatar title
              attribute.
            </li>
            <li>
              If your <strong>EuiComment</strong> doesn&apos;t have a{' '}
              <EuiCode>username</EuiCode>, or if you don&apos;t want to use it
              for generating the title attribute and initials you can use the{' '}
              <EuiCode>avatarName</EuiCode> prop instead. (e.g you want to
              display the full name of the user instead of the{' '}
              <EuiCode>username</EuiCode>).
            </li>
            <li>
              You can also show an icon by passing to the{' '}
              <EuiCode>avatarIcon</EuiCode> any of the icon types that{' '}
              <Link to="/display/icons">
                <strong>EuiIcon</strong>
              </Link>{' '}
              supports. The icon will show inside a <EuiCode>subdued</EuiCode>{' '}
              avatar. Consider this option when showing a system update.
            </li>
            <li>
              You can further customize the timeline avatar by passing to the{' '}
              <EuiCode>EuiComment.avatarProps</EuiCode> any{' '}
              <Link to="/display/avatar">
                <strong>EuiAvatar</strong>
              </Link>{' '}
              prop.
            </li>
          </ol>
        </>
      ),
      props: { EuiComment },
      snippet: commentAvatarSnippet,
      demo: <CommentAvatar />,
    },
    {
      title: 'Comment event actions',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: commentActionsSource,
        },
      ],
      text: (
        <>
          <p>
            There are scenarios where you might want to allow the user to
            perform <EuiCode>actions</EuiCode> related to each comment. Some
            common <EuiCode>actions</EuiCode> include: editing, deleting,
            sharing and copying. To add custom <EuiCode>actions</EuiCode> to a
            comment, use the <EuiCode>actions</EuiCode>
            prop. These will be placed to the right of the metadata in the
            comment&apos;s header. We recommend using a{' '}
            <Link to="/navigation/button">
              <strong>EuiButtonIcon</strong>
            </Link>{' '}
            to trigger an action. When having multiple actions, consider
            grouping them in a nested menu system using a{' '}
            <Link to="/layout/popover">
              <strong>EuiPopover</strong>
            </Link>{' '}
            with a{' '}
            <Link to="/navigation/context-menu">
              <strong>EuiContextMenu</strong>
            </Link>
            .
          </p>
        </>
      ),
      props: { EuiComment },
      snippet: commentActionsSnippet,
      demo: <CommentActions />,
    },
    {
      title: 'A comment system',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: commentSystemSource,
        },
      ],
      text: (
        <>
          <p>
            The below example uses a list of <strong>EuiComments</strong>, a{' '}
            <Link to="/editors-syntax/markdown-editor">
              <strong>EuiMarkdownEditor</strong>
            </Link>
            , and a{' '}
            <Link to="/editors-syntax/markdown-format">
              <strong>EuiMarkdownFormat</strong>
            </Link>{' '}
            to create a simple comment system.
          </p>
          <ul>
            <li>
              Each comment renders in a <strong>EuiComment</strong>.
            </li>
            <li>
              We use the <strong>EuiMarkdownEditor</strong> to post the{' '}
              <EuiCode>EuiComment.children</EuiCode>. This means the content
              uses Markdown.
            </li>
            <li>
              When the new <strong>EuiComment</strong> is posted, we use the{' '}
              <strong>EuiMarkdownFormat</strong> to wrap the{' '}
              <EuiCode>EuiComment.children</EuiCode> and render the Markdown
              correctly.
            </li>
          </ul>
          <p>
            When dealing with asynchronous events like when adding a message we
            recommend setting the <strong>EuiMarkdownEditor</strong> to a{' '}
            <EuiCode>readOnly</EuiCode> state and the &quot;Add comment&quot;{' '}
            <strong>EuiButton</strong> to a <EuiCode>isLoading</EuiCode> state.
            This will ensure users understand that the content cannot be changed
            while the comment is being submitted.
          </p>
        </>
      ),
      props: { EuiCommentList, EuiComment },
      demo: <CommentSystem />,
    },
  ],
};
