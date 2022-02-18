import { TelegramClient, Api } from 'telegram'
import { EntityLike } from 'telegram/define'

export interface DeleteUserHistory {
	chatId: EntityLike
	userId: EntityLike
}

export async function deleteUserHistory(
	client: TelegramClient,
	{ chatId, userId }: DeleteUserHistory
) {
	const r = await client.invoke(
		new Api.channels.DeleteParticipantHistory({
			channel: await client.getEntity(chatId),
			participant: await client.getEntity(userId)
		})
	)

	return Boolean(r.ptsCount)
}
