import { Col, Container, Row, Stack, Button } from 'react-bootstrap';
import { Temporal } from "@js-temporal/polyfill";
import '../css/Calender.css';
import dates from '../data_state/dates';
import { useEffect, useState } from 'react';

type datesType = {
    DiM: number;
    SDoW: number;
}

function Calender(): JSX.Element {

    const date = Temporal.Now.plainDateISO();
    let curMonth = date.month;
    let curYear = date.year;
    let [month, setMonth] = useState(curMonth);
    let [year, setYear] = useState(curYear);

    let [datesObj, setDatesObj] = useState(dates(curMonth, curYear));

    useEffect(() => {
        if (month > 12) {
            setMonth(1);
            setYear(year+1);
        } else if (month < 1) {
            setMonth(12);
            setYear(year-1);
        }
        setDatesObj(dates(month, year));
    }, [month]);

    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return (
        <div className='calender-Box'>
            <Container>
                <Stack gap={2}>
                    <div className='month'>
                        <Button variant="outline-info" className='buttonsPN' onClick={() => {
                            setMonth(month - 1);
                        }}>prev</Button>{' '}
                        <div>{year} {months[month - 1]}</div>
                        <Button variant="outline-info" className='buttonsPN' onClick={() => {
                            setMonth(month + 1);
                        }}>next</Button>{' '}
                    </div>
                    <div>
                        <Dates datesObj={datesObj}></Dates>
                    </div>
                </Stack>
            </Container>
        </div>
    )
}

function Dates({ datesObj }: { datesObj: datesType }) {
    console.log(datesObj);
    let curDate = 1;

    useEffect(() => {
        curDate = 1;
    }, [datesObj])

    const renderFirstWeek = (): JSX.Element[] => {
        const cols: JSX.Element[] = [];
        let date = 1;

        for (let i = 0; i < datesObj.SDoW; i++) {
            cols.push(<Col key={`empty-${i}`} className='dates'>{null}</Col>);
        }

        for (let i = datesObj.SDoW; i < 7; i++) {
            cols.push(<Col key={`date-${date}`} className='dates'>{date++}</Col>);
        }

        curDate = date;
        console.log(curDate);
        return cols;
    }

    const renderRemain = (): JSX.Element[] => {
        console.log(curDate);
        let date = curDate;
        console.log(date);
        const rows: JSX.Element[] = [];
        let cols: JSX.Element[] = [];
        let i = 0;

        while (date <= datesObj.DiM) {
            if (i === 7) {
                i = 0;
                let tmp = <Row key={`row-${date}`}>{cols}</Row>;
                rows.push(tmp);
                cols = [];
            }
            cols.push(<Col key={`date-${date}`} className='dates'>{date++}</Col>);
            i++;
        }

        let len = cols.length;

        for (let i = len; i < 7; i++) {
            cols.push(<Col key={`empty-${date + i}`} className='dates'>{null}</Col>);
        }
        rows.push(<Row key={`row-last`}>{cols}</Row>);

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
