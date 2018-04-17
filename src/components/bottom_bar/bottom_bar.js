import React, {
  Component,
} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { EuiPortal } from '../portal';

const paddingSizeToClassNameMap = {
  none: null,
  s: 'euiBottomBar--paddingSmall',
  m: 'euiBottomBar--paddingMedium',
  l: 'euiBottomBar--paddingLarge',
};

export const PADDING_SIZES = Object.keys(paddingSizeToClassNameMap);

export class EuiBottomBar extends Component {

  componentDidMount() {
    const height = this.bar.clientHeight;
    document.body.style.paddingBottom= `${height}px`;
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
        <div
          className={classes}
          ref={node => { this.bar = node; }}
          {...rest}
        >
          {children}
        </div>
      </EuiPortal>
    );
  };
}

EuiBottomBar.propTypes = {
  children: PropTypes.node,
  /**
   * Optional class applied to the bar iteself
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
};

EuiBottomBar.defaultProps = {
  paddingSize: 'm',
};
