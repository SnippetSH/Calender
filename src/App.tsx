import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes, useNavigate, Outlet } from 'react-router-dom';
import { Navbar, Container, Button, Offcanvas } from 'react-bootstrap';
import { Temporal } from "@js-temporal/polyfill";
import { useEffect, useState } from 'react';

import Calender from './pages/Calender';
import TeleportBody from './pages/TeleportBody';

import './css/App.css';
import DownArrow from './img/DownArrow.png';
import LeftArrow from './img/LeftArrow.png';
import RightArrow from './img/RightArrow.png';
import RightArrow2 from './img/RightArrow2.png';

function App() {
  const date = Temporal.Now.plainDateISO();
    console.log(date);

    let curMonth = date.month;
    let curYear = date.year;

    let [month, setMonth] = useState(curMonth);
    let name = 'ryu';

  useEffect(() => {
    if(month > 12) {
      setMonth(1);
    } 
  }, [month])

  const [show, setShow] = useState(false);

  const handleOffcanvas = () => setShow(!show);

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
                <TeleportBody/>
            </Offcanvas.Body>
        </Offcanvas>

        <div className='flex-box'>
          <div className='center'>
            <Calender></Calender>
          </div>
        </div>
      </div>

    </div>
  );
}

export default App;
