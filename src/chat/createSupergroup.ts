import { TelegramClient, Api } from 'telegram'

export interface CreateSupergroup {
	title: string
	about?: string
}

export async function createSupergroup(
	client: TelegramClient,
	{ title, about = '' }: CreateSupergroup
) {
	return await client.invoke(
		new Api.channels.CreateChannel({ title, about, megagroup: true })
	)
}
