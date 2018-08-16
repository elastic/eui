import React from 'react';
import ResizeObserver from 'resize-observer-polyfill';
import { inject, observer } from 'mobx-react';
import { debounce } from 'lodash';

class Sizer extends React.Component {
  constructor(props) {
    super(props);
    this.containerRef = React.createRef();
    this.ro = new ResizeObserver(debounce(this.onResize, 200));
  }

  componentDidMount() {
    this.ro.observe(this.containerRef.current);
  }

  componentWillUnmount() {
    this.ro.unobserve(this.containerRef.current);
  }

  onResize = (entries) => {
    entries.forEach((entry) => {
      const { width, height } = entry.contentRect;
      this.props.chartStore.updateParentChartSize(width, height);
    });
  };

  render() {
    return (
      <div
        ref={this.containerRef}
        style={{
          position: 'absolute',
          // background: 'red',
          bottom: 0,
          top: 0,
          left: 0,
          right: 0,
          boxSizing: 'border-box'
        }}
      >
        { this.props.children }
      </div>
    );
  }
}

export const ChartResizer = inject('chartStore')(observer(Sizer));
