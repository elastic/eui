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
