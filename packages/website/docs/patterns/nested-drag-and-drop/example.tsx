import {
  memo,
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
} from 'react';
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
  EuiButtonIcon,
  EuiContextMenu,
  EuiIcon,
  EuiPanel,
  EuiPopover,
  EuiText,
  useEuiTheme,
  useGeneratedHtmlId,
} from '@elastic/eui';

interface TreeItem {
  id: string;
  title: string;
  children?: TreeItem[];
  isBlocked?: boolean;
}

type Tree = TreeItem[];

/**
 * In order for the nested drag and drop pattern to work flawlessly,
 * make sure your data has unique and stable `id` that you can use for
 * the `key` prop when mapping children.
 *
 * DO NOT use indices!
 */
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

const findParent = (items: Tree, itemId: string): TreeItem | undefined => {
  for (const item of items) {
    if (item.children?.some((child) => child.id === itemId)) return item;

    if (item.children) {
      const parent = findParent(item.children, itemId);

      if (parent) return parent;
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

const moveItem = (
  items: Tree,
  itemId: string,
  direction: 'up' | 'down'
): Tree => {
  const recursiveMove = (currentItems: Tree): Tree => {
    const index = currentItems.findIndex((i) => i.id === itemId);
    if (index !== -1) {
      if (direction === 'up') {
        if (index === 0) return currentItems;
        const newItems = [...currentItems];
        [newItems[index - 1], newItems[index]] = [
          newItems[index],
          newItems[index - 1],
        ];
        return newItems;
      } else {
        if (index === currentItems.length - 1) return currentItems;
        const newItems = [...currentItems];
        [newItems[index], newItems[index + 1]] = [
          newItems[index + 1],
          newItems[index],
        ];
        return newItems;
      }
    }

    return currentItems.map((item) => {
      if (item.children) {
        const newChildren = recursiveMove(item.children);
        if (newChildren !== item.children) {
          return { ...item, children: newChildren };
        }
      }
      return item;
    });
  };

  return recursiveMove(items);
};

const getDescendantIds = (item: TreeItem): string[] => {
  let ids: string[] = [];

  if (item.children) {
    for (const child of item.children) {
      ids.push(child.id);
      ids = ids.concat(getDescendantIds(child));
    }
  }

  return ids;
};

interface LineIndicatorProps {
  position: 'top' | 'bottom';
}

const LineIndicator = ({ position }: LineIndicatorProps) => {
  const { euiTheme } = useEuiTheme();

  const indicatorStyles = css`
    position: absolute;
    left: 0;
    right: 0;
    height: ${euiTheme.size.xxs};
    background-color: ${euiTheme.colors.borderStrongAccentSecondary};
    pointer-events: none;
    border-radius: 1px;
  `;

  const topIndicatorStyles = css`
    ${indicatorStyles}
    top: -${euiTheme.size.xs};
    transform: translateY(-50%);
  `;

  const bottomIndicatorStyles = css`
    ${indicatorStyles}
    bottom: -${euiTheme.size.xs};
    transform: translateY(50%);
  `;

  return (
    <div
      css={position === 'top' ? topIndicatorStyles : bottomIndicatorStyles}
    />
  );
};

const EXPAND_ON_HOVER_TIME = 300;

interface DraggablePanelProps extends TreeItem {
  index: number;
  level?: number;
  activeId: string;
  setActiveId: (id: string) => void;
  onMove: (id: string, direction: 'up' | 'down' | 'indent' | 'outdent') => void;
  isFirst: boolean;
  isLast: boolean;
}

const DraggablePanel = memo(function DraggablePanel({
  children,
  id,
  index,
  isBlocked,
  level = 0,
  title,
  activeId,
  setActiveId,
  onMove,
  isFirst,
  isLast,
}: DraggablePanelProps) {
  const { euiTheme } = useEuiTheme();

  const ref = useRef<HTMLDivElement | null>(null);
  const expandTimeout = useRef<ReturnType<typeof setTimeout>>();

  const buttonId = useGeneratedHtmlId({ prefix: id, suffix: 'button' });

  const [isExpanded, setIsExpanded] = useState(true);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [instruction, setInstruction] = useState<Instruction | null>(null);

  const hasChildren = useMemo(() => {
    return !!children?.length;
  }, [children]);

  /**
   * Handle the keyboard navigation in accordance with the Tree view a11y pattern.
   *
   * See: @{link https://www.w3.org/WAI/ARIA/apg/patterns/treeview/}.
   */
  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    const target = e.currentTarget;

    const getTreeItems = () => {
      const tree = target.closest('[data-list]');
      if (!tree) return [];
      return Array.from(
        tree.querySelectorAll<HTMLElement>('[data-item]')
      ).filter((el) => !el.closest('[inert]'));
    };

    switch (e.key) {
      case 'ArrowDown': {
        e.preventDefault();
        const treeItems = getTreeItems();
        const currentIndex = treeItems.indexOf(target);
        const next = treeItems[currentIndex + 1];
        if (next) next.focus();
        break;
      }
      case 'ArrowUp': {
        e.preventDefault();
        const treeItems = getTreeItems();
        const currentIndex = treeItems.indexOf(target);
        const prev = treeItems[currentIndex - 1];
        if (prev) prev.focus();
        break;
      }
      case 'Home': {
        e.preventDefault();
        const treeItems = getTreeItems();
        if (treeItems.length > 0) treeItems[0].focus();
        break;
      }
      case 'End': {
        e.preventDefault();
        const treeItems = getTreeItems();
        if (treeItems.length > 0) treeItems[treeItems.length - 1].focus();
        break;
      }
      case 'ArrowRight': {
        e.preventDefault();
        if (hasChildren) {
          if (!isExpanded) {
            setIsExpanded(true);
          } else {
            const treeItems = getTreeItems();
            const currentIndex = treeItems.indexOf(target);
            const next = treeItems[currentIndex + 1];
            if (next) next.focus();
          }
        }
        break;
      }
      case 'ArrowLeft': {
        e.preventDefault();
        if (hasChildren && isExpanded) {
          setIsExpanded(false);
        } else {
          const parentList = target.closest('ul[data-group]');
          const parentId = parentList?.getAttribute('aria-labelledby');
          if (parentId) {
            const parentEl = document.getElementById(parentId);
            parentEl?.focus();
          }
        }
        break;
      }
    }
  };

  /*
   * Auto-expand accordion on having dropped an element.
   */
  useEffect(() => {
    if (hasChildren) setIsExpanded(true);
  }, [hasChildren]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const cancelExpand = () => {
      clearTimeout(expandTimeout.current);
      expandTimeout.current = undefined;
    };

    const reset = () => {
      setInstruction(null);
      cancelExpand();
    };

    /*
     * `draggable` enables the dragging of an element.
     * See: https://atlassian.design/components/pragmatic-drag-and-drop/core-package/adapters/element/about#draggable
     *
     * `dropTargetForElements` makes an element a drop target.
     * See: https://atlassian.design/components/pragmatic-drag-and-drop/core-package/adapters/element/about#drop-target-for-elements
     *
     * `combine` is a utility that enables both behaviors.
     * See: https://atlassian.design/components/pragmatic-drag-and-drop/core-package/utilities#combine
     */
    const cleanup = combine(
      draggable({
        element: el,
        getInitialData: () => ({
          id,
          index,
          descendantIds: getDescendantIds({ id, children, title }),
        }),
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
                combine: isBlocked ? 'not-available' : 'available',
                'reorder-before': 'available',
                'reorder-after': 'available',
              },
            }
          ),
        canDrop: ({ source }) => {
          const descendantIds = source.data.descendantIds as string[];
          return !descendantIds.includes(id);
        },
        onDrag: ({ self, location }) => {
          const newInstruction = extractInstruction(self.data);
          const isInnerMost =
            location.current.dropTargets[0]?.element === self.element;
          const isNesting = newInstruction?.operation === 'combine';

          /*
           * When you hover over a deeply nested child, you are technically
           * hovering over its parent and grandparent too. Without this check
           * you would see group and line indicators for the entire tree branch.
           * We only update the `instruction` state if the element is innermost.
           */
          if (isInnerMost) {
            const newInstruction = extractInstruction(self.data);
            setInstruction(newInstruction);

            if (
              isNesting &&
              hasChildren &&
              !isExpanded &&
              !expandTimeout.current
            ) {
              expandTimeout.current = setTimeout(() => {
                setIsExpanded(true);
                expandTimeout.current = undefined;
              }, EXPAND_ON_HOVER_TIME);
            } else if (!isNesting) {
              cancelExpand();
            }
          } else {
            reset();
          }
        },
        onDragLeave: reset,
        onDrop: reset,
      })
    );

    return () => {
      cleanup();
      cancelExpand();
    };
  }, [id, index, children, level, title, isExpanded, isBlocked]);

  /**
   * Necessary styles for absolutely-positioned line indicators.
   */
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
    box-shadow: ${instruction?.operation === 'combine'
      ? `inset 0 0 0 1px ${euiTheme.colors.borderStrongAccentSecondary}`
      : 'none'};
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
   * Grab icon gives affordance to the draggable elements.
   */
  const grabIconStyles = css`
    svg {
      fill: ${euiTheme.colors.textDisabled};
    }
  `;

  /**
   * Gap between the accordion header and accordion content.
   */
  const groupStyles = css`
    padding-top: ${euiTheme.size.m};
  `;

  const childrenWrapperStyles = css`
    ${isExpanded && hasChildren && groupStyles}
    display: flex;
    flex-direction: column;
    gap: ${euiTheme.size.s};
  `;

  const buttonStyles = css`
    &:hover .grab-icon {
      svg {
        fill: ${euiTheme.colors.textParagraph};
      }
    }
  `;

  const buttonContentStyles = css`
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
    <li css={wrapperStyles}>
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
          buttonProps={{
            id: buttonId,
            css: buttonStyles,
            'data-item': true,
            onKeyDown: handleKeyDown,
            tabIndex: activeId === id ? 0 : -1,
            onFocus: () => setActiveId(id),
          }}
          extraAction={
            <EuiPopover
              panelPaddingSize="none"
              isOpen={isPopoverOpen}
              closePopover={() => setIsPopoverOpen(false)}
              button={
                <EuiButtonIcon
                  aria-label="More actions"
                  iconType="boxesHorizontal"
                  onClick={(prevState) => setIsPopoverOpen(!prevState)}
                />
              }
            >
              <EuiContextMenu
                initialPanelId={0}
                panels={[
                  {
                    id: 0,
                    items: [
                      {
                        name: 'Move up',
                        icon: 'arrowUp',
                        onClick: () => {
                          onMove(id, 'up');
                          setIsPopoverOpen(false);
                        },
                        disabled: isFirst,
                      },
                      {
                        name: 'Move down',
                        icon: 'arrowDown',
                        onClick: () => {
                          onMove(id, 'down');
                          setIsPopoverOpen(false);
                        },
                        disabled: isLast,
                      },
                      {
                        name: 'Indent',
                        icon: 'arrowRight',
                        onClick: () => {
                          onMove(id, 'indent');
                          setIsPopoverOpen(false);
                        },
                        disabled: isFirst,
                      },
                      {
                        name: 'Outdent',
                        icon: 'arrowLeft',
                        onClick: () => {
                          onMove(id, 'outdent');
                          setIsPopoverOpen(false);
                        },
                        disabled: level === 0,
                      },
                    ],
                  },
                ]}
              />
            </EuiPopover>
          }
          /*
           * We render plain `EuiIcon`, not interactive `EuiButtonIcon`,
           * and let the underlying button handle the (un)collapse behavior.
           * See: https://eui.elastic.co/docs/components/containers/accordion/#interactive-content-in-the-trigger
           */
          buttonContent={
            <span css={buttonContentStyles}>
              <span className="grab-icon" css={[iconStyles, grabIconStyles]}>
                <EuiIcon type="grab" />
              </span>
              {hasChildren && (
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
          <ul css={childrenWrapperStyles} aria-labelledby={buttonId} data-group>
            {children?.map((child, index) => (
              <DraggablePanel
                key={child.id}
                index={index}
                level={level + 1}
                activeId={activeId}
                setActiveId={setActiveId}
                onMove={onMove}
                isFirst={index === 0}
                isLast={index === (children || []).length - 1}
                {...child}
              />
            ))}
          </ul>
        </EuiAccordion>
      </EuiPanel>
      {instruction?.operation === 'reorder-after' && (
        <LineIndicator position="bottom" />
      )}
    </li>
  );
});

export default () => {
  const { euiTheme } = useEuiTheme();

  const [items, setItems] = useState<Tree>(initialData);
  const [activeId, setActiveId] = useState<string>(initialData[0].id);

  useEffect(() => {
    /*
     * Monitors listen to all events for a draggable entity.
     * See: https://atlassian.design/components/pragmatic-drag-and-drop/core-package/monitors
     */
    return monitorForElements({
      onDrop({ source, location }) {
        /**
         * The inner-most drop target. We look from the deepest possible
         * drop target upwards.
         * See: https://atlassian.design/components/pragmatic-drag-and-drop/core-package/drop-targets#nested-drop-targets
         */
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

        /*
         * `@atlaskit/pragmatic-drag-and-drop-hitbox` calculates the user intent.
         * We can get that user intent using `extractInstruction`.
         *
         * The type of operation can be:
         * - `combine` - it means that the user is hovering over the center of a drop target.
         * - `reorder-before` - it means that the user is hovering close to the upper edge of a drop target.
         * - `reorder-after` - it means that the user is hovering close to the lower edge of a drop target.
         *
         * See: https://atlassian.design/components/pragmatic-drag-and-drop/optional-packages/hitbox/about
         */
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

  const handleMove = (
    id: string,
    direction: 'up' | 'down' | 'indent' | 'outdent'
  ) => {
    setItems((items) => {
      const itemToMove = findItem(items, id);

      if (!itemToMove) return items;

      if (direction === 'up' || direction === 'down')
        return moveItem(items, id, direction);

      if (direction === 'outdent') {
        const parent = findParent(items, id);
        if (!parent) return items;

        const newItems = removeItem(items, id);

        return insertAfter(newItems, parent.id, itemToMove);
      }

      if (direction === 'indent') {
        const findPrevSibling = (currentItems: Tree): TreeItem | undefined => {
          const index = currentItems.findIndex((i) => i.id === id);

          if (index !== -1)
            return index > 0 ? currentItems[index - 1] : undefined;

          for (const item of currentItems) {
            if (item.children) {
              const found = findPrevSibling(item.children);

              if (found) return found;
            }
          }
        };

        const prevSibling = findPrevSibling(items);
        if (!prevSibling) return items;

        const newItems = removeItem(items, id);
        return insertChild(newItems, prevSibling.id, itemToMove);
      }

      return items;
    });
  };

  const wrapperStyles = css`
    background-color: ${euiTheme.colors.backgroundBasePlain};
    display: flex;
    flex-direction: column;
    gap: ${euiTheme.size.s};
    min-height: 100%;
    padding: ${euiTheme.size.base};
  `;

  return (
    <ul css={wrapperStyles} aria-label="Nested drag and drop panels" data-list>
      {items.map((item, index) => (
        <DraggablePanel
          key={item.id}
          index={index}
          activeId={activeId}
          setActiveId={setActiveId}
          onMove={handleMove}
          isFirst={index === 0}
          isLast={index === items.length - 1}
          {...item}
        />
      ))}
    </ul>
  );
};
