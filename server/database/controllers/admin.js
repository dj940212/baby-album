import mongoose from 'mongoose'
import AdminMod from 'models/admin'
import jwt from 'jsonwebtoken'

class Admin {
    constructor() {}

    async login(ctx) {
        const {username, password} = ctx.request.body
        const user = await AdminMod.findOne({ username: username })

        let match = false
        if (user) match = await user.comparePassword(password, user.password)
        if (match) {
            ctx.session.user = {
                username: user.username,
                _id: user._id
            }
            
            const token = user.getToken()
            user.token = token
            await user.save()

            return (ctx.body = {
                success: true,
                data: {
                    username: user.username,
                    token: token
                }
            })
        }

        return (ctx.body = {
            success: false,
            message: '密码错误'
        })
    }
}

export default new Admin()