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
  });

  describe('behavior', () => {
    it('opens when clicked once', () => {
      const component = mount(<EuiAccordion id={getId()} />);

      component.find('button').simulate('click');

      expect(component).toMatchSnapshot();
    });

    it('closes when clicked twice', () => {
      const component = mount(<EuiAccordion id={getId()} />);

      component.find('button').simulate('click');
      component.find('button').simulate('click');

      expect(component).toMatchSnapshot();
    });

    it('accepts and calls an optional callback on open and close', () => {
      const onToggleHandler = jest.fn();
      const component = mount(
        <EuiAccordion id={getId()} onToggle={onToggleHandler} />
      );

      component.find('button').simulate('click');
      expect(onToggleHandler).toBeCalled();
      expect(onToggleHandler).toBeCalledWith(true);

      component.find('button').simulate('click');
      expect(onToggleHandler).toBeCalled();
      expect(onToggleHandler).toBeCalledWith(false);
    });
  });
});
