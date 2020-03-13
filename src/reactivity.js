class Dep {
  static target = null
  subscribers = []

  depend() {
    if (Dep.target && !this.subscribers.includes(Dep.target)) {
      this.subscribers.push(Dep.target)
    }
  }

  notify() {
    this.subscribers.forEach(sub => sub())
  }
}

function defineReactive(obj) {
  Object.keys(obj).forEach(key => {
    let value = obj[key]
    Object.defineProperty(obj, key, {
      get() {
        dep.depend()
        return value
      },
      set(newVal) {
        value = newVal
        dep.notify()
      },
    })
  })
}

const dep = new Dep()

let data = {
  price: 5,
  quantity: 2,
}
let total = 0

defineReactive(data)

function watcher(func) {
  Dep.target = func
  Dep.target()
  Dep.target = null
}

watcher(() => {
  total = data.price * data.quantity
})

console.log(total)
data.price = 20
console.log(total)
data.quantity = 10
console.log(total)
