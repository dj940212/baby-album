import axios from 'axios'
import UserMod from 'models/user'
import config from 'config'

class User{
	construtor() {}

	async login(ctx) {
		// 注册
		const {js_code, avatarUrl, city, country, gender, language, nickName, province } = ctx.request.body
		
		const res = await axios.get(config.wxapp.openidUrl,{
			params: {
				appid: config.wxapp.appid,
			    secret: config.wxapp.secret,
			    js_code: js_code,
			    grant_type: config.wxapp.grant_type
			}
		})
		
		if (!res.data.openid) {
			ctx.body = {
				success: false,
				message: "获取openid失败"
			}
			return
		}
		const openid = res.data.openid
		let user = await UserMod.findOne({openid: openid})

		if (user){
			ctx.body = {
				success: true,
				message: '用户已存在',
				openid: openid
			}
			return
		} 

		user = new UserMod({
			openid,
			avatarUrl, 
			city, 
			country, 
			gender,
			language, 
			nickName,
			province
		})

		user = await user.save()
		
		ctx.body = {
			success: true,
			message: '创建新用户',
			openid: openid
		}
	}
}

export default new User()

