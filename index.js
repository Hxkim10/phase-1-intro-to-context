// Your code here
function createEmployeeRecord(array) {
  return {
    firstName: array[0],
    familyName: array[1],
    title: array[2],
    payPerHour: array[3],
    timeInEvents: [],
    timeOutEvents: []
  }
}

function createEmployeeRecords(array) {
  return array.map(createEmployeeRecord)
}

function createTimeInEvent(employee, dateStamp) {
  const [date, hour] = dateStamp.split(' ')

  employee.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(hour, 10),
    date
  })

  return employee
}

function createTimeOutEvent(employee, dateStamp) {
  const [date, hour] = dateStamp.split(' ')

  employee.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(hour, 10),
    date
  })

  return employee
}

function hoursWorkedOnDate(employee, date) {
  const timeIn = employee.timeInEvents.find(event => event.date === date)
  const timeOut = employee.timeOutEvents.find(event => event.date === date)

  return (timeOut.hour - timeIn.hour) / 100
}

function wagesEarnedOnDate(employee, date) {
  const hours = hoursWorkedOnDate(employee, date)
  const rate = employee.payPerHour

  return hours * rate
}

function allWagesFor(employee) {
  const dates = employee.timeInEvents.map(event => event.date)

  return dates.reduce((total, date) => total + wagesEarnedOnDate(employee, date), 0)
}

function calculatePayroll(employees) {
  return employees.reduce((total, employee) => total + allWagesFor(employee), 0)
}