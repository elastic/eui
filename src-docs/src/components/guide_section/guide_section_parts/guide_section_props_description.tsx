import React, { FunctionComponent, Fragment } from 'react';
import { EuiLink } from '../../../../../src/components/link';
import { EuiSpacer } from '../../../../../src/components/spacer';
import { EuiText } from '../../../../../src/components/text';
import { EuiFlexGroup, EuiFlexItem } from '../../../../../src/components/flex';
import { EuiTitle } from '../../../../../src/components/title';

// @ts-ignore not TS
import { extendedTypesInfo } from '../guide_section_extends';
// @ts-ignore not TS
import { markup } from '../../../services/playground/knobs';
import classNames from 'classnames';

export type GuideSectionPropsDescription = {
  className?: string;
  componentName: any;
  component: any;
};

export const GuideSectionPropsDescription: FunctionComponent<GuideSectionPropsDescription> = ({
  className,
  componentName,
  component,
}) => {
  const docgenInfo = Array.isArray(component.__docgenInfo)
    ? component.__docgenInfo[0]
    : component.__docgenInfo;

  const { description, extendedInterfaces } = docgenInfo;

  const extendedTypes: string[] = extendedInterfaces
    ? extendedInterfaces.filter((type: any) => !!extendedTypesInfo[type])
    : [];

  // if all extendedTypes are HTMLAttributes, show them all
  // if there is an HTMLAttributes type present among others, remove HTMLAttributes
  if (!extendedTypes.every((type) => type.indexOf('HTMLAttributes') > -1)) {
    if (extendedTypes.includes('HTMLAttributes') && extendedTypes.length > 1) {
      const htmlAttributesIndex = extendedTypes.indexOf('HTMLAttributes');
      extendedTypes.splice(htmlAttributesIndex, 1);
    }
  }

  const extendedTypesElements = extendedTypes.map((type: any, index: any) => (
    <Fragment key={`extendedTypeValue-${extendedTypesInfo[type].name}`}>
      <EuiLink href={extendedTypesInfo[type].url}>
        {extendedTypesInfo[type].name}
      </EuiLink>
      {index + 1 < extendedTypes.length && ', '}
    </Fragment>
  ));

  let descriptionElement;

  if (description) {
    descriptionElement = (
      <>
        <EuiSpacer size="s" />
        <EuiText size="s">
          <p>{markup(description)}</p>
        </EuiText>
      </>
    );
  }

  return (
    <>
      <div className={classNames('guideSection__propsTableIntro', className)}>
        <EuiFlexGroup alignItems="baseline" wrap>
          <EuiFlexItem grow={false}>
            <EuiTitle size="s">
              <h3 id={componentName}>{componentName}</h3>
            </EuiTitle>
          </EuiFlexItem>
          {extendedTypesElements.length > 0 && (
            <EuiFlexItem>
              <EuiText size="s">
                <p>[ extends {extendedTypesElements} ]</p>
              </EuiText>
            </EuiFlexItem>
          )}
        </EuiFlexGroup>
        {descriptionElement}
      </div>
    </>
  );
};
