import {
  findPopoverPosition,
  getAvailableSpace,
  getElementBoundingBox,
  getPopoverScreenCoordinates,
  getVisibleFit,
  EuiClientRect,
  POSITIONS,
} from './popover_positioning';

function makeBB(
  top: number,
  right: number,
  bottom: number,
  left: number
): EuiClientRect {
  return {
    top,
    right,
    bottom,
    left,
    width: right - left,
    height: bottom - top,
  };
}

describe('popover_positioning', () => {
  describe('getElementBoundingBox', () => {
    const clientRect = {
      top: 5,
      right: 20,
      left: 5,
      bottom: 50,
      width: 15,
      height: 45,
    };
    const origGetBoundingClientRect =
      HTMLElement.prototype.getBoundingClientRect;
    beforeEach(
      () => (HTMLElement.prototype.getBoundingClientRect = () => clientRect)
    );
    afterEach(
      () =>
        (HTMLElement.prototype.getBoundingClientRect = origGetBoundingClientRect)
    );

    it('returns a new JavaScript object with correct values', () => {
      // `getBoundingClientRect` in the browser returns a `DOMRect`
      // and we expect `getElementBoundingBox` to return a plain object representation
      const div = document.createElement('div');
      expect(div.getBoundingClientRect()).toBe(clientRect);

      const boundingBox = getElementBoundingBox(div);
      expect(boundingBox).not.toBe(clientRect);
      expect(boundingBox).toEqual(clientRect);
    });
  });

  describe('getAvailableSpace', () => {
    // 50h x 30w
    const anchorBoundingBox = { top: 100, right: 60, bottom: 150, left: 30 };

    // 80h x 65w
    const containerBoundingBox = { top: 10, right: 90, bottom: 190, left: 25 };

    const expectedAvailableSpace = {
      top: 90,
      right: 30,
      bottom: 40,
      left: 5,
    };

    it('returns the distance from each side of the anchor to each side of the container', () => {
      POSITIONS.forEach(side => {
        expect(
          getAvailableSpace(anchorBoundingBox, containerBoundingBox, 0, 0, side)
        ).toEqual(expectedAvailableSpace);
      });
    });

    it('subtracts the buffer amount from the returned distances', () => {
      POSITIONS.forEach(side => {
        expect(
          getAvailableSpace(anchorBoundingBox, containerBoundingBox, 5, 0, side)
        ).toEqual({
          top: expectedAvailableSpace.top - 5,
          right: expectedAvailableSpace.right - 5,
          bottom: expectedAvailableSpace.bottom - 5,
          left: expectedAvailableSpace.left - 5,
        });
      });
    });

    it('subtracts the offset from the specified offsetSide', () => {
      POSITIONS.forEach(side => {
        expect(
          getAvailableSpace(anchorBoundingBox, containerBoundingBox, 0, 5, side)
        ).toEqual({
          ...expectedAvailableSpace,
          [side]: expectedAvailableSpace[side] - 5,
        });
      });
    });

    it('subtracts the buffer and the offset from the specified offsetSide', () => {
      POSITIONS.forEach(side => {
        expect(
          getAvailableSpace(anchorBoundingBox, containerBoundingBox, 3, 1, side)
        ).toEqual({
          // apply buffer space
          top: expectedAvailableSpace.top - 3,
          right: expectedAvailableSpace.right - 3,
          bottom: expectedAvailableSpace.bottom - 3,
          left: expectedAvailableSpace.left - 3,
          // additionally, overwrite the current side with buffer & offset
          [side]: expectedAvailableSpace[side] - 3 - 1,
        });
      });
    });
  });

  describe('getVisibleFit', () => {
    it('calculates full visibility when content is fully enclosed by container', () => {
      const content = { top: 25, right: 50, bottom: 50, left: 25 };
      const container = { top: 0, right: 500, bottom: 500, left: 0 };
      expect(getVisibleFit(content, container)).toBe(1);
    });

    it('calculates full visibility when container is the same size', () => {
      const content = { top: 25, right: 50, bottom: 50, left: 25 };
      const container = { top: 25, right: 50, bottom: 50, left: 25 };
      expect(getVisibleFit(content, container)).toBe(1);
    });

    it('calculates partial visibility when content overflows out of container', () => {
      const content = { top: -5, right: 5, bottom: 5, left: -5 };
      const container = { top: 0, right: 10, bottom: 10, left: 0 };
      expect(getVisibleFit(content, container)).toBe(0.25);
    });

    it('calculates zero visibility when content is not in the container', () => {
      const content = { top: -10, right: -5, bottom: -5, left: -10 };
      const container = { top: 0, right: 10, bottom: 10, left: 0 };
      expect(getVisibleFit(content, container)).toBe(0);
    });
  });

  describe('getPopoverScreenCoordinates', () => {
    describe('not enough space', () => {
      it('returns correct fit when the window does not have space on the primary axis', () => {
        // no window space on top
        expect(
          getPopoverScreenCoordinates({
            position: 'top',
            anchorBoundingBox: makeBB(10, 500, 15, 450),
            popoverBoundingBox: makeBB(0, 50, 50, 0),
            windowBoundingBox: makeBB(0, 1024, 768, 0),
            containerBoundingBox: makeBB(0, 1024, 768, 0),
          })
        ).toEqual({
          fit: 0.2,
          top: -40,
          left: 450,
        });
      });

      it('returns correct fit when the window does not have space on the cross-axis', () => {
        // enough space on top, but anchor width + available window space isn't enough
        expect(
          getPopoverScreenCoordinates({
            position: 'top',
            anchorBoundingBox: makeBB(10, 500, 15, 450),
            popoverBoundingBox: makeBB(0, 100, 50, 0),
            windowBoundingBox: makeBB(0, 1024, 768, 430),
            containerBoundingBox: makeBB(0, 1024, 768, 0),
          })
        ).toEqual({
          fit: 0.2,
          top: -40,
          left: 430,
        });
      });

      it('returns correct fit when the container does not have space on the primary axis', () => {
        // no window space on top
        expect(
          getPopoverScreenCoordinates({
            position: 'top',
            anchorBoundingBox: makeBB(10, 500, 15, 450),
            popoverBoundingBox: makeBB(0, 50, 50, 0),
            windowBoundingBox: makeBB(0, 1024, 768, 0),
            containerBoundingBox: makeBB(0, 1024, 768, 0),
          })
        ).toEqual({
          fit: 0.2,
          top: -40,
          left: 450,
        });
      });

      it('returns null when the container does not have space on the cross-axis', () => {
        // enough space on top, but anchor width + available window space isn't enough
        expect(
          getPopoverScreenCoordinates({
            position: 'top',
            anchorBoundingBox: makeBB(10, 500, 15, 450),
            popoverBoundingBox: makeBB(0, 100, 50, 0),
            windowBoundingBox: makeBB(0, 520, 768, 430),
            containerBoundingBox: makeBB(0, 1024, 768, 0),
          })
        ).toEqual({
          fit: 0.18,
          top: -40,
          left: 430,
        });
      });
    });

    describe('enough space', () => {
      it('prefers placing centered along the anchor', () => {
        // no need to shift content, should be positioned at the
        // anchor's right + offset, and centered vertically
        expect(
          getPopoverScreenCoordinates({
            position: 'right',
            anchorBoundingBox: makeBB(300, 200, 320, 100),
            popoverBoundingBox: makeBB(0, 50, 50, 0),
            windowBoundingBox: makeBB(0, 1024, 768, 0),
            containerBoundingBox: makeBB(0, 1024, 768, 0),
            offset: 20,
          })
        ).toEqual({
          fit: 1,
          top: 285,
          left: 220,
        });
      });

      describe('limited window space', () => {
        it('shifts along the cross axis when needed', () => {
          // bottom space is limited, should shift up to make the difference
          expect(
            getPopoverScreenCoordinates({
              position: 'right',
              anchorBoundingBox: makeBB(300, 200, 320, 100),
              popoverBoundingBox: makeBB(0, 50, 50, 0),
              windowBoundingBox: makeBB(0, 1024, 330, 0),
              containerBoundingBox: makeBB(0, 1024, 768, 0),
              offset: 20,
            })
          ).toEqual({
            fit: 1,
            top: 280,
            left: 220,
          });

          // top space is limited, should shift down to make the difference
          expect(
            getPopoverScreenCoordinates({
              position: 'right',
              anchorBoundingBox: makeBB(300, 200, 320, 100),
              popoverBoundingBox: makeBB(0, 50, 50, 0),
              windowBoundingBox: makeBB(300, 1024, 768, 0),
              containerBoundingBox: makeBB(0, 1024, 768, 0),
              offset: 20,
            })
          ).toEqual({
            fit: 1,
            top: 300,
            left: 220,
          });
        });
      });

      describe('limited container space', () => {
        it('shifts along the cross axis when needed', () => {
          // left space is limited, should shift right to make the difference
          expect(
            getPopoverScreenCoordinates({
              position: 'bottom',
              anchorBoundingBox: makeBB(300, 110, 400, 100),
              popoverBoundingBox: makeBB(0, 50, 50, 0),
              windowBoundingBox: makeBB(0, 1024, 768, 0),
              containerBoundingBox: makeBB(0, 1024, 768, 90),
              offset: 35,
            })
          ).toEqual({
            fit: 1,
            top: 435,
            left: 90,
          });

          // right space is limited, should shift left to make the difference
          expect(
            getPopoverScreenCoordinates({
              position: 'top',
              anchorBoundingBox: makeBB(300, 110, 400, 100),
              popoverBoundingBox: makeBB(0, 50, 50, 0),
              windowBoundingBox: makeBB(0, 1024, 768, 0),
              containerBoundingBox: makeBB(0, 125, 768, 0),
              offset: 35,
            })
          ).toEqual({
            fit: 1,
            top: 215,
            left: 75,
          });
        });
      });
    });

    describe('arrow positioning', () => {
      it('calculates the position for the arrow', () => {
        expect(
          getPopoverScreenCoordinates({
            position: 'top',
            anchorBoundingBox: makeBB(100, 100, 100, 0),
            popoverBoundingBox: makeBB(0, 50, 50, 0),
            windowBoundingBox: makeBB(0, 1024, 768, 0),
            containerBoundingBox: makeBB(0, 1024, 768, 0),
            offset: 10,
            arrowConfig: { arrowWidth: 5, arrowBuffer: 0 },
          })
        ).toEqual({
          fit: 1,
          top: 40,
          left: 25,
          arrow: {
            top: 50,
            left: 22.5,
          },
        });
      });

      it('respects the arrow buffer', () => {
        expect(
          getPopoverScreenCoordinates({
            position: 'top',
            anchorBoundingBox: makeBB(45, 55, 55, 45),
            popoverBoundingBox: makeBB(0, 50, 50, 0),
            windowBoundingBox: makeBB(0, 1024, 768, 0),
            containerBoundingBox: makeBB(0, 1024, 768, 40),
            offset: 10,
            arrowConfig: { arrowWidth: 5, arrowBuffer: 10 },
          })
        ).toEqual({
          fit: 0.665,
          top: -15,
          left: 37.5,
          arrow: {
            top: 50,
            left: 10,
          },
        });
      });

      it('respects both popover & arrow buffers', () => {
        expect(
          getPopoverScreenCoordinates({
            position: 'top',
            anchorBoundingBox: makeBB(45, 55, 55, 45),
            popoverBoundingBox: makeBB(0, 50, 50, 0),
            windowBoundingBox: makeBB(0, 1024, 768, 0),
            containerBoundingBox: makeBB(0, 1024, 768, 40),
            offset: 10,
            buffer: 15,
            arrowConfig: { arrowWidth: 5, arrowBuffer: 10 },
          })
        ).toEqual({
          fit: 0.26,
          top: -15,
          left: 37.5,
          arrow: {
            top: 50,
            left: 10,
          },
        });
      });
    });

    describe('align position', () => {
      it('aligns the cross-axis position to align with the anchor boundary', () => {
        expect(
          getPopoverScreenCoordinates({
            position: 'top',
            align: 'left',
            anchorBoundingBox: makeBB(100, 125, 110, 75),
            popoverBoundingBox: makeBB(0, 100, 50, 0),
            windowBoundingBox: makeBB(0, 1024, 768, 0),
            containerBoundingBox: makeBB(0, 1024, 768, 0),
            arrowConfig: { arrowWidth: 6, arrowBuffer: 10 },
          })
        ).toEqual({
          fit: 1,
          top: 50,
          left: 75,
          arrow: {
            top: 50,
            left: 22,
          },
        });

        expect(
          getPopoverScreenCoordinates({
            position: 'bottom',
            align: 'right',
            anchorBoundingBox: makeBB(100, 125, 110, 75),
            popoverBoundingBox: makeBB(0, 100, 50, 0),
            windowBoundingBox: makeBB(0, 1024, 768, 0),
            containerBoundingBox: makeBB(0, 1024, 768, 0),
            arrowConfig: { arrowWidth: 6, arrowBuffer: 20 },
          })
        ).toEqual({
          fit: 1,
          top: 110,
          left: 25,
          arrow: {
            top: 0,
            left: 72,
          },
        });
      });

      it('aligns content best as possible in limited space', () => {
        expect(
          getPopoverScreenCoordinates({
            position: 'right',
            align: 'bottom',
            anchorBoundingBox: makeBB(100, 125, 110, 75),
            popoverBoundingBox: makeBB(0, 100, 200, 0),
            windowBoundingBox: makeBB(-200, 1024, 768, 0),
            containerBoundingBox: makeBB(-200, 1024, 768, 0),
            arrowConfig: { arrowWidth: 6, arrowBuffer: 10 },
          })
        ).toEqual({
          fit: 1,
          top: -82,
          left: 125,
          arrow: {
            top: 184,
            left: 0,
          },
        });
      });
    });
  });

  describe('findPopoverPosition', () => {
    beforeEach(() => {
      // reset any scrolling before each test
      // @ts-ignore
      window.pageXOffset = 0;
      // @ts-ignore
      window.pageYOffset = 0;
    });

    describe('placement in desired position', () => {
      it('finds space in the requested position', () => {
        const anchor = document.createElement('div');
        anchor.getBoundingClientRect = () => makeBB(100, 150, 120, 50);

        const popover = document.createElement('div');
        popover.getBoundingClientRect = () => makeBB(0, 30, 50, 0);

        const container = document.createElement('div');
        container.getBoundingClientRect = () => makeBB(0, 1024, 768, 0);

        expect(
          findPopoverPosition({
            position: 'top',
            anchor,
            popover,
            container,
            offset: 7,
          })
        ).toEqual({
          fit: 1,
          position: 'top',
          top: 43,
          left: 85,
        });
      });
    });

    describe('placement falls back to position on same axis', () => {
      it('finds space in the requested position', () => {
        const anchor = document.createElement('div');
        anchor.getBoundingClientRect = () => makeBB(100, 150, 120, 50);

        const popover = document.createElement('div');
        popover.getBoundingClientRect = () => makeBB(0, 30, 50, 0);

        // give the container limited space on both left and top, forcing to bottom-right
        const container = document.createElement('div');
        container.getBoundingClientRect = () => makeBB(50, 300, 768, 30);

        expect(
          findPopoverPosition({
            position: 'left',
            anchor,
            popover,
            container,
            offset: 5,
          })
        ).toEqual({
          fit: 1,
          position: 'right',
          top: 85,
          left: 155,
        });
      });
    });

    describe('placement falls back to first complementary position', () => {
      it('finds space in the requested position', () => {
        const anchor = document.createElement('div');
        anchor.getBoundingClientRect = () => makeBB(100, 150, 120, 50);

        const popover = document.createElement('div');
        popover.getBoundingClientRect = () => makeBB(0, 30, 50, 0);

        // give the container limited space on both left and right, forcing to top
        const container = document.createElement('div');
        container.getBoundingClientRect = () => makeBB(0, 160, 768, 40);

        expect(
          findPopoverPosition({
            position: 'right',
            anchor,
            popover,
            container,
            offset: 5,
          })
        ).toEqual({
          fit: 1,
          position: 'top',
          top: 45,
          left: 85,
        });
      });

      it('ignores any specified alignment', () => {
        const anchor = document.createElement('div');
        anchor.getBoundingClientRect = () => makeBB(100, 150, 120, 50);

        const popover = document.createElement('div');
        popover.getBoundingClientRect = () => makeBB(0, 30, 50, 0);

        // give the container limited space on both left and right, forcing to top
        const container = document.createElement('div');
        container.getBoundingClientRect = () => makeBB(0, 160, 768, 40);

        expect(
          findPopoverPosition({
            position: 'right',
            align: 'bottom',
            anchor,
            popover,
            container,
            offset: 5,
          })
        ).toEqual({
          fit: 1,
          position: 'top',
          top: 45,
          left: 85,
        });
      });

      it('respects forcePosition value', () => {
        const anchor = document.createElement('div');
        anchor.getBoundingClientRect = () => makeBB(100, 150, 120, 50);

        const popover = document.createElement('div');
        popover.getBoundingClientRect = () => makeBB(0, 30, 50, 0);

        // give the container limited space on both left and right, forcing to top
        const container = document.createElement('div');
        container.getBoundingClientRect = () => makeBB(0, 160, 768, 40);

        expect(
          findPopoverPosition({
            position: 'right',
            forcePosition: true,
            anchor,
            popover,
            container,
            offset: 5,
          })
        ).toEqual({
          fit: 0,
          position: 'right',
          top: 85,
          left: 155,
        });
      });
    });

    describe('placement falls back to second complementary position', () => {
      it('finds space in the requested position', () => {
        const anchor = document.createElement('div');
        anchor.getBoundingClientRect = () => makeBB(100, 150, 120, 50);

        const popover = document.createElement('div');
        popover.getBoundingClientRect = () => makeBB(0, 30, 50, 0);

        // give the container limited space on both left, right, and top, forcing to bottom
        const container = document.createElement('div');
        container.getBoundingClientRect = () => makeBB(100, 160, 768, 40);

        expect(
          findPopoverPosition({
            position: 'right',
            anchor,
            popover,
            container,
            offset: 5,
          })
        ).toEqual({
          fit: 1,
          position: 'bottom',
          top: 125,
          left: 85,
        });
      });
    });

    describe('scrolling', () => {
      it('adds body scroll position to position values', () => {
        // @ts-ignore
        window.pageYOffset = 100;
        // @ts-ignore
        window.pageXOffset = 15;

        const anchor = document.createElement('div');
        anchor.getBoundingClientRect = () => makeBB(100, 150, 120, 50);

        const popover = document.createElement('div');
        popover.getBoundingClientRect = () => makeBB(0, 30, 50, 0);

        const container = document.createElement('div');
        container.getBoundingClientRect = () => makeBB(0, 1024, 768, 0);

        expect(
          findPopoverPosition({
            position: 'top',
            anchor,
            popover,
            container,
            offset: 7,
          })
        ).toEqual({
          fit: 1,
          position: 'top',
          top: 143,
          left: 100,
        });
      });
    });

    describe('disable positioning on the cross-axis', () => {
      it('forces the popover to stay on the primary axis', () => {
        const anchor = document.createElement('div');
        anchor.getBoundingClientRect = () => makeBB(450, 150, 550, 50);

        const popover = document.createElement('div');
        popover.getBoundingClientRect = () => makeBB(0, 30, 100, 0);

        const container = document.createElement('div');
        container.getBoundingClientRect = () => makeBB(400, 1024, 600, 0);

        expect(
          findPopoverPosition({
            position: 'top',
            anchor,
            popover,
            container,
            allowCrossAxis: false,
          })
        ).toEqual({
          fit: 0.34,
          position: 'top',
          top: 350,
          left: 85,
        });
      });
    });

    it('returns anchorBoundingBox if param is specified', () => {
      const anchor = document.createElement('div');
      anchor.getBoundingClientRect = () => makeBB(100, 150, 120, 50);

      const popover = document.createElement('div');
      popover.getBoundingClientRect = () => makeBB(0, 30, 50, 0);

      expect(
        findPopoverPosition({
          position: 'left',
          returnBoundingBox: true,
          anchor,
          popover,
        })
      ).toEqual({
        fit: 1,
        position: 'left',
        top: 85,
        left: 20,
        anchorBoundingBox: {
          bottom: 120,
          height: 20,
          left: 50,
          right: 150,
          top: 100,
          width: 100,
        },
      });
    });
  });
});
