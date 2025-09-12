/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { FunctionComponent, JSX } from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import isInternalUrl from '@docusaurus/isInternalUrl';
import { isRegexpStringMatch } from '@docusaurus/theme-common';
import IconExternalLink from '@theme-original/Icon/ExternalLink';
import type { Props as NavbarNavLinkProps } from '@theme-original/NavbarItem/NavbarNavLink';
import { IconType } from '@elastic/eui';

import { NavbarItem } from '../../components/navbar_item';

const CUSTOM_LINK_COMPONENT_MAP: Record<
  string,
  { component: FunctionComponent<any>; icon: IconType }
> = {
  github: {
    component: NavbarItem,
    icon: () => (
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="currentColor"
          d="M8 0C3.58203 0 0 3.67167 0 8.2002C0 11.8238 2.292 14.8969 5.47119 15.981C5.87109 16.0561 6.01709 15.8028 6.01709 15.5866C6.01709 15.3914 6.00977 14.7447 6.00586 14.0601C3.78125 14.5555 3.31103 13.0931 3.31103 13.0931C2.94678 12.1461 2.42284 11.8939 2.42284 11.8939C1.6958 11.3854 2.478 11.3954 2.478 11.3954C3.28122 11.4524 3.70409 12.2402 3.70409 12.2402C4.41797 13.4935 5.57714 13.1311 6.03222 12.9209C6.10494 12.3924 6.31197 12.03 6.54003 11.8258C4.76416 11.6186 2.896 10.9149 2.896 7.77276C2.896 6.87686 3.20802 6.14615 3.71875 5.57207C3.6372 5.36386 3.36181 4.52952 3.79784 3.4009C3.79784 3.4009 4.46875 3.18069 5.99803 4.24175C6.63572 4.05907 7.31981 3.96898 7.99998 3.96597C8.67967 3.96898 9.36423 4.06006 10.0029 4.24274C11.5293 3.18068 12.2012 3.4019 12.2012 3.4019C12.6387 4.53152 12.3633 5.36485 12.2812 5.57207C12.7939 6.14615 13.1035 6.87688 13.1035 7.77276C13.1035 10.9229 11.2324 11.6166 9.4502 11.8198C9.7383 12.0741 9.99317 12.5726 9.99317 13.3373C9.99317 14.4334 9.98242 15.3173 9.98242 15.5876C9.98242 15.8058 10.1279 16.0611 10.5332 15.981C13.71 14.8949 16 11.8218 16 8.2002C16 3.67167 12.418 0 8 0Z"
        />
      </svg>
    ),
  },
  changelog: {
    component: NavbarItem,
    icon: 'cheer',
  },
  figma: {
    component: NavbarItem,
    icon: () => (
      <svg
        width="16"
        height="16"
        viewBox="0 0 17 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="currentColor"
          d="M12.5 6.5A2.5 2.5 0 0 0 11 2H6.5A2.5 2.5 0 0 0 5 6.5a2.5 2.5 0 0 0 .085 4.063A2.75 2.75 0 1 0 9.5 12.75V10.5a2.5 2.5 0 0 0 3-4Zm0-2A1.5 1.5 0 0 1 11 6H9.5V3H11a1.5 1.5 0 0 1 1.5 1.5ZM5 4.5A1.5 1.5 0 0 1 6.5 3h2v3h-2A1.5 1.5 0 0 1 5 4.5ZM6.5 10a1.5 1.5 0 0 1 0-3h2v3h-2Zm2 2.75A1.75 1.75 0 1 1 6.75 11H8.5v1.75ZM11 10a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Z"
        />
      </svg>
    ),
  },
};

type Props = NavbarNavLinkProps & {
  component: string;
};

export default function NavbarNavLink({
  activeBasePath,
  activeBaseRegex,
  to,
  href,
  label,
  html,
  isDropdownLink,
  prependBaseUrlToHref,
  component,
  ...props
}: Props): JSX.Element {
  // TODO all this seems hacky
  // {to: 'version'} should probably be forbidden, in favor of {to: '/version'}
  const toUrl = useBaseUrl(to);
  const activeBaseUrl = useBaseUrl(activeBasePath);
  const normalizedHref = useBaseUrl(href, { forcePrependBaseUrl: true });
  const isExternalLink = label && href && !isInternalUrl(href);

  if (component != null && CUSTOM_LINK_COMPONENT_MAP[component] !== undefined) {
    const componentData = CUSTOM_LINK_COMPONENT_MAP[component]!;
    const Element = componentData.component;
    return (
      <Element
        href={href}
        title={label}
        icon={componentData.icon}
        className={props.className}
        showLabel
      />
    );
  }

  // Link content is set through html XOR label
  const linkContentProps = html
    ? { dangerouslySetInnerHTML: { __html: html } }
    : {
        children: (
          <>
            {label}
            {isExternalLink && (
              <IconExternalLink
                {...(isDropdownLink && { width: 12, height: 12 })}
              />
            )}
          </>
        ),
      };

  if (href) {
    return (
      <Link
        href={prependBaseUrlToHref ? normalizedHref : href}
        {...props}
        {...linkContentProps}
      />
    );
  }

  return (
    <Link
      to={toUrl}
      isNavLink
      {...((activeBasePath || activeBaseRegex) && {
        isActive: (_match, location) =>
          activeBaseRegex
            ? isRegexpStringMatch(activeBaseRegex, location.pathname)
            : location.pathname.startsWith(activeBaseUrl),
      })}
      {...props}
      {...linkContentProps}
    />
  );
}
