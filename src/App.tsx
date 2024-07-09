import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes, useNavigate, Outlet } from 'react-router-dom';
import { Navbar, Container, Button, Offcanvas } from 'react-bootstrap';
import { Temporal } from "@js-temporal/polyfill";
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from './data_state/hooks';
import { selectRenderDate, setDate } from './data_state/datesInform';

import Calender from './pages/Calendar';
import TeleportBody from './pages/TeleportBody';

import './css/App.css';
import LeftArrow from './img/LeftArrow.png';
import RightArrow from './img/RightArrow.png';

function App() {
  const date = Temporal.Now.plainDateISO();

    let curMonth = date.month;
    let curYear = date.year;

    const renderDate = useAppSelector(selectRenderDate);
    const dispatch = useAppDispatch();

  const [show, setShow] = useState(false);
  const handleOffcanvas = () => setShow(!show);

  dispatch(setDate({month: curMonth, year: curYear}));

  let [clicked, setClicked] = useState({month: renderDate.month, year: renderDate.year});

  useEffect(() => {
    console.log(clicked);
    setTimeout(() => {
      dispatch(setDate({month: clicked.month, year: clicked.year}));
    }, 0);
  }, [clicked]);

  const renderNewCal = (month: number, year: number) : void => {
    handleOffcanvas();
    setTimeout(() => {
      setClicked({month: month, year: year});
      console.log(clicked);
    }, 0);
  }

  return (
    <div className="App">
      <Navbar className="NavBar">
        <Container>
          <Navbar.Brand href="#home">Calender</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              by: SH
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Button variant="primary" onClick={handleOffcanvas} className={`offcanvas-btn ${show ? 'shifted' : ''}`}>
        {show ? 
          <img src={LeftArrow} alt='>' width={'12px'}/> : 
          <img src={RightArrow} alt='>' width={'12px'}/>
        }
      </Button>
      <div className={`app-container ${show ? 'shifted' : ''}`}>

        <Offcanvas show={show} onHide={handleOffcanvas} placement="start" scroll={true} backdrop={false}>
            <Offcanvas.Header closeButton className='Sidebar-header'>
                <Offcanvas.Title className='Sidebar-title'>Teleport</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <TeleportBody renderNewDate={renderNewCal}/>
            </Offcanvas.Body>
        </Offcanvas>

        <div className='flex-box'>
          <div className='center'>
            <Calender curMonth={curMonth} curYear={curYear}></Calender>
          </div>
        </div>
      </div>

    </div>
  );
}

export default App;
