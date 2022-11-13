const updateGlobal = () => {
  clocks.forEach(({DOM, date}) => {
    DOM.innerText =
    `${date.getHours() < 10
      ? `0${date.getHours()}` : date.getHours()
    }:${date.getMinutes() < 10
      ? `0${date.getMinutes()}` : date.getMinutes()
    }`
  })
}

const globalUpdate = setInterval(() => {
  clocks.forEach( emt => emt.date.setTime(emt.date.getTime() + 1000))
  updateGlobal()
}, 1000)

utcHour = new Date().getUTCHours()
clocks = ['newyork', 'london', 'tokyo'].map( emt => ({
  DOM: document.querySelector(`.clock#ct-${emt}`),
  date: new Date()
}))

;[-4, 1, 9].forEach((emt, i) => clocks[i].date.setHours(utcHour + emt))
;(updateGlobal)()