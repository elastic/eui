import React from 'react';

import {
  EuiCode,
  EuiText,
  EuiTitle,
  EuiSpacer
} from '../../../../src/components';

import { section as basicSection } from './basic';
import { section as paginatedSection } from './paginated';
import { section as sortingSection } from './sorting';
import { section as selectionSection } from './selection';
import { section as actionsSection } from './actions';

export const TableExample = {
  title: 'Tables',
  intro: (
    <EuiText>
      <EuiTitle>
        <h2>EuiBasicTable</h2>
      </EuiTitle>
      <p>
        <EuiCode>EuiBasicTable</EuiCode> is a high level component that aims to simplify and unify the way
        one creates a tables.
      </p>
      <blockquote>
        <p>
          The goal of a high level components is to make the consumer not think about design or UX/UI behaviour.
          Instead, the consumer only need to define the functional requirements - features of the component (in
        </p>
      </blockquote>
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
