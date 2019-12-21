import React, {
  CSSProperties,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';
import classNames from 'classnames';

import { CommonProps } from '../common';
import { usePanelContext } from './context';

interface Controls {
  isHorizontal: boolean;
}

export interface PanelProps extends CommonProps {
  /**
   * Add Eui scroll and overflow for the panel
   *
   * @default false
   */
  scrollable?: boolean;

  children: ReactNode;

  /**
   * Initial size of the panel in percents
   */
  initialSize?: number;

  /**
   * Custom CSS properties
   */
  style?: CSSProperties;
}

function Panel({
  children,
  className,
  isHorizontal,
  initialSize = 100,
  scrollable,
  style = {},
  ...rest
}: PanelProps & Controls) {
  const [size, setSize] = useState(`${initialSize}%`);
  const { registry } = usePanelContext();
  const divRef = useRef<HTMLDivElement>(null);

  const classes = classNames(
    {
      euiScrollablePanel: scrollable,
    },
    className
  );

  const styles = {
    ...style,
    width: isHorizontal ? size : '100%',
    height: isHorizontal ? '100%' : size,
    display: 'flex',
  };

  useEffect(() => {
    registry.registerPanel({
      size: initialSize,
      setSize(value) {
        setSize(`${value}%`);
        this.size = value;
      },
      getSize() {
        return isHorizontal
          ? divRef.current!.getBoundingClientRect().width
          : divRef.current!.getBoundingClientRect().height;
      },
    });
  }, [initialSize, isHorizontal, registry]);

  return (
    <div className={classes} ref={divRef} style={styles} {...rest}>
      {children}
    </div>
  );
}

export function paneWithControls(controls: Controls) {
  return (props: PanelProps) => <Panel {...controls} {...props} />;
}
