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
    return bucketSchema;
}
function createModel() {
    var Bucket = mongoose.model('Bucket', createSchema());
    return Bucket;
}


module.exports = createModel()