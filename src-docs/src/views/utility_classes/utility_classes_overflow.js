import React from 'react';

import {
  EuiText,
  EuiCode,
  EuiSpacer,
  EuiPanel,
  EuiFlexItem,
  EuiFlexGroup,
} from '../../../../src/components';
import { UtilityClassesSection } from './utility_classes_section';

export default () => (
  <>
    <UtilityClassesSection
      code="eui-yScroll"
      description={
        <>
          <p>
            Quick utility for adding vertical scrolling to a container. Requires
            the wrapping element to control the height and to have
            <EuiCode language="sass">overflow-y: hidden;</EuiCode> applied.
          </p>
          <p>
            If you would like the content to fade at the top and bottom, use the
            variant <EuiCode>eui-yScrollWithShadows</EuiCode>.
          </p>
          <dl>
            <dt>Sass mixins</dt>
            <dd>
              <EuiCode language="scss">@include euiYScroll;</EuiCode>
            </dd>
            <dd>
              <EuiCode language="scss">@include euiYScrollWithShadows;</EuiCode>
            </dd>
          </dl>
        </>
      }
      example={
        <EuiPanel
          color="warning"
          paddingSize="none"
          style={{
            height: 180,
            overflowY: 'hidden',
          }}
        >
          <EuiText
            tabIndex={0}
            role="region"
            aria-label="Example of eui-yScroll region"
            className="eui-yScrollWithShadows"
            size="s"
            style={{ padding: 16 }}
          >
            <p>
              Orbiting this at a distance of roughly ninety-two million miles is
              an utterly insignificant little blue green planet whose
              ape-descended life forms are so amazingly primitive that they
              still think digital watches are a pretty neat idea.
            </p>
            <p>
              Orbiting this at a distance of roughly ninety-two million miles is
              an utterly insignificant little blue green planet whose
              ape-descended life forms are so amazingly primitive that they
              still think digital watches are a pretty neat idea.
            </p>
            <p>
              Orbiting this at a distance of roughly ninety-two million miles is
              an utterly insignificant little blue green planet whose
              ape-descended life forms are so amazingly primitive that they
              still think digital watches are a pretty neat idea.
            </p>
          </EuiText>
        </EuiPanel>
      }
      snippet={`<BodyContent
  style={{ height: 200, overflowY: 'hidden' }}>
  <BodyScroll
    tabIndex={0}
    role="region"
    aria-label=""
    className="eui-yScrollWithShadows"
  />
</BodyContent>`}
    />
    <EuiSpacer />
    <UtilityClassesSection
      code="eui-xScroll"
      description={
        <>
          <p>Quick utility for adding horizontal scrolling to a container.</p>
          <p>
            If you would like the content to fade at the left and right, use the
            variant <EuiCode>eui-xScrollWithShadows</EuiCode>. It is recommended
            to add padding to the sides of the inner content so the mask
            doesn&apos;t overlay it.
          </p>
          <dl>
            <dt>Sass mixins</dt>
            <dd>
              <EuiCode language="scss">@include euiXScroll;</EuiCode>
            </dd>
            <dd>
              <EuiCode language="scss">@include euiXScrollWithShadows;</EuiCode>
            </dd>
          </dl>
        </>
      }
      example={
        <EuiPanel color="warning" paddingSize="none">
          <div
            tabIndex={0}
            role="region"
            aria-label="Example of eui-xScroll region"
            className="eui-xScrollWithShadows"
          >
            <EuiText size="s" style={{ width: '150%', padding: 16 }}>
              <p>
                Orbiting this at a distance of roughly ninety-two million miles
                is an utterly insignificant little blue green planet whose
                ape-descended life forms are so amazingly primitive that they
                still think digital watches are a pretty neat idea.
              </p>
            </EuiText>
          </div>
        </EuiPanel>
      }
      snippet={`<BodyScroll
  tabIndex={0}
  role="region"
  aria-label=""
  className="eui-xScrollWithShadows">
  <BodyContent style={{ width: '150%', padding: 16 }} />
</BodyScroll>`}
    />
    <EuiSpacer />
    <UtilityClassesSection
      code="eui-fullHeight"
      description={
        <>
          <p>
            Quick utility for expanding the height of the element to its parents
            dimensions. Use it to stretch each nested element until the one that
            applies scroll.
          </p>
          <p>
            It applies{' '}
            <EuiCode language="sass">height: 100%; overflow: hidden;</EuiCode>{' '}
            but also adds <EuiCode language="sass">flex: 1 1 auto;</EuiCode> for
            uses within <EuiCode language="sass">flex</EuiCode> containers.
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
