/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { render, mount } from 'enzyme';
import { requiredProps } from '../../test';

import { EuiContextMenuPanel, SIZES } from './context_menu_panel';

import { EuiContextMenuItem } from './context_menu_item';

import { keys } from '../../services';

const items = [
  <EuiContextMenuItem key="A" data-test-subj="itemA">
    Option A
  </EuiContextMenuItem>,
  <EuiContextMenuItem key="B" data-test-subj="itemB">
    Option B
  </EuiContextMenuItem>,
  <EuiContextMenuItem key="C" data-test-subj="itemC">
    Option C
  </EuiContextMenuItem>,
];

describe('EuiContextMenuPanel', () => {
  test('is rendered', () => {
    const component = render(
      <EuiContextMenuPanel {...requiredProps}>Hello</EuiContextMenuPanel>
    );

    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    describe('title', () => {
      test('is rendered', () => {
        const component = render(<EuiContextMenuPanel title="Title" />);

        expect(component).toMatchSnapshot();
      });
    });

    describe('size', () => {
      SIZES.forEach((size) => {
        it(`${size} is rendered`, () => {
          const component = render(
            <EuiContextMenuPanel title="Title" size={size} />
          );

          expect(component).toMatchSnapshot();
        });
      });
    });

    describe('onClose', () => {
      test('renders a button as a title', () => {
        const component = render(
          <EuiContextMenuPanel title="Title" onClose={() => {}} />
        );

        expect(component).toMatchSnapshot();
      });

      test("isn't called upon instantiation", () => {
        const onCloseHandler = jest.fn();

        mount(<EuiContextMenuPanel title="Title" onClose={onCloseHandler} />);

        expect(onCloseHandler).not.toHaveBeenCalled();
      });

      test('is called when the title is clicked', () => {
        const onCloseHandler = jest.fn();

        const component = mount(
          <EuiContextMenuPanel title="Title" onClose={onCloseHandler} />
        );

        component.find('button').simulate('click');

        expect(onCloseHandler).toHaveBeenCalledTimes(1);
      });
    });

    describe('onHeightChange', () => {
      it('is called with a height value', () => {
        const onHeightChange = jest.fn();

        mount(<EuiContextMenuPanel onHeightChange={onHeightChange} />);

        expect(onHeightChange).toHaveBeenCalledWith(0);
      });
    });

    describe('transitionDirection', () => {
      describe('next', () => {
        describe('with transitionType', () => {
          describe('in', () => {
            test('is rendered', () => {
              const component = render(
                <EuiContextMenuPanel
                  transitionDirection="next"
                  transitionType="in"
                />
              );

              expect(component).toMatchSnapshot();
            });
          });

          describe('out', () => {
            test('is rendered', () => {
              const component = render(
                <EuiContextMenuPanel
                  transitionDirection="next"
                  transitionType="out"
                />
              );

              expect(component).toMatchSnapshot();
            });
          });
        });
      });

      describe('previous', () => {
        describe('with transitionType', () => {
          describe('in', () => {
            test('is rendered', () => {
              const component = render(
                <EuiContextMenuPanel
                  transitionDirection="previous"
                  transitionType="in"
                />
              );

              expect(component).toMatchSnapshot();
            });
          });

          describe('out', () => {
            test('is rendered', () => {
              const component = render(
                <EuiContextMenuPanel
                  transitionDirection="previous"
                  transitionType="out"
                />
              );

              expect(component).toMatchSnapshot();
            });
          });
        });
      });
    });

    describe('onUseKeyboardToNavigate', () => {
      it('is called when up arrow is pressed', () => {
        const onUseKeyboardToNavigateHandler = jest.fn();

        const component = mount(
          <EuiContextMenuPanel
            items={items}
            onUseKeyboardToNavigate={onUseKeyboardToNavigateHandler}
          />
        );

        component.simulate('keydown', { key: keys.ARROW_UP });
        expect(onUseKeyboardToNavigateHandler).toHaveBeenCalledTimes(1);
      });

      it('is called when down arrow is pressed', () => {
        const onUseKeyboardToNavigateHandler = jest.fn();

        const component = mount(
          <EuiContextMenuPanel
            items={items}
            onUseKeyboardToNavigate={onUseKeyboardToNavigateHandler}
          />
        );

        component.simulate('keydown', { key: keys.ARROW_UP });
        expect(onUseKeyboardToNavigateHandler).toHaveBeenCalledTimes(1);
      });

      describe('left arrow', () => {
        it('calls handler if onClose and showPreviousPanel exists', () => {
          const onUseKeyboardToNavigateHandler = jest.fn();

          const component = mount(
            <EuiContextMenuPanel
              items={items}
              onClose={() => {}}
              showPreviousPanel={() => {}}
              onUseKeyboardToNavigate={onUseKeyboardToNavigateHandler}
            />
          );

          component.simulate('keydown', { key: keys.ARROW_LEFT });
          expect(onUseKeyboardToNavigateHandler).toHaveBeenCalledTimes(1);
        });

        it("doesn't call handler if showPreviousPanel doesn't exist", () => {
          const onUseKeyboardToNavigateHandler = jest.fn();

          const component = mount(
            <EuiContextMenuPanel
              items={items}
              onUseKeyboardToNavigate={onUseKeyboardToNavigateHandler}
            />
          );

          component.simulate('keydown', { key: keys.ARROW_LEFT });
          expect(onUseKeyboardToNavigateHandler).not.toHaveBeenCalled();
        });
      });

      describe('right arrow', () => {
        it('calls handler if showNextPanel exists', () => {
          const onUseKeyboardToNavigateHandler = jest.fn();

          const component = mount(
            <EuiContextMenuPanel
              items={items}
              showNextPanel={() => {}}
              onUseKeyboardToNavigate={onUseKeyboardToNavigateHandler}
            />
          );

          component.simulate('keydown', { key: keys.ARROW_RIGHT });
          expect(onUseKeyboardToNavigateHandler).toHaveBeenCalledTimes(1);
        });

        it("doesn't call handler if showNextPanel doesn't exist", () => {
          const onUseKeyboardToNavigateHandler = jest.fn();

          const component = mount(
            <EuiContextMenuPanel
              items={items}
              onUseKeyboardToNavigate={onUseKeyboardToNavigateHandler}
            />
          );

          component.simulate('keydown', { key: keys.ARROW_RIGHT });
          expect(onUseKeyboardToNavigateHandler).not.toHaveBeenCalled();
        });
      });
    });
  });

  // @see Cypress context_menu_panel.spec.tsx for focus & keyboard nav testing
});
