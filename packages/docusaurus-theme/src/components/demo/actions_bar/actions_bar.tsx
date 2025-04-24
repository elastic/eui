/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import {
  EuiButton,
  EuiButtonIcon,
  EuiFlexGroup,
  EuiToolTip,
  useEuiMemoizedStyles,
  UseEuiTheme,
  darken,
} from '@elastic/eui';
import { css } from '@emotion/react';
import { extraActions } from '@theme/Demo/actions';
import { DemoSourceMeta } from '../demo';

export interface DemoActionsBarProps {
  activeSource: DemoSourceMeta | null;
  sources: DemoSourceMeta[];
  isSourceOpen: boolean;
  setSourceOpen(isOpen: boolean): void;
  onClickReloadExample(): void;
  onClickCopyToClipboard(): void;
}

const getDemoActionsBarStyles = (euiTheme: UseEuiTheme) => {
  return {
    actionsBar: css`
      padding: var(--eui-size-s);
      background: ${darken(euiTheme.euiTheme.colors.body, 0.05)};
      border-top: 1px solid var(--docs-demo-border-color);

      &:last-child {
        // border radius should be 1px smaller to work nicely
        // with the wrapper border width of 1px
        border-radius: 0 0 calc(var(--docs-demo-border-radius) - 1px)
          calc(var(--docs-demo-border-radius) - 1px);
      }
    `,
    button: css`
      margin-right: auto;
    `,
  };
};

export const DemoActionsBar = ({
  isSourceOpen,
  setSourceOpen,
  activeSource,
  sources,
  onClickReloadExample,
  onClickCopyToClipboard,
}: DemoActionsBarProps) => {
  const styles = useEuiMemoizedStyles(getDemoActionsBarStyles);

  return (
    <EuiFlexGroup alignItems="center" css={styles.actionsBar} gutterSize="s">
      <EuiButton
        css={styles.button}
        onClick={() => setSourceOpen(!isSourceOpen)}
        size="s"
        color="text"
        minWidth={false}
      >
        {isSourceOpen ? 'Hide source' : 'Show source'}
      </EuiButton>
      {extraActions.map((ActionComponent) => (
        <ActionComponent sources={sources} activeSource={activeSource} />
      ))}
      <EuiToolTip content="Copy to clipboard">
        <EuiButtonIcon
          size="s"
          iconType="copyClipboard"
          color="text"
          onClick={onClickCopyToClipboard}
          aria-label="Copy code to clipboard"
        />
      </EuiToolTip>
      <EuiToolTip content="Reload example">
        <EuiButtonIcon
          size="s"
          iconType="refresh"
          color="text"
          onClick={onClickReloadExample}
          aria-label="Reload example"
        />
      </EuiToolTip>
    </EuiFlexGroup>
  );
};
