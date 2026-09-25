/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

export type EuiHtmlMounted<TProps> = {
  el: HTMLElement;
  update: (next: Partial<TProps>) => void;
  destroy: () => void;
};

export type EuiHtmlMountSpec<TProps> = {
  render: (props: TProps) => HTMLElement;
  attach?: (el: HTMLElement, props: TProps) => () => void;
};

/**
 * Mount a component into a DOM container.
 *
 * @param container - DOM container to mount into
 * @param props - component props
 * @param spec - component specification
 * @returns mounted component
 */
export const mount = <TProps extends object>(
  container: HTMLElement,
  props: TProps,
  spec: EuiHtmlMountSpec<TProps>
): EuiHtmlMounted<TProps> => {
  let current = { ...props };
  let el = spec.render(current);
  let detach = spec.attach?.(el, current) ?? (() => {});

  container.replaceChildren(el);

  const remount = (next: TProps) => {
    const doc = el.ownerDocument;
    const restoreFocus = Boolean(
      doc.activeElement && el.contains(doc.activeElement)
    );

    detach();

    current = next;
    el = spec.render(current);
    detach = spec.attach?.(el, current) ?? (() => {});

    container.replaceChildren(el);

    if (restoreFocus) el.focus();
  };

  return {
    get el() {
      return el;
    },
    update(partial) {
      remount({ ...current, ...partial });
    },
    destroy() {
      detach();

      if (el.parentElement === container) container.removeChild(el);
    },
  };
};
