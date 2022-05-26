/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, ButtonHTMLAttributes } from 'react';

import { getSecureRelForTarget } from '../../services';

import { validateHref } from '../../services/security/href_validator';
import {
  EuiButtonDisplayUnionProps_Deprecated,
  EuiButtonDisplay_Deprecated as EuiButtonDisplay,
} from './_button_display_deprecated';

/**
 * EuiButton is largely responsible for providing relevant props
 * and the logic for element-specific attributes
 */
export const EuiButton: FunctionComponent<EuiButtonDisplayUnionProps_Deprecated> = ({
  isDisabled: _isDisabled,
  disabled: _disabled,
  href,
  target,
  rel,
  type = 'button',
  buttonRef,
  ...rest
}) => {
  const isHrefValid = !href || validateHref(href);
  const disabled = _disabled || !isHrefValid;
  const isDisabled = _isDisabled || !isHrefValid;

  const buttonIsDisabled = rest.isLoading || isDisabled || disabled;
  const element = href && !isDisabled ? 'a' : 'button';

  let elementProps = {};
  // Props for all elements
  elementProps = { ...elementProps, isDisabled: buttonIsDisabled };
  // Element-specific attributes
  if (element === 'button') {
    elementProps = { ...elementProps, disabled: buttonIsDisabled };
  }

  const relObj: {
    rel?: string;
    href?: string;
    type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
    target?: string;
  } = {};

  if (href && !buttonIsDisabled) {
    relObj.href = href;
    relObj.rel = getSecureRelForTarget({ href, target, rel });
    relObj.target = target;
  } else {
    relObj.type = type as ButtonHTMLAttributes<HTMLButtonElement>['type'];
  }

  return (
    <EuiButtonDisplay
      element={element}
      baseClassName="euiButton"
      ref={buttonRef}
      {...elementProps}
      {...relObj}
      {...rest}
    />
  );
};
EuiButton.displayName = 'EuiButton';
