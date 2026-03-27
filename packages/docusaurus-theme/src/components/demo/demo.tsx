/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import {
  Children,
  PropsWithChildren,
  useCallback,
  useMemo,
  useState,
} from 'react';
import { isElement } from 'react-is';
import { LiveProvider } from 'react-live';
import { themes as prismThemes } from 'prism-react-renderer';
import {
  useEuiMemoizedStyles,
  copyToClipboard,
  UseEuiTheme,
} from '@elastic/eui';
import { css } from '@emotion/react';
import { demoDefaultScope } from '@theme/Demo/default_scope';
import { DemoContext, DemoContextObject, useSnippetState } from './context';
import { DemoEditor } from './editor';
import { DemoPreview } from './preview';
import { DemoSource } from './source';
import { originalScope } from './scope';
import { DemoActionsBar } from './actions_bar';
import { demoCodeTransformer } from './code_transformer';
import { DemoPreviewProps } from './preview/preview';
import { DemoSnippet } from './snippet';

export interface DemoSourceMeta {
  code: string;
  isActive: boolean;
  filename?: string;
}

export type ExtraFiles = Record<string, string>;

/**
 * Function that generates a copy-paste-ready code snippet from demo state.
 */
export type SnippetFn = (state: Record<string, unknown>) => string;

export interface DemoProps extends PropsWithChildren {
  /**
   * Whether the source code editor is open by default
   */
  isSourceOpen?: boolean;
  /**
   * Allows to pass additional variables available within the demo.
   * The key is the variable name and the value is the variable itself (component, function, object, etc).
   *
   * @example
   * ````mdx
   * ```mdx-code-block
   * import { MyComponent } from './my_component';
   * ```
   *
   * <Demo scope={{ MyComponent }}>
   *   ```tsx
   *   export default () => <MyComponent />
   *   ```
   * </Demo>
   * ````
   */
  scope?: Record<string, unknown>;
  /**
   * Allows to pass extra files that will be added to the Codesandbox instance.
   * The key is the filename and the value is the serialized file content.
   *
   * @example
   * ````mdx
   * ```mdx-code-block
   * import iconSvgSource from '!raw-loader!./icon.svg';
   * ```
   *
   * <Demo extraFiles={{ 'icon.svg': iconSvgSource }} />
   * ````
   */
  extraFiles?: ExtraFiles;
  previewPadding?: DemoPreviewProps['padding'];
  previewWrapper?: DemoPreviewProps['wrapperComponent'];
  /**
   * Function that generates a simplified, copy-paste-ready code snippet.
   * Receives the current demo state (registered via useSnippetState) and returns a string.
   * When provided, shows the snippet by default with an option to view full source.
   *
   * @example
   * ````mdx
   * ```mdx-code-block
   * const snippetFn = (state) => `<EuiButton fill={${state.fill}}>Click me</EuiButton>`;
   * ```
   *
   * <Demo snippetFn={snippetFn}>
   *   ```tsx interactive
   *   // ... full demo code
   *   ```
   * </Demo>
   * ````
   */
  snippetFn?: SnippetFn;
}

const getDemoStyles = (euiTheme: UseEuiTheme) => ({
  demo: css`
    --docs-demo-border-color: ${euiTheme.euiTheme.border.color};
    --docs-demo-border-radius: ${euiTheme.euiTheme.size.s};

    border: 1px solid var(--docs-demo-border-color);
    border-radius: var(--docs-demo-border-radius);
    margin-block: ${euiTheme.euiTheme.size.xl};
    word-break: break-word;
  `,
});

export const Demo = ({
  children,
  scope,
  extraFiles,
  isSourceOpen: _isSourceOpen = false,
  previewPadding,
  previewWrapper,
  snippetFn,
}: DemoProps) => {
  const styles = useEuiMemoizedStyles(getDemoStyles);
  const [sources, setSources] = useState<DemoSourceMeta[]>([]);
  // When snippetFn is provided, default to showing snippet (source closed)
  // When no snippetFn, use the provided isSourceOpen default
  const [isSourceOpen, setIsSourceOpen] = useState<boolean>(
    snippetFn ? false : _isSourceOpen
  );
  const activeSource = sources[0] || null;

  // State registered by demo components via useSnippetState
  const [snippetState, setSnippetState] = useState<Record<string, unknown>>({});

  // liveProviderKey restarts the demo to its initial state
  const [liveProviderKey, setLiveProviderKey] = useState<number>(0);

  // Generate snippet from current state
  const snippet = useMemo(() => {
    if (!snippetFn) return null;
    return snippetFn(snippetState);
  }, [snippetFn, snippetState]);

  const finalScope = useMemo(
    () => ({
      ...originalScope,
      ...demoDefaultScope,
      ...scope,
      useSnippetState,
    }),
    [scope]
  );

  const addSource = useCallback<DemoContextObject['addSource']>(
    (source: DemoSourceMeta) => {
      setSources((sources) => [...sources, source]);
    },
    []
  );

  const onClickCopyToClipboard = useCallback(() => {
    // Copy snippet if available and not viewing full source, otherwise copy full source
    const codeToCopy = snippet && !isSourceOpen ? snippet : activeSource?.code || '';
    copyToClipboard(codeToCopy);
  }, [activeSource, snippet, isSourceOpen]);

  const onClickReloadExample = useCallback(() => {
    setLiveProviderKey((liveProviderKey) => liveProviderKey + 1);
  }, []);

  // Determine if we're showing snippet view (snippet available and source not open)
  const showSnippet = Boolean(snippet && !isSourceOpen);

  return (
    <div css={styles.demo}>
      <DemoContext.Provider value={{ sources, addSource, snippetState, setSnippetState }}>
        <LiveProvider
          key={liveProviderKey}
          code={activeSource?.code || ''}
          transformCode={demoCodeTransformer}
          theme={prismThemes.dracula}
          scope={finalScope}
        >
          <DemoPreview
            padding={previewPadding}
            wrapperComponent={previewWrapper}
          />
          <DemoActionsBar
            isSourceOpen={isSourceOpen}
            setSourceOpen={setIsSourceOpen}
            activeSource={activeSource}
            extraFiles={extraFiles}
            sources={sources}
            onClickCopyToClipboard={onClickCopyToClipboard}
            onClickReloadExample={onClickReloadExample}
            hasSnippet={Boolean(snippet)}
          />
          {showSnippet && <DemoSnippet snippet={snippet!} />}
          {isSourceOpen && <DemoEditor />}
        </LiveProvider>

        {Children.map(children, (child, index) => {
          if (isElement(child) && child.type === DemoSource) {
            return child;
          }

          return <DemoSource isActive={index === 0}>{child}</DemoSource>;
        })}
      </DemoContext.Provider>
    </div>
  );
};
