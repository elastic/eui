import React, { FunctionComponent, Fragment } from 'react';
import { EuiLink } from '../../../../../src/components/link';
import { EuiSpacer } from '../../../../../src/components/spacer';
import { extendedTypesInfo } from '../guide_section_extends';
import { EuiText } from '../../../../../src/components/text';
import Knobs, { markup } from '../../../services/playground/knobs';
import { EuiHorizontalRule } from '../../../../../src/components/horizontal_rule';
import { EuiFlexGroup, EuiFlexItem } from '../../../../../src/components/flex';
import { EuiTitle } from '../../../../../src/components/title';
import { propUtilityForPlayground } from '../../../services/playground';
import { useView } from 'react-view';

export type GuideSectionPropsTable = {
  componentName: any;
  component: any;
  descriptionOnly?: any;
};

export const GuideSectionPropsTable: FunctionComponent<GuideSectionPropsTable> = ({
  componentName,
  component,
  descriptionOnly,
}) => {
  if (!component.__docgenInfo) {
    return;
  }

  const docgenInfo = Array.isArray(component.__docgenInfo)
    ? component.__docgenInfo[0]
    : component.__docgenInfo;
  const { description, props, extendedInterfaces } = docgenInfo;

  if (!props && !description) {
    return;
  }

  const extendedTypes = extendedInterfaces
    ? extendedInterfaces.filter((type) => !!extendedTypesInfo[type])
    : [];
  // if there is an HTMLAttributes type present among others, remove HTMLAttributes
  if (extendedTypes.includes('HTMLAttributes') && extendedTypes.length > 1) {
    const htmlAttributesIndex = extendedTypes.indexOf('HTMLAttributes');
    extendedTypes.splice(htmlAttributesIndex, 1);
  }
  const extendedTypesElements = extendedTypes.map((type, index) => (
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
        <EuiSpacer />
      </>
    );
  }

  return (
    <div>
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
      {!descriptionOnly && (
        <PlaygroundProps
          isPlayground={false}
          config={{
            componentName: componentName,
            props: propUtilityForPlayground(docgenInfo.props),
            scope: component,
          }}
        />
      )}
    </div>
  );
};

const PlaygroundProps = ({ config, isPlayground }) => {
  const params = useView(config);

  return <Knobs {...params.knobProps} isPlayground={isPlayground} />;
};
