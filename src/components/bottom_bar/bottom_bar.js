import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { EuiPortal } from '../portal';
import { EuiScreenReaderOnly } from '../accessibility';
import { EuiI18n } from '../i18n';

const paddingSizeToClassNameMap = {
  none: 'euiBottomBar--paddingNone',
  s: 'euiBottomBar--paddingSmall',
  m: 'euiBottomBar--paddingMedium',
  l: 'euiBottomBar--paddingLarge',
};

export const PADDING_SIZES = Object.keys(paddingSizeToClassNameMap);

export class EuiBottomBar extends Component {
  componentDidMount() {
    document.body.style.paddingBottom = `${
      this.props.initialHeight
        ? this.props.initialHeight
        : this.bar.clientHeight
    }px`;
    if (this.props.bodyClassName) {
      document.body.classList.add(this.props.bodyClassName);
    }
  }

  componentWillUnmount() {
    document.body.style.paddingBottom = null;
    if (this.props.bodyClassName) {
      document.body.classList.remove(this.props.bodyClassName);
    }
  }

  render() {
    const {
      children,
      className,
      paddingSize,
      // eslint-disable-next-line no-unused-vars
      bodyClassName,
      ...rest
    } = this.props;

    const classes = classNames(
      'euiBottomBar',
      paddingSizeToClassNameMap[paddingSize],
      className
    );

    return (
      <EuiPortal>
        <EuiScreenReaderOnly>
          <p aria-live="assertive">
            <EuiI18n
              token="euiBottomBar.screenReaderAnnouncement"
              default="There is a new menu opening with page level controls at the end of the document."
            />
          </p>
        </EuiScreenReaderOnly>
        <div
          className={classes}
          style={
            this.props.initialHeight && !this.props.isExpanded
              ? { maxHeight: `${this.props.initialHeight}px` }
              : { maxHeight: '90vh' }
          }
          ref={node => {
            this.bar = node;
          }}
          {...rest}>
          {children}
        </div>
      </EuiPortal>
    );
  }
}

EuiBottomBar.propTypes = {
  children: PropTypes.node,
  /**
   * Optional class applied to the bar itself
   */
  className: PropTypes.string,
  /**
   * Optional class applied to the body class
   */
  bodyClassName: PropTypes.string,
  /**
   * Padding applied to the bar
   */
  paddingSize: PropTypes.oneOf(PADDING_SIZES),
  /**
   * Optional initial height for use when including tabs in the bottom bar
   */
  initialHeight: PropTypes.number,
  /**
   * Optional setter for expanding the height of the bar. Use in conjunction with initialHeight
   * to set the min height for the bar and allow toggling. Requires a method on the parent component
   * to set and unset as needed.
   */
  isExpanded: PropTypes.bool,
};

EuiBottomBar.defaultProps = {
  paddingSize: 'm',
};
