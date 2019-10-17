import React from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import { EuiCode, EuiRecursiveTree } from '../../../../src/components';
import { EuiRecursiveTreeNode } from './recursive_tree_props';
import { RecursiveTree } from './recursive_tree';
import { RecursiveTreeCondensed } from './condensed';

const recursiveTreeSource = require('!!raw-loader!./recursive_tree');
const recursiveTreeHtml = renderToHtml(RecursiveTree);

const recursiveTreeCondensedSource = require('!!raw-loader!./condensed');
const recursiveTreeCondensedHtml = renderToHtml(RecursiveTreeCondensed);

export const RecursiveTreeExample = {
  title: 'Recursive Tree',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: recursiveTreeSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: recursiveTreeHtml,
        },
      ],
      text: (
        <div>
          <p>
            <EuiCode>EuiRecursiveTree</EuiCode> allows you to render recursive
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
      components: { EuiRecursiveTree },
      demo: <RecursiveTree />,
      props: { EuiRecursiveTree, EuiRecursiveTreeNode },
    },
    {
      title: 'Condensed version',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: recursiveTreeCondensedSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: recursiveTreeCondensedHtml,
        },
      ],
      text: (
        <div>
          <p>
            <EuiCode>EuiRecursiveTree</EuiCode> supports a condensed mode with
            the <EuiCode>isCondensed</EuiCode> prop. When using the condensed
            version it&apos;s highly recommended to use the small size of{' '}
            <EuiCode>EuiIcon</EuiCode> and the extra small size of{' '}
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
        </div>
      ),
      components: { EuiRecursiveTree },
      demo: <RecursiveTreeCondensed />,
      props: { EuiRecursiveTree, EuiRecursiveTreeNode },
    },
  ],
};
