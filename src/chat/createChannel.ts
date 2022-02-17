import { TelegramClient, Api } from 'telegram'

export interface CreateChannel {
	title: string
	about?: string
}

export async function createChannel(
	client: TelegramClient,
	{ title, about = '' }: CreateChannel
) {
	return await client.invoke(
		new Api.channels.CreateChannel({ title, about, broadcast: true })
	)
}
