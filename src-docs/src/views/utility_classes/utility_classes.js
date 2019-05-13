import React from 'react';

import {
  EuiText,
  EuiCode,
  EuiSpacer,
  EuiIcon,
  EuiTextColor,
} from '../../../../src/components';

const longLink =
  'http://www.hithereimalongurl.com/dave_will_just_ramble_on_in_a_long_sentence_like_this/?ok=cool';

export default () => (
  <EuiText>
    <h4>Text</h4>

    <EuiSpacer />

    <EuiTextColor color="danger">
      <EuiCode className="eui-textInheritColor">.eui-textInheritColor</EuiCode>{' '}
      will force text to inherit its color from its parent.
    </EuiTextColor>

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

    <div
      style={{
        width: 300,
        padding: 16,
        background: 'rgba(254, 228, 181, 0.5)',
      }}
      className="eui-textNoWrap">
      <EuiCode>.eui-textNoWrap</EuiCode> will force text not to wrap even in
      small containers.
    </div>

    <EuiSpacer />

    <div
      style={{
        width: 300,
        padding: 16,
        background: 'rgba(254, 228, 181, 0.5)',
      }}
      className="eui-textTruncate">
      <EuiCode>.eui-textTruncate</EuiCode> will ellipsis after a certain point.
    </div>

    <EuiSpacer />
    <h4>Word breaking</h4>
    <p>
      We recommend using <EuiCode>.eui-textOverflowWrap</EuiCode> to break on
      long words above all other options as it is supported by all major
      browsers (except for IE11). The one caveat is that it does not work on{' '}
      <EuiCode>display: flex</EuiCode> elements. To remedy, you can either add
      another wrapper with this class or use{' '}
      <EuiCode>.eui-textBreakWord</EuiCode> instead.
    </p>
    <EuiSpacer />

    <div
      style={{
        width: 300,
        padding: 16,
        background: 'rgba(254, 228, 181, 0.5)',
      }}
      className="eui-textOverflowWrap">
      <EuiCode>.eui-textOverflowWrap</EuiCode> will only break up at the end of
      words. Long urls will still break
      {longLink}.
      <strong>
        Falls back to <EuiCode>break-all</EuiCode> on IE11.
      </strong>
    </div>

    <EuiSpacer />

    <div
      style={{
        width: 300,
        padding: 16,
        background: 'rgba(254, 228, 181, 0.5)',
      }}
      className="eui-textBreakWord">
      <EuiCode>.eui-textBreakWord</EuiCode> will only break up at the end of
      words. Long urls will still break
      {longLink}.
      <strong>
        Falls back to <EuiCode>break-all</EuiCode> on Firefox and IE11.
      </strong>
    </div>

    <EuiSpacer />

    <div
      style={{
        width: 300,
        padding: 16,
        background: 'rgba(254, 228, 181, 0.5)',
      }}
      className="eui-textBreakAll">
      <EuiCode>.eui-textBreakAll</EuiCode> will break up anything. It is useful
      for long urls like
      {longLink}.
    </div>

    <EuiSpacer />

    <div
      style={{
        width: 300,
        padding: 16,
        background: 'rgba(254, 228, 181, 0.5)',
      }}
      className="eui-textBreakWord eui-textBreakNormal">
      <EuiCode>.eui-textBreakNormal</EuiCode> revert back to not forcing word
      breaks. It is <strong>not</strong> useful for long urls like
      {longLink}.
    </div>

    <EuiSpacer />

    <EuiSpacer />
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
      <EuiIcon type="logoElasticStack" size="xxl" className="eui-alignBottom" />
      <EuiCode>.eui-alignBottom</EuiCode>
    </div>

    <EuiSpacer />

    <div>
      <EuiIcon
        type="logoElasticStack"
        size="xxl"
        className="eui-alignBaseline"
      />
      <EuiCode>.eui-alignBaseline</EuiCode>
    </div>

    <EuiSpacer />

    <h4>Display</h4>

    <EuiCode className="eui-displayBlock">.eui-displayBlock</EuiCode>

    <EuiSpacer />

    <EuiCode className="eui-displayInline">.eui-displayInline</EuiCode>

    <EuiSpacer />

    <EuiCode className="eui-displayInlineBlock">
      .eui-displayInlineBlock
    </EuiCode>

    <EuiSpacer />

    <EuiCode className="eui-fullWidth">
      .eui-fullWidth (similar to eui-displayBlock but adds 100% width)
    </EuiCode>

    <h4>Responsive</h4>

    <EuiCode className="eui-hideFor--xs">.eui-hideFor--xs</EuiCode>
    <EuiSpacer />
    <EuiCode className="eui-hideFor--s">.eui-hideFor--s</EuiCode>
    <EuiSpacer />
    <EuiCode className="eui-hideFor--m">.eui-hideFor--m</EuiCode>
    <EuiSpacer />
    <EuiCode className="eui-hideFor--l">.eui-hideFor--l</EuiCode>
    <EuiSpacer />
    <EuiCode className="eui-hideFor--xl">.eui-hideFor--xl</EuiCode>

    <EuiSpacer />

    <EuiCode className="eui-showFor--xs">.eui-showFor--xs</EuiCode>
    <EuiSpacer />
    <EuiCode className="eui-showFor--s">.eui-showFor--s</EuiCode>
    <EuiSpacer />
    <EuiCode className="eui-showFor--m">.eui-showFor--m</EuiCode>
    <EuiSpacer />
    <EuiCode className="eui-showFor--l">.eui-showFor--l</EuiCode>
    <EuiSpacer />
    <EuiCode className="eui-showFor--xl">.eui-showFor--xl</EuiCode>
  </EuiText>
);
