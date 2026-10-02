/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { test, expect } from '@playwright/test';

import { EuiAccordionObject } from './object';
import { storyUrl } from '../../../storybook';

const PARENT_TEST_SUBJ = 'testAccordion';

test.describe('EuiAccordionObject', () => {
  test.describe('nested accordions', () => {
    const NESTED_URL = storyUrl(
      'layout-euiaccordion--nested-accordion',
      `data-test-subj:${PARENT_TEST_SUBJ}`
    );

    test('trigger and content resolve to the parent instance only, not a nested child', async ({
      page,
    }) => {
      await page.goto(NESTED_URL);
      await page.getByTestId(PARENT_TEST_SUBJ).waitFor({ state: 'visible' });
      const parent = new EuiAccordionObject(page, PARENT_TEST_SUBJ);

      await expect(parent.trigger).toHaveCount(1);
      await expect(parent.trigger).toHaveText(/Parent accordion/);
      await expect(parent.content).toHaveCount(1);

      // Scoped to the parent object, so the child is resolved inside its subtree.
      const child = new EuiAccordionObject(parent, `${PARENT_TEST_SUBJ}--child`);
      await expect(child.trigger).toHaveCount(1);
      await expect(child.trigger).toHaveText(/Child accordion/);
    });
  });
});
