import React, { useContext } from 'react';
import { css } from '@emotion/react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {
  useColorMode,
  useThemeConfig,
  type NavbarLogo,
} from '@docusaurus/theme-common';
import type { Props } from '@theme-original/Logo';
import {
  EuiImage,
  euiTextTruncate,
  useEuiMemoizedStyles,
  UseEuiTheme,
} from '@elastic/eui';
import { AppThemeContext } from '../../components/theme_context';

const getStyles = ({ euiTheme }: UseEuiTheme) => ({
  wrapper: css`
    ${euiTextTruncate()}
    // create space to prevent focus outline from being cut off
    padding: ${euiTheme.size.xs};

    @media (min-width: 997px) {
      border-right: ${euiTheme.border.thin};
    }

    .navbar__brand {
      display: flex;
      align-items: center;

      margin-inline-end: ${euiTheme.size.m};

      @media (min-width: 997px) {
        margin-inline-end: ${euiTheme.size.l};
      }
    }

    .navbar__logo {
      height: 100%;
    }
  `,
  imageWrapper: css`
    margin-inline-end: ${euiTheme.size.m};
  `,
  image: css`
    position: relative;
    block-size: ${euiTheme.size.l};
    inline-size: ${euiTheme.size.l};
    margin: 0;
  `,
});

function LogoThemedImage({
  logo,
  alt,
  imageClassName,
}: {
  logo: NavbarLogo;
  alt: string;
  imageClassName?: string;
}) {
  const { colorMode } = useContext(AppThemeContext);
  const isDarkMode = colorMode === 'dark';

  const styles = useEuiMemoizedStyles(getStyles);

  const src = isDarkMode
    ? useBaseUrl(logo.srcDark || logo.src)
    : useBaseUrl(logo.src);

  const themedImage = (
    <EuiImage
      src={src}
      size="fullWidth"
      alt={alt}
      className={logo.className}
      wrapperProps={{
        style: logo.style,
        css: styles.image,
      }}
    />
  );

  // Is this extra div really necessary?
  // introduced in https://github.com/facebook/docusaurus/pull/5666
  return imageClassName ? (
    <div className={imageClassName} css={styles.imageWrapper}>
      {themedImage}
    </div>
  ) : (
    themedImage
  );
}

export default function Logo(props: Props): JSX.Element {
  const {
    siteConfig: { title },
  } = useDocusaurusContext();
  const {
    navbar: { title: navbarTitle, logo },
  } = useThemeConfig();

  const { imageClassName, titleClassName, ...propsRest } = props;
  const logoLink = useBaseUrl(logo?.href || '/');

  const styles = useEuiMemoizedStyles(getStyles);

  // If visible title is shown, fallback alt text should be
  // an empty string to mark the logo as decorative.
  const fallbackAlt = navbarTitle ? '' : title;

  // Use logo alt text if provided (including empty string),
  // and provide a sensible fallback otherwise.
  const alt = logo?.alt ?? fallbackAlt;

  return (
    <div css={styles.wrapper}>
      <Link
        to={logoLink}
        {...propsRest}
        {...(logo?.target && { target: logo.target })}
      >
        {logo && (
          <LogoThemedImage
            logo={logo}
            alt={alt}
            imageClassName={imageClassName}
          />
        )}
        {navbarTitle != null && <b className={titleClassName}>{navbarTitle}</b>}
      </Link>
    </div>
  );
}
