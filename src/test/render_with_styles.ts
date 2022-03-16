/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { render } from 'enzyme';
import { ReactElement } from 'react';
import { createSerializer } from '@emotion/jest';

/**
 * Use this function to add the `@emotion` Jest serializer to a given test.
 * The result will include the styles of elements in the component that use `@emotion` for styling.
 *
 * Because `expect` is modified for the entire file after using,
 * it's recommended that this util be used in the last test in the file.
 */
export const renderWithStyles = (component: ReactElement) => {
  expect.addSnapshotSerializer(
    createSerializer({
      classNameReplacer(className) {
        return className;
      },
    })
  );

  return render(component);
};
