import React from 'react';
import { Link } from 'react-router-dom';

import { GuideSectionTypes } from '../../components';

import {
  EuiCode,
  EuiContextMenu,
  EuiContextMenuItem,
  EuiContextMenuPanel,
} from '../../../../src/components';
import { EuiContextMenuPanelDescriptor } from '!!prop-loader!../../../../src/components/context_menu/context_menu';

import ContextMenu from './context_menu';
const contextMenuSource = require('!!raw-loader!./context_menu');
const contextMenuSnippet = `<EuiContextMenu
  initialPanelId={0}
  panels={[
    {
      id: 0,
      title: 'This is a context menu',
      items: [
        {
          name: 'Handle an onClick',
          icon: <EuiIcon type="search" size="m" />,
          onClick: () => {
            closePopover();
          },
        },
      ]
    }
  ]}
/>`;

import SinglePanel from './single_panel';
const singlePanelSource = require('!!raw-loader!./single_panel');
const singlePanelSnippet = `<EuiContextMenuPanel
  items={[
    <EuiContextMenuItem
      key=""
      onClick={}>
      This is a context menu item
    </EuiContextMenuItem>
  ]}
/>`;

import Small from './small';
const smallSizeSource = require('!!raw-loader!./small');
const smallSnippet = `<EuiContextMenuPanel
  size="s"
  items={items}
/>`;

import ContentPanel from './content_panel';
const contentPanelSource = require('!!raw-loader!./content_panel');
const contentPanelSnippet = `<EuiContextMenuPanel>
  <!-- React element as child -->
</EuiContextMenuPanel>
`;

import ContextMenuWithContent from './context_menu_with_content';
const contextMenuWithContentSource = require('!!raw-loader!./context_menu_with_content');

export const ContextMenuExample = {
  title: 'Context menu',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: contextMenuSource,
        },
      ],
      text: (
        <p>
          <strong>EuiContextMenu</strong> is a nested menu system useful for
          navigating complicated trees. It lives within an{' '}
          <Link to="/layout/popover">
            <strong>EuiPopover</strong>
          </Link>{' '}
          which itself can be wrapped around any component (like a button in
          this example).
        </p>
      ),
      props: {
        EuiContextMenu,
        EuiContextMenuPanelDescriptor,
        EuiContextMenuPanel,
        EuiContextMenuItem,
      },
      snippet: contextMenuSnippet,
      demo: <ContextMenu />,
    },
    {
      title: 'Sizes',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: smallSizeSource,
        },
      ],
      text: (
        <p>
          <strong>EuiContextMenu</strong> supports a small and medium{' '}
          <EuiCode>size</EuiCode>. The default size is medium,{' '}
          <EuiCode>m</EuiCode>, and should be used for most menus and major
          actions such as top application menus. Use the smaller size,{' '}
          <EuiCode>s</EuiCode>, for a more compressed version containing minor
          actions or repeated menus like in <strong>EuiTable</strong>{' '}
          pagination.
        </p>
      ),
      snippet: smallSnippet,
      demo: <Small />,
    },
    {
      title: 'With single panel',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: singlePanelSource,
        },
      ],
      text: (
        <p>
          Use <strong>EuiContextMenuPanel</strong> for simple, non-nested
          context menus. The below pagination example has no nesting and no
          title.
        </p>
      ),
      snippet: singlePanelSnippet,
      demo: <SinglePanel />,
    },
    {
      title: 'Displaying custom elements',
      source: [
        {
          type: GuideSectionTypes.TSX,
          code: contentPanelSource,
        },
      ],
      text: (
        <p>
          If you have custom content to show instead of a list of options, you
          can pass a React element as a child to{' '}
          <strong>EuiContextMenuPanel</strong>.
        </p>
      ),
      snippet: contentPanelSnippet,
      demo: <ContentPanel />,
    },
    {
      title: 'Using panels with mixed items & content',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: contextMenuWithContentSource,
        },
      ],
      text: (
        <>
          <p>
            Context menu panels can be passed React elements through the{' '}
            <EuiCode>content</EuiCode> prop instead of <EuiCode>items</EuiCode>.
            The panel will display your custom content without modification.
          </p>
          <p>
            If your panel contents have different widths or you need to ensure
            that a specific context menu panel has a certain width, add{' '}
            <EuiCode language="ts">width: [number of pixels]</EuiCode> to the
            panel tree.
          </p>
          <p>
            You can add separator lines in the <EuiCode>items</EuiCode> prop if
            you define an item as{' '}
            <EuiCode language="ts">{'{isSeparator: true}'}</EuiCode>. This will
            pass the rest of its fields as props to a{' '}
            <Link to="/layout/horizontal-rule">
              <strong>EuiHorizontalRule</strong>
            </Link>{' '}
            component.
          </p>
        </>
      ),
      demo: <ContextMenuWithContent />,
    },
  ],
};
