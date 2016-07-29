export default {
  each(items, callback, context) {
    var ret, i, len

    context = context || this

    if (Array.isArray(items)) {
      for (i = 0; i < items.length; i++) {
        ret = callback.call(context, items[i], i, items)
        if (ret === false)
          break
        if (ret === null) {
          items.splice(i, 1)
          i--
        }
      }
    } else {
      for (i in items) {
        if (items.hasOwnProperty(i)) {
          ret = callback.call(context, items[i], i, items)
          if (ret === false)
            break
          if (ret === null) {
            delete items[i]
          }
        }
      }
    }
  }
}
