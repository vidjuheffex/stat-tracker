var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var dataSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
        
    },
    user: {
        type: Schema.Types.ObjectId,
        required: true
    }
});

module.exports = mongoose.model("Data", dataSchema);
