import mongoose from 'mongoose'

const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const UserSchema = new Schema({
	openid: String,
    avatarUrl: String, 
    city: String, 
    country: String, 
    gender: String,
    language: String, 
    nickName: String,
    province: String,
  	baby: {
  		type: ObjectId,
  		ref: 'Baby'
  	},
  	oBaby: [{
  		type: ObjectId,
  		ref: 'Baby'
  	}],
  	relatives: [{
  		type: ObjectId,
  		ref: 'User'
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

UserSchema.pre('save', function(next) {
  	if (this.isNew) {
    	this.meta.createAt = this.meta.updateAt = Date.now()
  	}else {
    	this.meta.updateAt = Date.now()
  	}

  	next()
})

export default mongoose.model('User', UserSchema)