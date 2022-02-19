import { Api } from 'telegram'
import bigInt from 'big-integer'
import ArchiveChats from './archive_chats'

export interface BanChatMemberParams {
	chatId: Api.TypeEntityLike
	userId: Api.TypeEntityLike
	untilDate?: number
}

export default class BanChatMember extends ArchiveChats {
	async banChatMember({ chatId, userId, untilDate = 0 }: BanChatMemberParams) {
		const userEntity = await this.client.getEntity(userId)
		const chatEntity = await this.client.getEntity(chatId)
		if (chatEntity instanceof Api.Channel) {
			await this.client.invoke(
				new Api.channels.EditBanned({
					channel: chatEntity,
					participant: userEntity,
					bannedRights: new Api.ChatBannedRights({
						untilDate,
						viewMessages: true,
						sendMessages: true,
						sendMedia: true,
						sendStickers: true,
						sendGifs: true,
						sendGames: true,
						sendInline: true,
						embedLinks: true
					})
				})
			)
		} else {
			await this.client.invoke(
				new Api.messages.DeleteChatUser({
					chatId: bigInt(<number>chatId),
					userId: userEntity
				})
			)
		}
		return true
	}
}
