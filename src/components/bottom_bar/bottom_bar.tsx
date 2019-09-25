import React, { Component } from 'react';
import classNames from 'classnames';

import { CommonProps } from '../common';
import { EuiPortal } from '../portal';
import { EuiScreenReaderOnly } from '../accessibility';
import { EuiI18n } from '../i18n';

type BottomBarPaddingSize = 'none' | 's' | 'm' | 'l';

// Exported for testing
export const paddingSizeToClassNameMap: {
  [value in BottomBarPaddingSize]: string | null
} = {
  none: null,
  s: 'euiBottomBar--paddingSmall',
  m: 'euiBottomBar--paddingMedium',
  l: 'euiBottomBar--paddingLarge',
};

interface Props extends CommonProps {
  /**
   * Optional class applied to the body class
   */
  bodyClassName?: string;

  /**
   * Padding applied to the bar
   */
  paddingSize?: BottomBarPaddingSize;
}

export class EuiBottomBar extends Component<Props> {
  private bar: HTMLDivElement | null = null;

  componentDidMount() {
    const height = this.bar ? this.bar.clientHeight : -1;
    document.body.style.paddingBottom = `${height}px`;
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
      paddingSize = 'm',
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
