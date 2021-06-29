
# Bike-Service-Application

This application is for a Bike service stations used by Owners and Users.

We have two different personas for this application and they are 
1.  Owner
2.  User

#### Features available for Owner: 
Owners can use this application and can do the following. 

1. View all the bookings made via this application
2. Edit any of his booking status made via this application
3. Application will send an email to the user with the bookingID and updated status, as soon as the Owner has updated the status as 'Ready for Delivery' for any of his bookings
4. Owner can create multiple service types that he is offering for his users.


#### Features available for Users:
Users can use this application and can do the following. 

1. Users can register himself to avail the services offered by the BikeService Station
2. Users can book a specific service type from the dropdown list for his vehicle . 
3. Users will get an email with a bookingID , as soon as he makes a booking for a specific service type.
4. Users can see all of his previous bookings made via this application
5. Users can also see a status of a specific bookingID. 


#### How to run the application ?

Step : 1
Clone this application using git clone <url>

Step : 2 
Navigate to bike-service-application folder 

```cd bike-service-application```

Step : 3 
Please run the below command to install all the dependencies. 

```npm install```

Step : 4
Navigate to the frontend folder, and we need to install all the client dependencies. 

```cd frontend/bike-reactjs/```

Step:5
Please run the below command to install all the dependencies requried for client module.

```npm install```

Step: 6
Navigate back to the application root folder by this command.

```cd ../../```

Step:7
Start the server application using the below command.

```node app.js```

Step:8
Open another terminal/ command prompt and navigate to the frontend folder from the application root folder.

```cd frontend/bike-reactjs/```

Step:9
Run the client package using the below command. 

```npm start```


# Document schema : 

##### Schema for user Document 
{
  _id: '',
  name: '' <string>,
  email: '' <string>,
  phoneNumer: '' <string>,
  bookings: [{'name':''}, {'BikeModel': ''}, {'BikeNumber': ''}, {'ServiceType': ''}, {'status': ''}, {'bookingID': ''}] <arrayOfObjects>
}
  
##### Schema for service types Document:
{
  _id:'',
 name: 'offeringservices' <string>
 services: ['waterwash', 'generalservice', 'oilchange'] <array>
  
}


##### Backend API Routes Details 

| S.No   |      Requirement     |  Restend Point  |
|----------|:-------------:|------:|
|  1 | Create service  |/serviceowner/createservices?{}   |
|  2 | Edit Service Type | /serviceowner/editservices?{}  |
|  3 | Delete Service Type   |   /serviceowner/deleteservices?{}   |
|  4 | Mark a booking status as ready for delivery or completed  | /serviceowner/updatecustomerstatus?phoneNumber=*&bookingID=*  |
|  5   | View all bookings from a specific customer |    /serviceowner/viewbookingdetails?phoneNumber=* | 
|  6 |  Receive an email whenever a booking is made  |   /customer/bookaservice

#### User Endpoints :

| S.No   |      Requirement     |  Restend Point  |
|----------|:-------------:|------:|
|  1 | User Registration  | /customer/register/   |
|  2 | Book a service | /customer/bookaservice? |
|  3 | View all previous bookings    |   /customer/allbookings?phoneNumber=*  |
|  4 |Status of a booking ID  | /customer/statusByBookingID?phoneNumber=*&bookingID=* |
