import Dom from './dom'

const regNewline = /\n/g
const regText = /\{\{(.+?)\}\}/g
const regHtml = /\{\{\{(.+?)\}\}\}/g
const regMustacheSpace = /\s\{|\{|\{|\}|\}|\}/g
const regMustache = /(\{\{.*\}\})|(\{\{\{.*\}\}\})/

let CompileHelper = {}

CompileHelper.isDirective = function(directive) {
  return directive.indexOf('v-') === 0
}

CompileHelper.isLateCompileChilds = function(node) {
  return node.hasAttributes('v-if') || node.hasAttributes('v-for') || node.hasAttributes('v-pre')
}

CompileHelper.hasDirective = function(node) {
  if (Dom.isElement(node) && node.hasAttributes()) {
    let nodeAttrs = node.attributes

    for (let i = 0, len = nodeAttrs.length; i < len; i++) {
      if (CompileHelper.isDirective(nodeAttrs[i].name)) {
        return true
      }
    }
  } else if (Dom.isTextNode(node) && regMustache.test(node.textContent)) {
    return true
  } else {
    return false
  }
}

export default CompileHelper
