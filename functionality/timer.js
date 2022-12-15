let isPaused = false
let timer    = undefined

const time = new Date()

const timeIn = {
  min: document.querySelector('#in-min'),
  sec: document.querySelector('#in-sec')
}

const timeOut = {
  min: document.querySelector('#out-min'),
  sec: document.querySelector('#out-sec'),
  msc: document.querySelector('#out-msc')
}

const getNow = () => ({
  min: time.getMinutes(),
  sec: time.getSeconds(),
  msc: time.getMilliseconds() / 10
})

const restartValues = () => {
  if (isNaN(timeIn.min.value) || isNaN(timeIn.sec.value)) {
    alert('We have troubles with timer functions, try it later')
    return false
  } else {
    timeOut.min.innerHTML = timeIn.min.value
    timeOut.sec.innerHTML = timeIn.sec.value
    timeOut.msc.innerHTML = '00'

    time.setMinutes(parseInt(timeIn.min.value))
    time.setSeconds(parseInt(timeIn.sec.value))
    time.setMilliseconds(0)
    return true
  }
}

const updateTimer = () => {
  let now = undefined

  time.setTime(time.getTime() - 10)
  now = getNow()

  Object.keys(now).forEach(item => timeOut[item].innerHTML = now[item] < 10 ? `0${now[item]}` : now[item])

  if (now['min'] === 0 && now['sec'] === 0 && now['msc'] === 0) {
    !clearInterval(timer) && (timer = undefined)
  }
}

document.querySelector('#restart').addEventListener('click', () => {
  if (restartValues())
    !clearInterval(timer) && (timer = undefined)
})

document.querySelector('#pause').addEventListener('click', () => {
  if (!timer && isPaused)
    (timer = setInterval(updateTimer, 10)) && (isPaused = !isPaused)

  else if (timer && !isPaused) {
    clearInterval(timer)
    timer = undefined
    isPaused = !isPaused
  }
})

document.querySelector('#start').addEventListener('click', () => {
  if (!timer && isPaused)
    (timer = setInterval(updateTimer, 10)) && (isPaused = false)
    
  else if (!timer && !isPaused)
    if (restartValues() && (time.getMinutes() || time.getSeconds()))
      timer = setInterval(updateTimer, 10)
})

// set by first time the values as 0
time.setHours(0)
time.setMinutes(0)
time.setSeconds(0)

// fill the time inputs with numbers
Object.keys(timeIn).forEach(item => {
  for(let i = 0; i < 60; i++) {
    let value = i < 10 ? `0${i}` : i

    timeIn[item].innerHTML += `<option value="${value}">${value}</option>`
  }
})