import React, { FunctionComponent } from 'react';
import classNames from 'classnames';
import { EuiScreenReaderOnly } from '../accessibility/screen_reader';

export interface EuiSkipLinkProps {
  /**
   * If true, the link will be fixed to the top left of the viewport.
   */
  fixedToTop?: boolean;

  /**
   * Typically an anchor id (e.g. `#a11yMainContent`), the value provided here
   * equates to the href for the link.
   */
  destination: string;

  /**
   * The text to be displayed as a link.
   */
  label: string;

  tabIndex?: number;
}

export const EuiSkipLink: FunctionComponent<EuiSkipLinkProps> = ({
  fixedToTop = false,
  destination,
  label,
  tabIndex = 0,
}) => {
  const classes = classNames('euiSkipLink', {
    'euiSkipLink--isFixedToTop': fixedToTop,
  });

  return (
    <EuiScreenReaderOnly showOnFocus>
      <a className={classes} href={destination} tabIndex={tabIndex}>
        {label}
      </a>
    </EuiScreenReaderOnly>
  );
};
