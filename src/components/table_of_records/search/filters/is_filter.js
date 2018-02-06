import React from 'react';
import PropTypes from 'prop-types';
import { EuiFilterButton } from '../../../filter_group';
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
      return { hasActiveFilters: false };
    }
    return  clause.applied ? { hasActiveFilters: true, prefix: null } : { hasActiveFilters: true, prefix: 'Not ' };
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
    const { hasActiveFilters, prefix } = this.resolveIconAndColor(clause);
    const onClick = () => {
      const value = checked ? undefined : true;
      this.valueChanged(config.field, value);
    };
    return (
      <EuiFilterButton
        onClick={onClick}
        hasActiveFilters={hasActiveFilters}
      >
        {prefix}
        {config.name}
      </EuiFilterButton>
    );
  }
}
