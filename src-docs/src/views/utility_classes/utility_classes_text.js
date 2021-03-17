import React from 'react';

import {
  EuiCode,
  EuiSpacer,
  EuiTextColor,
  EuiMark,
} from '../../../../src/components';
import { UtilityClassesSection } from './utility_classes_section';

const longLink =
  'http://www.hithereimalongurl.com/dave_will_just_ramble_on_in_a_long_sentence_like_this/?ok=cool';

const wrappingExampleStyle = {
  background: 'rgba(254, 228, 181, 0.5)',
};

const wrappingDivExampleStyle = {
  maxWidth: 300,
  padding: 16,
  ...wrappingExampleStyle,
};

export default () => (
  <>
    <UtilityClassesSection
      code="eui-textInheritColor"
      description={
        <>
          <p>Forces the component to inherit its text color from its parent.</p>
          <p>
            For changing the color of your text to on of the named colors, use{' '}
            <strong>EuiText</strong> or <strong>EuiTextColor</strong>.
          </p>
        </>
      }
      example={
        <EuiTextColor color="danger">
          <EuiCode className="eui-textInheritColor">I am code</EuiCode> that
          matches the EuiTextColor
        </EuiTextColor>
      }
      snippet={`<EuiTextColor color="danger">
  <EuiCode className="eui-textInheritColor">I am danger code</EuiCode>
</EuiTextColor>`}
    />
    <EuiSpacer />
    <UtilityClassesSection
      code="eui-textLeft"
      description={
        <p>
          Changes the element’s text alignment property to{' '}
          <EuiCode language="sass">text-align: left;</EuiCode>
        </p>
      }
      example={
        <div className="eui-textLeft">
          <EuiMark style={wrappingExampleStyle}>Left align text</EuiMark>
        </div>
      }
      snippet={`<div className="eui-textLeft">
  /* Your content */
</div>`}
    />
    <EuiSpacer />
    <UtilityClassesSection
      code="eui-textCenter"
      description={
        <p>
          Changes the element’s text alignment property to{' '}
          <EuiCode language="sass">text-align: center;</EuiCode>
        </p>
      }
      example={
        <div className="eui-textCenter">
          <EuiMark style={wrappingExampleStyle}>Center align text</EuiMark>
        </div>
      }
      snippet={`<div className="eui-textCenter">
  /* Your content */
</div>`}
    />
    <EuiSpacer />
    <UtilityClassesSection
      code="eui-textRight"
      description={
        <p>
          Changes the element’s text alignment property to{' '}
          <EuiCode language="sass">text-align: right;</EuiCode>
        </p>
      }
      example={
        <div className="eui-textRight">
          <EuiMark style={wrappingExampleStyle}>Right align text</EuiMark>
        </div>
      }
      snippet={`<div className="eui-textRight">
  /* Your content */
</div>`}
    />
    <EuiSpacer />
    <UtilityClassesSection
      code="eui-textNoWrap"
      description={<p>Forces text not to wrap even in small containers.</p>}
      example={
        <div style={wrappingDivExampleStyle} className="eui-textNoWrap">
          This text will not to wrap but extend beyond the boundaries of the
          yellow box.
        </div>
      }
      snippet={`<div className="eui-textNoWrap">
  /* Your content */
</div>`}
    />
    <EuiSpacer />
    <UtilityClassesSection
      code="eui-textTruncate"
      description={
        <>
          <p>
            Truncates text at 100% width of its parent and will display an
            ellipsis.
          </p>
          <p>
            <strong>Tip:</strong> When truncating text, it is recommended to
            include the full text within an HTML <EuiCode>title</EuiCode>{' '}
            attribute or by wrapping the element within an{' '}
            <strong>EuiToolTip</strong>.
          </p>
        </>
      }
      example={
        <div style={wrappingDivExampleStyle} className="eui-textTruncate">
          This text will not to wrap but truncate beyond the boundaries of the
          yellow box.
        </div>
      }
      snippet={`<div
  className="eui-textTruncate"
  title={Your content}>
  /* Your content */
</div>`}
    />
    <EuiSpacer />
    <UtilityClassesSection
      code="eui-textBreakWord"
      description={
        <p>
          Wraps the text across lines like normal, but forces long words like
          {" URL's"} to break.
        </p>
      }
      example={
        <div style={wrappingDivExampleStyle} className="eui-textBreakWord">
          This text will wrap like normal but this long link {longLink} will
          break mid-word.
        </div>
      }
      snippet={`<div className="eui-textBreakWord">
  /* Your content */
</div>`}
    />
    <EuiSpacer />
    <UtilityClassesSection
      code="eui-textBreakAll"
      description={
        <p>
          Wraps the text across lines always forcing the last word on the line
          to break.
        </p>
      }
      example={
        <div style={wrappingDivExampleStyle} className="eui-textBreakAll">
          This text block will wrap, breaking up anything including long{' '}
          {"URL's"} {longLink} and run on strings like this
          --------------------------------------------------------------------------.
        </div>
      }
      snippet={`<div className="eui-textBreakAll">
  /* Your content */
</div>`}
    />
    <EuiSpacer />
    <UtilityClassesSection
      code="eui-textBreakNormal"
      description={
        <p>
          Reverts the text back to the normal wrapping scheme of not forcing
          word breaks.
        </p>
      }
      example={
        <div style={wrappingDivExampleStyle} className="eui-textBreakNormal">
          This text block will wrap normally, but will not break long {"URL's"}{' '}
          {longLink} but may break run on strings like this
          ---------------------------------------------------------------.
        </div>
      }
      snippet={`<div className="eui-textBreakNormal">
  /* Your content */
</div>`}
    />
  </>
);
