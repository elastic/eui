/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  MouseEventHandler,
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  FunctionComponent,
  ReactNode,
  useContext,
} from 'react';
import classNames from 'classnames';
import { CommonProps, ExclusiveUnion } from '../common';
import { getSecureRelForTarget, useEuiTheme } from '../../services';
import { validateHref } from '../../services/security/href_validator';

import { euiTabStyles, euiTabContentStyles } from './tab.styles';
import { EuiTabsContext } from './tabs_context';

export interface EuiTabProps extends CommonProps {
  isSelected?: boolean;
  disabled?: boolean;
  /**
   * Places content before the tab content/children.
   * Will be excluded from interactive effects.
   */
  prepend?: ReactNode;
  /**
   * Places content after the tab content/children.
   * Will be excluded from interactive effects.
   */
  append?: ReactNode;
}

type EuiTabPropsForAnchor = EuiTabProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'onClick' | 'href'> & {
    href?: string;
    onClick?: MouseEventHandler<HTMLAnchorElement>;
  };

type EuiTabPropsForButton = EuiTabProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> & {
    onClick?: MouseEventHandler<HTMLButtonElement>;
  };

export type Props = ExclusiveUnion<EuiTabPropsForAnchor, EuiTabPropsForButton>;

export const EuiTab: FunctionComponent<Props> = ({
  isSelected,
  children,
  className,
  disabled: _disabled,
  href,
  target,
  rel,
  prepend,
  append,
  ...rest
}) => {
  const { size, expand } = useContext(EuiTabsContext);
  const euiTheme = useEuiTheme();
  const isHrefValid = !href || validateHref(href);
  const disabled = _disabled || !isHrefValid;

  // Keep CSS classnames for reference
  const classes = classNames('euiTab', className, {
    'euiTab-isSelected': isSelected,
  });

  const tabStyles = euiTabStyles(euiTheme);
  const cssTabStyles = [
    tabStyles.euiTab,
    expand && tabStyles.expanded,
    disabled && tabStyles.disabled.disabled,
    isSelected && (disabled ? tabStyles.disabled.selected : tabStyles.selected),
  ];

  const tabContentStyles = euiTabContentStyles(euiTheme);
  const cssTabContentStyles = [
    tabContentStyles.euiTab__content,
    size && tabContentStyles[size],
  ];

  const prependNode = prepend && (
    <span className="euiTab__prepend">{prepend}</span>
  );
  const appendNode = append && <span className="euiTab__append">{append}</span>;

  //  <a> elements don't respect the `disabled` attribute. So if we're disabled, we'll just pretend
  //  this is a button and piggyback off its disabled styles.
  if (href && !disabled) {
    const secureRel = getSecureRelForTarget({ href, target, rel });

    return (
      <a
        role="tab"
        aria-selected={!!isSelected}
        className={classes}
        css={cssTabStyles}
        href={href}
        target={target}
        rel={secureRel}
        {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {prependNode}
        <span className="euiTab__content" css={cssTabContentStyles}>
          {children}
        </span>
        {appendNode}
      </a>
    );
  }

  return (
    <button
      role="tab"
      aria-selected={!!isSelected}
      type="button"
      className={classes}
      css={cssTabStyles}
      disabled={disabled}
      {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {prependNode}
      <span className="euiTab__content" css={cssTabContentStyles}>
        {children}
      </span>
      {appendNode}
    </button>
  );
};
