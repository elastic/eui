import React from 'react';
import { Link } from 'react-router';

import { renderToHtml } from '../../services';

import {
  GuideSectionTypes,
} from '../../components';

import {
  EuiCode, EuiText, EuiTitle, EuiCallOut, EuiSpacer
} from '../../../../src/components';

import FullFeatured from './full_featured';
const fullFeaturedSource = require('!!raw-loader!./full_featured');
const fullFeaturedHtml = renderToHtml(FullFeatured);

import ImplicitRecordActionsTable from './implicit_record_action';
const implicitRecordActionSource = require('!!raw-loader!./implicit_record_action');
const implicitRecordActionHtml = renderToHtml(ImplicitRecordActionsTable);

import ColumnDataTypes from './column_data_types';
import { propsInfo } from './props_info';
const columnRenderersSource = require('!!raw-loader!./column_data_types');
const columnRenderersHtml = renderToHtml(ColumnDataTypes);

export const TableOfRecordsExample = {
  title: 'Table Of Records',
  intro: (
    <EuiText>
      <EuiCallOut color="danger" iconType="alert" title="Do not use. This is a depricated feature.">
        <EuiCode>EuiTableOfRecords</EuiCode> should no longer be used. Instead, use
        the <EuiCode>EuiBasicTable</EuiCode> as <Link to="/display/tables">documented here</Link>. We plan
        to remove this component from EUI fairly soon.
      </EuiCallOut>
      <EuiTitle>
        <h2>TableOfRecords</h2>
      </EuiTitle>
      <p>
        <EuiCode>EuiTableOfRecords</EuiCode> is a high level component that aims to simplify and unifiy the way
        one creates a table of... (wait for it....) records!!!
      </p>
      <EuiCallOut iconType="questionInCircle" title="What is a High Level Component?">
        The goal of a high level components is to make the consumer not think about design or UX/UI behaviour.
        Instead, the consumer only need to define the functional requirements - features of the component (in
        this case, table), the data, and the type of interaction the user should have with it. Through high level
        components, Eui can promote best/common UI practices and patterns.

        High level components are as stateless as they can possibly be. Meaning, all the management of the data
        (e.g. where is it coming from, how is it loaded, how is it filtered, etc...) is expected to be done
        externally to this component. Typically one would use a container component to wrap around this component
        that will either manage this state internally, or use other state stores (e.g. such as Redux).
      </EuiCallOut>
      <EuiSpacer size="l" />
      <EuiCallOut iconType="questionInCircle" title="What is a Record?">
        Think of a record in a data store - typically it represents an entity with a very clear
        schema and is something that can be presented in a tabular form.
      </EuiCallOut>
      <EuiSpacer size="l" />
      <p>
        The <EuiCode>EuiTableOfRecords</EuiCode> accepts two required properties:
      </p>
      <ul>
        <li>
          <EuiCode>config</EuiCode> - This is the configuration of the table. It provides all information the
          table needs to render its records.
        </li>
        <li>
          <EuiCode>model</EuiCode> - This object provides the table two things - the <b>data</b> (the records that
          should be shown), and the <b>criteria</b> of the data. The criteria effectively describes what data is
          show and how it was collected.
        </li>
      </ul>
      <EuiSpacer size="l" />
    </EuiText>
  ),
  sections: [
    {
      title: 'Full Featured Example',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: fullFeaturedSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: fullFeaturedHtml,
        }
      ],
      text: (
        <div>
          <p>
            The following example shows ToR in its full glory:
          </p>
          <ul>
            <li>
              <strong>Pagination</strong> - enabled when the provided model specifies the pagination criteria (i.e.
              <EuiCode>model.criteria.page.index</EuiCode> and <EuiCode>model.criteria.page.size</EuiCode>)
            </li>
            <li>
              <strong>Sorting</strong> - enabled when any of the columns is configured to be <EuiCode>sortable: true</EuiCode>
            </li>
            <li>
              <strong>Selection</strong> - enabled when the selection is configured on the <EuiCode>config</EuiCode> (i.e.
              <EuiCode>config.selection.onSelectionChanged?</EuiCode>, <EuiCode>selectable?</EuiCode> and
              <EuiCode>config.selection.selectableMessage?</EuiCode>)
            </li>
            <li>
              <strong>Custom Column Rendering</strong> - You can customize how the data is displayed in each column by
              specifying a renderer for that column. You can also specify the data type for that column (this will serve
              as a rendering hint for the table, such that it&apos;ll choose the most suitable rendering defaults for the
              data type).
            </li>
            <li>
              <strong>Record Level Actions</strong> - Actions that are associated with each records. A single action
              will be rendered at the last column of each row and will appear when hovering over the row. Multiple
              actions will &quot;folded&quot; into a menu popup.
            </li>
          </ul>
        </div>
      ),
      props: propsInfo,
      demo: <FullFeatured />
    },
    {
      title: 'Computed Columns and "Implicit" Record Actions',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: implicitRecordActionSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: implicitRecordActionHtml,
        }
      ],
      text: (
        <div>
          <p>
            Event though the table tries to dictate our common design patterns rules, at times these rules
            need to be broken for good reaosns. For example, there can be a valid use case for having muliple
            controls visible all the time (that is, not collapsed into a popover).
          </p>
          <p>
            You can achieve this by using custom columnRenderers. The following example, enables switching the online/offline
            status of a person. Also note how listening to selection state changes enables us to follow the design
            guidelines and disable these switches when selection is on.
          </p>
          <p>
            As a bonus, we show how you can define a <EuiCode>computed</EuiCode> column that is not associated with any
            specific record key and simply renders content that is computed/derived out of the record itself (here we
            added a small little icon column that shows the user icon that is colored based on the person&apos;s
            <EuiCode>online</EuiCode> status).
          </p>
        </div>
      ),
      demo: <ImplicitRecordActionsTable />
    },
    {
      title: 'Column data types',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: columnRenderersSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: columnRenderersHtml,
        }
      ],
      text: (
        <div>
          <p>
           You can specify a <EuiCode>dataType</EuiCode> property in your column configuration
           which will be used as the default format for rendering the data for each cell in
           that column.
          </p>
        </div>
      ),
      demo: <ColumnDataTypes />
    }
  ]
};
