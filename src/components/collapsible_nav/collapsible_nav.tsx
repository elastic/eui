import React, {
  FunctionComponent,
  ReactNode,
  useEffect,
  useState,
  HTMLAttributes,
  ReactElement,
  cloneElement,
} from 'react';
import classNames from 'classnames';
import { throttle } from '../color_picker/utils';
import { EuiWindowEvent, keyCodes, htmlIdGenerator } from '../../services';
import { EuiFocusTrap } from '../focus_trap';
import { EuiOverlayMask } from '../overlay_mask';
import { CommonProps } from '../common';
import { EuiButtonEmpty } from '../button';
import { EuiI18n } from '../i18n';

export type EuiCollapsibleNavProps = CommonProps &
  HTMLAttributes<HTMLElement> & {
    children?: ReactNode;
    /**
     * Keeps navigation flyout visible and push `<body>` content via padding
     */
    isDocked?: boolean;
    /**
     * Shows the navigation flyout
     */
    isOpen?: boolean;
    /**
     * Button for controlling visible state of the nav
     */
    button?: ReactElement;
    /**
     * Removes display of toggle button when in docked state
     */
    hideButtonIfDocked?: boolean;
    onClose?: () => void;
  };

export const EuiCollapsibleNav: FunctionComponent<EuiCollapsibleNavProps> = ({
  children,
  className,
  isDocked = false,
  isOpen = false,
  onClose,
  button,
  hideButtonIfDocked = true,
  id,
  ...rest
}) => {
  const [flyoutID] = useState(id || htmlIdGenerator()('euiCollapsibleNav'));
  const [windowIsLargeEnoughToDock, setWindowIsLargeEnoughToDock] = useState(
    window.innerWidth >= 992
  );
  const navIsDocked = isDocked && windowIsLargeEnoughToDock;

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
    if (isDocked) {
      document.body.classList.add('euiBody--collapsibleNavIsDocked');
      window.addEventListener('resize', functionToCallOnWindowResize);
    }
    return () => {
      document.body.classList.remove('euiBody--collapsibleNavIsDocked');
      window.removeEventListener('resize', functionToCallOnWindowResize);
    };
  }, [isDocked, functionToCallOnWindowResize]);

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.keyCode === keyCodes.ESCAPE) {
      event.preventDefault();
      collapse();
    }
  };

  const collapse = () => {
    if (!navIsDocked) {
      onClose && onClose();
    }
  };

  const classes = classNames(
    'euiCollapsibleNav',
    { 'euiCollapsibleNav--isDocked': navIsDocked },
    className
  );

  let optionalOverlay;
  if (!navIsDocked) {
    optionalOverlay = <EuiOverlayMask onClick={collapse} />;
  }

  // Show a trigger button if one was passed but
  // not if hideButtonIfDocked and navIsDocked
  const trigger =
    button &&
    !(hideButtonIfDocked && navIsDocked) &&
    cloneElement(button as ReactElement, {
      'aria-controls': flyoutID,
      'aria-expanded': isOpen,
      'aria-pressed': isOpen,
      className: classNames(
        button.props.className,
        'euiCollapsibleNav__toggle'
      ),
    });

  const flyout = (
    <>
      <EuiWindowEvent event="keydown" handler={onKeyDown} />
      {optionalOverlay}
      {/* Trap focus only when docked={false} */}
      <EuiFocusTrap disabled={navIsDocked} clickOutsideDisables={true}>
        <nav id={flyoutID} className={classes} {...rest}>
          {children}

          <EuiButtonEmpty
            onClick={collapse}
            size="xs"
            iconType="cross"
            className="euiCollapsibleNav__closeButton">
            <EuiI18n
              token="euiCollapsibleNav.closeButtonLabel"
              default="close"
            />
          </EuiButtonEmpty>
        </nav>
      </EuiFocusTrap>
    </>
  );

  return (
    <>
      {trigger}
      {(isOpen || navIsDocked) && flyout}
    </>
  );
};
