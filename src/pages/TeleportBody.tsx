import { Accordion, Container, Row, Col } from 'react-bootstrap';
import { Temporal } from "@js-temporal/polyfill";
import type { datesType } from './Calender';

import Dates from './Dates';
import dates from '../data_state/dates';
import '../css/TeleportBody.css';

import DownArrow from './img/DownArrow.png';
import RightArrow2 from './img/RightArrow2.png';



function TeleportBody() : JSX.Element{
    const date = Temporal.Now.plainDateISO();

    const renderDates = (id :number) :datesType[]=> {
        let D: datesType[] = [];
        for(let i = 1; i <= 12; i++) {
            D.push(dates(i, date.year + id))
        }
        return D;
    }

    return (
        <div className='teleport-body'>
            <Accordion>
                <Accordion.Item eventKey='0'>
                    <Accordion.Header>{date.year - 1}</Accordion.Header>
                    <Accordion.Body>
                        <Container>
                            <Row>
                                {renderDates(-1).map((content, idx) => (
                                    <MiniCal date={date} month={idx+1} year={date.year - 1} content={content} ></MiniCal>
                                ))}
                            </Row>
                        </Container>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey='1'>
                    <Accordion.Header>{date.year}</Accordion.Header>
                    <Accordion.Body>
                        <Container>
                            <Row>
                                {renderDates(0).map((content, idx) => (
                                    <MiniCal date={date} month={idx+1} year={date.year} content={content} ></MiniCal>
                                ))}
                            </Row>
                        </Container>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey='2'>
                    <Accordion.Header>{date.year + 1}</Accordion.Header>
                    <Accordion.Body>
                        <Container>
                            <Row>
                                {renderDates(1).map((content, idx) => (
                                    <MiniCal date={date} month={idx+1} year={date.year + 1} content={content} ></MiniCal>
                                ))}
                            </Row>
                        </Container>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </div>
    )
}

function MiniCal({date, month, year, content} : {date: Temporal.PlainDate, month: number, year: number, content: datesType}) {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return (
        <Col xs={4} className='mb-4 mini-calender'>
            <p className='mini-p'>{months[month-1]}</p>
            <Dates datesObj={content} curMonth={date.month} curYear={date.year} month={month} year={year} ch={1} mini={true} />
        </Col>
    )
}

export default TeleportBody;