import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { EuiFilterButton } from '../../filter_group';
import { isNil } from '../../../services/predicate';
import { EuiPropTypes } from '../../../utils/prop_types';
import { Query } from '../query';

export const IsFilterConfigType = PropTypes.shape({
  type: EuiPropTypes.is('is').isRequired,
  field: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  negatedName: PropTypes.string,
  available: PropTypes.func, // () => boolean
});

const IsFilterPropTypes = {
  index: PropTypes.number.isRequired,
  config: IsFilterConfigType.isRequired,
  query: PropTypes.any.isRequired,
  onChange: PropTypes.func.isRequired, // (value: boolean) => void
};

export class IsFilter extends Component {
  static propTypes = IsFilterPropTypes;

  constructor(props) {
    super(props);
  }

  resolveDisplay(clause) {
    const { name, negatedName } = this.props.config;
    if (isNil(clause)) {
      return { hasActiveFilters: false, name };
    }
    return Query.isMust(clause)
      ? { hasActiveFilters: true, name }
      : {
          hasActiveFilters: true,
          name: negatedName ? negatedName : `Not ${name}`,
        };
  }

  valueChanged(field, checked) {
    const query = checked
      ? this.props.query.removeIsClause(field)
      : this.props.query.addMustIsClause(field);
    this.props.onChange(query);
  }

  render() {
    const { query, config } = this.props;
    const clause = query.getIsClause(config.field);
    const checked = !isNil(clause);
    const { hasActiveFilters, name } = this.resolveDisplay(clause);
    const onClick = () => {
      this.valueChanged(config.field, checked);
    };
    return (
      <EuiFilterButton
        onClick={onClick}
        hasActiveFilters={hasActiveFilters}
        aria-pressed={!!hasActiveFilters}>
        {name}
      </EuiFilterButton>
    );
  }
}
