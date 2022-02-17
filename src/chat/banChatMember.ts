import { TelegramClient, Api } from 'telegram'
import { EntityLike } from 'telegram/define'

export interface BanChatMember {
	chatId: EntityLike
	userId: EntityLike
	untilDate?: number
}

export async function banChatMember(
	client: TelegramClient,
	{ chatId, userId, untilDate = 0 }: BanChatMember
) {
	const userEntity = await client.getEntity(userId)
	const chatEntity = await client.getEntity(chatId)

	if (
		(chatEntity instanceof Api.Chat || chatEntity instanceof Api.Channel) &&
		userEntity instanceof Api.User
	) {
		if (chatEntity instanceof Api.Channel) {
			await client.invoke(
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
			await client.invoke(
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
