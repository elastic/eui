import { EuiCode } from '@elastic/eui';

export const TYPES_OF_PANEL_COLORS = {
  sidebar: {
    id: 'sidebar',
    text: (
      <>
        <p>
          Set <EuiCode>{'color="subdued"'}</EuiCode> to make users not getting
          distracted and focus on the content.
        </p>
        <p>
          Consider the transparent color if the empty prompt is contained in
          another component.
        </p>
      </>
    ),
    props: { color: 'subdued' },
  },
  empty: {
    id: 'empty',
    text: (
      <>
        <p>
          Set <EuiCode>{'color="plain”'}</EuiCode> to make users getting focus
          on the content
        </p>
        <p>
          Consider the transparent color if the empty prompt is contained in
          another component.
        </p>
      </>
    ),
    props: { color: 'plain' },
  },
  multiple: {
    id: 'multiple',
    text: (
      <>
        <p>
          Set <EuiCode>{'color="plain” and hasBorder={true}'}</EuiCode> when you
          have multiple panels on the page. The other panels should also have
          borders to ensure consistency.
        </p>
        <p>
          Consider the transparent color if the empty prompt is contained in
          another component.
        </p>
      </>
    ),
  },
  error: {
    id: 'error',
    text: (
      <p>
        Set <EuiCode>{'color="danger"'}</EuiCode> to emphasize that an error
        happened.
      </p>
    ),
  },
} as const;
