/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { Fragment, useMemo } from 'react';
import { EuiLink, EuiText } from '@elastic/eui';

import { extendedTypesInfo } from './extended_types_info';
import { ProcessedComponent, ExtendedType } from './definition_types';

export type PropTableExtendedTypesProps = {
  definition: ProcessedComponent;
};

export const PropTableExtendedTypes = ({
  definition,
}: PropTableExtendedTypesProps) => {
  const extendedTypes = useMemo(() => {
    const types = definition.extends.filter((type: ExtendedType) =>
      extendedTypesInfo.hasOwnProperty(type.displayName)
    );

    if (
      types.every(
        (type: ExtendedType) => type.displayName.indexOf('HTMLAttributes') > -1
      )
    ) {
      const htmlAttributesIndex = types.findIndex(
        (type: ExtendedType) => type.displayName === 'HTMLAttributes'
      );
      if (htmlAttributesIndex > -1 && types.length > 1) {
        types.splice(htmlAttributesIndex, 1);
      }
    }

    return types;
  }, [definition.extends]);

  if (!extendedTypes.length) {
    return null;
  }

  return (
    <EuiText size="s">
      Extends{' '}
      {extendedTypes.map((type, index) => (
        <Fragment key={index}>
          <EuiLink
            href={
              extendedTypesInfo[
                type.displayName as keyof typeof extendedTypesInfo
              ].url
            }
          >
            {type.displayName}
          </EuiLink>
          {extendedTypes.length - 1 > index && ', '}
        </Fragment>
      ))}
    </EuiText>
  );
};
