import { TelegramClient } from 'telegram'
import { addChatMembers, AddChatMembers } from './addChatMembers'
import { archiveChats, ArchiveChats } from './archiveChats'
import { banChatMember, BanChatMember } from './banChatMember'
import { createChannel, CreateChannel } from './createChannel'
import { createGroup, CreateGroup } from './createGroup'
import { createSupergroup, CreateSupergroup } from './createSupergroup'
import { deleteChannel, DeleteChannel } from './deleteChannel'
import { deleteChatPhoto, DeleteChatPhoto } from './deleteChatPhoto'
import { deleteSupergroup, DeleteSupergroup } from './deleteSupergroup'
import { getChatMember, GetChatMember } from './getChatMember'

export class ChatHelper {
	private client: TelegramClient
	constructor(_client: TelegramClient) {
		this.client = _client
	}

	async addChatMember(props: AddChatMembers) {
		return await addChatMembers(this.client, props)
	}

	async archiveChats(props: ArchiveChats) {
		return await archiveChats(this.client, props)
	}

	async banChatMember(props: BanChatMember) {
		return await banChatMember(this.client, props)
	}

	async createChannel(props: CreateChannel) {
		return await createChannel(this.client, props)
	}

	async createGroup(props: CreateGroup) {
		return await createGroup(this.client, props)
	}

	async createSupergroup(props: CreateSupergroup) {
		return await createSupergroup(this.client, props)
	}

	async deleteChannel(props: DeleteChannel) {
		return await deleteChannel(this.client, props)
	}

	async deleteChatPhoto(props: DeleteChatPhoto) {
		return await deleteChatPhoto(this.client, props)
	}

	async deleteSupergroup(props: DeleteSupergroup) {
		return await deleteSupergroup(this.client, props)
	}

	async getChatMember(props: GetChatMember) {
		return await getChatMember(this.client, props)
	}
}
