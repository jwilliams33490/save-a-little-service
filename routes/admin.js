//var express = require('express');
//var gameData = require('../svc/gameData.js')
//var router = express.Router();
var mongoose = require('mongoose');
var Bucket = require('../schema/bucket.js')

function init() {
    var express = require('express');
    var router = express.Router();
        
    router.post('/', function(req, res, next) {
         Bucket.find({friendlyName:req.body.friendlyName}).exec(function (err,results) {
            if (err) {
                res.status(500).send(err);
                return;
            }
            if (results && results.length>0){
                res.status(500).send("Bucket Already Exists")
                return;
            }
            var newBucket = new Bucket(req.body);
            newBucket.save(function (err) {
                if (err) {
                    res.status(500).send(err);
                    return;
                }
                res.status(200).send();
                // saved!
            });
         });
    })
        /* GET game state listing. */
    router.get('/', function(req, res, next) {
        Bucket.find().exec(function (err,results) {
            if (err) {
                res.status(500).send(err);
                return;
            }
            res.status(200).send(results);
            // saved!
        });
    });

    router.get('/name/:name', function(req, res, next) {
        Bucket.find({friendlyName:req.params.name}).exec(function (err,results) {
            if (err) {
                res.status(500).send(err);
                return;
            }
            if (results.length>1){
                res.status(500).send("Found Duplicate Buckets");
                return;
            }
            res.status(200).send(results[0]);
            // saved!
        });
    });

    /* DELETE bucket  */
   router.delete('/:bucket_id', function(req, res) {
        Bucket.remove({
            _id: mongoose.Types.ObjectId(req.params.bucket_id)
        }, function(err, bucket) {
            if (err){
                res.status(500).send(err);
                return; 
            }
            res.status(200).json({ message: 'Successfully deleted' });
        });
    });

    router.put('/:bucket_id', function(req, res) {

        // use our bucket model to find the bucket we want
        Bucket.findById(mongoose.Types.ObjectId(req.params.bucket_id), function(err, bucket) {
            if (err){
                res.status(500).send(err);
                return;
            }
            if (bucket){
                bucket.friendlyName = req.body.friendlyName;
                bucket.friendlyColor = req.body.friendlyColor;
                bucket.filter = req.body.filter;

                // save the bucket
                bucket.save(function(err) {
                    if (err){
                        res.status(500).send(err);
                        return;
                    }
                    res.status(200).json({ message: 'Bucket updated!' });
                });
            } else{
                res.status(404).send();
            }
        });
    });
    return router;
}


module.exports = init;
