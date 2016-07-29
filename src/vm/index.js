import Compiler from './compiler'

class VM {
  constructor({el, model}) {
    // debugger
    this.vm = new Compiler(el, model)
  }
}

export default VM
