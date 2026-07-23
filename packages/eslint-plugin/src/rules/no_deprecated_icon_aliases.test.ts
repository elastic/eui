/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { RuleTester } from '@typescript-eslint/rule-tester';
import {
  DEPRECATED_ICON_ALIASES,
  NoDeprecatedIconAliases,
} from './no_deprecated_icon_aliases';

const languageOptions = {
  sourceType: 'module' as const,
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
};

const ruleTester = new RuleTester();

ruleTester.run('no-deprecated-icon-aliases', NoDeprecatedIconAliases, {
  valid: [
    {
      code: 'import { EuiIcon } from "@elastic/eui";\n<EuiIcon type="warning" />',
      languageOptions,
    },
    {
      code: 'import { EuiButtonIcon } from "@elastic/eui";\n<EuiButtonIcon iconType={iconType} />',
      languageOptions,
    },
    {
      code: '<Component type="alert" />',
      languageOptions,
    },
    {
      code: '<Component status="alert" />',
      languageOptions,
    },
    {
      code: '<CustomComponent leadingIcon="mapMarker" />',
      languageOptions,
    },
    {
      code: 'import { EuiEmptyPrompt } from "@elastic/eui";\n<EuiEmptyPrompt icon="alert" />',
      languageOptions,
    },
    {
      code: '<EuiIcon type="alert" />',
      languageOptions,
    },
  ],
  invalid: [
    ...Object.entries(DEPRECATED_ICON_ALIASES).map(([alias, replacement]) => ({
      code: `import { EuiIcon } from "@elastic/eui";\n<EuiIcon type="${alias}" />`,
      output: `import { EuiIcon } from "@elastic/eui";\n<EuiIcon type="${replacement}" />`,
      languageOptions,
      errors: [
        {
          messageId: 'deprecatedIconAlias' as const,
          data: { alias, replacement },
        },
      ],
    })),
    {
      code: "import { EuiButtonIcon } from '@elastic/eui';\n<EuiButtonIcon iconType={'editorComment'} />",
      output:
        "import { EuiButtonIcon } from '@elastic/eui';\n<EuiButtonIcon iconType={'comment'} />",
      languageOptions,
      errors: [
        {
          messageId: 'deprecatedIconAlias',
          data: { alias: 'editorComment', replacement: 'comment' },
        },
      ],
    },
    {
      code: 'import { EuiCommentTimeline } from "@elastic/eui";\n<EuiCommentTimeline timelineAvatar="compute" />',
      output:
        'import { EuiCommentTimeline } from "@elastic/eui";\n<EuiCommentTimeline timelineAvatar="processor" />',
      languageOptions,
      errors: [
        {
          messageId: 'deprecatedIconAlias',
          data: { alias: 'compute', replacement: 'processor' },
        },
      ],
    },
    {
      code: 'import { EuiTimelineItem } from "@elastic/eui";\n<EuiTimelineItem icon="temperature" />',
      output:
        'import { EuiTimelineItem } from "@elastic/eui";\n<EuiTimelineItem icon="thermometer" />',
      languageOptions,
      errors: [
        {
          messageId: 'deprecatedIconAlias',
          data: { alias: 'temperature', replacement: 'thermometer' },
        },
      ],
    },
    {
      code: 'import { EuiLoadingLogo } from "@elastic/eui";\n<EuiLoadingLogo logo="visArea" />',
      output:
        'import { EuiLoadingLogo } from "@elastic/eui";\n<EuiLoadingLogo logo="chartArea" />',
      languageOptions,
      errors: [
        {
          messageId: 'deprecatedIconAlias',
          data: { alias: 'visArea', replacement: 'chartArea' },
        },
      ],
    },
    {
      code: 'import { EuiFormPrepend } from "@elastic/eui";\n<EuiFormPrepend iconLeft="search" />',
      output:
        'import { EuiFormPrepend } from "@elastic/eui";\n<EuiFormPrepend iconLeft="magnify" />',
      languageOptions,
      errors: [
        {
          messageId: 'deprecatedIconAlias',
          data: { alias: 'search', replacement: 'magnify' },
        },
      ],
    },
    {
      code: 'import { EuiIcon as Icon } from "@elastic/eui";\n<Icon type="mapMarker" />',
      output:
        'import { EuiIcon as Icon } from "@elastic/eui";\n<Icon type="waypoint" />',
      languageOptions,
      errors: [
        {
          messageId: 'deprecatedIconAlias',
          data: { alias: 'mapMarker', replacement: 'waypoint' },
        },
      ],
    },
  ],
});
