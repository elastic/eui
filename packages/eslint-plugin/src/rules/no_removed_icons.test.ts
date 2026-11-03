/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { readFileSync } from 'fs';
import { resolve } from 'path';
import { RuleTester } from '@typescript-eslint/rule-tester';
import { parse } from '@typescript-eslint/typescript-estree';
import { getPropertyName } from '../utils/get_property_name';
import { NoRemovedIcons, REMOVED_ICON_ALIASES } from './no_removed_icons';
import {
  DEPRECATED_ICON_ALIASES,
  DEPRECATED_ICONS_WITHOUT_REPLACEMENT,
  DEPRECATED_ICONS_WITH_GUIDANCE,
} from './no_deprecated_icon_aliases';

const getIconMapNames = () => {
  const source = readFileSync(
    resolve(__dirname, '../../../eui/src/components/icon/icon_map.ts'),
    'utf8'
  );
  const declarator = parse(source)
    .body.flatMap((statement) =>
      statement.type === 'ExportNamedDeclaration' &&
      statement.declaration?.type === 'VariableDeclaration'
        ? statement.declaration.declarations
        : []
    )
    .find(
      (node) =>
        node.id.type === 'Identifier' && node.id.name === 'typeToPathMap'
    );

  if (declarator?.init?.type !== 'ObjectExpression') {
    throw new Error('typeToPathMap not found in icon_map.ts');
  }

  return new Set(declarator.init.properties.map(getPropertyName));
};

describe('icon lists', () => {
  const iconMapNames = getIconMapNames();

  it('marks exactly the names missing from typeToPathMap as removed', () => {
    const ruleNames = [
      ...Object.keys(REMOVED_ICON_ALIASES),
      ...Object.keys(DEPRECATED_ICON_ALIASES),
      ...Array.from(DEPRECATED_ICONS_WITHOUT_REPLACEMENT),
      ...Object.keys(DEPRECATED_ICONS_WITH_GUIDANCE),
    ];

    expect(ruleNames.filter((name) => !iconMapNames.has(name)).sort()).toEqual(
      Object.keys(REMOVED_ICON_ALIASES).sort()
    );
  });

  it('only suggests replacements that exist in typeToPathMap', () => {
    const replacements = [
      ...Object.values(REMOVED_ICON_ALIASES),
      ...Object.values(DEPRECATED_ICON_ALIASES),
    ];

    expect(replacements.filter((name) => !iconMapNames.has(name))).toEqual([]);
  });
});

const languageOptions = {
  sourceType: 'module' as const,
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
};

const ruleTester = new RuleTester();

ruleTester.run('no-removed-icons', NoRemovedIcons, {
  valid: [
    {
      code: '<Wrapper iconType="constructor" />',
      languageOptions,
    },
    {
      code: 'import { EuiIcon } from "@elastic/eui";\n<EuiIcon type="alert" />',
      languageOptions,
    },
    {
      code: '<Component type="popout" />',
      languageOptions,
    },
    {
      code: 'const config = { triggerIconType: "color" };',
      languageOptions,
    },
    {
      code: 'const item = { icon: "popout" };',
      languageOptions,
    },
  ],
  invalid: [
    {
      code: 'import { EuiIcon } from "@elastic/eui";\n<EuiIcon type="visTagCloud" />',
      output:
        'import { EuiIcon } from "@elastic/eui";\n<EuiIcon type="chartTagCloud" />',
      languageOptions,
      errors: [
        {
          messageId: 'removedIcon',
          data: { iconType: 'visTagCloud', replacement: 'chartTagCloud' },
        },
      ],
    },
    {
      code: 'import { EuiContextMenuItem } from "@elastic/eui";\n<EuiContextMenuItem icon="arrowDown" />',
      output:
        'import { EuiContextMenuItem } from "@elastic/eui";\n<EuiContextMenuItem icon="chevronSingleDown" />',
      languageOptions,
      errors: [
        {
          messageId: 'removedIcon',
          data: { iconType: 'arrowDown', replacement: 'chevronSingleDown' },
        },
      ],
    },
    {
      code: '<GenAiToolCard iconType="returnKey" />',
      output: '<GenAiToolCard iconType="return" />',
      languageOptions,
      errors: [
        {
          messageId: 'removedIcon',
          data: { iconType: 'returnKey', replacement: 'return' },
        },
      ],
    },
    {
      code: "<EuiButtonIcon iconType={isExpanded ? 'arrowUp' : 'arrowDown'} />",
      output:
        "<EuiButtonIcon iconType={isExpanded ? 'chevronSingleUp' : 'chevronSingleDown'} />",
      languageOptions,
      errors: [
        {
          messageId: 'removedIcon',
          data: { iconType: 'arrowUp', replacement: 'chevronSingleUp' },
        },
        {
          messageId: 'removedIcon',
          data: { iconType: 'arrowDown', replacement: 'chevronSingleDown' },
        },
      ],
    },
    {
      code: "const item = { iconType: 'popout' as const };\n<EuiButton iconType={'arrowDown' as IconType} />",
      output:
        "const item = { iconType: 'external' as const };\n<EuiButton iconType={'chevronSingleDown' as IconType} />",
      languageOptions,
      errors: [
        {
          messageId: 'removedIcon',
          data: { iconType: 'popout', replacement: 'external' },
        },
        {
          messageId: 'removedIcon',
          data: { iconType: 'arrowDown', replacement: 'chevronSingleDown' },
        },
      ],
    },
    {
      code: '<EuiButton iconType={`popout`} />',
      output: '<EuiButton iconType={`external`} />',
      languageOptions,
      errors: [
        {
          messageId: 'removedIcon',
          data: { iconType: 'popout', replacement: 'external' },
        },
      ],
    },
    {
      code: "<EuiButton iconType={icon || 'popout'} />",
      output: "<EuiButton iconType={icon || 'external'} />",
      languageOptions,
      errors: [
        {
          messageId: 'removedIcon',
          data: { iconType: 'popout', replacement: 'external' },
        },
      ],
    },
    {
      code: "const items = [{ name: 'Export', iconType: 'exportAction' }];",
      output: "const items = [{ name: 'Export', iconType: 'upload' }];",
      languageOptions,
      errors: [
        {
          messageId: 'removedIcon',
          data: { iconType: 'exportAction', replacement: 'upload' },
        },
      ],
    },
  ],
});
