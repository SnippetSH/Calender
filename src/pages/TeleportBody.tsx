import { Accordion, Container, Row, Col } from 'react-bootstrap';
import { Temporal } from "@js-temporal/polyfill";
import type { datesType } from '../type/type.ts'
import { useAppDispatch, useAppSelector } from '../data_state/hooks';
import { selectRenderDate, setDate } from '../data_state/datesInform';

import Dates from './Dates';
import dates from '../data_state/dates';
import '../css/TeleportBody.css';

function TeleportBody({renderNewDate}: {renderNewDate: (month: number, year: number) => void}): JSX.Element {
    const date = Temporal.Now.plainDateISO();
    const dispatch = useAppDispatch();

    const renderDates = (id: number): datesType[] => {
        let D: datesType[] = [];
        for (let i = 1; i <= 12; i++) {
            D.push(dates(i, date.year + id))
        }
        return D;
    }

    const renderMiniCals = (yearOffset: number) => {
        const datesArray = renderDates(yearOffset);

        const ClickedMini = (month: number, year: number) => {
            console.log('hi');
            renderNewDate(month, year);
        }

        return datesArray.map((content, idx) => (
            <MiniCal key={idx} date={date} month={idx + 1} year={date.year + yearOffset} content={content} onClick={ClickedMini}></MiniCal>
        ));
    }

    return (
        <div className='teleport-body'>
            <Accordion>
                <Accordion.Item eventKey='0'>
                    <Accordion.Header>{date.year - 1}</Accordion.Header>
                    <Accordion.Body>
                        <Container>
                            {Array.from({ length: 6 }, (_, i) => (
                                <Row key={i} className='place-content-center'>
                                    {renderMiniCals(-1).slice(i * 2, i * 2 + 2)}
                                </Row>
                            ))}
                        </Container>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey='1'>
                    <Accordion.Header>{date.year}</Accordion.Header>
                    <Accordion.Body>
                        <Container>
                            {Array.from({ length: 6 }, (_, i) => (
                                <Row key={i} className='place-content-center'>
                                    {renderMiniCals(0).slice(i * 2, i * 2 + 2)}
                                </Row>
                            ))}
                        </Container>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey='2'>
                    <Accordion.Header>{date.year + 1}</Accordion.Header>
                    <Accordion.Body>
                        <Container>
                            {Array.from({ length: 6 }, (_, i) => (
                                <Row key={i} className='place-content-center'>
                                    {renderMiniCals(1).slice(i * 2, i * 2 + 2)}
                                </Row>
                            ))}
                        </Container>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </div>
    );
}

function MiniCal({ date, month, year, content, onClick }: { date: Temporal.PlainDate, month: number, year: number, content: datesType, onClick: (month: number, year: number) => void}) {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    
    const handleClick = () => {
        onClick(month, year);
    }
    
    return (
        <Col xs={6} className='mb-6 mini-calendar mx-1' onClick={handleClick}>
            <p className='mini-p'>{months[month - 1]}</p>
            <Dates datesObj={content} curMonth={date.month} curYear={date.year} month={month} year={year} ch={1} mini={true} />
        </Col>
    );
}

export default TeleportBody;
