import React, { FunctionComponent, Fragment } from 'react';
import { EuiLink } from '../../../../../src/components/link';
import { EuiSpacer } from '../../../../../src/components/spacer';
import { EuiText } from '../../../../../src/components/text';
import { EuiHorizontalRule } from '../../../../../src/components/horizontal_rule';
import { EuiFlexGroup, EuiFlexItem } from '../../../../../src/components/flex';
import { EuiTitle } from '../../../../../src/components/title';

// @ts-ignore not TS
import { extendedTypesInfo } from '../guide_section_extends';
// @ts-ignore not TS
import { markup } from '../../../services/playground/knobs';

export type GuideSectionPropsDescription = {
  componentName: any;
  component: any;
};

export const GuideSectionPropsDescription: FunctionComponent<GuideSectionPropsDescription> = ({
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
        <EuiText size="s">
          <p>{markup(description)}</p>
        </EuiText>
        <EuiSpacer size="s" />
      </>
    );
  }

  return (
    <>
      <EuiHorizontalRule margin="none" />
      <EuiSpacer size="m" />
      <div className="guideSection__propsTableIntro">
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
        <EuiSpacer size="s" />
        {descriptionElement}
      </div>
    </>
  );
};
