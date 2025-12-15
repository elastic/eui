/** @jsxImportSource @emotion/react */

import { memo, useEffect, useRef, useState } from 'react';
import invariant from 'tiny-invariant';
import {
  draggable,
  dropTargetForElements,
} from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { combine } from '@atlaskit/pragmatic-drag-and-drop/combine';
import {
  attachInstruction,
  extractInstruction,
  type Instruction,
} from '@atlaskit/pragmatic-drag-and-drop-hitbox/list-item';
import {
  EuiAccordion,
  EuiIcon,
  EuiPanel,
  EuiText,
  useEuiTheme,
} from '@elastic/eui';
import { css } from '@emotion/react';

import { TreeItem } from './data';

interface DraggablePanelProps extends TreeItem {
  index: number;
  level?: number;
}

export const DraggablePanel = memo(function DraggablePanel({
  children,
  id,
  index,
  level = 0,
  title,
}: DraggablePanelProps) {
  const { euiTheme } = useEuiTheme();

  const ref = useRef<HTMLDivElement | null>(null);

  const [isExpanded, setIsExpanded] = useState(true);
  const [isDraggedOver, setIsDraggedOver] = useState(false);
  const [instruction, setInstruction] = useState<Instruction | null>(null);

  useEffect(() => {
    const el = ref.current;
    invariant(el);

    return combine(
      draggable({
        element: el,
        getInitialData: () => ({ id, index }),
        onDragStart: () => {
          setIsExpanded(false);
        },
      }),
      dropTargetForElements({
        element: el,
        getData: ({ input, element }) =>
          attachInstruction(
            { id, index, level },
            {
              input,
              element,
              operations: {
                combine: 'available',
                'reorder-before': 'available',
                'reorder-after':
                  isExpanded && !!children?.length
                    ? 'not-available'
                    : 'available',
              },
            }
          ),
        onDragEnter: ({ self }) => {
          setInstruction(extractInstruction(self.data));
          setIsDraggedOver(true);
        },
        onDrag: ({ self }) => setInstruction(extractInstruction(self.data)),
        onDragLeave: () => {
          setInstruction(null);
          setIsDraggedOver(false);
        },
        onDrop: () => {
          setInstruction(null);
          setIsDraggedOver(false);
        },
      })
    );
  }, [id, index, children, level, title, isExpanded]);

  const wrapperStyles = css`
    position: relative;
  `;

  /**
   * `EuiPanel` doesn't support `color="subdued"` and `hasBorder`,
   * therefore we need a style override.
   */
  const panelStyles = css`
    box-sizing: border-box;
    border: ${euiTheme.border.thin};
    border-color: ${instruction?.operation === 'combine'
      ? euiTheme.colors.borderStrongAccentSecondary
      : euiTheme.colors.borderBaseSubdued};
  `;

  /**
   * Leaves need 1px padding override to avoid border clipping.
   * `EuiPanel` doesn't support `hasBorder` for `color="subdued"`.
   */
  const leafStyles = css`
    padding: ${euiTheme.size.s} 1px 1px 1px;
  `;

  const childrenWrapperStyles = css`
    ${isExpanded && !!children?.length && leafStyles}
    display: flex;
    flex-direction: column;
    gap: ${euiTheme.size.s};
  `;

  const headerStyles = css`
    display: flex;
    gap: ${euiTheme.size.xs};
    align-items: center;
  `;

  const iconStyles = css`
    display: flex;
    align-items: center;
    justify-content: center;
    height: ${euiTheme.size.l};
    width: ${euiTheme.size.l};
  `;

  const indicatorStyles = css`
    position: absolute;
    z-index: 10;
    left: 0;
    right: 0;
    height: 2px;
    background-color: ${euiTheme.colors.borderStrongAccentSecondary};
    pointer-events: none;
  `;

  const topIndicatorStyles = css`
    ${indicatorStyles}
    top: -${euiTheme.size.s};
  `;

  const bottomIndicatorStyles = css`
    ${indicatorStyles}
    bottom: -${euiTheme.size.s};
  `;

  return (
    <div css={wrapperStyles}>
      {instruction?.operation === 'reorder-before' && (
        <div css={topIndicatorStyles} />
      )}
      <EuiPanel
        css={panelStyles}
        panelRef={ref}
        color={level % 2 ? 'plain' : 'subdued'}
        hasShadow={false}
        borderRadius="m"
        grow={false}
        paddingSize="s"
      >
        <EuiAccordion
          id={id}
          forceState={isExpanded ? 'open' : 'closed'}
          onToggle={setIsExpanded}
          /*
           * We render plain `EuiIcon`, not interactive `EuiButtonIcon`,
           * and let the underlying button handle the (un)collapse behavior.
           * See: https://eui.elastic.co/docs/components/containers/accordion/#interactive-content-in-the-trigger
           */
          arrowDisplay="none"
          buttonContent={
            <span css={headerStyles}>
              {!!children?.length && (
                <span css={iconStyles}>
                  <EuiIcon type={isExpanded ? 'arrowDown' : 'arrowRight'} />
                </span>
              )}
              <EuiText size="s" component="span">
                {title}
              </EuiText>
            </span>
          }
        >
          <div css={childrenWrapperStyles}>
            {children?.map((child, index) => (
              <DraggablePanel
                key={child.id}
                index={index}
                level={level + 1}
                {...child}
              />
            ))}
          </div>
        </EuiAccordion>
      </EuiPanel>
      {instruction?.operation === 'reorder-after' && (
        <div css={bottomIndicatorStyles} />
      )}
    </div>
  );
});
