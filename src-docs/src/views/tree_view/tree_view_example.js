import React from 'react';
import { Link } from 'react-router-dom';

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

const treeViewSnippet = [
  `<EuiTreeView 
  items={[
    {
      label: 'Item One',
      id: 'item_one', 
      icon: <EuiIcon type="arrowRight" />,
      iconWhenExpanded: <EuiIcon type="arrowDown" />,
      isExpanded: true,
      children: [
        {
          label: 'Item A',
          id: 'item_a',
          icon: <EuiIcon type="document" />,
        },
        {
          label: 'Item B',
          id: 'item_b',
          icon: <EuiIcon type="document" />,
        },
      ],
    },
    {
      label: 'Item Two',
      id: 'item_two',
    }
  ]}  
/>`,
];

export const TreeViewExample = {
  title: 'Tree view',
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
            <strong>EuiTreeView</strong> allows you to render recursive objects,
            such as a file directory. The <EuiCode>children</EuiCode> prop takes
            an array of <EuiCode>nodes</EuiCode>.
          </p>
          <p>
            Keyboard navigation allows users to navigate and interact with the
            tree using the arrow keys, spacebar, and return.
          </p>
          <p>
            The <EuiCode>icon</EuiCode> prop accepts any{' '}
            <Link to="/display/icons">icon or token</Link>. You can also
            specifiy a different icon for the open state with the{' '}
            <EuiCode>iconWhenExpanded</EuiCode> prop.
          </p>
        </div>
      ),
      components: { EuiTreeView },
      demo: <TreeView />,
      snippet: treeViewSnippet,
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
            <strong>EuiTreeView</strong> supports a compressed mode with the{' '}
            <EuiCode language="js">{'display="compressed"'}</EuiCode> setting.
            When using the compressed version it&apos;s highly recommended to
            use the small size of <strong>EuiIcon</strong> and the extra small
            size of <strong>EuiToken</strong>. This will help prevent awkard
            alignment issues when used alongside the{' '}
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
          <p>
            Lastly, each node can also accept a custom{' '}
            <EuiCode>className</EuiCode> should you need to style them
            individually.
          </p>
        </div>
      ),
      components: { EuiTreeView },
      demo: <TreeViewCompressed />,
      props: { EuiTreeView, EuiTreeViewNode },
    },
  ],
};
