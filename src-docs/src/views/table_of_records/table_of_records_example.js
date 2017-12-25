import React from 'react';

import { renderToHtml } from '../../services';

import {
  GuideSectionTypes,
} from '../../components';

import {
  EuiCode, EuiText, EuiTitle, EuiCodeBlock, EuiCallOut, EuiSpacer
} from '../../../../src/components';

import BasicTable from './basic';
import PaginatedTable from './pagination';
import SelectableTable from './selection';
import SortableTable from './sorting';
import CustomRenderingTable from './rendering';
import AdvanceRenderingTable from './advance_rendering';
import SingleRecordActionTable from './single_record_action';
import MultipleRecordActionsTable from './multiple_record_actions';
import ImplicitRecordActionsTable from './implicit_record_action';

const basicSource = require('!!raw-loader!./basic');
const basicHtml = renderToHtml(BasicTable);

const paginatedSource = require('!!raw-loader!./pagination');
const paginatedHtml = renderToHtml(PaginatedTable);

const selectableSource = require('!!raw-loader!./selection');
const selectableHtml = renderToHtml(SelectableTable);

const sortableSource = require('!!raw-loader!./sorting');
const sortableHtml = renderToHtml(SortableTable);

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
  intro: (
    <EuiText>
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
      <EuiSpacer size="l"/>
      <EuiCallOut iconType="questionInCircle" title="What is a Record?">
        Think of a record in a data store - typically it represents an entity with a very clear
        schema and is something that can be presented in a tabular form.
      </EuiCallOut>
      <EuiSpacer size="l"/>
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
      <EuiSpacer size="l"/>
    </EuiText>
  ),
  sections: [
    {
      title: 'Basic Table',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: basicSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: basicHtml,
        }
      ],
      text: (
        <div>
          <p>
            This is the most basic form of a <EuiCode>EuiTableOfRecords</EuiCode> component. In its essence it is
            solely configured with the list of columns that should be visible to the user. The provided model is
            a simple list of records that should be shown.
          </p>
          <p>
            Since the model does not hold a criteria, the table assumes all records are shown, thus there is no
            need for pagination controls.
          </p>
        </div>
      ),
      demo: <BasicTable/>
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
            In the previous example we showed the whole data (the full list of people) and so there was no use for
            pagination controls. This is not how things usually work though as more often than not, records will be
            loaded from an external data store where we don&apos;t really have control over the number of records in
            the system. Moreover, this number may be quite large, too large to be shown all at once. For this reason
            the <EuiCode>EuiTableOfRecords</EuiCode> component supports pagination.
          </p>
          <p>
            To view the pagination controls, the model is required to include information about the current page that
            is shown by the table - namely the page size (maximum number of records that can be shown per page) and
            the page index (the zero based index of the page out of all the possible pages of records). You can
            specify these values as part of the model criteria as follows
          </p>
          <EuiCodeBlock language="js" color="light" >
            {require('!!raw-loader!./snippets/page_criteria.txt')}
          </EuiCodeBlock>
          <EuiSpacer size="l" />
          <p>
            In the following example, we provide the required page information to enable the pagination controls.
            Note that while the table knows how to render all the parts and pieces of the pagination functionality, it
            does not manage the pagination state itself, but instead notifies the consumer about the changes in the
            model criteria via the <EuiCode>onModelCriteriaChange</EuiCode> callback. Here we use a container
            components that wraps around <EuiCode>EuiTableOfRecords</EuiCode> which manages the state internally.
            Alternatively one could manage this state in an external state store such as Redux.
          </p>
          <p>
            In this example we also show how you can configure the &quot;page size selector&quot;. It&apos;s a control
            that lets the user change the table page size.
          </p>
        </div>
      ),
      demo: <PaginatedTable/>
    },
    {
      title: 'Selection',
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
            So far we&apos;ve seen how to create a simple table and how to add pagination to it. Now we&apos;ll show how the
            <EuiCode>EuiTableOfRecords</EuiCode> enables the user to select records.
          </p>
          <p>
            Selection is yet another feature that you can opt-in to. All that is needed is to configure the
            <EuiCode>selection</EuiCode> section in the table configuration which will enabled you to define a callback
            function that will notify you whenever selection has changed. Note that specifying this callback is
            required (otherwise, if you&apos;re not planning to do anything with the selected records, what&apos;s the point in
            enabling the user to select them in the first place?)
          </p>
          <EuiCallOut iconType="iInCircle" color="success" title="Behaviour Note">
            Selection is reset on any pagination event, that is, either during pagination (when the user navigates between
            the pages) or when the page size changes.
          </EuiCallOut>
          <EuiSpacer size="m"/>
          <p>
            This example also shows how you can control which records are selectable. Here we chose to only make the
            online people selectable.
          </p>
        </div>
      ),
      demo: <SelectableTable/>
    },
    {
      title: 'Sorting',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: sortableSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: sortableHtml,
        }
      ],
      text: (
        <div>
          <p>
            <EuiCode>EuiTableOfRecords</EuiCode> supports sortable columns. To enable this feature, all you need
            to do is set <EuiCode>sortable: true</EuiCode> on the data columns you would like to be sortable.
          </p>
          <p>
            Like with paging, the sorting responsiblity is handed to the consumer of the table. All the table does
            is taking care of the UI aspects of it and lets the consumer know when the data needs to be sorted (via
            the <EuiCode>onColumnSort</EuiCode> callback).
          </p>
          <EuiCallOut iconType="iInCircle" color="success" title="Behaviour Note">
            Pagination is reset (back to the first page) on sort
          </EuiCallOut>
        </div>
      ),
      demo: <SortableTable/>
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
            column you may configure rendering hints and instructions to how the column should render its associated
            record value. There are two settings you can use for such hints/instructions:
          </p>
          <ul>
            <li>
              <EuiCode>dataType</EuiCode> - This serves as a hint about the data type of the values in this column.
              Supported values are: <EuiCode>string</EuiCode>, <EuiCode>number</EuiCode>, <EuiCode>boolean</EuiCode>
              and <EuiCode>date</EuiCode>.
            </li>
            <li>
              <EuiCode>render</EuiCode> - A function that accepts the value that should be rendered and the record and
              returns the react node that should be rendered for that value.
            </li>
          </ul>
          <p>
            Using the <EuiCode>dataType</EuiCode> setting simplifies rendering quite a lot. Further more, EUI comes with
            a built-in set of value renderers that can be used for the simple/typical use cases. You can access these
            value renderer via the <EuiCode>ValueRenderers</EuiCode> object. Among the renderers it support you will
            find ones for dates, links, booleans, numeric patters (currencies), and more. In the next section you will
            read more about how to create and configure advance custom renderer.
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
            In the previous section we&apos;ve seen how to customize the rendering of the records values, determined by
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
            as you&apos;d like, though some design pattern should be followed, and some are actually enforced by the table
            component itself:
          </p>
          <ul>
            <li>
              Don&apos;t go overboard and configure too many actions. As a rule of thumb, choose maximum top 3 actions that
              should be promoted to the user and configure those. All other actions that may be associated with the
              record should most likely be placed in a dedicate page for the record itself.
            </li>
            <li>
              At any given time, there should not be more than one (1) control visible on the record rows. The reason
              for this is obvious - we want to leave enough room for the data and we don&apos;t want to clutter the table
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
            As mentioned above, when multiple record actions are configured, they&apos;ll all collapse into a
            popover with a single trigger button
          </p>
        </div>
      ),
      demo: <MultipleRecordActionsTable/>
    },
    {
      title: 'Computed Columns and \"Implicit\" Record Actions',
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
            added a small little icon column that shows the user icon that is colored based on the person&apos;s
            <EuiCode>online</EuiCode> status).
          </p>
        </div>
      ),
      demo: <ImplicitRecordActionsTable/>
    }
  ]
};
