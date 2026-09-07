/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import {
  applyButtonBehavior,
  isButtonDisabled,
  resolveDisplay,
} from './behavior';
import { mount } from '../mount';
import type { EuiHtmlButtonProps, EuiHtmlMountedButton } from './types';

const classNames = (...parts: Array<string | false | undefined>) =>
  parts.filter(Boolean).join(' ');

export const buttonClassName = (props: EuiHtmlButtonProps): string => {
  const display = resolveDisplay(props);
  const disabled = isButtonDisabled(props);
  const color = disabled ? 'disabled' : (props.color ?? 'primary');
  const size = props.size ?? 'm';

  return classNames(
    'euiButton',
    `euiButton--${color}`,
    `euiButton--${size}`,
    display !== 'base' && `euiButton--${display}`,
    props.fullWidth && 'euiButton--fullWidth',
    props.className
  );
};

const render = (props: EuiHtmlButtonProps): HTMLElement => {
  const {
    label,
    href,
    target,
    rel,
    type = 'button',
    id,
    isSelected,
    isLoading,
  } = props;
  const disabled = isButtonDisabled(props);
  const tag = href && !disabled ? 'a' : 'button';
  const el = document.createElement(tag);

  el.className = buttonClassName(props);

  if (id) el.id = id;

  if (isLoading) el.setAttribute('aria-busy', 'true');

  if (tag === 'a') {
    (el as HTMLAnchorElement).href = href ?? '';

    if (target) (el as HTMLAnchorElement).target = target;

    const relParts = new Set(
      (rel ? rel.split(/\s+/) : []).concat(
        target === '_blank' ? ['noopener', 'noreferrer'] : []
      )
    );

    if (relParts.size) (el as HTMLAnchorElement).rel = [...relParts].join(' ');
  } else {
    (el as HTMLButtonElement).type = type;
  }

  if (isSelected !== undefined) {
    el.setAttribute('aria-pressed', String(isSelected));
  }

  const content = document.createElement('span');
  content.className = 'euiButton__content';

  if (isLoading) {
    const spinner = document.createElement('span');
    spinner.className = 'euiLoadingSpinner euiLoadingSpinner--m';
    spinner.setAttribute('aria-hidden', 'true');
    content.append(spinner);
  }

  const text = document.createElement('span');
  text.className = 'eui-textTruncate';
  text.textContent = label;
  content.append(text);
  el.append(content);

  return el;
};

export const mountButton = (
  container: HTMLElement,
  props: EuiHtmlButtonProps
): EuiHtmlMountedButton =>
  mount(container, props, { render, attach: applyButtonBehavior });
