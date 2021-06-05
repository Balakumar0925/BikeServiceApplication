var MongoClient = require('mongodb');
var url = "mongodb+srv://balakumar12:balakumar12@cluster1.tpblc.mongodb.net/bikedata?retryWrites=true&w=majority";
var sendEmail = require('./../utils/mail');

module.exports={
    /**
     * @Description Register user in the backend , once we validate there is no existing user with the provided phoneNumber
     * @param {*} userdetail 
     * @returns {*} The User document in the  in the mongodabse
     */
    Register(userdetail){
        return new Promise (function(resolve,reject){
            MongoClient.connect(url,function(err,connection){
                if(err){
                    console.log(err);
                    reject(err);
                }
                var Mongodb = connection.db('bikedata');
                var collection = Mongodb.collection('bikebooking');
                collection.findOne({phoneNumber: userdetail.phoneNumber}).then(function(data){
                   // console.log(userdetail.phoneNumber);
                    if( data == null || data.phoneNumber != userdetail.phoneNumber) {
                        collection.insertOne(userdetail).then(function(user){
                            resolve("Your account has been successfully registered");
                        }).catch(function(err){
                            reject(`Error: Unable to create account at this moment: ${err}`);
                        });  
                    } 
                    else {
                        resolve('Apologies, we already have a user with that Phone number. Please use a different phone number while registering');   
                    }
                }).catch(function(err) {
                    console.log('nodoc', err);
                    reject(`Unable to register account at this moment`);
                });
                
            });
        });
    },
    
    /**
     * @description {*} The service is create by the user and we create the bookingID. That bookingID is send to the user mail
     * @param {*} user 
     * @param {*} servicebook 
     * @returns {*} The booking was completed, the bookingID is MAIL to the user
     */

    bookAservice(user,servicebook){
        return new Promise(function(resolve,reject){
            MongoClient.connect(url, async function(err,connection){
                if(err){
                    //console.log(err);
                    reject(err);
                }
                var Mongodb = connection.db('bikedata');
                var collection = Mongodb.collection('bikebooking');
                //console.log(servicebook);
                let existingMetaData = [];
                
                //console.log(user);
                await collection.find({'phoneNumber': user.phoneNumber}).forEach(function(doc, index){
                    //console.log('dman');
                    //console.log("docments",doc.bookings);
                    existingMetaData = doc.bookings;
    
                });
                user.bookingID = user.name + ":"+new Date().getTime();
                
                let combinedArr = [...existingMetaData, user];
                servicebook = {
                    "$set": {'bookings': combinedArr}
                };
                let options = {
                    returnOriginal: true
                };
                //console.log('phonenumber', user.phoneNumber);


                await collection.findOneAndUpdate({'phoneNumber': user.phoneNumber}, servicebook).then(function(updateResponse) {
                    //send Email after successful 
                   // console.log('updateSuccessful', updateResponse);
                    sendEmail(updateResponse.value.email, `Your BookingID is ${user.bookingID}`, "Thanks for booking with us. ");
                    resolve(user.bookingID);

                }).catch(function(err){
                    console.log(err);
                });
            });
        });
    },

    /**
     * @description {*} User the see the all previous booking details
     * @param {*} previous 
     * @returns {*} User previous booking details
     */


    serviceView(previous){
        return new Promise (function(resolve,reject){
            MongoClient.connect(url,function(err,connection){
                if(err){
                    console.log(err);
                    reject(err);
                }
                var Mongodb = connection.db('bikedata');
                var collection = Mongodb.collection('bikebooking');
                collection.findOne(previous).then(function(reads){
                   // console.log('reads',reads);
                    resolve(reads);
                }).catch(function(err){
                    reject(err);
                });
            });
        });
    },

    /**
     * @description {*} User check the his bike service status
     * @param {*} userPhoneNumber 
     * @param {*} bookingID 
     * @returns {*} The booking details and status
     */

    viewStatusByBookingID(userPhoneNumber, bookingID){
        return new Promise (function(resolve,reject){
            MongoClient.connect(url,function(err,connection){
                if(err){
                    console.log(err);
                    reject(err);
                }
                var Monogodb= connection.db('bikedata');
                var collection = Monogodb.collection('bikebooking');
                collection.findOne({phoneNumber:userPhoneNumber}).then(function(userDocument){
                    //console.log('hii',userDocument);
                    let bookings = userDocument.bookings;
                    //console.log(bookings);
                    bookings.forEach(function(x, index){
                        if(x.bookingID == bookingID) {
                            resolve(x);
                        }
                    });
                    
                }).catch(function(err){
                    reject(err);
                });
            });
        });
    }
}