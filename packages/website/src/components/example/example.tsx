/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import {
  PropsWithChildren,
  ReactNode,
  useMemo,
  Children,
  ReactElement,
} from 'react';
import { css } from '@emotion/react';
import {
  EuiSplitPanel,
  UseEuiTheme,
  useEuiTheme,
  useEuiMemoizedStyles,
  euiFontSize,
  highContrastModeStyles,
} from '@elastic/eui';
import { isElement } from 'react-is';

export interface ExampleProps extends PropsWithChildren {}

const getExampleStyles = (theme: UseEuiTheme) => {
  const { euiTheme } = theme;

  return {
    wrappingSplitPanel: css`
      gap: ${euiTheme.size.l};
    `,
    childrenWrapper: css`
      // Enforce a static font size for inline code within headings
      h1 code,
      h2 code,
      h3 code,
      h4 code,
      h5 code,
      h6 code {
        ${euiFontSize(theme, 'm')};
      }
    `,
  };
};

const ExampleDescription = ({ children }: PropsWithChildren) => children;

const ExampleSnippet = ({ children }: PropsWithChildren) => children;

const ExamplePreview = ({ children }: PropsWithChildren) => children;

/**
 * <Example /> utility component
 *
 * It renders code examples in a unified form. Instead of accepting data
 * as props, it expects the following child components to be used:
 *
 * - Example.Description - description of the example; may include a heading
 * - Example.Snippet - example snippet with a code block inside
 * - Example.Preview - renderable preview component
 *
 * Please note that this data flow is specifically made to help writing content
 * in MDX. It should not be used in customer-facing components.
 */
export const Example = ({ children }: ExampleProps) => {
  const styles = useEuiMemoizedStyles(getExampleStyles);
  const euiThemeContext = useEuiTheme();
  const { euiTheme } = euiThemeContext;
  const { description, snippet, preview } = useMemo(() => {
    let description: ReactNode;
    let snippet: ReactNode;
    let preview: ReactNode;
    Children.toArray(children).forEach((child) => {
      if (!isElement(child)) {
        return;
      }

      switch ((child as ReactElement).type) {
        case ExampleDescription:
          description = child;
          break;
        case ExampleSnippet:
          snippet = child;
          break;
        case ExamplePreview:
          preview = child;
          break;
      }
    });

    return { description, snippet, preview };
  }, [children]);

  return (
    <EuiSplitPanel.Outer
      color="transparent"
      direction="column"
      css={styles.wrappingSplitPanel}
    >
      <EuiSplitPanel.Inner paddingSize="none" css={styles.childrenWrapper}>
        {description}
      </EuiSplitPanel.Inner>
      <EuiSplitPanel.Inner paddingSize="none">
        <EuiSplitPanel.Outer direction="column" hasBorder hasShadow={false}>
          <EuiSplitPanel.Inner>{preview}</EuiSplitPanel.Inner>
          <EuiSplitPanel.Inner
            paddingSize="none"
            css={css`
              background: ${euiTheme.colors.lightestShade};
              border-end-start-radius: ${euiTheme.border.radius.medium};
              border-end-end-radius: ${euiTheme.border.radius.medium};
              overflow: hidden;

              ${highContrastModeStyles(euiThemeContext, {
                // Code block is used within a panel which already has a border - skip doubling up
                preferred: `
                  & > .euiCodeBlock {
                    border: none;
                  }
                `,
              })}
            `}
          >
            {snippet}
          </EuiSplitPanel.Inner>
        </EuiSplitPanel.Outer>
      </EuiSplitPanel.Inner>
    </EuiSplitPanel.Outer>
  );
};

Example.Description = ExampleDescription;
Example.Preview = ExamplePreview;
Example.Snippet = ExampleSnippet;
