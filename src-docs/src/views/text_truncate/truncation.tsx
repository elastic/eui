import React from 'react';

import { css } from '@emotion/react';

import { EuiPanel, EuiText, EuiTextTruncate } from '../../../../src';

export default () => {
  return (
    <EuiText>
      <EuiPanel
        css={css`
          overflow: auto;
          resize: horizontal; /* Not all browsers support resize logical properties yet */
          resize: inline;
          inline-size: 35ch;
          max-inline-size: 100%;
        `}
      >
        <EuiTextTruncate
          text="The quick brown fox jumps over the lazy dog."
          truncation="start"
        />
        <EuiTextTruncate
          text="But the dog wasn’t lazy, it was just practicing mindfulness, so it had a greater sense of life-satisfaction than that fox with all its silly jumping."
          truncation="end"
        />
        <EuiTextTruncate
          text="And from the fox’s perspective, life was full of hoops to jump through, low-hanging fruit to jump for, and dead car batteries to jump-start."
          truncation="startEnd"
        />
        <EuiTextTruncate
          text="So it thought the dog was making a poor life choice by focusing so much on mindfulness. What if its car broke down?"
          truncation="middle"
        />
      </EuiPanel>
    </EuiText>
  );
};
