import React, {
  Component,
  HTMLAttributes,
} from 'react';
import classNames from 'classnames';
import { CommonProps } from '../common';

export type <%= componentName %>Props = HTMLAttributes<HTMLDivElement> & CommonProps & {

};

export class <%= componentName %> extends Component<<%= componentName %>Props> {
  constructor(props: <%= componentName %>Props) {
    super(props);
  }

  render() {
    const {
      children,
      className,
      ...rest
    } = this.props;

    const classes = classNames(
      '<%= cssClassName %>',
      className
    );

    return (
      <div
        className={classes}
        {...rest}
      >
        {children}
      </div>
    );
  }
}
