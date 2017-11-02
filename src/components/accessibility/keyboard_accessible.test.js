import React from 'react';
import {
  render,
  shallow,
} from 'enzyme';
import sinon from 'sinon';

import { EuiKeyboardAccessible } from './keyboard_accessible';

import { keyCodes } from '../../services';

describe('EuiKeyboardAccessible', () => {
  describe('throws an error', () => {
    let consoleStub;

    beforeEach(() => {
      consoleStub = sinon.stub(console, 'error');
    });

    afterEach(() => {
      console.error.restore();
    });

    test(`when there's no child`, () => {
      const component = ( // eslint-disable-line no-unused-vars
        <EuiKeyboardAccessible />
      );

      expect(consoleStub.calledOnce).toBe(true);
      expect(consoleStub.getCall(0).args[0]).toContain(
        `needs to wrap an element with which the user interacts.`
      );
    });

    test('when the child is a button', () => {
      const component = ( // eslint-disable-line no-unused-vars
        <EuiKeyboardAccessible>
          <button onClick={() => {}} />
        </EuiKeyboardAccessible>
      );

      expect(consoleStub.calledOnce).toBe(true);
      expect(consoleStub.getCall(0).args[0]).toContain(
        `doesn't need to be used on a button.`
      );
    });

    test('when the child is a link with an href', () => {
      const component = ( // eslint-disable-line no-unused-vars
        <EuiKeyboardAccessible>
          <a href="#" onClick={() => {}} />
        </EuiKeyboardAccessible>
      );

      expect(consoleStub.calledOnce).toBe(true);
      expect(consoleStub.getCall(0).args[0]).toContain(
        `doesn't need to be used on a link if it has a href attribute.`
      );
    });

    test(`when the child doesn't have an onClick prop`, () => {
      const component = ( // eslint-disable-line no-unused-vars
        <EuiKeyboardAccessible>
          <div />
        </EuiKeyboardAccessible>
      );

      expect(consoleStub.calledOnce).toBe(true);
      expect(consoleStub.getCall(0).args[0]).toContain(
        `needs to wrap an element which has an onClick prop assigned.`
      );
    });

    test(`when the child's onClick prop isn't a function`, () => {
      const component = ( // eslint-disable-line no-unused-vars
        <EuiKeyboardAccessible>
          <div onClick="notAFunction" />
        </EuiKeyboardAccessible>
      );

      expect(consoleStub.calledOnce).toBe(true);
      expect(consoleStub.getCall(0).args[0]).toContain(
        `child's onClick prop needs to be a function.`
      );
    });
  });

  describe(`doesn't throw an error`, () => {
    test('when the element is a link without an href', () => {
      const consoleStub = sinon.stub(console, 'error');
      const component = ( // eslint-disable-line no-unused-vars
        <EuiKeyboardAccessible>
          <a onClick={() => {}} />
        </EuiKeyboardAccessible>
      );

      expect(consoleStub.called).toBe(false);
      console.error.restore();
    });
  });

  describe('adds accessibility attributes', () => {
    test('tabindex and role', () => {
      const $button = render(
        <EuiKeyboardAccessible>
          <div onClick={() => {}} />
        </EuiKeyboardAccessible>
      );

      expect($button)
        .toMatchSnapshot();
    });
  });

  describe(`doesn't override pre-existing accessibility attributes`, () => {
    test('tabindex', () => {
      const $button = render(
        <EuiKeyboardAccessible>
          <div onClick={() => {}} tabIndex="1" />
        </EuiKeyboardAccessible>
      );

      expect($button)
        .toMatchSnapshot();
    });

    test('role', () => {
      const $button = render(
        <EuiKeyboardAccessible>
          <div onClick={() => {}} role="submit" />
        </EuiKeyboardAccessible>
      );

      expect($button)
        .toMatchSnapshot();
    });
  });

  describe(`calls onClick`, () => {
    test(`on ENTER keyup`, () => {
      const onClickHandler = sinon.stub();

      const $button = shallow(
        <EuiKeyboardAccessible>
          <div data-div onClick={onClickHandler} />
        </EuiKeyboardAccessible>
      );

      $button.find('[data-div]').simulate('keyup', {
        keyCode: keyCodes.ENTER
      });

      sinon.assert.calledOnce(onClickHandler);
    });

    test(`on SPACE keyup`, () => {
      const onClickHandler = sinon.stub();

      const $button = shallow(
        <EuiKeyboardAccessible>
          <div data-div onClick={onClickHandler} />
        </EuiKeyboardAccessible>
      );

      $button.find('[data-div]').simulate('keyup', {
        keyCode: keyCodes.SPACE
      });

      sinon.assert.calledOnce(onClickHandler);
    });
  });

  describe(`child's props`, () => {
    test(`onKeyUp handler is called`, () => {
      const onKeyUpHandler = sinon.stub();

      const $button = shallow(
        <EuiKeyboardAccessible>
          <div data-div onKeyUp={onKeyUpHandler} />
        </EuiKeyboardAccessible>
      );

      $button.find('[data-div]').simulate('keyup', {
        keyCode: 0,
      });

      sinon.assert.calledOnce(onKeyUpHandler);
    });

    test(`onKeyDown handler is called`, () => {
      const onKeyDownHandler = sinon.stub();

      const $button = shallow(
        <EuiKeyboardAccessible>
          <div data-div onKeyDown={onKeyDownHandler} />
        </EuiKeyboardAccessible>
      );

      $button.find('[data-div]').simulate('keydown', {
        keyCode: 0,
      });

      sinon.assert.calledOnce(onKeyDownHandler);
    });
  });
});
