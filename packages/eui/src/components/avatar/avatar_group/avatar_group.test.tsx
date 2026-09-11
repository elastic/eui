/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { fireEvent } from '@testing-library/react';
import { shouldRenderCustomStyles } from '../../../test/internal';
import { requiredProps } from '../../../test/required_props';
import { render } from '../../../test/rtl';

import { EuiAvatar } from '../avatar';
import { EuiAvatarGroup } from './avatar_group';

const avatars = (
  <>
    <EuiAvatar name="Raphael" />
    <EuiAvatar name="Donatello" />
    <EuiAvatar name="Leonardo" />
    <EuiAvatar name="Michelangelo" />
  </>
);

const overflowingAvatars = (
  <>
    {avatars}
    <EuiAvatar name="April O'Neil" />
  </>
);

describe('EuiAvatarGroup', () => {
  shouldRenderCustomStyles(
    <EuiAvatarGroup legend="People">{avatars}</EuiAvatarGroup>
  );

  test('is rendered', () => {
    const { container } = render(
      <EuiAvatarGroup legend="People" {...requiredProps}>
        {avatars}
      </EuiAvatarGroup>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('labels the group with `legend`', () => {
    const { getByRole } = render(
      <EuiAvatarGroup legend="Assignees">{avatars}</EuiAvatarGroup>
    );

    expect(getByRole('group')).toHaveAccessibleName('Assignees');
  });

  describe('size', () => {
    it('is inherited by child avatars', () => {
      const { container } = render(
        <EuiAvatarGroup legend="People" size="s">
          <EuiAvatar name="Raphael" />
        </EuiAvatarGroup>
      );

      expect(container.querySelector('.euiAvatar--s')).toBeTruthy();
    });

    it('does not override an explicit child size', () => {
      const { container } = render(
        <EuiAvatarGroup legend="People" size="s">
          <EuiAvatar name="Raphael" size="l" />
        </EuiAvatarGroup>
      );

      expect(container.querySelector('.euiAvatar--l')).toBeTruthy();
      expect(container.querySelector('.euiAvatar--s')).toBeFalsy();
    });
  });

  describe('type', () => {
    it('is inherited by child avatars', () => {
      const { container } = render(
        <EuiAvatarGroup legend="Spaces" type="space">
          <EuiAvatar name="Kibana" />
        </EuiAvatarGroup>
      );

      expect(container.querySelector('.euiAvatar--space')).toBeTruthy();
    });
  });

  describe('overflow', () => {
    it('shows 3 avatars and a +N surplus when there are more than 4 people', () => {
      const { getAllByRole, getByTestSubject } = render(
        <EuiAvatarGroup legend="People">{overflowingAvatars}</EuiAvatarGroup>
      );

      // 3 visible avatars + surplus
      expect(getAllByRole('img')).toHaveLength(4);
      expect(getByTestSubject('euiAvatarGroup-surplus')).toHaveTextContent(
        '+2'
      );
    });

    it('does not render a surplus when 4 or fewer avatars fit', () => {
      const { queryByTestSubject } = render(
        <EuiAvatarGroup legend="People">{avatars}</EuiAvatarGroup>
      );

      expect(
        queryByTestSubject('euiAvatarGroup-surplus')
      ).not.toBeInTheDocument();
    });
  });

  describe('disableExpand', () => {
    it('spreads the stack on hover by default, including small groups', () => {
      const { getByRole } = render(
        <EuiAvatarGroup legend="People">
          <EuiAvatar name="Raphael" />
          <EuiAvatar name="Donatello" />
        </EuiAvatarGroup>
      );

      expect(getByRole('group')).toHaveClass('euiAvatarGroup-expandOnHover');
    });

    it('keeps the stack collapsed when `disableExpand` is set', () => {
      const { getByRole } = render(
        <EuiAvatarGroup legend="People" disableExpand>
          {overflowingAvatars}
        </EuiAvatarGroup>
      );

      expect(getByRole('group')).not.toHaveClass(
        'euiAvatarGroup-expandOnHover'
      );
    });
  });

  describe('total', () => {
    it('adds extra people to the surplus beyond the rendered children', () => {
      const { getByTestSubject } = render(
        <EuiAvatarGroup legend="People" total={10}>
          {avatars}
        </EuiAvatarGroup>
      );

      expect(getByTestSubject('euiAvatarGroup-surplus')).toHaveTextContent(
        '+7'
      );
    });
  });

  describe('surplus', () => {
    it('caps the visible count at 99+', () => {
      const { getByTestSubject } = render(
        <EuiAvatarGroup legend="People" total={150}>
          <EuiAvatar name="Raphael" />
        </EuiAvatarGroup>
      );

      expect(getByTestSubject('euiAvatarGroup-surplus')).toHaveTextContent(
        '99+'
      );
    });

    it('exposes the remaining count to assistive technology', () => {
      const { getByTestSubject } = render(
        <EuiAvatarGroup legend="People">{overflowingAvatars}</EuiAvatarGroup>
      );

      expect(getByTestSubject('euiAvatarGroup-surplus')).toHaveAccessibleName(
        '2 more'
      );
    });

    it('shows a tooltip with the remaining count on hover', () => {
      const { getByTestSubject, getByRole, queryByRole } = render(
        <EuiAvatarGroup legend="People">{overflowingAvatars}</EuiAvatarGroup>
      );

      expect(queryByRole('tooltip')).not.toBeInTheDocument();

      fireEvent.mouseOver(getByTestSubject('euiAvatarGroup-surplus'));

      expect(getByRole('tooltip')).toHaveTextContent('2 more');
    });
  });
});
