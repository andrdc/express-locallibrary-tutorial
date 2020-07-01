var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var AuthorSchema = new Schema({
	first_name: {type: String, required: true, maxlength: 100},
	family_name: {type: String, required: true, maxlength: 100},
	date_of_birth: {type: Date},
	date_of_death: {type: Date}
});

/* Virtual for author's full name */
AuthorSchema.virtual('name').get(function(){
	/* To avoid erros where an author does not have either a family name or
	 * first name. We want to make sure we handle the exception by returning an
	 * empty string for that case. */
	let fullname = '';
	if(this.first_name && this.family_name){
		fullname = this.family_name + ', ' + this.first_name;
	}
	if(!this.first_name || !this.family_name){
		fullname = '';
	}

	return fullname;
});

/* Virtual for author's lifespan */
AuthorSchema.virtual('lifespan').get(() => {
	return (this.date_of_death.getYear() - this.date_of_birth.getYear()).toString();
});

/* Virtual for author's url */
AuthorSchema.virtual('url').get(() => {
	return '/catalog/author/' + this._id;
});

/* Export Model */
module.exports = mongoose.model('Author', AuthorSchema);
