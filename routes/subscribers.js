const express = require('express');

// Routing refers to determining how an application responds to a client request to a particular endpoint, which is a URI (or path) and a specific HTTP request method (GET, POST, and so on). Each route can have one or more handler functions, which are executed when the route is matched.
const router = express.Router();

// importing the model(subscribers.js) from the models folder
const Subscriber = require('../models/subscribers');

// creating routes 

// for getting all subscribers
router.get('/all',async (req,res)=>{
    try{
        const subscribers = await Subscriber.find();
        res.status(200).json(subscribers);  // we are sending here as JSON as this is an JSON API
    } catch(err){
        res.status(500).json({message:err.message});
    }
})

// for getting one subscribers
router.get('/:id',async (req,res)=>{  // ":id" -- colon in front is saying that it is a parameter and it can be accessed by using "req.params.id" and this would give us access to whatever they pass in after the first slash
 
    try{
        const subscriber = await Subscriber.find(req.body.id);
        res.status(200).json(subscriber);
    } catch(err){
        res.status(404).json({message:err.message});
    }
})


// for creating subscriber
router.post('/',async (req,res)=>{
    const subscriber = new Subscriber({
        name:req.body.name,
        subscribedToChannel:req.body.subscribedToChannel
    })

    // now to save this subscriber, we will use the try catch with await function
    try{
        const newSubscriber = await subscriber.save();
        res.status(201).json(newSubscriber);
    } catch(err){
        res.status(400).json({message:err.message}); // error will be user does not passes the correct info
    }
})

// for updating subscriber information, we will use here patch instead of put bcz we want to update the field that is passed not everything
router.patch('/:id',async (req,res)=>{ // to recognise which subscriber we have to update we will have to pass id and we are making this function asynchrous bcz we are accessing database here 
    try{
        const subscriber = await Subscriber.findById(req.params.id); // params are the things that have been passed as route
        if(subscriber == null){
            return res.status(404).json({message:"subscriber not FOUND!!!"})
        }

        try{
            if(req.body.name != null){
                subscriber.name = req.body.name
            }
            if(req.body.subscribedToChannel != null){
                subscriber.subscribedToChannel = req.body.subscribedToChannel
            }

            try{
                const updatedSubscriber = await subscriber.save();
                res.json(updatedSubscriber);
            } catch(err){
                res.status(400).json({message:err.message}); // 400 bcz it will be error when user will give incorrect info
            }
        } catch(err){
            res.status(500).json({message:err.message});
        }
    } catch(err){
        res.status(500).json({message:err.message});
    }
})


// for deleting subscriber
router.delete('/:id',async (req,res)=>{ // to recognise which subscriber we have to delete we will have to pass id 
    try{
        const subscriber = await Subscriber.findById(req.params.id); // params are the things that have been passed as route
        if(subscriber == null){
            return res.status(404).json({message:"subscriber not FOUND!!!"})
        }

        try{
            await subscriber.remove();
            res.json({messsage:"subscriber deleted Successfully!!"});
        } catch(err){
            res.status(500).json({message:err.message});
        }
    } catch(err){
        res.status(500).json({message:err.message});
    }
})


module.exports = router;