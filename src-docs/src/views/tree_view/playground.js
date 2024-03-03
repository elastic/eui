import { EuiTreeView, EuiIcon } from '../../../../src/components';
import { EuiTreeViewClass } from '../../../../src/components/tree_view/tree_view';
import {
  propUtilityForPlayground,
  generateCustomProps,
} from '../../services/playground';

export const TreeViewConfig = () => {
  const docgenInfo = Array.isArray(EuiTreeViewClass.__docgenInfo)
    ? EuiTreeViewClass.__docgenInfo[0]
    : EuiTreeViewClass.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  delete propsToUse.theme;

  propsToUse.display = {
    ...propsToUse.display,
    defaultValue: 'default',
  };

  propsToUse['aria-label'] = {
    ...propsToUse['aria-label'],
    value: 'Descriptive aria-label',
  };

  const items = `[
    {
      label: 'Item One',
      id: 'item_one',
      icon: <EuiIcon type="folderClosed" />,
      iconWhenExpanded: <EuiIcon type="folderOpen" />,
      children: [
        {
          label: 'Item A',
          id: 'item_a',
          icon: <EuiIcon type="document" />,
        },
      ],
    }
  ]`;

  propsToUse.items = {
    ...propsToUse.items,
    value: items,
  };

  return {
    config: {
      componentName: 'EuiTreeView',
      props: propsToUse,
      scope: {
        EuiTreeView,
        EuiIcon,
      },
      imports: {
        '@elastic/eui': {
          named: ['EuiTreeView', 'EuiIcon'],
        },
      },
      customProps: generateCustomProps(['items']),
    },
  };
};
