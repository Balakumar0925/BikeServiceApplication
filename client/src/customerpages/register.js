import React from 'react';
import react from 'react';
import axios from 'axios';
import {Button, Form, FormGroup} from 'react-bootstrap';
 
class LoginForm extends React.Component{
    constructor(props){
        super(props);
        this.state={
            name:props.name,
            email:props.email,
            phoneNumber:props.phoneNumber,
            responseBody:''
        }
        this.Loginpage= this.Loginpage.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    /*handleTextChange(e){
        // console.log(e.target.value)
         this.setState(state =>({
           name: e.target.value
         }));
       }*/

       onChange(e){
           if(e.target.id =='name' ) {
              // console.log('we r coming here')
            this.setState({
                ...this.state, 
                'name': e.target.value
            });
           } 

           if(e.target.id == 'email') {
              // console.log('2nd state');
               this.setState({
                   ...this.state,
                   'email': e.target.value
               });
           }

           if(e.target.id == 'phoneNumber') {
               this.setState({
                   ...this.state,
                   'phoneNumber': e.target.value
               });
           }
           
       }



       async Loginpage(){ 
           let abody = {
               name : this.state.name,
               email: this.state.email,
               phoneNumber : this.state.phoneNumber
           }
           let options = {
               url: "/customer/register",
               data: abody,
               method: 'POST'
           }
           let dataRequest = await callBackend(options);
           //console.log(dataRequest);
           this.setState({
               ...this.state,
               'responseBody': dataRequest
           });     
       }

    render(){
        return (
            <div> 
                <div>
                <Form>
                <FormGroup>
                    <Form.Label>NAME</Form.Label>
                    <Form.Control  id="name" value={this.state.name} onChange={this.onChange}></Form.Control>
                </FormGroup>
                <FormGroup>
                    <Form.Label>EMAIL</Form.Label>
                    <Form.Control id="email" type= "email" value={this.state.email} onChange={this.onChange}></Form.Control>
                </FormGroup>
                <FormGroup>
                    <Form.Label>PHONENUMBER</Form.Label>
                    <Form.Control id="phoneNumber" type="phonenumber" value={this.state.phoneNumber} onChange={this.onChange}></Form.Control>
                </FormGroup>
                   
                </Form>
                </div>
                <Button  onClick={this.Loginpage}>REGISTER</Button> 
                   <h1>{this.state.responseBody}</h1>
            </div>
        )
    }

}

function callBackend(options) {

    return new Promise((resolve, reject)=>{

        axios(options).then((axiosResponse)=> {
            resolve(axiosResponse.data)
        }).catch((err) => {
            reject(err);
        })

    })

}

export default LoginForm;