import { ast, Occur } from './ast';

const splitByFieldClauseRegex = /(-?(?:[a-zA-Z_\-@#$]+[a-zA-Z0-9_\-@#$]*):(?:\S+))/;
const splitByDefaultClausesRegex = /(-?\S+)/;
const termQueryRegex = /(-?)([a-zA-Z_\-@#$]+[a-zA-Z0-9_\-@#$]*):(\S+)/;

export const defaultSyntax = Object.freeze({

  parse: (query) => {
    const tokens = query.split(splitByFieldClauseRegex);

    return tokens.reduce((ast, token) => {
      if (token === '') {
        return ast;
      }

      // handling term query tokens
      const match = token.match(termQueryRegex);
      if (match) {
        const occur = match[1] === '-' ? Occur.MUST_NOT : Occur.MUST;
        const field = match[2];
        const value = match[3];
        if (field === 'is') {
          return ast.setIsClause(value, occur === Occur.MUST);
        }
        return ast.addFieldClause(field, value, occur);
      }

      const defaultTokens = token.split(splitByDefaultClausesRegex);
      return defaultTokens.reduce((ast, token) => {
        token = token.trim();
        if (token === '') {
          return ast;
        }
        if (token.startsWith('-')) {
          return ast.addDefaultClause(token.substring(1), Occur.MUST_NOT);
        }
        return ast.addDefaultClause(token, Occur.MUST);
      }, ast);

    }, ast());
  },

  print: (ast) => {
    return ast.clauses.reduce((text, clause) => {
      switch (clause.type) {
        case 'field':
          let prefix = clause.occur === Occur.MUST_NOT ? '-' : '';
          return `${text} ${prefix}${clause.field}:${clause.value}`;
        case 'is':
          prefix = clause.applied ? '' : '-';
          return `${text} ${prefix}is:${clause.flag}`;
        case 'default':
          prefix = clause.occur === Occur.MUST_NOT ? '-' : '';
          return `${text} ${prefix}${clause.value}`;
        default:
          return text;
      }
    }, '').trim();
  }

});
