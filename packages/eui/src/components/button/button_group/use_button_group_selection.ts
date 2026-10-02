/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { useCallback } from 'react';

interface UseEuiButtonGroupSelectionProps {
  type?: 'single' | 'multi';
  idSelected?: string;
  idToSelectedMap?: Record<string, boolean>;
  onChange?: (id: string) => void;
}

interface UseEuiButtonGroupSelectionReturn {
  isSelected: (id: string) => boolean;
  onSelect: (id: string) => void;
}

/**
 * Purely controlled selection state for `EuiButtonGroup` with `variant="selection"`.
 * The consumer owns state via `idSelected` (single) or `idToSelectedMap` (multi)
 * and updates it through `onChange`.
 */
export function useEuiButtonGroupSelection({
  type,
  idSelected,
  idToSelectedMap,
  onChange,
}: UseEuiButtonGroupSelectionProps): UseEuiButtonGroupSelectionReturn {
  const isSelected = useCallback(
    (id: string) =>
      type === 'multi' ? !!idToSelectedMap?.[id] : id === idSelected,
    [type, idSelected, idToSelectedMap]
  );

  const onSelect = useCallback((id: string) => onChange?.(id), [onChange]);

  return { isSelected, onSelect };
}
