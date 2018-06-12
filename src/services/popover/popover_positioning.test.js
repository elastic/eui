import React, { Component } from 'react';
import { mount } from 'enzyme'
import {
  getAvailableSpace,
  getElementBoundingBox,
  getPopoverScreenCoordinates
} from './popover_positioning';

describe('popover_positioning', () => {
  describe('getElementBoundingBox', () => {
    const clientRect = { top: 5, right: 20, left: 5, bottom: 50, width: 15, height: 45 };
    const _getBoundingClientRect = HTMLElement.prototype.getBoundingClientRect;
    beforeEach(() => HTMLElement.prototype.getBoundingClientRect = () => clientRect);
    afterEach(() => HTMLElement.prototype.getBoundingClientRect = _getBoundingClientRect);

    it('returns a new JavaScript object with correct values', () => {
      // `getBoundingClientRect` in the browser returns a `DOMRect`
      // and we expect `getElementBoundingBox` to return a plain object representation
      const div = document.createElement('div');
      expect(div.getBoundingClientRect()).toBe(clientRect);

      const boundingBox = getElementBoundingBox(div);
      expect(boundingBox).not.toBe(clientRect);
      expect(boundingBox).toEqual(clientRect);
    });

    it('works for React HTML and Component refs', () => {
      class App extends Component {
        render() {
          const { nested } = this.props;
          return (
            <div>
              <span ref="spanRef"/>
              {nested ? <App nested={false} ref="appRef"/> : null}
            </div>
          )
        }
      }
      const component = mount(<App nested={true}/>);
      expect(getElementBoundingBox(component.ref('spanRef'))).toEqual(clientRect);
      expect(getElementBoundingBox(component.ref('appRef'))).toEqual(clientRect);
    });
  });

  describe('getAvailableSpace', () => {
    // 50h x 30w
    const anchorBoundingBox = { top: 100, right: 60, bottom: 150, left: 30 };

    // 80h x 65w
    const containerBoundingBox = { top: 10, right: 90, bottom: 190, left: 25 };

    it('reports all empty space', () => {
      expect(getAvailableSpace(anchorBoundingBox, containerBoundingBox, 0, 0)).toEqual({
        top: 90,
        right: 30,
        bottom: 40,
        left: 5
      });
    });

    it('respects buffer', () => {
      expect(getAvailableSpace(anchorBoundingBox, containerBoundingBox, 5, 0)).toEqual({
        top: 85,
        right: 25,
        bottom: 35,
        left: 0
      });
    });

    it('respects offset', () => {
      expect(getAvailableSpace(anchorBoundingBox, containerBoundingBox, 0, 5)).toEqual({
        top: 85,
        right: 25,
        bottom: 35,
        left: 0
      });
    });

    it('respects buffer & offset', () => {
      expect(getAvailableSpace(anchorBoundingBox, containerBoundingBox, 3, 1)).toEqual({
        top: 86,
        right: 26,
        bottom: 36,
        left: 1
      });
    });
  });

  describe('getPopoverScreenCoordinates', () => {
    function makeBB(top, right, bottom, left) {
      return {
        top,
        right,
        bottom,
        left,
        width: right - left,
        height: bottom - top
      };
    }

    describe('not enough space', () => {
      it('returns null when the window does not have space on the primary axis', () => {
        // no window space on top
        expect(getPopoverScreenCoordinates({
          position: 'top',
          anchorBoundingBox: makeBB(10, 500, 15, 450),
          popoverBoundingBox: makeBB(0, 50, 50, 0),
          availableWindowSpace: { top: 0, right: 200, bottom: 200, left: 200 },
          availableContainerSpace: { top: 200, right: 200, bottom: 200, left: 200 }
        })).toBeNull();
      });

      it('returns null when the window does not have space on the cross-axis', () => {
        // enough space on top, but anchor width + available window space isn't enough
        expect(getPopoverScreenCoordinates({
          position: 'top',
          anchorBoundingBox: makeBB(10, 500, 15, 450),
          popoverBoundingBox: makeBB(0, 100, 50, 0),
          availableWindowSpace: { top: 50, right: 20, bottom: 200, left: 20 },
          availableContainerSpace: { top: 200, right: 200, bottom: 200, left: 200 }
        })).toBeNull();
      });

      it('returns null when the container does not have space on the primary axis', () => {
        // no window space on top
        expect(getPopoverScreenCoordinates({
          position: 'top',
          anchorBoundingBox: makeBB(10, 500, 15, 450),
          popoverBoundingBox: makeBB(0, 50, 50, 0),
          availableWindowSpace: { top: 200, right: 200, bottom: 200, left: 200 },
          availableContainerSpace: { top: 0, right: 200, bottom: 200, left: 200 }
        })).toBeNull();
      });

      it('returns null when the container does not have space on the cross-axis', () => {
        // enough space on top, but anchor width + available window space isn't enough
        expect(getPopoverScreenCoordinates({
          position: 'top',
          anchorBoundingBox: makeBB(10, 500, 15, 450),
          popoverBoundingBox: makeBB(0, 100, 50, 0),
          availableWindowSpace: { top: 200, right: 200, bottom: 200, left: 200 },
          availableContainerSpace: { top: 50, right: 20, bottom: 200, left: 20 }
        })).toBeNull();
      });
    });

    describe('enough space', () => {
      it('prefers placing centered along the anchor', () => {
        // no need to shift content, should be positioned at the
        // anchor's right + offset, and centered vertically
        expect(getPopoverScreenCoordinates({
          position: 'right',
          anchorBoundingBox: makeBB(300, 200, 320, 100),
          popoverBoundingBox: makeBB(0, 50, 50, 0),
          availableWindowSpace: { top: 500, right: 500, bottom: 500, left: 500 },
          availableContainerSpace: { top: 500, right: 500, bottom: 500, left: 500 },
          offset: 20
        })).toEqual({
          relativePosition: 'rightCenter',
          top: 310,
          left: 220
        });
      });

      describe('limited window space', () => {
        it('shifts along the cross axis when needed', () => {
          // bottom space is limited, should shift up to make the difference
          expect(getPopoverScreenCoordinates({
            position: 'right',
            anchorBoundingBox: makeBB(300, 200, 320, 100),
            popoverBoundingBox: makeBB(0, 50, 50, 0),
            availableWindowSpace: { top: 500, right: 500, bottom: 10, left: 500 },
            availableContainerSpace: { top: 500, right: 500, bottom: 500, left: 500 },
            offset: 20
          })).toEqual({
            relativePosition: 'rightCenter',
            top: 305,
            left: 220
          });

          // top space is limited, should shift down to make the difference
          expect(getPopoverScreenCoordinates({
            position: 'right',
            anchorBoundingBox: makeBB(300, 200, 320, 100),
            popoverBoundingBox: makeBB(0, 50, 50, 0),
            availableWindowSpace: { top: 0, right: 500, bottom: 500, left: 500 },
            availableContainerSpace: { top: 500, right: 500, bottom: 500, left: 500 },
            offset: 20
          })).toEqual({
            relativePosition: 'rightBottom',
            top: 325,
            left: 220
          });
        });
      });

      describe('limited container space', () => {
        it('shifts along the cross axis when needed', () => {
          // left space is limited, should shift right to make the difference
          expect(getPopoverScreenCoordinates({
            position: 'bottom',
            anchorBoundingBox: makeBB(300, 110, 400, 100),
            popoverBoundingBox: makeBB(0, 50, 50, 0),
            availableWindowSpace: { top: 500, right: 500, bottom: 500, left: 500 },
            availableContainerSpace: { top: 500, right: 500, bottom: 500, left: 10 },
            offset: 35
          })).toEqual({
            relativePosition: 'bottomRight',
            top: 435,
            left: 115
          });

          // right space is limited, should shift left to make the difference
          expect(getPopoverScreenCoordinates({
            position: 'top',
            anchorBoundingBox: makeBB(300, 110, 400, 100),
            popoverBoundingBox: makeBB(0, 50, 50, 0),
            availableWindowSpace: { top: 500, right: 500, bottom: 500, left: 500 },
            availableContainerSpace: { top: 500, right: 15, bottom: 500, left: 500 },
            offset: 35
          })).toEqual({
            relativePosition: 'topCenter',
            top: 215,
            left: 100
          });
        });
      });
    });
  });
});
