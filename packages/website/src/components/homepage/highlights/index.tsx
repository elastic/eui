import Heading from '@theme/Heading';
import {
  EuiButtonEmpty,
  EuiCard,
  EuiIcon,
  EuiImage,
  EuiText,
  EuiTextAlign,
  useEuiMemoizedStyles,
  UseEuiTheme,
  useGeneratedHtmlId,
} from '@elastic/eui';
import { HomepageContainer, HomepageSection } from '../layout';
import { css } from '@emotion/react';
import { useContext } from 'react';
import { AppThemeContext } from '@elastic/eui-docusaurus-theme/lib/components/theme_context/index.js';

import SvgFlex from './svg/flex.svg';
import SvgSpacer from './svg/spacer.svg';
import SvgText from './svg/text.svg';
import SvgTitle from './svg/title.svg';
import SvgForm from './svg/form.svg';
import SvgButton from './svg/button.svg';
import SvgLink from './svg/link.svg';
import SvgTooltip from './svg/tooltip.svg';
import SvgPanel from './svg/panel.svg';
import SvgCallout from './svg/callout.svg';
import SvgCard from './svg/card.svg';
import SvgTable from './svg/table.svg';

const CONTENT_DATA = [
  {
    title: 'Flexible layout',
    href: '/docs/layout/flex',
    svg: SvgFlex,
    description:
      'Flex groups, grids, panels and items to build responsive page layout',
  },
  {
    title: 'Spacer',
    href: '/docs/layout/spacer/',
    svg: SvgSpacer,
    description:
      'Component with strictly defined height to organise content blocks',
  },
  {
    title: 'Text',
    href: '/docs/display/text',
    svg: SvgText,
    description:
      'Simple HTML text like paragraphs or lists, wrapped in a single component',
  },
  {
    title: 'Title',
    href: '/docs/display/title',
    svg: SvgTitle,
    description:
      'Component for styling the page, section, and content headings',
  },
  {
    title: 'Forms',
    href: '/docs/components/form-controls',
    svg: SvgForm,
    description: 'Inputs with validation, grouped into a flexible form layout',
  },
  {
    title: 'Button',
    href: '/docs/navigation/button',
    svg: SvgButton,
    description:
      'Variety of buttons and button groups with different styles and colours',
  },
  {
    title: 'Link',
    href: '/docs/navigation/link',
    svg: SvgLink,
    description: 'Component designed to display nicely within a block of text',
  },
  {
    title: 'Tooltip',
    href: '/docs/display/tooltip',
    svg: SvgTooltip,
    description:
      'Contextual information hint with flexible positioning and behavior',
  },
  {
    title: 'Panel',
    href: '/docs/layout/panel',
    svg: SvgPanel,
    description: 'Layout helper, commonly used as a base for other components',
  },
  {
    title: 'Callout',
    href: '/docs/display/callout',
    svg: SvgCallout,
    description: 'Important message directly related to content on the page',
  },
  {
    title: 'Card',
    href: '/docs/display/card',
    svg: SvgCard,
    description:
      'Vertical or horizontal cards, containing any custom components needed',
  },
  {
    title: 'Table',
    href: '/docs/components/table',
    svg: SvgTable,
    description:
      'Flexible tables with sorting, pagination, selection and actions',
  },
];

const getStyles = ({ euiTheme, colorMode }: UseEuiTheme) => ({
  section: css`
    --svg-fill-white: ${euiTheme.colors.ghost};
    --svg-fill-background: ${euiTheme.colors.body};
    --svg-fill-lightestShade: ${euiTheme.colors.lightestShade};
    --svg-fill-lightShade: ${euiTheme.colors.lightShade};
    --svg-fill-mediumShade: ${euiTheme.colors.mediumShade};
    --svg-fill-darkShade: ${euiTheme.colors.darkShade};

    --svg-fill-primary: ${colorMode === 'DARK' ? '#1190D5' : '#7BB8FF'};
    --svg-fill-primary-background: ${colorMode === 'DARK'
      ? '#0B4D75'
      : '#DCEDFF'};
    --svg-fill-primary-text: ${colorMode === 'DARK' ? '#6DC2FF' : '#0077CC'};
    --svg-fill-primary-decor: ${colorMode === 'DARK' ? '#076DA3' : '#B3D7FE'};

    --svg-fill-accent: ${colorMode === 'DARK' ? '#E75498' : '#D64D8C'};
    --svg-fill-accent-background: var(--eui-background-color-accent);
    --svg-fill-accent-text: ${colorMode === 'DARK' ? '#F68FBE' : '#DD0A73'};
    --svg-fill-accent-decor: ${colorMode === 'DARK' ? '#9E245F' : '#fcbbd9'};

    --svg-fill-teal: ${colorMode === 'DARK' ? '#37d0b6' : '#00BFB3'};
    --svg-fill-teal-background: ${colorMode === 'DARK' ? '#0B5046' : '#E6FAF7'};
    --svg-fill-teal-text: ${colorMode === 'DARK' ? '#00E1BC' : '#00857F'};
    --svg-fill-teal-decor: ${colorMode === 'DARK' ? '#1F857C' : '#9FECDF'};

    --svg-fill-warning: ${colorMode === 'DARK' ? '#E6A927' : '#F37A66'};
    --svg-fill-warning-background: var(--eui-background-color-warning);
    --svg-fill-warning-text: ${colorMode === 'DARK' ? '#FEC514' : '#E2543D'};
    --svg-fill-warning-decor: ${colorMode === 'DARK' ? '#925700' : '#FFCEA8'};

    background-color: ${euiTheme.colors.lightestShade};
  `,
  list: css`
    display: grid;
    grid-template-columns: 1fr;
    grid-auto-flow: row;
    gap: ${euiTheme.size.base};
    margin: 0;
    padding: 0;
    list-style: none;

    @media (min-width: 450px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (min-width: 997px) {
      grid-template-columns: repeat(4, 1fr);
    }
  `,
  card: css`
    background-color: transparent;
    border: none;

    &:hover {
      box-shadow: none;

      a {
        color: ${euiTheme.colors.link};
      }
    }

    .euiCard__content {
      text-align: left;
    }

    .euiCard__title {
      margin: 0;
      font-size: var(--eui-font-size-m);

      & + * {
        margin-block-start: ${euiTheme.size.xs};
      }
    }

    .euiCard__title,
    .euiText {
      line-height: var(--eui-line-height-l);
    }

    .euiText p {
      margin: 0;
    }
  `,
  image: css`
    display: flex;
    justify-content: center;
    align-items: center;
    border: ${euiTheme.border.thin};
    border-radius: ${euiTheme.border.radius.medium};
    background-color: ${euiTheme.colors.body};

    svg {
      width: 100%;
    }
  `,
  actions: css`
    display: flex;
    justify-content: center;
    inline-size: 100%;
    margin-block-start: ${euiTheme.size.xxl};
  `,
  button: css`
    min-inline-size: 12.5rem;
    border: ${euiTheme.border.width.thin} solid ${euiTheme.colors.primary};
  `,
  icon: css`
    margin-inline-start: ${euiTheme.size.s};
  `,
});

export const HomepageHighlights = () => {
  const { theme } = useContext(AppThemeContext);
  const styles = useEuiMemoizedStyles(getStyles);
  const isDarkMode = theme === 'dark';

  const headingId = useGeneratedHtmlId();

  return (
    <HomepageSection css={styles.section}>
      <HomepageContainer layout="column">
        <EuiTextAlign textAlign="center">
          <Heading as="h2" id={headingId}>
            Widely used in EUI
          </Heading>
        </EuiTextAlign>

        <ul aria-labelledby={headingId} css={styles.list}>
          {CONTENT_DATA &&
            CONTENT_DATA.map((item) => {
              const SvgComponent = item.svg;

              return (
                <li key={item.title}>
                  <EuiCard
                    title={item.title}
                    href={item.href}
                    image={
                      SvgComponent && (
                        <div css={styles.image} aria-hidden="true">
                          <SvgComponent />
                        </div>
                      )
                    }
                    paddingSize="s"
                    hasBorder
                    css={styles.card}
                  >
                    <EuiText>
                      <p>{item.description}</p>
                    </EuiText>
                  </EuiCard>
                </li>
              );
            })}
        </ul>

        <div css={styles.actions}>
          <EuiButtonEmpty href="/docs/components/" css={styles.button}>
            All components
            <EuiIcon type="sortRight" size="s" css={styles.icon} />
          </EuiButtonEmpty>
        </div>
      </HomepageContainer>
    </HomepageSection>
  );
};
