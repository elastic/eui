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
import { DemoContext, DemoContextObject } from './context';
import { DemoEditor } from './editor';
import { DemoPreview } from './preview';
import { DemoSource } from './source';
import { demoDefaultScope } from './scope';
import { DemoActionsBar } from './actions_bar';
import { demoCodeTransformer } from './code_transformer';

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
  isSourceOpen: _isSourceOpen = true
}: DemoProps) => {
  const styles = useEuiMemoizedStyles(getDemoStyles);
  const [sources, setSources] = useState<DemoSourceMeta[]>([]);
  const [isSourceOpen, setIsSourceOpen] = useState<boolean>(_isSourceOpen);
  const activeSource = sources[0];

  // liveProviderKey restarts the demo to its initial state
  const [liveProviderKey, setLiveProviderKey] = useState<number>(0);

  const finalScope = useMemo(() => ({
    ...demoDefaultScope,
    ...scope,
  }), [scope]);

  const addSource = useCallback<DemoContextObject['addSource']>(
    (source: DemoSourceMeta) => {
      setSources((sources) => ([...sources, source]));
    },
    [],
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
          <DemoPreview />
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
