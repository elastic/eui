import React from 'react';

import { EuiCode, EuiSpacer, EuiIcon } from '../../../../src/components';
import { UtilityClassesSection } from './utility_classes_section';

export default () => (
  <>
    <UtilityClassesSection
      code="eui-alignTop"
      type="className"
      description={
        <p>
          Changes the element’s vertical alignment property to{' '}
          <EuiCode language="sass">vertical-align: top;</EuiCode>
        </p>
      }
      example={
        <p>
          <EuiIcon
            type="logoElasticStack"
            size="xxl"
            className="eui-alignTop"
          />
          &emsp; Icon is aligned to the top of the text
        </p>
      }
      snippet={'<EuiIcon className="eui-alignTop" type="logoElasticStack" />'}
    />
    <EuiSpacer />
    <UtilityClassesSection
      code="eui-alignMiddle"
      type="className"
      description={
        <p>
          Changes the element’s vertical alignment property to{' '}
          <EuiCode language="sass">vertical-align: middle;</EuiCode>
        </p>
      }
      example={
        <p>
          <EuiIcon
            type="logoElasticStack"
            size="xxl"
            className="eui-alignMiddle"
          />
          &emsp; Icon is aligned to the middle of the text
        </p>
      }
      snippet={
        '<EuiIcon className="eui-alignMiddle" type="logoElasticStack" />'
      }
    />
    <EuiSpacer />
    <UtilityClassesSection
      code="eui-alignBottom"
      type="className"
      description={
        <p>
          Changes the element’s vertical alignment property to{' '}
          <EuiCode language="sass">vertical-align: bottom;</EuiCode>
        </p>
      }
      example={
        <p>
          <EuiIcon
            type="logoElasticStack"
            size="xxl"
            className="eui-alignBottom"
          />
          &emsp; Icon is aligned to the bottom of the text
        </p>
      }
      snippet={
        '<EuiIcon className="eui-alignBottom" type="logoElasticStack" />'
      }
    />
    <EuiSpacer />
    <UtilityClassesSection
      code="eui-alignBaseline"
      type="className"
      description={
        <p>
          Changes the element’s vertical alignment property to{' '}
          <EuiCode language="sass">vertical-align: baseline;</EuiCode>
        </p>
      }
      example={
        <p>
          <EuiIcon
            type="logoElasticStack"
            size="xxl"
            className="eui-alignBaseline"
          />
          &emsp; Icon is aligned to the baseline of the text
        </p>
      }
      snippet={
        '<EuiIcon className="eui-alignBaseline" type="logoElasticStack" />'
      }
    />
  </>
);
