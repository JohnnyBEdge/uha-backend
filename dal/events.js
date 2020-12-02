const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

const url = process.env.ATLAS_URI;
const dbName = "uha";
const collectionName = "events";

// Database settings
const settings = { useUnifiedTopology: true };

const getEvents = () => {
    const promise = new Promise((resolve, reject) => {
        MongoClient.connect(url, settings, async function(err, client){
            if(err){
                reject(err);
            } else {
                console.log("Successfully connect to DB for GET");
                const db = client.db(dbName);
                const collection = db.collection(collectionName);
                await collection.find({}).toArray(function(err, docs){
                    if(err){
                        reject(err);
                    } else {
                        console.log(docs);
                        resolve(docs);
                        client.close();
                    };
                })
            };
        })
    })
    return promise;
};
const deleteEvent = (id) => {
    const promise = new Promise((resolve, reject) => {
        MongoClient.connect(url, settings, async function(err, client){
            if(err){
                reject(err)
            } else {
                console.log("Successfully connect to DB for DELETE");
                const db = client.db(dbName);
                const collection = db.collection(collectionName);
                await collection.deleteOne({_id: ObjectID(id)}, function(err, result){
                    if(err){
                        reject(err);
                    } else {
                        resolve(result);
                        client.close()
                    }
                })
            }
        })
    })
    return promise;
}

const addEvent = (event) => {
    const promise = new Promise((resolve, reject) => {
        MongoClient.connect(url, settings, async function(err, client){
            if(err){
                reject(err);
            } else {
                console.log("Successfully connect to DB for POST");
                const db = client.db(dbName);
                const collection = db.collection(collectionName);
                collection.insertOne(event, (err, result)=> {
                    if(err){
                        console.log(err)
                    } else {
                        resolve(result.ops[0]);
                        client.close();
                    }
                })
            }
        })
    })
    return promise;
}

const editEvent = (id, event) => {
    const promise = new Promise((resolve, reject) =>{
        MongoClient.connect(url, settings, function(err, client){
            if(err){
                reject(err);
            } else {
                console.log("Successfully connect to DB for PATCH");
                const db = client.db(dbName);
                const collection = db.collection(collectionName);
                //first arg = query to find, second is data to update
                collection.updateOne(
                    {_id: ObjectID(id)}, 
                    {$set: {...event}},
                    (err,result) => {
                        if(err){
                            reject(err);
                        } else {
                            resolve(result);
                            client.close()
                        }
                    })
            }
        })
    })
    return promise;
}

module.exports = {
    getEvents, deleteEvent, addEvent, editEvent
}