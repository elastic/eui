import React from 'react';

import { EuiCode, EuiSpacer, EuiCallOut } from '../../../../src/components';

import { section as basicSection } from './basic';
import { section as paginatedSection } from './paginated';
import { section as sortingSection } from './sorting';
import { section as selectionSection } from './selection';
import { section as footerSection } from './footer';
import { section as expandingRowsSection } from './expanding_rows';
import { section as actionsSection } from './actions';
import {
  section as inMemorySection,
  selectionSection as inMemorySelectionSection,
  searchSection as inMemorySearchSection,
  searchCallbackSection as inMemorySearchCallbackSection,
  customSortingSection as inMemoryCustomSortingSection,
} from './in_memory';
import { section as customSection } from './custom';
import { section as mobileSection } from './mobile';

export const TableExample = {
  title: 'Tables',
  intro: (
    <div>
      <EuiCallOut title="EUI provides opinionated and non-opinionated ways to build tables">
        <p>
          Tables can get complicated very fast. If you&apos;re just looking for
          a basic table with pagination, sorting, checkbox selection, and
          actions then you should use <EuiCode>EuiBasicTable</EuiCode>.
          It&apos;s a <strong>high level component</strong> that removes the
          need to worry about constructing individual components together. You
          simply arrange your data in the format it asks for.
        </p>
        <p>
          However if your table is more complicated, you can still use the
          individual table components like rows, headers, and pagination
          separately to do what you need. Find examples for that{' '}
          <strong>at the bottom of this page</strong>.
        </p>
      </EuiCallOut>
      <EuiSpacer />
    </div>
  ),
  sections: [
    basicSection,
    paginatedSection,
    sortingSection,
    selectionSection,
    footerSection,
    expandingRowsSection,
    actionsSection,
    inMemorySection,
    inMemorySelectionSection,
    inMemorySearchSection,
    inMemorySearchCallbackSection,
    inMemoryCustomSortingSection,
    mobileSection,
    customSection,
  ],
};
