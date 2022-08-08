/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { UseEuiTheme } from '../../services';

export const euiFormMaxWidth = ({ euiTheme }: UseEuiTheme) =>
  `${euiTheme.base * 25}px`;

export const euiFormControlHeight = ({ euiTheme }: UseEuiTheme) =>
  euiTheme.size.xxl;

export const euiFormControlCompressedHeight = ({ euiTheme }: UseEuiTheme) =>
  `${euiTheme.size.xl}`;

export const euiFormControlPadding = ({ euiTheme }: UseEuiTheme) =>
  `${euiTheme.size.m}`;

export const euiFormControlCompressedPadding = ({ euiTheme }: UseEuiTheme) =>
  `${euiTheme.size.s}`;

export const euiFormControlBorderRadius = () => '0';

export const euiFormControlCompressedBorderRadius = ({
  euiTheme,
}: UseEuiTheme) => `${euiTheme.border.radius.small}`;
