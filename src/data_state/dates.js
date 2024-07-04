import { Temporal } from "@js-temporal/polyfill";

function dates(month) {
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
    const firstDayofMonth = Temporal.PlainDate.from({year : curYear, month : month, day : 1}); 
    /** 현재 달에 몇 일까지 있는지 */
    const daysInMonth = firstDayofMonth.daysInMonth;
    /** 현재 달의 1일이 무슨 요일인지 */
    const startDayofWeek = new Date(curYear, month-1, 1).getDay();

    return {FDpM : firstDayofMonth, DiM : daysInMonth, SDoW : startDayofWeek};
}


export default dates;