import { Api } from 'telegram'
import { EntityLike } from 'telegram/define'
import ArchiveChats from './archive_chats'

export interface BanChatMemberParams {
	chatId: EntityLike
	userId: EntityLike
	untilDate?: number
}

export default class BanChatMember extends ArchiveChats {
	async banChatMember({ chatId, userId, untilDate = 0 }: BanChatMemberParams) {
		const userEntity = await this.client.getEntity(userId)
		const chatEntity = await this.client.getEntity(chatId)

		if (
			(chatEntity instanceof Api.Chat || chatEntity instanceof Api.Channel) &&
			userEntity instanceof Api.User
		) {
			if (chatEntity instanceof Api.Channel) {
				await this.client.invoke(
					new Api.channels.EditBanned({
						channel: chatEntity,
						participant: userEntity,
						bannedRights: new Api.ChatBannedRights({
							untilDate: untilDate,
							viewMessages: true,
							sendMessages: true,
							sendMedia: true,
							sendStickers: true,
							sendGifs: true,
							sendGames: true,
							sendInline: true,
							sendPolls: true,
							embedLinks: true
						})
					})
				)
			} else {
				await this.client.invoke(
					new Api.messages.DeleteChatUser({
						chatId: chatEntity.id,
						userId: userEntity
					})
				)
			}

			return true
		}

		return false
	}
}
