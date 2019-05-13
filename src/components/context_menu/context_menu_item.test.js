import React from 'react';
import { render, shallow, mount } from 'enzyme';
import sinon from 'sinon';
import { requiredProps } from '../../test/required_props';

import { EuiContextMenuItem } from './context_menu_item';

describe('EuiContextMenuItem', () => {
  test('is rendered', () => {
    const component = render(
      <EuiContextMenuItem {...requiredProps}>Hello</EuiContextMenuItem>
    );

    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    describe('icon', () => {
      test('is rendered', () => {
        const component = render(
          <EuiContextMenuItem icon={<span className="euiIcon fa-user" />} />
        );

        expect(component).toMatchSnapshot();
      });
    });

    describe('disabled', () => {
      test('is rendered', () => {
        const component = render(<EuiContextMenuItem disabled />);

        expect(component).toMatchSnapshot();
      });
    });

    describe('onClick', () => {
      test('renders a button', () => {
        const component = render(
          <EuiContextMenuItem {...requiredProps} onClick={() => {}} />
        );

        expect(component).toMatchSnapshot();
      });

      test(`isn't called upon instantiation`, () => {
        const onClickHandler = sinon.stub();

        shallow(<EuiContextMenuItem onClick={onClickHandler} />);

        sinon.assert.notCalled(onClickHandler);
      });

      test('is called when the item is clicked', () => {
        const onClickHandler = sinon.stub();

        const component = shallow(
          <EuiContextMenuItem onClick={onClickHandler} />
        );

        component.simulate('click');

        sinon.assert.calledOnce(onClickHandler);
      });

      test('is not called when the item is clicked but set to disabled', () => {
        const onClickHandler = sinon.stub();

        const component = mount(
          <EuiContextMenuItem disabled onClick={onClickHandler} />
        );

        component.simulate('click');

        sinon.assert.notCalled(onClickHandler);
      });
    });

    describe('href', () => {
      test('renders a link', () => {
        const component = render(
          <EuiContextMenuItem {...requiredProps} href="url" />
        );

        expect(component).toMatchSnapshot();
      });
    });

    describe('rel', () => {
      test('is rendered', () => {
        const component = render(
          <EuiContextMenuItem {...requiredProps} href="url" rel="help" />
        );

        expect(component).toMatchSnapshot();
      });
    });

    describe('target', () => {
      test('is rendered', () => {
        const component = render(
          <EuiContextMenuItem {...requiredProps} href="url" target="_blank" />
        );

        expect(component).toMatchSnapshot();
      });
    });

    describe('hasPanel', () => {
      test('is rendered', () => {
        const component = render(<EuiContextMenuItem hasPanel />);

        expect(component).toMatchSnapshot();
      });
    });
  });
});
