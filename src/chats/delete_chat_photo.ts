import { Api } from 'telegram'
import DeleteChannel from './delete_channel'

export interface DeleteChatPhotoParams {
	chatId: Api.TypeEntityLike
}

export default class DeleteChatPhoto extends DeleteChannel {
	async deleteChatPhoto({ chatId }: DeleteChatPhotoParams) {
		const chatEntity = await this.client.getEntity(chatId)
		if (chatEntity instanceof Api.Chat) {
			await this.client.invoke(
				new Api.messages.EditChatPhoto({
					chatId: chatEntity.id,
					photo: new Api.InputChatPhotoEmpty()
				})
			)
		} else if (chatEntity instanceof Api.Channel) {
			await this.client.invoke(
				new Api.channels.EditPhoto({
					channel: chatEntity,
					photo: new Api.InputChatPhotoEmpty()
				})
			)
		} else {
			throw new Error('Provided entity belongs to user')
		}
		return true
	}
}
