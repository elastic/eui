import React from 'react';
import {
  EuiFlexItem,
  EuiCode,
  EuiCodeBlock,
  EuiFlexGrid,
  EuiSpacer,
  EuiText,
  EuiTitle,
  EuiFlexGroup,
  EuiLink,
} from '../../../../../src';

// @ts-ignore Importing from JS file
import breakpoints from '!!sass-vars-to-js-loader?preserveKeys=true!../../../../../src/global_styling/variables/_responsive.scss';

const euiBreakPoints = Object.getOwnPropertyNames(breakpoints.euiBreakpoints);

export function renderBreakpoint(size: string) {
  return (
    <EuiFlexGroup
      responsive={false}
      alignItems="center"
      gutterSize="s"
      key={size}
    >
      <EuiFlexItem grow={false}>
        <EuiText size="s" className="eui-textRight" style={{ minWidth: 50 }}>
          <EuiCode>{size}</EuiCode>
        </EuiText>
      </EuiFlexItem>
      <EuiFlexItem>
        <EuiText size="s">{breakpoints.euiBreakpoints[size]}px</EuiText>
      </EuiFlexItem>
    </EuiFlexGroup>
  );
}

export const Breakpoints = () => {
  return (
    <>
      <EuiText>
        <p>
          <EuiLink href="https://github.com/elastic/eui/blob/master/src/global_styling/mixins/_responsive.scss">
            View the Sass code for media queries
          </EuiLink>
          .
        </p>
        <p>
          Breakpoints in EUI are provided through the use of a Sass mixin{' '}
          <EuiCode>@include euiBreakpoint()</EuiCode> that accepts an array of
          sizes.
        </p>
      </EuiText>

      <EuiSpacer />
      <div className="guideSass__breakpointExample" />
      <EuiSpacer />

      <EuiFlexGrid columns={2}>
        <EuiFlexItem>
          <div>
            <EuiTitle size="s">
              <h3>Breakpoint sizing</h3>
            </EuiTitle>

            <EuiSpacer />

            {euiBreakPoints.map(function (size) {
              return renderBreakpoint(size);
            })}
          </div>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiTitle size="s">
            <h3>Mixin usage</h3>
          </EuiTitle>

          <EuiSpacer />

          <EuiText>
            <p>Target mobile devices only</p>
          </EuiText>
          <EuiCodeBlock language="scss" transparentBackground paddingSize="s">
            {"@include euiBreakpoint('xs','s') {...}"}
          </EuiCodeBlock>

          <EuiSpacer />

          <EuiText>
            <p>Target mobile and tablets</p>
          </EuiText>
          <EuiCodeBlock language="scss" transparentBackground paddingSize="s">
            {"@include euiBreakpoint('xs', 's', 'm') {...}"}
          </EuiCodeBlock>

          <EuiSpacer />

          <EuiText>
            <p>Target tablets only</p>
          </EuiText>
          <EuiCodeBlock language="scss" transparentBackground paddingSize="s">
            {"@include euiBreakpoint('m') {...}"}
          </EuiCodeBlock>

          <EuiSpacer />

          <EuiText>
            <p>Target very wide displays only</p>
          </EuiText>
          <EuiCodeBlock language="scss" transparentBackground paddingSize="s">
            {"@include euiBreakpoint('xl') {...}"}
          </EuiCodeBlock>

          <EuiSpacer />
        </EuiFlexItem>
      </EuiFlexGrid>
    </>
  );
};
