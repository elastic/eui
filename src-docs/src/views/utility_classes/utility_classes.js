import React from 'react';

import {
  EuiText,
  EuiCode,
  EuiSpacer,
  EuiIcon,
} from '../../../../src/components';

export default () => (
  <EuiText>

    <h4>Text</h4>

    <EuiSpacer />

    <div className="eui-textLeft">
      <EuiCode>.eui-textLeft</EuiCode>
    </div>

    <div className="eui-textCenter">
      <EuiCode>.eui-textCenter</EuiCode>
    </div>
    <div className="eui-textRight">
      <EuiCode>.eui-textRight</EuiCode>
    </div>

    <EuiSpacer />

    <div style={{ width: 300, padding: 16, background: 'rgba(254, 228, 181, 0.5)' }} className="eui-textNoWrap">
      <EuiCode>.eui-textNoWrap</EuiCode> will force text not to wrap even in small containers.
    </div>

    <EuiSpacer />

    <div style={{ width: 300, padding: 16, background: 'rgba(254, 228, 181, 0.5)' }} className="eui-textBreakAll">
      <EuiCode>.eui-textBreakAll</EuiCode> will break up anything. It is useful for long urls like http://www.hithereimalongurl.com/dave_will_just_ramble_on_in_a_long_sentence_like_this/?ok=cool
    </div>

    <EuiSpacer />

    <div style={{ width: 300, padding: 16, background: 'rgba(254, 228, 181, 0.5)' }} className="eui-textBreakWord">
      <EuiCode>.eui-textBreakWord</EuiCode> will only break up at the end of words. Long urls will still break http://www.hithereimalongurl.com/dave_will_just_ramble_on_in_a_long_sentence_like_this/?ok=cool
    </div>

    <EuiSpacer />

    <div style={{ width: 300, padding: 16, background: 'rgba(254, 228, 181, 0.5)' }} className="eui-textTruncate">
      <EuiCode>.eui-textTruncate</EuiCode> will ellipsis after a certain point.
    </div>

    <h4>Vertical alignment</h4>

    <EuiSpacer />

    <div>
      <EuiIcon type="logoElasticStack" size="xxl" className="eui-alignTop" />
      <EuiCode>.eui-alignTop</EuiCode>
    </div>

    <EuiSpacer />

    <div>
      <EuiIcon type="logoElasticStack" size="xxl" className="eui-alignMiddle" />
      <EuiCode>.eui-alignMiddle</EuiCode>
    </div>

    <EuiSpacer />

    <div>
      <EuiIcon type="logoElasticStack" size="xxl"  className="eui-alignBottom" />
      <EuiCode>.eui-alignBottom</EuiCode>
    </div>

    <EuiSpacer />

    <div>
      <EuiIcon type="logoElasticStack" size="xxl" className="eui-alignBaseline" />
      <EuiCode>.eui-alignBaseline</EuiCode>
    </div>

    <EuiSpacer />

    <h4>Display</h4>

    <EuiCode className="eui-displayBlock">.eui-displayBlock</EuiCode>

    <EuiSpacer />

    <EuiCode className="eui-displayInline">.eui-displayInline</EuiCode>

    <EuiSpacer />

    <EuiCode className="eui-displayInlineBlock">.eui-displayInlineBlock</EuiCode>

  </EuiText>
);
