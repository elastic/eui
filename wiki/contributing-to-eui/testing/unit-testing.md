# Unit testing

EUI's unit tests currently run on Jest and Enzyme (with an in-progress migration to RTL, and a planned snapshot migration to Storybook).

## Running tests

`yarn test-unit` runs **all** Jest unit tests at once.

`yarn test-unit button` will run tests with "button" in the spec name.

You can pass other [Jest CLI arguments](https://jestjs.io/docs/cli). For example:

`yarn test-unit -u` will update your snapshots.
Note: if you are experiencing failed builds in Jenkins related to snapshots, then try clearing the cache first `yarn test-unit --clearCache`.

`yarn test-unit --watch` watches for changes and runs the tests as you code.

`yarn test-unit --coverage` generates a code coverage report showing you how
fully-tested the code is, located at `reports/jest-coverage`.

## Naming your test files

Create test files with the name pattern of `{component name}.test.tsx` in the same directory which
contains `{component name}.tsx`.

## Targeting files to test

You can also add any string to the end of the command to run the tests only on directories that contain that string. For example, `yarn test-unit button` will only update the tests for directories that **contain** `button`.

## Test helpers

The [`src/test`](../../../src/test) module exports some functions and constants to help you write better tests:

* `requiredProps` is a list of all props almost all components should support.
* `shouldRenderCustomStyles` automatically asserts that consumer classNames, Emotion CSS, and custom styles are merged correctly with EUI's styles.
* RTL:
  * The exports within `test/rtl` (`render`, `screen`, and `within`) provide out-of-the-box `data-test-subj` querying. `render` provides automatic `EuiProvider` wrapping.
* Enzyme:
  * `findTestSubject` helps you find DOM nodes in mounted components.
  * `takeMountedSnapshot` generates a snapshot of a mounted component.

### Test helper naming pattern

If the test helper includes `enzyme` or other libraries included only in `devDependencies`, use the `*.test_helper.[ts, tsx]` naming pattern to exclude the component from production builds, or place the helper in a namespaced folder.

## Test design

### Do's and don'ts

* DO use the `data-test-subj` attribute to mark parts of a component you want to `find` later.
* DON'T depend upon class names or other implementation details for `find`ing nodes, if possible.
* DON'T use snapshots, except for an initial `it renders` test. Prefer using specific assertions instead.

### Anatomy of a test

A good test will document:

* The default state of the component.
* The inputs for each prop, and the associated outputs.
* Errors.
* Special behavior, e.g. keyboard navigation, async behavior, DOM manipulation under the hood.

```jsx
import { fireEvent } from '@testing-library/react';
import { render } from '../../test/rtl';

describe('YourComponent', () => {
  shouldRenderCustomStyles(<YourComponent />);

  it('renders', () => {
    const { container } = render(
      <YourComponent {...requiredProps }/>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  describe('props', () => {
    test('color', () => {
      const { getByTestSybject } = render(
        <YourComponent color="blue" />
      );

      expect(getByTestSubject('color')).toHaveStyleRule('color', 'blue');
    });

    describe('onClick', () => {
      it('is called when the button is clicked', () => {
        const onClickHandler = jest.fn();

        const { getByTestSubject } = render(
          <YourComponent onClick={onClickHandler} />
        );

        fireEvent.click(getByTestSubject('button'));

        expect(onClickHandler).toHaveBeenCalledTimes(1);
      });

      it('is not called on keypress', () => {
        const onClickHandler = jest.fn();

        const { getByTestSubject } = render(
          <YourComponent onClick={onClickHandler} />
        );

        fireEvent.keyDown(getByTestSubject('button'));

        expect(onClickHandler).not.toHaveBeenCalled();
      });
    });
  });

  describe('behavior', () => {
    it('automatically focuses button on page load', () => {
      const { getByTestSubject } = render(
        <YourComponent />
      );

      expect(getByTestSubject('button')).toEqual(document.activeElement);
    });
  });
});

```

## Writing mock component files

A component file can be mocked for snapshot simplification or to mitigate nondeterministic rendering in test environments. See [`src/components/icon`](../../../src/components/icon) for a example.

_Mock component files are currently only used as part of consuming project test environments. To use mock components in EUI's own testing environments, use `jest.mock()` manually._

### Using the mock namespace

Component mocking relies on using the `[name].testenv.*` namespace for identification. The mocked module will replace the standard import in the `test-env` build. Both `index` files and individual component files can mocked.

### Mapping all module exports

The rendered output of a mocked component is at the author's discretion, however, all public exports from a module must be preserved in the mock file. Note that this does not apply to exported TypeScript types and interfaces, which will always be derived from the original component file.
