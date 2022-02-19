import { Api } from 'telegram'
import { EntityLike } from 'telegram/define'
import lodash from 'lodash'
import DeleteUserHistory from './delete_user_history'

export interface GetChatMemberParams {
	chatId: EntityLike
	userId: EntityLike
}

export default class GetChatMember extends DeleteUserHistory {
	async getChatMember({ chatId, userId }: GetChatMemberParams) {
		const chat = await this.client.getEntity(chatId)
		const user = await this.client.getEntity(userId)

		if (chat instanceof Api.Channel) {
			return (
				await this.client.invoke(
					new Api.channels.GetParticipant({ channel: chat, participant: user })
				)
			).participant
		} else if (chat instanceof Api.Chat) {
			const fullChat = await this.client.invoke(
				new Api.messages.GetFullChat({ chatId: chat.id })
			)

			const members = fullChat.users

			return lodash.find(members, { id: user.id })
		}
	}
}
