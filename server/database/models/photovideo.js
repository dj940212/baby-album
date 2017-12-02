import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

var PhotovideoSchema = new Schema({
    type: {
      type:String,
      default: 'photo'
    },
    photovideoUrl: [String],
    thumbnailUrl: String,
    text: String,
    age: String,
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

PhotovideoSchema.pre('save', function(next) {
    if (this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now()
    }else {
        this.meta.updateAt = Date.now()
    }

    next()
})

export default mongoose.model('Photovideo', PhotovideoSchema)
