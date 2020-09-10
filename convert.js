;(function () {
  const datepicker = {}
  datepicker.getMonthDate = function (year, month) {
    let ret = []
    if (!year || !month) {
      // 如果没有参数, 那么就取现在年份和月份
      let innerToday = new Date()
      // today = innerToday.getDate();
      year = innerToday.getFullYear()
      month = innerToday.getMonth() + 1
    }
    // 求出本月第一天
    let firstDay = new Date(year, month - 1, 1)
    // 求出第一天为周几
    let firstDayWeekDay = firstDay.getDay()
    // 0 代表周日
    if (firstDayWeekDay === 0) firstDayWeekDay = 7

    // 年份等于本月第一天
    year = firstDay.getFullYear()
    // 月份求出本月
    month = firstDay.getMonth() + 1
    // 求出上月最后一天
    let lastDayOfLastMonth = new Date(year, month - 1, 0)
    // console.log(lastDayOfLastMonth);
    // 求出上月最后一天是第几天
    let lastDateOfLastMonth = lastDayOfLastMonth.getDate()
    // console.log(lastDateOfLastMonth);

    // 前一月在本月可以显示几天
    let preMonthDayCount = firstDayWeekDay - 1

    // 求出本月最后一天
    let lastDay = new Date(year, month, 0)
    // console.log(lastDay);
    // 求出本月最后一天是第几天
    let lastDate = lastDay.getDate()
    // console.log(lastDate);

    // 开始循环, 把每个隔沾满
    for (let i = 0; i < 7 * 6; i++) {
      let disable = false
      // 计算第 i 天, 显示的日子是多少
      // 减去前一月显示天数
      let date = i + 1 - preMonthDayCount
      // 显示日子
      let showDate = date
      // 本月
      let thisMonth = month

      // 解决不是本月的显示日期问题
      // 如果小于等于0, 有前一个月的位置
      if (date <= 0) {
        showDate = lastDateOfLastMonth + date
        disable = true
      } else if (date > lastDate) {
        // 如果大于最后的天数, 说明是下一月的位置
        showDate = showDate - lastDate
        disable = true
      }

      // 处理边界情况
      if (thisMonth === 0) thisMonth = 12
      if (thisMonth === 13) thisMonth = 1

      ret.push({
        month: thisMonth,
        date,
        showDate,
        disable,
      })
    }
    return {
      // today,
      year,
      month,
      days: ret,
    }
  }
  window.datepicker = datepicker
})()
