import React, { HTMLAttributes, ReactNode } from 'react';
import { CommonProps } from '../common';
import classNames from 'classnames';
// import { EuiAvatar } from './avatar';

export type EuiAvatarGroupProps = HTMLAttributes<HTMLDivElement> &
  CommonProps & {
    /**
     * Array of avatars
     */
    avatars: ReactNode[];
    /**
     * How many avatars to show before displaying the more text
     */
    maxLength?: number;
  };

export const EuiAvatarGroup: React.FunctionComponent<EuiAvatarGroupProps> = ({
  className,
  avatars,
  maxLength = 3,
  ...rest
}) => {
  const classes = classNames('euiAvatarGroup', className);

  const visibleChildren = avatars.slice(0, maxLength).map(avatar => avatar);

  let moreNode;
  if (avatars.length > maxLength) {
    moreNode = (
      <span className="euiAvatarGroup__more">
        +{avatars.length - maxLength}
      </span>
    );
  }

  return (
    <div className={classes} {...rest}>
      {visibleChildren}
      {moreNode}
    </div>
  );
};
