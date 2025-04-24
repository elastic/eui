import React from 'react';
import { css } from '@emotion/react';
import Heading from '@theme/Heading';
import {
  CommonProps,
  EuiCard,
  EuiIcon,
  IconType,
  mathWithUnits,
  useEuiMemoizedStyles,
  UseEuiTheme,
} from '@elastic/eui';

import { HomepageContainer, HomepageSection } from '../layout';

const CONTENT_DATA = {
  developer: [
    {
      title: 'Getting started',
      description: 'Install framework and make initial adjustments',
      href: './docs/getting-started/setup/',
      icon: 'keyboard',
    },
    {
      title: 'Contributing',
      description: 'Help EUI improve even faster',
      href: 'https://github.com/elastic/eui/tree/main/wiki/contributing-to-eui',
      icon: 'plusInCircle',
      target: '_blank',
    },
    {
      title: 'Tokens',
      description: 'Speed up your work by using and customizing tokens',
      href: './docs/getting-started/theming/tokens/colors/',
      icon: 'brush',
    },
  ],
  designer: [
    {
      title: 'Patterns',
      description: 'Preferred solutions to specific user needs',
      href: './docs/patterns/',
      icon: 'logPatternAnalysis',
    },
    {
      title: 'Content',
      description: 'Write thoughtful and consistent in-product copy',
      href: './docs/content/',
      icon: 'pencil',
    },
    {
      title: 'Icons',
      description: 'A wide variety of icons to enhance your designs',
      href: './docs/components/display/icons/',
      icon: 'package',
    },
  ],
};

const getStyles = ({ euiTheme }: UseEuiTheme) => {
  const iconSize = mathWithUnits(
    [euiTheme.size.xxxl, euiTheme.size.s],
    (x, y) => x + y
  );
  const iconOffset = mathWithUnits(
    [iconSize, euiTheme.size.base],
    (x, y) => x + y
  );

  return {
    column: css`
      flex: 0 1 50%;
    `,
    list: css`
      margin: ${euiTheme.size.l} 0 0;
      padding: 0;
      list-style: none;
    `,
    listItem: css`
      & + & {
        margin-block-start: ${euiTheme.size.base};
      }
    `,
    card: css`
      &:hover [data-icon-variant='regular'] {
        background-color: var(--eui-background-color-success);
        color: ${euiTheme.colors.textSuccess};
      }

      &:hover [data-icon-variant='alternative'] {
        background-color: var(--eui-background-color-accent);
        color: ${euiTheme.colors.textAccent};
      }

      .euiCard__content {
        position: relative;
        min-block-size: ${iconSize};

        > * {
          inline-size: calc(100% - ${iconOffset});
          margin-inline-start: ${iconOffset};
        }

        > :last-child {
          margin-block-start: ${euiTheme.size.xs};
        }
      }

      .euiCard__title {
        margin-block: 0;
        font-size: var(--eui-font-size-m);
        line-height: var(--eui-line-height-xxl);
        text-align: left;

        > a {
          color: inherit;
          line-height: inherit;
        }
      }
    `,
    decor: css`
      position: absolute;
      top: 0;
      left: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      block-size: ${iconSize};
      inline-size: ${iconSize};
    `,
    icon: css`
      background-color: ${euiTheme.colors.lightestShade};
      color: ${euiTheme.colors.textSubdued};
    `,
    text: css`
      font-size: var(--eui-font-size-m);
      line-height: var(--eui-line-height-l);
      text-align: left;
    `,
  };
};

const Icon = ({
  type,
  variant = 'regular',
  ...rest
}: { type: IconType; variant?: 'regular' | 'alternative' } & CommonProps) => {
  const styles = useEuiMemoizedStyles(getStyles);

  return (
    <span
      css={styles.icon}
      data-icon-variant={variant}
      aria-hidden="true"
      {...rest}
    >
      <EuiIcon type={type} size="l" />
    </span>
  );
};

export const HomepageUsers = () => {
  const styles = useEuiMemoizedStyles(getStyles);
  const { developer, designer } = CONTENT_DATA;

  return (
    <HomepageSection>
      <HomepageContainer>
        <div css={styles.column}>
          <Heading as="h2">Developers</Heading>
          <ul css={styles.list}>
            {developer &&
              developer.map((dev) => (
                <li key={dev.title} css={styles.listItem}>
                  <EuiCard
                    title={dev.title}
                    href={dev.href}
                    hasBorder
                    css={styles.card}
                  >
                    <Icon type={dev.icon} css={styles.decor} />
                    <div css={styles.text}>{dev.description}</div>
                  </EuiCard>
                </li>
              ))}
          </ul>
        </div>

        <div css={styles.column}>
          <Heading as="h2">Designers</Heading>
          <ul css={styles.list}>
            {designer &&
              designer.map((des) => (
                <li key={des.title} css={styles.listItem}>
                  <EuiCard
                    title={des.title}
                    href={des.href}
                    hasBorder
                    css={styles.card}
                  >
                    <Icon
                      type={des.icon}
                      css={styles.decor}
                      variant="alternative"
                    />
                    <div css={styles.text}>{des.description}</div>
                  </EuiCard>
                </li>
              ))}
          </ul>
        </div>
      </HomepageContainer>
    </HomepageSection>
  );
};
