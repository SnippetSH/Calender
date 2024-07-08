import { Temporal } from "@js-temporal/polyfill";

function dates(month, year) {
    let week = {
        1 : 'Mon',
        2 : 'Tue',
        3 : 'Wed',
        4 : 'Thu',
        5 : 'Fri',
        6 : 'Sat',
        7 : 'Sun'
    }
    const date = Temporal.Now.plainDateISO();
    console.log(date);

    let curMonth = date.month;
    let curYear = date.year;

    /** 현재 년도, 현재 달, 1일 */
    const firstDayofMonth = Temporal.PlainDate.from({year : year, month : month, day : 1}); 
    /** 현재 달에 몇 일까지 있는지 */
    const daysInMonth = firstDayofMonth.daysInMonth;
    /** 현재 달의 1일이 무슨 요일인지 */
    const startDayofWeek = new Date(year, month-1, 1).getDay();

    let prevMonth = month - 1, prevYear = year;
    if(month === 1) {
        prevMonth = 12;
        prevYear = year - 1;
    }
    /** 현재 년도, 이전 달, 1일 */
    const firstDayofPrevMonth = Temporal.PlainDate.from({year : prevYear, month : prevMonth, day : 1}); 
    /** 이전 달에 몇 일까지 있는지 */
    const daysInPrevMonth = firstDayofPrevMonth.daysInMonth;
    /** 이전 달의 1일이 무슨 요일인지 */
    const startDayofPrevWeek = new Date(prevYear, prevMonth-1, 1).getDay();


    let nextMonth = month + 1, nextYear = year;
    if(month === 12) {
        nextMonth = 1;
        nextYear = year + 1;
    }
    /** 현재 년도, 이전 달, 1일 */
    const firstDayofNextMonth = Temporal.PlainDate.from({year : nextYear, month : nextMonth, day : 1}); 
    /** 다음 달에 몇 일까지 있는지 */
    const daysInNextMonth = firstDayofNextMonth.daysInMonth;
    /** 다음 달의 1일이 무슨 요일인지 */
    const startDayofNextWeek = new Date(nextYear, nextMonth-1, 1).getDay();


    return {
        prev : {DiM : daysInPrevMonth, SDoW : startDayofPrevWeek},
        cur : {DiM : daysInMonth, SDoW : startDayofWeek, CD : date.day},
        next : {DiM : daysInNextMonth, SDoW : startDayofNextWeek}
    };
}

export default dates;