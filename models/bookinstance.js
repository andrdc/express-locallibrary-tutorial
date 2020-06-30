var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var BookInstanceSchema = new Schema({
	book: {type: Schema.Types.ObjectId, ref: 'Book', required: true},
	imprint: {type: String, required: true},
	status: {
		type: String,
		required: true,
		enum: ['Available', 'Maintenance', 'Loaned', 'Reserved'],
		default: 'Maintenance'
	},
	due_back: {type: Date, default: Date.now}
});

/* Virtual for book instance's url */
BookInstanceSchema.virtual('url').get(() => {
	return '/catalog/bookinstance/' + this._id;
});

/* Export Model */
module.exports = mongoose.model('BookInstance', BookInstanceSchema);