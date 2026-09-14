/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import type { EuiHtmlButtonProps } from './types';
import { validateHref } from '@elastic/eui/src/services/security';

const INTERACTIVE_KEYS = new Set(['Enter', ' ']);

export const isButtonDisabled = ({
  href,
  isDisabled,
  disabled,
  isLoading,
}: Pick<
  EuiHtmlButtonProps,
  'href' | 'isDisabled' | 'disabled' | 'isLoading'
>): boolean => {
  const isHrefValid = !href || validateHref(href);

  return Boolean(isLoading || isDisabled || disabled || !isHrefValid);
};

export const resolveDisplay = (
  props: Pick<EuiHtmlButtonProps, 'display' | 'fill'>
): NonNullable<EuiHtmlButtonProps['display']> => {
  if (props.display) return props.display;

  return props.fill ? 'fill' : 'base';
};

/**
 * Apply button behavior to a DOM element.
 * Ports `EuiButton` and `useEuiDisabledElement` a11y.
 * Native `disabled` becomes `aria-disabled` so the control stays focusable.
 *
 * @param el - DOM element to apply behavior to
 * @param props - button props
 * @returns detach function to remove event listeners
 */
export const applyButtonBehavior = (
  el: HTMLElement,
  props: EuiHtmlButtonProps
): (() => void) => {
  const disabled = isButtonDisabled(props);
  const ariaDisabled = Boolean(disabled && props.hasAriaDisabled);
  const nativeDisabled = Boolean(disabled && !props.hasAriaDisabled);

  if (el instanceof HTMLButtonElement) {
    el.disabled = nativeDisabled;
  } else if (nativeDisabled) {
    el.setAttribute('aria-disabled', 'true');
  } else {
    el.removeAttribute('disabled');
  }

  if (ariaDisabled) {
    el.setAttribute('aria-disabled', 'true');
  } else if (!nativeDisabled) {
    el.removeAttribute('aria-disabled');
  }

  if (props.isSelected === undefined) {
    el.removeAttribute('aria-pressed');
  } else {
    el.setAttribute('aria-pressed', String(props.isSelected));
  }

  const onActivate = (event: Event) => {
    if (disabled) {
      event.preventDefault();
      event.stopImmediatePropagation();

      return;
    }

    props.onClick?.(event as MouseEvent);
  };

  const onKeyDown = (event: KeyboardEvent) => {
    if (!disabled) return;
    if (INTERACTIVE_KEYS.has(event.key)) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  };

  el.addEventListener('click', onActivate);
  el.addEventListener('keydown', onKeyDown);

  return () => {
    el.removeEventListener('click', onActivate);
    el.removeEventListener('keydown', onKeyDown);
  };
};
