let isPaused = false
let timer = undefined

const time  = new Date()
const sound = document.querySelector('#timer-sound')

// Reference to input time tags
const timeIn = {
  min: document.querySelector('#in-min'),
  sec: document.querySelector('#in-sec')
}

// Reference to output time tags
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

/* analize if for one reason the time on input isn't a nmber
 * the function says to the user that there are problems and
 * return false, else the GUI tags and time are set to input
 * values and return a true
 */
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

/* First substract 10 to time, get the new time and save it
 * then display the values into output time tags and finaly
 * analize if the values are 0 the timer stop and the sound
 * play by 5 seconds
 */
const updateTimer = () => {
  let now = undefined

  time.setTime(time.getTime() - 10)
  now = getNow()

  Object.keys(now).forEach(item => timeOut[item].innerHTML = now[item] < 10 ? `0${now[item]}` : now[item])

  if (now['min'] === 0 && now['sec'] === 0 && now['msc'] === 0) {
    clearInterval(timer)
    timer = undefined

    sound.currentTime = 0
    sound.play()
    setTimeout(() => sound.pause(), 5000)
  }
}

// Timer's buttons events
/* If there aren't problems with restart values function
 * the timer is stoped and the sound is paused
 */
document.querySelector('#restart').addEventListener('click', () => {
  if (restartValues()) {
    clearInterval(timer)
    timer = undefined
    sound.pause()
  }
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

// Set the time to 0
time.setHours(0)
time.setMinutes(0)
time.setSeconds(0)
time.setMilliseconds(0)

/* Through for each fill the input tags
 * with numbers from 00 to 60 in option tags
 */
Object.keys(timeIn).forEach(item => {
  for(let i = 0; i < 60; i++) {
    let value = i < 10 ? `0${i}` : i

    timeIn[item].innerHTML += `<option value="${value}">${value}</option>`
  }
})