import { Fragment, useMemo } from 'react';
import { EuiLink, EuiText } from '@elastic/eui';
import { ProcessedComponent } from '@elastic/eui-docgen';
import { extendedTypesInfo } from './extended_types_info';

export interface PropTableExtendedTypesProps {
  definition: ProcessedComponent;
}

export const PropTableExtendedTypes = ({ definition }: PropTableExtendedTypesProps) => {
  const extendedTypes = useMemo(() => {
    const types = definition.extends.filter(
      (type) => extendedTypesInfo.hasOwnProperty(type.displayName),
    );

    if (types.every((type) => type.displayName.indexOf('HTMLAttributes') > -1)) {
      const htmlAttributesIndex = types.findIndex((type) => type.displayName === 'HTMLAttributes');
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
            <EuiLink href={extendedTypesInfo[type.displayName as keyof typeof extendedTypesInfo].url}>
              {type.displayName}
            </EuiLink>
            {extendedTypes.length - 1 > index && ', '}
          </Fragment>
        ))}
    </EuiText>
  );
};
