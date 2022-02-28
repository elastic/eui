# Testing-related utilities

EUI uses many of the utilities in this directory in its own Jest tests and, in case they are useful for consuming apps, exports them from `@elastic/eui/lib/test` (commonjs) and `@elastic/eui/es/test` (esm)

### findTestSubject

Provides a quick mechanism for searching an Enzyme-mounted component tree for an element with a specific `data-test-subj` attribute.

```js
// if mountedComponent contains e.g. <button data-test-subj="custom-button"/>, this would return that button
const component = findTestSubject(mountedComponent, 'custom-button');
```

### startThrowingReactWarnings

Patches `console.warn` and `console.error` to throw any warnings or errors, causing Jest to fail the test. This catches warnings emitted by React.

### stopThrowingReactWarnings

Must be called after `startThrowingReactWarnings`, this unpatches the console and restores normal functionality.

### sleep

Returns an `await`able promise that resolves after the specified duration.

```js
doSomeAction();
await sleep(500); // wait 500ms
expect(resultOfSomeAction);
```

### takeMountedSnapshot

Use this function to generate a Jest snapshot of components that have been fully rendered using Enzyme's `mount` method. Typically, a mounted component will result in a snapshot containing both React components and HTML elements. This function removes the React components, leaving only HTML elements in the snapshot.

This function takes an optional configuration as a second argument, which supports one option: `hasArrayOutput`. Enable this option if the mounted component has multiple direct children, otherwise only the first is included in the snapshot. 

```js
expect(
  takeMountedSnapshot(mountedComponent, {
    hasArrayOutput: true,
  })
).toMatchSnapshot();
```

### testCustomHook

Use this function to execute a custom hook and access its return value, which can be passed to `expect` for verification. The function also returns a `getUpdatedState` method which will always return the hook's current state, in case some interaction with the react component causes an update.

```js
const {
  return: hookReturnValue,
  getUpdatedState,
} = testCustomHook(() => useCellPopover());

expect(hookReturnValue).to.equal(myExpectedValue);
doSomeActions();
expect(getUpdatedState()).to.equal(myExpectedValue);
```
