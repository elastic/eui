import React from 'react';

import {
  useEuiTheme,
  EuiTitle,
  EuiSpacer,
  EuiText,
  EuiPanel,
} from '../../../../../src';

import { getPropsFromComponent } from '../../../services/props/get_props';
import { useDebouncedUpdate } from '../hooks';

import { ThemeValue } from './_values';

import { EuiThemeFocus } from '../_props';

export default ({ onThemeUpdate }) => {
  const { euiTheme } = useEuiTheme();
  const focus = euiTheme.focus;

  const [focusClone, updateFocus] = useDebouncedUpdate({
    property: 'focus',
    value: focus,
    onUpdate: onThemeUpdate,
  });

  const focusProps = getPropsFromComponent(EuiThemeFocus);

  return (
    <div>
      <EuiText>
        <h2>Focus</h2>
      </EuiText>
      <EuiSpacer size="xl" />
      <EuiPanel color="subdued">
        <EuiTitle size="xs">
          <h3>
            <code>_EuiThemeFocus</code>
          </h3>
        </EuiTitle>
        <EuiSpacer size="s" />
        <EuiText size="s" grow={false}>
          <p>
            These are general properties that apply to the focus state of
            interactable components. Some components have their own specific
            implementation, but most use these variables.
          </p>
        </EuiText>

        <EuiSpacer />

        {Object.keys(focusProps).map((prop) => {
          return (
            <ThemeValue
              key={prop}
              property="focus"
              type={focusProps[prop]}
              name={prop}
              value={focusClone[prop]}
              onUpdate={(value) => updateFocus(prop, value)}
              forceUpdateType="string"
              example={null}
              numberProps={{
                style: { width: 140 },
              }}
            />
          );
        })}
      </EuiPanel>
    </div>
  );
};
