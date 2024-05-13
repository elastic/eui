/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { fireEvent } from '@testing-library/react';
import { render } from '../../test/rtl';
import { shouldRenderCustomStyles } from '../../test/internal';
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
  shouldRenderCustomStyles(<EuiContextMenuPanel />);

  it('renders', () => {
    const { container } = render(
      <EuiContextMenuPanel {...requiredProps}>Hello</EuiContextMenuPanel>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  describe('props', () => {
    test('title', () => {
      const { container } = render(<EuiContextMenuPanel title="Title" />);

      expect(container.firstChild).toMatchSnapshot();
    });

    describe('size', () => {
      SIZES.forEach((size) => {
        test(size, () => {
          const { container } = render(
            <EuiContextMenuPanel title="Title" size={size} />
          );

          expect(container.firstChild).toMatchSnapshot();
        });
      });
    });

    describe('onClose', () => {
      it('renders a button and a left arrow', () => {
        const { container, getByTestSubject } = render(
          <EuiContextMenuPanel title="Title" onClose={() => {}} />
        );

        expect(
          getByTestSubject('contextMenuPanelTitleButton').nodeName
        ).toEqual('BUTTON');
        expect(
          container.querySelector('[data-euiicon-type="arrowLeft"]')
        ).toBeInTheDocument();
      });

      it('renders a plain div if onClose is not passed', () => {
        const { getByTestSubject } = render(
          <EuiContextMenuPanel title="Title" />
        );

        expect(getByTestSubject('contextMenuPanelTitle').nodeName).toEqual(
          'DIV'
        );
      });

      it('is called when the title is clicked', () => {
        const onCloseHandler = jest.fn();

        const { getByTestSubject } = render(
          <EuiContextMenuPanel title="Title" onClose={onCloseHandler} />
        );

        fireEvent.click(getByTestSubject('contextMenuPanelTitleButton'));

        expect(onCloseHandler).toHaveBeenCalledTimes(1);
      });
    });

    describe('onHeightChange', () => {
      it('is called with a height value', () => {
        const onHeightChange = jest.fn();

        render(<EuiContextMenuPanel onHeightChange={onHeightChange} />);

        expect(onHeightChange).toHaveBeenCalledWith(0);
      });
    });

    describe('onUseKeyboardToNavigate', () => {
      it('is called when up arrow is pressed', () => {
        const onUseKeyboardToNavigateHandler = jest.fn();

        const { container } = render(
          <EuiContextMenuPanel
            items={items}
            onUseKeyboardToNavigate={onUseKeyboardToNavigateHandler}
          />
        );

        fireEvent.keyDown(container.firstChild!, { key: keys.ARROW_UP });
        expect(onUseKeyboardToNavigateHandler).toHaveBeenCalledTimes(1);
      });

      it('is called when down arrow is pressed', () => {
        const onUseKeyboardToNavigateHandler = jest.fn();

        const { container } = render(
          <EuiContextMenuPanel
            items={items}
            onUseKeyboardToNavigate={onUseKeyboardToNavigateHandler}
          />
        );

        fireEvent.keyDown(container.firstChild!, { key: keys.ARROW_UP });
        expect(onUseKeyboardToNavigateHandler).toHaveBeenCalledTimes(1);
      });

      describe('left arrow', () => {
        it('calls handler if onClose and showPreviousPanel exists', () => {
          const onUseKeyboardToNavigateHandler = jest.fn();

          const { container } = render(
            <EuiContextMenuPanel
              items={items}
              onClose={() => {}}
              showPreviousPanel={() => {}}
              onUseKeyboardToNavigate={onUseKeyboardToNavigateHandler}
            />
          );

          fireEvent.keyDown(container.firstChild!, { key: keys.ARROW_LEFT });
          expect(onUseKeyboardToNavigateHandler).toHaveBeenCalledTimes(1);
        });

        it("doesn't call handler if showPreviousPanel doesn't exist", () => {
          const onUseKeyboardToNavigateHandler = jest.fn();

          const { container } = render(
            <EuiContextMenuPanel
              items={items}
              onUseKeyboardToNavigate={onUseKeyboardToNavigateHandler}
            />
          );

          fireEvent.keyDown(container.firstChild!, { key: keys.ARROW_LEFT });
          expect(onUseKeyboardToNavigateHandler).not.toHaveBeenCalled();
        });
      });

      describe('right arrow', () => {
        it('calls handler if showNextPanel exists', () => {
          const onUseKeyboardToNavigateHandler = jest.fn();

          const { container } = render(
            <EuiContextMenuPanel
              items={items}
              showNextPanel={() => {}}
              onUseKeyboardToNavigate={onUseKeyboardToNavigateHandler}
            />
          );

          fireEvent.keyDown(container.firstChild!, { key: keys.ARROW_RIGHT });
          expect(onUseKeyboardToNavigateHandler).toHaveBeenCalledTimes(1);
        });

        it("doesn't call handler if showNextPanel doesn't exist", () => {
          const onUseKeyboardToNavigateHandler = jest.fn();

          const { container } = render(
            <EuiContextMenuPanel
              items={items}
              onUseKeyboardToNavigate={onUseKeyboardToNavigateHandler}
            />
          );

          fireEvent.keyDown(container.firstChild!, { key: keys.ARROW_RIGHT });
          expect(onUseKeyboardToNavigateHandler).not.toHaveBeenCalled();
        });
      });
    });
  });

  // @see Cypress context_menu_panel.spec.tsx for focus & keyboard nav testing
});
