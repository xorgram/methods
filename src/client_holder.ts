import { TelegramClient } from 'telegram'

export default abstract class ClientHolder {
	constructor(protected readonly client: TelegramClient) {}
}
