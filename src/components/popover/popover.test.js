import React from 'react';
import { render, mount } from 'enzyme';
import sinon from 'sinon';
import { requiredProps } from '../../test/required_props';

import { EuiPopover } from './popover';

import { keyCodes } from '../../services';

describe('EuiPopover', () => {
  test('is rendered', () => {
    const component = render(
      <EuiPopover
        button={<button />}
        closePopover={() => {}}
        {...requiredProps}
      />
    );

    expect(component)
      .toMatchSnapshot();
  });

  test('children is rendered', () => {
    const component = render(
      <EuiPopover
        button={<button />}
        closePopover={() => {}}
      >
        Children
      </EuiPopover>
    );

    expect(component)
      .toMatchSnapshot();
  });

  describe('props', () => {
    describe('withTitle', () => {
      test('is rendered', () => {
        const component = render(
          <EuiPopover
            withTitle
            button={<button />}
            closePopover={() => {}}
          />
        );

        expect(component)
          .toMatchSnapshot();
      });
    });

    describe('closePopover', () => {
      it('is called when ESC key is hit', () => {
        const closePopoverHandler = sinon.stub();

        const component = mount(
          <EuiPopover
            withTitle
            button={<button />}
            closePopover={closePopoverHandler}
          />
        );

        component.simulate('keydown', { keyCode: keyCodes.ESCAPE });
        sinon.assert.calledOnce(closePopoverHandler);
      });
    });

    describe('anchorPosition', () => {
      test('defaults to centerDown', () => {
        const component = render(
          <EuiPopover
            button={<button />}
            closePopover={() => {}}
          />
        );

        expect(component)
          .toMatchSnapshot();
      });

      test('leftCenter is rendered', () => {
        const component = render(
          <EuiPopover
            button={<button />}
            closePopover={() => {}}
            anchorPosition="leftCenter"
          />
        );

        expect(component)
          .toMatchSnapshot();
      });

      test('downRight is rendered', () => {
        const component = render(
          <EuiPopover
            button={<button />}
            closePopover={() => {}}
            anchorPosition="downRight"
          />
        );

        expect(component)
          .toMatchSnapshot();
      });
    });

    describe('isOpen', () => {
      test('defaults to false', () => {
        const component = render(
          <EuiPopover
            button={<button />}
            closePopover={() => {}}
          />
        );

        expect(component)
          .toMatchSnapshot();
      });

      test('renders true', () => {
        const component = render(
          <EuiPopover
            button={<button />}
            closePopover={() => {}}
            isOpen
          />
        );

        expect(component)
          .toMatchSnapshot();
      });
    });

    describe('ownFocus', () => {
      test('defaults to false', () => {
        const component = render(
          <EuiPopover
            isOpen
            button={<button />}
            closePopover={() => {}}
          />
        );

        expect(component)
          .toMatchSnapshot();
      });

      test('renders true', () => {
        const component = render(
          <EuiPopover
            isOpen
            ownFocus
            button={<button />}
            closePopover={() => {}}
          />
        );

        expect(component)
          .toMatchSnapshot();
      });
    });

    describe('panelClassName', () => {
      test('is rendered', () => {
        const component = render(
          <EuiPopover
            button={<button />}
            closePopover={() => {}}
            panelClassName="test"
            isOpen
          />
        );

        expect(component)
          .toMatchSnapshot();
      });
    });

    describe('panelPaddingSize', () => {
      test('is rendered', () => {
        const component = render(
          <EuiPopover
            button={<button />}
            closePopover={() => {}}
            panelPaddingSize="s"
            isOpen
          />
        );

        expect(component)
          .toMatchSnapshot();
      });
    });
  });
});
