export function flattenPanelTree(tree: any, array: any[] = []) {
  array.push(tree);

  if (tree.items) {
    tree.items.forEach((item: any) => {
      if (item.panel) {
        flattenPanelTree(item.panel, array);
        item.panel = item.panel.id;
      }
    });
  }

  return array;
}
