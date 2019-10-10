import React, { ReactNode } from 'react';
import { render, mount } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import {
  EuiPopover,
  getPopoverPositionFromAnchorPosition,
  getPopoverAlignFromAnchorPosition,
  PopoverAnchorPosition,
} from './popover';

import { keyCodes } from '../../services';

jest.mock('../portal', () => ({
  EuiPortal: ({ children }: { children: ReactNode }) => children,
}));

// Mock the htmlIdGenerator to generate predictable ids for snapshot tests
jest.mock('../../services/accessibility/html_id_generator', () => ({
  htmlIdGenerator: () => () => 'htmlId',
}));

let id = 0;
const getId = () => `${id++}`;

describe('EuiPopover', () => {
  test('is rendered', () => {
    const component = render(
      <EuiPopover
        id={getId()}
        button={<button />}
        closePopover={() => {}}
        {...requiredProps}
      />
    );

    expect(component).toMatchSnapshot();
  });

  test('children is rendered', () => {
    const component = render(
      <EuiPopover id={getId()} button={<button />} closePopover={() => {}}>
        Children
      </EuiPopover>
    );

    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    describe('display block', () => {
      test('is rendered', () => {
        const component = render(
          <EuiPopover
            id={getId()}
            display="block"
            button={<button />}
            closePopover={() => {}}
          />
        );

        expect(component).toMatchSnapshot();
      });
    });

    describe('anchorClassName', () => {
      test('is rendered', () => {
        const component = render(
          <EuiPopover
            id={getId()}
            anchorClassName="test"
            button={<button />}
            closePopover={() => {}}
          />
        );

        expect(component).toMatchSnapshot();
      });
    });

    describe('closePopover', () => {
      it('is called when ESC key is hit and the popover is open', () => {
        const closePopoverHandler = jest.fn();

        const component = mount(
          <EuiPopover
            id={getId()}
            withTitle
            button={<button />}
            closePopover={closePopoverHandler}
            isOpen
          />
        );

        component.simulate('keydown', { keyCode: keyCodes.ESCAPE });
        expect(closePopoverHandler).toBeCalledTimes(1);
      });

      it('is not called when ESC key is hit and the popover is closed', () => {
        const closePopoverHandler = jest.fn();

        const component = mount(
          <EuiPopover
            id={getId()}
            withTitle
            button={<button />}
            closePopover={closePopoverHandler}
            isOpen={false}
          />
        );

        component.simulate('keydown', { keyCode: keyCodes.ESCAPE });
        expect(closePopoverHandler).not.toBeCalled();
      });
    });

    describe('anchorPosition', () => {
      test('defaults to centerDown', () => {
        const component = render(
          <EuiPopover
            id={getId()}
            button={<button />}
            closePopover={() => {}}
          />
        );

        expect(component).toMatchSnapshot();
      });

      test('leftCenter is rendered', () => {
        const component = render(
          <EuiPopover
            id={getId()}
            button={<button />}
            closePopover={() => {}}
            anchorPosition="leftCenter"
          />
        );

        expect(component).toMatchSnapshot();
      });

      test('downRight is rendered', () => {
        const component = render(
          <EuiPopover
            id={getId()}
            button={<button />}
            closePopover={() => {}}
            anchorPosition="downRight"
          />
        );

        expect(component).toMatchSnapshot();
      });
    });

    describe('isOpen', () => {
      test('defaults to false', () => {
        const component = render(
          <EuiPopover
            id={getId()}
            button={<button />}
            closePopover={() => {}}
          />
        );

        expect(component).toMatchSnapshot();
      });

      test('renders true', () => {
        const component = mount(
          <div>
            <EuiPopover
              id={getId()}
              button={<button />}
              closePopover={() => {}}
              isOpen
            />
          </div>
        );

        // console.log(component.debug());

        expect(component.render()).toMatchSnapshot();
      });
    });

    describe('ownFocus', () => {
      test('defaults to false', () => {
        const component = mount(
          <div>
            <EuiPopover
              id={getId()}
              isOpen
              button={<button />}
              closePopover={() => {}}
            />
          </div>
        );

        expect(component.render()).toMatchSnapshot();
      });

      test('renders true', () => {
        const component = mount(
          <div>
            <EuiPopover
              id={getId()}
              isOpen
              ownFocus
              button={<button />}
              closePopover={() => {}}
            />
          </div>
        );

        expect(component.render()).toMatchSnapshot();
      });
    });

    describe('panelClassName', () => {
      test('is rendered', () => {
        const component = mount(
          <div>
            <EuiPopover
              id={getId()}
              button={<button />}
              closePopover={() => {}}
              panelClassName="test"
              isOpen
            />
          </div>
        );

        expect(component.render()).toMatchSnapshot();
      });
    });

    describe('panelPaddingSize', () => {
      test('is rendered', () => {
        const component = mount(
          <div>
            <EuiPopover
              id={getId()}
              button={<button />}
              closePopover={() => {}}
              panelPaddingSize="s"
              isOpen
            />
          </div>
        );

        expect(component.render()).toMatchSnapshot();
      });
    });
  });
});

describe('getPopoverPositionFromAnchorPosition', () => {
  it('maps the first anchor position in a camel-cased string to a popover position', () => {
    expect(getPopoverPositionFromAnchorPosition('upLeft')).toBe('top');
    expect(getPopoverPositionFromAnchorPosition('rightDown')).toBe('right');
    expect(getPopoverPositionFromAnchorPosition('downRight')).toBe('bottom');
    expect(getPopoverPositionFromAnchorPosition('leftUp')).toBe('left');
  });

  it('returns undefined when an invalid position is extracted', () => {
    expect(
      getPopoverPositionFromAnchorPosition(
        'nowhereNohow' as PopoverAnchorPosition
      )
    ).toBeUndefined();
  });
});

describe('getPopoverAlignFromAnchorPosition', () => {
  it('maps the second anchor position in a camel-cased string to a popover position', () => {
    expect(getPopoverAlignFromAnchorPosition('upLeft')).toBe('left');
    expect(getPopoverAlignFromAnchorPosition('rightDown')).toBe('bottom');
    expect(getPopoverAlignFromAnchorPosition('downRight')).toBe('right');
    expect(getPopoverAlignFromAnchorPosition('leftUp')).toBe('top');
  });

  it('returns undefined when an invalid position is extracted', () => {
    expect(
      getPopoverAlignFromAnchorPosition('nowhereNohow' as PopoverAnchorPosition)
    ).toBeUndefined();
  });
});
