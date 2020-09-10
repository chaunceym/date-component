;(function () {
  const datepicker = window.datepicker
  const monthData = datepicker.getMonthDate()
  const $left = document.querySelector('.ui-datepicker-prev-btn')
  const $right = document.querySelector('.ui-datepicker-next-btn')
  const $datepicker = document.querySelector('.datepicker')
  const $wrapper = document.querySelector('.ui-datepicker-wrapper')
  const $currentDate = document.querySelector('.ui-datepicker-current-month')
  const $tBody = document.getElementById('tBody')

  datepicker.buildUi = function (monthData) {
    $currentDate.innerText = `${monthData.year}-${monthData.month}`
    let myHtml = ''
    for (let i = 0; i < monthData.days.length; i++) {
      const date = monthData.days[i]
      if (i % 7 === 0) {
        myHtml += '<tr>'
      }
      if (date.disable) {
        myHtml += `<td style="color:#ccc;" data-disable=${date.disable}>${date.showDate}</td>`
      } else {
        myHtml += `<td>${date.showDate}</td>`
      }
      if (i % 7 === 6) {
        myHtml += '<tr>'
      }
    }
    return myHtml
  }

  datepicker.init = function (dom) {
    const myHtml = datepicker.buildUi(monthData)
    dom.innerHTML = myHtml
    datepicker.addEvent()
  }

  datepicker.addEvent = function () {
    $datepicker.onfocus = () => {
      $wrapper.style.display = 'block'
    }
    $wrapper.onclick = (e) => {
      const $target = e.target
      if ($target.tagName.toLocaleLowerCase() === 'td' && !$target.dataset.disable) {
        let date = new Date(monthData.year, monthData.month - 1, $target.innerText)
        $currentDate.innerText = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
        $datepicker.value = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
        $wrapper.style.display = 'none'
      }
    }
    $left.onclick = () => {
      monthData.month--
      let monthData1 = datepicker.getMonthDate(monthData.year, monthData.month)
      $tBody.innerHTML = datepicker.buildUi(monthData1)
    }
    $right.onclick = () => {
      monthData.month++
      let monthData2 = datepicker.getMonthDate(monthData.year, monthData.month)
      $tBody.innerHTML = datepicker.buildUi(monthData2)
    }
  }

  datepicker.init($tBody)
})()
