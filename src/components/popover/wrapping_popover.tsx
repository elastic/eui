/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, useState, useEffect } from 'react';
import { EuiPopover, Props as EuiPopoverProps } from './popover';
import { EuiPortal } from '../portal';

export interface EuiWrappingPopoverProps extends EuiPopoverProps {
  button: HTMLElement;
}

/**
 * Injects the EuiPopover next to the button via EuiPortal
 * then the button element is moved into the popover dom.
 * On unmount, the button is moved back to its original location.
 */
export const EuiWrappingPopover: FunctionComponent<EuiWrappingPopoverProps> = ({
  button,
  ...rest
}) => {
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);
  const [portal, setPortal] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (anchor) {
      // move the button into the popover DOM
      anchor.insertAdjacentElement('beforebegin', button);
    }

    return () => {
      if (portal) {
        // move the button back out of the popover DOM
        portal.insertAdjacentElement('beforebegin', button);
      }
    };
  }, [anchor, button, portal]);

  return (
    <EuiPortal
      portalRef={setPortal}
      insert={{ sibling: button, position: 'after' }}
    >
      <EuiPopover
        {...rest}
        button={<div ref={setAnchor} className="euiWrappingPopover__anchor" />}
      />
    </EuiPortal>
  );
};
