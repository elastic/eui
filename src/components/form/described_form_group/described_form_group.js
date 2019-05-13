import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { EuiTitle, TITLE_SIZES } from '../../title/title';
import { EuiText } from '../../text/text';
import { EuiFlexGroup, EuiFlexItem } from '../../flex';
import { GUTTER_SIZES } from '../../flex/flex_group';

import makeId from '../form_row/make_id';

const paddingSizeToClassNameMap = {
  xxxs: 'euiDescribedFormGroup__fieldPadding--xxxsmall',
  xxs: 'euiDescribedFormGroup__fieldPadding--xxsmall',
  xs: 'euiDescribedFormGroup__fieldPadding--xsmall',
  s: 'euiDescribedFormGroup__fieldPadding--small',
  m: 'euiDescribedFormGroup__fieldPadding--medium',
  l: 'euiDescribedFormGroup__fieldPadding--large',
};

export class EuiDescribedFormGroup extends Component {
  constructor(props) {
    super(props);
    this.ariaId = props.idAria || makeId();
  }

  render() {
    const {
      children,
      className,
      gutterSize,
      fullWidth,
      titleSize,
      title,
      description,
      idAria: userAriaId,
      ...rest
    } = this.props;

    const ariaId = this.ariaId;

    const classes = classNames(
      'euiDescribedFormGroup',
      {
        'euiDescribedFormGroup--fullWidth': fullWidth,
      },
      className
    );

    const fieldClasses = classNames(
      'euiDescribedFormGroup__fields',
      paddingSizeToClassNameMap[titleSize]
    );

    const ariaProps = {
      'aria-labelledby': `${ariaId}-title`,
    };

    let renderedDescription;

    if (description) {
      renderedDescription = (
        <EuiText
          id={ariaId}
          size="s"
          color="subdued"
          className="euiDescribedFormGroup__description">
          {description}
        </EuiText>
      );

      // If user has defined an aria ID, assume they have passed the ID to
      // the form row describedByIds and skip describedby here.
      ariaProps['aria-describedby'] = userAriaId ? null : ariaId;
    }

    return (
      <div role="group" className={classes} {...ariaProps} {...rest}>
        <EuiFlexGroup gutterSize={gutterSize}>
          <EuiFlexItem>
            <EuiTitle
              id={`${ariaId}-title`}
              size={titleSize}
              className="euiDescribedFormGroup__title">
              {title}
            </EuiTitle>

            {renderedDescription}
          </EuiFlexItem>

          <EuiFlexItem className={fieldClasses}>{children}</EuiFlexItem>
        </EuiFlexGroup>
      </div>
    );
  }
}

EuiDescribedFormGroup.propTypes = {
  /**
   * One or more `EuiFormRow`s
   */
  children: PropTypes.node,
  className: PropTypes.string,
  /**
   * Passed to `EuiFlexGroup`
   */
  gutterSize: PropTypes.oneOf(GUTTER_SIZES),
  fullWidth: PropTypes.bool,
  titleSize: PropTypes.oneOf(TITLE_SIZES),
  title: PropTypes.node.isRequired,
  description: PropTypes.node,
  idAria: PropTypes.string,
};

EuiDescribedFormGroup.defaultProps = {
  gutterSize: 'l',
  titleSize: 'xs',
  fullWidth: false,
};
