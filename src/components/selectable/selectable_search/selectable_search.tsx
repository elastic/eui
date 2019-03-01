import React, {
  Component,
  HTMLAttributes,
} from 'react';
import classNames from 'classnames';
import { CommonProps } from '../common';

export type EuiSelectableSearchProps = HTMLAttributes<HTMLDivElement> & CommonProps & {

};

export class EuiSelectableSearch extends Component<EuiSelectableSearchProps> {
  constructor(props: EuiSelectableSearchProps) {
    super(props);
  }

  render() {
    const {
      children,
      className,
      ...rest
    } = this.props;

    const classes = classNames(
      'euiSelectableSearch',
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
