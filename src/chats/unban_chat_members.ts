import { Api } from 'telegram'
import GetChatMember from './get_chat_member'

export interface UnbanChatMemberParmas {
	chatId: Api.TypeEntityLike
	userId: Api.TypeEntityLike
}

export default class UnbanChatMember extends GetChatMember {
	async unbanChatMember({ chatId, userId }: UnbanChatMemberParmas) {
		const chat = await this.client.getEntity(chatId)
		const user = await this.client.getEntity(userId)

		if (chat instanceof Api.Channel) {
			await this.client.invoke(
				new Api.channels.EditBanned({
					channel: chat,
					participant: user,
					bannedRights: new Api.ChatBannedRights({ untilDate: 0 })
				})
			)
		}

		return true
	}
}
