/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function createEmployeeRecord(array){
    const employeeRecord = {};
    employeeRecord.firstName = array[0];
    employeeRecord.familyName = array[1];
    employeeRecord.title = array[2];
    employeeRecord.payPerHour = array[3];
    employeeRecord.timeInEvents= [];
    employeeRecord.timeOutEvents = [];

    return employeeRecord;

}

function createEmployeeRecords(arrayOfArrays){
    const arrayOfObjects = [];
    arrayOfArrays.map(function(array){
            arrayOfObjects.push(createEmployeeRecord(array));      
    })

    return arrayOfObjects;
}

function createTimeInEvent(dateStamp){
    const [date,hour] = dateStamp.split(' ');

    const obj = {
        type: 'TimeIn',
        hour: parseInt(hour),
        date: date
    }

    this.timeInEvents.push(obj);

    return this;
}

function createTimeOutEvent(dateStamp){
    const [date,hour] = dateStamp.split(' ');

    const obj = {
        type: 'TimeOut',
        hour: parseInt(hour),
        date: date
    }

    this.timeOutEvents.push(obj);

    return this;
}



function hoursWorkedOnDate(thisDate){
    const timeIn = this.timeInEvents.find(timeIn => timeIn.date === thisDate)
    const timeOut = this.timeOutEvents.find(timeOut => timeOut.date === thisDate)

    return (timeOut.hour - timeIn.hour)/100;

}

function wagesEarnedOnDate(thisDate){
    return hoursWorkedOnDate.call(this,thisDate)*this.payPerHour;
}

function findEmployeeByFirstName(srcArray,name){
    return srcArray.find(emp=> name === emp.firstName);
}

function calculatePayroll(emps){
    let total = 0;

    emps.map(function(emp){
       total = total + allWagesFor.call(emp);
    })

    return total;
}