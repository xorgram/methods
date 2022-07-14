import { TelegramClient } from "$grm";

export default abstract class ClientHolder {
  constructor(protected readonly client: TelegramClient) {}
}
