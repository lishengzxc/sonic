import Util from '../../utils/'

const allowKeywords = 'Math.parseInt.parseFloat.Date.this.true.false.null.undefined.Infinity.NaN.isNaN.isFinite.decodeURI.decodeURIComponent.encodeURI.encodeURIComponent'
const regAllowKeyword = new RegExp('^(' + allowKeywords.replace(/\./g, '\\b|') + '\\b)')

const avoidKeywords = 'var.const.let.if.else.for.in.continue.switch.case.break.default.function.return.do.while.delete.try.catch.throw.finally.with.import.export.instanceof.yield.await'
const regAviodKeyword = new RegExp('^(' + avoidKeywords.replace(/\./g, '\\b|') + '\\b)')

const regSaveConst = /"(\d+)"/g
const regBool = /^(true|false)$/
const regReplaceConst = /[\{,]\s*[\w\$_]+\s*:|('[^']*'|"[^"]*")|typeof /g
const regReplaceScope = /[^\w$\.]([A-Za-z_$][\w$]*(\.[A-Za-z_$][\w$]*|\['.*?'\]|\[".*?"\])*)/g
const regNormal = /^[A-Za-z_$][\w$]*(\.[A-Za-z_$][\w$]*|\['.*?'\]|\[".*?"\]|\[\d+\]|\[[A-Za-z_$][\w$]*\])*$/

function isNormal(expression) {
  return regNormal.test(expression) && !regBool.test(expression) && expression.indexOf('Math.') !== 0
}

var consts = []

function saveConst(string) {
  var i = consts.length
  consts[i] = string
  return `"${i}"`
}

function returnConst(string, i) {
  return consts[i]
}

function replaceScope(string) {
  var pad = string.charAt(0)
  var path = string.slice(1)

  if (regAllowKeyword.test(path)) {
    return string
  } else {
    path = path.indexOf('"') > -1 ? path.replace(regSaveConst, returnConst) : path
    return pad + 'scope.' + path
  }
}

function getAlias(fors, expression) {
  var alias, exp = expression

  if (exp.indexOf(fors.alias) > -1) {
    return fors.alias
  }

  Util.each(fors.aliases, function(_alias) {
    if ((new RegExp('\\b' + _alias + '\\b|\\b' + _alias + '\\.')).test(exp)) {
      alias = _alias
      return false
    }
  })

  return alias
}

function noop() {}

function createGetter(expression) {
  return new Function('scope', 'return ' + expression + ';')
}

function addWithScope(expression) {
  if (isNormal(expression)) {
    return 'scope.' + expression
  }

  expression = (' ' + expression).replace(regReplaceConst, saveConst)
  expression = expression.replace(regReplaceScope, replaceScope)
  expression = expression.replace(regSaveConst, returnConst)

  return expression
}

class Parser {
  bind(fors, node, expression) {

  }

  getEval(fors, expression) {

  }

  getModel() {

  }

  getScope() {

  }

  updateScope(oldScope, maps, deps, args) {

  }

  getDeps() {

  }
}

export default Parser
