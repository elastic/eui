# EuiFieldSearchObject

Playwright Component Object for [EuiFieldSearch](https://eui.elastic.co/docs/components/forms/search-and-filter/search/).

## Usage

```ts
import { EuiFieldSearchObject } from '@elastic/eui-test-helpers';

const search = new EuiFieldSearchObject(page, 'mySearch');
await search.setQuery('logs');
expect(await search.getQuery()).toBe('logs');
```

Set `data-test-subj` on `<EuiFieldSearch>`. EUI spreads it onto the `<input type="search">`, which the component-type guard verifies.

## API

| Member | Description |
|---|---|
| `setQuery(text)` | Replace the text and submit it with Enter. Triggers `onSearch` for both the incremental and the plain variant. |
| `getQuery()` | The current text of the input. |
| `clear()` | Empty the input and submit, so `onSearch` receives an empty query. |

`clear()` does not use the clear button since it only renders with `isClearable` and a value. Submitting an empty query has the same effect.

## Deliberately excluded

Per keystroke `onSearch` of the incremental variant. `setQuery` fills the text in one go and submits once. Use `locator.pressSequentially()` if a test needs every keystroke.
