let Dom = {}

Dom.nodeToFragment = function(el) {
  let child
  let fragment = document.createDocumentFragment()

  while (child = el.firstChild) {
    fragment.appendChild(child)
  }

  return fragment
}

Dom.isElement = function(el) {
  return el.nodeType === 1
}

Dom.isTextNode = function(el) {
  return el.nodeType === 3
}

export default Dom
