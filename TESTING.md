# Testing EUI

## Running tests

`npm run test-unit` runs the Jest unit tests once.

`npm run test-unit button` will run tests with "button" in the spec name. You can pass other
[Jest CLI arguments](https://facebook.github.io/jest/docs/en/cli.html) by just adding them to the
end of the command like this.

`npm run test-unit -- -u` will update your snapshots. To pass flags or other options you'll need 
to follow the format of `npm run test-unit -- [arguments]`.

`npm run test-unit-watch` watches for changes and runs the tests as you code.

`npm run test-unit-coverage`  generates a code coverage report showing you how
fully-tested the code is, located at `eui/reports/jest-coverage`.

## Test helpers

The `src/test` module exports some functions and constants to help you write better tests:

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
        const onCloseHandler = sinon.stub();

        const component = mount(
          <YourComponent onClick={onClickHandler} />
        );

        // NOTE: This is the only way to find this button.
        component.find('button').simulate('click');

        sinon.assert.calledOnce(onCloseHandler);
      });
    });
  });

  describe('behavior', () => {
    it('button is automatically focused', () => {
      const component = mount(
        <YourComponent />
      );

      expect(findTestSubject(component, 'button')).toBe(document.activeElement);
    }); 
  });
});

```
