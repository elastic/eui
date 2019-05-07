import { defaultSyntax } from './default_syntax';
import { executeAst } from './execute_ast';
import { isNil, isString } from '../../../services/predicate';
import { astToEsQueryDsl } from './ast_to_es_query_dsl';
import { astToEsQueryString } from './ast_to_es_query_string';
import { dateValueParser } from './date_value';
import { AST, Operator } from './ast';

/**
 * This is the consumer interface for the query - it's effectively a wrapper construct around
 * the AST and some of its related utility functions (e.g. parsing, text representation, executing, etc...)
 * It is immutable - all mutating operations return a new (mutated) query instance.
 */
export class Query {

  static parse(text, options, syntax = defaultSyntax) {
    return new Query(syntax.parse(text, options), syntax, text);
  }

  static parseDateValue(value, format = undefined) {
    return dateValueParser(format)(value);
  }

  static isMust(clause) {
    return AST.Match.isMustClause(clause);
  }

  static MATCH_ALL = Query.parse('');

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

  hasSimpleFieldClause(field, value = undefined) {
    return this.ast.hasSimpleFieldClause(field, value);
  }

  getSimpleFieldClause(field, value) {
    return this.ast.getSimpleFieldClause(field, value);
  }

  removeSimpleFieldClauses(field) {
    const ast = this.ast.removeSimpleFieldClauses(field);
    return new Query(ast, this.syntax);
  }

  addSimpleFieldValue(field, value, must = true, operator = Operator.EQ) {
    const ast = this.ast.addSimpleFieldValue(field, value, must, operator);
    return new Query(ast, this.syntax);
  }

  removeSimpleFieldValue(field, value) {
    const ast = this.ast.removeSimpleFieldValue(field, value);
    return new Query(ast, this.syntax);
  }

  hasOrFieldClause(field, value = undefined) {
    return this.ast.hasOrFieldClause(field, value);
  }

  getOrFieldClause(field, value) {
    return this.ast.getOrFieldClause(field, value);
  }

  addOrFieldValue(field, value, must = true) {
    const ast = this.ast.addOrFieldValue(field, value, must);
    return new Query(ast, this.syntax);
  }

  removeOrFieldValue(field, value) {
    const ast = this.ast.removeOrFieldValue(field, value);
    return new Query(ast, this.syntax);
  }

  removeOrFieldClauses(field) {
    const ast = this.ast.removeOrFieldClauses(field);
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
  static execute(query, items, options = {}) {
    const q = isString(query) ? Query.parse(query) : query;
    return executeAst(q.ast, items, options);
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
  static toESQuery(query, options = {}) {
    const q = isString(query) ? Query.parse(query) : query;
    return astToEsQueryDsl(q.ast, options);
  }

  static toESQueryString(query, options = {}) {
    const q = isString(query) ? Query.parse(query) : query;
    return astToEsQueryString(q.ast, options);
  }

}
