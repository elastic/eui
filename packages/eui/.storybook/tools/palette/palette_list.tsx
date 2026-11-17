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

export const PaletteList: FunctionComponent<{
  palette: Palette;
  colors: ColorMap;
  onReorder: (palette: Palette) => void;
}> = ({ palette, colors, onReorder }) => {
  const fontSize = useEuiFontSize('xs');
  const groups = useMemo(() => groupPaletteByHue(palette), [palette]);

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
      {groups.length === 0 ? (
        <EuiText component="p" size="s" color="subdued">
          No colors in the palette.
        </EuiText>
      ) : (
        <EuiDragDropContext
          onDragEnd={({ source, destination }) => {
            if (!destination || source.index === destination.index) return;
            onReorder(
              reorderPaletteHues(palette, source.index, destination.index)
            );
          }}
        >
          <EuiDroppable droppableId="paletteHues" spacing="s">
            <>
              {groups.map((group, index) => (
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
                          {group.names.map((name) => (
                            <EuiFlexGroup
                              key={name}
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
                                {palette.indexOf(name) + 1}
                              </span>
                              <EuiColorPickerSwatch
                                color={colors[name]}
                                disabled
                                showToolTip={false}
                                aria-hidden
                                tabIndex={-1}
                                css={({ euiTheme }) => ({
                                  blockSize: euiTheme.size.base,
                                  inlineSize: euiTheme.size.base,
                                })}
                              />
                              <span>{name}</span>
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
