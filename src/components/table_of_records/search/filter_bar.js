import React from 'react';
import PropTypes from 'prop-types';
import { createFilter, FilterConfigType } from './filters';
import { Query } from './query';
import { EuiFilterGroup } from '../../filter_group';

export const FilterBarConfigType = PropTypes.arrayOf(FilterConfigType);

export class FilterBar extends React.Component {

  static propTypes = {
    query: PropTypes.instanceOf(Query).isRequired,
    onChange: PropTypes.func.isRequired,
    config: FilterBarConfigType
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { config = [], query, onChange } = this.props;
    const items = config.reduce((controls, filterConfig, index) => {
      if (filterConfig.available && !filterConfig.available()) {
        return controls;
      }
      const key = `filter_${index}`;
      const control = createFilter(index, filterConfig, query, onChange);
      controls.push(
        <div key={key} style={{ display: 'inline-block' }}>
          {control}
        </div>
      );
      return controls;
    }, []);
    return <EuiFilterGroup>{items}</EuiFilterGroup>;
  }
}
