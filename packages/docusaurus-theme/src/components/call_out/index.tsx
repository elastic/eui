import { css } from '@emotion/react';
import { EuiText, useEuiMemoizedStyles, UseEuiTheme } from '@elastic/eui';
import { FunctionComponent, PropsWithChildren } from 'react';

type VARIANTS = 'info' | 'tip' | 'note' | 'danger' | 'warning';
type TEXT_COLORS = 'primaryText' | 'successText' | 'dangerText' | 'warningText';

const VARIANT_TO_COLOR_MAP: Record<
  VARIANTS,
  { backgroundVariable: string; colorKey: TEXT_COLORS }
> = {
  info: {
    backgroundVariable: 'var(--eui-background-color-primary)',
    colorKey: 'primaryText',
  },
  note: {
    backgroundVariable: 'var(--eui-background-color-primary)',
    colorKey: 'primaryText',
  },
  tip: {
    backgroundVariable: 'var(--eui-background-color-success)',
    colorKey: 'successText',
  },
  danger: {
    backgroundVariable: 'var(--eui-background-color-danger)',
    colorKey: 'dangerText',
  },
  warning: {
    backgroundVariable: 'var(--eui-background-color-warning)',
    colorKey: 'warningText',
  },
};

const getStyles = ({ euiTheme }: UseEuiTheme, variant: VARIANTS) => {
  const colorKey = VARIANT_TO_COLOR_MAP[variant].colorKey;
  const color = euiTheme.colors[colorKey];

  return {
    note: css`
      &:not(:last-of-type) {
        margin-block-end: ${euiTheme.size.m};
      }

      .alert {
        --ifm-alert-background-color: ${VARIANT_TO_COLOR_MAP[variant]
          .backgroundVariable};
        --ifm-alert-foreground-color: ${euiTheme.colors.text};
        --ifm-alert-padding-horizontal: ${euiTheme.size.base};
        --ifm-alert-padding-vertical: ${euiTheme.size.base};
        --ifm-alert-border-width: ${euiTheme.border.width.thin};
        --ifm-alert-border-left-width: ${euiTheme.border.width.thin};
        --ifm-alert-border-color: ${color};

        [class^='admonitionHeading'] {
          --ifm-alert-foreground-color: ${color};

          color: var(--ifm-alert-foreground-color);
        }
      }
    `,
  };
};

type CallOutProps = PropsWithChildren & {
  variant: VARIANTS;
};

export const CallOut: FunctionComponent<CallOutProps> = ({
  children,
  variant,
}) => {
  const styles = useEuiMemoizedStyles((euiTheme) =>
    getStyles(euiTheme, variant)
  );

  return (
    <EuiText size="s" css={styles.note}>
      {children}
    </EuiText>
  );
};
