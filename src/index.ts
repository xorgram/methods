import { TelegramClient } from 'telegram'
import { ChatHelper } from './chat'

export class XorHelper {
	private client: TelegramClient
	constructor(_client: TelegramClient) {
		this.client = _client
	}

	get chat() {
		return new ChatHelper(this.client)
	}
}
