import React from 'react';
import { render, shallow } from 'enzyme';

import { EuiKeyboardAccessible } from './keyboard_accessible';

import { keyCodes } from '../../services';

const noop = () => {
  // eslint-disable-line no-empty
};

describe('EuiKeyboardAccessible', () => {
  describe('throws an error', () => {
    // tslint:disable-next-line:no-console
    const oldConsoleError = console.error;
    let consoleStub: jest.Mock<typeof console.error>;

    beforeEach(() => {
      // We don't use jest.spyOn() here, because EUI's tests apply a global
      // console.error() override that throws an exception. For these
      // tests, we just want to know if console.error() was called.

      // tslint:disable-next-line:no-console
      console.error = consoleStub = jest.fn();
    });

    afterEach(() => {
      // tslint:disable-next-line:no-console
      console.error = oldConsoleError;
    });

    test("when there's no child", () => {
      // @ts-ignore unused var
      const component = <EuiKeyboardAccessible />; // eslint-disable-line @typescript-eslint/no-unused-vars

      expect(consoleStub).toBeCalled();
      expect(consoleStub.mock.calls[0][0]).toMatch(
        'needs to wrap an element with which the user interacts.'
      );
    });

    test('when the child is a button', () => {
      // @ts-ignore unused var
      const component = ( // eslint-disable-line @typescript-eslint/no-unused-vars
        <EuiKeyboardAccessible>
          <button onClick={noop} />
        </EuiKeyboardAccessible>
      );

      expect(consoleStub).toBeCalled();
      expect(consoleStub.mock.calls[0][0]).toMatch(
        "doesn't need to be used on a button."
      );
    });

    test('when the child is a link with an href', () => {
      // @ts-ignore unused var
      const component = ( // eslint-disable-line @typescript-eslint/no-unused-vars
        <EuiKeyboardAccessible>
          <a href="#" onClick={noop}>
            Click me
          </a>
        </EuiKeyboardAccessible>
      );

      expect(consoleStub).toBeCalled();
      expect(consoleStub.mock.calls[0][0]).toMatch(
        "doesn't need to be used on a link if it has a href attribute."
      );
    });

    test("when the child doesn't have an onClick prop", () => {
      // @ts-ignore unused var
      const component = ( // eslint-disable-line @typescript-eslint/no-unused-vars
        <EuiKeyboardAccessible>
          <div />
        </EuiKeyboardAccessible>
      );

      expect(consoleStub).toBeCalled();
      expect(consoleStub.mock.calls[0][0]).toMatch(
        'needs to wrap an element which has an onClick prop assigned.'
      );
    });

    test("when the child's onClick prop isn't a function", () => {
      // @ts-ignore unused var
      const component = ( // eslint-disable-line @typescript-eslint/no-unused-vars
        <EuiKeyboardAccessible>
          <div
            // @ts-ignore not a valid prop type
            onClick="notAFunction"
          />
        </EuiKeyboardAccessible>
      );

      expect(consoleStub).toBeCalled();
      expect(consoleStub.mock.calls[0][0]).toMatch(
        "child's onClick prop needs to be a function."
      );
    });
  });

  describe("doesn't throw an error", () => {
    let oldConsoleError: typeof console.error;
    let consoleStub: jest.Mock<typeof console.error>;

    beforeEach(() => {
      // tslint:disable-next-line:no-console
      oldConsoleError = console.error;
      // tslint:disable-next-line:no-console
      console.error = consoleStub = jest.fn();
    });

    afterEach(() => {
      // tslint:disable-next-line:no-console
      console.error = oldConsoleError;
    });

    test('when the element is a link without an href', () => {
      // @ts-ignore unused var
      const component = ( // eslint-disable-line @typescript-eslint/no-unused-vars
        <EuiKeyboardAccessible>
          <a onClick={noop}>Click me</a>
        </EuiKeyboardAccessible>
      );

      expect(consoleStub).not.toBeCalled();
    });
  });

  describe('adds accessibility attributes', () => {
    test('tabindex and role', () => {
      const $button = render(
        <EuiKeyboardAccessible>
          <div onClick={noop} />
        </EuiKeyboardAccessible>
      );

      expect($button).toMatchSnapshot();
    });
  });

  describe("doesn't override pre-existing accessibility attributes", () => {
    test('tabindex', () => {
      const $button = render(
        <EuiKeyboardAccessible>
          <div
            onClick={noop}
            tabIndex={1} // eslint-disable-line jsx-a11y/tabindex-no-positive
          />
        </EuiKeyboardAccessible>
      );

      expect($button).toMatchSnapshot();
    });

    test('role', () => {
      const $button = render(
        <EuiKeyboardAccessible>
          <div onClick={noop} role="button" tabIndex={0} />
        </EuiKeyboardAccessible>
      );

      expect($button).toMatchSnapshot();
    });
  });

  describe('calls onClick', () => {
    test('on ENTER keyup', () => {
      const onClickHandler = jest.fn();

      const $button = shallow(
        <EuiKeyboardAccessible>
          <div data-div onClick={onClickHandler} />
        </EuiKeyboardAccessible>
      );

      $button.find('[data-div]').simulate('keyup', {
        keyCode: keyCodes.ENTER,
      });

      expect(onClickHandler).toBeCalled();
    });

    test('on SPACE keyup', () => {
      const onClickHandler = jest.fn();

      const $button = shallow(
        <EuiKeyboardAccessible>
          <div data-div onClick={onClickHandler} />
        </EuiKeyboardAccessible>
      );

      $button.find('[data-div]').simulate('keyup', {
        keyCode: keyCodes.SPACE,
      });

      expect(onClickHandler).toBeCalled();
    });
  });

  describe("child's props", () => {
    test('onKeyUp handler is called', () => {
      const onKeyUpHandler = jest.fn();

      const $button = shallow(
        <EuiKeyboardAccessible>
          <div data-div onKeyUp={onKeyUpHandler} />
        </EuiKeyboardAccessible>
      );

      $button.find('[data-div]').simulate('keyup', {
        keyCode: 0,
      });

      expect(onKeyUpHandler).toBeCalled();
    });

    test('onKeyDown handler is called', () => {
      const onKeyDownHandler = jest.fn();

      const $button = shallow(
        <EuiKeyboardAccessible>
          <div data-div onKeyDown={onKeyDownHandler} />
        </EuiKeyboardAccessible>
      );

      $button.find('[data-div]').simulate('keydown', {
        keyCode: 0,
      });

      expect(onKeyDownHandler).toBeCalled();
    });
  });
});
