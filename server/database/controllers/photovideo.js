import mongoose from 'mongoose'
import PhotovideoMod from 'models/photovideo'

class Photovideo {
	construtor() {}
	
	async add(ctx) {
		let {photovideoUrl, thumbnailUrl, text, type} = ctx.request.body
		
		if (!photovideoUrl) return
			
		photovideoUrl = photovideoUrl.split(',')

		let photovideo = new Photovideo({
		    photovideoUrl: photovideoUrl,
		    thumbnailUrl: thumbnailUrl,
		    type: type,
		    text: text
	    })

		photovideo = await photovideo.save()

		ctx.body = {
			success: true,
			message: '保存成功',
			data: photovideo
		}
	}

	async delete(ctx) {
		const _id = ctx.request.body._id
		
		try {
			await Photovideo.remove({_id})
		}catch(e) {
			ctx.body = {
				success: false,
				message: e
			}
		}

		ctx.body = {
			success: true,
			message: "删除成功",
			data: _id
		}
	}

}

export default new Photovideo()