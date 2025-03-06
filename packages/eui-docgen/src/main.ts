import * as path from 'node:path';
import * as fs from 'node:fs/promises';
import * as glob from 'glob';
import * as ts from 'typescript';
import * as docgen from 'react-docgen-typescript';
import { filterProp } from './filter_prop';
import { processComponent, ProcessedComponent } from './process_component';

const buildProgram = (files: Array<string>) => {
  const options: ts.CompilerOptions = {
    /**
     * Should match the `jsx` setting from /packages/eui/tsconfig.json
     */
    jsx: ts.JsxEmit.React,
  };

  return ts.createProgram(files, options);
};

const getFiles = (euiPath: string): Array<string> => (
  glob.sync(path.join(euiPath, 'src/!(test)/**/!(*.spec|*.test|*.stories|*.styles|*.a11y).{ts,tsx}'), { absolute: true })
);

const main = async () => {
  const distPath = path.resolve(__dirname, '../dist');
  const euiPackagePath = path.resolve(__dirname, '../../eui');
  const euiSrcPath = path.join(euiPackagePath, 'src');

  const files = getFiles(euiPackagePath);
  const program = buildProgram(files);
  const programProvider = () => program;

  console.log('Generating docgen data for @elastic/eui');

  let i = 0;
  for (const file of files) {
    const fileRelativePath = path.relative(euiSrcPath, file);

    const componentExtends: Record<string, string[]> = {};
    const parser = docgen.withCustomConfig(path.join(euiPackagePath, 'tsconfig.json'), {
      propFilter: (prop, component) => filterProp(prop, component, componentExtends),
      shouldExtractLiteralValuesFromEnum: true,
      shouldRemoveUndefinedFromOptional: true,
      savePropValueAsString: true,
      shouldIncludePropTagMap: false,
    });

    const parsed = parser.parseWithProgramProvider(file, programProvider);
    const results: Record<string, ProcessedComponent> = {};
    for (const parsedComponent of parsed) {
      const processedComponent = processComponent({
        componentDoc: parsedComponent,
        filePath: fileRelativePath,
        componentExtends: componentExtends[parsedComponent.displayName] || [],
      });

      if (!processedComponent) {
        continue;
      }

      results[processedComponent.displayName] = processedComponent;
    }

    const distFilePath = path.join(distPath, fileRelativePath)
      .replace(/.tsx?$/, '.json');
    await fs.mkdir(path.dirname(distFilePath), { recursive: true });
    await fs.writeFile(distFilePath, JSON.stringify(results, null, 2));

    process.stdout.write(`\x1b[2KProcessed ${i}/${files.length} files - ${fileRelativePath}\r`);
    i++;
  }

  console.log('\n🎉 Docgen generation done')
}

main();
