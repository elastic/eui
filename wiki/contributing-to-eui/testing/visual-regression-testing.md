# Visual regression testing

EUI uses [Loki](https://loki.js.org/) for component visual regression testing.
Loki compares snapshots of previously approved against current Storybook
stories and ensures there are no unexpected differences.

Visual regression tests are being run automatically on every pull request.

## Running Loki locally

Loki uses a Docker container running Chrome as a stable way to take screenshots.
Please make sure you have [Docker](https://docs.docker.com/get-docker/)
installed and running locally.

Before running Loki you need to start a local Storybook server in either
development or production mode:

```shell
yarn storybook --no-open
```

Now you can run Loki to test for visual regressions:

```shell
yarn test-visual-regression
```

You can also run the test for specific stories only by using `--storiesFilter`:

```shell
yarn test-visual-regression --storiesFilter EuiComboBox
```

To add baseline reference images run:

```shell
# all components
yarn test-visual-regression update

# specific component
yarn test-visual-regression update --storiesFilter EuiComboBox
```


## Skipping stories

Some stories cannot be tested for various reasons. You can set
`{ loki: { skip: true } }` to the Story object to skip them.
Please leave a comment explaining why the story is skipped for future context.

**Example:**

```tsx
const meta: Meta<MyComponentProps> = {
  component: MyComponent,
  parameters: {
    loki: {
      skip: true,
    },
  },
};
```

## Using non-default selectors

Stories of components that render text nodes or portalled elements need
to specify a custom Loki selector to tell it what we want to take
a screenshot of using the `chromeSelector` property.

We provide a few predefined Loki selectors in the 
[.storybook/loki.ts](https://github.com/elastic/eui/tree/main/.storybook/loki.ts)
file.

**Example:**
```tsx
const meta: Meta<MyComponentProps> = {
  component: MyComponent,
  parameters: {
    loki: {
      // LOKI_SELECTORS can be imported from .storybook/loki.ts
      chromeSelector: LOKI_SELECTORS.portal,
    },
  },
};
```

## Using storybook interactions for specific interaction states

You can use storybooks [`interactions`](https://storybook.js.org/docs/essentials/interactions) to run VRT testing on specific component states after user interaction.

Use `lokiPlayDecorator` function to ensure VRT testing runs 
- a) as defined (VRT only vs storybook & VRT)
- b) after interactions were run

```tsx
import { userEvent, waitFor, within, expect } from '@storybook/test';
import { lokiPlayDecorator } from '/.storybook/loki'


const Playground = {
  play: lokiPlayDecorator(async (context) => {
    const { bodyElement, canvasElement, step } = context;

    // for any content inside the story wrapper use canvasElement
    const canvas = within(canvasElement);
    // any content outside the story wrapper (e.g. added via portals) use bodyElement
    const canvas = within(bodyElement);

    /* NOTE: multi-steps breaks on going through steps on not found elements
    for show/hide actions. It seems more reliable to use a single step for
    these interactions as they are used for VRT only (so far). */
    await step('show popover on click', async () => {
        await userEvent.click(canvas.getByRole('combobox'));

        await waitFor(() => {
          expect(canvas.getByRole('listbox')).toBeVisible();
        })
      }
    );
  })
}
```

