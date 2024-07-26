const scanner = require('react-scanner');
const escodegen = require("escodegen-wallaby");
const Codeowners = require('codeowners');

const codeowners = new Codeowners("../../../kibana");
const path = require('path');
const cwd = path.resolve(__dirname);

const repos = {
  kibana: {
    crawlFrom: [
      '../../../kibana/src',
      '../../../kibana/x-pack',
      '../../../kibana/packages',
    ],
  },
  // TODO
  //   cloud: {
  //     crawlFrom: './cloud/cloud-ui/apps/monolith',
  //   },
  //   docsmobile: {
  //     crawlFrom: './docsmobile/docsmobile/template',
  //   },
};

const scannerConfig = {
  rootDir: cwd,
  exclude: ['node_modules', /^\.\w+/],
  globs: ['**/!(*.test|*.spec|*.stories).{jsx,tsx}'],
  includeSubComponents: true,
  processors: ["raw-report"],
  crawlFrom: './',
  getPropValue: ({ node, propName, componentName, defaultGetPropValue }) => {
    if (propName === "css" || propName === "style") {
      if (node.type === "JSXExpressionContainer") {
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
  }
};


const scan = async () => {
  let time = new Date();
  let output = [];

  await Promise.all(
    Object.entries(repos).map(async ([repo, { crawlFrom }]) => {

      await Promise.all(
        crawlFrom.map(async (kibanaCrawlDirs) => {
          let newOutput = await scanner.run({
            ...scannerConfig,
            crawlFrom: kibanaCrawlDirs,
          });

          newOutput = Object.entries(newOutput).flatMap(([componentName, value]) => {
            return value.instances?.map((instance) => {
              let fileName;
              let sourceLocation;
              let owners = [];

              let regex = /\/kibana\/(.*)$/;
              if (instance.location?.file) {
                const result = regex.exec(instance.location.file);
                fileName = result[0];
                sourceLocation = `https://github.com/elastic/kibana/blob/main/${result[1]}#L${instance.location.start.line}`;
                owners = codeowners.getOwner(result[1]);
              }

              return {
                '@timestamp': time,
                project: 'kibana',
                scanDate: time,
                component: componentName,
                codeOwners: owners,
                moduleName: instance.importInfo?.moduleName,
                props: Object.entries(instance.props).map(([k, v]) => ({ propName: k, propValue: v })),
                props_combined: Object.entries(instance.props).map(([k, v]) => (`${k}::${v}`)),
                fileName,
                sourceLocation,
                lineNumber: instance.location?.start?.line,
                lineColumn: instance.location?.start?.column,
                repository: repo
              };
            });
          });
          output = output.concat(newOutput);
        })
      );
    })
  );

  return output;
};

exports.scan = scan;
