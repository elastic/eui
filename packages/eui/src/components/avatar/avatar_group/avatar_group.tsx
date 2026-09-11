/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  CSSProperties,
  forwardRef,
  HTMLAttributes,
  ReactElement,
  ReactNode,
  Ref,
  useMemo,
} from 'react';
import { css } from '@emotion/react';
import classNames from 'classnames';

import { useEuiMemoizedStyles, useEuiTheme } from '../../../services';
import { CommonProps } from '../../common';
import type { EuiAvatarSize, EuiAvatarType } from '../avatar';

import { EuiAvatarGroupContext } from './avatar_group_context';
import {
  euiAvatarGroupAvatarSize,
  euiAvatarGroupOverlapAmount,
  euiAvatarGroupStyles,
} from './avatar_group.styles';
import { EuiAvatarGroupSurplus } from './avatar_group_surplus';

/** Hard cap: 4 slots. When there are more people, the last slot is `+N`. */
const MAX_SLOTS = 4;

// Unwrap fragments so `{avatars}` and nested `<>...</>` count as individual children
function flattenAvatarGroupChildren(children: ReactNode): ReactElement[] {
  const result: ReactElement[] = [];
  React.Children.forEach(children, (child) => {
    if (!React.isValidElement(child)) return;
    if (child.type === React.Fragment) {
      result.push(
        ...flattenAvatarGroupChildren(
          (child as ReactElement<{ children: ReactNode }>).props.children
        )
      );
    } else {
      result.push(child);
    }
  });
  return result;
}

export type EuiAvatarGroupProps = CommonProps &
  HTMLAttributes<HTMLDivElement> & {
    /**
     * `EuiAvatar` children to stack. Fragments are flattened.
     * Size and type inherit from the group unless set on the avatar.
     */
    children?: ReactNode;
    /**
     * Accessible name for the group (`aria-label`).
     * Describe who the avatars represent, e.g. `"Assignees"`.
     */
    legend: string;
    /**
     * Size applied to every avatar (and the surplus) that does not set its own `size`.
     * @default m
     */
    size?: EuiAvatarSize;
    /**
     * Shape applied to every avatar (and the surplus) that does not set its own `type`.
     * @default user
     */
    type?: EuiAvatarType;
    /**
     * Total number of people in the group when you are not passing every avatar
     * as a child. Must be greater than or equal to the number of children.
     */
    total?: number;
    /**
     * Hover/focus spreads the stack so each face (and its tooltip) is easy
     * to reach. Pass `true` to keep the cluster collapsed; name tooltips
     * still show, and hover does not change stack order.
     * @default false
     */
    disableExpand?: boolean;
  };

/**
 * @see {@link https://eui.elastic.co/docs/components/display/avatar/|EuiAvatar documentation}
 */
export const EuiAvatarGroup = forwardRef(
  (
    {
      children,
      className,
      legend,
      size = 'm',
      type = 'user',
      total,
      disableExpand = false,
      style,
      ...rest
    }: EuiAvatarGroupProps,
    ref: Ref<HTMLDivElement>
  ) => {
    const euiThemeContext = useEuiTheme();
    const styles = useEuiMemoizedStyles(euiAvatarGroupStyles);

    const avatars = useMemo(
      () => flattenAvatarGroupChildren(children),
      [children]
    );

    const resolvedTotal = Math.max(total ?? avatars.length, avatars.length);
    const hasOverflow = resolvedTotal > MAX_SLOTS;
    const visibleAvatarCount = hasOverflow
      ? MAX_SLOTS - 1
      : Math.min(avatars.length, MAX_SLOTS);
    const visibleAvatars = avatars.slice(0, visibleAvatarCount);
    const surplusCount = resolvedTotal - visibleAvatars.length;
    const itemCount = visibleAvatars.length + (surplusCount > 0 ? 1 : 0);
    const shouldExpandOnHover = !disableExpand;
    const avatarSize = euiAvatarGroupAvatarSize(euiThemeContext, size);
    const overlapAmount = euiAvatarGroupOverlapAmount(euiThemeContext, size);

    const classes = classNames(
      'euiAvatarGroup',
      { 'euiAvatarGroup-expandOnHover': shouldExpandOnHover },
      className
    );
    const cssStyles = [
      styles.euiAvatarGroup,
      css`
        --euiAvatarGroup-size: ${avatarSize};
        --euiAvatarGroup-overlap: ${overlapAmount};
        --euiAvatarGroup-count: ${itemCount};
      `,
      styles.overlapped,
      shouldExpandOnHover && styles.expandOnHover,
    ];

    const contextValue = useMemo(() => ({ size, type }), [size, type]);

    return (
      <EuiAvatarGroupContext.Provider value={contextValue}>
        <div
          ref={ref}
          className={classes}
          css={cssStyles}
          {...rest}
          role="group"
          aria-label={legend}
          style={style}
        >
          <div className="euiAvatarGroup__body" css={styles.euiAvatarGroup__body}>
            {visibleAvatars.map((avatar, index) => (
              <div
                key={avatar.key ?? index}
                className="euiAvatarGroup__item"
                css={styles.euiAvatarGroup__item}
                style={
                  {
                    ['--euiAvatarGroup-index' as string]: index,
                  } as CSSProperties
                }
              >
                {avatar}
              </div>
            ))}
            {surplusCount > 0 && (
              <div
                className="euiAvatarGroup__item"
                css={styles.euiAvatarGroup__item}
                style={
                  {
                    ['--euiAvatarGroup-index' as string]: visibleAvatars.length,
                  } as CSSProperties
                }
              >
                <EuiAvatarGroupSurplus
                  count={surplusCount}
                  size={size}
                  type={type}
                />
              </div>
            )}
          </div>
        </div>
      </EuiAvatarGroupContext.Provider>
    );
  }
);

EuiAvatarGroup.displayName = 'EuiAvatarGroup';
