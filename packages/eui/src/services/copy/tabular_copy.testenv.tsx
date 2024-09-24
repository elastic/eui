/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { PropsWithChildren } from 'react';

// Don't render these characters in Jest snapshots. I don't want to deal with the Kibana tests 🫠
export const tabularCopyMarkers = {
  hiddenTab: <></>,
  hiddenNewline: <></>,
  hiddenWrapperBoundary: <></>,
  hiddenNoCopyBoundary: <></>,
};

// Don't bother initializing in Kibana Jest either
export const OverrideCopiedTabularContent = ({ children }: PropsWithChildren) =>
  children;
