import { TelegramClient, Api } from 'telegram'
import { EntityLike } from 'telegram/define'

export interface DeleteChannel {
	chatId: EntityLike
}

export async function deleteChannel(
	client: TelegramClient,
	{ chatId }: DeleteChannel
) {
	await client.invoke(
		new Api.channels.DeleteChannel({ channel: await client.getEntity(chatId) })
	)

	return true
}
