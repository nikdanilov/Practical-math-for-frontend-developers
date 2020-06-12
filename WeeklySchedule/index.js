function roll(min, max, floatFlag) {
    let r = Math.random() * (max - min) + min
    return floatFlag ? r : Math.floor(r)
}

let weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
let firstDay = new Date("3/1/2020")

// Write a getNextDay Function
// Takes in a Date object and
// returns the following day
function getNextDay(day) {
    let nextDay = new Date(day)
    nextDay.setDate(day.getDate() + 1)
    return nextDay
}

// Generates a list of random tasks,
// names can simply be "Task 54"/"Task 34"/etc
// Must have index and Boolean to check for completion
function generateTasks() {
    return [...Array(roll(1, 5))].map((_, i) => {
        return {
            index: i,
            name: `Task ${roll(1, 60)}`,
            complete: !!roll(0, 2)
        }
    })
}
console.log(generateTasks())


// Returns an array of days representing the week
// Generate Tasks for each day
function buildWeek(day) {
    return [...Array(7)].map((_, i) => {
        weekday = {
            index: i,
            date: day,
            tasks: generateTasks()
        }
        day = getNextDay(day)
        return weekday
    })
}

let week = buildWeek(firstDay)

let scheduleElement = document.getElementById("WeeklySchedule")
let scheduleHtml = week.reduce((accum, day) => {
    return accum + `<div class="day">
        <div>${weekdays[day.date.getDay()]} - ${countDayTasksComplete(day)} Complete</div>
        <div class="tasks">
            ${tasksToHtml(day.tasks)}
        </div>
        </div>
        `
}, '')

function tasksToHtml(tasks) {
    return tasks.reduce((accum, task) => {
        return accum + `
            <div class="circle-container ${task.complete ? 'checked' : ''}">
                <div class="circle"></div>
                <lable>${task.name}</label>
            </div>    
        `
    }, '')
}

function countDayTasksComplete(day) {
    return day.tasks.reduce((accumulator, task) => {
        return task.complete ? accumulator + 1 : accumulator
    }, 0)
}

function countWeekTasksComplete(week) {
    return week.reduce((accumulator, day) => {
        return accumulator + countDayTasksComplete(day)
    }, 0)
}

scheduleElement.innerHTML = `
    <div class="weekly-summary">
        ${countWeekTasksComplete(week)} Tasks Completed
    </div>` + scheduleHtml
