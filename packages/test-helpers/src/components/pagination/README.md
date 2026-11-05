# EuiPaginationObject

Playwright Component Object for [EuiPagination](https://eui.elastic.co/docs/components/navigation/pagination/). Covers the numbered and the compressed variant.

## Usage

```ts
import { EuiPaginationObject } from '@elastic/eui-test-helpers';

const pagination = new EuiPaginationObject(page, 'myPagination');
await pagination.goToPage(2);
expect(await pagination.getActivePage()).toBe(2);
```

Set `data-test-subj` on `<EuiPagination>`. EUI spreads it onto the `<nav>`, which the component-type guard verifies. Page indexes are 0-based, matching EUI's `activePage` prop and the `pagination-button-<index>` test subjs.

## API

| Member | Description |
|---|---|
| `getActivePage()` | The 0-based index of the active page. |
| `getPageCount()` | The total number of pages. |
| `goToPage(index)` | Go to a page and wait for it to become active. Clicks the page button when rendered, otherwise steps through next or previous. No-op if already active, throws if out of range. |
| `next()` | Click the next arrow and wait for the page to advance. |
| `previous()` | Click the previous arrow and wait for the page to go back. |

The numbered variant is read from the `aria-current="page"` button and the last page button. The compressed variant is read from its "page of total" text.

## Deliberately excluded

`pageCount={0}` (unknown total, "page X of collection") is not covered, `getPageCount` and `goToPage` have nothing to read there. The first and last arrows exist only in the compressed variant, `goToPage(0)` and `goToPage(count - 1)` cover the same need.
