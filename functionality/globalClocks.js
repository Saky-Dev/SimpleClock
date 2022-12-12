// this variable is used to manage the hours of the three global places
let UTCHour = new Date().getUTCHours()

// set in each place the DOM reference and tha initial time
const globalClocks = ['newyork', 'london', 'tokyo']
.map(item => ({
  DOM: document.querySelector(`.clock#ct-${item}`),
  date: new Date()
}))

const updateGlobalClock = () => {
  globalClocks.forEach(({DOM, date}) => {
    const hrs = date.getHours()
    const min = date.getMinutes()

    date.setTime(date.getTime() + 1000)
    DOM.innerText = `${hrs < 10 ? `0${hrs}` : hrs}:${min < 10 ? `0${min}` : min}`
  })

}

const globalTimeUpdater = setInterval(updateGlobalClock, 1000)

// the time is added to UTC hour in wach place
;[-4, 1, 9].forEach((item, i) => globalClocks[i].date.setHours(UTCHour + item))
;(updateGlobalClock)()