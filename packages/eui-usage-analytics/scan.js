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

const path = require('path');
const cwd = path.resolve(__dirname);

const getRepoConfig = ({
  kibanaRoot = '../../../kibana',
  cloudRoot = '../../../cloud',
}) => {
  // NOTE: Do not add private repos to this list. If we plan to add private repos, we should do so via configuration rather than source.
  return {
    kibana: {
      linkPrefix: 'https://github.com/elastic/kibana/blob/main/',
      codeownersPath: '',
      repoRoot: kibanaRoot,
      crawlFrom: [
        /*
         * Scanning the entirety of Kibana could lead to many false negatives and be.
         * inefficient. These 3 crawl roots may not be 100% comprehensive, but they should cover
         * most code usages
         */
        `${kibanaRoot}/src`,
        `${kibanaRoot}/x-pack`,
        `${kibanaRoot}/packages`,
      ],
    },
    cloud: {
      linkPrefix: 'https://github.com/elastic/cloud/blob/master/',
      codeownersPath: '',
      repoRoot: cloudRoot,
      crawlFrom: [`${cloudRoot}/cloud-ui/apps/monolith`],
    },
  };
};

/**
 * When props are passed expressions as values, they're not serialized.
 *
 * For example:
 *   <EuiButton color={() => (somethingIstrue) ? 'primary' : 'secondary'} />
 *
 * The prop value that gets reported to our Dashboard would be '(ArrowFunctionExpression)'
 *
 * Sometimes this is useful, and sometimes it's not.
 *
 * [A case where it IS useful]
 *
 * style
 *   Default: (ObjectExpression)
 *   Serialized: { height: '100%', width: '100%' }
 *
 * Since 'style' almost exclusively receives expressions, it's universally more helpful
 * to see the serialized versions. Otherwise, when we look at the Dashboard we'd just
 * see all the values reported as '(ObjectExpression)'.
 *
 * [A case where it is IS NOT useful]
 *
 * 'color':
 *   # Most values are literals
 *   Default: 'primary'
 *   Serialized: 'primary'
 *
 *   # Some values are expressions
 *   Default: (ConditionalExpression)
 *   Serialized: isExpanded ? 'danger' : 'primary'
 *
 *   Default: euiTheme.colors.primaryText:
 *   Serialized: (MemberExpression)
 *
 * For a case like 'color', they're typically passed as literals, and there's typically
 * a finite list of options. By *not* serializing the expressions, bucket everything that's
 * not a literal into values like '(ConditionalExpression)'
 *
 * This means we get cleaner counts on the Dashboard, if you can imagine the following on a
 * Kibana Dashboard:
 *
 * color:
 *   primary: 500
 *   secondary: 300
 *   (Expression): 200
 *
 * The tradeoff is that you lose some detail in certain usages, but the benefit is that you get
 * better counts.
 *
 * In either case, this is the function where we can figure whether or not we serialize expressions
 * for various props.
 *
 * [Note] This could be refined even more as we go:
 * - Only serialize props on specific components (so add a conditional for component name)
 * - Only serialize specific types of expressions
 *
 * Reference: https://github.com/moroshko/react-scanner?tab=readme-ov-file#customizing-prop-values-treatment
 **/
const PROPS_TO_SERIALIZE = ['css', 'style'];
const propValueProcessor = ({ node, propName, defaultGetPropValue }) => {
  if (PROPS_TO_SERIALIZE.includes(propName)) {
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
  getPropValue: propValueProcessor,
};

/**
 * When root == kibana
 *
 * Input: /User/local/kibana/some/sub/dir
 * Output: some/sub/dir
 *
 */
const parseRelativePathFromAbsolute = (root, absolutePath) => {
  const regex = new RegExp(`\/${root}\/(.*)$`);
  return regex.exec(absolutePath)[1];
};

const buildRecordForElasticsearch = (
  instance,
  linkPrefix,
  repo,
  codeowners,
  time,
  componentName
) => {
  if (instance.location?.file) {
    const relativePath = parseRelativePathFromAbsolute(
      repo,
      instance.location.file
    );
    relativePathWithRoot = `/${repo}/${relativePath}`;
    sourceLocation = `${linkPrefix}${relativePath}#L${instance.location.start.line}`;
    owners = codeowners.getOwner(relativePath);
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
    fileName: relativePathWithRoot,
    sourceLocation,
    lineNumber: instance.location?.start?.line,
    lineColumn: instance.location?.start?.column,
    repository: repo,
  };
};

const scan = async (config = {}) => {
  let time = new Date();
  let output = [];
  const repos = getRepoConfig(config);

  await Promise.all(
    Object.entries(repos).map(
      async ([repo, { crawlFrom, linkPrefix, repoRoot }]) => {
        const codeowners = new Codeowners(repoRoot);
        await Promise.all(
          crawlFrom.map(async (crawlDirs) => {
            let newOutput = await scanner.run({
              ...scannerConfig,
              crawlFrom: crawlDirs,
            });

            newOutput = Object.entries(newOutput).flatMap(
              ([componentName, value]) => {
                return value.instances?.map((instance) => {
                  return buildRecordForElasticsearch(
                    instance,
                    linkPrefix,
                    repo,
                    codeowners,
                    time,
                    componentName
                  );
                });
              }
            );
            output = output.concat(newOutput);
          })
        );
      }
    )
  );

  return output;
};

exports.scan = scan;
exports.buildRecordForElasticsearch = buildRecordForElasticsearch;
exports.propValueProcessor = propValueProcessor;
