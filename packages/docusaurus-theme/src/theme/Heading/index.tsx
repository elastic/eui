/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import useBrokenLinks from '@docusaurus/useBrokenLinks';
import { Props as HeadingProps } from '@theme/Heading';
import {
  EuiTitle,
  EuiButtonIcon,
  UseEuiTheme,
  EuiTitleProps,
  useEuiMemoizedStyles,
} from '@elastic/eui';
import { css } from '@emotion/react';

const TAG_TO_TITLE_SIZE_MAP: Record<string, EuiTitleProps['size']> = {
  h6: 'xxxs',
  h5: 'xxs',
  h4: 'xs',
  h3: 's',
  h2: 'm',
  h1: 'l',
};

const getHeadingStyles = ({ euiTheme }: UseEuiTheme) => ({
  heading: css`
    margin-block-start: calc(var(--eui-theme-content-vertical-spacing) * 2.5);
    margin-block-end: var(--eui-theme-content-vertical-spacing);
    scroll-margin-block-start: calc(var(--ifm-navbar-height) + 1rem);

    &:first-child {
      margin-block-start: var(--eui-theme-content-vertical-spacing);
    }
  `,

  anchor: css`
    margin-inline-start: ${euiTheme.size.s};
    opacity: 0;

    &:focus,
    .heading:hover & {
      opacity: 1;
    }
  `,
});

const Heading = ({
  as: Component,
  children,
  id,
  ...restProps
}: HeadingProps) => {
  const brokenLinks = useBrokenLinks();
  const styles = useEuiMemoizedStyles(getHeadingStyles);

  brokenLinks.collectAnchor(id);

  const anchorTitle = `Direct link to ${
    typeof children === 'string' ? children : id
  }`;

  // We don't want to show section links on document title headings
  const shouldShowSectionLink = Component !== 'h1';

  return (
    <EuiTitle size={TAG_TO_TITLE_SIZE_MAP[Component]}>
      <Component
        {...restProps}
        className="heading anchor"
        css={styles.heading}
        id={id}
      >
        {children}
        {shouldShowSectionLink && (
          <EuiButtonIcon
            css={styles.anchor}
            href={`#${id}`}
            aria-label={anchorTitle}
            title={anchorTitle}
            iconType="link"
            color="text"
            size="xs"
          />
        )}
      </Component>
    </EuiTitle>
  );
};

export default Heading;
