import React, {
  FunctionComponent,
  ReactNode,
  useEffect,
  useState,
} from 'react';
import classNames from 'classnames';
import { EuiFlyout, EuiFlyoutProps } from '../flyout';
import { throttle } from '../color_picker/utils';

export type EuiCollapsibleNavProps = EuiFlyoutProps & {
  children?: ReactNode;
  /**
   * Keep navigation flyout visible and push `<body>` content via padding
   */
  docked?: boolean;
};

export const EuiCollapsibleNav: FunctionComponent<EuiCollapsibleNavProps> = ({
  children,
  className,
  docked = false,
  onClose,
  ...rest
}) => {
  const [windowIsLargeEnoughToDock, setWindowIsLargeEnoughToDock] = useState(
    window.innerWidth >= 992
  );
  const isDocked = docked && windowIsLargeEnoughToDock;

  const functionToCallOnWindowResize = throttle(() => {
    if (window.innerWidth < 992) {
      setWindowIsLargeEnoughToDock(false);
    } else {
      setWindowIsLargeEnoughToDock(true);
    }
    // reacts every 50ms to resize changes and always gets the final update
  }, 50);

  // Watch for docked status and appropriately add/remove body classes and resize handlers
  useEffect(() => {
    if (docked) {
      document.body.classList.add('euiBody--collapsibleNavIsDocked');
      window.addEventListener('resize', functionToCallOnWindowResize);
    }
    return () => {
      document.body.classList.remove('euiBody--collapsibleNavIsDocked');
      window.removeEventListener('resize', functionToCallOnWindowResize);
    };
  }, [docked, functionToCallOnWindowResize]);

  const collapse = () => {
    if (!isDocked) {
      onClose();
    }
  };

  const classes = classNames(
    'euiCollapsibleNav',
    { 'euiCollapsibleNav--isDocked': isDocked },
    className
  );

  return (
    <EuiFlyout
      ownFocus={!isDocked}
      onClose={collapse}
      size="s"
      className={classes}
      hideCloseButton={true}
      {...rest}>
      {children}
    </EuiFlyout>
  );
};
