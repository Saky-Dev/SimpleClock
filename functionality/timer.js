const timeInput = {
  min: document.querySelector('#in-min'),
  sec: document.querySelector('#in-sec')
}

const timeOutput = {
  min: document.querySelector('#out-min'),
  sec: document.querySelector('#out-sec'),
  msc: document.querySelector('#out-msc')
}

Object.keys(timeInput).forEach(item => {
  for(let i = 0; i < 60; i++) {
    let value = i < 10 ? `0${i}` : i

    timeInput[item].innerHTML += `<option value="${value}">${value}</option>`
  }
})