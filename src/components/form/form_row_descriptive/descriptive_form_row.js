import React, {
  Component,
} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { EuiFlexGroup, EuiFlexItem } from '../../flex';
import { GUTTER_SIZES } from '../../flex/flex_group';

import makeId from '../form_row/make_id';

export class EuiDescriptiveFormRow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: props.id || makeId()
    };
  }

  render() {
    const {
      children,
      className,
      gutterSize,
      fullWidth,
      title,
      text,
      ...rest
    } = this.props;

    const { id } = this.state;

    const classes = classNames(
      'euiDescriptiveFormRow',
      {
        'euiDescriptiveFormRow--fullWidth': fullWidth,
      },
      className
    );

    return (
      <div
        id={id}
        aria-labelledby={`${id}-legend`}
        role="group"
        className={classes}
        {...rest}
      >
        <EuiFlexGroup gutterSize={gutterSize}>
          <EuiFlexItem id={`${id}-legend`}>
            <div id={`${id}-legend-title`} className="euiDescriptiveFormRow__title">
              {title}
            </div>
            {
              text ? (
                <div id={`${id}-legend-text`} className="euiDescriptiveFormRow__text">
                  {text}
                </div>
              ) : ''
            }
          </EuiFlexItem>
          <EuiFlexItem className="euiDescriptiveFormRow__fields">
            {children}
          </EuiFlexItem>
        </EuiFlexGroup>
      </div>
    );
  }
}

EuiDescriptiveFormRow.propTypes = {
  id: PropTypes.string,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  gutterSize: PropTypes.oneOf(GUTTER_SIZES),
  fullWidth: PropTypes.bool,
  title: PropTypes.node.isRequired,
  text: PropTypes.node,
};

EuiDescriptiveFormRow.defaultProps = {
  gutterSize: 'l',
  fullWidth: false,
};
