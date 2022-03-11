import React, { Fragment } from 'react';

import { GuideSectionTypes } from '../../components';
import {
  EuiDataGrid,
  EuiCode,
  EuiCodeBlock,
  EuiSpacer,
} from '../../../../src/components';

import DataGridSchema from './schema/_grid';
const dataGridSchemaSource = require('!!raw-loader!./schema/_grid');

import DataGridFooterRow from './schema/footer_row';
const dataGridControlColumnsSource = require('!!raw-loader!./schema/footer_row');

import {
  EuiDataGridColumn,
  EuiDataGridPopoverContentProps,
  EuiDataGridSchemaDetector,
  EuiDataGridCellValueElementProps,
} from '!!prop-loader!../../../../src/components/datagrid/data_grid_types';

export const DataGridSchemaExample = {
  title: 'Data grid data',
  sections: [
    {
      title: 'Schemas',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: dataGridSchemaSource,
        },
      ],
      text: (
        <Fragment>
          <p>
            Schemas are data types you pass to grid columns to affect how the
            columns and expansion popovers render. Schemas also allow you to
            define individual sorting comparators so that sorts can do more than
            just A-Z comparisons. By default, <strong>EuiDataGrid</strong> ships
            with a few built-in schemas for{' '}
            <EuiCode>numeric, currency, datetime, boolean and json</EuiCode>{' '}
            data. When the <EuiCode>inMemory</EuiCode> prop is in use it will
            automatically try to figure out the best schema based on the{' '}
            <EuiCode language="js">{'inMemory:{{ level: value }}'}</EuiCode> you
            set, but this will come with the caveat that you will need to
            provide and manage sorting outside the component. In general we
            recommend passing schema information to your columns instead of
            using auto-detection when you have that knowledge of your data
            available during ingestion.
          </p>
          <h3>Defining custom schemas</h3>
          <p>
            Custom schemas are passed as an array to{' '}
            <EuiCode>schemaDetectors</EuiCode> and are constructed against the{' '}
            <strong>EuiDataGridSchemaDetector</strong> interface. You can see an
            example of a simple custom schema used on the last column below. In
            addition to schemas being useful to map against for cell and
            expansion rendering, any schema will also add a
            <EuiCode language="js">
              {'className="euiDataGridRowCell--schemaName"'}
            </EuiCode>{' '}
            to each matching cell.
          </p>
        </Fragment>
      ),
      demo: <DataGridSchema />,
      props: {
        EuiDataGrid,
        EuiDataGridColumn,
        EuiDataGridSchemaDetector,
      },
      snippet: `// The following schema 'franchise' essentially acts like a boolean, looking for Star Wars or Star Trek in a column.
schemaDetectors={[
  {
    type: 'franchise',
    // Try to detect if column data is this schema. A value of 1 is the highest possible. A (mean_average - standard_deviation) of .5 will be good enough for the autodetector to assign.
    detector(value) {
      return value.toLowerCase() === 'star wars' ||
        value.toLowerCase() === 'star trek'
        ? 1
        : 0;
    },
    // How we should sort data matching this schema. Again, a value of 1 is the highest value.
    comparator(a, b, direction) {
      const aValue = a.toLowerCase() === 'star wars';
      const bValue = b.toLowerCase() === 'star wars';
      if (aValue < bValue) return direction === 'asc' ? 1 : -1;
      if (aValue > bValue) return direction === 'asc' ? -1 : 1;
      return 0;
    },
    // Text for what the ASC sort does.
    sortTextAsc: 'Star Wars-Star Trek',
    // Text for what the DESC sort does.
    sortTextDesc: 'Star Trek-Star Wars',
    // EuiIcon or Prop to signify this schema.
    icon: 'star',
    // The color to use for the icon prop.
    color: '#000000',
  },
]}`,
    },
    {
      title: 'Expansion popovers',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: dataGridSchemaSource,
        },
      ],
      text: (
        <Fragment>
          <p>
            These popovers allow users to view the entire contents of a cell. By
            default, they are on for every column and every cell. There are
            three ways to customize these popovers.
          </p>
          <h3>Disabling</h3>
          <p>
            It is recommended to keep them on in case of truncation of cell
            contents. In the event you know that your cell contents is very
            short you can turn them off in the <EuiCode>columns</EuiCode>{' '}
            object.
          </p>
          <EuiCodeBlock language="js" paddingSize="s" isCopyable>
            {"columns={[{ id: 'boolean', isExpandable: false, }]}"}
          </EuiCodeBlock>
          <EuiSpacer />
          <p>
            In the example below we&apos;ve turned them off by setting{' '}
            <EuiCode language="js">isExpandable=false</EuiCode> on the{' '}
            <EuiCode>boolean</EuiCode>
            column.
          </p>
          <h3>
            Defining through <EuiCode>popoverContents</EuiCode>
          </h3>
          <p>
            Likewise, you can inject custom content into any of the popovers a
            cell expands into based on the <EuiCode>schema</EuiCode> for that
            column. Add <EuiCode>popoverContents</EuiCode> functions to populate
            a matching schema&apos;s popover using a new component.
          </p>
          <EuiCodeBlock language="js" paddingSize="s" isCopyable>
            {`popoverContents={{
  numeric: ({ cellContentsElement }) => {
    // process the already-rendered cell value
    const stringContents = cellContentsElement.textContent;
    return stringContents.something();
  },
}}`}
          </EuiCodeBlock>
          <p>
            You can see an example of this by clicking into one of the cells in
            the <EuiCode>numeric</EuiCode> column below.
          </p>
          <h3>
            Defining through <EuiCode>renderCellValue</EuiCode>
          </h3>
          <p>
            Another way to define expansion is through the{' '}
            <EuiCode>renderCellValue</EuiCode> prop which is a function that
            returns an object containing internal information about that cell
            including <EuiCode>isDetails</EuiCode>. When true, you can use this
            to return a React component to render inside of the expansion
            popover.{' '}
          </p>
          <EuiCodeBlock language="js" paddingSize="s" isCopyable>
            {`renderCellValue={({ rowIndex, columnId, isDetails }) => {
  const value = data[rowIndex][columnId];

  if (columnId === 'custom' && isDetails) {
    return <Custom name={value} />;
  }

  return value;
}}`}
          </EuiCodeBlock>
          <p>
            You can see an example of this by clicking into one of the cells in
            the <EuiCode>custom</EuiCode> column below.
          </p>
        </Fragment>
      ),
      props: {
        EuiDataGridSchemaDetector,
        EuiDataGrid,
        EuiDataGridCellValueElementProps,
        EuiDataGridPopoverContentProps,
      },
      demo: <DataGridSchema customPopover />,
    },
    {
      title: 'Footer row',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: dataGridControlColumnsSource,
        },
      ],
      text: (
        <Fragment>
          <p>
            A footer row can be used to include value aggregations to the grid.
            Values could be based on the dataset, such as sum/average/min/max of
            numeric values in a column, or any other necessary data.
          </p>
          <p>
            The footer row is defined by passing{' '}
            <EuiCode>renderFooterCellValue</EuiCode> function prop into{' '}
            <strong>EuiDataGrid</strong>.{' '}
            <EuiCode>renderFooterCellValue</EuiCode> acts like a React
            component, receiving{' '}
            <EuiCode>EuiDataGridCellValueElementProps</EuiCode> and returning a
            React node.
          </p>
          <EuiCodeBlock language="jsx" paddingSize="s" isCopyable>
            {`const footerCellValues = {
  // desired data
};

<EuiDataGrid
  {...usualProps}
  renderFooterCellValue={({ columnId }) =>
    footerCellValues[columnId] || null
  }
/>
`}
          </EuiCodeBlock>
        </Fragment>
      ),
      props: {
        EuiDataGrid,
        EuiDataGridCellValueElementProps,
      },
      demo: <DataGridFooterRow />,
    },
  ],
};
