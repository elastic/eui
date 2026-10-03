/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { useContext, type CSSProperties, type JSX } from 'react';
import { css } from '@emotion/react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useThemeConfig, type NavbarLogo } from '@docusaurus/theme-common';
import type { Props } from '@theme-original/Logo';
import {
  EuiImage,
  euiCanAnimate,
  euiTextTruncate,
  useEuiMemoizedStyles,
  UseEuiTheme,
} from '@elastic/eui';

import { AppThemeContext } from '../../components/theme_context';

const EUI_LOGO = 'eui_logo.svg';
const LOGO_DISTANCE = '5px';

const getStyles = ({ euiTheme }: UseEuiTheme) => ({
  wrapper: css`
    // create space to prevent focus outline from being cut off
    padding: ${euiTheme.size.xs};
    min-inline-size: 0;

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
      overflow: visible;
      height: auto;
    }

    .navbar__title {
      ${euiTextTruncate()}
    }
  `,
  imageWrapper: css`
    overflow: visible;
    margin-inline-end: ${euiTheme.size.m};
  `,
  image: css`
    position: relative;
    display: block;
    block-size: ${euiTheme.size.l};
    inline-size: ${euiTheme.size.l};
    margin: 0;
  `,
  logo: css`
    display: block;
    overflow: visible;
    block-size: ${euiTheme.size.l};
    inline-size: ${euiTheme.size.l};
    margin: 0;
    // Firefox clips transformed SVG descendants to the viewport even
    // with overflow: visible. Expand the clip so pieces can travel 5px.
    @supports (-moz-appearance: none) {
      clip-path: inset(-8px);
    }

    .euiNavbarLogo__piece {
      transform: translate(0, 0);

      ${euiCanAnimate} {
        transition: transform 0.35s cubic-bezier(0.34, 1.4, 0.64, 1);
      }
    }

    ${euiCanAnimate} {
      &:hover {
        .euiNavbarLogo__pink {
          transform: translate(-${LOGO_DISTANCE}, -${LOGO_DISTANCE});
        }

        .euiNavbarLogo__yellow {
          transform: translate(${LOGO_DISTANCE}, ${LOGO_DISTANCE});
        }

        .euiNavbarLogo__teal {
          transform: translate(${LOGO_DISTANCE}, -${LOGO_DISTANCE});
        }

        .euiNavbarLogo__blue {
          transform: translate(-${LOGO_DISTANCE}, ${LOGO_DISTANCE});
        }
      }
    }
  `,
});

function EuiNavbarLogo({
  alt,
  className,
  style,
}: {
  alt: string;
  className?: string;
  style?: CSSProperties;
}) {
  const styles = useEuiMemoizedStyles(getStyles);
  const isDecorative = alt === '';

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      fill="none"
      overflow="visible"
      className={className}
      style={style}
      css={styles.logo}
      aria-hidden={isDecorative ? true : undefined}
      role={isDecorative ? undefined : 'img'}
      aria-label={isDecorative ? undefined : alt}
    >
      <path
        fill="#FF957D"
        d="M18 25c-.5-5.5-5.5-10.5-11-11l7-7c.5 5.5 5.5 10.5 11 11l-7 7z"
      />
      <circle
        className="euiNavbarLogo__piece euiNavbarLogo__pink"
        cx="7"
        cy="7"
        r="7"
        fill="#F04E98"
      />
      <circle
        className="euiNavbarLogo__piece euiNavbarLogo__yellow"
        cx="25"
        cy="25"
        r="7"
        fill="#FEC514"
      />
      <path
        className="euiNavbarLogo__piece euiNavbarLogo__teal"
        fill="#00BFB3"
        d="M31 14c-7.18 0-13-5.82-13-13h13v13z"
      />
      <path
        className="euiNavbarLogo__piece euiNavbarLogo__blue"
        fill="#1BA9F5"
        d="M1 18c7.18 0 13 5.82 13 13H1V18z"
      />
    </svg>
  );
}

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
  const isEuiLogo = logo.src.includes(EUI_LOGO);

  const src = isDarkMode
    ? useBaseUrl(logo.srcDark || logo.src)
    : useBaseUrl(logo.src);

  const themedImage = isEuiLogo ? (
    <EuiNavbarLogo alt={alt} className={logo.className} style={logo.style} />
  ) : (
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
