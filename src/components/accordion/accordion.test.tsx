/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { fireEvent } from '@testing-library/react';
import { mount } from 'enzyme';
import { shouldRenderCustomStyles } from '../../test/internal';
import { requiredProps } from '../../test/required_props';
import { render } from '../../test/rtl';

import { EuiAccordion } from './accordion';

let id = 0;
const getId = () => `${id++}`;

describe('EuiAccordion', () => {
  shouldRenderCustomStyles(<EuiAccordion id="styles" />, {
    childProps: ['buttonProps', 'arrowProps'],
  });

  test('is rendered', () => {
    const { container } = render(
      <EuiAccordion id={getId()} {...requiredProps} />
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  describe('props', () => {
    describe('element', () => {
      it('is rendered', () => {
        const { container } = render(
          <EuiAccordion id={getId()} element="fieldset" />
        );

        expect(container.firstChild).toMatchSnapshot();
      });
    });

    describe('buttonContentClassName', () => {
      it('is rendered', () => {
        const { container } = render(
          <EuiAccordion
            id={getId()}
            buttonContentClassName="button content class name"
          />
        );

        expect(container.firstChild).toMatchSnapshot();
      });
    });

    describe('buttonContent', () => {
      it('is rendered', () => {
        const { container } = render(
          <EuiAccordion
            id={getId()}
            buttonContent={<div>Button content</div>}
          />
        );

        expect(container.firstChild).toMatchSnapshot();
      });
    });

    describe('buttonProps', () => {
      it('is rendered', () => {
        const { container } = render(
          <EuiAccordion id={getId()} buttonProps={requiredProps} />
        );

        expect(container.firstChild).toMatchSnapshot();
      });
    });

    describe('buttonElement', () => {
      it('is rendered', () => {
        const { container } = render(
          <EuiAccordion id={getId()} buttonElement="div" />
        );

        expect(container.firstChild).toMatchSnapshot();
      });
    });

    describe('extraAction', () => {
      it('is rendered', () => {
        const { container } = render(
          <EuiAccordion
            id={getId()}
            extraAction={<button>Extra action</button>}
          />
        );

        expect(container.firstChild).toMatchSnapshot();
      });
    });

    describe('initialIsOpen', () => {
      it('is rendered', () => {
        const { container } = render(
          <EuiAccordion id={getId()} initialIsOpen={true}>
            <p>You can see me.</p>
          </EuiAccordion>
        );

        expect(container.firstChild).toMatchSnapshot();
      });
    });

    describe('arrowDisplay', () => {
      it('right is rendered', () => {
        const { container } = render(
          <EuiAccordion id={getId()} arrowDisplay="right" />
        );

        expect(container.firstChild).toMatchSnapshot();
      });

      it('none is rendered', () => {
        const { container } = render(
          <EuiAccordion id={getId()} arrowDisplay="none" />
        );

        expect(container.firstChild).toMatchSnapshot();
      });
    });

    describe('arrowProps', () => {
      it('is rendered', () => {
        const { container } = render(
          <EuiAccordion id={getId()} arrowProps={requiredProps} />
        );

        expect(container.firstChild).toMatchSnapshot();
      });
    });

    describe('forceState', () => {
      it('closed is rendered', () => {
        const { container } = render(
          <EuiAccordion id={getId()} forceState="closed">
            <p>You can not see me</p>
          </EuiAccordion>
        );

        expect(container.firstChild).toMatchSnapshot();
      });

      it('open is rendered', () => {
        const { container } = render(
          <EuiAccordion id={getId()} forceState="open">
            <p>You can see me</p>
          </EuiAccordion>
        );

        expect(container.firstChild).toMatchSnapshot();
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
        const { container } = render(<EuiAccordion id={getId()} isLoading />);

        expect(container.firstChild).toMatchSnapshot();
      });
    });

    describe('isLoadingMessage', () => {
      it('is rendered', () => {
        const { container } = render(
          <EuiAccordion id={getId()} isLoadingMessage="Please wait" isLoading />
        );

        expect(container.firstChild).toMatchSnapshot();
      });
    });
  });

  describe('isDisabled', () => {
    it('is rendered', () => {
      const { container } = render(<EuiAccordion id={getId()} isDisabled />);

      expect(container.firstChild).toMatchSnapshot();
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

      expect(component.render()).toMatchSnapshot();
    });

    it('does not open when isDisabled', () => {
      const component = mount(
        <EuiAccordion id={getId()} isDisabled>
          <p>You cannot see me.</p>
        </EuiAccordion>
      );

      component.find('button').at(0).simulate('click');

      expect(component.render()).toMatchSnapshot();
    });

    it('opens when div is clicked if element is a div', () => {
      const component = mount(
        <EuiAccordion id={getId()} element="div">
          <p>You can see me.</p>
        </EuiAccordion>
      );

      component.find('button').at(0).simulate('click');

      expect(component.render()).toMatchSnapshot();
    });

    it('closes when clicked twice', () => {
      const component = mount(
        <EuiAccordion id={getId()}>
          <p>You can not see me.</p>
        </EuiAccordion>
      );

      component.find('button').at(0).simulate('click');
      component.find('button').at(0).simulate('click');

      expect(component.render()).toMatchSnapshot();
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
      const component = mount(<EuiAccordion id={getId()} />);
      const childWrapper = component.find('div[role="region"]').getDOMNode();

      expect(childWrapper).not.toBeFalsy();
      expect(childWrapper).not.toBe(document.activeElement);

      // click the button
      component.find('button').at(0).simulate('click');

      expect(childWrapper).toBe(document.activeElement);
    });

    it('sets tabbable children to `tabIndex={-1}` when accordions are closed', () => {
      const { container } = render(
        <EuiAccordion id={getId()}>
          <button>tabbable item one</button>
          <input type="text" placeholder="tabbable item two" />
          <a href="#">tabbable item three</a>
          <div tabIndex={0}>tabbable item four</div>
        </EuiAccordion>
      );
      const children = container.querySelector('.euiAccordion__children')!;

      expect(children.querySelectorAll('[tabindex="-1"]')).toHaveLength(4);
      expect(children).toMatchSnapshot();
    });

    it('restores tabbable children on accordion open', () => {
      const { container, getByTestSubject } = render(
        <EuiAccordion
          id={getId()}
          buttonProps={{ 'data-test-subj': 'trigger' }}
        >
          <button>tabbable item one</button>
          <input type="text" placeholder="tabbable item two" />
          <a href="#">tabbable item three</a>
          <div tabIndex={0}>tabbable item four</div>
        </EuiAccordion>
      );
      fireEvent.click(getByTestSubject('trigger'));
      const children = container.querySelector('.euiAccordion__children')!;

      expect(children.querySelectorAll('[tabindex="-1"]')).toHaveLength(0);
      expect(children).toMatchSnapshot();
    });
  });
});
