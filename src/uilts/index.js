
Object.rmEmpty = obj => { // 挂载到原生Object对象上
    let params = Object.assign({}, obj)
    for (let key in params) { 
      if (!params[key]) { //去除键为空的对象
        delete params[key]
      }
    }
    return params
  }
  
  Object.hasValue = (full,form) => {
    let target = Object.assign({}, form)
    var hash = Object.assign({}, full)
    var temp = {}
    for (let key in target) {
      if (hash.hasOwnProperty(key)) {
        temp[key] = hash[key]
      }else{
        temp[key] = target[key]
      }
    }
    return temp
  }
  

  export function debounce(func, wait, immediate) {
    let timeout, args, context, timestamp, result
  
    const later = function() {
      // 据上一次触发时间间隔
      const last = +new Date() - timestamp
  
      // 上次被包装函数被调用时间间隔last小于设定时间间隔wait
      if (last < wait && last > 0) {
        timeout = setTimeout(later, wait - last)
      } else {
        timeout = null
        // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
        if (!immediate) {
          result = func.apply(context, args)
          if (!timeout) context = args = null
        }
      }
    }
  
    return function(...args) {
      context = this
      timestamp = +new Date()
      const callNow = immediate && !timeout
      // 如果延时不存在，重新设定延时
      if (!timeout) timeout = setTimeout(later, wait)
      if (callNow) {
        result = func.apply(context, args)
        context = args = null
      }
  
      return result
    }
  }