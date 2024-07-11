import {
  euiBackgroundColor,
  EuiButton,
  EuiButtonIcon,
  EuiFlexGroup,
  EuiToolTip,
  useEuiMemoizedStyles,
  euiBorderColor,
  UseEuiTheme,
  darken,
} from '@elastic/eui';
import { css } from '@emotion/react';
import { CodeSandboxIcon } from '../../codesandbox_icon';

export interface DemoActionsBarProps {
  isSourceOpen: boolean;
  setSourceOpen(isOpen: boolean): void;
  onClickReloadExample(): void;
  onClickCopyToClipboard(): void;
  onClickOpenInCodeSandbox(): void;
}

const getDemoActionsBarStyles = (euiTheme: UseEuiTheme) => {
  return {
    actionsBar: css`
      padding: ${euiTheme.euiTheme.size.s};
      background: ${darken(euiTheme.euiTheme.colors.body, 0.05)};
      border-top: 1px solid var(--docs-demo-border-color);

      &:last-child {
        // border radius should be 1px smaller to work nicely
        // with the wrapper border width of 1px
        border-radius: 0 0 calc(var(--docs-demo-border-radius) - 1px) calc(var(--docs-demo-border-radius) - 1px);
      }
    `,
    button: css`
      background: ${euiBackgroundColor(euiTheme, 'primary', { method: 'opaque' })};
      border: 1px solid ${euiBorderColor(euiTheme, 'primary')};
      margin-right: auto;
    `,
  };
}

export const DemoActionsBar = ({
  isSourceOpen,
  setSourceOpen,
  onClickOpenInCodeSandbox,
  onClickReloadExample,
  onClickCopyToClipboard
}: DemoActionsBarProps) => {
  const styles = useEuiMemoizedStyles(getDemoActionsBarStyles);

  return (
    <EuiFlexGroup alignItems="center" css={styles.actionsBar} gutterSize="s">
      <EuiButton
        css={styles.button}
        onClick={() => setSourceOpen(!isSourceOpen)}
        size="s"
        minWidth={false}
      >
        {isSourceOpen ? 'Hide source' : 'Show source'}
      </EuiButton>
      <EuiToolTip content="Open in CodeSandbox">
        <EuiButtonIcon
          size="s"
          iconType={CodeSandboxIcon}
          color="text"
          aria-label="Open in CodeSandbox"
          onClick={onClickOpenInCodeSandbox}
        />
      </EuiToolTip>
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
