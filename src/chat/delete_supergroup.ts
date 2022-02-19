import { Api } from 'telegram'
import DeleteChatPhoto from './delete_chat_photo'

export interface DeleteSupergroupParams {
	chatId: Api.TypeEntityLike
}

export default class DeleteSupergroup extends DeleteChatPhoto {
	async deleteSupergroup({ chatId }: DeleteSupergroupParams) {
		await this.client.invoke(
			new Api.channels.DeleteChannel({
				channel: await this.client.getEntity(chatId)
			})
		)
		return true
	}
}
