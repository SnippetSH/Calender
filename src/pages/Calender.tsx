import { Col, Container, Row, Stack } from 'react-bootstrap';
import { Temporal } from "@js-temporal/polyfill";
import '../css/Calender.css';
import dates from '../data_state/dates';
import { useEffect, useState } from 'react';


type datesType = {
    FDpM: Temporal.PlainDate;
    DiM: number;
    SDoW: number;
}

function Calender({month} : {month : number}) :JSX.Element{
    const months = ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return (
        <div className='calender-Box'>
            <Container>
                <Stack gap={2}>
                    <div className='month'>{months[month-1]}</div>
                    <div>
                        <Dates month={month}></Dates>
                    </div>
                </Stack>
            </Container>
        </div>
    )
}

function Dates({month} : {month : number}) {
    let datesObj :datesType = dates(month);
    let [curDate, setCurDate] =  useState(1);

    useEffect(() => {
        setCurDate(1);
    }, [datesObj]);

    const renderFirstWeek = () :JSX.Element[] => {
        const cols :JSX.Element[] = [];
        let date = 1;

        for(let i = 0; i < datesObj.SDoW; i++) {
            cols.push(<Col key={i} className='dates'>{null}</Col>);
        }

        for(let i = datesObj.SDoW; i < 7; i++) {
            cols.push(<Col key={i} className='dates'>{date++}</Col>);
        }

        curDate = date;
        console.log(curDate);
        return cols;
    }

    const renderRemain = () :JSX.Element[] => {
        console.log(curDate);
        let date = curDate;
        console.log(date);
        const rows :JSX.Element[] = [];
        let cols :JSX.Element[] = [];

        let i = 0;
        while(date <= datesObj.DiM) {
            if(i === 7) {
                i = 0;
                let tmp = <Row>{cols}</Row>;
                rows.push(tmp);
                cols = [];
            }
            cols.push(<Col key={date} className='dates'>{date++}</Col>)
            i++;
        }

        let len = cols.length;

        for(let i = len; i < 7; i++) {
            cols.push(<Col key={++date} className='dates'>{null}</Col>)
        }
        rows.push(<Row>{cols}</Row>);

        console.log(rows);
        return rows;
    }
    
    return (
        <div>
            <Stack gap={2}>
                <Row>
                    <Col className='dates-top'>Sun</Col>
                    <Col className='dates-top'>Mon</Col>
                    <Col className='dates-top'>Tue</Col>
                    <Col className='dates-top'>Wed</Col>
                    <Col className='dates-top'>Thu</Col>
                    <Col className='dates-top'>Fri</Col>
                    <Col className='dates-top'>Sat</Col>
                </Row>
                <Row>
                    {renderFirstWeek()}
                </Row>
                {renderRemain()}
            </Stack>
        </div>
    )
}

export default Calender;