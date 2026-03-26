/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { useCallback, useLayoutEffect, useRef } from 'react';
import { EuiPopover, Props as EuiPopoverProps } from './popover';
import { EuiPortal } from '../portal';

export interface EuiWrappingPopoverProps
  extends Omit<EuiPopoverProps, 'button'> {
  button: HTMLElement;
}

/**
 * Injects the EuiPopover next to the button via EuiPortal
 * then the button element is moved into the popover dom.
 * On unmount, the button is moved back to its original location.
 */

export function EuiWrappingPopover(props: EuiWrappingPopoverProps) {
  const { button, ...rest } = props;

  const portalRef = useRef<HTMLElement | null>(null);

  const setPortalRef = useCallback((node: HTMLElement | null) => {
    portalRef.current = node;
  }, []);

  const setAnchorRef = useCallback(
    (node: HTMLDivElement | null) => {
      node?.insertAdjacentElement('beforebegin', button);
    },
    [button]
  );

  useLayoutEffect(() => {
    return () => {
      if (button.parentNode && portalRef.current) {
        portalRef.current.insertAdjacentElement('beforebegin', button);
      }
    };
  }, [button]);

  return (
    <EuiPortal
      portalRef={setPortalRef}
      insert={{ sibling: props.button, position: 'after' }}
    >
      <EuiPopover
        {...rest}
        button={
          <div ref={setAnchorRef} className="euiWrappingPopover__anchor" />
        }
      />
    </EuiPortal>
  );
}
