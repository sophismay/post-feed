'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

let PostSchema = new Schema({
	text: String,
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	}
})

export default mongoose.model('Post', PostSchema)