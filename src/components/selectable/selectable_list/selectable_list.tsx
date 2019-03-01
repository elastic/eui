import React, {
  Component,
  HTMLAttributes,
} from 'react';
import classNames from 'classnames';
import { CommonProps } from '../common';

export type EuiSelectableListProps = HTMLAttributes<HTMLDivElement> & CommonProps & {

};

export class EuiSelectableList extends Component<EuiSelectableListProps> {
  constructor(props: EuiSelectableListProps) {
    super(props);
  }

  render() {
    const {
      children,
      className,
      ...rest
    } = this.props;

    const classes = classNames(
      'euiSelectableList',
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
