import PropTypes from 'prop-types';
import { SortDirectionType, Direction } from './sort_direction';

export const PropertySortType = PropTypes.shape({
  field: PropTypes.string.isRequired,
  direction: SortDirectionType.isRequired,
});

export interface PropertySort {
  field: string;
  direction: Direction;
}
