/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

/**
 * The `getFormControlClassNameForIconCount` function helps setup the className appendum
 * depending on the form control's current settings/state.
 *
 * @param icon {boolean} Does it contain a static icon like arrowDown
 * @param clear {boolean} Is it currently clearable
 * @param isLoading {boolean} Is is currently loading
 * @param isInvalid {boolean} It is currently invalid
 * @param isDropdown {boolean} It is as dropdown
 * @returns {string | undefined} Returns the string to append to the base className of the form control; or `undefined` if all evaluate to false
 */

export type _EuiFormControlLayoutNumIcons = {
  icon?: boolean;
  clear?: boolean;
  isLoading?: boolean;
  isInvalid?: boolean;
  isDropdown?: boolean;
};

export function getFormControlClassNameForIconCount({
  icon,
  clear,
  isLoading,
  isInvalid,
  isDropdown,
}: _EuiFormControlLayoutNumIcons): string | undefined {
  const numIcons = [icon, clear, isInvalid, isLoading, isDropdown].filter(
    (item) => item === true
  ).length;

  // This className is also specifically used in `src/global_styling/mixins/_form.scss`
  return numIcons > 0 ? `euiFormControlLayout--${numIcons}icons` : undefined;
}
