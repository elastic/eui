import { debounce } from 'lodash';
import { inject, observer } from 'mobx-react';
import React, { RefObject } from 'react';
import ResizeObserver from 'resize-observer-polyfill';
import { ChartStore } from '../state/chart_state';

interface ResizerProps {
  chartStore?: ChartStore;
}
class Resizer extends React.Component<ResizerProps> {
  private containerRef: RefObject<HTMLDivElement>;
  private ro: ResizeObserver;

  constructor(props: ResizerProps) {
    super(props);
    this.containerRef = React.createRef();
    this.ro = new ResizeObserver(debounce(this.onResize, 200));
  }

  public componentDidMount() {
    this.ro.observe(this.containerRef.current as Element);
  }

  public componentWillUnmount() {
    this.ro.unobserve(this.containerRef.current as Element);
  }

  public onResize = (entries: ResizeObserverEntry[]) => {
    entries.forEach((entry) => {
      const { width, height } = entry.contentRect;
      this.props.chartStore!.updateParentDimensions(width, height, 0, 0);
    });
  }

  public render() {
    return (
      <div
        ref={this.containerRef}
        style={{
          zIndex: -10000000,
          position: 'absolute',
          bottom: 0,
          top: 0,
          left: 0,
          right: 0,
          boxSizing: 'border-box',
        }}
      >
      </div>
    );
  }
}

export const ChartResizer = inject('chartStore')(observer(Resizer));
