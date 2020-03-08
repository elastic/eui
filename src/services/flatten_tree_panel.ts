import {
  EuiContextMenuPanelDescriptor,
  EuiContextMenuPanelItemDescriptor,
} from '../components/context_menu/index';

type ItemIn = Omit<EuiContextMenuPanelItemDescriptor, 'panel'> & {
  panel?: PanelIn;
};

type PanelIn = Omit<EuiContextMenuPanelDescriptor, 'items'> & {
  items?: ItemIn[];
};

export function flattenPanelTree(
  tree: PanelIn,
  array: EuiContextMenuPanelDescriptor[] = []
) {
  array.push(tree);

  if (tree.items) {
    tree.items.forEach(item => {
      if (item.panel) {
        flattenPanelTree(item.panel, array);
        (item as EuiContextMenuPanelItemDescriptor).panel = item.panel.id;
      }
    });
  }

  return array;
}
