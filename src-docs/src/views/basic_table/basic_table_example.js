import React from 'react';

import {
  EuiCode,
  EuiText,
  EuiTitle,
  EuiCallOut,
  EuiSpacer
} from '../../../../src/components';

import { section as basicSection } from './basic';
import { section as paginatedSection } from './paginated';
import { section as sortingSection } from './sorting';
import { section as selectionSection } from './selection';
import { section as actionsSection } from './actions';

export const BasicTableExample = {
  title: 'BasicTable',
  intro: (
    <EuiText>
      <EuiTitle>
        <h2>EuiBasicTable</h2>
      </EuiTitle>
      <p>
        <EuiCode>EuiBasicTable</EuiCode> is a high level component that aims to simplify and unify the way
        one creates a tables.
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
      <p>
        The <EuiCode>EuiBasicTable</EuiCode> accepts two required properties:
      </p>
      <ul>
        <li>
          <EuiCode>items</EuiCode> - The table data - an array of objects that should be displayed in the table -
          one item per row. The exact item data that will be rendered in each cell in these rows is determined
          but the `columns` property.
        </li>
        <li>
          <EuiCode>columns</EuiCode> - Defines what columns the table has and how to extract the item data to display
          in each column for each row.
        </li>
      </ul>
      <p>
        Other optional properties are tightly aligned to the different supported features
        - <EuiCode>pagination</EuiCode>,
        <EuiCode>sorting</EuiCode> and <EuiCode>selection</EuiCode>
      </p>
      <EuiSpacer size="l"/>
    </EuiText>
  ),
  sections: [
    basicSection,
    paginatedSection,
    sortingSection,
    selectionSection,
    actionsSection
  ],
};
