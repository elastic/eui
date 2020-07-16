import React from 'react';
import { Link } from 'react-router-dom';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import {
  EuiCode,
  EuiContextMenu,
  EuiContextMenuPanel,
  EuiContextMenuItem,
} from '../../../../src/components';

import ContextMenu from './context_menu';
const contextMenuSource = require('!!raw-loader!./context_menu');
const contextMenuHtml = renderToHtml(ContextMenu);

import SinglePanel from './single_panel';
const singlePanelSource = require('!!raw-loader!./single_panel');
const singlePanelHtml = renderToHtml(SinglePanel);

import ContentPanel from './content_panel';
const contentPanelSource = require('!!raw-loader!./content_panel');
const contentPanelHtml = renderToHtml(ContentPanel);

import ContextMenuWithContent from './context_menu_with_content';
const contextMenuWithContentSource = require('!!raw-loader!./context_menu_with_content');
const contextMenuWithContentHtml = renderToHtml(ContextMenuWithContent);

export const ContextMenuExample = {
  title: 'Context menu',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: contextMenuSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: contextMenuHtml,
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
      props: { EuiContextMenu, EuiContextMenuPanel, EuiContextMenuItem },
      demo: <ContextMenu />,
    },
    {
      title: 'With single panel',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: singlePanelSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: singlePanelHtml,
        },
      ],
      text: (
        <p>
          Context menus can be used for simple, non-nested menus as well. The
          below pagination example has no nesting and no title.
        </p>
      ),
      demo: <SinglePanel />,
    },
    {
      title: 'Displaying custom elements',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: contentPanelSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: contentPanelHtml,
        },
      ],
      text: (
        <p>
          If you have custom content to show instead of a list of options, you
          can pass a React element as a child to{' '}
          <strong>EuiContextMenuPanel</strong>.
        </p>
      ),
      demo: <ContentPanel />,
    },
    {
      title: 'Using panels with mixed items & content',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: contextMenuWithContentSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: contextMenuWithContentHtml,
        },
      ],
      text: (
        <div>
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
        </div>
      ),
      demo: <ContextMenuWithContent />,
    },
  ],
};
