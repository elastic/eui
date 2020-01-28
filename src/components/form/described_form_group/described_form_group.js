import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { EuiTitle, TITLE_SIZES } from '../../title/title';
import { EuiText } from '../../text/text';
import { EuiFlexGroup, EuiFlexItem } from '../../flex';
import { GUTTER_SIZES } from '../../flex/flex_group';

import { EuiScreenReaderOnly } from '../../accessibility';

const paddingSizeToClassNameMap = {
  xxxs: 'euiDescribedFormGroup__fieldPadding--xxxsmall',
  xxs: 'euiDescribedFormGroup__fieldPadding--xxsmall',
  xs: 'euiDescribedFormGroup__fieldPadding--xsmall',
  s: 'euiDescribedFormGroup__fieldPadding--small',
  m: 'euiDescribedFormGroup__fieldPadding--medium',
  l: 'euiDescribedFormGroup__fieldPadding--large',
};

export class EuiDescribedFormGroup extends PureComponent {
  render() {
    const {
      children,
      className,
      gutterSize,
      fullWidth,
      titleSize,
      title,
      description,
      legend,
      ...rest
    } = this.props;

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

    let renderedDescription;

    if (description) {
      renderedDescription = (
        <EuiText
          size="s"
          color="subdued"
          className="euiDescribedFormGroup__description">
          {description}
        </EuiText>
      );
    }

    let legendNode;
    if (legend) {
      legendNode = (
        <EuiScreenReaderOnly>
          <legend>{legend}</legend>
        </EuiScreenReaderOnly>
      );
    }

    return (
      <fieldset className={classes} {...rest}>
        {legendNode}

        <EuiFlexGroup gutterSize={gutterSize}>
          <EuiFlexItem>
            <EuiTitle
              size={titleSize}
              aria-hidden={legend && 'true'}
              className="euiDescribedFormGroup__title">
              {title}
            </EuiTitle>

            {renderedDescription}
          </EuiFlexItem>

          <EuiFlexItem className={fieldClasses}>{children}</EuiFlexItem>
        </EuiFlexGroup>
      </fieldset>
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
  /**
   * It's recommended the use of HTML headings
   */
  title: PropTypes.node.isRequired,
  /**
   * For better accessibility, it's recommended a legend that will act as the group title and it will only be read by screen readers
   */
  legend: PropTypes.string,
  description: PropTypes.node,
};

EuiDescribedFormGroup.defaultProps = {
  gutterSize: 'l',
  titleSize: 'xs',
  fullWidth: false,
};
