# EuiSearchBarObject

Playwright Component Object for [EuiSearchBar](https://eui.elastic.co/docs/components/forms/search-and-filter/search-bar/).

## Usage

```ts
import { EuiSearchBarObject } from '@elastic/eui-test-helpers';

const searchBar = new EuiSearchBarObject(page, 'mySearchBar');
await searchBar.setQuery('type:dashboard');
```

The search bar has no root of its own. Pass the subj through the `box` prop, `box={{ 'data-test-subj': 'mySearchBar' }}`, EUI puts it on the search input. This object is [EuiFieldSearchObject](../form/field_search/README.md) under the search bar's own name, same API: `setQuery(text)`, `getQuery()`, `clear()`.

## Deliberately excluded

The filter buttons next to the box are `EuiFilterButton`, use `EuiFilterButtonObject`. Query parsing and the error tooltip are consumer facing results of `onChange`, assert on them in the test.
