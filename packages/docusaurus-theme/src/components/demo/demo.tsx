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
import { DemoContext, DemoContextObject } from './context';
import { DemoEditor } from './editor';
import { DemoPreview } from './preview';
import { DemoSource } from './source';
import { originalScope } from './scope';
import { DemoActionsBar } from './actions_bar';
import { demoCodeTransformer } from './code_transformer';
import { DemoPreviewProps } from './preview/preview';

export interface DemoSourceMeta {
  code: string;
  isActive: boolean;
  filename?: string;
}

export interface DemoProps extends PropsWithChildren {
  /**
   * Whether the source code editor is open by default
   */
  isSourceOpen?: boolean;
  /**
   * Allows to extend the default scope of the rendered demo and pass additional
   * properties available within the demo.
   *
   * The default scope exposes all React and EUI exports.
   */
  scope?: Record<string, unknown>;
  previewPadding?: DemoPreviewProps['padding'];
  previewWrapper?: DemoPreviewProps['wrapperComponent'];
}

const getDemoStyles = (euiTheme: UseEuiTheme) => ({
  demo: css`
    --docs-demo-border-color: ${euiTheme.euiTheme.colors.lightShade};
    --docs-demo-border-radius: ${euiTheme.euiTheme.size.s};

    border: 1px solid var(--docs-demo-border-color);
    border-radius: var(--docs-demo-border-radius);
    margin-block: ${euiTheme.euiTheme.size.xl};
  `,
});

export const Demo = ({
  children,
  scope,
  isSourceOpen: _isSourceOpen = false,
  previewPadding,
  previewWrapper,
}: DemoProps) => {
  const styles = useEuiMemoizedStyles(getDemoStyles);
  const [sources, setSources] = useState<DemoSourceMeta[]>([]);
  const [isSourceOpen, setIsSourceOpen] = useState<boolean>(_isSourceOpen);
  const activeSource = sources[0] || null;

  // liveProviderKey restarts the demo to its initial state
  const [liveProviderKey, setLiveProviderKey] = useState<number>(0);

  const finalScope = useMemo(
    () => ({
      ...originalScope,
      ...demoDefaultScope,
      ...scope,
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
    copyToClipboard(activeSource?.code || '');
  }, [activeSource]);

  const onClickReloadExample = useCallback(() => {
    setLiveProviderKey((liveProviderKey) => liveProviderKey + 1);
  }, []);

  const onClickOpenInCodeSandbox = useCallback(() => {
    // TODO: implement
    console.error('Open in CodeSandbox action is not implemented yet');
  }, []);

  return (
    <div css={styles.demo}>
      <DemoContext.Provider value={{ sources, addSource }}>
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
            onClickCopyToClipboard={onClickCopyToClipboard}
            onClickReloadExample={onClickReloadExample}
            onClickOpenInCodeSandbox={onClickOpenInCodeSandbox}
          />
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
