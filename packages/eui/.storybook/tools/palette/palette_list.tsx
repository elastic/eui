/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, useMemo } from 'react';

import { EuiColorPickerSwatch } from '../../../src/components/color_picker/color_picker_swatch';
import {
  EuiDragDropContext,
  EuiDraggable,
  EuiDroppable,
} from '../../../src/components/drag_and_drop';
import { EuiFlexGroup, EuiFlexItem } from '../../../src/components/flex';
import { EuiIcon } from '../../../src/components/icon';
import { EuiPanel } from '../../../src/components/panel';
import { EuiText } from '../../../src/components/text';
import { useEuiFontSize } from '../../../src/global_styling';
import {
  ColorMap,
  Palette,
  groupPaletteByHue,
  reorderPaletteHues,
} from './palette';

export interface PaletteListProps {
  palette: Palette;
  colors: ColorMap;
  onReorder?: (palette: string[]) => void;
}

export const PaletteList: FunctionComponent<PaletteListProps> = ({
  palette,
  colors,
  onReorder,
}) => {
  const fontSize = useEuiFontSize('xs');

  const numberedGroups = useMemo(() => {
    let index = 1;
    return groupPaletteByHue(palette, colors).map((group) => ({
      ...group,
      colors: group.colors.map((color) => ({
        ...color,
        index: index++,
      })),
    }));
  }, [palette, colors]);

  return (
    <EuiFlexGroup
      direction="column"
      gutterSize="s"
      responsive={false}
      css={{ minInlineSize: 220 }}
    >
      <EuiText component="p" size="xs" color="subdued">
        Drag hues to reorder.
      </EuiText>
      {numberedGroups.length === 0 ? (
        <EuiText component="p" size="s" color="subdued">
          No colors in the palette.
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
                    <EuiPanel paddingSize="xs" hasBorder hasShadow={false}>
                      <EuiFlexGroup
                        alignItems="flexStart"
                        gutterSize="xs"
                        responsive={false}
                      >
                        <EuiFlexItem
                          grow={false}
                          css={({ euiTheme }) => ({
                            paddingBlockStart: euiTheme.size.xxs,
                            paddingInline: euiTheme.size.xs,
                            cursor: 'grab',
                          })}
                          {...provided.dragHandleProps}
                          aria-label={`Reorder ${group.hue}`}
                        >
                          <EuiIcon
                            type="dragVertical"
                            color="subdued"
                            aria-hidden
                          />
                        </EuiFlexItem>
                        <EuiFlexItem>
                          {group.colors.map((color) => (
                            <EuiFlexGroup
                              key={color.name}
                              alignItems="center"
                              gutterSize="s"
                              responsive={false}
                              css={({ euiTheme }) => ({
                                fontSize: fontSize.fontSize,
                                lineHeight: fontSize.lineHeight,
                                paddingBlock: euiTheme.size.xxs,
                                fontFamily: euiTheme.font.familyCode,
                              })}
                            >
                              <span
                                css={({ euiTheme }) => ({
                                  inlineSize: '2ch',
                                  color: euiTheme.colors.textDisabled,
                                  textAlign: 'end',
                                })}
                              >
                                {color.index}
                              </span>
                              <EuiColorPickerSwatch
                                color={color.value}
                                disabled
                                showToolTip={false}
                                aria-hidden
                                tabIndex={-1}
                                css={({ euiTheme }) => ({
                                  blockSize: euiTheme.size.base,
                                  inlineSize: euiTheme.size.base,
                                })}
                              />
                              <span>{color.name}</span>
                            </EuiFlexGroup>
                          ))}
                        </EuiFlexItem>
                      </EuiFlexGroup>
                    </EuiPanel>
                  )}
                </EuiDraggable>
              ))}
            </>
          </EuiDroppable>
        </EuiDragDropContext>
      )}
    </EuiFlexGroup>
  );
};
