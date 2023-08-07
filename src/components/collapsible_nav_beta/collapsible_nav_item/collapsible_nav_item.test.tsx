/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { render } from '../../../test/rtl';
import { shouldRenderCustomStyles } from '../../../test/internal';
import { requiredProps } from '../../../test';

import { EuiCollapsibleNavContext } from '../context';
import { EuiCollapsibleNavItem } from './collapsible_nav_item';

describe('EuiCollapsibleNavItem', () => {
  shouldRenderCustomStyles(
    <EuiCollapsibleNavItem
      title="Title"
      href="#"
      items={[{ title: 'Sub-item' }]}
    />,
    { childProps: ['linkProps', 'accordionProps'] }
  );

  it('renders a top level accordion if items exist', () => {
    const { container } = render(
      <EuiCollapsibleNavItem
        {...requiredProps}
        title="Item"
        items={[{ title: 'Sub-item', ...requiredProps }]}
      />
    );

    expect(container.firstChild).toHaveClass('euiAccordion');
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders a top level link if items are missing or empty', () => {
    const { container } = render(
      <EuiCollapsibleNavItem
        {...requiredProps}
        title="Item"
        href="#"
        items={[]}
      />
    );

    expect(container.firstChild).toHaveClass('euiLink');
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders a collapsed button icon when in a collapsed push flyout', () => {
    const { container, getByTestSubject } = render(
      <EuiCollapsibleNavContext.Provider
        value={{ side: 'left', isPush: true, isCollapsed: true }}
      >
        <EuiCollapsibleNavItem {...requiredProps} title="Item" />
      </EuiCollapsibleNavContext.Provider>
    );

    expect(getByTestSubject('euiCollapsedNavButton')).toBeInTheDocument();
    expect(container.firstChild).toMatchSnapshot();
  });

  describe('link interactivity', () => {
    it('renders a static span if no href or onClick is present', () => {
      const { container } = render(<EuiCollapsibleNavItem title="Text" />);
      expect(container.firstChild!.nodeName).toEqual('SPAN');
    });

    it('renders an anchor link if href is present', () => {
      const { container } = render(
        <EuiCollapsibleNavItem title="Link" href="#" />
      );
      expect(container.firstChild!.nodeName).toEqual('A');
    });

    it('renders a button if onClick is present', () => {
      const { rerender, container } = render(
        <EuiCollapsibleNavItem title="Button" onClick={() => {}} />
      );
      expect(container.firstChild!.nodeName).toEqual('BUTTON');

      rerender(
        <EuiCollapsibleNavItem title="Item" linkProps={{ onClick: () => {} }} />
      );
      expect(container.firstChild!.nodeName).toEqual('BUTTON');
    });
  });

  describe('title display', () => {
    it('allows customizing the title element', () => {
      const { container } = render(
        <EuiCollapsibleNavItem title="Item" titleElement="h2" />
      );

      expect(container.querySelector('h2')).toHaveTextContent('Item');
    });

    it('allows rendering an icon', () => {
      const { container } = render(
        <EuiCollapsibleNavItem title="Item" icon="home" />
      );

      expect(
        container.querySelector('[data-euiicon-type="home"]')
      ).toBeTruthy();
    });

    it('allows passing custom props to the icon', () => {
      const { container } = render(
        <EuiCollapsibleNavItem
          title="Item"
          icon="home"
          iconProps={{ size: 's', color: 'primary' }}
        />
      );

      // NOTE: We stub out rendered EuiIcons, so this as useful an assertion as it gets.
      // Converting this into a visual screenshot test would probably be more useful
      expect(container.querySelector('[data-euiicon-type]')).toHaveAttribute(
        'color',
        'primary'
      );
    });
  });

  describe('sub items', () => {
    it('renders each nested `items` array with a subitem component/styling', () => {
      const { container } = render(
        <EuiCollapsibleNavItem
          title="Item"
          items={[
            { title: '1' },
            { title: '2' },
            { title: '3', items: [{ title: '4' }, { title: '5' }] },
          ]}
        />
      );

      expect(
        container.querySelectorAll('.euiCollapsibleNavSubItem')
      ).toHaveLength(5);
    });

    it('renders group titles', () => {
      const { container } = render(
        <EuiCollapsibleNavItem
          title="Item"
          items={[
            { isGroupTitle: true, title: 'Section' },
            { title: 'Hello' },
            { title: 'World' },
          ]}
        />
      );

      expect(container.querySelector('.euiCollapsibleNavItem__groupTitle'))
        .toMatchInlineSnapshot(`
        <div
          class="euiTitle euiCollapsibleNavItem__groupTitle eui-textTruncate emotion-euiTitle-xxxs-euiCollapsibleNavItem__groupTitle"
        >
          Section
        </div>
      `);
    });

    it('allows customizing the group title element', () => {
      const { container } = render(
        <EuiCollapsibleNavItem
          title="Item"
          items={[
            {
              isGroupTitle: true,
              title: 'Group title',
              titleElement: 'h2',
            },
            { title: 'Link 1', titleElement: 'h3' },
          ]}
        />
      );

      expect(container.querySelector('.euiCollapsibleNavItem__groupTitle'))
        .toMatchInlineSnapshot(`
        <h2
          class="euiTitle euiCollapsibleNavItem__groupTitle eui-textTruncate emotion-euiTitle-xxxs-euiCollapsibleNavItem__groupTitle"
        >
          Group title
        </h2>
      `);
    });
  });
});
