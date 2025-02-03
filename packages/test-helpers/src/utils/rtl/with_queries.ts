import {
  type Screen,
  type Queries,
  type queries as originalQueries,
  within,
} from '@testing-library/react';

export const withQueries = <TQueries extends Queries>(
  screen: Screen,
  queries: TQueries
): Screen<typeof originalQueries & TQueries> => ({
  ...screen,
  ...within<TQueries>(document.body, queries),
});
