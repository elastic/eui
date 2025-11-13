/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { getYarnWorkspaces, YarnWorkspace } from '../yarn_utils';
import { ValidationError } from '../errors';

export const processWorkspacesArgument = async (rawWorkspaces?: string[]) => {
  if (!rawWorkspaces) {
    rawWorkspaces = [];
  }

  const allWorkspaces = await getYarnWorkspaces();
  let currentWorkspaces: Array<YarnWorkspace> = [];

  if (rawWorkspaces.length > 0) {
    for (const workspaceName of rawWorkspaces) {
      const workspace = allWorkspaces.find(
        (workspace) => workspace.name === workspaceName
      );

      if (!workspace) {
        throw new ValidationError(
          `Workspace \`${workspaceName}\` not found. Available workspace names: ${JSON.stringify(
            allWorkspaces
          )}`
        );
      }

      currentWorkspaces.push(workspace);
    }
  } else {
    currentWorkspaces = allWorkspaces;
  }

  return currentWorkspaces;
};
