/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import React from 'react';
export const EuiFlyout = ({
  as = 'div',
  role = 'dialog',
  children,
  closeButtonProps,
  hideCloseButton,
  onClose,
  'data-test-subj': dataTestSubj,
}: any) => {
  const Element = as;
  return (
    <Element data-eui="EuiFlyout" data-test-subj={dataTestSubj} role={role}>
      {!hideCloseButton && (
        <button
          type="button"
          data-test-subj="euiFlyoutCloseButton"
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
            onClose();
            closeButtonProps?.onClick && closeButtonProps.onClick(e);
          }}
        />
      )}
      {children}
    </Element>
  );
};
