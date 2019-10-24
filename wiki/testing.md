# Testing

## Naming your test files

Create test files with the name pattern of `{component name}.test.js` in the same directory which
contains `{component name}.js`.

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

    expect(component)
      .toMatchSnapshot();
  });

  describe('props', () => {
    describe('color', () => {
      test('is rendered', () => {
        const component = render(
          <YourComponent color="blue" />
        );

        expect(component)
          .toMatchSnapshot();
      });
    });

    describe('onClick', () => {
      test(`isn't called upon instantiation`, () => {
        const onClickHandler = sinon.stub();

        mount(
          <YourComponent onClick={onClickHandler} />
        );

        sinon.assert.notCalled(onClickHandler);
      });

      test('is called when the button is clicked', () => {
        const onClickHandler = sinon.stub();

        const component = mount(
          <YourComponent onClick={onClickHandler} />
        );

        // NOTE: This is the only way to find this button.
        component.find('button').simulate('click');

        sinon.assert.calledOnce(onClickHandler);
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
