import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router , Link ,Route,Switch } from 'react-router-dom';
import {Button, Form, FormGroup} from 'react-bootstrap';


class UserStatus extends React.Component{
    constructor(props){
      super(props);
      this.state = {
        phoneNumber:props.phoneNumber,
        bookingID:props.bookingID,
        responseData:'',
        showResults: false
      };
      this.submitFrom = this.submitFrom.bind(this);
      this.onStatus =this.onStatus.bind(this);
    }
    onStatus(e){
      if(e.target.id == 'phoneNumber'){
        this.setState((state) => ({
         'phoneNumber':e.target.value
        }));
      }

      if(e.target.id == 'bookingID'){
        this.setState((state)=>({
          'bookingID':e.target.value
        }));
      }
    }
  
    submitFrom(){
         let inputs = {
           phoneNumber:this.state.phoneNumber,
           bookingID:this.state.bookingID
           };
      let optional = {
        url: '/customer/statusBybookingID',
        method:'GET',
        params : inputs
      };
         axios(optional).then((res) => {
           //console.log(res.data);
           this.setState(state =>({
             responseData: res.data,
             showResults: true
           }));
          }).catch(function(err){
            console.log(err);
          });
         //console.log("hello");
    }
    
    render(){
      var showResults = this.state.showResults;
      return (
        <div>
        <Form>
          <FormGroup>
            <Form.Label>PHONENUMBER</Form.Label>
            <Form.Control type="text" id="phoneNumber" value={this.state.phoneNumber} onChange={this.onStatus}></Form.Control>
          </FormGroup>
          <FormGroup>
            <Form.Label>BOOKINGID</Form.Label>
            <Form.Control  id="bookingID" value={this.state.bookingID} onChange={this.onStatus}></Form.Control>
          </FormGroup>
          
        </Form>
        <Button onClick={this.submitFrom}>MyStatus</Button> <br />
        {
         showResults ? <div>
         NAME :  {this.state.responseData.name} <br />
         BikeModel : {this.state.responseData.BikeModel}  <br />
         BikeNumber : {this.state.responseData.BikeNumber}  <br />
         bookingID :{this.state.responseData.bookingID}  <br />
         Servicetype :{this.state.responseData.ServiceType}<br />
         STATUS : {this.state.responseData.status}  <br/>
         </div> : <div>
         </div>
        }
       </div> 
      )
    }
}

export default UserStatus;