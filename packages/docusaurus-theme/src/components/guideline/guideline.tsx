import { PropsWithChildren, ReactNode, useMemo } from 'react';
import {
  EuiFlexItem,
  EuiSplitPanel,
  EuiPanelProps,
  useEuiMemoizedStyles,
  UseEuiTheme,
  highContrastModeStyles,
} from '@elastic/eui';
import { css } from '@emotion/react';
import { GuidelineType } from './types';
import { GuidelineText } from './guideline_text';

export interface GuidelineProps extends PropsWithChildren {
  type: GuidelineType;
  text: string | ReactNode;
  panelPadding?: EuiPanelProps['paddingSize'];
  panelStyle?: EuiPanelProps['style'];
}

const getGuidelineStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;
  return {
    root: css`
      margin-block: var(--eui-theme-content-vertical-spacing);
    `,
    wrapper: css`
      border-block-end: ${euiTheme.border.thick};
      border-start-start-radius: ${euiTheme.border.radius.medium};
      border-start-end-radius: ${euiTheme.border.radius.medium};
      overflow: hidden;

      ${highContrastModeStyles(euiThemeContext, {
        // Code block is used within a panel which already has a border - skip doubling up
        preferred: `
          & > .euiCodeBlock {
            border: none;
          }
        `,
      })}
    `,
    wrapperDo: css`
      border-color: ${euiTheme.colors.success};
    `,
    wrapperDont: css`
      border-color: ${euiTheme.colors.danger};
    `,
    textWrapper: css`
      margin-block-start: var(--eui-size-xs);
    `,
  };
};

export const Guideline = ({
  children,
  text,
  type = 'default',
  panelPadding = 'm',
  panelStyle,
}: GuidelineProps) => {
  const styles = useEuiMemoizedStyles(getGuidelineStyles);

  const panelColor = useMemo((): EuiPanelProps['color'] => {
    if (type === 'do') {
      return 'success';
    }

    if (type === 'dont') {
      return 'danger';
    }

    return 'subdued';
  }, [type]);

  const textElement = useMemo(() => {
    if (typeof text === 'string') {
      return <GuidelineText type={type}>{text}</GuidelineText>;
    }

    return text;
  }, [text]);

  const wrapperStyles = [
    styles.wrapper,
    type === 'do' && styles.wrapperDo,
    type === 'dont' && styles.wrapperDont,
  ];

  return (
    <EuiFlexItem css={styles.root} style={{ flexBasis: 300 }}>
      <EuiSplitPanel.Outer
        color="transparent"
        hasBorder={false}
        hasShadow={false}
      >
        <figure>
          <EuiSplitPanel.Inner
            css={wrapperStyles}
            color={panelColor}
            paddingSize={panelPadding}
            style={panelStyle}
          >
            {children}
          </EuiSplitPanel.Inner>
          <EuiSplitPanel.Inner paddingSize="none" css={styles.textWrapper}>
            {textElement}
          </EuiSplitPanel.Inner>
        </figure>
      </EuiSplitPanel.Outer>
    </EuiFlexItem>
  );
};
