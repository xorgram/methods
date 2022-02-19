import { Api } from 'telegram'
import { EntityLike } from 'telegram/define'
import CreateChannel from './create_channel'

export interface CreateGroupParams {
	title: string
	users: EntityLike | EntityLike[]
}

export default class CreateGroup extends CreateChannel {
	async createGroup({ title, users }: CreateGroupParams) {
		if (!Array.isArray(users)) {
			users = [users]
		}
		return await this.client.invoke(
			new Api.messages.CreateChat({ title, users })
		)
	}
}
