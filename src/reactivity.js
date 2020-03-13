class Dep {
  subscribers = []

  depend() {
    if (target && !this.subscribers.includes(target)) {
      this.subscribers.push(target)
    }
  }

  notify() {
    this.subscribers.forEach(sub => sub())
  }
}

const dep = new Dep()

let price = 5
let quantity = 2
let total = 0
let target = null

function watcher(func) {
  target = func
  dep.depend()
  target()
  target = null
}

watcher(() => {
  total = price * quantity
})

price = 20
console.log(total)
dep.notify()
console.log(total)
