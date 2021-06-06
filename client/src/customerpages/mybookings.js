import React from 'react';
import axios from 'axios';
import {Button, Form, FormGroup, Table} from 'react-bootstrap';

class Booking extends React.Component{
    constructor(props){
        super(props);
        this.state= {
            phoneNumber:props.phoneNumber,
            responseBody:[],
            showTable: false
                
        }
        this.AllBookings=this.AllBookings.bind(this);
        this.AllDetails=this.AllDetails.bind(this);
    }

    AllBookings(e){
        if(e.target.id == 'phoneNumber'){
            this.setState((state)=>({
                ...this.state,
                phoneNumber: e.target.value
            }));
        }
    }

    AllDetails(){
        let options ={
            url:"/customer/allbookings/",
            method:"GET",
            params: {
                phoneNumber:this.state.phoneNumber
            }
        };
            axios(options).then((allbookings)=>{
                //console.log('hii');
                //console.log(allbookings.data);
                this.setState((state) => ({
                  ...this.state,
                  responseBody:allbookings.data,
                  showTable: true
                }));
            }).catch((err) => {
                console.log(err);
            });
    }

    render(){
        const showTable = this.state.showTable;
        return(
           // const showTable = this.state.showTable
            <div>
            <Form>
                <FormGroup>
                    <Form.Label>PHONENUMBER</Form.Label>
                    <Form.Control type="text" id="phoneNumber" placeholder="Enter your phone number" 
                                  value={this.state.phoneNumber} onChange={this.AllBookings}></Form.Control>
                </FormGroup>
            </Form>
                <Button  onClick={this.AllDetails}>My Details</Button>
                {
                    showTable ?
                    <Table striped bordered hover>
                    <thead>
                        <td>NAME</td>
                        <td>BookingID</td>
                        <td>BikeModel</td>
                        <td>BikeNumber</td>
                        <td>ServiceType</td>
                        <td>Status</td>
                        <td>Date</td>
                    </thead>
                    <tbody>
                        {this.state.responseBody.map(function(x,index){
                            return (
                                <tr>
                                    <td>{x.name}</td>
                                    <td>{x.bookingID}</td>
                                    <td>{x.BikeModel}</td>
                                    <td>{x.BikeNumber}</td>
                                    <td>{x.ServiceType}</td>
                                    <td>{x.status}</td>
                                    <td>{x.Date}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
                : <div></div>    
                }
            </div>

        )
    }
}

export default Booking;