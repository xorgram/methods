import { TelegramClient } from "./deps.ts";

export default abstract class ClientHolder {
  constructor(protected readonly client: TelegramClient) {}
}
