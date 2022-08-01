/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { ReactElement } from 'react';
import {
  queries,
  render,
  RenderOptions,
  screen,
  Screen,
  within,
} from '@testing-library/react';

import { EuiProvider } from '../../components';

import * as dataTestSubjQueries from './data_test_subj_queries';

/**
 * Custom render() fn with EuiProvider and query helpers
 *
 * @see https://testing-library.com/docs/react-testing-library/setup#custom-render
 * @see https://testing-library.com/docs/react-testing-library/setup#add-custom-queries
 */

const customRender = (
  ui: ReactElement,
  { queries: renderQueries, ...options }: RenderOptions = {}
) =>
  render(ui, {
    queries: {
      ...queries,
      ...dataTestSubjQueries,
      ...(renderQueries || {}),
    },
    wrapper: EuiProvider,
    ...options,
  });

export { customRender as render };

/**
 * Custom screen util with EUI query helpers
 *
 * @see https://testing-library.com/docs/queries/about/#screen
 * @see https://github.com/testing-library/dom-testing-library/issues/516
 */
const customScreen: Screen<typeof queries & typeof dataTestSubjQueries> = {
  ...screen,
  ...within<typeof dataTestSubjQueries>(document.body, dataTestSubjQueries),
};

export { customScreen as screen };
