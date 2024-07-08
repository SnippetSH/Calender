import { Container, Stack, Button, OverlayTrigger, Tooltip} from 'react-bootstrap';
import { Temporal } from "@js-temporal/polyfill";
import '../css/Calender.css';
import dates from '../data_state/dates';
import React, { useEffect, useState } from 'react';
import Dates from './Dates.tsx';
import { OverlayChildren, OverlayProps } from '../../node_modules/react-bootstrap/esm/Overlay';

type datesType = {
    prev : {
        DiM: number;
        SDoW: number;
    },
    cur : {
        DiM: number;
        SDoW: number;
        CD: number;
    },
    next : {
        DiM: number;
        SDoW: number;
    }
}

export type { datesType };

function Calender(): JSX.Element {

    const date = Temporal.Now.plainDateISO();
    let curMonth = date.month;
    let curYear = date.year;
    let [month, setMonth] = useState(curMonth);
    let [year, setYear] = useState(curYear);

    let [datesObj, setDatesObj] = useState(dates(curMonth, curYear));

    const [direction, setDirection] = useState(''); // 애니메이션 방향 상태


    useEffect(() => {
        setDatesObj(dates(month, year));
    }, [month, year]);

    const handle = (isPrev : boolean) => {
        setDirection(isPrev ? 'prev' : 'next'); // 애니메이션 방향 설정

        setTimeout(() => {
            setMonth(prevMonth => {
                if (prevMonth === 1 && isPrev) {
                    setYear(year - 1);
                    return 12;
                } else if (prevMonth === 12 && !isPrev) {
                    setYear(year + 1);
                    return 1;
                } else {
                    return isPrev ? prevMonth - 1 : prevMonth + 1;
                }
            });

            setDirection('');
        }, 500); // 애니메이션 지속 시간만큼 지연
    };

    const renderPrev = (props: any) : React.ReactNode => (
        <Tooltip id='prev-tooltip' {... props}>
            move to prev month
        </Tooltip>
    )

    const renderNext = (props: any) : React.ReactNode => (
        <Tooltip id='next=tooltip' {... props}>
            move to next month
        </Tooltip>
    )

    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    
    return (
        <div className='calender-Box'>
            <Container>
                <Stack gap={2}>
                    <div className='month'>
                        <OverlayTrigger
                            placement='right'
                            delay={{show: 250, hide: 400}}
                            overlay={renderPrev}>
                            <Button variant="outline-info" className='buttonsPN' onClick={()=>handle(true)}>prev</Button>
                        </OverlayTrigger>
                        <div>{year} {months[month - 1]}</div>
                        <OverlayTrigger
                            placement='right'
                            delay={{show: 250, hide: 400}}
                            overlay={renderNext}>
                            <Button variant="outline-info" className='buttonsPN' onClick={()=>handle(false)}>next</Button>
                        </OverlayTrigger>
                    </div>
                    <div className={`calendar-container ${direction === 'prev' ? 'prev' : direction === 'next' ? 'next' : 'origin'}`}>
                        <div className="calendar">
                            <Dates datesObj={datesObj} curMonth={curMonth} curYear={curYear} month={month - 1 || 12} year={month === 1 ? year - 1 : year} ch={0} mini={false}></Dates>
                        </div>
                        <div className="calendar">
                            <Dates datesObj={datesObj} curMonth={curMonth} curYear={curYear} month={month} year={year} ch={1} mini={false}></Dates>
                        </div>
                        <div className="calendar">
                            <Dates datesObj={datesObj} curMonth={curMonth} curYear={curYear} month={month + 1 > 12 ? 1 : month + 1} year={month === 12 ? year + 1 : year} ch={2} mini={false}></Dates>
                        </div>
                    </div>
                </Stack>
            </Container>
        </div>
    )
}

export default Calender;
