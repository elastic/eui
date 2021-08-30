# Testing

## Naming your test files

Create test files with the name pattern of `{component name}.test.js` in the same directory which
contains `{component name}.js`.

## Updating snapshots

When you change a component in a way that affects the markup, you will need to update the snapshot in order for the tests to succeed. To do so, run `yarn test-unit -u`. This will update all snapshots in the repo. You can also add any string to the end of the command to run the tests only on directories that contain that string. For example, `yarn test-unit -u button` will only update the tests for directories that **contain** `button`.

## Test helpers

The [`src/test`](../src/test) module exports some functions and constants to help you write better tests:

* `findTestSubject` helps you find DOM nodes in mounted components.
* `requiredProps` is a list of all props almost all components should support.
* `takeMountedSnapshot` generates a snapshot of a mounted component.

## Test design

### Do's and don'ts

* DO use the `data-test-subj` attribute to mark parts of a component you want to `find` later.
* DON'T depend upon class names or other implementation details for `find`ing nodes, if possible.
* DO use snapshots as much as possible.
* DON'T assert for the presence of nodes if you can use a snapshot instead.

### Anatomy of a test

A good test will document:

* The default state of the component.
* The inputs for each prop, and the associated outputs.
* Errors.
* Special behavior, e.g. keyboard navigation, async behavior, DOM manipulation under the hood.

```jsx
describe('YourComponent', () => {
  test('is rendered', () => {
    const component = render(
      <YourComponent {...requiredProps}>
        Hello
      </YourComponent>
    );

    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    describe('color', () => {
      test('is rendered', () => {
        const component = render(
          <YourComponent color="blue" />
        );

        expect(component).toMatchSnapshot();
      });
    });

    describe('onClick', () => {
      test(`isn't called upon instantiation`, () => {
        const onClickHandler = sinon.stub();

        mount(
          <YourComponent onClick={onClickHandler} />
        );

        expect(onClickHandler).not.toHaveBeenCalled();
      });

      test('is called when the button is clicked', () => {
        const onClickHandler = sinon.stub();

        const component = mount(
          <YourComponent onClick={onClickHandler} />
        );

        // NOTE: This is the only way to find this button.
        component.find('button').simulate('click');

        expect(onClickHandler).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('behavior', () => {
    it('button is automatically focused', () => {
      const component = mount(
        <YourComponent />
      );

      expect(findTestSubject(component, 'button').getDOMNode()).toBe(document.activeElement);
    });
  });
});

```

## Writing mock component files

A component file can be mocked for snapshot simplification or to mitigate nondeterministic rendering in test environments. See [`src/components/icon`](../src/components/icon) for a example.

_Although mock component files are currently only used as part of consuming project test environments, the concept will soon be applied to EUI's own testing environment._

### Using the mock namespace

Component mocking relies on using the `[name].testenv.*` namespace for identification. The mocked module will replace the standard import in the `test-env` build. Both `index` files and individual component files can mocked.

### Mapping all module exports

The rendered output of a mocked component is at the author's discretion, however, all public exports from a module must be preserved in the mock file. Note that this does not apply to exported TypeScript types and interfaces, which will always be derived from the original component file.
