import logo from './logo.svg';
import './App.css' ;
import { BrowserRouter as Router , Link , Switch, Route, useRouteMatch, NavLink} from 'react-router-dom';
import UserStatus from './customerpages/userstatus';
import LoginForm from './customerpages/register';
import React from 'react';
import StatusUpdate from './ownerpages/updatestatus';
import ListAll from './ownerpages/listall';
import Booking from './customerpages/mybookings';
import BookAService from './customerpages/bookaservice';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Row,Col,Container, Navbar,Nav, NavItem} from 'react-bootstrap';
import ModalHeader from 'react-bootstrap/esm/ModalHeader';

function App(){
  return(
    
    <Router>

       <div>
       
        <Navbar bg="dark" expand="lg" variant="dark" onToggle= "false">
        <Navbar.Brand variant="dark">Bike-Service Booking</Navbar.Brand>

        </Navbar>
      
      </div>
      <div>
         <Container fluid="md" >
        {/**
         <Nav className="flex-column" fill variant="tabs">
            
          </Nav>
         */}
          <Row>
               
              <Col xs={12} md={6}  >
              <NavItem className="menu-class">
                <Nav.Link href="/owner">OWNER</Nav.Link>
              </NavItem>
              </Col>

              <Col xs={12} md={6}>
              <NavItem className="menu-class">
                <Nav.Link href="/user">USER</Nav.Link>
              </NavItem>
              </Col>
            </Row>  
          
          <Switch>
            <Route path='/user' component={Customer}></Route>
            <Route path='/owner' component={owner}></Route>
           </Switch>
         </Container>
         </div>    
    </Router>
  )
}

function Customer(){
  let match = useRouteMatch;
  return(
    <Router>
      <div>
      <Container>
        <Row>
          <Col sm={12} md={12}>
          <Link to = {'/login'}>REGISTER</Link>
          </Col>
        </Row>
        <Row>
          <Col sm={12} md={12}>
          <Link to ={'/bookservice'}>BOOKASERVICE</Link>
          </Col>
        </Row>
        <Row>
          <Col sm={12} md={12}>
          <Link to = {'/allbooking'}>MY BOOKINGS</Link>
          </Col>
        </Row>
        <Row>
          <Col sm={12} md={12}>
          <Link to = {'/status'}>BOOKING STATUS</Link>
          </Col>
        </Row>
      </Container>
      </div>
      <Switch>
        <Route path={'/status'}><UserStatus /></Route>
        <Route path ={'/allbooking'}><Booking /></Route>
        <Route path ={'/bookservice'}><BookAService /></Route>
        <Route path ={'/login'}><LoginForm /></Route>
      </Switch>
    </Router>

  )
}

function owner(){
  let match = useRouteMatch;

  return(
    <Router>
      <div>
      
      <Container>
       <Row>
         <Col xs={12} md={12}>
         <Link to= {'/viewallbooking'}>VIEW ALL BOOKING</Link>
         </Col>
         </Row>
         <Row>
         <Col xs={12} md={12} >

         <Link to = {'/updatecustomerstatus'}>UPDATE THE STATUS</Link>
         </Col>
       </Row>
      <Switch>
         <Route path= {'/updatecustomerstatus'}><StatusUpdate /></Route>
        <Route path={'/viewallbooking'}><ListAll /></Route>
      </Switch>
      </Container>
      </div>
    
    </Router>
  )
}
  

export default App;
