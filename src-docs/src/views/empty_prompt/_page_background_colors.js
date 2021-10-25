import React from 'react';
import {
  EuiCode,
  EuiIcon,
  EuiTable,
  EuiTableHeader,
  EuiTableHeaderCell,
  EuiTableBody,
  EuiTableRow,
  EuiTableRowCell,
} from '../../../../src/components';
import { getHexValueFromColorName } from '../guidelines/colors/_utilities';
import { useSassVars } from '../guidelines/_get_sass_vars';

export default () => {
  const palette = useSassVars();

  return (
    <EuiTable>
      <EuiTableHeader>
        <EuiTableHeaderCell>Page template background</EuiTableHeaderCell>
        <EuiTableHeaderCell>Empty prompt usage</EuiTableHeaderCell>
      </EuiTableHeader>

      <EuiTableBody>
        <EuiTableRow>
          <EuiTableRowCell isMobileFullWidth>
            <EuiIcon
              className="colorGuidelines_colorPreviewTooLight"
              aria-hidden="true"
              type="stopFilled"
              size="xxl"
              color={getHexValueFromColorName(palette, 'euiColorEmptyShade')}
            />{' '}
            &ensp; <strong>euiColorEmptyShade</strong>:{' '}
            <EuiCode>
              {getHexValueFromColorName(palette, 'euiColorEmptyShade')}
            </EuiCode>
          </EuiTableRowCell>

          <EuiTableRowCell>
            Set the color to <EuiCode>{'"plain"'}</EuiCode> and the{' '}
            <EuiCode>hasBorder</EuiCode> prop to <EuiCode>true</EuiCode>.
          </EuiTableRowCell>
        </EuiTableRow>

        <EuiTableRow>
          <EuiTableRowCell>
            <EuiIcon
              className="colorGuidelines_colorPreviewTooLight"
              aria-hidden="true"
              type="stopFilled"
              size="xxl"
              color={getHexValueFromColorName(
                palette,
                'euiPageBackgroundColor'
              )}
            />{' '}
            &ensp; <strong>euiPageBackgroundColor</strong>:{' '}
            <EuiCode>
              {getHexValueFromColorName(palette, 'euiPageBackgroundColor')}
            </EuiCode>
          </EuiTableRowCell>

          <EuiTableRowCell>
            Set the color to <EuiCode>{'"plain"'}</EuiCode>.
          </EuiTableRowCell>
        </EuiTableRow>
      </EuiTableBody>
    </EuiTable>
  );
};
