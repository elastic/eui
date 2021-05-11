import React from 'react';

import { EuiText, EuiCode, EuiSpacer } from '../../../../src/components';
import { UtilityClassesSection } from './utility_classes_section';

const wrappingExampleStyle = {
  background: 'rgba(254, 228, 181, 0.5)',
};

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
        </>
      }
      example={
        <div
          style={{
            height: 180,
            overflowY: 'hidden',
            ...wrappingExampleStyle,
          }}>
          <EuiText
            tabIndex={0}
            className="eui-yScrollWithShadows"
            size="s"
            style={{ padding: 16 }}>
            <p>
              Orbiting this at a distance of roughly ninety-two million miles is
              an utterly insignificant little blue green planet whose ape-
              descended life forms are so amazingly primitive that they still
              think digital watches are a pretty neat idea.
            </p>
            <p>
              Orbiting this at a distance of roughly ninety-two million miles is
              an utterly insignificant little blue green planet whose ape-
              descended life forms are so amazingly primitive that they still
              think digital watches are a pretty neat idea.
            </p>
            <p>
              Orbiting this at a distance of roughly ninety-two million miles is
              an utterly insignificant little blue green planet whose ape-
              descended life forms are so amazingly primitive that they still
              think digital watches are a pretty neat idea.
            </p>
          </EuiText>
        </div>
      }
      snippet={`<BodyContent
  style={{ height: 200, overflowY: 'hidden' }}>
  <BodyScroll
    className="eui-yScrollWithShadows"
    tabIndex={0}
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
        </>
      }
      example={
        <div style={wrappingExampleStyle}>
          <div tabIndex={0} className="eui-xScrollWithShadows">
            <EuiText size="s" style={{ width: '150%', padding: 16 }}>
              <p>
                Orbiting this at a distance of roughly ninety-two million miles
                is an utterly insignificant little blue green planet whose ape-
                descended life forms are so amazingly primitive that they still
                think digital watches are a pretty neat idea.
              </p>
            </EuiText>
          </div>
        </div>
      }
      snippet={`<BodyScroll
  className="eui-xScrollWithShadows"
  tabIndex={0}>
  <BodyContent style={{ width: '150%', padding: 16 }} />
</BodyScroll>`}
    />
  </>
);
