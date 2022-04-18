import React from 'react';

import {
  EuiText,
  EuiCode,
  EuiPanel,
  EuiFlexItem,
  EuiFlexGroup,
} from '../../../../src';
import { UtilityClassesSection } from '../utility_classes/utility_classes_section';

export default () => {
  return (
    <>
      <UtilityClassesSection
        code=".eui-fullHeight"
        description={
          <>
            <p>
              Quick utility for expanding the height of the element to its
              parents dimensions. Use it to stretch each nested element until
              the one that applies scroll.
            </p>
            <p>
              It applies{' '}
              <EuiCode language="sass">height: 100%; overflow: hidden;</EuiCode>{' '}
              but also adds <EuiCode language="sass">flex: 1 1 auto;</EuiCode>{' '}
              for uses within <EuiCode language="sass">flex</EuiCode>{' '}
              containers.
            </p>
            <dl>
              <dt>Sass mixins</dt>
              <dd>
                <EuiCode language="scss">@include euiFullHeight;</EuiCode>
              </dd>
            </dl>
          </>
        }
        example={
          <div style={{ height: 180 }}>
            <EuiFlexGroup
              className="eui-fullHeight"
              gutterSize="s"
              responsive={false}
            >
              <EuiFlexItem>
                <EuiPanel
                  className="eui-yScroll"
                  color="warning"
                  tabIndex="0"
                  role="region"
                  aria-label="Example 1 for full height region"
                >
                  <EuiText size="s">
                    <p>
                      Orbiting this at a distance of roughly ninety-two million
                      miles is an utterly insignificant little blue green planet
                      whose ape-descended life forms are so amazingly primitive
                      that they still think digital watches are a pretty neat
                      idea.
                    </p>
                  </EuiText>
                </EuiPanel>
              </EuiFlexItem>
              <EuiFlexItem>
                <EuiPanel
                  className="eui-yScroll"
                  color="warning"
                  tabIndex="0"
                  role="region"
                  aria-label="Example 2 for full height region"
                >
                  <EuiText size="s">
                    <p>
                      Orbiting this at a distance of roughly ninety-two million
                      miles is an utterly insignificant little blue green planet
                      whose ape-descended life forms are so amazingly primitive
                      that they still think digital watches are a pretty neat
                      idea.
                    </p>
                  </EuiText>
                </EuiPanel>
              </EuiFlexItem>
            </EuiFlexGroup>
          </div>
        }
        snippet={`<BodyContent style={{ height: 180 }}>
  <EuiFlexGroup
    className="eui-fullHeight" responsive={false}>
    <EuiFlexItem>
      <BodyScroll
        className="eui-yScroll" tabIndex="0" role="region" aria-label=""/>
    </EuiFlexItem>
    <EuiFlexItem>
      <BodyScroll
        className="eui-yScroll" tabIndex="0" role="region" aria-label=""/>
    </EuiFlexItem>
  </EuiFlexGroup>
</BodyContent>`}
      />
    </>
  );
};
