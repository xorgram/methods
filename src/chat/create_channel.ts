import { Api } from 'telegram'
import BanChatMember from './ban_chat_member'

export interface CreateChannelParams {
	title: string
	about?: string
}

export default class CreateChannel extends BanChatMember {
	async createChannel({ title, about = '' }: CreateChannelParams) {
		return await this.client.invoke(
			new Api.channels.CreateChannel({ title, about, broadcast: true })
		)
	}
}
