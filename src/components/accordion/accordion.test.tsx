/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { render, mount } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import { EuiAccordion } from './accordion';

let id = 0;
const getId = () => `${id++}`;

describe('EuiAccordion', () => {
  test('is rendered', () => {
    const component = render(<EuiAccordion id={getId()} {...requiredProps} />);

    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    describe('element', () => {
      it('is rendered', () => {
        const component = render(
          <EuiAccordion id={getId()} element="fieldset" />
        );

        expect(component).toMatchSnapshot();
      });
    });

    describe('buttonContentClassName', () => {
      it('is rendered', () => {
        const component = render(
          <EuiAccordion
            id={getId()}
            buttonContentClassName="button content class name"
          />
        );

        expect(component).toMatchSnapshot();
      });
    });

    describe('buttonContent', () => {
      it('is rendered', () => {
        const component = render(
          <EuiAccordion
            id={getId()}
            buttonContent={<div>Button content</div>}
          />
        );

        expect(component).toMatchSnapshot();
      });
    });

    describe('buttonProps', () => {
      it('is rendered', () => {
        const component = render(
          <EuiAccordion id={getId()} buttonProps={requiredProps} />
        );

        expect(component).toMatchSnapshot();
      });
    });

    describe('buttonElement', () => {
      it('is rendered', () => {
        const component = render(
          <EuiAccordion id={getId()} buttonElement="div" />
        );

        expect(component).toMatchSnapshot();
      });
    });

    describe('extraAction', () => {
      it('is rendered', () => {
        const component = render(
          <EuiAccordion
            id={getId()}
            extraAction={<button>Extra action</button>}
          />
        );

        expect(component).toMatchSnapshot();
      });
    });

    describe('initialIsOpen', () => {
      it('is rendered', () => {
        const component = render(
          <EuiAccordion id={getId()} initialIsOpen={true}>
            <p>You can see me.</p>
          </EuiAccordion>
        );

        expect(component).toMatchSnapshot();
      });
    });

    describe('arrowDisplay', () => {
      it('right is rendered', () => {
        const component = render(
          <EuiAccordion id={getId()} arrowDisplay="right" />
        );

        expect(component).toMatchSnapshot();
      });

      it('none is rendered', () => {
        const component = render(
          <EuiAccordion id={getId()} arrowDisplay="none" />
        );

        expect(component).toMatchSnapshot();
      });
    });

    describe('arrowProps', () => {
      it('is rendered', () => {
        const component = render(
          <EuiAccordion id={getId()} arrowProps={requiredProps} />
        );

        expect(component).toMatchSnapshot();
      });
    });

    describe('forceState', () => {
      it('closed is rendered', () => {
        const component = render(
          <EuiAccordion id={getId()} forceState="closed">
            <p>You can not see me</p>
          </EuiAccordion>
        );

        expect(component).toMatchSnapshot();
      });

      it('open is rendered', () => {
        const component = render(
          <EuiAccordion id={getId()} forceState="open">
            <p>You can see me</p>
          </EuiAccordion>
        );

        expect(component).toMatchSnapshot();
      });

      it('accepts and calls an optional callback on click', () => {
        const onToggleHandler = jest.fn();
        const component = mount(
          <EuiAccordion
            id={getId()}
            onToggle={onToggleHandler}
            forceState="closed"
          />
        );

        component.find('button').at(0).simulate('click');
        expect(onToggleHandler).toBeCalled();
        expect(onToggleHandler).toBeCalledWith(true);
      });
    });

    describe('isLoading', () => {
      it('is rendered', () => {
        const component = render(<EuiAccordion id={getId()} isLoading />);

        expect(component).toMatchSnapshot();
      });
    });

    describe('isLoadingMessage', () => {
      it('is rendered', () => {
        const component = render(
          <EuiAccordion id={getId()} isLoadingMessage="Please wait" isLoading />
        );

        expect(component).toMatchSnapshot();
      });
    });
  });

  describe('behavior', () => {
    it('opens when clicked once', () => {
      const component = mount(
        <EuiAccordion id={getId()}>
          <p>You can see me.</p>
        </EuiAccordion>
      );

      component.find('button').at(0).simulate('click');

      expect(component).toMatchSnapshot();
    });

    it('opens when div is clicked if element is a div', () => {
      const component = mount(
        <EuiAccordion id={getId()} element="div">
          <p>You can see me.</p>
        </EuiAccordion>
      );

      component.find('.euiAccordion__button').simulate('click');

      expect(component).toMatchSnapshot();
    });

    it('closes when clicked twice', () => {
      const component = mount(
        <EuiAccordion id={getId()}>
          <p>You can not see me.</p>
        </EuiAccordion>
      );

      component.find('button').at(0).simulate('click');
      component.find('button').at(0).simulate('click');

      expect(component).toMatchSnapshot();
    });

    it('accepts and calls an optional callback on open and close', () => {
      const onToggleHandler = jest.fn();
      const component = mount(
        <EuiAccordion id={getId()} onToggle={onToggleHandler} />
      );

      component.find('button').at(0).simulate('click');
      expect(onToggleHandler).toBeCalled();
      expect(onToggleHandler).toBeCalledWith(true);

      component.find('button').at(0).simulate('click');
      expect(onToggleHandler).toBeCalled();
      expect(onToggleHandler).toBeCalledWith(false);
    });

    it('moves focus to the content when expanded', () => {
      const component = mount<EuiAccordion>(<EuiAccordion id={getId()} />);
      const accordionClass = component.instance();
      const childWrapper = accordionClass.childWrapper;

      expect(childWrapper).not.toBeFalsy();
      expect(childWrapper).not.toBe(document.activeElement);

      // click button
      component.find('button').at(0).simulate('click');

      expect(childWrapper).toBe(document.activeElement);
    });
  });
});
