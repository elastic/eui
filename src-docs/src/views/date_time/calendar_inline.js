import React from 'react';

import {
  EuiCalendar,
} from '../../../../src/components';

import { EXAMPLE_CAL_RANGE } from './calendar_demo_arrays';

export default () => (
  <EuiCalendar days={EXAMPLE_CAL_RANGE} />
);
