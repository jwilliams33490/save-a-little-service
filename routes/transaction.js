var mongoose = require('mongoose');
var Bucket = require('../schema/bucket.js')

function init() {
    var express = require('express');
    var router = express.Router();

    router.post('/:bucket_id', function(req, res, next) {
            Bucket.findByIdAndUpdate(
            mongoose.Types.ObjectId(req.params.bucket_id),
            {$push: {"transactions": req.body}},
            {safe: true, upsert: false},
            function(err, bucket) {
               if (err) {
                    res.status(500).send(err);
                    return;
                }
              res.status(200).send();          
            }
        );
    });

    router.get('/:bucket_id', function(req, res, next) {
        console.log("hey i'm here!")
        Bucket.findById(
            mongoose.Types.ObjectId(req.params.bucket_id),
            function(err, bucket) {
               if (err) {
                    res.status(500).send(err);
                    return;
                }
              res.status(200).send(bucket.transactions);          
            }
        );
    });

    router.get('/:bucket_id/tid/:transaction_id', function(req, res, next) {
        console.log("hey i'm here!")
         Bucket.findOne(
            {'transactions._id': mongoose.Types.ObjectId(req.params.transaction_id)},
            function(err, bucket) {
               if (err) {
                    res.status(500).send(err);
                    return;
                }
                console.log(bucket);
                console.log(bucket.transactions);
                var transaction = bucket.transactions.id(req.params.transaction_id);
                console.log(transaction);
              res.status(200).send(transaction);          
            }
        );

    });

    router.put('/:bucket_id/tid/:transaction_id', function(req, res, next) {
        Bucket.update(
            {'transactions._id': mongoose.Types.ObjectId(req.params.transaction_id)},
            {'$set':  {'transactions.$': req.body}}, 
            function(err, bucket) {
               if (err) {
                    res.status(500).send(err);
                    return;
                }
              res.status(200).send();          
            })
    });

    router.delete('/:bucket_id/tid/:transaction_id', function(req, res, next) {
        Bucket.update( 
            {_id:  mongoose.Types.ObjectId(req.params.bucket_id)},
            { $pull: {transactions: {_id:  mongoose.Types.ObjectId(req.params.transaction_id)} } },
            { multi: true },
            function(err, bucket) {
               if (err) {
                    res.status(500).send(err);
                    return;
                }
              res.status(200).send();          
            })
    });

        return router;
}


module.exports = init();