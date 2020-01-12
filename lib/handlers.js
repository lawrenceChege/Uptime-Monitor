/**
 * Request handlers
 */

 //Dependecies
 const _data = require('./data');
 const helpers = require('./helpers');

 //Define the handlers
const handlers = {}

//user handler
handlers.users = (data, callback) => {
    const acceptableMethods = ['post','get','put','delete'];
    if(acceptableMethods.indexOf(data.method) > -1){
        handlers._users[data.method](data,callback);
    } else{
        callback(405);
    }

};

//container for the users submethods
handlers._users = {};

//users post 
//Required data: firstName, lastName, country, phone, password, keepLogged
handlers._users.post = (data, callback)=>{
    //check that all required field are provided
    let firstName = typeof(data.payload.firstName) == "string" && data.payload.firstName.trim().length > 0? data.payload.firstName.trim() : false; 
    let lastName = typeof(data.payload.lastName) == "string" && data.payload.lastName.trim().length > 0? data.payload.lastName.trim() : false;
    let country = typeof(data.payload.country) == "string" && data.payload.country.trim().length > 0? data.payload.country.trim() : false;
    let phone = typeof(data.payload.phone) == "string" && data.payload.phone.trim().length == 10? data.payload.phone.trim() : false;
    let keepLogged = typeof(data.payload.keepLogged) == "boolean" && data.payload.keepLogged == true ? true : false;
    let password = typeof(data.payload.password) == "string" && data.payload.password.trim().length > 0? data.payload.password.trim() : false;

    if (firstName && lastName && country && phone && password && keepLogged){
        // make sure that the user doesnt exist
        _data.read('users', phone,(err,data)=>{
            if(err){
                //hash the password
                const hashedPassword = helpers.hash(password);

            } else{
                //user already exists
                callback(400, {'Error' : 'A user with that number already exists'});
            }

        });


    } else{
        callback(400, {'Error': 'Missing required fields'});
    }
};
//users get 

handlers._users.get = (data, callback)=>{

};
//users put 

handlers._users.put = (data, callback)=>{

};
//users delete 

handlers._users.delete = (data, callback)=>{

};

//uptime router
handlers.ping = (data, callback) => {
    callback(200);

};

//Not found handler
handlers.notFound = (data, callback) => {
    callback(404);

};
//Export the handlers

export default handlers;