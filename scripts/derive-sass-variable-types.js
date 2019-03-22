const ts = require('typescript');
const prettier = require('prettier');

async function deriveSassVariableTypes(
  extractedVars,
  extractedVarsModuleName,
  extractedVarTypesFilename
) {
  const extractedVarsModuleDeclaration = ts.createModuleDeclaration(
    undefined,
    [ts.createModifier(ts.SyntaxKind.DeclareKeyword)],
    ts.createStringLiteral(extractedVarsModuleName),
    ts.createModuleBlock([
      ts.createVariableStatement(
        undefined,
        ts.createVariableDeclarationList(
          [
            ts.createVariableDeclaration(
              'sassVariables',
              deriveValueType(extractedVars)
            ),
          ],
          ts.NodeFlags.Const
        )
      ),
      ts.createExportAssignment(
        undefined,
        undefined,
        undefined,
        ts.createIdentifier('sassVariables')
      ),
    ]),
    ts.NodeFlags.None
  );

  const moduleSource = ts
    .createPrinter({ newLine: ts.NewLineKind.LineFeed })
    .printNode(
      ts.EmitHint.Unspecified,
      extractedVarsModuleDeclaration,
      ts.createSourceFile(extractedVarTypesFilename, '', ts.ScriptTarget.Latest)
    );

  const prettierOptions = await prettier.resolveConfig(extractedVarTypesFilename);
  const prettifiedModuleSource = prettier.format(moduleSource, prettierOptions);

  return prettifiedModuleSource;
}

function deriveValueType(extractedValue) {
  switch (typeof extractedValue) {
    case 'object':
      return ts.createTypeLiteralNode(
        Object.keys(extractedValue).map(key =>
          ts.createPropertySignature(
            undefined,
            ts.createStringLiteral(key),
            undefined,
            deriveValueType(extractedValue[key]),
            undefined
          )
        )
      );
    case 'string':
      return ts.createKeywordTypeNode(ts.SyntaxKind.StringKeyword);
    case 'number':
      return ts.createKeywordTypeNode(ts.SyntaxKind.NumberKeyword);
    default:
      return ts.createKeywordTypeNode(ts.SyntaxKind.AnyKeyword);
  }
}

module.exports = {
  deriveSassVariableTypes,
};
