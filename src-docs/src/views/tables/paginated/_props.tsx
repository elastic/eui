import React, { FunctionComponent } from 'react';

import { Pagination as _Pagination } from '../../../../../src/components/basic_table/pagination_bar';

// Loading `Pagination` directly via !prop-loader doesn't correctly inherit @defaults
export const Pagination: FunctionComponent<_Pagination> = () => <div />;
