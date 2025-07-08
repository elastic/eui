import { ProcessedComponent } from '@elastic/eui-docgen';
import types from '@elastic/eui-docgen/dist/types.json';
import { JSONOutput } from 'typedoc';
import { PropTable as OriginalPropTable } from '@theme-original/PropTable';

export const PropTable = (definition: ProcessedComponent) => {
  return (
    <OriginalPropTable
      definition={definition}
      parseDescription={(value: string) =>
        value
          .replace(/{@link (\w+)}/g, (_, componentName) => {
            const componentSource = (
              types as unknown as JSONOutput.ProjectReflection
            ).children?.find((item) => item.name === componentName)
              ?.sources?.[0];

            if (componentSource) {
              const { fileName, line } = componentSource;
              return `[${componentName}](https://github.com/elastic/eui/tree/main/packages/${fileName}#L${line})`;
            } else {
              return `\`${componentName}\``;
            }
          })
          .trim()
      }
    />
  );
};
