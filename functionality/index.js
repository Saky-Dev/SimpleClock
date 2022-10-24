const updateTime = () => {
  clock.hours.innerText = time.getHours() < 10 ? `0${time.getHours()}` : time.getHours()
  clock.minutes.innerText = time.getMinutes() < 10 ? `0${time.getMinutes()}` : time.getMinutes()
  clock.seconds.innerText = time.getSeconds() < 10 ? `0${time.getSeconds()}` : time.getSeconds()

  time.setTime(time.getTime() + 1000)
}

const time = new Date()
const updater = setInterval(updateTime, 1000)

let clock = {
  hours: document.querySelector('#hours'),
  minutes: document.querySelector('#minutes'),
  seconds: document.querySelector('#seconds')
}

;(updateTime)()