import React, { FunctionComponent } from 'react';
import { useView } from 'react-view';

import { GuideSectionPropsDescription } from './guide_section_props_description';

// @ts-ignore not TS
import Knobs from '../../../services/playground/knobs';
// @ts-ignore not TS
import { propUtilityForPlayground } from '../../../services/playground';

export type GuideSectionPropsTable = {
  componentName?: any;
  component: any;
};

export const GuideSectionPropsTable: FunctionComponent<
  GuideSectionPropsTable
> = ({ componentName, component }) => {
  const docgenInfo = Array.isArray(component.__docgenInfo)
    ? component.__docgenInfo[0]
    : component.__docgenInfo;

  const { props } = docgenInfo;

  return (
    <>
      {componentName && (
        <GuideSectionPropsDescription
          componentName={componentName}
          component={component}
        />
      )}
      <PlaygroundProps
        isPlayground={false}
        config={{
          componentName: componentName,
          props: propUtilityForPlayground(props),
          scope: component,
        }}
      />
    </>
  );
};

const PlaygroundProps: FunctionComponent<any> = ({ config, isPlayground }) => {
  const params = useView(config);

  return <Knobs {...params.knobProps} isPlayground={isPlayground} />;
};
