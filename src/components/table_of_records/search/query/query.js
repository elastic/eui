import { defaultSyntax } from './default_syntax';
import { executeAst } from './execute_ast';
import { isNil } from '../../../../services/predicate';
import { astToES } from './ast_to_es';
import { AST } from './ast';

/**
 * This is the consumer interface for the query - it's effectively a wrapper construct around
 * the AST and some of its related utility functions (e.g. parsing, text representation, executing, etc...)
 * It is immutable - all mutating operations return a new (mutated) query instance.
 */
export class Query {

  static parse(text, syntax = defaultSyntax) {
    return new Query(syntax.parse(text), syntax, text);
  }

  static isMust(clause) {
    return AST.Match.isMustClause(clause);
  }

  static isTerm(clause) {
    return AST.Term.isInstance(clause);
  }

  static isIs(clause) {
    return AST.Is.isInstance(clause);
  }

  static isField(clause) {
    return AST.Field.isInstance(clause);
  }

  constructor(ast, syntax = defaultSyntax, text = undefined) {
    this.ast = ast;
    this.text = text || syntax.print(ast);
    this.syntax = syntax;
  }

  hasFieldClause(field, value = undefined) {
    const clauses = this.ast.getFieldClauses(field);
    if (!clauses) {
      return false;
    }
    return isNil(value) || clauses.some(clause => clause.value === value);
  }

  getFieldClause(field, value) {
    return this.ast.getFieldClause(field, value);
  }

  removeFieldClauses(field) {
    const ast = this.ast.removeFieldClauses(field);
    return new Query(ast, this.syntax);
  }

  addMustFieldClause(field, value) {
    const ast = this.ast.addClause(AST.Field.must(field, value));
    return new Query(ast, this.syntax);
  }

  addMustNotFieldClause(field, value) {
    const ast = this.ast.addClause(AST.Field.mustNot(field, value));
    return new Query(ast, this.syntax);
  }

  removeFieldClause(field, value) {
    const ast = this.ast.removeFieldClause(field, value);
    return new Query(ast, this.syntax);
  }

  hasIsClause(flag) {
    return !isNil(this.ast.getIsClause(flag));
  }

  getIsClause(flag) {
    return this.ast.getIsClause(flag);
  }

  addMustIsClause(flag) {
    const ast = this.ast.addClause(AST.Is.must(flag));
    return new Query(ast, this.syntax);
  }

  addMustNotIsClause(flag) {
    const ast = this.ast.addClause(AST.Is.mustNot(flag));
    return new Query(ast, this.syntax);
  }

  removeIsClause(flag) {
    const ast = this.ast.removeIsClause(flag);
    return new Query(ast, this.syntax);
  }

  /**
   * Executes this query over the given iterable item and returns
   * an new array of all items that matched this query. Options:
   *
   * defaultFields: string[]
   *
   *    An array of field names to match the default clauses against. When not specified, the query
   *    will pick up all the string fields of each record and try to match against those.
   *
   * isClauseMatcher?: (record: any, flag: string, applied: boolean, explain?: []) => boolean
   *
   *    By default the 'is' clauses will try to match against boolean fields - where the flag of the clause
   *    indicates the field name. You can change this behaviour by providing this matcher function for the
   *    is clause. For example, if the object has a `tags` field, one can create a matcher that checks if
   *    an object has a specific tag (e.g. "is:marketing", "is:kitchen", etc..)
   *
   * explain?: boolean
   *
   *    When set to `true`, each item in the returns array will have an `__explain` field that will hold
   *    information about why the objects matched the query (default to `false`, mainly/only useful for
   *    debugging)
   */
  execute(items, options = {}) {
    return executeAst(this.ast, items, options);
  }

  /**
   * Builds and returns an Elasticsearch query out this query. Options:
   *
   * defaultFields?: string[]
   *
   *    An array of field names to match the default clauses against. When not specified, the query
   *    will pick up all the string fields of each record and try to match against those.
   *
   * isToQuery?: (flag: string, on: boolean) => Object (elasticsearch query object)
   *
   *    By default, "is" clauses will be translated to a term query where the flag is the field
   *    and the "on" value will be the value of the field. This function lets you change this default
   *    translation and provide your own custom one.
   *
   * termValuesToQuery?: (values: string[]) => Object (elasticsearch query object)
   *
   *    By default, "term" clauses will be translated to a "simple_query_string" query where all
   *    the values serve as terms in the query string. This function lets you change this default
   *    translation and provide your own custom one.
   *
   * fieldValuesToAndQuery?: (field: string, values: string[]) => Object (elasticsearch query object)
   *
   *    By default, "field" clauses will be translated to a match query where all the values serve as
   *    terms in the query(the operator is AND). This function lets you change this default translation
   *    and provide your own custom one.
   */
  toESQuery(options = {}) {
    return astToES(this.ast, options);
  }

}
