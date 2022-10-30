// clock functionality
const updateTime = () => {
  let hours = 0
  if (meridiemFormat && time.getHours() > 12) {
    hours = time.getHours() - 12
    document.querySelector('#meridiem').innerHTML = 'pm'
  } else {
    hours = time.getHours()
    document.querySelector('#meridiem').innerHTML = 'am'
  }
  clock.hours.innerText = hours < 10 ? `0${hours}` : hours
  clock.minutes.innerText = time.getMinutes() < 10 ? `0${time.getMinutes()}` : time.getMinutes()
  clock.seconds.innerText = time.getSeconds() < 10 ? `0${time.getSeconds()}` : time.getSeconds()
}

const time = new Date()
const localUpdater = setInterval(() => {
  updateTime()
  time.setTime(time.getTime() + 1000)
}, 1000)

let meridiemFormat = false
let clock = {
  hours: document.querySelector('#hours'),
  minutes: document.querySelector('#minutes'),
  seconds: document.querySelector('#seconds')
}

// Here an IP API is consume to get the user location through ip
fetch('http://ip-api.com/json/')
.then(res => res.json())
.then(res => { document.querySelector('#country').innerHTML = `Time in ${res.city}, ${res.country}` })
.catch(msg => console.error(msg))

;(updateTime)()

// format changer
document.querySelector('#time-format-changer').addEventListener('click', e => {
  meridiemFormat = !meridiemFormat
  e.target.className = `switch-action ${meridiemFormat ? 'on' : 'off'}`
  document.querySelector('.main-clock').className = `main-clock ${meridiemFormat ? 'meridiem' : 'complete'}-format`
  updateTime()
})

document.querySelector('.selected').addEventListener('click', e => e.preventDefault())