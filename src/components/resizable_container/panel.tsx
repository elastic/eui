import React, {
  CSSProperties,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';
import { usePanelContext } from './context';

export interface PanelProps {
  children: ReactNode[] | ReactNode;
  className?: string;

  /**
   * initial width of the panel in percents
   */
  initialWidth?: number;
  style?: CSSProperties;
}

export function Panel({
  children,
  className,
  initialWidth = 100,
  style = {},
}: PanelProps) {
  const [width, setWidth] = useState(`${initialWidth}%`);
  const { registry } = usePanelContext();
  const divRef = useRef<HTMLDivElement>(null);

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
      className={className}
      ref={divRef}
      style={{ ...style, width, display: 'flex' }}>
      {children}
    </div>
  );
}
