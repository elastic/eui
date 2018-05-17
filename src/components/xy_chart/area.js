import React from 'react';
import PropTypes from 'prop-types';
import { EuiLine }  from './line';
import { AreaSeries, AbstractSeries } from 'react-vis';

export class EuiArea extends AbstractSeries {
  render() {
    const { name, data, curve, color, ...rest } = this.props;
    return (
      <g>
        <AreaSeries {...rest} key={`${name}-area`} curve={curve} _opacityValue={0.2} color={color} data={data} />
        <EuiLine name={`${name}-line`} {...rest} key={`${name}`} curve={curve} color={color} data={data} />
      </g>
    );
  }
}

EuiArea.propTypes = {
  /** The name used to define the data in tooltips and ledgends */
  name: PropTypes.string.isRequired,
  /** Array<{x: string|number, y: string|number}> */
  data: PropTypes.arrayOf(PropTypes.shape({
    x: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    y: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
  })).isRequired,
  /** Without a color set, a random EUI color palette color will be chosen */
  color: PropTypes.string,
  curve: PropTypes.string,
  hasLineMarks: PropTypes.bool,
  lineMarkColor: PropTypes.string,
  lineMarkSize: PropTypes.number,
  onClick: PropTypes.func,
  onMarkClick: PropTypes.func
}

EuiArea.defaultProps = {
  curve: 'linear',
  hasLineMarks: true,
  lineMarkSize: 5
};