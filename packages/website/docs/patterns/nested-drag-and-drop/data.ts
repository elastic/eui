export interface TreeItem {
  id: string;
  title: string;
  children?: TreeItem[];
}

export type Tree = TreeItem[];

export const initialData: Tree = [
  { id: 'panel-1', title: 'Panel 1' },
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
          { id: 'subpanel-3-1-2', title: 'Subpanel 3.1.2' },
        ],
      },
      { id: 'subpanel-3-2', title: 'Subpanel 3.2' },
    ],
  },
  { id: 'panel-4', title: 'Panel 4' },
];

export const findItem = (items: Tree, itemId: string): TreeItem | undefined => {
  for (const item of items) {
    if (item.id === itemId) return item;
    if (item.children) {
      const foundItem = findItem(item.children, itemId);
      if (foundItem) return foundItem;
    }
  }
};

export const removeItem = (items: Tree, itemId: string): Tree => {
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

export const insertChild = (
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

export const insertBefore = (
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

export const insertAfter = (
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
