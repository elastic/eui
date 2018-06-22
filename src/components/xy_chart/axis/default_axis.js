import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { EuiXAxis } from './x_axis';
import { EuiYAxis } from './y_axis';
import { EuiHorizontalGrid } from './horizontal_grid';
import { EuiVerticalGrid } from './vertical_grid';
import { EuiXYChartUtils } from '../utils/chart_utils';
export class EuiDefaultAxis extends PureComponent {
  render() {
    const { showGridLines, orientation, xOnZero, yOnZero, ...rest } = this.props;

    return (
      <Fragment>
        {showGridLines &&
          orientation === EuiXYChartUtils.ORIENTATION.VERTICAL && <EuiHorizontalGrid {...rest} />}
        {showGridLines &&
          orientation === EuiXYChartUtils.ORIENTATION.HORIZONTAL && <EuiVerticalGrid {...rest} />}

        <EuiXAxis onZero={xOnZero} tickSize={0} {...rest} />
        <EuiYAxis onZero={yOnZero} tickSize={0} {...rest} />
      </Fragment>
    );
  }
}

EuiDefaultAxis.displayName = 'EuiDefaultAxis';

EuiDefaultAxis.propTypes = {
  orientation: PropTypes.string,
  showGridLines: PropTypes.bool,
  yOnZero: PropTypes.bool,
  xOnZero: PropTypes.bool,
};

EuiDefaultAxis.defaultProps = {
  orientation: false,
  showGridLines: true,
  xOnZero: false,
  yOnZero: false,
};

EuiDefaultAxis.requiresSVG = true;
