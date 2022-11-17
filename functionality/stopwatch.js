let stopwatch = undefined

const time  = new Date()
const clock = ['min', 'sec', 'msc'].map(item => document.querySelector(`#${item}`))

const restartValues = () => {
  time.setHours(0)
  time.setMinutes(0)
  time.setSeconds(0)
  time.setMilliseconds(0)
  
  clearInterval(stopwatch)
  stopwatch = undefined
}

const updateStopwatch = () => {
  const now = {
    min: time.getMinutes(),
    sec: time.getSeconds(),
    msc: time.getMilliseconds() / 10
  }

  time.setTime(time.getTime() + 10)

  Object.keys(now).forEach((item, i) => clock[i].innerHTML = now[item] < 10 ? `0${now[item]}` : now[item])
}

const pauseText = isPause => document.querySelector('#start span').innerHTML = isPause ? 'Continue' : 'Start'

document.querySelector('#restart').addEventListener('click', () => {
  pauseText(false)
  restartValues()
  updateStopwatch()
})

document.querySelector('#stop').addEventListener('click', () => {
  pauseText(false)
  restartValues()
})

document.querySelector('#pause').addEventListener('click', () => {
  if (stopwatch !== undefined) {
    pauseText(true)
    clearInterval(stopwatch)
    stopwatch = undefined
  }
})

document.querySelector('#start').addEventListener('click', () => {
  pauseText(false)

  if (stopwatch === undefined)
    stopwatch = setInterval(updateStopwatch, 10)
})

;(() => {
  restartValues()
  updateStopwatch()
})()