import React, { PureComponent } from 'react';
import ResizeObserver from 'resize-observer-polyfill';

export function makeFlexible(WrappedComponent) {
  return class FlexibleEuiSeriesChart extends PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        height: 0,
        width: 0,
      };
      this.containerRef = React.createRef();
      this.ro = new ResizeObserver(this.onResize);
    }

    componentDidMount() {
      this.ro.observe(this.containerRef.current);
    }

    componentWillUnmount() {
      this.ro.unobserve(this.containerRef.current);
    }

    onResize = entries => {
      entries.forEach(entry => {
        const { width, height } = entry.contentRect;
        const notifyWidth = this.state.width !== width;
        const notifyHeight = this.state.height !== height;
        if (notifyWidth || notifyHeight) {
          this.setState({ width, height });
        }
      });
    };

    render() {
      return (
        <div ref={this.containerRef} style={{ width: '100%', height: '100%' }}>
          <WrappedComponent {...this.state} {...this.props} />
        </div>
      );
    }
  };
}
