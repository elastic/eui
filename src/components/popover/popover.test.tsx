/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { ReactNode } from 'react';
import { render, mount } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import {
  EuiPopover,
  getPopoverPositionFromAnchorPosition,
  getPopoverAlignFromAnchorPosition,
  PopoverAnchorPosition,
} from './popover';

import { keys } from '../../services';

jest.mock('../portal', () => ({
  EuiPortal: ({ children }: { children: ReactNode }) => children,
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
            ownFocus={false}
            id={getId()}
            button={<button />}
            closePopover={closePopoverHandler}
            isOpen
          />
        );

        component.simulate('keydown', { key: keys.ESCAPE });
        expect(closePopoverHandler).toBeCalledTimes(1);
      });

      it('is not called when ESC key is hit and the popover is closed', () => {
        const closePopoverHandler = jest.fn();

        const component = mount(
          <EuiPopover
            id={getId()}
            button={<button />}
            closePopover={closePopoverHandler}
            isOpen={false}
          />
        );

        component.simulate('keydown', { key: keys.ESCAPE });
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
      test('defaults to true', () => {
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

      test('renders false', () => {
        const component = mount(
          <div>
            <EuiPopover
              ownFocus={false}
              id={getId()}
              isOpen
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

    describe('panelProps', () => {
      test('is rendered', () => {
        const component = mount(
          <div>
            <EuiPopover
              id={getId()}
              button={<button />}
              closePopover={() => {}}
              panelProps={requiredProps}
              isOpen
            />
          </div>
        );

        expect(component.render()).toMatchSnapshot();
      });
    });

    describe('focusTrapProps', () => {
      test('is rendered', () => {
        const component = mount(
          <div>
            <EuiPopover
              id={getId()}
              button={<button />}
              closePopover={() => {}}
              focusTrapProps={{
                clickOutsideDisables: false,
                noIsolation: false,
                scrollLock: false,
              }}
              isOpen
            />
          </div>
        );

        expect(component.render()).toMatchSnapshot();
      });
    });

    describe('offset', () => {
      test('with arrow', () => {
        const component = mount(
          <div>
            <EuiPopover
              id={getId()}
              button={<button />}
              closePopover={() => {}}
              offset={10}
              isOpen
            />
          </div>
        );

        expect(component.render()).toMatchSnapshot();
      });

      test('without arrow', () => {
        const component = mount(
          <div>
            <EuiPopover
              id={getId()}
              button={<button />}
              closePopover={() => {}}
              offset={10}
              hasArrow={false}
              isOpen
            />
          </div>
        );

        expect(component.render()).toMatchSnapshot();
      });
    });

    describe('arrowChildren', () => {
      test('is rendered', () => {
        const component = mount(
          <div>
            <EuiPopover
              id={getId()}
              button={<button />}
              closePopover={() => {}}
              arrowChildren={<span />}
              isOpen
            />
          </div>
        );

        expect(component.render()).toMatchSnapshot();
      });
    });

    test('buffer', () => {
      const component = mount(
        <div>
          <EuiPopover
            id={getId()}
            button={<button />}
            closePopover={() => {}}
            buffer={0}
            isOpen
          />
        </div>
      );

      expect(component.render()).toMatchSnapshot();
    });

    test('buffer for all sides', () => {
      const component = mount(
        <div>
          <EuiPopover
            id={getId()}
            button={<button />}
            closePopover={() => {}}
            buffer={[20, 40, 60, 80]}
            isOpen
          />
        </div>
      );

      expect(component.render()).toMatchSnapshot();
    });
  });

  describe('listener cleanup', () => {
    let _raf: typeof window['requestAnimationFrame'];
    let _caf: typeof window['cancelAnimationFrame'];
    beforeAll(() => {
      jest.useFakeTimers();
      _raf = window.requestAnimationFrame;
      _caf = window.cancelAnimationFrame;

      const activeAnimationFrames = new Map<number, number>();
      let nextAnimationFrameId = 0;
      window.requestAnimationFrame = (fn) => {
        const animationFrameId = nextAnimationFrameId++;
        activeAnimationFrames.set(animationFrameId, setTimeout(fn));
        return animationFrameId;
      };
      window.cancelAnimationFrame = (id: number) => {
        const timeoutId = activeAnimationFrames.get(id);
        if (timeoutId) {
          clearTimeout(timeoutId);
          activeAnimationFrames.delete(id);
        }
      };
    });

    afterAll(() => {
      jest.useRealTimers();
      window.requestAnimationFrame = _raf;
      window.cancelAnimationFrame = _caf;
    });

    it('cleans up timeouts and rAFs on unmount', () => {
      const component = mount(
        <EuiPopover
          id={getId()}
          button={<button />}
          closePopover={() => {}}
          panelPaddingSize="s"
          isOpen={false}
        />
      );

      component.setProps({ isOpen: true });

      component.unmount();

      // EUI's jest configuration throws an error if there are any console.error calls, like
      // React's setState on an unmounted component warning
      // to be future proof, verify that's still the case
      expect(() => {
        console.error('This is a test');
      }).toThrow();

      // execute any pending timeouts or animation frame callbacks
      // and validate the timeout/rAF clearing done by EuiPopover
      jest.advanceTimersByTime(10);
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
