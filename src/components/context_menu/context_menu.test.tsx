/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { mount } from 'enzyme';
import { act } from '@testing-library/react';
import { requiredProps, takeMountedSnapshot } from '../../test';
import { render } from '../../test/rtl';

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

export const tick = (ms = 0) =>
  act(() => new Promise((resolve) => setTimeout(resolve, ms)));

describe('EuiContextMenu', () => {
  test('is rendered', () => {
    const { container } = render(<EuiContextMenu {...requiredProps} />);

    expect(container.firstChild).toMatchSnapshot();
  });

  it('panel item can contain JSX', () => {
    const { container } = render(
      <EuiContextMenu panels={panels} initialPanelId={3} />
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('panel item can be a separator line', () => {
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

  describe('props', () => {
    describe('panels and initialPanelId', () => {
      it('renders the referenced panel', () => {
        const { container } = render(
          <EuiContextMenu panels={panels} initialPanelId={2} />
        );

        expect(container.firstChild).toMatchSnapshot();
      });

      it('allows you to click the title button to go back to the previous panel', async () => {
        const onPanelChange = jest.fn();
        const component = mount(
          <EuiContextMenu
            panels={panels}
            initialPanelId={2}
            onPanelChange={onPanelChange}
          />
        );

        await tick(20);

        expect(takeMountedSnapshot(component)).toMatchSnapshot();

        // Navigate to a different panel.
        component
          .find('[data-test-subj="contextMenuPanelTitleButton"]')
          .simulate('click');

        await tick(20);

        expect(takeMountedSnapshot(component)).toMatchSnapshot();
        expect(onPanelChange).toHaveBeenCalledWith({
          panelId: 1,
          direction: 'previous',
        });
      });
    });

    describe('size', () => {
      SIZES.forEach((size) => {
        it(`${size} is rendered`, () => {
          const { container } = render(
            <EuiContextMenu panels={panels} initialPanelId={2} size={size} />
          );

          expect(container.firstChild).toMatchSnapshot();
        });
      });
    });
  });
});
