import Dom from '../utils/dom'
import Helper from '../utils/compilerHelper'
import Util from '../utils/'

class Compiler {
  constructor(el, model) {
    this.$el = el

    this.$fragment = Dom.nodeToFragment(this.$el)
    this.$data = model

    this.$unCompiles = []
    this.$rootComplied = false

    this.compileElement(this.$fragment, true)
  }


  compileElement(el, root, fors) {
    let childNodes = el.childNodes

    if (root && Helper.hasDirective(el)) {
      this.$unCompiles.push([el, fors])
    }

    for (let i = 0, len = childNodes.length; i < len; i++) {
      let node = childNodes[i]

      if (Helper.hasDirective(node)) {
        this.$unCompiles.push([node, fors])
      }

      if (node.hasChildNodes() && !Helper.isLateCompileChilds(node)) {
        this.compileElement(node, false, fors)
      }
    }

    if (root) {
      this.compileAll()
    }
  }

  compileAll() {
    Util.each(this.$unCompiles, function(info) {
      this.compileDirectives(info)
      return null
    }, this)

    this.checkRoot()
  }

  compileDirectives(info) {
    var node = info[0], fors = info[1]

    if (Dom.isElement(node)) {
      let vfor, attrs = []
      let nodeAttrs = node.attributes

      for (var i = 0; i < nodeAttrs.length; i++) {
        let attr = nodeAttrs[i]
        let name = attr.name

        if (Helper.isDirective(name)) {
          if (name === 'v-for') {
            vfor = attr
          }
          attrs.push(attr)
        }
      }

      // if (vfor) {
      //   util.def(node, '__directives', attrs.length)
      //   attrs = [vfor]
      //   vfor = null
      // }

      Util.each(attrs, function(attr) {
        this.compile(node, attr, fors)
      }, this)

    } else if (Dom.isTextNode(node)) {

    }
  }

  compile(node, attr, fors) {
    let dir = attr.name
    let exp = attr.value
    let args = [fors, node, exp, dir]

    node.removeAttribute(dir)

    if (dir.indexOf('v-bind') === 0) {

    } else if (dir.indexOf('v-on') === 0) {

    } else {
      switch (dir) {
        case 'v-text':

          break
      }
    }
  }

  checkRoot() {

  }
}

export default Compiler
