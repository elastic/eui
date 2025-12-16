/** @jsxImportSource @emotion/react */

import { memo, useEffect, useRef, useState, type MouseEvent } from 'react';
import { css } from '@emotion/react';
import {
  draggable,
  dropTargetForElements,
  monitorForElements,
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

interface TreeItem {
  id: string;
  title: string;
  children?: TreeItem[];
  isBlocked?: boolean;
}

type Tree = TreeItem[];

const initialData: Tree = [
  { id: 'panel-1', title: 'Panel 1 (blocked)', isBlocked: true },
  {
    id: 'panel-2',
    title: 'Panel 2',
    children: [{ id: 'subpanel-2-1', title: 'Subpanel 2.1' }],
  },
  {
    id: 'panel-3',
    title: 'Panel 3',
    children: [
      {
        id: 'subpanel-3-1',
        title: 'Subpanel 3.1',
        children: [
          { id: 'subpanel-3-1-1', title: 'Subpanel 3.1.1' },
          {
            id: 'subpanel-3-1-2',
            title: 'Subpanel 3.1.2 (blocked)',
            isBlocked: true,
          },
        ],
      },
      { id: 'subpanel-3-2', title: 'Subpanel 3.2' },
    ],
  },
  { id: 'panel-4', title: 'Panel 4' },
];

const findItem = (items: Tree, itemId: string): TreeItem | undefined => {
  for (const item of items) {
    if (item.id === itemId) return item;
    if (item.children) {
      const foundItem = findItem(item.children, itemId);
      if (foundItem) return foundItem;
    }
  }
};

const removeItem = (items: Tree, itemId: string): Tree => {
  return items
    .filter((item) => item.id !== itemId)
    .map((item) => {
      if (!!item.children?.length) {
        const newChildren = removeItem(item.children, itemId);
        if (newChildren !== item.children) {
          return { ...item, children: newChildren };
        }
      }

      return item;
    });
};

const insertChild = (
  items: Tree,
  targetId: string,
  newItem: TreeItem
): Tree => {
  return items.map((item) => {
    if (item.id === targetId) {
      return {
        ...item,
        children: [newItem, ...(item.children || [])],
      };
    }
    if (item.children) {
      return {
        ...item,
        children: insertChild(item.children, targetId, newItem),
      };
    }
    return item;
  });
};

const insertBefore = (
  items: Tree,
  targetId: string,
  newItem: TreeItem
): Tree => {
  return items.flatMap((item) => {
    if (item.id === targetId) return [newItem, item];
    if (item.children) {
      return [
        { ...item, children: insertBefore(item.children, targetId, newItem) },
      ];
    }

    return [item];
  });
};

const insertAfter = (
  items: Tree,
  targetId: string,
  newItem: TreeItem
): Tree => {
  return items.flatMap((item) => {
    if (item.id === targetId) return [item, newItem];
    if (item.children) {
      return [
        { ...item, children: insertAfter(item.children, targetId, newItem) },
      ];
    }

    return [item];
  });
};

const useHover = () => {
  const [isHovered, setIsHovered] = useState(false);

  const onMouseOver = (e: MouseEvent) => {
    e.stopPropagation();
    setIsHovered(true);
  };

  const onMouseOut = (e: MouseEvent) => {
    e.stopPropagation();
    setIsHovered(false);
  };

  return { isHovered, onMouseOver, onMouseOut };
};

interface LineIndicatorProps {
  position: 'top' | 'bottom';
}

/**
 * TODO: make into a reusable style / component
 * with the current drag and drop components
 */
const LineIndicator = ({ position }: LineIndicatorProps) => {
  const { euiTheme } = useEuiTheme();

  const indicatorStyles = css`
    position: absolute;
    z-index: ${euiTheme.levels.flyout};
    left: 0;
    right: 0;
    height: 1px;
    background-color: ${euiTheme.colors.borderStrongAccentSecondary};
    pointer-events: none;
  `;

  const topIndicatorStyles = css`
    ${indicatorStyles}
    top: -${euiTheme.size.xs};
  `;

  const bottomIndicatorStyles = css`
    ${indicatorStyles}
    bottom: -${euiTheme.size.xs};
  `;

  return (
    <div
      css={position === 'top' ? topIndicatorStyles : bottomIndicatorStyles}
    />
  );
};

interface DraggablePanelProps extends TreeItem {
  index: number;
  level?: number;
}

const DraggablePanel = memo(function DraggablePanel({
  children,
  id,
  index,
  isBlocked,
  level = 0,
  title,
}: DraggablePanelProps) {
  const { euiTheme } = useEuiTheme();

  const ref = useRef<HTMLDivElement | null>(null);

  const [isExpanded, setIsExpanded] = useState(true);
  const [instruction, setInstruction] = useState<Instruction | null>(null);

  const { isHovered, onMouseOver, onMouseOut } = useHover();

  useEffect(() => {
    if (!!children?.length) {
      setIsExpanded(true);
    }
  }, [children?.length]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    return combine(
      draggable({
        element: el,
        getInitialData: () => ({ id, index }),
        onDragStart: () => setIsExpanded(false),
      }),
      dropTargetForElements({
        element: el,
        getData: ({ input, element }) =>
          attachInstruction(
            { id, index, level },
            {
              input,
              element,
              operations: isBlocked
                ? {
                    combine: 'not-available',
                    'reorder-before': 'not-available',
                    'reorder-after': 'not-available',
                  }
                : {
                    combine: 'available',
                    'reorder-before': 'available',
                    'reorder-after': 'available',
                  },
            }
          ),
        onDragEnter: ({ self, location }) => {
          if (location.current.dropTargets[0]?.element === self.element) {
            setInstruction(extractInstruction(self.data));
          }
        },
        onDrag: ({ self, location }) => {
          if (location.current.dropTargets[0]?.element === self.element) {
            setInstruction(extractInstruction(self.data));
          } else {
            setInstruction(null);
          }
        },
        onDragLeave: () => setInstruction(null),
        onDrop: () => setInstruction(null),
      })
    );
  }, [id, index, children, level, title, isExpanded, isBlocked]);

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
   * We need to override the default `overflow: hidden` behavior of `EuiAccordion` to
   * allow the `LineIndicator` to be visible when dragging nested panels
   * and assure leaf nodes' bottom border doesn't gets cut off.
   * Double-check this doesn't cause any issues with your content type.
   */
  const accordionStyles = css`
    .euiAccordion__childWrapper {
      overflow: visible;
    }
  `;

  /**
   * TODO: reuse the animation
   */
  const grabIconStyles = css`
    width: ${isHovered ? euiTheme.size.l : 0};
    min-width: 0;
    opacity: ${isHovered ? 1 : 0};
    margin-inline-end: ${isHovered ? 0 : `calc(${euiTheme.size.xs} * -1)`};
    overflow: hidden;
    transform: scale(${isHovered ? 1 : 0});
    transition:
      width 0.2s ease-in-out,
      opacity 0.2s ease-in-out,
      margin-inline-end 0.2s ease-in-out,
      transform 0.2s ease-in-out;
  `;

  /**
   * Gap between the accordion header and accordion content.
   */
  const groupStyles = css`
    padding-top: ${euiTheme.size.m};
  `;

  const childrenWrapperStyles = css`
    ${isExpanded && !!children?.length && groupStyles}
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

  return (
    <div css={wrapperStyles} onMouseOver={onMouseOver} onMouseOut={onMouseOut}>
      {instruction?.operation === 'reorder-before' && (
        <LineIndicator position="top" />
      )}
      <EuiPanel
        css={panelStyles}
        panelRef={ref}
        color={level % 2 ? 'plain' : 'subdued'}
        hasShadow={false}
        borderRadius="m"
        grow={false}
      >
        <EuiAccordion
          arrowDisplay="none"
          css={accordionStyles}
          id={id}
          forceState={isExpanded ? 'open' : 'closed'}
          onToggle={setIsExpanded}
          /*
           * We render plain `EuiIcon`, not interactive `EuiButtonIcon`,
           * and let the underlying button handle the (un)collapse behavior.
           * See: https://eui.elastic.co/docs/components/containers/accordion/#interactive-content-in-the-trigger
           */
          buttonContent={
            <span css={headerStyles}>
              <span css={[iconStyles, grabIconStyles]}>
                <EuiIcon type="grab" />
              </span>
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
        <LineIndicator position="bottom" />
      )}
    </div>
  );
});

export default () => {
  const { euiTheme } = useEuiTheme();

  const [items, setItems] = useState<Tree>(initialData);

  useEffect(() => {
    return monitorForElements({
      onDrop({ source, location }) {
        const target = location.current.dropTargets[0];

        if (!target) return;

        const sourceId = source.data.id as string;
        const targetId = target.data.id as string;

        if (sourceId === targetId) return;

        const instruction: Instruction | null = extractInstruction(target.data);

        if (!instruction) return;
        if (instruction.blocked) return;

        const itemToMove = findItem(items, sourceId);
        if (!itemToMove) return;

        let updatedTree = removeItem(items, sourceId);

        if (instruction.operation === 'combine') {
          updatedTree = insertChild(updatedTree, targetId, itemToMove);
        } else if (instruction.operation === 'reorder-before') {
          updatedTree = insertBefore(updatedTree, targetId, itemToMove);
        } else if (instruction.operation === 'reorder-after') {
          updatedTree = insertAfter(updatedTree, targetId, itemToMove);
        }

        setItems(updatedTree);
      },
    });
  }, [items]);

  const wrapperStyles = css`
    background-color: ${euiTheme.colors.backgroundBasePlain};
    display: flex;
    flex-direction: column;
    gap: ${euiTheme.size.s};
    min-height: 100%;
    padding: ${euiTheme.size.base};
  `;

  return (
    <div css={wrapperStyles}>
      {items.map((item, index) => (
        <DraggablePanel key={item.id} index={index} {...item} />
      ))}
    </div>
  );
};
