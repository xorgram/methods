import { TelegramClient, Api } from 'telegram'
import { EntityLike } from 'telegram/define'

export interface DeleteSupergroup {
	chatId: EntityLike
}

export async function deleteSupergroup(
	client: TelegramClient,
	{ chatId }: DeleteSupergroup
) {
	await client.invoke(
		new Api.channels.DeleteChannel({ channel: await client.getEntity(chatId) })
	)

	return true
}
