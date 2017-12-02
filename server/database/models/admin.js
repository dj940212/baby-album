import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const SALT_WORK_FACTOR = 10

const Schema = mongoose.Schema

const AdminSchema = new Schema({
	username: String,
	password: String,
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

AdminSchema.pre('save', function(next) {
  	if (this.isNew) {
    	this.meta.createAt = this.meta.updateAt = Date.now()
  	}else {
    	this.meta.updateAt = Date.now()
  	}

  	next()
})

AdminSchema.pre('save', function (next) {
	let user = this

	if (!user.isModified('password')) return next()

	bcrypt.genSalt(SALT_WORK_FACTOR, (error, salt) => {
		if (error) return next(error)
		bcrypt.hash(user.password, salt, (error, hash) => {
			if (error) return next(error)
			
			user.password = hash
			next()	
		})
	})
})

AdminSchema.methods = {
	comparePassword: function (_password, password) {
		return new Promise((resolve, reject) => {
			bcrypt.compare(_password, password, function (err, isMatch) {
				if (!err) resolve(isMatch)
				else reject(err)
			})
		})
	},
  	getToken: function() {
	  	const token = jwt.sign({name: this.username}, 'baby-album-wxapp',{
            expiresIn: 7200
        })

        return token
  	}
}

export default mongoose.model('Admin', AdminSchema)