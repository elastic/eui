import React, { HTMLAttributes, FunctionComponent } from 'react';
import { CommonProps } from '../common';
import classNames from 'classnames';
import { EuiAvatar } from '../avatar';

export type EuiCommentProps = HTMLAttributes<HTMLDivElement> &
  CommonProps & {
    body?: string;
  };

export const EuiComment: FunctionComponent<EuiCommentProps> = ({
  // children,
  className,
  body,
  ...rest
}) => {
  const classes = classNames(
    'euiComment',
    // { 'euiComment--hasBody': body },
    className
  );

  const headerClasses = classNames('euiComment__panelHeader', {
    'euiComment__panelHeader--hasBody': body,
  });

  const contentClasses = classNames('euiComment__content', {
    euiComment__panel: body,
  });

  // let commentBody;
  // if (body) {
  //   commentBody = body;
  // }

  return (
    <div className={classes} {...rest}>
      <div className="euiComment__avatar">
        <EuiAvatar name="username" />
      </div>
      <div className={contentClasses}>
        <div className={headerClasses}>
          mmarcialis added description on Jan 1, 2020 @ 22:30:00
        </div>
        {body ? (
          <div className="euiComment__panelBody">
            Maecenas faucibus mollis interdum. Etiam porta sem malesuada magna
            {body}
          </div>
        ) : null}
      </div>
    </div>
  );
};
