/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

export type { EuiFlyoutProps, EuiFlyoutSize } from './flyout';
export { EuiFlyout } from './flyout';

export type { EuiFlyoutBodyProps } from './flyout_body';
export { EuiFlyoutBody } from './flyout_body';

export type { EuiFlyoutFooterProps } from './flyout_footer';
export { EuiFlyoutFooter } from './flyout_footer';

export type { EuiFlyoutHeaderProps } from './flyout_header';
export { EuiFlyoutHeader } from './flyout_header';

export { euiFlyoutSlideInRight, euiFlyoutSlideInLeft } from './flyout.styles';

export type { EuiFlyoutResizableProps } from './flyout_resizable';
export { EuiFlyoutResizable } from './flyout_resizable';

export { EuiFlyoutChild } from './flyout_child';
export type { EuiFlyoutChildProps } from './flyout_child';

export type {
  EuiFlyoutSessionConfig,
  EuiFlyoutSessionOpenChildOptions,
  EuiFlyoutSessionOpenMainOptions,
  EuiFlyoutSessionProviderComponentProps,
  EuiFlyoutSessionRenderContext,
} from './sessions';
export { EuiFlyoutSessionProvider, useEuiFlyoutSession } from './sessions';
