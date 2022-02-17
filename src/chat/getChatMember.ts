import { TelegramClient, Api } from 'telegram'
import { EntityLike } from 'telegram/define'
import lodash from 'lodash'

export interface GetChatMember {
	chatId: EntityLike
	userId: EntityLike
}

export async function getChatMember(
	client: TelegramClient,
	{ chatId, userId }: GetChatMember
) {
	const chat = await client.getEntity(chatId)
	const user = await client.getEntity(userId)

	if (chat instanceof Api.Channel) {
		return (
			await client.invoke(
				new Api.channels.GetParticipant({ channel: chat, participant: user })
			)
		).participant
	} else if (chat instanceof Api.Chat) {
		const fullChat = await client.invoke(
			new Api.messages.GetFullChat({ chatId: chat.id })
		)

		const members = fullChat.users

		return lodash.find(members, { id: user.id })
	}
}
