import React from 'react';

import { renderToHtml } from '../../services';

import {
  GuideSectionTypes,
} from '../../components';

import {
  EuiCode,
} from '../../../../src/components';

import Table from './table_of_records';
import PaginatedTable from './pagination';
import SelectableTable from './selection';
import CustomRenderingTable from './rendering';
import AdvanceRenderingTable from './advance_rendering';
import SingleRecordActionTable from './single_record_action';
import MultipleRecordActionsTable from './multiple_record_actions';
import ImplicitRecordActionsTable from './implicit_record_action';
import { EuiCallOut } from '../../../../src/components/call_out';

const tableSource = require('!!raw-loader!./table_of_records');
const tableHtml = renderToHtml(Table);

const paginatedSource = require('!!raw-loader!./pagination');
const paginatedHtml = renderToHtml(PaginatedTable);

const selectableSource = require('!!raw-loader!./selection');
const selectableHtml = renderToHtml(SelectableTable);

const renderingSource = require('!!raw-loader!./rendering');
const renderingHtml = renderToHtml(CustomRenderingTable);

const advanceRenderingSource = require('!!raw-loader!./advance_rendering');
const advanceRenderingHtml = renderToHtml(AdvanceRenderingTable);

const singleRecordActionsSource = require('!!raw-loader!./single_record_action');
const singleRecordActionsHtml = renderToHtml(SingleRecordActionTable);

const multipleRecordActionsSource = require('!!raw-loader!./multiple_record_actions');
const multipleRecordActionsHtml = renderToHtml(MultipleRecordActionsTable);

const implicitRecordActionSource = require('!!raw-loader!./implicit_record_action');
const implicitRecordActionHtml = renderToHtml(ImplicitRecordActionsTable);

export const TableOfRecordsExample = {
  title: 'TableOfRecords',
  sections: [
    {
      title: 'TableOfRecords',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: tableSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: tableHtml,
        }
      ],
      text: (
        <div>
          <p>
            This is the most basic form of a <EuiCode>EuiTableOfRecords</EuiCode> component. In its essence it is
            solely configured with the list of columns that should be visible to the user. Internally, the model
            for every <EuiCode>EuiTableOfRecords</EuiCode> is represented by a <EuiCode>Page</EuiCode> which has the
            following properties:
          </p>
          <ul>
            <li><EuiCode>index</EuiCode> - the page index (out of all available pages of data)</li>
            <li><EuiCode>size</EuiCode> - the page size (what is the maximum number of records that can be shown at a
              time)
            </li>
            <li><EuiCode>items</EuiCode> - the actual records that belong to this page (that should be shown)</li>
            <li><EuiCode>totalItemCount</EuiCode> - the total number of records across all pages</li>
          </ul>
          <p>
            In this simple example, we create a page that simply holds all the data we have. For this reasons, we don&#39;t
            need any pagination feature here (we know we show all data, why would we need that??).
          </p>
        </div>
      ),
      demo: <Table/>
    },
    {
      title: 'Pagination',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: paginatedSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: paginatedHtml,
        }
      ],
      text: (
        <div>
          <p>
            In the previous example we left out the pagination features as we were already showing all the data to the
            user and it was fully under our control to do so. This is not how things usually work though. More often
            than
            not, records will be loaded from a data store and shown to the user. In this scenaio, we don&#39;t really have
            control over the number of records in the system. Moreover, this number may be quite large, too large to be
            shown all at once. For this reason, the <EuiCode>EuiTableOfRecords</EuiCode> component supports pagination.
          </p>
          <p>
            In the following example, we enabled the pagination feature in the <EuiCode>EuiTableOfRecords</EuiCode>.
            Note that while the table knows how to render all the parts and pieces of the pagination functionality, it
            does not manage the pagination state, but instead provides all callbacks for the consumer to manage the
            state externally. Here we use a container components that wraps around <EuiCode>EuiTableOfRecords</EuiCode>
            which manages the state internally (using the component&#39;s internal state). An alternative to that could be
            to manage this state in an external state store such as Redux.
          </p>
        </div>
      ),
      demo: <PaginatedTable/>
    },
    {
      title: 'Records Selection',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: selectableSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: selectableHtml,
        }
      ],
      text: (
        <div>
          <p>
            So far we&#39;ve seen how to create a simple table and how to add pagination to it. Now we&#39;ll show how the
            <EuiCode>EuiTableOfRecords</EuiCode> enables the user to select records.
          </p>
          <p>
            Selection is yet another feature that you can opt-in to. All that is needed is to configure the
            <EuiCode>selection</EuiCode> section in the table configuration. As with pagination, the table itself is not
            managing the selection state and relies on the consumer to do it. Here we expanded our paginated table to also
            manage the selection state as part of the component internal state.
          </p>
          <p>
            This example also shows how you can control which records are selectable. Here we chose to only make the
            online people selectable.
          </p>
        </div>
      ),
      demo: <SelectableTable/>
    },
    {
      title: 'Custom Rendering',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: renderingSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: renderingHtml,
        }
      ],
      text: (
        <div>
          <p>
            <EuiCode>EuiTableOfRecords</EuiCode> enables you to customize the rendering of the records values. For each
            column you configure can accepts rendering hints and instructions that will be used to render the column
            values. There are two settings you can use for such hints/instructions:
          </p>
          <ul>
            <li>
              <EuiCode>dataType</EuiCode> - this serves as a hint about the data type that values in this column.
              Supported values are: <EuiCode>string</EuiCode>, <EuiCode>number</EuiCode>, <EuiCode>boolean</EuiCode>
              and <EuiCode>date</EuiCode>.
            </li>
            <li>
              <EuiCode>render</EuiCode> - this is a function that is called for each record and accepts the value
              of the record for this column and the record itself, as an output it returns a react node.
            </li>
          </ul>
          <p>
            Using the <EuiCode>dataType</EuiCode> setting simplifies rendering quite a lot. Further more, EUI comes with
            a built-in set of value renderers that are easy to use and can be enough for all the simple use cases. You can
            access these value renderer via the <EuiCode>ValueRenderers</EuiCode> object. Among the renderers it support
            you will find ones for dates, links, booleans, numeric patters (currencies), and more. In the next section
            you will read more about how to create and configure advance custom renderer.
          </p>
        </div>
      ),
      demo: <CustomRenderingTable/>
    },
    {
      title: 'Advance Rendering',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: advanceRenderingSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: advanceRenderingHtml,
        }
      ],
      text: (
        <div>
          <p>
            In the previous section we&#39;ve seen how to customize the rendering of the records values, determined by
            the configuration of the table columns. There we used the <EuiCode>dataType</EuiCode> to hint about the
            data type of the show values. We also used <EuiCode>ValueRenderers</EuiCode> to configure the built-in
            renderers EUI providers out of the box.
          </p>
          <p>
            Sometimes however, what comes out of the box is not sufficient. Worry not, using the same <EuiCode>render</EuiCode>
            configuration, you can define your own renderer from scratch. The following example, shows how we can add
            some color to the record values.
          </p>
          <EuiCallOut title="Tip" iconType="starEmpty">
            <p>
              While this example is here to demonstrate how you can provide your own custom renderers. Specifically
              with the case of the Health rendering, there is a built-in renderer at your disposal -
              <EuiCode>ValueRenderers.health</EuiCode>
            </p>
          </EuiCallOut>
        </div>
      ),
      demo: <AdvanceRenderingTable/>
    },
    {
      title: 'Record Actions',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: singleRecordActionsSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: singleRecordActionsHtml,
        }
      ],
      text: (
        <div>
          <p>
            <EuiCode>EuiTableOfRecords</EuiCode> enables you to place action controls on each record row. Typically this
            is placed in the last column of the table (although this is more of a best practice and common design pattern
            rather than enforced by the table component).
          </p>
          <p>
            To add actions, all you need to do is to define a special actions column as part of the columns configuration.
            In this column you can then define the actions that should be displayed. Note that you can define as many actions
            as you&#39;d like, though some design pattern should be followed, and some are actually enforced by the table
            component itself:
          </p>
          <ul>
            <li>
              Don&#39;t go overboard and configure too many actions. As a rule of thumb, choose maximum top 3 actions that
              should be promoted to the user and configure those. All other actions that may be associated with the
              record should most likely be placed in a dedicate page for the record itself.
            </li>
            <li>
              At any given time, there should not be more than one (1) control visible on the record rows. The reason
              for this is obvious - we want to leave enough room for the data and we don&#39;t want to clutter the table
              view. If more than one action is associated with a record, it should be collapsed into a popover control.
              The good news - <EuiCode>EuiTableOfRecords</EuiCode> already takes care of that for you!!
            </li>
            <li>
              Actions are hidden by default. You can only see the actions on the rows when you hover with your mouse
              on the relevant row. This is for the same reason as above - minimize the clutter in the table.
              The good news - <EuiCode>EuiTableOfRecords</EuiCode> already taks care of that too!!
            </li>
          </ul>
          <p>
            In the following example, we added an <EuiCode>icon</EuiCode> action to delete the record it is
            associated with.
          </p>
        </div>
      ),
      demo: <SingleRecordActionTable/>
    },
    {
      title: 'Record Actions (Multiple)',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: multipleRecordActionsSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: multipleRecordActionsHtml,
        }
      ],
      text: (
        <div>
          <p>
            As mentioned above, when multiple record actions are configured, they&#39;ll all collapse into a
            popover with a single trigger button
          </p>
        </div>
      ),
      demo: <MultipleRecordActionsTable/>
    },
    {
      title: 'Record Actions (Implicit)',
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
            need to be broken for good reaons. For example, there can be a valid use case for having muliple
            controls visible all the time (that is, not collapsed into a popover).
          </p>
          <p>
            You can achieve this by using custom renderers. The following example, enables switching the online/offline
            status of a person. Also note how listening to selection state changes enables us to follow the design
            guidelines and disable these switches when selection is on.
          </p>
          <p>
            As a bonus, we show how you can define a <EuiCode>computed</EuiCode> column that is not associated with any
            specific record key and simply renders content that is computed/derived out of the record itself (here we
            added a small little icon column that shows the user icon that is colored based on the person&#39;s
            <EuiCode>online</EuiCode> status).
          </p>
        </div>
      ),
      demo: <ImplicitRecordActionsTable/>
    }
  ]
};
