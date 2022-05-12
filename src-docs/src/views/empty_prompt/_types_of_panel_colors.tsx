import React from 'react';
import { EuiCode } from '../../../../src/components';

export const typesOfPanelColors: any = {
  subdued: {
    id: 'subdued',
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
  plain: {
    id: 'plain',
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
  error: {
    id: 'error',
    text: (
      <p>
        Set <EuiCode>{'color="danger'}</EuiCode> to emphasize that an error
        happened.
      </p>
    ),
    props: { color: 'danger' },
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
    props: { color: 'plain', hasBorder: true },
  },
};
