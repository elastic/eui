import React, { FunctionComponent, ReactNode } from 'react';
import { CommonProps, keysOf } from '../common';
import classNames from 'classnames';
import { EuiIcon } from '../icon';

export type EuiCommentTimelineProps = CommonProps & {
  /**
   * Main icon that accompanies the comment. There's default icons for both types of comment, user icon for regular comments and dot icon for update comments. It also accepts any type supported by EuiIcon or any other node.
   */
  timelineIcon?: ReactNode | string;
  type?: EuiCommentType;
};

const typeToClassNameMap = {
  regular: 'euiCommentTimeline--regular',
  update: 'euiCommentTimeline--update',
};

export const TYPES = keysOf(typeToClassNameMap);
export type EuiCommentType = keyof typeof typeToClassNameMap;

export const EuiCommentTimeline: FunctionComponent<EuiCommentTimelineProps> = ({
  className,
  timelineIcon,
  type = 'regular',
  ...rest
}) => {
  const classes = classNames('euiCommentTimeline', className);
  const iconClasses = classNames(
    {
      euiCommentTimeline__default:
        !timelineIcon || typeof timelineIcon === 'string',
    },
    typeToClassNameMap[type]
  );

  let iconRender;
  if (typeof timelineIcon === 'string') {
    iconRender = (
      <EuiIcon size={type === 'update' ? 'm' : 'l'} type={timelineIcon} />
    );
  } else if (timelineIcon) {
    iconRender = timelineIcon;
  } else {
    iconRender = (
      <EuiIcon
        type={type === 'update' ? 'dot' : 'user'}
        size={type === 'update' ? 's' : 'l'}
      />
    );
  }

  return (
    <div className={classes} {...rest}>
      <div className="euiCommentTimeline__content">
        <div className={iconClasses}>{iconRender}</div>
      </div>
    </div>
  );
};
