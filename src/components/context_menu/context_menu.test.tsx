/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { fireEvent } from '@testing-library/react';
import { render, waitForEuiContextMenuPanelTransition } from '../../test/rtl';
import { shouldRenderCustomStyles } from '../../test/internal';
import { requiredProps } from '../../test';

import { EuiContextMenu, SIZES } from './context_menu';

const panel3 = {
  id: 3,
  title: '3',
  items: [
    {
      name: <span style={{ color: 'tomato' }}>foo</span>,
      key: 'foo',
    },
  ],
};

const panel2 = {
  id: 2,
  title: '2',
  content: <div>2</div>,
};

const panel1 = {
  id: 1,
  title: '1',
  width: 400,
  items: [
    {
      name: '2a',
      panel: 2,
    },
    {
      name: '2b',
      panel: 2,
    },
    {
      name: '2c',
      panel: 2,
    },
  ],
};

const panel0 = {
  id: 0,
  title: '0',
  items: [
    {
      name: '1',
      panel: 1,
    },
  ],
};

const panels = [panel0, panel1, panel2, panel3];

describe('EuiContextMenu', () => {
  shouldRenderCustomStyles(<EuiContextMenu />);

  it('renders', () => {
    const { container } = render(<EuiContextMenu {...requiredProps} />);

    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders panels with JSX', () => {
    const { container } = render(
      <EuiContextMenu panels={panels} initialPanelId={3} />
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders isSeparator items', () => {
    const { container } = render(
      <EuiContextMenu
        panels={[
          {
            id: 3,
            title: 'Testing separator',
            items: [
              { name: 'Foo', key: 'foo' },
              { isSeparator: true },
              { name: 'Bar', key: 'bar' },
            ],
          },
        ]}
        initialPanelId={3}
      />
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('can pass-through horizontal rule props', () => {
    const { container } = render(
      <EuiContextMenu
        panels={[
          {
            id: 3,
            title: 'Testing separator',
            items: [
              {
                isSeparator: true,
                key: 'separator',
                margin: 's',
                size: 'half',
              },
            ],
          },
        ]}
        initialPanelId={3}
      />
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('allows wildcard content via the `renderItem` prop', () => {
    const CustomComponent = () => (
      <div data-test-subj="custom">Hello world</div>
    );

    const { container, getByTestSubject } = render(
      <EuiContextMenu
        panels={[
          {
            id: 1,
            title: 'Testing renderItem',
            items: [
              {
                name: 'Renders an EuiContextMenuItem',
                panel: 2,
              },
              {
                renderItem: () => <h3 data-test-subj="subtitle">Subtitle</h3>,
              },
              {
                key: 'custom',
                renderItem: CustomComponent,
              },
              ...panel3.items,
            ],
          },
        ]}
        initialPanelId={1}
      />
    );

    expect(container.querySelectorAll('.euiContextMenuItem')).toHaveLength(3);
    expect(getByTestSubject('subtitle')).toHaveTextContent('Subtitle');
    expect(getByTestSubject('custom')).toHaveTextContent('Hello world');
  });

  describe('props', () => {
    describe('panels and initialPanelId', () => {
      it('renders the referenced panel', () => {
        const { container } = render(
          <EuiContextMenu panels={panels} initialPanelId={2} />
        );

        expect(container.firstChild).toMatchSnapshot();
      });

      it('navigates to the next panel', async () => {
        const onPanelChange = jest.fn();
        const { getByText } = render(
          <EuiContextMenu
            panels={panels}
            initialPanelId={1}
            onPanelChange={onPanelChange}
          />
        );
        fireEvent.click(getByText('2a'));
        await waitForEuiContextMenuPanelTransition();

        expect(onPanelChange).toHaveBeenCalledWith({
          panelId: 2,
          direction: 'next',
        });
      });

      it('navigates back to the previous panel when clicking the title button', async () => {
        const onPanelChange = jest.fn();
        const { getByTestSubject } = render(
          <EuiContextMenu
            panels={panels}
            initialPanelId={2}
            onPanelChange={onPanelChange}
          />
        );
        fireEvent.click(getByTestSubject('contextMenuPanelTitleButton'));
        await waitForEuiContextMenuPanelTransition();

        expect(onPanelChange).toHaveBeenCalledWith({
          panelId: 1,
          direction: 'previous',
        });
      });
    });

    describe('size', () => {
      SIZES.forEach((size) => {
        test(size, () => {
          const { container } = render(
            <EuiContextMenu panels={panels} initialPanelId={2} size={size} />
          );

          expect(container.firstChild).toMatchSnapshot();
        });
      });
    });
  });
});
