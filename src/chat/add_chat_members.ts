import { Api } from 'telegram'
import ClientHolder from '../client_holder'

export interface AddChatMembersParams {
	chatId: number
	userId: number | number[]
	forwardLimit?: number
}

export default class AddChatMembers extends ClientHolder {
	async addChatMembers({
		chatId,
		userId,
		forwardLimit = 100
	}: AddChatMembersParams) {
		const chatEntity = await this.client.getEntity(chatId)

		if (!Array.isArray(userId)) {
			userId = [userId]
		}

		if (chatEntity instanceof Api.Chat) {
			for (const user of userId) {
				await this.client.invoke(
					new Api.messages.AddChatUser({
						chatId: chatEntity.id,
						userId: await this.client.getEntity(user),
						fwdLimit: forwardLimit
					})
				)
			}
		} else {
			await this.client.invoke(
				new Api.channels.InviteToChannel({
					channel: chatEntity,
					users: await Promise.all(
						userId.map(async user => await this.client.getEntity(user))
					)
				})
			)
		}

		return true
	}
}
