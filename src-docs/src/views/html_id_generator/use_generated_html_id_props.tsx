/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FunctionComponent } from 'react';

import { UseGeneratedHtmlIdOptions } from '../../../../src/services/accessibility/html_id_generator';

export const UseGeneratedHtmlIdProps: FunctionComponent<UseGeneratedHtmlIdOptions> = ({
  // They're unused in this mock component, but these props must be destructured for our
  // props generator to correctly read the comment docblocks associated with them
  prefix,
  suffix,
  conditionalId,
}) => <div />;
