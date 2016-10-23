"use strict";

const MongoClient = require("mongodb").MongoClient;
const MONGODB_URI = "mongodb://127.0.0.1:27017/tweeter";

console.log(`Connecting to MongoDB running at: ${MONGODB_URI}`);

const initialTweets = require("./tweets");

let db;

const Tweets = {
  saveTweet: (tweet, cb) => {
    db.collection("tweets").insert(tweet);
    return true; },

  getTweets: (cb) => {
    db.collection("tweets").find().toArray((err, results) => {
        cb(results.sort(function(a, b) {
          return a.created_at - b.created_at
        }))
      })
    }
}


module.exports = {

connect: (callback) => {
MongoClient.connect(MONGODB_URI, (err, _db) => {

      db = _db

      // return the dbMethods via callback
      callback(Tweets)

const disconnect = () => { db.close() }
process.on('SIGINT', disconnect) // on Ctrl-C
process.on('SIGTERM', disconnect) // when OS tells it to quit
  })
}
}

