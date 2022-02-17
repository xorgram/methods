import { TelegramClient } from 'telegram'
import { addChatMembers, AddChatMembers } from './addChatMembers'
import { banChatMember, BanChatMember } from './banChatMember'

export class ChatHelper {
	private client: TelegramClient
	constructor(_client: TelegramClient) {
		this.client = _client
	}

	async addChatMember(props: AddChatMembers) {
		return await addChatMembers(props, this.client)
	}

	async banChatMember(props: BanChatMember) {
		return await banChatMember(props, this.client)
	}
}
