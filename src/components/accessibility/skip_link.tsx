import React, { FunctionComponent } from 'react';
import classNames from 'classnames';
import { CommonProps } from '../common';
import { EuiButton } from '../button/button';
import { EuiScreenReaderOnly } from '../accessibility/screen_reader';

export interface EuiSkipLinkProps extends CommonProps {
  /**
   * If true, the link will be fixed to the top left of the viewport
   */
  fixedToTop?: boolean;

  /**
   * Typically an anchor id (e.g. `#a11yMainContent`), the value provided here
   * equates to the href for the link
   */
  destinationId: string;

  /**
   * The text to be displayed as a link
   */
  label: string;

  tabIndex?: number;
}

export const EuiSkipLink: FunctionComponent<EuiSkipLinkProps> = ({
  fixedToTop = false,
  destinationId,
  label,
  tabIndex = 0,
  ...rest
}) => {
  const classes = classNames('euiSkipLink', {
    'euiSkipLink--isFixedToTop': fixedToTop,
  });

  return (
    <EuiScreenReaderOnly showOnFocus>
      <EuiButton
        className={classes}
        href={`#${destinationId}`}
        tabIndex={tabIndex}
        size="s"
        fill
        {...rest}>
        {label}
      </EuiButton>
    </EuiScreenReaderOnly>
  );
};
