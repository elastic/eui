/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { CSSProperties, FunctionComponent, memo } from 'react';

import { EuiPortal } from '../../../portal';
import { css } from '@emotion/react';

type DragOverlayProps = {
  isDragging?: boolean;
  cursor?: CSSProperties['cursor'];
  zIndex?: CSSProperties['zIndex'];
};

const cssStyles = css`
  position: fixed;
  inset: 0;
`;

/**
 * Creates an invisible overlay that prevents hover interactions/transitions
 * on other elements that the dragged element is dragged over, and also maintains
 * the intended drag cursor over any location.
 *
 * TODO: If this is useful elsewhere, consider moving it to `src/services`
 */
export const DragOverlay: FunctionComponent<DragOverlayProps> = memo(
  ({ isDragging, cursor, zIndex = 9999 }) => {
    return isDragging ? (
      <EuiPortal>
        <div css={cssStyles} style={{ cursor, zIndex }} />
      </EuiPortal>
    ) : null;
  }
);
DragOverlay.displayName = 'DragOverlay';
