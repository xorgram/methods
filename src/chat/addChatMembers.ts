import { Api, TelegramClient } from 'telegram'

export interface AddChatMembers {
	chatId: number
	userId: number | number[]
	forwardLimit?: number
}

export const addChatMembers = async (
	{ chatId, userId, forwardLimit = 100 }: AddChatMembers,
	client: TelegramClient
) => {
	const chatEntity = await client.getEntity(chatId)

	if (!Array.isArray(userId)) {
		userId = [userId]
	}

	if (chatEntity instanceof Api.Chat) {
		for (const user of userId) {
			await client.invoke(
				new Api.messages.AddChatUser({
					chatId: chatEntity.id,
					userId: await client.getEntity(user),
					fwdLimit: forwardLimit
				})
			)
		}
	} else {
		await client.invoke(
			new Api.channels.InviteToChannel({
				channel: chatEntity,
				users: await Promise.all(
					userId.map(async user => await client.getEntity(user))
				)
			})
		)
	}

	return true
}
