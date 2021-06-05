const  MongoClient = require("mongodb");
//var url ="mongodb://localhost:27017/";
var url = "mongodb+srv://balakumar12:balakumar12@cluster1.tpblc.mongodb.net/bikedata?retryWrites=true&w=majority";
var sendEmail = require('./../utils/mail');

/*function initializeMongoConnection(url) {
    MongoClient.connect(url, function(err, connection) {
        if(err) {
            console.log(err);
            reject(err);
        } else {
            var Mongodb = connection.db('bikedata');
            var collection = Mongodb.collection('bikebooking');
            return collection;
        }
    })
}*/

module.exports = {

    /**
     * @description {*} The owner change the bike service status and status is readyfor delivery send the mail into customer
     * @param {*} currentStatus 
     * @param {*} updateStatus 
     * @returns {*} Changeing bike service status
     */

    updateCustomerStatus(currentStatus,updateStatus){
        return new Promise (function(resolve,reject) {
            //let mongoConnection = initializeMongoConnection;
            
            
            MongoClient.connect(url,function(err,connection){
                if(err) {
                    console.log(err);
                    reject(err);
                }
                //var Mongodb = connection.db('bikedata');
                //var collection = Mongodb.collection('bikebooking');
                var Mongodb = connection.db('bikedata');
                var collection = Mongodb.collection('bikebooking');

                collection.findOne({phoneNumber:currentStatus.phoneNumber}).then(function(resultDoc){
                    if(resultDoc){
                       // console.log(resultDoc);
                        const updateBookings= resultDoc.bookings;
                        updateBookings.forEach(function(x,index){
                            let key= "bookings."+index+".status";
                            let obj= {};
                            obj[key]= currentStatus.status;
                            updateStatus = {
                                $set: obj
                            }
                            if(x.bookingID == currentStatus.bookingID){
                                collection.updateOne({phoneNumber:currentStatus.phoneNumber},updateStatus).
                            then(function(changeStatus){
                                if(changeStatus.modifiedCount==1){
                                    //console.log(currentStatus.status);
                                    if(currentStatus.status == 'readyfordelivery'){
                                         sendEmail(resultDoc.email, `your BookingID ${currentStatus.bookingID} is Readyfordelivery` , 'Come and take your bike');
                                    }

                                resolve('successfully update the data'+currentStatus.bookingID);
                                }
                            }).catch(function(err){
                                reject(err);
                            });
                        }
                    });
                }
            }).catch(function(err){
                reject(err);
            });
        })
    });
   },

   /**
    * @description {*} The owner view the particular customer bookings by phonenumber
    * @param {*} ByPhNo 
    * @returns {*} customer booking details
    */

   bookDetailsView(ByPhNo){
       return new Promise (function(resolve,reject){
           MongoClient.connect(url,function(err,conncetion){
               if(err) {
                   reject(err);
               }
               var Mongodb =conncetion.db('bikedata');
               var collection = Mongodb.collection('bikebooking');
               collection.findOne({phoneNumber:ByPhNo}).then(function(details){
                   resolve(details);
               }).catch(function(err){
                   reject(err);
               });
           });
       });
   },

   /**
    * @description {*} The owner provide a new service he can add the new service
    * @param {*} newservicename 
    * @returns {*} Create new service 
    */

   createTypeOfservices(newservicename){
       console.log(newservicename);
    return new Promise(function(resolve,reject){
        MongoClient.connect(url,function(err,connection){
            if(err){
                console.log(err);
                reject(err);
            }
            var Mongodb = connection.db('bikedata');
            var collection = Mongodb.collection('bikebooking');
           // let key = services.typeofservice;
           let updateOperation = {
               $push: {"services": newservicename}
           };
           collection.updateOne({name:"offeringservices"}, updateOperation).then(function(updateResult){
                 // console.log(updateResult);
                  if(updateResult.modifiedCount > 0) {
                   resolve("Added the new service to the catalog");
                 } else {
                   reject("Unable to add the service to the catalog");
                 }
              
                }).catch(function(err){
               console.log(err);
                });
             });
        });
    },

    /**
     * @description {*} The owner delete the old services 
     * @param {*} deletingOperation 
     * @returns {*} Delete the serive type
     */

    deleteAservice(deletingOperation){
        return new Promise (function(resolve,reject){
            MongoClient.connect(url,function(err,connection){
                if(err){
                    reject(err);
                }
                var Mongodb = connection.db('bikedata');
                var collection = Mongodb.collection('bikebooking');
                let remove = {
                    $pull : {services:{$in:[deletingOperation]}}
                };
                collection.updateOne({name:"offeringservices"},remove).then(function(removeElement){
                    //console.log(removeElement);
                    resolve('Remove the service to the catalog',removeElement);
                }).catch(function(err){
                    reject('unable to remove the service to the catalog');
                });
            });
        });
    },

    /**
     * @description Owner replace the old service type to new service type
     * @param {*} oldServiceName 
     * @param {*} newServiceName 
     * @returns {*} Replace service type
     */

    editAservice(oldServiceName, newServiceName){
        return new Promise(function(resolve,reject){
            MongoClient.connect(url,function(err,connection){
                if(err){
                    console.log(err);
                }
                var Mongodb = connection.db('bikedata');
                var collection = Mongodb.collection('bikebooking');
                
                let editOptions = {
                    '$set': {'services.$[eq:waterwash]': newServiceName}
                };
                collection.updateOne({'name':'offeringservices'}, editOptions).then(function(updatedResult){
                    console.log(updatedResult);
                }).catch(function(err){
                    console.log(err);
                });
            });
        });
    },

    listAllStatus(fillter,projection){
        return new Promise(function(resolve,reject){
            MongoClient.connect(url,function(err,connection){
                if(err){
                    reject(err);

                }
                var Mongodb = connection.db('bikedata');
                var collection = Mongodb.collection('bikebooking');
                
                let view = collection.find(fillter,{s});
                
                resolve(view.toArray());
            });
        });
    },

    listAllBookings(){
        return new Promise(function(resolve, reject){
            MongoClient.connect(url, function(err, connection) {
                if(err) {
                    reject(err);
                }
                var Mongodb = connection.db('bikedata');
                var collection = Mongodb.collection('bikebooking');

                /*collection.find({}).forEach(function(userDoc){
                    //console.log(userDoc.bookings);
                    userDoc.bookings.toArray().then(function(data){
                        resolve(data);
                    }).catch((err) => {
                        console.log(err);
                    })
                   // resolve(userDoc.bookings.toArray());
                });*/
               //esolve(view.toArray());
               collection.find({}, function(err, userDoc){
                   var userdocs = [];
                   userDoc.forEach(function(doc){
                    //console.log(doc);
                    userdocs.push(doc);
                });
                   setTimeout(function(){
                       resolve(userdocs);
                   }, 6000);
                  

                   /*userDoc.toArray(function(docs){
                       console.log(docs);
                   })*/
                   

               });
            });

        });
    }

}