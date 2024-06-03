/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { ThemeProvider } from '@emotion/react';
import { render } from '../../test/rtl';

import { EuiTextColor } from '../../components/text';
import { EuiEmotionThemeProvider } from './emotion';

describe('EuiEmotionThemeProvider', () => {
  it("allows consumers to use Emotion's theme context by default", () => {
    const { container, getByTestSubject } = render(
      <EuiEmotionThemeProvider>
        <div
          css={({ euiTheme }) => ({ color: euiTheme.colors.primary })}
          data-test-subj="consumer"
        >
          hello world
        </div>
      </EuiEmotionThemeProvider>
    );

    expect(getByTestSubject('consumer')).toHaveStyleRule('color', '#07C');

    expect(container.firstChild).toMatchInlineSnapshot(`
      <div
        class="css-cs4x42"
        data-test-subj="consumer"
      >
        hello world
      </div>
    `);
  });

  it("allows consumers to override EUI's ThemeProvider with their own theme", () => {
    const customTheme = {
      brandColor: 'pink',
    };

    const { container, getByTestSubject } = render(
      <EuiEmotionThemeProvider>
        {/* @ts-ignore - consumers would set their own emotion.d.ts */}
        <ThemeProvider theme={customTheme}>
          <div
            css={(theme: any) => ({ color: theme.brandColor })}
            data-test-subj="consumer"
          >
            hello
          </div>
          {/* Custom Emotion themes should not break EUI's own Emotion styles */}
          <EuiTextColor color="accent" data-test-subj="eui">
            world
          </EuiTextColor>
        </ThemeProvider>
      </EuiEmotionThemeProvider>
    );

    expect(getByTestSubject('consumer')).toHaveStyleRule('color', 'pink');
    expect(getByTestSubject('eui')).toHaveStyleRule('color', '#ba3d76');

    expect(container).toMatchInlineSnapshot(`
      <div>
        <div
          class="css-18ry2co"
          data-test-subj="consumer"
        >
          hello
        </div>
        <span
          class="emotion-euiTextColor-accent"
          data-test-subj="eui"
        >
          world
        </span>
      </div>
    `);
  });
});
