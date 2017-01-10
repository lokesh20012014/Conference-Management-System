/**
 * Created by Lokesh on 5/29/2016.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ObjectId = mongoose.Schema.Types.ObjectId;

var userSchema = new Schema(
  {
    email: String,
    username: String,
    password: String,
    token: String,
    title: String,
    first_name: String,
    last_name: String,
    timestamp: Date,
    roles: {
      author: Boolean,
      reviewer: Boolean,
      chair:Boolean
    },
    address: {
      street: String,
      city: String,
      postal_code: Number,
      State: String,
      Country: String
    },
    institution: {
      name: String,
      city: String,
      State: String,
      Country: String
    },
    submissions : [{id:String}],
    assigned_submissions: [String]
  }
);

module.exports = mongoose.model('user',userSchema,'users')