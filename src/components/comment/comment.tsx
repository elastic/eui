import React, { HTMLAttributes, FunctionComponent } from 'react';
import { CommonProps } from '../common';
import classNames from 'classnames';
import { EuiAvatar } from '../avatar';

export type EuiCommentProps = HTMLAttributes<HTMLDivElement> & CommonProps & {};

export const EuiComment: FunctionComponent<EuiCommentProps> = ({
  // children,
  className,
  ...rest
}) => {
  const classes = classNames('euiComment', className);

  return (
    <div className={classes} {...rest}>
      <EuiAvatar name="username" />
      <div className="euiComment__panel">
        <div className="euiComment__panelHeader">
          mmarcialis added description on Jan 1, 2020 @ 22:30:00
        </div>
        <div className="euiComment__panelBody">
          Maecenas faucibus mollis interdum. Etiam porta sem malesuada magna
          mollis euismod. Donec sed odio dui. Fusce dapibus, tellus ac cursus
          commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit
          amet risus. Cras mattis consectetur purus sit amet fermentum. Praesent
          commodo cursus magna, vel scelerisque nisl consectetur et. Fusce
          dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut
          fermentum massa justo sit amet risus.
        </div>
      </div>
    </div>
  );
};
