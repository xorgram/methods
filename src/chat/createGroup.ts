import { TelegramClient, Api } from 'telegram'
import { EntityLike } from 'telegram/define'

export interface CreateGroup {
	title: string
	users: EntityLike | EntityLike[]
}

export async function createGroup(
	client: TelegramClient,
	{ title, users }: CreateGroup
) {
	if (!Array.isArray(users)) {
		users = [users]
	}
	return await client.invoke(new Api.messages.CreateChat({ title, users }))
}
