import axios from 'axios'
import UserMod from 'models/user'
import BabyMod from 'models/baby'
import config from 'config'

class Baby{
	construtor() {}
	
	async create(ctx) {
		const {openid, birthday, name} = ctx.request.body
		
		
		const user = await UserMod.findOne({openid: openid})
		if (!user) {
			ctx.body = {
				success: false,
				message: "你没有注册"
			}
			return
		}
		if (user.baby) {
			ctx.body = {
				success: false,
				message: "宝宝已创建过"
			}
			return
		}
		
		const baby = await new BabyMod({birthday, name}).save()

		user.baby = baby
		user.save()

		ctx.body = {
			success: true,
			data: baby
		}

	}
}

export default new Baby()