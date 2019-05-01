import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { EuiXAxis } from './x_axis';
import { EuiYAxis } from './y_axis';
import { EuiHorizontalGrid } from './horizontal_grid';
import { EuiVerticalGrid } from './vertical_grid';
import { ORIENTATION } from '../utils/chart_utils';

/**
 * The Default Axis component, with X and Y axis on the bottom and left position respectively,
 * and horiznontal or vertical grid depending on the orientation prop.
 */
export class EuiDefaultAxis extends PureComponent {
  render() {
    const {
      showGridLines,
      orientation,
      xOnZero,
      yOnZero,
      ...rest
    } = this.props;

    return (
      <Fragment>
        {showGridLines && orientation === ORIENTATION.VERTICAL && (
          <EuiHorizontalGrid {...rest} />
        )}

        {showGridLines && orientation === ORIENTATION.HORIZONTAL && (
          <EuiVerticalGrid {...rest} />
        )}

        <EuiXAxis onZero={xOnZero} {...rest} />
        <EuiYAxis onZero={yOnZero} {...rest} />
      </Fragment>
    );
  }
}

EuiDefaultAxis.displayName = 'EuiDefaultAxis';

EuiDefaultAxis.propTypes = {
  /** The orientation of the chart, used to determine the correct orientation of grids */
  orientation: PropTypes.string,
  /** Show/Hide the background grids */
  showGridLines: PropTypes.bool,
  /** Specify if the x axis lay on 0, otherwise lyed on min x */
  xOnZero: PropTypes.bool,
  /** Specify if the y axis lay on 0, otherwise layd on min y */
  yOnZero: PropTypes.bool,
};

EuiDefaultAxis.defaultProps = {
  orientation: ORIENTATION.VERTICAL,
  showGridLines: true,
  xOnZero: false,
  yOnZero: false,
};

EuiDefaultAxis.requiresSVG = true;
