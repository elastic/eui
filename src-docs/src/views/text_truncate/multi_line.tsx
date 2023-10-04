import React from 'react';
import { css } from '@emotion/react';
import { faker } from '@faker-js/faker';

import { EuiPanel, EuiText, EuiTextBlockTruncate } from '../../../../src';

export default () => {
  return (
    <EuiText>
      <EuiPanel
        css={css`
          overflow: auto;
          resize: horizontal; /* Not all browsers support resize logical properties yet */
          resize: inline;
          inline-size: 50ch;
          max-inline-size: 100%;
        `}
      >
        <EuiTextBlockTruncate lines={3}>
          {faker.lorem.lines(10)}
        </EuiTextBlockTruncate>
      </EuiPanel>
    </EuiText>
  );
};
