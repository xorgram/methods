import { TelegramClient } from 'telegram'
import { addChatMembers, AddChatMembers } from './addChatMembers'
import { banChatMember, BanChatMember } from './banChatMember'
import { getChatMember, GetChatMember } from './getChatMember'

export class ChatHelper {
	private client: TelegramClient
	constructor(_client: TelegramClient) {
		this.client = _client
	}

	async addChatMember(props: AddChatMembers) {
		return await addChatMembers(this.client, props)
	}

	async banChatMember(props: BanChatMember) {
		return await banChatMember(this.client, props)
	}

	async getChatMember(props: GetChatMember) {
		return await getChatMember(this.client, props)
	}
}
