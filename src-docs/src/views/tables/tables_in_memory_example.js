import {
  section as inMemorySection,
  selectionSection as inMemorySelectionSection,
  searchSection as inMemorySearchSection,
  searchCallbackSection as inMemorySearchCallbackSection,
  customSortingSection as inMemoryCustomSortingSection,
} from './in_memory';

export const TableInMemoryExample = {
  title: 'In-memory tables',
  sections: [
    inMemorySection,
    inMemorySelectionSection,
    inMemorySearchSection,
    inMemorySearchCallbackSection,
    inMemoryCustomSortingSection,
  ],
};
