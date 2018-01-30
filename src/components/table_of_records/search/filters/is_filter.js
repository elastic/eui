import React from 'react';
import PropTypes from 'prop-types';
import { EuiButtonEmpty } from '../../../button/button_empty';
import { isNil, isUndefined } from '../../../../services/predicate';
import { EuiPropTypes } from '../../../../utils/prop_types';

export const IsFilterConfigType = PropTypes.shape({
  type: EuiPropTypes.is('is').isRequired,
  field: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  available: PropTypes.func, // () => boolean
});

const IsFilterPropTypes = {
  index: PropTypes.number.isRequired,
  config: IsFilterConfigType.isRequired,
  query: PropTypes.any.isRequired,
  onChange: PropTypes.func.isRequired, // (value: boolean) => void
};

export class IsFilter extends React.Component {

  static propTypes = IsFilterPropTypes;

  constructor(props) {
    super(props);
  }

  resolveIconAndColor(clause) {
    if (isNil(clause)) {
      return { icon: 'empty', color: 'text' };
    }
    return  clause.applied ? { icon: 'check', color: 'primary' } : { icon: 'cross', color: 'danger' };
  }

  valueChanged(field, value) {
    const query = isUndefined(value) ?
      this.props.query.clearIsClause(field) :
      this.props.query.setIsClause(field, value);
    this.props.onChange(query);
  }

  render() {
    const { query, config } = this.props;
    const clause = query.getIsClause(config.field);
    const checked = !isNil(clause);
    const { icon, color } = this.resolveIconAndColor(clause);
    const onClick = () => {
      const value = checked ? undefined : true;
      this.valueChanged(config.field, value);
    };
    return (
      <EuiButtonEmpty
        onClick={onClick}
        iconType={icon}
        color={color}
      >
        {config.name}
      </EuiButtonEmpty>
    );
  }
}
