const mongoose = require('mongoose'); // this is going to allow us to create a model which we can use to interact with the database in a really easy way

const subscriberSchema = new mongoose.Schema({  // this model here is a javascript object and this object will have keys for all the different properties of subscriber

    name:{
        type:String,
        required:true
    },

    subscribedToChannel:{
        type:String,
        required:true
    },

    subscribeDate:{
        type:Date,
        required:true,
        default:Date.now

    }

})


module.exports = mongoose.model('Subscriber',subscriberSchema) // this model function will take 2 properties(parameters) here, first the name of our model in database and next is the schema that corresponds to that model which in our case is "subscriberSchema". AND THE REASON WHY WE NEED THIS model FUNCTION IS BCZ WHEN WE EXPORT THIS AND IMPORT IT IN A DIFFERENT FILE, THIS "model" ALLOWS US TO INTERACT DIRECTLY WITH THE DATABASE USING THIS SCHEMA THAT WE HAVE DEFINED ABOVE

