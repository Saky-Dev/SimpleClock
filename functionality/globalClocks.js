let UTCHour = new Date().getUTCHours()

const globalClocks = ['newyork', 'london', 'tokyo'].map(item => ({
  DOM: document.querySelector(`.clock#ct-${item}`),
  date: new Date()
}))

const updateGlobalClock = () => {
  globalClocks.forEach(({DOM, date}) => {
    const hrs = date.getHours()
    const min = date.getMinutes()

    date.setTime(date.getTime() + 1000)
    DOM.innerText = `${ hrs < 10 ? `0${hrs}` : hrs}:${min < 10 ? `0${min}` : min}`
  })

}

const globalTimeUpdater = setInterval(updateGlobalClock, 1000)

;[-4, 1, 9].forEach((item, i) => globalClocks[i].date.setHours(UTCHour + item))
;(updateGlobalClock)()