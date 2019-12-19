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

export interface PanelProps extends CommonProps {
  /**
   * Add Eui scroll and overflow for the panel
   *
   * @default false
   */
  scrollable?: boolean;

  children: ReactNode;

  /**
   * initial width of the panel in percents
   */
  initialWidth?: number;

  /**
   * Custom CSS properties
   */
  style?: CSSProperties;
}

export function Panel({
  children,
  className,
  initialWidth = 100,
  scrollable,
  style = {},
  ...rest
}: PanelProps) {
  const [width, setWidth] = useState(`${initialWidth}%`);
  const { registry } = usePanelContext();
  const divRef = useRef<HTMLDivElement>(null);

  const classes = classNames(
    {
      euiScrollablePanel: scrollable,
    },
    className
  );

  useEffect(() => {
    registry.registerPanel({
      width: initialWidth,
      setWidth(value) {
        setWidth(`${value}%`);
        this.width = value;
      },
      getWidth() {
        return divRef.current!.getBoundingClientRect().width;
      },
    });
  }, [initialWidth, registry]);

  return (
    <div
      className={classes}
      ref={divRef}
      style={{ ...style, width, display: 'flex' }}
      {...rest}>
      {children}
    </div>
  );
}
