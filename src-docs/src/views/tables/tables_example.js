import React from 'react';

import {
  EuiCode,
  EuiText,
  EuiTitle,
  EuiSpacer,
  EuiCallOut,
} from '../../../../src/components';

import { section as basicSection } from './basic';
import { section as paginatedSection } from './paginated';
import { section as sortingSection } from './sorting';
import { section as selectionSection } from './selection';
import { section as actionsSection } from './actions';
import {
  section as inMemorySection,
  selectionSection as inMemorySelectionSection,
  searchSection as inMemorySearchSection
} from './in_memory';
import { section as customSection } from './custom';

export const TableExample = {
  title: 'Tables',
  intro: (
    <EuiText>
      <EuiTitle>
        <h2>Tables</h2>
      </EuiTitle>
      <EuiCallOut title="EUI provides opinionated and non-opinionated ways to build tables">
        <p>
          Tables can get complicated very fast. If you&apos;re just looking for a basic table
          with pagination, sorting, checkbox selection and actions then you should
          use <EuiCode>EuiBasicTable</EuiCode>. It&apos;s a <strong>high level component</strong> that removes
          the need to worry about constructing individual components together. You simply arrange your
          data in the format it asks for.
        </p>
        <p>
          However if your table is more complicated, you can still use the individual table
          components like rows, headers, and pagination separately to do what you need. Find
          examples for that <strong>at the bottom of this page</strong>.
        </p>
      </EuiCallOut>
      <EuiSpacer />
    </EuiText>
  ),
  sections: [
    basicSection,
    paginatedSection,
    sortingSection,
    selectionSection,
    actionsSection,
    inMemorySection,
    inMemorySelectionSection,
    inMemorySearchSection,
    customSection,
  ],
};
