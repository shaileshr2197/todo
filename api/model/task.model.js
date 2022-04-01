var mongoose = require('mongoose');

var schema = mongoose.Schema;

var task = new schema({
    name:String,
    due:String,
    status:String
});

var taskModel = mongoose.model('Tasks',task);

module.exports = taskModel;