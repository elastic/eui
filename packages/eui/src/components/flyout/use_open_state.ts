/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { AnimationEventHandler, useCallback, useEffect, useState } from 'react';
import { EuiFlyoutProps } from './flyout';

export type EuiFlyoutOpenState = 'opening' | 'open' | 'closing' | 'closed';

interface UseEuiFlyoutOpenStateArgs {
  isOpen: EuiFlyoutProps['isOpen'];
  onClose: EuiFlyoutProps['onClose'];
  onClosing: EuiFlyoutProps['onClosing'];
}

export const useEuiFlyoutOpenState = ({
  isOpen,
  onClose,
  onClosing,
}: UseEuiFlyoutOpenStateArgs) => {
  const [openState, setOpenState] = useState<EuiFlyoutOpenState>(
    isOpen ? 'open' : 'closed'
  );

  useEffect(() => {
    // Check for matching state
    if (
      (isOpen && openState === 'open') ||
      (!isOpen && openState === 'closed')
    ) {
      return;
    }

    if (isOpen && (openState === 'closing' || openState === 'closed')) {
      setOpenState('opening');
    }

    if (!isOpen && (openState === 'opening' || openState === 'open')) {
      setOpenState('closing');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  useEffect(() => {
    if (openState === 'closed') {
      onClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openState]);

  const onAnimationEnd = useCallback<AnimationEventHandler>(() => {
    if (openState === 'closing') {
      setOpenState('closed');
    }

    if (openState === 'opening') {
      setOpenState('open');
    }
  }, [openState, setOpenState]);

  const closeFlyout = useCallback(
    (event?: MouseEvent | TouchEvent | KeyboardEvent) => {
      if (openState === 'closed' || openState === 'closing') {
        return;
      }

      onClosing?.(event);

      setOpenState('closing');

      // onClose() will be called by the effect above when openState === 'closed'
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [openState, setOpenState]
  );

  return {
    openState,
    onAnimationEnd,
    closeFlyout,
  };
};
