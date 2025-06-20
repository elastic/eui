/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { CSSProperties, FunctionComponent, ReactNode } from 'react';
import { useEuiMemoizedStyles } from '../../../services';
import {
  EuiPopover,
  EuiPopoverFooter,
  EuiPopoverProps,
  EuiPopoverTitle,
} from '../../popover';
import { EuiSpacer } from '../../spacer';
import type { EuiSelectableTemplateSitewideProps } from './selectable_template_sitewide';
import { euiSelectableTemplateSitewidePopoverStyles } from './selectable_template_sitewide.styles';

type EuiSelectableTemplateSitewidePopoverProps = Partial<EuiPopoverProps> & {
  search: ReactNode;
  list: ReactNode;
  trigger?: ReactNode;
  title?: EuiSelectableTemplateSitewideProps['popoverTitle'];
  footer?: EuiSelectableTemplateSitewideProps['popoverFooter'];
  width: CSSProperties['width'];
  isOpen: boolean;
};

export const EuiSelectableTemplateSitewidePopover: FunctionComponent<
  EuiSelectableTemplateSitewidePopoverProps
> = ({
  trigger,
  search,
  list,
  title,
  footer,
  width,
  isOpen,
  panelRef,
  closePopover,
  ...rest
}) => {
  const styles = useEuiMemoizedStyles(
    euiSelectableTemplateSitewidePopoverStyles
  );

  return (
    <EuiPopover
      panelPaddingSize="none"
      isOpen={isOpen}
      ownFocus={!!trigger}
      display={trigger ? 'inline-block' : 'block'}
      {...rest}
      panelRef={panelRef}
      button={trigger ? trigger : search!}
      closePopover={closePopover}
      panelProps={{
        css: styles.euiSelectableTemplateSitewide__popover,
      }}
    >
      <div style={{ width: width, maxWidth: '100%' }}>
        {title || trigger ? (
          <EuiPopoverTitle paddingSize="s">
            {title}
            {title && search && <EuiSpacer />}
            {search}
          </EuiPopoverTitle>
        ) : undefined}
        {list}
        {footer && (
          <EuiPopoverFooter paddingSize="s">{footer}</EuiPopoverFooter>
        )}
      </div>
    </EuiPopover>
  );
};
