import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes, useNavigate, Outlet } from 'react-router-dom';
import './App.css';
import Calender from './pages/Calender';
import { Navbar, Container } from 'react-bootstrap';
import { Temporal } from "@js-temporal/polyfill";
import { useEffect, useState } from 'react';

function App() {
  const date = Temporal.Now.plainDateISO();
    console.log(date);

    let curMonth = date.month;
    let curYear = date.year;

    let [month, setMonth] = useState(curMonth);

  useEffect(() => {
    if(month > 12) {
      setMonth(1);
    } 
  }, [month])

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
      <div className='flex-box'>
        <div className='center'>
          <Calender month={month}></Calender>
        </div>
        <div className='button-box'>
          <button className='buttons' onClick={() => {
            setMonth(month++);
          }}>증가</button>
          <button className='buttons' onClick={() => {
            setMonth(month--);
          }}>감소</button>
        </div>
      </div>
      {/* <Dates></Dates> */}
    </div>
  );
}

export default App;
