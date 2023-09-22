<%_ if (features) { -%>
- Added/Updated ...

<%_ } -%>
<%_ if (bugFixes) { -%>
**Bug fixes**

- Fixed ...

<%_ } -%>
<%_ if (deprecations) { -%>
**Deprecations**

- Deprecated ...

<%_ } -%>
<%_ if (breakingChanges) { -%>
**Breaking changes**

- Removed ...

<%_ } -%>
<%_ if (emotionConversions) { -%>
**CSS-in-JS conversions**

- Converted `EuiComponent` to Emotion; Removed `$euiComponentSassVariable`
<%_ } -%>
<%_ if (dependencyUpdates) { -%>
**Dependency updates**

- Updated `dependency` to v10.20.30
<%_ } -%>
