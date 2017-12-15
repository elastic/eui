import React, {
  Component,
} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {
  EuiCalendar,
  EuiFormRow,
  EuiFieldText,
  EuiPanel,
  EuiFlexGroup,
  EuiFlexItem,
  EuiTimeSelector,
} from '../../../components';

export class EuiDateTime extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
  }

  constructor(props) {
    super(props);
  }

  render() {
    const {
      children,
      className,
      ...rest
    } = this.props;

    const classes = classNames(
      'euiDateTime',
      className
    );

    return (
      <div
        className={classes}
        {...rest}
      >
        <EuiFormRow
          id="asdf"
          label="Calendar"
        >
          <EuiFieldText
            icon="calendar"
            iconSide="right"
            className="euiDateTime__input"
            value="12/13/2017 01:02:03 PM"
          />
        </EuiFormRow>
        <EuiPanel hasShadow paddingSize="none">
          <EuiFlexGroup gutterSize="none">
            <EuiFlexItem grow={false} className="euiDateTime__dateColumn">
              <EuiCalendar />
            </EuiFlexItem>
            <EuiFlexItem className="euiDateTime__timeColumn">
              <EuiTimeSelector />
            </EuiFlexItem>
          </EuiFlexGroup>
        </EuiPanel>
      </div>
    );
  }
}
