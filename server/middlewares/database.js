import mongoose from 'mongoose'
import config from 'config'
import Admin from 'models/admin'

export default () => {
    mongoose.Promise = global.Promise
	mongoose.set('debug', true)
	mongoose.connect(config.db, { useMongoClient: true })
	mongoose.connection.on('disconnected', () => {
		mongoose.connect(config.db)
	})
	mongoose.connection.on('error', err => {
        console.log(err)
    })
    mongoose.connection.on('open', async ()=> {
        console.log('Connected to MongoDB Success')

        let admin = await Admin.findOne({username:config.admin.username})

        if (!admin) {
            await new Admin(config.admin).save()
            console.log("写入管理员数据")
        }
    })
}