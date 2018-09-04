import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { EuiFilterButton } from '../../filter_group';
import { isNil } from '../../../services/predicate';
import { EuiPropTypes } from '../../../utils/prop_types';
import { Query } from '../query';

export const FieldValueToggleFilterConfigType = PropTypes.shape({
  type: EuiPropTypes.is('field_value_toggle').isRequired,
  field: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]).isRequired,
  name: PropTypes.string.isRequired,
  negatedName: PropTypes.string,
  available: PropTypes.func, // () => boolean
  operator: PropTypes.oneOf(['eq', 'exact', 'gt', 'gte', 'lt', 'lte']),
});

const FieldValueToggleFilterPropTypes = {
  index: PropTypes.number.isRequired,
  config: FieldValueToggleFilterConfigType.isRequired,
  query: PropTypes.any.isRequired,
  onChange: PropTypes.func.isRequired, // (value: boolean) => void
};

export class FieldValueToggleFilter extends Component {

  static propTypes = FieldValueToggleFilterPropTypes;

  constructor(props) {
    super(props);
  }

  resolveDisplay(clause) {
    const { name, negatedName } = this.props.config;
    if (isNil(clause)) {
      return { hasActiveFilters: false, name };
    }
    return  Query.isMust(clause) ?
      { hasActiveFilters: true, name } :
      { hasActiveFilters: true, name: negatedName ? negatedName : `Not ${name}` };
  }

  valueChanged(checked) {
    const { field, value, operator } = this.props.config;
    const query = checked ?
      this.props.query.removeSimpleFieldValue(field, value) :
      this.props.query.addSimpleFieldValue(field, value, true, operator);
    this.props.onChange(query);
  }

  render() {
    const { query, config } = this.props;
    const clause = query.getSimpleFieldClause(config.field, config.value);
    const checked = !isNil(clause);
    const { hasActiveFilters, name } = this.resolveDisplay(clause);
    const onClick = () => {
      this.valueChanged(checked);
    };
    return (
      <EuiFilterButton
        onClick={onClick}
        hasActiveFilters={hasActiveFilters}
      >
        {name}
      </EuiFilterButton>
    );
  }
}
