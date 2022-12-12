let isPaused  = false
let stopwatch = undefined

const time  = new Date()
const clock = ['min', 'sec', 'msc'].map(item => document.querySelector(`#${item}`))
const saved = []

const getNow = () => ({
  min: time.getMinutes(),
  sec: time.getSeconds(),
  msc: time.getMilliseconds() / 10
})

// Function to saved time into record
const saveTime = () => {
  const now = getNow()

  if (now.min > 0 || now.sec > 0 || now.msc > 10) {
    if (saved.length >= 3)
      saved.splice(0, 1)

    saved.push(
      `${Object.keys(now).map(item => `${now[item] < 10 ? `0${now[item]}` : now[item]}`)}`
      .replaceAll(',', ':')
    )

    saved.forEach((item, i) => {
      document.querySelector(`#rcd-${i}`).innerHTML = item
      document.querySelector(`#rcd-${i}`).parentElement.className = 'record fill'
    })

    updateStopwatch()
  }
}

// Funtrion to set to zero the time
const restartValues = (doUpdate, doPause, doSave) => {
  // clear interval return an undefined if done correctly
  !clearInterval(stopwatch) && (stopwatch = undefined)

  if (doSave)
    saveTime()

  time.setHours(0)
  time.setMinutes(0)
  time.setSeconds(0)
  time.setMilliseconds(0)
  
  if (doPause)
    isPaused = false
  
  if (doUpdate)
    updateStopwatch()
}

// Function to update time and GUI
const updateStopwatch = () => {
  const now = getNow()

  if (time.getHours() >= 1)
    restartValues(false, false, false)
  else {
    time.setTime(time.getTime() + 10)
    Object.keys(now).forEach((item, i) => clock[i].innerHTML = now[item] < 10 ? `0${now[item]}` : now[item])
  }
}

// Stopwatch's buttons events
document.querySelector('#restart').addEventListener('click', () => restartValues(true, true, false))

document.querySelector('#stop').addEventListener('click', () => restartValues(false, true, true))

document.querySelector('#pause').addEventListener('click', () => {
  if (!stopwatch && isPaused)
    (stopwatch = setInterval(updateStopwatch, 10)) && (isPaused = !isPaused)

  else if (stopwatch && !isPaused) {
    clearInterval(stopwatch)
    stopwatch = undefined
    isPaused = !isPaused
  }
})

document.querySelector('#start').addEventListener('click', () => {
  if (stopwatch === undefined)
    (stopwatch = setInterval(updateStopwatch, 10)) && (isPaused = false)
})

;(() => restartValues(true, false, false))()