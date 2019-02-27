import { CommonProps } from '../common';

import { HTMLAttributes, FunctionComponent } from 'react';

declare module '@elastic/eui' {

  export type AvatarSize = 's' | 'm' | 'l' | 'xl';

  export type AvatarType = 'user' | 'space';

  export interface EuiAvatarProps {
    name: string;
    color?: string;
    initials?: string;
    initialsLength?: number;
    className?: string;
    imageUrl?: string;
    size?: AvatarSize;
    type?: AvatarType;
  }

  export const EuiAvatar: FunctionComponent<
    CommonProps & HTMLAttributes<HTMLDivElement> & EuiAvatarProps
    >;
}
