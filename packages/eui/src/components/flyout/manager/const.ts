/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

/**
 * Allowed values for `session` prop to control the way the session is managed for a flyout.
 * - `session="start"`: Creates a new flyout session. Use this for the main flyout.
 * - `session="inherit"`: (default) Inherits an existing session if one is active, otherwise functions as a standard flyout.
 * - `session="never"`: Opts out of session management and always functions as a standard flyout.
 */
export const SESSION_START = 'start';
export const SESSION_INHERIT = 'inherit';
export const SESSION_NEVER = 'never';

const PREFIX = 'data-managed-flyout';

/**
 * Data attribute applied to a managed flyout element to help identify it as a managed flyout.
 */
export const PROPERTY_FLYOUT = `${PREFIX}`;

/**
 * Data attribute indicating whether the flyout is the `main` or `child` flyout.
 */
export const PROPERTY_LEVEL = `${PREFIX}-level`;

/**
 * Data attribute representing how multiple flyouts are laid out
 * (`side-by-side` or `stacked`).
 */
export const PROPERTY_LAYOUT_MODE = `${PREFIX}-layout-mode`;

/** Stacked layout mode where child flyouts overlay on top of the main flyout. */
export const LAYOUT_MODE_STACKED = 'stacked';
/** Side-by-side layout mode where child flyouts render adjacent to the main flyout. */
export const LAYOUT_MODE_SIDE_BY_SIDE = 'side-by-side';

/** The primary (parent) flyout in a session. */
export const LEVEL_MAIN = 'main';
/** The secondary (child) flyout spawned by the main flyout. */
export const LEVEL_CHILD = 'child';

/** Flyout is mounting and playing its opening animation. */
export const STAGE_OPENING = 'opening';
/** Flyout is fully visible and interactive. */
export const STAGE_ACTIVE = 'active';
/** Flyout is unmounted or not currently visible/interactable. */
export const STAGE_INACTIVE = 'inactive';
/** Main flyout is transitioning behind an active session flyout. */
export const STAGE_BACKGROUNDING = 'backgrounding';
/** Main flyout is backgrounded behind an active session flyout. */
export const STAGE_BACKGROUNDED = 'backgrounded';
/** Flyout is returning to the foreground from a backgrounded state. */
export const STAGE_RETURNING = 'returning';
/** Flyout is playing its closing animation. */
export const STAGE_CLOSING = 'closing';
