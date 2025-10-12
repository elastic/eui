/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { AnimationEventHandler, useCallback, useState } from 'react';

export type EuiFlyoutOpenState = 'opening' | 'open';

export const useEuiFlyoutOpenState = () => {
  const [openState, setOpenState] = useState<EuiFlyoutOpenState>('opening');

  const onAnimationEnd = useCallback<AnimationEventHandler>(() => {
    if (openState === 'opening') {
      setOpenState('open');
    }
  }, [openState, setOpenState]);

  return {
    openState,
    onAnimationEnd,
  };
};
