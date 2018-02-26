import PropTypes from 'prop-types';
import { DefaultContextualActionType } from './default_contextual_action';
import { CustomContextualActionType } from './custom_contextual_action';

export { CustomContextualAction } from './custom_contextual_action';
export { DefaultContextualAction } from './default_contextual_action';

export const ContextualActionType = PropTypes.oneOfType([
  DefaultContextualActionType,
  CustomContextualActionType
]);
