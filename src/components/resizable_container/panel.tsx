import React, {
  CSSProperties,
  ReactNode,
  useEffect,
  useRef,
  useState,
  FunctionComponent,
} from 'react';
import classNames from 'classnames';

import { CommonProps } from '../common';
import { usePanelContext } from './context';
import { htmlIdGenerator } from '../../services';

interface Controls {
  isHorizontal: boolean;
}

export interface PanelProps extends CommonProps {
  /**
   * Specify minimum panel size in pixels or percents,
   * for example "300px" or "30%"
   */
  minSize?: string;
  /**
   * Specify id of panel if you want to track panel size in "onPanelWidthChange" callback
   */
  id?: string;
  /**
   * Initial size of the panel in percents
   * Specify this prop if you don't need to handle the panel size from outside
   */
  initialSize?: number;

  /**
   * Size of the panel in percents.
   * Specify this prop if you want to control the size from outside, the panel will ignore the "initialSize"
   */
  size?: number;

  /**
   * Add Eui scroll and overflow for the panel
   */
  scrollable?: boolean;

  children: ReactNode;

  /**
   * Custom CSS properties
   */
  style?: CSSProperties;
}

const generatePanelId = htmlIdGenerator('resizable-panel');

export const Panel: FunctionComponent<PanelProps & Controls> = ({
  children,
  className,
  id,
  isHorizontal,
  size,
  initialSize,
  minSize = '0px',
  scrollable,
  style = {},
  ...rest
}) => {
  const [innerSize, setInnerSize] = useState(
    initialSize && !size ? initialSize : 0
  );
  const { registry } = usePanelContext();
  const divRef = useRef<HTMLDivElement>(null);
  const panelId = useRef(id || generatePanelId());

  const classes = classNames(
    {
      euiScrollablePanel: scrollable,
    },
    className
  );

  let dimensions;

  if (size) {
    dimensions = {
      width: isHorizontal ? `${size}%` : '100%',
      height: isHorizontal ? '100%' : `${size}%`,
    };
  } else {
    dimensions = {
      width: isHorizontal ? `${innerSize}%` : '100%',
      height: isHorizontal ? '100%' : `${innerSize}%`,
    };
  }

  const styles = {
    ...style,
    ...dimensions,
    minWidth: isHorizontal ? minSize : 0,
    minHeight: isHorizontal ? 0 : minSize,
  };

  useEffect(() => {
    registry.registerPanel({
      id: panelId.current,
      setSize(panelSize) {
        if (initialSize && !size) {
          setInnerSize(panelSize);
        }
      },
      getSizePx() {
        return isHorizontal
          ? divRef.current!.getBoundingClientRect().width
          : divRef.current!.getBoundingClientRect().height;
      },
    });
  }, [initialSize, isHorizontal, minSize, registry, size]);

  return (
    <div
      className={classes}
      id={panelId.current}
      ref={divRef}
      style={styles}
      {...rest}>
      {children}
    </div>
  );
};

export function paneWithControls(controls: Controls) {
  return (props: PanelProps) => <Panel {...controls} {...props} />;
}
