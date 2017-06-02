var mongoose = require('mongoose');
function createSchema() {
    var bucketSchema = mongoose.Schema({
        friendlyName: String,
        friendlyColor: String,
        filter: String,
        transactions: [{
            date: { type: Date, default: Date.now },
            amount: Number,
            transactionType: String,
            vendor: String,
            label: String
         }]
    });

    bucketSchema.virtual('totalAmount').get(function() {  
        let val = 0;
        this.transactions.map(t => val += t.amount);
        console.log(`value! ${val}`);
        return val;
    });

    bucketSchema.set('toObject', { virtuals: true }); 
    bucketSchema.set('toJSON', { virtuals: true }); 

    return bucketSchema;
}

function createModel() {
    var Bucket = mongoose.model('Bucket', createSchema());
    return Bucket;
}


module.exports = createModel()