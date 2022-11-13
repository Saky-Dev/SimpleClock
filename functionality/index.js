let middayFormat = false

const date  = new Date()
const clock = ['hrs', 'min', 'sec'].map(item => document.querySelector(`#${item}`))

const mainClock = document.querySelector('.main-clock')
const meridiem  = document.querySelector('#meridiem')

const setMeridiem = hrs => {
  if (middayFormat)
    hrs <= 12
    ? meridiem.innerHTML = 'am'
    : (meridiem.innerHTML = 'pm', hrs -= 12)

  return hrs
}

const updateClock = () => {
  let hrs = date.getHours()
  let min = date.getMinutes()
  let sec = date.getSeconds()

  hrs = setMeridiem(hrs)
  date.setTime(date.getTime() + 1000)

  ;[hrs, min, sec].forEach((item, i) => clock[i].innerHTML = item < 10 ? `0${item}` : item)
}

const timeUpdater = setInterval(updateClock, 1000)

// button's event to change the clock format
document.querySelector('#format-changer').addEventListener('click', e => {
  let hrs = date.getHours()

  middayFormat = !middayFormat
  e.target.className  = `switch-action ${middayFormat ? 'on' : 'off'}`
  mainClock.className = `main-clock ${middayFormat ? 'midday' : 'complete'}-format`
  
  hrs = setMeridiem(hrs)
  clock[0].innerHTML = hrs < 10 ? `0${hrs}` : hrs
})

// this line refers to navbar item selected and remove the unnecessary action
document.querySelector('.selected').addEventListener('click', e => e.preventDefault())

// Here an IP API is consume to get the user location through ip
fetch('http://ip-api.com/json/')
  .then(res => res.json())
  .then(res => { document.querySelector('#country').innerHTML = `Time in ${res.city}, ${res.country}` })
  .catch(msg => console.error(msg))

// initializing clock functionality
;(() => updateClock())()