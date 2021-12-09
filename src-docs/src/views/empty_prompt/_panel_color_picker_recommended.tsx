import React from 'react';

export const recommendedObj: any = {
  plainWithBorder: {
    id: 'plainWithBorder',
    code: 'color="plain” | hasBorder={true}',
    text: (
      <p>
        Use this panel color to make users not getting distracted and focus on
        the content.
      </p>
    ),
    props: { color: 'plain', hasBorder: true },
  },
  plain: {
    id: 'plain',
    code: 'color="plain”',
    text: (
      <p>
        Use this panel color to make users not getting distracted and focus on
        the content.
      </p>
    ),
    props: { color: 'plain' },
  },
  errorPanel: {
    id: 'errorPanel',
    code: 'color="error"',
    text: <p>Use this panel color to emphasize that an error happened.</p>,
    props: { color: 'danger' },
  },
  standOutSubdued: {
    id: 'standOutSubdued',
    code: 'color="subdued"',
    text: (
      <p>
        Consider this alternative if you want to make the empty prompt stand
        out. For example, if there are other components on the page, and you
        want to make users look to the empty prompt first.
      </p>
    ),
    props: { color: 'subdued' },
  },
  standOutColored: {
    id: 'standOutColored',
    code: 'color="primary" | color="accent"',
    text: (
      <p>
        Consider any of these alternative if you want to make the empty prompt
        to stand out. For example, if there are other components on the page and
        you want to make users look to the empty prompt first.
      </p>
    ),
    props: { color: 'primary' },
  },
  alternativeError: {
    id: 'alternativeError',
    code: 'color="error"',
    text: (
      <p>
        ALternative. Use this panel color to emphasize that an error happened.
      </p>
    ),
    props: { color: 'danger' },
  },
  alternativeTransparent: {
    id: 'alternativeTransparent',
    code: 'color="transparent”"',
    text: (
      <p>
        Consider this alternative if the empty prompt is contained in another
        component.
      </p>
    ),
    props: { color: 'transparent' },
  },
};
