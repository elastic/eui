import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { EuiFilterButton } from '../../filter_group';
import { EuiPropTypes } from '../../../utils/prop_types';
import { Query } from '../query';

export const FieldValueToggleGroupFilterItemType = PropTypes.shape({
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
  ]).isRequired,
  name: PropTypes.string.isRequired,
  negatedName: PropTypes.string,
  operator: PropTypes.oneOf(['eq', 'exact', 'gt', 'gte', 'lt', 'lte']),
});

export const FieldValueToggleGroupFilterConfigType = PropTypes.shape({
  type: EuiPropTypes.is('field_value_toggle_group').isRequired,
  field: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(FieldValueToggleGroupFilterItemType).isRequired,
  available: PropTypes.func, // () => boolean
});

const FieldValueToggleGroupFilterPropTypes = {
  index: PropTypes.number.isRequired,
  config: FieldValueToggleGroupFilterConfigType.isRequired,
  query: PropTypes.any.isRequired,
  onChange: PropTypes.func.isRequired, // (value: boolean) => void
};

export class FieldValueToggleGroupFilter extends Component {
  static propTypes = FieldValueToggleGroupFilterPropTypes;

  constructor(props) {
    super(props);
  }

  resolveDisplay(config, query, item) {
    const clause = query.getSimpleFieldClause(config.field, item.value);
    if (clause) {
      if (Query.isMust(clause)) {
        return { active: true, name: item.name };
      }
      return {
        active: true,
        name: item.negatedName ? item.negatedName : `Not ${item.name}`,
      };
    }
    return { active: false, name: item.name };
  }

  valueChanged(item, active) {
    const { field } = this.props.config;
    const { value, operator } = item;
    const query = active
      ? this.props.query.removeSimpleFieldClauses(field)
      : this.props.query
          .removeSimpleFieldClauses(field)
          .addSimpleFieldValue(field, value, true, operator);
    this.props.onChange(query);
  }

  render() {
    const { config, query } = this.props;
    return config.items.map((item, index) => {
      const { active, name } = this.resolveDisplay(config, query, item);
      const onClick = () => {
        this.valueChanged(item, active);
      };
      const key = `field_value_toggle_filter_item_${index}`;
      const isLastItem = index === config.items.length - 1;
      return (
        <EuiFilterButton
          key={key}
          onClick={onClick}
          hasActiveFilters={active}
          withNext={!isLastItem}>
          {name}
        </EuiFilterButton>
      );
    });
  }
}
