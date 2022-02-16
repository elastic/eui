import React from 'react';

import { GuideSectionTypes } from '../../components';
import { EuiCode } from '../../../../src/components';

import IsDetailsPopover from './cell_popover_is_details';
const IsDetailsPopoverSource = require('!!raw-loader!./cell_popover_is_details');

import RenderCellPopover from './cell_popover_rendercellpopover';
const renderCellPopoverSource = require('!!raw-loader!./cell_popover_rendercellpopover');

import IsExpandablePopover from './cell_popover_is_expandable';
const isExpandablePopoverSource = require('!!raw-loader!./cell_popover_is_expandable');

import {
  EuiDataGridCellPopoverElementProps,
  EuiDataGridCellValueElementProps,
  EuiDataGridColumn,
} from '!!prop-loader!../../../../src/components/datagrid/data_grid_types';

export const DataGridCellPopoverExample = {
  title: 'Data grid cell popovers',
  sections: [
    {
      title: 'Conditionally customizing cell popover content',
      text: (
        <>
          <p>
            Cell popover content values can be conditionally customized using
            the <EuiCode>isDetails</EuiCode> flag passed to{' '}
            <EuiCode>renderCellValue</EuiCode>. If you need basic customization
            of cell popover values based on, e.g. schema or column, this is the
            most straightforward approach.
          </p>
          <p>
            By default, all cell popover contents are rendered with an{' '}
            <strong>EuiText</strong> wrapper, and cell actions are rendered
            within an <strong>EuiPopoverFooter</strong> as{' '}
            <strong>EuiEmptyButton</strong>s. Columns with a{' '}
            <EuiCode>json</EuiCode> schema will additionally have an automatic
            formatter that indents and displays the popover content within an{' '}
            <strong>EuiCodeBlock</strong>.
          </p>
        </>
      ),
      demo: <IsDetailsPopover />,
      components: { IsDetailsPopover },
      source: [
        {
          type: GuideSectionTypes.TSX,
          code: IsDetailsPopoverSource,
        },
      ],
      props: {
        EuiDataGridCellValueElementProps,
      },
    },
    {
      title: 'Completely customizing cell popover rendering',
      text: (
        <>
          <p>
            If you want complete control over the rendering of the entire cell
            popover, use the <EuiCode>renderCellPopover</EuiCode> prop to pass a
            functional component. This allows you to do things like set your own
            wrappers and replace the default cell actions with your own.
          </p>
          <p>
            To make falling back to atoms of the default cell popover easier,
            several props are passed to your custom{' '}
            <EuiCode>renderCellPopover</EuiCode> function:
          </p>
          <ul>
            <li>
              <EuiCode>children</EuiCode> - the direct JSX output of the
              cell&apos;s returned <EuiCode>renderCellValue</EuiCode>. It can be
              used (e.g.) if you want a custom wrapper or cell actions, but
              default popover content.
            </li>
            <li>
              <EuiCode>cellContentsElement</EuiCode> - a direct reference to the
              cell&apos;s HTML content node, which allows accessing the
              cell&apos;s <EuiCode>innerText</EuiCode> for cases where raw
              non-JSX text is useful (e.g. copying).
            </li>
            <li>
              <EuiCode>cellActions</EuiCode> - the direct JSX output of the
              default popover footer and buttons. Use this prop if you want
              custom popover content but default cell actions.
            </li>
            <li>
              <EuiCode>DefaultCellPopover</EuiCode> - the default popover
              component. Use this component if you only want custom popover
              content for certain schemas or columns and default popover
              rendering for other cells.
            </li>
          </ul>
          <p>
            Take a look at the below example&apos;s demo code to see the above
            props in action.
          </p>
        </>
      ),
      components: { RenderCellPopover },
      demo: <RenderCellPopover />,
      source: [
        {
          type: GuideSectionTypes.TSX,
          code: renderCellPopoverSource,
        },
      ],
      props: {
        EuiDataGridCellPopoverElementProps,
      },
    },
    {
      title: 'Disabling cell expansion popovers',
      text: (
        <p>
          Popovers can sometimes be unnecessary for short form content. In the
          example below we&apos;ve turned them off by setting{' '}
          <EuiCode>isExpandable=false</EuiCode> on specific{' '}
          <EuiCode>columns</EuiCode>.
        </p>
      ),
      demo: <IsExpandablePopover />,
      components: { IsExpandablePopover },
      source: [
        {
          type: GuideSectionTypes.TSX,
          code: isExpandablePopoverSource,
        },
      ],
      props: {
        EuiDataGridColumn,
      },
    },
  ],
};
