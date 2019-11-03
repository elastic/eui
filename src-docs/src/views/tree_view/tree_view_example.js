import React from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import { EuiCode, EuiTreeView } from '../../../../src/components';
import { EuiTreeViewNode } from './tree_view_props';
import { TreeView } from './tree_view';
import { TreeViewCompressed } from './compressed';

const treeViewSource = require('!!raw-loader!./tree_view');
const treeViewHtml = renderToHtml(TreeView);

const treeViewCompressedSource = require('!!raw-loader!./compressed');
const treeViewCompressedHtml = renderToHtml(TreeViewCompressed);

export const TreeViewExample = {
  title: 'Tree View',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: treeViewSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: treeViewHtml,
        },
      ],
      text: (
        <div>
          <p>
            <EuiCode>EuiTreeView</EuiCode> allows you to render recursive
            objects, such as a file directory. The <EuiCode>chilldren</EuiCode>{' '}
            prop takes an array of <EuiCode>nodes</EuiCode>.
          </p>
          <p>
            Keyboard navigation allows users to navigate and interact with the
            tree using the arrow keys, spacebar, and return.
          </p>
          <p>
            The <EuiCode>icon</EuiCode> prop accepts <EuiCode>EuiIcon</EuiCode>{' '}
            and <EuiCode>EuiToken</EuiCode> as react nodes. You can also
            specifiy a different icon for the open state with the{' '}
            <EuiCode>iconWhenExpanded</EuiCode> prop.
          </p>
        </div>
      ),
      components: { EuiTreeView },
      demo: <TreeView />,
      props: { EuiTreeView, EuiTreeViewNode },
    },
    {
      title: 'Optional styling',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: treeViewCompressedSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: treeViewCompressedHtml,
        },
      ],
      text: (
        <div>
          <p>
            <EuiCode>EuiTreeView</EuiCode> supports a compressed mode with the{' '}
            <EuiCode>display=&quot;compressed&quot;</EuiCode> setting. When
            using the compressed version it&apos;s highly recommended to use the
            small size of <EuiCode>EuiIcon</EuiCode> and the extra small size of{' '}
            <EuiCode>EuiToken</EuiCode>. This will help prevent awkard alignment
            issues when used alongside the{' '}
            <EuiCode>showExpansionArrows</EuiCode> prop.
          </p>
          <p>
            The <EuiCode>showExpansionArrows</EuiCode> prop provides an
            additional visual indicator. Ideal for when a tree&apos;s items use
            icons that don&apos;t immediately let a user know that there are
            nested nodes that may not be visible.
          </p>
          <p>
            In some cases, you may want to automatically expand all the items
            with children. In those instances, you can use the{' '}
            <EuiCode>expandByDefault</EuiCode> prop, as seen in the example
            below.
          </p>
        </div>
      ),
      components: { EuiTreeView },
      demo: <TreeViewCompressed />,
      props: { EuiTreeView, EuiTreeViewNode },
    },
  ],
};
