import React, {
  FunctionComponent,
  ReactNode,
  useEffect,
  useState,
  Fragment,
  HTMLAttributes,
} from 'react';
import classNames from 'classnames';
import { throttle } from '../color_picker/utils';
import { EuiWindowEvent, keyCodes } from '../../services';
import { EuiFocusTrap } from '../focus_trap';
import { EuiOverlayMask } from '../overlay_mask';
import { CommonProps } from '../common';
import { EuiButtonEmpty } from '../button';

export type EuiCollapsibleNavProps = CommonProps &
  HTMLAttributes<HTMLElement> & {
    children?: ReactNode;
    /**
     * Keep navigation flyout visible and push `<body>` content via padding
     */
    docked?: boolean;
    onClose: () => void;
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

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.keyCode === keyCodes.ESCAPE) {
      event.preventDefault();
      collapse();
    }
  };

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

  let optionalOverlay;
  if (!isDocked) {
    optionalOverlay = <EuiOverlayMask onClick={collapse} />;
  }

  return (
    <Fragment>
      <EuiWindowEvent event="keydown" handler={onKeyDown} />
      {optionalOverlay}
      {/* Trap focus only when isDocked={false} */}
      <EuiFocusTrap disabled={isDocked} clickOutsideDisables={true}>
        <nav className={classes} {...rest}>
          {children}

          <EuiButtonEmpty
            onClick={collapse}
            size="xs"
            iconType="cross"
            className="euiCollapsibleNav__closeButton">
            close
          </EuiButtonEmpty>
        </nav>
      </EuiFocusTrap>
    </Fragment>
  );
};
