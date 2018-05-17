import React from 'react';
import { AbstractSeries } from 'react-vis';

export function asSeries(Component) {
  return class AsSeries extends AbstractSeries {
    static displayName = `${Component.displayName}AsSeries` || 'asSeriesHOC';
    static propTypes = {
      ...Component.propTypes
    };
    static defaultProps = {
      ...Component.defaultProps
    };
    render() {
      return (
        <Component {...this.props} />
      );
    }
  }
}
