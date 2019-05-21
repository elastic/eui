import React from 'react';
import { render, mount } from 'enzyme';
import sinon from 'sinon';
import { findTestSubject, requiredProps } from '../../test';

import { EuiContextMenuPanel } from './context_menu_panel';

import { EuiContextMenuItem } from './context_menu_item';

import { tick } from './context_menu.test';

import { keyCodes } from '../../services';

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

    describe('onClose', () => {
      test('renders a button as a title', () => {
        const component = render(
          <EuiContextMenuPanel title="Title" onClose={() => {}} />
        );

        expect(component).toMatchSnapshot();
      });

      test(`isn't called upon instantiation`, () => {
        const onCloseHandler = sinon.stub();

        mount(<EuiContextMenuPanel title="Title" onClose={onCloseHandler} />);

        sinon.assert.notCalled(onCloseHandler);
      });

      test('is called when the title is clicked', () => {
        const onCloseHandler = sinon.stub();

        const component = mount(
          <EuiContextMenuPanel title="Title" onClose={onCloseHandler} />
        );

        component.find('button').simulate('click');

        sinon.assert.calledOnce(onCloseHandler);
      });
    });

    describe('onHeightChange', () => {
      it('is called with a height value', () => {
        const onHeightChange = sinon.stub();

        mount(<EuiContextMenuPanel onHeightChange={onHeightChange} />);

        sinon.assert.calledWith(onHeightChange, 0);
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

    describe('initialFocusedItemIndex', () => {
      it('sets focus on the item occupying that index', async () => {
        const component = mount(
          <EuiContextMenuPanel items={items} initialFocusedItemIndex={1} />
        );

        await tick(20);

        expect(findTestSubject(component, 'itemB').getDOMNode()).toBe(
          document.activeElement
        );
      });
    });

    describe('onUseKeyboardToNavigate', () => {
      it('is called when up arrow is pressed', () => {
        const onUseKeyboardToNavigateHandler = sinon.stub();

        const component = mount(
          <EuiContextMenuPanel
            items={items}
            onUseKeyboardToNavigate={onUseKeyboardToNavigateHandler}
          />
        );

        component.simulate('keydown', { keyCode: keyCodes.UP });
        sinon.assert.calledOnce(onUseKeyboardToNavigateHandler);
      });

      it('is called when down arrow is pressed', () => {
        const onUseKeyboardToNavigateHandler = sinon.stub();

        const component = mount(
          <EuiContextMenuPanel
            items={items}
            onUseKeyboardToNavigate={onUseKeyboardToNavigateHandler}
          />
        );

        component.simulate('keydown', { keyCode: keyCodes.UP });
        sinon.assert.calledOnce(onUseKeyboardToNavigateHandler);
      });

      describe('left arrow', () => {
        it('calls handler if showPreviousPanel exists', () => {
          const onUseKeyboardToNavigateHandler = sinon.stub();

          const component = mount(
            <EuiContextMenuPanel
              items={items}
              showPreviousPanel={() => {}}
              onUseKeyboardToNavigate={onUseKeyboardToNavigateHandler}
            />
          );

          component.simulate('keydown', { keyCode: keyCodes.LEFT });
          sinon.assert.calledOnce(onUseKeyboardToNavigateHandler);
        });

        it(`doesn't call handler if showPreviousPanel doesn't exist`, () => {
          const onUseKeyboardToNavigateHandler = sinon.stub();

          const component = mount(
            <EuiContextMenuPanel
              items={items}
              onUseKeyboardToNavigate={onUseKeyboardToNavigateHandler}
            />
          );

          component.simulate('keydown', { keyCode: keyCodes.LEFT });
          sinon.assert.notCalled(onUseKeyboardToNavigateHandler);
        });
      });

      describe('right arrow', () => {
        it('calls handler if showNextPanel exists', () => {
          const onUseKeyboardToNavigateHandler = sinon.stub();

          const component = mount(
            <EuiContextMenuPanel
              items={items}
              showNextPanel={() => {}}
              onUseKeyboardToNavigate={onUseKeyboardToNavigateHandler}
            />
          );

          component.simulate('keydown', { keyCode: keyCodes.RIGHT });
          sinon.assert.calledOnce(onUseKeyboardToNavigateHandler);
        });

        it(`doesn't call handler if showNextPanel doesn't exist`, () => {
          const onUseKeyboardToNavigateHandler = sinon.stub();

          const component = mount(
            <EuiContextMenuPanel
              items={items}
              onUseKeyboardToNavigate={onUseKeyboardToNavigateHandler}
            />
          );

          component.simulate('keydown', { keyCode: keyCodes.RIGHT });
          sinon.assert.notCalled(onUseKeyboardToNavigateHandler);
        });
      });
    });
  });

  describe('behavior', () => {
    describe('focus', () => {
      it('is set on the first focusable element by default if there are no items and hasFocus is true', async () => {
        const component = mount(
          <EuiContextMenuPanel>
            <button data-test-subj="button" />
          </EuiContextMenuPanel>
        );

        await tick(20);

        expect(findTestSubject(component, 'button').getDOMNode()).toBe(
          document.activeElement
        );
      });

      it('is not set on anything if hasFocus is false', () => {
        const component = mount(
          <EuiContextMenuPanel hasFocus={false}>
            <button data-test-subj="button" />
          </EuiContextMenuPanel>
        );

        expect(findTestSubject(component, 'button').getDOMNode()).not.toBe(
          document.activeElement
        );
      });
    });

    describe('keyboard navigation of items', () => {
      let component;
      let showNextPanelHandler;
      let showPreviousPanelHandler;

      beforeEach(() => {
        showNextPanelHandler = sinon.stub();
        showPreviousPanelHandler = sinon.stub();

        component = mount(
          <EuiContextMenuPanel
            items={items}
            showNextPanel={showNextPanelHandler}
            showPreviousPanel={showPreviousPanelHandler}
          />
        );
      });

      it(`focuses the panel by default`, async () => {
        await tick(20);

        expect(component.getDOMNode()).toBe(document.activeElement);
      });

      it('down arrow key focuses the first menu item', async () => {
        component.simulate('keydown', { keyCode: keyCodes.DOWN });

        await tick(20);
        expect(findTestSubject(component, 'itemA').getDOMNode()).toBe(
          document.activeElement
        );
      });

      it('subsequently, down arrow key focuses the next menu item', async () => {
        component.simulate('keydown', { keyCode: keyCodes.DOWN });
        component.simulate('keydown', { keyCode: keyCodes.DOWN });

        await tick(20);
        expect(findTestSubject(component, 'itemB').getDOMNode()).toBe(
          document.activeElement
        );
      });

      it('down arrow key wraps to first menu item', async () => {
        component.simulate('keydown', { keyCode: keyCodes.UP });
        component.simulate('keydown', { keyCode: keyCodes.DOWN });

        await tick(20);
        expect(findTestSubject(component, 'itemA').getDOMNode()).toBe(
          document.activeElement
        );
      });

      it('up arrow key focuses the last menu item', async () => {
        component.simulate('keydown', { keyCode: keyCodes.UP });

        await tick(20);
        expect(findTestSubject(component, 'itemC').getDOMNode()).toBe(
          document.activeElement
        );
      });

      it('subsequently, up arrow key focuses the previous menu item', async () => {
        component.simulate('keydown', { keyCode: keyCodes.UP });
        component.simulate('keydown', { keyCode: keyCodes.UP });

        await tick(20);
        expect(findTestSubject(component, 'itemB').getDOMNode()).toBe(
          document.activeElement
        );
      });

      it('up arrow key wraps to last menu item', async () => {
        component.simulate('keydown', { keyCode: keyCodes.DOWN });
        component.simulate('keydown', { keyCode: keyCodes.UP });

        await tick(20);
        expect(findTestSubject(component, 'itemC').getDOMNode()).toBe(
          document.activeElement
        );
      });

      it(`right arrow key shows next panel with focused item's index`, () => {
        component.simulate('keydown', { keyCode: keyCodes.DOWN });
        component.simulate('keydown', { keyCode: keyCodes.RIGHT });
        sinon.assert.calledWith(showNextPanelHandler, 0);
      });

      it('left arrow key shows previous panel', () => {
        component.simulate('keydown', { keyCode: keyCodes.LEFT });
        sinon.assert.calledOnce(showPreviousPanelHandler);
      });
    });
  });

  describe('updating items and content', () => {
    describe('updates to items', () => {
      it(`should not re-render if any items's watchedItemProps did not change`, () => {
        expect.assertions(2); // make sure the assertion in the `setProps` callback is executed

        // by not passing `watchedItemProps` no changes to items should cause a re-render
        const component = mount(
          <EuiContextMenuPanel
            items={[
              <EuiContextMenuItem key="A" data-counter={0}>
                Option A
              </EuiContextMenuItem>,
              <EuiContextMenuItem key="B" data-counter={1}>
                Option B
              </EuiContextMenuItem>,
            ]}
          />
        );

        expect(component.debug()).toMatchSnapshot();

        component.setProps(
          {
            items: [
              <EuiContextMenuItem key="A" data-counter={2}>
                Option A
              </EuiContextMenuItem>,
              <EuiContextMenuItem key="B" data-counter={3}>
                Option B
              </EuiContextMenuItem>,
            ],
          },
          () => {
            expect(component.debug()).toMatchSnapshot();
          }
        );
      });

      it(`should re-render if any items's watchedItemProps did change`, () => {
        expect.assertions(2); // make sure the assertion in the `setProps` callback is executed

        // by referencing the `data-counter` property in `watchedItemProps`
        // changes to the items should be picked up and re-rendered
        const component = mount(
          <EuiContextMenuPanel
            watchedItemProps={['data-counter']}
            items={[
              <EuiContextMenuItem key="A" data-counter={0}>
                Option A
              </EuiContextMenuItem>,
              <EuiContextMenuItem key="B" data-counter={1}>
                Option B
              </EuiContextMenuItem>,
            ]}
          />
        );

        expect(component.debug()).toMatchSnapshot();

        component.setProps(
          {
            items: [
              <EuiContextMenuItem key="A" data-counter={2}>
                Option A
              </EuiContextMenuItem>,
              <EuiContextMenuItem key="B" data-counter={3}>
                Option B
              </EuiContextMenuItem>,
            ],
          },
          () => {
            expect(component.debug()).toMatchSnapshot();
          }
        );
      });

      it(`should re-render at all times when children exists`, () => {
        expect.assertions(2); // make sure the assertion in the `setProps` callback is executed

        const component = mount(
          <EuiContextMenuPanel>Hello World</EuiContextMenuPanel>
        );

        expect(component.debug()).toMatchSnapshot();

        component.setProps({ children: 'More Salutations' }, () => {
          expect(component.debug()).toMatchSnapshot();
        });
      });
    });
  });
});
