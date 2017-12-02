import mongoose from 'mongoose'

const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const BabySchema = new Schema({
	name: String,
	birthday: Date,
	photovideo: [{
		type: ObjectId,
		ref: 'Photovideo'
	}],
  	meta: {
	    createAt: {
	      	type: Date,
	      	dafault: Date.now()
	    },
	    updateAt: {
	      	type: Date,
	      	dafault: Date.now()
	    }
  	}

})

BabySchema.pre('save', function(next) {
  	if (this.isNew) {
    	this.meta.createAt = this.meta.updateAt = Date.now()
  	}else {
    	this.meta.updateAt = Date.now()
  	}

  	next()
})

export default mongoose.model('Baby', BabySchema)