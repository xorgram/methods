import { Api } from 'telegram'
import CreateChannel from './create_channel'

export interface CreateGroupParams {
	title: string
	users: Api.TypeEntityLike | Api.TypeEntityLike[]
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
