/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

const scanner = require('react-scanner');
const escodegen = require('escodegen-wallaby');
const Codeowners = require('codeowners');

const codeowners = new Codeowners('../../../kibana');
const path = require('path');
const cwd = path.resolve(__dirname);

// NOTE: Do not add private repos to this list. If we plan to add private repos, we should do so via configuration rather than source.
const repos = {
  kibana: {
    linkPrefix: 'https://github.com/elastic/kibana/blob/main/',
    crawlFrom: [
      /*
       * Scanning the entirety of Kibana could lead to many false negatives and be.
       * inefficient. These 3 crawl roots may not be 100% comprehensive, but they should cover
       * most code usages 
       */
      '../../../kibana/src',
      '../../../kibana/x-pack',
      '../../../kibana/packages',
    ],
  },
};

const scannerConfig = {
  rootDir: cwd,
  exclude: ['node_modules', /^\.\w+/],
  /**
   * We extensions like .spec .stories. There could be other extension that are worth
   * ignoring here.
   */
  globs: ['**/!(*.test|*.spec|*.stories).{jsx,tsx}'],
  includeSubComponents: true,
  /**
   * count-components-and-props and other can be used to get helpful standalone summaries,
   * but since we ship this to Elastic to summarize there, we just do a raw-report.
   */
  processors: ['raw-report'],
  crawlFrom: './',
  getPropValue: ({ node, propName, defaultGetPropValue }) => {
    /**
     * Certain complex types of prop values don't get seriealized, so you just
     * see "(ArrowFunctionExpression)", etc. as the prop value. You can manually define
     * serializers here. The serializer below lets us see values like
     * `style::{ fontWeight: 'bold' }` instead of `JSXExpressionContainer` in data.
     *
     * This could be expanded further.
     **/
    if (propName === 'css' || propName === 'style') {
      if (node.type === 'JSXExpressionContainer') {
        try {
          return escodegen.generate(node.expression);
        } catch {
          return defaultGetPropValue(node);
        }
      } else {
        try {
          return escodegen.generate(node);
        } catch {
          return defaultGetPropValue(node);
        }
      }
    } else {
      return defaultGetPropValue(node);
    }
  },
};

const scan = async () => {
  let time = new Date();
  let output = [];

  await Promise.all(
    Object.entries(repos).map(async ([repo, { crawlFrom, linkPrefix }]) => {
      await Promise.all(
        crawlFrom.map(async (kibanaCrawlDirs) => {
          let newOutput = await scanner.run({
            ...scannerConfig,
            crawlFrom: kibanaCrawlDirs,
          });

          newOutput = Object.entries(newOutput).flatMap(
            ([componentName, value]) => {
              return value.instances?.map((instance) => {
                let fileName;
                let sourceLocation;
                let owners = [];

                let regex = /\/kibana\/(.*)$/;
                if (instance.location?.file) {
                  const result = regex.exec(instance.location.file);
                  fileName = result[0];
                  sourceLocation = `${linkPrefix}${result[1]}#L${instance.location.start.line}`;
                  owners = codeowners.getOwner(result[1]);
                }

                return {
                  '@timestamp': time,
                  scanDate: time,
                  component: componentName,
                  codeOwners: owners,
                  moduleName: instance.importInfo?.moduleName,
                  props: Object.entries(instance.props).map(([k, v]) => ({
                    propName: k,
                    propValue: v,
                  })),
                  props_combined: Object.entries(instance.props).map(
                    ([k, v]) => `${k}::${v}`
                  ),
                  fileName,
                  sourceLocation,
                  lineNumber: instance.location?.start?.line,
                  lineColumn: instance.location?.start?.column,
                  repository: repo,
                };
              });
            }
          );
          output = output.concat(newOutput);
        })
      );
    })
  );

  return output;
};

exports.scan = scan;
