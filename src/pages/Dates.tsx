import { Row, Col, Stack } from "react-bootstrap";
import { useEffect } from "react";
import type { datesType } from '../type/type.ts'
import '../css/Dates.css'

function Dates({ datesObj, curMonth, curYear, month, year, ch, mini }: { datesObj: datesType, curMonth: number, curYear: number, month: number, year: number, ch: number, mini: boolean }) {
    let curDate = 1;
    let prevDate = 1;
    let nextDate = 1;

    useEffect(() => {
        curDate = 1;
        prevDate = 1;
        nextDate = 1;
    }, [datesObj])

    const renderFirstWeek = (): JSX.Element[] => {
        const cols: JSX.Element[] = [];
        let date = 1;

        for (let i = 0; i < datesObj.cur.SDoW; i++) {
            cols.push(<Col key={`empty-${i}`} className={`${mini ? 'dates-mini' : 'dates'}`}>{null}</Col>);
        }

        for (let i = datesObj.cur.SDoW; i < 7; i++) {
            if(date === datesObj.cur.CD && curMonth === month && curYear === year) {
                cols.push(<Col key={`date-${date}`} className={`${mini ? 'dates-mini' : 'dates'} ${i === 6 ? 'text-blue-600' : ''} ${i === 0 ? 'text-red-500' : ''}`}><div className={`${mini ? 'mini-current' : 'current'}`}>{date++}</div></Col>);
                continue;
            }
            cols.push(<Col key={`date-${date}`} className={`${mini ? 'dates-mini' : 'dates'} ${i === 6 ? 'text-blue-600' : ''} ${i === 0 ? 'text-red-500' : ''}`}>{date++}</Col>);
        }

        curDate = date;
        
        return cols;
    }

    const renderRemain = (): JSX.Element[] => {
        
        let date = curDate;
              const rows: JSX.Element[] = [];
        let cols: JSX.Element[] = [];
        let i = 0;

        while (date <= datesObj.cur.DiM) {
            if (i === 7) {
                i = 0;
                let tmp = <Row key={`row-${date}`}>{cols}</Row>;
                rows.push(tmp);
                cols = [];
            }
            if(date === datesObj.cur.CD && curMonth === month && curYear === year) {
                cols.push(<Col key={`date-${date}`} className={`${mini ? 'dates-mini' : 'dates'} ${i === 6 ? 'text-blue-600' : ''} ${i === 0 ? 'text-red-500' : ''}`}><div className={`${mini ? 'mini-current' : 'current'}`}>{date++}</div></Col>);
                i++;
                continue;
            }
            cols.push(<Col key={`date-${date}`} className={`${mini ? 'dates-mini' : 'dates'} ${i === 6 ? 'text-blue-600' : ''} ${i === 0 ? 'text-red-500' : ''}`}>{date++}</Col>);
            i++;
        }

        let len = cols.length;

        for (let i = len; i < 7; i++) {
            cols.push(<Col key={`empty-${date + i}`} className={`${mini ? 'dates-mini' : 'dates'}`}>{null}</Col>);
        }
        rows.push(<Row key={`row-last`}>{cols}</Row>);
              return rows;
    }



    const renderPrevFirstWeek = (): JSX.Element[] => {
        const cols: JSX.Element[] = [];
        let date = 1;

        for (let i = 0; i < datesObj.prev.SDoW; i++) {
            cols.push(<Col key={`empty-${i}`} className={`${mini ? 'dates-mini' : 'dates'}`}>{null}</Col>);
        }

        for (let i = datesObj.prev.SDoW; i < 7; i++) {
            cols.push(<Col key={`date-${date}`} className={`${mini ? 'dates-mini' : 'dates'} ${i === 6 ? 'text-blue-600' : ''} ${i === 0 ? 'text-red-500' : ''}`}>{date++}</Col>);
        }

        prevDate = date;

        return cols;
    }

    const renderPrevRemain = (): JSX.Element[] => {
        let date = prevDate;
        
        const rows: JSX.Element[] = [];
        let cols: JSX.Element[] = [];
        let i = 0;

        while (date <= datesObj.prev.DiM) {
            if (i === 7) {
                i = 0;
                let tmp = <Row key={`row-${date}`}>{cols}</Row>;
                rows.push(tmp);
                cols = [];
            }
            cols.push(<Col key={`date-${date}`} className={`${mini ? 'dates-mini' : 'dates'} ${i === 6 ? 'text-blue-600' : ''} ${i === 0 ? 'text-red-500' : ''}`}>{date++}</Col>);
            i++;
        }

        let len = cols.length;

        for (let i = len; i < 7; i++) {
            cols.push(<Col key={`empty-${date + i}`} className={`${mini ? 'dates-mini' : 'dates'} ${i === 6 ? 'text-blue-600' : ''} ${i === 0 ? 'text-red-500' : ''}`}>{null}</Col>);
        }
        rows.push(<Row key={`row-last`}>{cols}</Row>);

        return rows;
    }

    const renderNextFirstWeek = (): JSX.Element[] => {
        const cols: JSX.Element[] = [];
        let date = 1;

        for (let i = 0; i < datesObj.next.SDoW; i++) {
            cols.push(<Col key={`empty-${i}`} className={`${mini ? 'dates-mini' : 'dates'} ${i === 6 ? 'text-blue-600' : ''} ${i === 0 ? 'text-red-500' : ''}`}>{null}</Col>);
        }

        for (let i = datesObj.next.SDoW; i < 7; i++) {
            cols.push(<Col key={`date-${date}`} className={`${mini ? 'dates-mini' : 'dates'} ${i === 6 ? 'text-blue-600' : ''} ${i === 0 ? 'text-red-500' : ''}`}>{date++}</Col>);
        }

        nextDate = date;
        return cols;
    }

    const renderNextRemain = (): JSX.Element[] => {
        let date = nextDate;

        const rows: JSX.Element[] = [];
        let cols: JSX.Element[] = [];
        let i = 0;

        while (date <= datesObj.next.DiM) {
            if (i === 7) {
                i = 0;
                let tmp = <Row key={`row-${date}`}>{cols}</Row>;
                rows.push(tmp);
                cols = [];
            }
            cols.push(<Col key={`date-${date}`} className={`${mini ? 'dates-mini' : 'dates'} ${i === 6 ? 'text-blue-600' : ''} ${i === 0 ? 'text-red-500' : ''}`}>{date++}</Col>);
            i++;
        }

        let len = cols.length;

        for (let i = len; i < 7; i++) {
            cols.push(<Col key={`empty-${date + i}`} className={`${mini ? 'dates-mini' : 'dates'} ${i === 6 ? 'text-blue-600' : ''} ${i === 0 ? 'text-red-500' : ''}`}>{null}</Col>);
        }
        rows.push(<Row key={`row-last`}>{cols}</Row>);
        return rows;
    }

    return (
        <div>
            <Stack gap={2}>
                <Row>
                    <Col className={`${mini ? 'mini-top' : 'dates-top'} text-red-500`}>{mini ? 'Su' : 'Sun'}</Col>
                    <Col className={`${mini ? 'mini-top' : 'dates-top'}`}>{mini ? 'Mo' : 'Mon'}</Col>
                    <Col className={`${mini ? 'mini-top' : 'dates-top'}`}>{mini ? 'Tu' : 'Tue'}</Col>
                    <Col className={`${mini ? 'mini-top' : 'dates-top'}`}>{mini ? 'We' : 'Wed'}</Col>
                    <Col className={`${mini ? 'mini-top' : 'dates-top'}`}>{mini ? 'Th' : 'Thu'}</Col>
                    <Col className={`${mini ? 'mini-top' : 'dates-top'}`}>{mini ? 'Fr' : 'Fri'}</Col>
                    <Col className={`${mini ? 'mini-top' : 'dates-top'} text-blue-600`}>{mini ? 'Sa' : 'Sat'}</Col>
                </Row>
                <Row>
                    {
                        ch === 0 ? renderPrevFirstWeek() :
                        ch === 1 ? renderFirstWeek() :
                        ch === 2 ? renderNextFirstWeek() : null
                    }
                </Row>
                {
                    ch === 0 ? renderPrevRemain() :
                    ch === 1 ? renderRemain() :
                    ch === 2 ? renderNextRemain() : null
                }
            </Stack>
        </div>
    )
}

export default Dates;