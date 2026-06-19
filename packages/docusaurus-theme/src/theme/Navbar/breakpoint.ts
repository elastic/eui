/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

export const NAVBAR_MOBILE_BREAKPOINT = 1200;
export const NAVBAR_DESKTOP_BREAKPOINT = NAVBAR_MOBILE_BREAKPOINT + 1;

export const NAVBAR_MOBILE_MEDIA_QUERY = `@media (max-width: ${NAVBAR_MOBILE_BREAKPOINT}px)`;
export const NAVBAR_DESKTOP_MEDIA_QUERY = `@media (min-width: ${NAVBAR_DESKTOP_BREAKPOINT}px)`;
