/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, useMemo } from 'react';
import { css } from '@emotion/react';

import { EuiColorPickerSwatch } from '../../../src/components/color_picker/color_picker_swatch';
import {
  EuiDragDropContext,
  EuiDraggable,
  EuiDroppable,
} from '../../../src/components/drag_and_drop';
import { EuiFlexGroup, EuiFlexItem } from '../../../src/components/flex';
import { EuiIcon } from '../../../src/components/icon';
import { EuiText } from '../../../src/components/text';
import { useEuiTheme } from '../../../src/services';
import { useEuiFontSize } from '../../../src/global_styling';
import { PRIMITIVE_COLORS } from './borealis_primitives';
import {
  ColorMap,
  Palette,
  groupPaletteByHue,
  reorderPaletteHues,
} from './palette';

export interface PaletteListProps {
  palette: Palette;
  colors?: ColorMap;
  onReorder?: (palette: string[]) => void;
}

export const PaletteList: FunctionComponent<PaletteListProps> = ({
  palette,
  colors = PRIMITIVE_COLORS,
  onReorder,
}) => {
  const { euiTheme } = useEuiTheme();
  const fontSize = useEuiFontSize('xs');

  const groups = useMemo(
    () => groupPaletteByHue(palette, colors),
    [palette, colors]
  );

  const numberedGroups = useMemo(() => {
    let index = 1;
    return groups.map((group) => ({
      ...group,
      colors: group.colors.map((color) => ({
        ...color,
        index: index++,
      })),
    }));
  }, [groups]);

  const styles = {
    root: css`
      display: flex;
      flex-direction: column;
      gap: ${euiTheme.size.s};
      min-inline-size: 220px;
    `,
    group: css`
      padding: ${euiTheme.size.xs};
      background-color: ${euiTheme.colors.backgroundBasePlain};
      border: ${euiTheme.border.width.thin} solid
        ${euiTheme.colors.borderBaseSubdued};
      border-radius: ${euiTheme.border.radius.medium};
    `,
    handle: css`
      display: flex;
      align-items: center;
      padding-block-start: ${euiTheme.size.xxs};
      padding-inline: ${euiTheme.size.xs};
      cursor: grab;
    `,
    row: css`
      display: flex;
      align-items: center;
      gap: ${euiTheme.size.s};
      padding-block: ${euiTheme.size.xxs};
      ${fontSize}
      font-family: ${euiTheme.font.familyCode};
    `,
    index: css`
      inline-size: 2ch;
      color: ${euiTheme.colors.textDisabled};
      text-align: end;
    `,
  };

  return (
    <div css={styles.root}>
      <EuiText size="xs" color="subdued">
        <p>Drag hues to reorder.</p>
      </EuiText>
      {numberedGroups.length === 0 ? (
        <EuiText size="s" color="subdued">
          <p>No colors in the palette.</p>
        </EuiText>
      ) : (
        <EuiDragDropContext
          onDragEnd={({ source, destination }) => {
            if (!destination || source.index === destination.index) return;
            onReorder?.(
              reorderPaletteHues(
                palette,
                colors,
                source.index,
                destination.index
              )
            );
          }}
        >
          <EuiDroppable droppableId="paletteHues" spacing="s">
            <>
              {numberedGroups.map((group, index) => (
                <EuiDraggable
                  key={group.hue}
                  draggableId={group.hue}
                  index={index}
                  spacing="s"
                  customDragHandle
                  hasInteractiveChildren
                >
                  {(provided) => (
                    <div css={styles.group}>
                      <EuiFlexGroup
                        alignItems="flexStart"
                        gutterSize="xs"
                        responsive={false}
                      >
                        <EuiFlexItem
                          grow={false}
                          css={styles.handle}
                          {...provided.dragHandleProps}
                          aria-label={`Reorder ${group.hue}`}
                        >
                          <EuiIcon type="dragVertical" color="subdued" />
                        </EuiFlexItem>
                        <EuiFlexItem>
                          {group.colors.map((color) => (
                            <div key={color.name} css={styles.row}>
                              <span css={styles.index}>{color.index}</span>
                              <EuiColorPickerSwatch
                                color={color.value}
                                disabled
                                showToolTip={false}
                                aria-hidden
                                tabIndex={-1}
                                style={{ blockSize: 16, inlineSize: 16 }}
                              />
                              {color.name}
                            </div>
                          ))}
                        </EuiFlexItem>
                      </EuiFlexGroup>
                    </div>
                  )}
                </EuiDraggable>
              ))}
            </>
          </EuiDroppable>
        </EuiDragDropContext>
      )}
    </div>
  );
};
