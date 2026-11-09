/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { EuiFieldSearchObject } from '../form/field_search/object';

/**
 * Playwright Component Object for {@link
 * https://eui.elastic.co/docs/components/forms/search-and-filter/search-bar/ EuiSearchBar}.
 *
 * The search bar has no root of its own, the consumer's `data-test-subj` is
 * passed through the `box` prop onto the `EuiFieldSearch` input. So this is
 * the field search object under the component's own name. Set
 * `box={{ 'data-test-subj': 'mySearchBar' }}` and construct with that subj.
 */
export class EuiSearchBarObject extends EuiFieldSearchObject {}
